#!/usr/bin/env python3
"""Convert the 100 harvested Wix blog posts into the Astro `posts` content collection.

Source of truth: old-site/raw/posts/<slug>.html (Ricos-rendered body, full structure) plus
old-site/content/posts/<slug>.md (title, description, JSON-LD dates/author, tags/categories).
Output: site/src/content/posts/<slug>.json and copied images in site/public/blog/.
Re-run any time: `python3 scripts/convert-posts.py` from the site/ directory.
"""
import re, os, json, glob, html, shutil, sys
from html.parser import HTMLParser

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))          # site/
OLD = os.path.join(os.path.dirname(ROOT), 'old-site')
OUT = os.path.join(ROOT, 'src', 'content', 'posts')
IMG_OUT = os.path.join(ROOT, 'public', 'blog')
IMG_SRC = [os.path.join(OLD, 'images', 'blog'), os.path.join(OLD, 'images')]

LINKMAP = {'/client-portal-info': '/client-portal', '/services': '/pricing', '/freeagent-gold-partner': '/freeagent',
           '/covid-19': '/resources', '/resources/categories/': '/post/topic/'}
FILES = {'454878_f4ed1789c1fa4a2085fdf86de5eb0b1a.pdf': '/docs/tax-planning-2025-26.pdf',
         '454878_3fd29bbfe2bf4e1a8ae0da545bf7db02.pdf': '/docs/freeagent-app-training-slides.pdf',
         '454878_81f4521d961b4a90879980f9c27563ac.pdf': '/docs/rubric-law-pricelist.pdf',
         '58e574_aea37498bb114a5e9523c4c719be3851.pdf': '/docs/kingsbridge-ir35-contract-review.pdf',
         '4df625_1532cd7a4ca44c60a4ee77018a64ba52.pdf': '/terms',
         '4df625_df2deab5ea24451c922537e827c784a7.docx': '/privacy'}
TOPICS = {'brexit': 'Brexit', 'covid': 'Covid', 'freeagent': 'FreeAgent', 'ir35': 'IR35', 'mtd': 'Making Tax Digital',
          'small-business': 'Small business', 'taxes': 'Taxes'}
AUTHORS = {'richard42387': 'Focus Accountancy', None: 'Focus Accountancy'}

def fixhref(h):
    for k, v in FILES.items():
        if k in h: return v
    m = re.match(r'https?://(?:www\.)?focusaccountancy\.co\.uk(/[^#?]*)?([#?].*)?$', h)
    if m:
        path = m.group(1) or '/'; frag = m.group(2) or ''
        for k, v in LINKMAP.items():
            if path.startswith(k): path = v + path[len(k):]
        if path.startswith('/resources/tags/'): path = '/post'
        return path + frag
    return h

def local_image(src):
    """static.wixstatic.com/media/<id>/v1/... -> copy old-site image <id> into public/blog/, return /blog/<id>"""
    m = re.search(r'static\.wixstatic\.com/media/([^/]+)', src)
    if not m: return None
    wid = m.group(1)
    for d in IMG_SRC:
        p = os.path.join(d, wid)
        if os.path.isfile(p):
            os.makedirs(IMG_OUT, exist_ok=True)
            dst = os.path.join(IMG_OUT, wid)
            if not os.path.exists(dst): shutil.copy2(p, dst)
            return '/blog/' + wid
    return None

