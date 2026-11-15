"""Draw chart-style cover pictures (대표 그림) for posts whose topic is a chart.

Run from the repository root: python tools/make_chart_covers.py
Needs Pillow and the Malgun Gothic font (Windows). Writes images/posts/<slug>.webp (1280x720).
Numbers come from the examples in each post; change both together.
Posts: average-cost-calculation, loss-recovery-rate, compound-interest-rule-of-72,
max-drawdown-mdd, spaced-repetition-review (concept chart, no numbers),
suneung-korean-history-timeline (era timeline).
"""
import math, os
from PIL import Image, ImageDraw, ImageFont
S=2; W,H=1280*S,720*S
FB='C:/Windows/Fonts/malgunbd.ttf'; FR='C:/Windows/Fonts/malgun.ttf'
def font(sz,bold=True): return ImageFont.truetype(FB if bold else FR, int(sz*1.18*S))
C={'money':('#f6ecda','#8a5512'),'learn':('#ece8f8','#4f3f9a')}
INK='#16181b'; MUTED='#8b8f96'; GRID='#00000014'
def hexa(h,a=255):
    h=h.lstrip('#'); return tuple(int(h[i:i+2],16) for i in (0,2,4))+(a,)
def canvas(cat):
    bg,fg=C[cat]
    im=Image.new('RGB',(W,H),hexa(bg)[:3]); d=ImageDraw.Draw(im,'RGBA')
    # white card
    d.rounded_rectangle((150*S,80*S,1130*S,640*S),radius=30*S,fill=(255,255,255,255))
    return im,d,hexa(fg)
def text(d,xy,t,sz,fill,anchor='mm',bold=True): d.text((xy[0]*S,xy[1]*S),t,font=font(sz,bold),fill=fill,anchor=anchor)
def line(d,pts,fill,w): d.line([(x*S,y*S) for x,y in pts],fill=fill,width=int(w*1.35*S),joint='curve')
def dashed(d,x0,x1,y,fill,w,dash=14,gap=10):
    x=x0
    while x<x1: d.line([(x*S,y*S),(min(x+dash,x1)*S,y*S)],fill=fill,width=int(w*S)); x+=dash+gap
