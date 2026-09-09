import re, json, html
C='../old-site/content'
IMG={ '58e574_852e8352a4cd4e37ba928f3690e0226f':('/img/kingsbridge.png','Kingsbridge'),
 '454878_13c10def76f94048ad745ec84c0810e9':('/img/mettle.png','Mettle'),
 '58e574_947d16cf9e9a427999ce4f55f93da60c':('/img/allica.jpg','Allica Bank'),
 '454878_99fcf38ce0074ec2adfedc271a0b8ecb':('/img/natwest.png','NatWest'),
 '454878_e127b4d600ea4034a33a6f5a4f4bdb13':('/img/starling.png','Starling Bank')}
LINKMAP={'/client-portal-info':'/client-portal','/services':'/pricing','/freeagent-gold-partner':'/freeagent','/covid-19':'/resources'}
FRAG={'#payeni':'#paye-ni','#corporationtax':'#corporation-tax','#selfassessment':'#personal-tax','#imconsideringfreeagent':'#considering','#specific':'#tasks','#benefits':'#benefits'}
FILES={'454878_f4ed1789c1fa4a2085fdf86de5eb0b1a.pdf':'/docs/tax-planning-2025-26.pdf','454878_3fd29bbfe2bf4e1a8ae0da545bf7db02.pdf':'/docs/freeagent-app-training-slides.pdf','454878_81f4521d961b4a90879980f9c27563ac.pdf':'/docs/rubric-law-pricelist.pdf','58e574_aea37498bb114a5e9523c4c719be3851.pdf':'/docs/kingsbridge-ir35-contract-review.pdf','4df625_1532cd7a4ca44c60a4ee77018a64ba52.pdf':'/terms'}
def fixhref(h):
    for k,v in FILES.items():
        if k in h: return v
    m=re.match(r'https://www\.focusaccountancy\.co\.uk(/[^#?]*)?(#.*)?$',h)
    if m:
        path=m.group(1) or '/'; frag=m.group(2) or ''
        return LINKMAP.get(path,path)+FRAG.get(frag,frag)
    return h
def inline(t):
    t=html.escape(t,quote=False)
    def rep(m):
        href=fixhref(html.unescape(m.group(2))); ext=href.startswith('http')
        return f'<a href="{href}"{" rel=\"noopener\"" if ext else ""}>{m.group(1)}</a>'
    return re.sub(r'\[([^\]]+)\]\(([^)\s]+)\)', rep, t)
def slug(txt): return re.sub(r'[^a-z0-9]+','-',txt.lower()).strip('-')
def body_lines(slugname):
    t=open(f'{C}/{slugname}.md',encoding='utf-8').read()
    head,rest=t.split('---- PAGE TEXT ----',1)
    body=rest.split('---- IMAGES')[0].splitlines()
    try: s=next(i for i,l in enumerate(body) if l.startswith('Use tab to navigate'))+1
    except StopIteration: s=0
    try: e=next(i for i,l in enumerate(body) if l.startswith('[Terms & Conditions]'))
    except StopIteration: e=len(body)
    lines=[l.strip().replace('​','') for l in body[s:e]]
    return head,[l for l in lines if l and not l.startswith('[input:') and l not in ('Send','Thanks! Message sent.','Success! Message received.','Specific','Benefits')]
