import sys,re
from html.parser import HTMLParser
class M(HTMLParser):
    def __init__(s):
        super().__init__(); s.out=[]; s.cur=''; s.tag=None; s.inmain=False; s.depth=0; s.skip=0
    def handle_starttag(s,t,a):
        ad=dict(a)
        if t=='main' or (t=='div' and ad.get('id')=='content'): s.inmain=True
        if not s.inmain: return
        if t in ('script','style'): s.skip+=1
        if t in ('h1','h2','h3','h4','li','p','pre','code','tr','td','th'): s.flush(); s.tag=t
        if t in ('td','th'): s.cur+=' | '
    def handle_endtag(s,t):
        if t in ('script','style') and s.skip: s.skip-=1
        if not s.inmain: return
        if t in ('h1','h2','h3','h4','li','p','pre','tr'): s.flush()
        if t=='main': s.inmain=False
    def handle_data(s,d):
        if s.inmain and not s.skip: s.cur+=d
    def flush(s):
        txt=re.sub(r'[ \t]+',' ',s.cur).strip()
        if txt:
            pre={'h1':'# ','h2':'## ','h3':'### ','h4':'#### ','li':'- '}.get(s.tag,'')
            s.out.append(pre+txt)
        s.cur=''; s.tag=None
p=M(); p.feed(open(sys.argv[1],encoding='utf-8').read()); p.flush()
print('\n'.join(p.out))
