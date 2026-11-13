"""Build the site from data/site.json and content/: the Korean blog (see tools/blog.py;
its home is index.html), the app lists, About pages, forwarding pages for unpublished addresses and sitemap.xml.

The page content is written straight into the HTML so it can be read without JavaScript
(search engines, ad reviewers, readers with scripts off). js/app.js only adds the group
filter and small conveniences on top.

Run from anywhere:  python tools/build_pages.py
Optional:           python tools/build_pages.py --lastmod 2026-11-13
"""
import argparse
import datetime
import hashlib
import html
import json
import pathlib
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
BLOG = None  # set in main(): the tools/blog.py Blog instance
sys.path.insert(0, str(pathlib.Path(__file__).resolve().parent))
import blog  # noqa: E402  (tools/blog.py)
IMAGE_EXTENSIONS = ('webp', 'png', 'jpg', 'jpeg')


def asset(path):
    """Root-relative address with a short content hash, so browsers fetch the new file after every change."""
    digest = hashlib.md5((ROOT / path).read_bytes()).hexdigest()[:8]
    return f'/{path}?v={digest}'


def find_image(stem):
    """Return 'images/<stem>.<ext>' when that picture has been added, otherwise None.
    Pictures are optional: the pages look complete without them (see 이미지요청.md)."""
    for ext in IMAGE_EXTENSIONS:
        if (ROOT / 'images' / f'{stem}.{ext}').exists():
            return f'images/{stem}.{ext}'
    return None


def group_cover(site, group):
    """Group pictures are used only when every group has one, so the list never looks half-finished."""
    if all(find_image(f'group-{g}') for g in site['groups']):
        return find_image(f'group-{group}')
    return None


NEW_WINDOW = ' target="_blank" rel="noopener noreferrer"'


def published_about(site):
    return [l['code'] for l in site['languages'] if l['code'] in site['about'] and l['code'] in site['published']]


def home_href(code):
    """The Korean blog home is the site root; other languages have index-<code>.html."""
    return '/' if code == 'ko' else f'/index-{code}.html'


def group_href(code, group):
    return f'/category/{group}/' if code == 'ko' else f'/index-{code}.html#{group}'


def esc(text):
    # Attributes are always double-quoted, so apostrophes (J's) can stay as they are.
    return html.escape(text, quote=False).replace('"', '&quot;')


def icon_markup(app, size):
    image = app.get('image') or find_image(f'apps/{app["id"]}')
    if image:
        return f'<img src="/{esc(image)}" width="{size * 2}" height="{size * 2}" alt="" loading="lazy">'
    return (f'<svg viewBox="0 0 24 24" width="{size}" height="{size}" fill="none" stroke="currentColor" '
            f'stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">{app["icon"]}</svg>')


def app_text(site, lang, app_id):
    return site['text'][lang]['apps'].get(app_id) or site['text']['en']['apps'][app_id]


def homepage(site, app_id):
    return f'{site["baseUrl"]}{app_id}_home/'


def by_group(site):
    return {g: [a for a in site['apps'] if a['group'] == g] for g in site['groups']}


def about_page_for(site, code):
    return f'about-{code}.html' if code in site['about'] else 'about-en.html'


def hreflang_links(site, page='index', default='index.html', codes=None, indent='  '):
    codes = codes if codes is not None else site['indexed']
    lines = [f'{indent}<link rel="alternate" hreflang="{lang["tag"]}" href="{page}-{lang["code"]}.html">'
             for lang in site['languages'] if lang['code'] in codes]
    lines.append(f'{indent}<link rel="alternate" hreflang="x-default" href="{default}">')
    return '\n'.join(lines)


