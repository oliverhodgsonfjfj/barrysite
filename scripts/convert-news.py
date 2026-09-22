#!/usr/bin/env python3
"""Migrate the news.focusaccountancy.co.uk newsfeed (Joomla + Informanagement syndicated items) into
the Astro `news` collection. Fetches the list from the live subdomain, then each item, converts the
body to clean HTML, downloads the item image, and writes src/content/news/<slug>.json.
Re-run to pick up new items: `python3 scripts/convert-news.py` (cached HTML in the scratch dir is reused).
"""
import re, os, json, html, sys, time, urllib.request
from html.parser import HTMLParser

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, 'src', 'content', 'news')
IMG = os.path.join(ROOT, 'public', 'news')
CACHE = os.environ.get('NEWS_CACHE', '/private/tmp/claude-501/-Users-olliehodgson-Barry-Website/bdec9770-1541-4b0c-833d-96c111e63d61/scratchpad/news')
BASE = 'https://news.focusaccountancy.co.uk'
UA = {'User-Agent': 'Mozilla/5.0 (Macintosh) AppleWebKit/537.36 Chrome/128 Safari/537.36'}

def fetch(url, path):
    if path and os.path.isfile(path) and os.path.getsize(path) > 0: return open(path, 'rb').read()
    req = urllib.request.Request(url, headers=UA)
    data = urllib.request.urlopen(req, timeout=30).read()
    if path:
        os.makedirs(os.path.dirname(path), exist_ok=True); open(path, 'wb').write(data)
    time.sleep(0.2)
    return data

BLOCK = {'p', 'h2', 'h3', 'h4', 'ul', 'ol', 'li', 'blockquote', 'table', 'thead', 'tbody', 'tr', 'th', 'td', 'hr'}
INLINE = {'strong', 'b', 'em', 'i', 'a', 'sup', 'sub', 'br'}
SKIP = {'script', 'style', 'img', 'iframe', 'span', 'div'}
HMAP = {'b': 'strong', 'i': 'em', 'h1': 'h2', 'h5': 'h4', 'h6': 'h4'}

class Body(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True); self.out = []; self.stack = []
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == 'br': self.out.append('<br>'); return
        if tag == 'a':
            href = html.unescape(a.get('href') or '')
            if not href or href.startswith('javascript'): self.stack.append(('none', tag)); return
            self.out.append(f'<a href="{html.escape(href, quote=True)}" rel="noopener">'); self.stack.append(('a', tag)); return
        if tag in BLOCK or tag in INLINE or tag in HMAP:
            t = HMAP.get(tag, tag); self.out.append(f'<{t}>'); self.stack.append((t, tag)); return
        self.stack.append(('none', tag))
    def handle_endtag(self, tag):
        if tag == 'br': return
        while self.stack:
            kind, t = self.stack.pop()
            if kind == 'a': self.out.append('</a>')
            elif kind != 'none': self.out.append(f'</{kind}>')
            if t == tag: break
    def handle_data(self, d): self.out.append(html.escape(d, quote=False))

def clean(b):
    b = re.sub(r'<(p|li|td|th|h[2-4])>(?:\s|<br>|&nbsp;)*</\1>', '', b)
    b = re.sub(r'(?:\s*<br>\s*){2,}', '<br>', b)
    b = re.sub(r'^(?:\s*<br>)+', '', b); b = re.sub(r'(?:\s*<br>\s*)+$', '', b)
    b = re.sub(r'(?:\s*<br>\s*)+(?=<(?:p|h[2-4]|ul|ol|table|blockquote)\b)', '', b)
    b = re.sub(r'(</(?:p|h[2-4]|ul|ol|table|blockquote)>)(?:\s*<br>\s*)+', r'\1', b)
    b = re.sub(r'<p>\s*<strong>([^<]{3,90})</strong>\s*</p>', r'<h2>\1</h2>', b)   # bold-only paragraphs are headings
    return re.sub(r'\s+', ' ', b).strip()

def slugify(t):
    s = re.sub(r'[^a-z0-9]+', '-', t.lower()).strip('-')
    return s[:80].rstrip('-')

def convert(id_):
    h = fetch(f'{BASE}/?command=viewitem&id={id_}', os.path.join(CACHE, 'items', f'{id_}.html')).decode('utf-8', 'replace')
    m = re.search(r'<div class="tmp-content-area">(.*?)</section>', h, re.S)
    if not m: raise SystemExit(f'no content for {id_}')
    seg = m.group(1)
    img = re.search(r"<img src='([^']+)'", seg)
    title = html.unescape(re.sub(r'<[^>]+>', '', re.search(r"class='newsarticle_title'>(.*?)</span>", seg, re.S).group(1))).strip()
    date = re.search(r'(\d{2})/(\d{2})/(\d{4})', seg)
    published = f'{date.group(3)}-{date.group(2)}-{date.group(1)}' if date else ''
    body_html = seg.split(date.group(0), 1)[1] if date else seg
    body_html = body_html.split("</div>")[0] if "</div>" in body_html else body_html
    p = Body(); p.feed(body_html); p.close(); body = clean(''.join(p.out))
    text = re.sub(r'<[^>]+>', ' ', body); text = re.sub(r'\s+', ' ', html.unescape(text)).strip()
    summary = text[:220].rsplit(' ', 1)[0] + ('…' if len(text) > 220 else '')
    image = None
    if img:
        src = html.unescape(img.group(1))
        ext = '.jpg' if '.jpg' in src.lower() or '.jpeg' in src.lower() else '.png' if '.png' in src.lower() else '.jpg'
        dst = os.path.join(IMG, f'{id_}{ext}')
        try:
            if not os.path.exists(dst): open(dst, 'wb').write(fetch(src, None))
            image = f'/news/{id_}{ext}'
        except Exception as e: print('image failed', id_, e)
    rec = dict(slug=slugify(title), id=int(id_), title=title, summary=summary, published=published, image=image, words=len(text.split()), html=body)
    return rec

if __name__ == '__main__':
    os.makedirs(OUT, exist_ok=True); os.makedirs(IMG, exist_ok=True)
    home = fetch(f'{BASE}/', os.path.join(CACHE, 'home.html')).decode('utf-8', 'replace')
    ids = sorted(set(re.findall(r'command=viewitem&(?:amp;)?id=(\d+)', home)))
    seen = {}; n = 0
    for id_ in ids:
        r = convert(id_)
        if r['slug'] in seen: r['slug'] += f'-{id_}'
        seen[r['slug']] = id_
        json.dump(r, open(os.path.join(OUT, f"{r['slug']}.json"), 'w', encoding='utf-8'), ensure_ascii=False, indent=1); n += 1
    print(f'{n} news items written; ids {ids[0]}..{ids[-1]}')
    json.dump({v: k for k, v in seen.items()}, open(os.path.join(CACHE, 'id-to-slug.json'), 'w'), indent=1)