DROP={'taxes':{'Self assessment','Corporation tax','PAYE & NI','VAT'}}
def convert(slugname):
    head,lines=body_lines(slugname)
    lines=[l for l in lines if l not in DROP.get(slugname,set())]
    out=[]; i=0; n=len(lines)
    def is_short(l): return len(l)<75 and not l.endswith('.') and not l.startswith('#') and not l.startswith('![') and not re.match(r'^\[.*\]\(.*\)$',l)
    while i<n:
        l=lines[i]
        m=re.match(r'^(#{1,6})\s*(.*)$',l)
        if m:
            txt=m.group(2).strip()
            if not txt: i+=1; continue
            lvl=len(m.group(1)); tag='h2' if lvl<=3 else 'h3'
            if len(txt)>90: out.append(f'<p class="lead">{inline(txt)}</p>')
            else: out.append(f'<{tag} id="{slug(txt)}">{inline(txt)}</{tag}>')
            i+=1; continue
        m=re.match(r'^!\[([^\]]*)\]\((https://static\.wixstatic\.com/media/([^/~]+)~?[^)]*)\)\s*(.*)$',l)
        if m:
            wid=m.group(3).split('.')[0]
            if wid in IMG:
                src,alt=IMG[wid]; out.append(f'<figure class="prose__logo"><img src="{src}" alt="{alt}" loading="lazy"></figure>')
            rest=m.group(4).strip()
            if rest and not rest.startswith('['): lines.insert(i+1,rest)
            i+=1; continue
        if l.startswith('- '):
            items=[]
            while i<n and lines[i].startswith('- '): items.append(inline(lines[i][2:])); i+=1
            out.append('<ul>'+''.join(f'<li>{x}</li>' for x in items)+'</ul>'); continue
        # subheading heuristic: short line followed by a long paragraph
        if is_short(l) and not l.startswith('[') and i+1<n and len(lines[i+1])>110 and not (i+2<n and is_short(lines[i+1])):
            out.append(f'<h3 id="{slug(l)}">{inline(l)}</h3>'); i+=1; continue
        j=i
        while j<n and is_short(lines[j]) and not lines[j].startswith('['): j+=1
        if j-i>=3:
            out.append('<ul>'+''.join(f'<li>{inline(x)}</li>' for x in lines[i:j])+'</ul>'); i=j; continue
        m2=re.match(r'^\[([^\]]+)\]\(([^)]+)\)$',l)
        if m2:
            href=fixhref(m2.group(2)); ext=href.startswith('http')
            cls='prose__jump' if href.startswith('#') or '#' in href and href.startswith('/') else 'btn btn--outline btn--small'
            out.append(f'<p><a class="{cls}" href="{href}"{" rel=\"noopener\"" if ext else ""}>{html.escape(m2.group(1))}</a></p>'); i+=1; continue
        out.append(f'<p>{inline(l)}</p>'); i+=1
    # drop leading headings (the page title is rendered by the hero)
    while out and re.match(r'^<h[23]',out[0]): out.pop(0)
    # merge consecutive jump/button paragraphs into one row
    merged=[]
    for el in out:
        if merged and el.startswith('<p><a class="') and merged[-1].startswith('<p><a class="') and merged[-1].endswith('</p>'):
            merged[-1]=merged[-1][:-4]+' '+el[3:]
        else: merged.append(el)
    return merged
pages={}
for s in ['taxes','banking','insurance','ir35','pensions','legal','jargon-buster','client-portal-info']:
    pages[s]={'html':'\n'.join(convert(s))}
# pensions: the disclaimer heading becomes a notice
pages['pensions']['html']=re.sub(r'<h[23][^>]*>(If you need advice[^<]*)</h[23]>',r'<p class="notice">\1</p>',pages['pensions']['html'])
# jargon buster: replace the A-Z index with letter anchors on the first term of each letter
jb=convert('jargon-buster')
jb=[el for el in jb if not (el.startswith('<p><a href="/jargon-buster#') or re.match(r'^<p>(?:[A-Z]|X Y Z)</p>$',el))]
seen=set(); res=[]
for el in jb:
    m=re.match(r'^<h[23] id="([^"]+)">(.*)</h[23]>$',el)
    if m:
        letter=m.group(2)[0].upper()
        if letter not in seen and not m.group(2).startswith('Jargon'):
            seen.add(letter); res.append(f'<div class="jargon-letter" id="letter-{letter.lower()}"><span>{letter}</span></div>')
        res.append(f'<h3 id="{m.group(1)}">{m.group(2)}</h3>'); continue
    res.append(el)