def share_tags(site, site_name, title, description, page, lang_tag):
    """Open Graph tags used when a page is shared in messengers and social apps."""
    tags = [
        f'  <meta property="og:type" content="website">',
        f'  <meta property="og:site_name" content="{esc(site_name)}">',
        f'  <meta property="og:title" content="{esc(title)}">',
        f'  <meta property="og:description" content="{esc(description)}">',
        f'  <meta property="og:url" content="{site["baseUrl"]}{page}">',
        f'  <meta property="og:locale" content="{"ko_KR" if lang_tag == "ko" else "en_US"}">',
    ]
    image = find_image('og-image')
    if image:
        tags += [f'  <meta property="og:image" content="{site["baseUrl"]}{image}">',
                 '  <meta name="twitter:card" content="summary_large_image">']
    return '\n'.join(tags)


def head(t, title, description, extra, share=''):
    return f'''<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#f7f7f4">
  <meta name="description" content="{esc(description)}">
{extra}
{share}
  <title>{esc(title)}</title>
  <link rel="icon" href="/icons/favicon.svg" type="image/svg+xml">
  <link rel="stylesheet" href="{asset("css/styles.css")}">
  <script src="{asset("js/app.js")}" defer></script>
</head>'''


def header(site, code, menu):
    """menu: list of (language, href) shown in the language menu. Korean pages use the blog header."""
    if code == 'ko':
        en = next((href for l, href in menu if l['code'] == 'en'), '/index-en.html')
        return BLOG.header(site.get('_active'), en)
    t = site['text'][code]
    name = next(l['name'] for l in site['languages'] if l['code'] == code)
    current = ' aria-current="page"'
    items = '\n'.join(
        f'        <li><a href="{href}" lang="{l["tag"]}" hreflang="{l["tag"]}"'
        f'{current if l["code"] == code else ""}>{esc(l["name"])}</a></li>'
        for l, href in menu)
    about_lang = code if code in site['about'] else 'en'
    about_attrs = '' if about_lang == code else ' hreflang="en"'
    return f'''<a class="skip" href="#main">{esc(t["skip"])}</a>
<header class="top" id="top">
  <a class="brand" href="/index-{code}.html"><span class="brand-mark" aria-hidden="true">J</span><bdi>{esc(t["siteTitle"])}</bdi></a>
  <div class="top-end">
    <a class="top-link" href="/{about_page_for(site, code)}"{about_attrs}>{esc(t["aboutLabel"])}</a>
    <details class="lang">
      <summary aria-label="{esc(t["languageLabel"])}: {esc(name)}">{esc(name)}</summary>
      <ul class="lang-menu">
{items}
      </ul>
    </details>
  </div>
</header>'''


def footer(site, code, year):
    if code == 'ko':
        return BLOG.footer(year)
    t = site['text'][code]
    return f'''<footer class="foot">
  <p>{esc(t["footer"])}</p>
  <p class="foot-links"><a href="/index-{code}.html">{esc(t["siteTitle"])}</a><a href="/{about_page_for(site, code)}">{esc(t["aboutLabel"])}</a><span class="copyright">© <bdi><span class="year">{year}</span> jbiglion22</bdi></span></p>
</footer>'''


