#!/usr/bin/env python3
"""Turn Julio drafts (exported from the Julio database) into review-queue files.

Usage: python3 -I scripts/stage-julio-drafts.py <drafts.json> <content_items.json>

Writes src/content/queue/<slug>.json for each draft picked in PICKS. Re-running overwrites them.
Links are made relative and pointed at pages that exist on the new site (old Wix paths go through
vercel.json's redirects). The H1 is dropped because the post template prints the title.
"""
import json, re, sys, os, html as htmllib

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
QUEUE = os.path.join(ROOT, 'src/content/queue')

# Julio content_item id prefix -> how it sits in the lineup.
PICKS = {
    '43603b5b': dict(slug='freeagent-without-an-accountant', topics=['freeagent'], author='Barry Adams',
        why='You approved this in August. People already find Focus for "do I need an accountant with FreeAgent" (position 6 in Search Console, Aug 2026) and no page answers it.',
        keyword=dict(term='do i need an accountant with freeagent', volume=None, note='Search Console, Aug 2026: Focus ranked about position 6 with no page answering the question. Search volume not on file.')),
    '7139704d': dict(slug='contractor-take-home-pay', topics=['small-business'], author='Barry Adams',
        why='You approved this in August. The question every contractor asks before they choose an accountant.',
        keyword=dict(term='contractor take home pay calculator', volume=260, note='DataForSEO, Aug 2026: 260 searches a month, difficulty 0.')),
    '749326cd': dict(slug='switching-accountants-it-contractor', topics=['small-business'], author='Barry Adams',
        why='You approved this in August. The last thing someone reads before they get in touch, and January is when people switch.',
        keyword=dict(term='switching accountants', volume=None, note='Search volume not on file.')),
    'edc0ffff': dict(slug='business-mileage-rates', topics=['taxes'], author='Barry Adams',
        why='You approved this in August. The syndicated news feed ranks for mileage today; this claims the topic for Focus’s own site, and the Budget changed the rates.',
        keyword=dict(term='business mileage rates', volume=480, note='DataForSEO, Aug 2026: 480 searches a month ("business mileage rate 2025" 590).')),
    '2af53f26': dict(slug='inside-or-outside-ir35', topics=['ir35'], author='Barry Adams',
        why='You approved this in August. The /ir35 page had 2,240 impressions at position 53 (Aug 2026); this full guide links into it.',
        keyword=dict(term='inside or outside ir35', volume=None, note='"ir35 accountant" 90 searches a month (DataForSEO, Aug 2026). Search Console: /ir35 2,240 impressions at position 53.')),
    'a9e4475f': dict(slug='freeagent-vs-xero', topics=['freeagent'], author='Focus Accountancy',
        why='Focus is a FreeAgent Gold Partner. People comparing the two are close to choosing software and an accountant.',
        keyword=dict(term='freeagent vs xero', volume=None, note='Search volume not on file (keyword tools were down on 13 Nov).')),
    '9fa7f265': dict(slug='corporation-tax-for-contractors', topics=['taxes'], author='Focus Accountancy',
        why='Core topic for limited-company contractors, Focus’s main client type.',
        keyword=dict(term='corporation tax for contractors', volume=None, note='Search volume not on file (keyword tools were down on 13 Nov).')),
    '1c56f084': dict(slug='vat-registration-threshold', topics=['taxes'], author='Focus Accountancy',
        why='Supports Focus’s best-earning old post (how to re-register for VAT, 107 clicks in 16 months).',
        keyword=dict(term='vat registration threshold', volume=None, note='Search volume not on file. Related: "re register for vat" 70 a month (DataForSEO, Aug 2026).')),
    'f7573963': dict(slug='freeagent-sole-trader-guide', topics=['freeagent', 'mtd'], author='Focus Accountancy',
        why='Sole traders on FreeAgent now face Making Tax Digital; this links them to the MTD hub and the sole trader page.',
        keyword=dict(term='freeagent sole trader', volume=None, note='Search volume not on file. Sole trader cluster 1,870 a month (DataForSEO, Oct 2026).')),
}