BLOCK = {'p', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li', 'blockquote', 'table', 'thead', 'tbody', 'tr', 'th', 'td', 'figure', 'figcaption', 'hr'}
INLINE = {'strong', 'b', 'em', 'i', 'u', 'a', 'sup', 'sub', 'br', 'code'}
SKIP = {'svg', 'button', 'script', 'style', 'video', 'audio', 'noscript'}
HMAP = {'h5': 'h4', 'h6': 'h4', 'b': 'strong', 'i': 'em'}

class Ricos(HTMLParser):
    def __init__(self, slug):
        super().__init__(convert_charrefs=True)
        self.slug = slug; self.out = []; self.skip = 0; self.stack = []; self.images = []; self.missing = []; self.video = 0
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if self.skip: 
            if tag in SKIP or tag in ('div',): self.stack.append(('skip', tag))
            return
        if tag in SKIP:
            if tag == 'video': self.video += 1
            self.skip += 1; self.stack.append(('skip', tag)); return
        if tag == 'img':
            src = a.get('src') or ''
            loc = local_image(src)
            if loc:
                alt = html.escape((a.get('alt') or '').strip(), quote=True)
                self.images.append(loc)
                self.out.append(f'<img src="{loc}" alt="{alt}" loading="lazy" decoding="async">')
            else: self.missing.append(src)
            return
        if tag == 'br': self.out.append('<br>'); return
        if tag == 'hr': self.out.append('<hr>'); return
        if tag == 'a':
            href = fixhref(html.unescape(a.get('href') or ''))
            if not href: self.stack.append(('none', tag)); return
            ext = href.startswith('http')
            self.out.append(f'<a href="{html.escape(href, quote=True)}"{" rel=\"noopener\"" if ext else ""}>'); self.stack.append(('a', tag)); return
        if tag in BLOCK or tag in INLINE:
            t = HMAP.get(tag, tag)
            self.out.append(f'<{t}>'); self.stack.append((t, tag)); return
        self.stack.append(('none', tag))
    def handle_endtag(self, tag):
        if tag in ('img', 'br', 'hr'): return
        while self.stack:
            kind, t = self.stack.pop()
            if kind == 'skip':
                if t == tag or t in SKIP:
                    if t in SKIP: self.skip = max(0, self.skip - 1)
                    if t == tag: break
                continue
            if kind == 'a': self.out.append('</a>')
            elif kind != 'none': self.out.append(f'</{kind}>')
            if t == tag: break
    def handle_data(self, data):
        if self.skip: return
        self.out.append(html.escape(data, quote=False))

def clean(body):
    b = body
    b = re.sub(r'</?u>', '', b)                                                       # Wix underline artefacts
    b = re.sub(r'<(h[2-4])>\s*<strong>(.*?)</strong>\s*</\1>', r'<\1>\2</\1>', b)  # bold headings
    b = re.sub(r'^(?:\s*<br>)+', '', b)                                                # leading empty lines
    b = re.sub(r'(?:\s*<br>\s*)+(?=<(?:p|h[2-4]|ul|ol|figure|table|blockquote|hr)\b)', '', b)  # empty lines between blocks
    b = re.sub(r'(</(?:p|h2|h3|h4|ul|ol|figure|table|blockquote)>)(?:\s*<br>\s*)+', r'\1', b)
    b = re.sub(r'<(p|h[2-4]|li|td|th)>(?:\s|<br>|&nbsp;|​)*</\1>', '', b)      # empty blocks
    b = re.sub(r'(<br>\s*){2,}', '<br>', b)
    b = re.sub(r'<p>\s*<br>\s*', '<p>', b); b = re.sub(r'\s*<br>\s*</p>', '</p>', b)
    b = re.sub(r'<(strong|em|u)>\s*</\1>', '', b)
    # "•<tab>text" paragraphs written as fake bullets -> real list
    b = re.sub(r'(?:<p>\s*•\s*(.*?)</p>\s*)+', lambda m: '<ul>' + ''.join(f'<li>{x}</li>' for x in re.findall(r'<p>\s*•\s*(.*?)</p>', m.group(0))) + '</ul>', b)
    b = re.sub(r'<figure>\s*</figure>', '', b)
    b = re.sub(r'</ul>\s*<ul>', '', b); b = re.sub(r'</ol>\s*<ol>', '', b)             # adjacent lists -> one
    b = re.sub(r'(?:\s*<br>\s*)+$', '', b)
    b = re.sub(r'\s+', ' ', b).strip()
    b = re.sub(r'> <', '><', b)
    return b

def category_members():
    m = {}
    for f in glob.glob(os.path.join(OLD, 'content', 'categories', '*.md')):
        cat = os.path.basename(f)[:-3]
        for u in re.findall(r'\]\(https://www\.focusaccountancy\.co\.uk/post/([^)#?]+)\)', open(f, encoding='utf-8').read()):
            m.setdefault(u.rstrip('/'), set()).add(cat)
    return m
CATS = None

def meta(slug):
    global CATS
    if CATS is None: CATS = category_members()
    t = open(os.path.join(OLD, 'content', 'posts', f'{slug}.md'), encoding='utf-8').read()
    head = t.split('---- PAGE TEXT ----')[0]
    g = lambda k: (re.search(rf'^{re.escape(k)}: (.*)$', head, re.M) or [None, ''])[1].strip()
    title = g('Title') or g('og:title') or slug
    desc = g('og:description') or g('description')
    j = {}
    m = re.search(r'---- JSON-LD ----\s*(\{.*)', t, re.S)
    if m:
        try: j = json.loads(m.group(1).strip())
        except Exception: j = {}
    author = (j.get('author') or {}).get('name'); author = AUTHORS.get(author, author) or 'Focus Accountancy'
    tags = re.findall(r'\[([^\]]+)\]\(https://www\.focusaccountancy\.co\.uk/resources/tags/[^)]+\)', t)
    seg = t.split('Tags:', 1)[1] if 'Tags:' in t else ''
    seg = re.split(r'## Recent Posts|---- IMAGES', seg)[0]
    cats = re.findall(r'https://www\.focusaccountancy\.co\.uk/resources/categories/([a-z0-9-]+)', seg)
    cats = [c for c in dict.fromkeys(cats + sorted(CATS.get(slug, []))) if c in TOPICS]
    if not cats:  # Wix categories were applied to only a third of posts; infer the rest from title, tags and slug
        hay = ' '.join([title, slug.replace('-', ' ')] + tags).lower()
        rules = [('freeagent', ['freeagent', 'smart capture', 'cafe', 'gocardless', 'open banking', 'paperless']),
                 ('ir35', ['ir35']), ('mtd', ['mtd', 'making tax digital', 'digital now']),
                 ('covid', ['furlough', 'covid', 'job retention', 'deferral', 'created in 2020']), ('brexit', ['brexit']),
                 ('taxes', ['tax', 'vat', 'budget', 'hmrc', 'allowance', 'dividend', 'national insurance', 'self-assessment', 'self assessment', 'isa', 'childcare', 'relief', 'trivial', 'payments on account', 'landlord', 'capital gains', 'electric car', 'cycling', 'company car', 'benefits']),
                 ('small-business', ['bank', 'pension', 'invoic', 'paid', 'contractor', 'limited', 'company', 'business', 'cyber', 'scam', 'deadline', 'record', 'expenses', 'workplace', 'gateway', 'gdpr', 'auto enrolment', 'maternity', 'grant', 'insurance'])]
        for cat, words in rules:
            if any(w in hay for w in words): cats.append(cat)
        cats = cats[:2] if cats else ['small-business']
    return dict(title=title, description=desc[:300], published=(j.get('datePublished') or '')[:10], updated=(j.get('dateModified') or '')[:10],
                author=author, tags=list(dict.fromkeys(tags)), topics=cats, ogImage=g('og:image'))

def convert(slug):
    h = open(os.path.join(OLD, 'raw', 'posts', f'{slug}.html'), encoding='utf-8').read()
    m = re.search(r'<section[^>]*data-hook="post-description"[^>]*>(.*?)</section>', h, re.S)
    if not m: raise SystemExit(f'no body: {slug}')
    p = Ricos(slug); p.feed(m.group(1)); p.close()
    body = clean(''.join(p.out))
    md = meta(slug)
    hero = local_image(md['ogImage']) if md['ogImage'] else None
    if hero and hero in p.images: hero_inline = True
    else: hero_inline = False
    words = len(re.sub(r'<[^>]+>', ' ', body).split())
    rec = dict(slug=slug, title=md['title'], description=md['description'], published=md['published'], updated=md['updated'] or md['published'],
               author=md['author'], topics=md['topics'], tags=md['tags'], image=hero, imageInline=hero_inline, words=words, legacy=True, html=body)
    json.dump(rec, open(os.path.join(OUT, f'{slug}.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
    return rec, p

if __name__ == '__main__':
    os.makedirs(OUT, exist_ok=True)
    slugs = sorted(os.path.basename(f)[:-5] for f in glob.glob(os.path.join(OLD, 'raw', 'posts', '*.html')))
    total = 0; miss = []; vids = []; thin = []
    for s in slugs:
        rec, p = convert(s); total += 1
        if p.missing: miss.append((s, p.missing))
        if p.video: vids.append(s)
        if rec['words'] < 60: thin.append((s, rec['words']))
    print(f'{total} posts written to {OUT}')
    print('images copied:', len(os.listdir(IMG_OUT)))
    print('missing images:', miss)
    print('posts with <video> (dropped):', vids)
    print('thin (<60 words):', thin)