def build_page(site, lang, year):
    code = lang['code']
    t = site['text'][code]
    groups = site['groups']
    apps = site['apps']
    grouped = by_group(site)

    # The Korean app list lives at /apps/ (the Korean home is the blog); its apps link to the app posts.
    korean = code == 'ko'
    extra = ''
    menu = [(l, '/index-en.html' if l['code'] == 'en' else '/apps/') for l in site['languages']]

    tiles = ''.join(
        f'<a class="tile g-{a["group"]}" href="#app-{a["id"]}" data-app="{a["id"]}" tabindex="-1" '
        f'title="{esc(app_text(site, code, a["id"])["name"])}">{icon_markup(a, 22)}</a>'
        for g in groups for a in grouped[g])

    tabs = [f'        <button type="button" class="tab" data-filter="all" aria-pressed="true">{esc(t["all"])}<span class="tab-count">{len(apps)}</span></button>']
    tabs += [f'        <button type="button" class="tab" data-filter="{g}" aria-pressed="false">{esc(t["groups"][g])}<span class="tab-count">{len(grouped[g])}</span></button>'
             for g in groups]

    sr_new = f'<span class="sr-only">{esc(t["visit"])} {esc(t["newWindow"])}</span>'

    def card(a):
        x = app_text(site, code, a['id'])
        return f'''        <li>
          <a class="app" id="app-{a["id"]}" href="{BLOG.app_link(a["id"]) if korean else homepage(site, a["id"])}"{"" if korean else NEW_WINDOW}>
            <span class="app-icon g-{a["group"]}">{icon_markup(a, 24)}</span>
            <span class="app-body">
              <span class="app-name">{esc(x["name"])}</span>
              <span class="app-tag">{esc(x["tag"])}</span>
              <span class="app-desc">{esc(x["desc"])}</span>
            </span>
            <span class="app-arrow" aria-hidden="true">{"→" if korean else "↗"}</span>
            {"" if korean else sr_new}
          </a>
        </li>'''

    def group_head(g):
        cover = group_cover(site, g)
        cover_html = f'<img class="group-cover g-{g}" src="/{cover}" alt="" loading="lazy">' if cover else ''
        desc = t.get('groupDesc', {}).get(g)
        desc_html = f'\n        <p class="group-desc">{esc(desc)}</p>' if desc else ''
        return f'''      <div class="group-head{' has-cover' if cover else ''}">
        {cover_html}<div class="group-head-text">
        <h2 id="title-{g}" class="group-title"><span class="group-dot g-{g}" aria-hidden="true"></span>{esc(t["groups"][g])}<span class="group-count">{len(grouped[g])}</span></h2>{desc_html}
        </div>
      </div>'''

    sections = '\n'.join(f'''    <section class="group" data-group="{g}" aria-labelledby="title-{g}">
{group_head(g)}
      <ul class="app-list">
{chr(10).join(card(a) for a in grouped[g])}
      </ul>
    </section>''' for g in groups)

    title_html = esc(t['title']).replace('\n', ' <br>')
    board = f'<div class="board" aria-hidden="true">{tiles}</div>'
    hero_image = find_image('hero')
    if hero_image:
        # With an illustration, the icon board moves under the intro text.
        hero = f'''  <section class="hero has-art">
    <div class="hero-text">
      <h1>{title_html}</h1>
      <p>{esc(t["intro"])}</p>
      {board}
    </div>
    <figure class="hero-art"><img src="/{hero_image}" alt="" fetchpriority="high"><figcaption class="sr-only">{esc(t.get("imageNote", ""))}</figcaption></figure>
  </section>'''
    else:
        hero = f'''  <section class="hero">
    <div class="hero-text">
      <h1>{title_html}</h1>
      <p>{esc(t["intro"])}</p>
    </div>
    {board}
  </section>'''
    page = 'apps/' if korean else f'index-{code}.html'
    title = f'{BLOG.cfg["appsTitle"]} · {t["siteTitle"]}' if korean else t['siteTitle']
    site['_active'] = 'apps'
    return f'''<!doctype html>
<!-- Generated by tools/build_pages.py from data/site.json. Edit the data, then run the script. -->
<html lang="{lang["tag"]}" dir="ltr">
{head(t, title, t["intro"], extra, share_tags(site, t["siteTitle"], title, t["intro"], page, lang["tag"]))}
<body>
{header(site, code, menu)}
<main id="main"{' class="apps-page"' if korean else ''}>
{hero}
  <section class="apps" id="apps">
    <div class="tabs-wrap" hidden>
      <div class="tabs" role="group" aria-label="{esc(t["filterLabel"])}">
{chr(10).join(tabs)}
      </div>
    </div>
{sections}
  </section>
</main>
{footer(site, code, year)}
</body>
</html>
'''