def save(im,slug):
    im=im.convert('RGB').crop((118*S,62*S,1162*S,649*S)).resize((1280,720),Image.LANCZOS)
    im.save(f'images/posts/{slug}.webp','WEBP',quality=88); print(slug, os.path.getsize(f'images/posts/{slug}.webp')//1024,'KB')
def gridlines(d,x0,x1,ys):
    for y in ys: d.line([(x0*S,y*S),(x1*S,y*S)],fill=(0,0,0,22),width=2*S)

# 1 average cost: bar width = shares, height = price, dashed average 7,500
im,d,fg=canvas('money')
x0,base,top=330,560,170  # price 0..12000 -> base..top
Y=lambda p: base-(p/12000)*(base-top)
gridlines(d,x0,960,[Y(v) for v in (0,4000,8000,12000)])
bars=[(10000,10),(8000,10),(6000,20)]; unit=420/40*0.86; x=x0+20
for i,(p,q) in enumerate(bars):
    w=q*unit
    d.rounded_rectangle((x*S,Y(p)*S,(x+w)*S,base*S),radius=10*S,fill=fg[:3]+(int(255*(0.45+0.2*i)),))
    text(d,(x+w/2,Y(p)-28),f'{p:,}',30,INK)
    x+=w+26
dashed(d,x0,x,Y(7500),hexa(INK),5)
text(d,(x+14,Y(7500)),'평균 7,500',34,INK,'lm')
d.line([(x0*S,base*S),(960*S,base*S)],fill=hexa(INK,140),width=3*S)
text(d,(640,120),'나눠 산 가격과 평균 단가',30,MUTED,'mm',False)
save(im,'average-cost-calculation')

# 2 loss recovery: loss bars down, needed gain bars up
im,d,fg=canvas('money')
mid=430; scale=1.95  # px per %
pairs=[(10,100/0.9-100),(20,25),(30,100/0.7-100),(50,100)]
d.line([(330*S,mid*S),(960*S,mid*S)],fill=hexa(INK,160),width=3*S)
x=345
for loss,gain in pairs:
    d.rounded_rectangle((x*S,mid*S,(x+70)*S,(mid+loss*scale)*S),radius=8*S,fill=(150,154,160,255))
    d.rounded_rectangle(((x+82)*S,(mid-gain*scale)*S,(x+152)*S,mid*S),radius=8*S,fill=fg)
    text(d,(x+35,mid+loss*scale+30),f'-{loss}%',28,MUTED)
    g=f'+{gain:.1f}%'.replace('.0%','%')
    text(d,(x+117,mid-gain*scale-28),g,30,fg)
    x+=155
text(d,(640,120),'떨어진 비율과 본전까지 필요한 상승률',30,MUTED,'mm',False)
save(im,'loss-recovery-rate')

# 3 compound vs simple (100 at 5%, 30 years)
im,d,fg=canvas('money')
X=lambda t: 330+t/30*620; Y=lambda v: 560-v/450*390
gridlines(d,330,950,[Y(v) for v in (0,150,300,450)])
simple=[(X(t),Y(100*(1+.05*t))) for t in range(31)]
comp=[(X(t),Y(100*1.05**t)) for t in range(31)]
for i in range(0,30):
    pass
# dashed simple
for i in range(30):
    if i%2==0: line(d,simple[i:i+2],(150,154,160,255),7)
line(d,comp,fg,9)
text(d,(X(23),Y(432.2)+10),'복리 약 432만',34,fg,'rm')
text(d,(X(30)-10,Y(250)+64),'단리 250만',30,MUTED,'rm')
text(d,(640,120),'100만 원, 연 5% 예시 · 30년',30,MUTED,'mm',False)
save(im,'compound-interest-rule-of-72')

# 4 MDD
im,d,fg=canvas('money')
M=[100,108,115,120,110,96,90,99,112,125,130,117,124]
X=lambda i: 330+i/12*620; Y=lambda v: 580-(v-80)/60*430
gridlines(d,330,950,[Y(v) for v in (80,100,120,140)])
d.rectangle((X(3)*S,Y(120)*S,X(6)*S,Y(90)*S),fill=fg[:3]+(45,))
dashed(d,X(3),X(6)+40,Y(120),hexa(INK,120),3)
d.line([((X(6)+30)*S,Y(120)*S),((X(6)+30)*S,Y(90)*S)],fill=fg,width=5*S)
line(d,[(X(i),Y(v)) for i,v in enumerate(M)],hexa(INK),9)
for i,v,c in ((3,120,hexa(INK)),(6,90,fg)):
    r=12; d.ellipse(((X(i)-r)*S,(Y(v)-r)*S,(X(i)+r)*S,(Y(v)+r)*S),fill=c)
text(d,(X(6)+30,Y(120)-34),'-25%',40,fg)
text(d,(X(3),Y(120)-34),'고점',30,INK)
text(d,(X(6),Y(90)+40),'저점',30,fg)
text(d,(640,120),'최대 낙폭: 고점에서 가장 크게 떨어진 비율',30,MUTED,'mm',False)
save(im,'max-drawdown-mdd')

# 5 spaced repetition (concept, no numbers)
im,d,fg=canvas('learn')
X=lambda t: 330+t*620/30; Y=lambda r: 570-r*380
gridlines(d,330,950,[Y(v) for v in (0,.5,1)])
reviews=[0,3,7,12,19,30]; keeps=[0.5,0.58,0.66,0.74,0.8]
none=[(X(t/10),Y(math.exp(math.log(0.5)*(t/10)/3))) for t in range(0,301)]
for i in range(0,len(none)-1,14): line(d,none[i:i+8],(150,154,160,255),6)
for (a,b),keep in zip(zip(reviews,reviews[1:]),keeps):
    seg=[(X(a+j*(b-a)/80),Y(keep**(j/80))) for j in range(81)]
    line(d,seg,fg,8)
    if b<30:
        line(d,[seg[-1],(X(b),Y(1))],fg,4)
        r=11; d.ellipse(((X(b)-r)*S,(Y(1)-r)*S,(X(b)+r)*S,(Y(1)+r)*S),fill=fg)
keep=keeps[-1]
text(d,(950,Y(0.55)),'간격을 넓히며 복습',32,fg,'rm')
text(d,(X(12),Y(0.12)),'복습하지 않으면',28,MUTED,'lm')
text(d,(640,120),'망각 곡선과 간격 복습 (개념도)',30,MUTED,'mm',False)
save(im,'spaced-repetition-review')

# 6 suneung-korean-history-timeline: era timeline (years as written in the post)
im,d,fg=canvas('learn')
eras=[('고조선','기원전 2333'),('삼국','기원전 1세기'),('남북국','676'),('고려','918'),('조선','1392'),('개항기','1876'),('일제 강점기','1910'),('현대','1945')]
x0,x1,yl=345,935,400
d.line([(x0*S,yl*S),(x1*S,yl*S)],fill=hexa(INK,200),width=5*S)
step=(x1-x0)/(len(eras)-1)
for i,(era,yr) in enumerate(eras):
    x=x0+i*step; up=i%2==0
    c=fg if up else hexa(INK)
    r=13; d.ellipse(((x-r)*S,(yl-r)*S,(x+r)*S,(yl+r)*S),fill=c)
    ty=yl-70 if up else yl+70
    d.line([(x*S,(yl-(16 if up else -16))*S),(x*S,(ty+(26 if up else -26))*S)],fill=c,width=3*S)
    text(d,(x,ty),era,30,c)
    if yr: text(d,(x,ty+(-36 if up else 36)),yr,24,MUTED,'mm',False)
text(d,(640,120),'한국사 시대 흐름 (시대가 시작되는 연도)',30,MUTED,'mm',False)
save(im,'suneung-korean-history-timeline')