index='<nav class="jargon-index" aria-label="Jump to letter">'+''.join(f'<a href="#letter-{c.lower()}">{c}</a>' for c in sorted(seen))+'</nav>'
res=[el for el in res if not (el.startswith('<h3 id="jargon-buster"') or el.startswith('<p>We try our best') or el.startswith('<p>This is just a guide'))]
pages['jargon-buster']={'html':index+'\n'+'\n'.join(res)}
# client portal: fix stale portal link
pages['client-portal-info']['html']=pages['client-portal-info']['html'].replace('https://www.accountancymanager.co.uk/signin','https://manager.brightsg.com/signin').replace('AccountancyManager','BrightManager')
# privacy (docx txt: single newlines, bullets with tab+•)
out=[]; buf=[]
for line in open('../old-site/documents/privacy-policy.txt',encoding='utf-8').read().splitlines():
    l=line.strip()
    if not l: continue
    if l.startswith('•'):
        buf.append(html.escape(l.lstrip('• ').strip())); continue
    if buf: out.append('<ul>'+''.join(f'<li>{x}</li>' for x in buf)+'</ul>'); buf=[]
    if len(l)<55 and not l.endswith('.') and not l.endswith(';') and not l.startswith('Last updated'): out.append(f'<h2>{html.escape(l)}</h2>')
    else: out.append(f'<p>{html.escape(l)}</p>')
if buf: out.append('<ul>'+''.join(f'<li>{x}</li>' for x in buf)+'</ul>')
if out and out[0].startswith('<h2>Privacy'): out.pop(0)
pages['privacy']={'html':'\n'.join(out)}
# terms (pdftotext -layout): paragraphs separated by blank lines; numbered heading is the first line of a block
raw=open('../old-site/documents/terms-and-conditions.txt',encoding='utf-8').read().replace('\f','\n\n')
out=[]
for block in re.split(r'\n\s*\n',raw):
    ls=[re.sub(r'\s+',' ',x).strip() for x in block.splitlines() if x.strip()]
    if not ls: continue
    if re.match(r'^\d+\.\s+\S.{1,70}$',ls[0]) and not ls[0].endswith('.'):
        out.append(f'<h2>{html.escape(ls[0])}</h2>'); ls=ls[1:]
    if ls:
        p=' '.join(ls)
        if p.upper()==p and len(p)<60: continue
        out.append(f'<p>{html.escape(p)}</p>')
pages['terms']={'html':'\n'.join(out)}
json.dump(pages,open('src/data/guides.json','w'),indent=1,ensure_ascii=False)
for k,v in pages.items(): print(k,len(v['html']),'|',re.sub(r'<[^>]+>',' ',v['html'])[:70].strip())

# ---- accordion-derived data ----
acc=json.load(open(f'{C}/_accordions.json'))
def paras(txt): return [p.strip() for p in re.split(r'\n\s*\n',txt) if p.strip()]
json.dump([{'q':x['heading'],'a':paras(x['body'])} for x in acc['services']],open('src/data/services.json','w'),indent=1,ensure_ascii=False)
groups={'considering':[], 'tasks':[], 'benefits':[]}
for x in acc['freeagent']:
    h=x['heading']; key='considering' if h.startswith("[I'm considering") else 'tasks' if h.startswith('[Help with') else 'benefits'
    q=re.sub(r'^\[[^\]]+\]\s*','',h)
    body=x['body']
    m=re.search(r'\(No text\. Panel contains only an image — (https://[^ ]+) — (?:linking to the YouTube video (https://[^)]+)|with no working link)\)',body)
    item={'q':q,'a':paras(body) if not m else []}
    if m: item['video']=m.group(2)
    groups[key].append(item)
json.dump(groups,open('src/data/freeagentFaq.json','w'),indent=1,ensure_ascii=False)
faq=[]
for x in acc['faq']:
    b=x['body']
    if x['heading'].startswith('How much'): b=b.replace('£80/month','£99/month').replace('£125/month','£145/month').replace('£40 + VAT','£50 + VAT')
    b=b.replace('£80/month + VAT','£99/month + VAT').replace('£40/month + VAT','£50/month + VAT').replace('Download for Android or IOS.','Get it on Google Play.').replace('via Skype, a phone call or email','by video call, phone or email')
    faq.append({'q':x['heading'].replace('a operating','operating').replace('resposibilities','responsibilities'),'a':[{'text':p} for p in paras(b)]})
json.dump(faq,open('src/data/faqAll.json','w'),indent=1,ensure_ascii=False)
print('services',len(acc['services']),'freeagent',{k:len(v) for k,v in groups.items()},'faq',len(faq))