def build_about(site, lang, year):
    code = lang['code']
    t = site['text'][code]
    a = site['about'][code]
    grouped = by_group(site)
    about_codes = [c for c in published_about(site)]
    extra = hreflang_links(site, page='about', default='about-en.html', codes=about_codes) if len(about_codes) > 1 else ''
    menu = [(l, f'/about-{l["code"]}.html') for l in site['languages'] if l['code'] in about_codes]
    site['_active'] = 'about'

    def paragraph(text):
        text = text.replace('{count}', str(len(site['apps']))).replace('{groups}', str(len(site['groups'])))
        return f'    <p>{esc(text)}</p>'

    parts = []
    for s in a['sections']:
        block = [f'  <section class="prose-section">', f'    <h2>{esc(s["h"])}</h2>']
        block += [paragraph(p) for p in s['p']]
        if 'groups' in s:
            block.append('    <ul class="about-groups">')
            for g in site['groups']:
                names = ', '.join(app_text(site, code, x['id'])['name'] for x in grouped[g])
                cover = group_cover(site, g)
                cover_html = f'\n        <img class="about-cover" src="/{cover}" alt="" loading="lazy">' if cover else ''
                block.append(f'''      <li>{cover_html}
        <h3><span class="group-dot g-{g}" aria-hidden="true"></span><a href="{group_href(code, g)}">{esc(t["groups"][g])}</a><span class="group-count">{len(grouped[g])}</span></h3>
        <p>{esc(t["groupDesc"][g])}</p>
        <p class="about-apps">{esc(names)}</p>
      </li>''')
            block.append('    </ul>')
        block.append('  </section>')
        parts.append('\n'.join(block))

    about_image = find_image('about')
    art = (f'\n  <figure class="prose-art"><img src="/{about_image}" alt="" fetchpriority="high">'
           f'<figcaption class="sr-only">{esc(t.get("imageNote", ""))}</figcaption></figure>') if about_image else ''
    page = f'about-{code}.html'
    title = f'{a["title"]} · {t["siteTitle"]}'
    return f'''<!doctype html>
<!-- Generated by tools/build_pages.py from data/site.json. Edit the data, then run the script. -->
<html lang="{lang["tag"]}" dir="ltr">
{head(t, title, a["description"], extra, share_tags(site, t["siteTitle"], title, a["description"], page, lang["tag"]))}
<body>
{header(site, code, menu)}
<main id="main" class="prose">
  <h1>{esc(a["title"])}</h1>
  <p class="prose-lead">{esc(a["lead"])}</p>{art}
{chr(10).join(parts)}
  <p class="prose-back"><a class="text-link" href="{home_href(code)}">← {esc(a["back"])}</a></p>
</main>
{footer(site, code, year)}
</body>
</html>
'''


def build_redirect(site, target):
    """A page left at an address that is no longer published: it forwards to target and is not indexed."""
    t = site['text']['ko']
    return f'''<!doctype html>
<!-- Generated by tools/build_pages.py: this address is not published now, so it forwards to {target}. -->
<html lang="ko">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="noindex">
  <link rel="canonical" href="{target}">
  <title>{esc(t["siteTitle"])}</title>
  <meta http-equiv="refresh" content="0; url={target}">
  <script>location.replace('{target}' + location.search + location.hash);</script>
</head>
<body><a href="{target}">{esc(t["siteTitle"])}</a></body>
</html>
'''


def build_sitemap(site, lastmod):
    base = site['baseUrl']

    def alternates(page, default, codes):
        out = ''.join(f'    <xhtml:link rel="alternate" hreflang="{l["tag"]}" href="{base}{page}-{l["code"]}.html"/>\n'
                      for l in site['languages'] if l['code'] in codes)
        return out + f'    <xhtml:link rel="alternate" hreflang="x-default" href="{base}{default}"/>\n'

    def url(loc, priority, alt=''):
        return f'  <url>\n    <loc>{loc}</loc>\n    <lastmod>{lastmod}</lastmod>\n    <priority>{priority}</priority>\n{alt}  </url>\n'

    about_codes = published_about(site)
    about_alt = alternates('about', 'about-en.html', about_codes) if len(about_codes) > 1 else ''
    body = url(base, '1.0')
    body += ''.join(url(f'{base}index-{c}.html', '0.9') for c in site['published'] if c != 'ko')
    body += url(f'{base}apps/', '0.8')
    body += ''.join(url(f'{base}{path}', pr) for path, pr in BLOG.sitemap_urls())
    body += ''.join(url(f'{base}about-{c}.html', '0.5', about_alt) for c in about_codes)
    order = [a for g in site['groups'] for a in site['apps'] if a['group'] == g]
    body += ''.join(url(homepage(site, a['id']), '0.7') for a in order)
    return ('<?xml version="1.0" encoding="UTF-8"?>\n'
            '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n'
            + body + '</urlset>\n')