def site_paths():
    built = set()
    pages = os.path.join(ROOT, 'src/pages')
    for dp, _, fs in os.walk(pages):
        for f in fs:
            if f.endswith('.astro') and '[' not in f:
                p = os.path.relpath(os.path.join(dp, f), pages)[:-6]
                built.add('/' + ('' if p == 'index' else p))
    for f in os.listdir(os.path.join(ROOT, 'src/content/posts')):
        built.add('/post/' + f[:-5])
    redirects = {r['source']: r['destination'] for r in json.load(open(os.path.join(ROOT, 'vercel.json')))['redirects'] if not r.get('has')}
    return built, redirects

BUILT, REDIRECTS = site_paths()
BUILT |= {'/ir35', '/taxes', '/pricing', '/about', '/contact', '/reviews', '/freeagent'}

def fix_link(href, problems):
    m = re.match(r'https?://(www\.)?focusaccountancy\.co\.uk(/[^#?]*)?', href)
    if not m and href.startswith('/'):
        path = href.split('#')[0].split('?')[0]
    elif m:
        path = m.group(2) or '/'
    else:
        return href  # external
    path = path.rstrip('/') or '/'
    if path in BUILT:
        return path
    if path in REDIRECTS:
        return REDIRECTS[path]
    problems.append(f'Link to {path} does not exist on the new site; it was removed.')
    return None

def clean(body):
    problems = []
    body = re.sub(r'<h1[^>]*>.*?</h1>', '', body, flags=re.S)
    body = re.sub(r'\s+\.\s*</p>', '</p>', body)  # stray " ." left by the generator
    body = re.sub(r'<col[^>]*>|</?colgroup>', '', body)
    def repl(m):
        attrs, text = m.group(1), m.group(2)
        hm = re.search(r'href="([^"]+)"', attrs)
        if not hm:
            return text
        new = fix_link(htmllib.unescape(hm.group(1)), problems)
        if new is None:
            return text
        ext = not new.startswith('/')
        extra = ' target="_blank" rel="noopener"' if ext else ''
        return f'<a href="{htmllib.escape(new)}"{extra}>{text}</a>'
    body = re.sub(r'<a\b([^>]*)>(.*?)</a>', repl, body, flags=re.S)
    return body.strip(), problems

def words(h):
    return len(re.sub(r'<[^>]+>', ' ', h).split())

def main(drafts_path, items_path):
    drafts = json.load(open(drafts_path))
    items = {r['id']: r for r in json.load(open(items_path))}
    os.makedirs(QUEUE, exist_ok=True)
    for d in drafts:
        key = d['content_item_id'][:8]
        if key not in PICKS:
            continue
        pick = PICKS[key]
        item = items[d['content_item_id']]
        body, problems = clean(d['body_html'] or '')
        title = (d.get('selected_title') or item['title']).strip()
        title = re.sub(r'\s*\|\s*Focus.*$', '', title)
        desc = (d.get('meta_description') or item.get('meta_description') or '').strip()
        out = {
            'slug': pick['slug'],
            'title': title,
            'description': desc,
            'author': pick['author'],
            'topics': pick['topics'],
            'kind': 'new',
            'source': 'Julio',
            'sourceRef': d['content_item_id'],
            'written': (d.get('created_at') or '')[:10],
            'why': pick['why'],
            'keyword': pick['keyword'],
            'checks': [{'status': 'check', 'claim': p, 'note': '', 'source': ''} for p in problems],
            'words': words(body),
            'html': body,
        }
        with open(os.path.join(QUEUE, pick['slug'] + '.json'), 'w') as f:
            json.dump(out, f, indent=2, ensure_ascii=False)
            f.write('\n')
        print(f"{pick['slug']}: {out['words']} words, {len(problems)} link problems")

if __name__ == '__main__':
    main(sys.argv[1], sys.argv[2])
