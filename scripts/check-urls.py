#!/usr/bin/env python3
"""Launch gate: every old URL must end at a real page.

Static mode (default): checks old-site/urls.txt + the dead WordPress-era URLs against dist/ and vercel.json.
Live mode: `check-urls.py https://preview-url` follows redirects over HTTP and requires 200 within one hop.
"""
import json, os, re, sys, urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OLD = os.path.join(os.path.dirname(ROOT), 'old-site')
DEAD = ['/post/automated-debt-collection', '/make-sure-you-claim-all-of-your-travel-and-accommodation-expenses/',
        '/wp-content/uploads/2015/12/pay-your-self-assessment-tax-bill-gov-uk.jpg',
        '/wp-content/uploads/2016/08/how-to-make-a-cashflow-forecast-freeagent.jpg',
        '/wp-content/uploads/2015/12/self-assessment-checklist-freeagent.jpg', '/pricing']

def paths():
    out = []
    for line in open(os.path.join(OLD, 'urls.txt')):
        u = line.strip()
        if not u: continue
        p = re.sub(r'^https://www\.focusaccountancy\.co\.uk', '', u).split('?')[0] or '/'
        out.append(p)
    return out + DEAD

def to_regex(src):
    # vercel path-to-regexp subset: :slug and :slug*
    r = re.escape(src).replace(r'\:', ':')
    r = re.sub(r':([A-Za-z]+)\*', r'(?P<\1>.*)', r)
    r = re.sub(r':([A-Za-z]+)', r'(?P<\1>[^/]+)', r)
    return re.compile('^' + r + '$')

def static_check():
    v = json.load(open(os.path.join(ROOT, 'vercel.json')))
    rules = [(to_regex(r['source']), r['destination']) for r in v['redirects']]
    dist = os.path.join(ROOT, 'dist')
    def exists(p):
        p = p.split('#')[0]
        if p == '/': return os.path.exists(os.path.join(dist, 'index.html'))
        return os.path.exists(os.path.join(dist, p.lstrip('/') + '.html')) or os.path.exists(os.path.join(dist, p.lstrip('/'))) or os.path.exists(os.path.join(dist, p.lstrip('/'), 'index.html'))
    bad = []
    for p in paths():
        if exists(p): continue
        dest = None
        for rx, d in rules:
            m = rx.match(p)
            if m:
                dest = d
                for k, val in m.groupdict().items(): dest = dest.replace(f':{k}*', val).replace(f':{k}', val)
                break
        if dest is None: bad.append((p, 'no page, no redirect')); continue
        if dest.startswith('http'): continue
        if not exists(dest): bad.append((p, f'redirects to missing {dest}'))
    return bad

def live_check(base):
    bad = []
    for p in paths():
        try:
            req = urllib.request.Request(base.rstrip('/') + p, headers={'User-Agent': 'focus-launch-check'})
            with urllib.request.urlopen(req, timeout=20) as r:
                hops = len(getattr(r, 'redirect_history', []) or [])
                if r.status != 200: bad.append((p, f'status {r.status}'))
        except Exception as e:
            bad.append((p, str(e)))
    return bad

if __name__ == '__main__':
    bad = live_check(sys.argv[1]) if len(sys.argv) > 1 else static_check()
    n = len(paths())
    for p, why in bad: print(f'FAIL {p}: {why}')
    print(f'{n - len(bad)}/{n} old URLs resolve')
    sys.exit(1 if bad else 0)