def check(site):
    codes = [l['code'] for l in site['languages']]
    assert set(codes) == set(site['text']), 'every language needs a text entry'
    assert site['published'] and set(site['published']) <= set(codes), 'published must list known languages'
    assert 'ko' in site['published'], 'the Korean blog is the site root, so Korean must be published'
    assert 'en' in site['about'] and set(site['about']) <= set(codes)
    assert not set(site.get('redirects', [])) & set(codes), 'a published language cannot also be a redirect'
    ids = [a['id'] for a in site['apps']]
    assert len(ids) == len(set(ids)), 'duplicate app id'
    for a in site['apps']:
        assert a['group'] in site['groups'], a
        assert a['id'] in site['text']['en']['apps'], f'English text missing for {a["id"]}'
    for code, t in site['text'].items():
        assert set(t['groups']) == set(site['groups']), f'group names missing in {code}'
        assert t.get('aboutLabel'), f'aboutLabel missing in {code}'
        assert set(t.get('groupDesc', {})) == set(site['groups']), f'groupDesc missing in {code}'
    cats = [c['id'] for c in site['blog']['categories']]
    assert sorted(cats) == sorted(site['groups']), 'each app group needs one blog category with the same id'


def write(path, text):
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(text, encoding='utf8', newline='\n')


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--lastmod', default=datetime.date.today().isoformat())
    args = parser.parse_args()
    site = json.loads((ROOT / 'data' / 'site.json').read_text(encoding='utf8'))
    check(site)
    global BLOG
    BLOG = blog.Blog(site, sys.modules[__name__], ROOT)
    year = datetime.date.today().year
    published = site['published']
    redirects = {}  # address -> where it forwards
    for lang in site['languages']:
        code = lang['code']
        if code not in published:
            # Hidden for now: keep the address working by forwarding to the Korean page.
            redirects[f'index-{code}.html'] = '/'
            if code in site['about']:
                redirects[f'about-{code}.html'] = '/about-ko.html'
            continue
        # Korean: the blog home is the site root (index.html) and the app list is /apps/.
        target = ROOT / 'apps' / 'index.html' if code == 'ko' else ROOT / f'index-{code}.html'
        write(target, build_page(site, lang, year))
        if code in site['about']:
            write(ROOT / f'about-{code}.html', build_about(site, lang, year))
    for rel, page in BLOG.pages(year).items():  # includes index.html (Korean blog home)
        write(ROOT / rel, page)
    redirects['index-ko.html'] = '/'  # the Korean home used to live here
    for code in site.get('redirects', []):
        redirects[f'index-{code}.html'] = '/'
    for address, target in redirects.items():
        write(ROOT / address, build_redirect(site, target))
    write(ROOT / 'sitemap.xml', build_sitemap(site, args.lastmod))
    missing = BLOG.missing_covers()
    if missing:
        # Every post should have its own cover picture; request the missing ones in 이미지요청.md.
        print(f'Note: {len(missing)} post(s) use the category picture because their own cover is missing: '
              + ', '.join(missing))
    print(f'Blog: {sum(i["kind"] == "post" for i in BLOG.items)} posts, {sum(i["kind"] == "app" for i in BLOG.items)} app posts, '
          f'{len(site["blog"]["categories"])} categories.')
    print(f'Published languages: {", ".join(published)}. Forwarding pages: {", ".join(sorted(redirects))}.')


if __name__ == '__main__':
    main()
