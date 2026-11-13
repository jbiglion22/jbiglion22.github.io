"""Build the language pages, About pages, index.html and sitemap.xml from data/site.json.

The page content is written straight into the HTML so it can be read without JavaScript
(search engines, ad reviewers, readers with scripts off). js/app.js only adds the group
filter and small conveniences on top.

Run from anywhere:  python tools/build_pages.py
Optional:           python tools/build_pages.py --lastmod 2026-11-13
"""
import argparse
import datetime
import html
import json
import pathlib

ROOT = pathlib.Path(__file__).resolve().parent.parent
IMAGE_EXTENSIONS = ('webp', 'png', 'jpg', 'jpeg')


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


def esc(text):
    # Attributes are always double-quoted, so apostrophes (J's) can stay as they are.
    return html.escape(text, quote=False).replace('"', '&quot;')


def icon_markup(app, size):
    image = app.get('image') or find_image(f'apps/{app["id"]}')
    if image:
        return f'<img src="{esc(image)}" width="{size * 2}" height="{size * 2}" alt="" loading="lazy">'
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
  <link rel="icon" href="icons/favicon.svg" type="image/svg+xml">
  <link rel="stylesheet" href="css/styles.css">
  <script src="js/app.js" defer></script>
</head>'''


def header(site, code, menu):
    """menu: list of (language, href) shown in the language menu."""
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
  <a class="brand" href="index-{code}.html"><span class="brand-mark" aria-hidden="true">J</span><bdi>{esc(t["siteTitle"])}</bdi></a>
  <div class="top-end">
    <a class="top-link" href="{about_page_for(site, code)}"{about_attrs}>{esc(t["aboutLabel"])}</a>
    <details class="lang">
      <summary aria-label="{esc(t["languageLabel"])}: {esc(name)}">{esc(name)}</summary>
      <ul class="lang-menu">
{items}
      </ul>
    </details>
  </div>
</header>'''


def footer(site, code, year):
    t = site['text'][code]
    return f'''<footer class="foot">
  <p>{esc(t["footer"])}</p>
  <p class="foot-links"><a href="index-{code}.html">{esc(t["siteTitle"])}</a><a href="{about_page_for(site, code)}">{esc(t["aboutLabel"])}</a><span class="copyright">© <bdi><span class="year">{year}</span> jbiglion22</bdi></span></p>
</footer>'''


def build_page(site, lang, year):
    code = lang['code']
    t = site['text'][code]
    groups = site['groups']
    apps = site['apps']
    grouped = by_group(site)

    extra = hreflang_links(site) if code in site['indexed'] else '  <meta name="robots" content="noindex, follow">'
    menu = [(l, f'index-{l["code"]}.html') for l in site['languages']]

    tiles = ''.join(
        f'<a class="tile g-{a["group"]}" href="#app-{a["id"]}" data-app="{a["id"]}" tabindex="-1" '
        f'title="{esc(app_text(site, code, a["id"])["name"])}">{icon_markup(a, 22)}</a>'
        for g in groups for a in grouped[g])

    tabs = [f'        <button type="button" class="tab" data-filter="all" aria-pressed="true">{esc(t["all"])}<span class="tab-count">{len(apps)}</span></button>']
    tabs += [f'        <button type="button" class="tab" data-filter="{g}" aria-pressed="false">{esc(t["groups"][g])}<span class="tab-count">{len(grouped[g])}</span></button>'
             for g in groups]

    def card(a):
        x = app_text(site, code, a['id'])
        return f'''        <li>
          <a class="app" id="app-{a["id"]}" href="{homepage(site, a["id"])}" target="_blank" rel="noopener noreferrer">
            <span class="app-icon g-{a["group"]}">{icon_markup(a, 24)}</span>
            <span class="app-body">
              <span class="app-name">{esc(x["name"])}</span>
              <span class="app-tag">{esc(x["tag"])}</span>
              <span class="app-desc">{esc(x["desc"])}</span>
            </span>
            <span class="app-arrow" aria-hidden="true">↗</span>
            <span class="sr-only">{esc(t["visit"])} {esc(t["newWindow"])}</span>
          </a>
        </li>'''

    def group_head(g):
        cover = group_cover(site, g)
        cover_html = f'<img class="group-cover g-{g}" src="{cover}" alt="" loading="lazy">' if cover else ''
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
    <figure class="hero-art"><img src="{hero_image}" alt="" fetchpriority="high"><figcaption class="sr-only">{esc(t.get("imageNote", ""))}</figcaption></figure>
  </section>'''
    else:
        hero = f'''  <section class="hero">
    <div class="hero-text">
      <h1>{title_html}</h1>
      <p>{esc(t["intro"])}</p>
    </div>
    {board}
  </section>'''
    page = f'index-{code}.html'
    return f'''<!doctype html>
<!-- Generated by tools/build_pages.py from data/site.json. Edit the data, then run the script. -->
<html lang="{lang["tag"]}" dir="ltr">
{head(t, t["siteTitle"], t["intro"], extra, share_tags(site, t["siteTitle"], t["siteTitle"], t["intro"], page, lang["tag"]))}
<body>
{header(site, code, menu)}
<main id="main">
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
    about_codes = [l['code'] for l in site['languages'] if l['code'] in site['about']]
    extra = hreflang_links(site, page='about', default='about-en.html', codes=about_codes)
    menu = [(l, f'about-{l["code"]}.html') for l in site['languages'] if l['code'] in site['about']]

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
                cover_html = f'\n        <img class="about-cover" src="{cover}" alt="" loading="lazy">' if cover else ''
                block.append(f'''      <li>{cover_html}
        <h3><span class="group-dot g-{g}" aria-hidden="true"></span><a href="index-{code}.html#{g}">{esc(t["groups"][g])}</a><span class="group-count">{len(grouped[g])}</span></h3>
        <p>{esc(t["groupDesc"][g])}</p>
        <p class="about-apps">{esc(names)}</p>
      </li>''')
            block.append('    </ul>')
        block.append('  </section>')
        parts.append('\n'.join(block))

    about_image = find_image('about')
    art = (f'\n  <figure class="prose-art"><img src="{about_image}" alt="" fetchpriority="high">'
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
  <p class="prose-back"><a class="text-link" href="index-{code}.html">← {esc(a["back"])}</a></p>
</main>
{footer(site, code, year)}
</body>
</html>
'''


def build_entry(site):
    en = site['text']['en']
    nav = ''.join(f'<a href="index-{l["code"]}.html" lang="{l["tag"]}" hreflang="{l["tag"]}">{esc(l["name"])}</a>'
                  for l in site['languages'])
    return f'''<!doctype html>
<!-- Generated by tools/build_pages.py from data/site.json. -->
<html lang="en" dir="ltr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#f7f7f4">
  <meta name="description" content="{esc(en["intro"])}">
{hreflang_links(site)}
  <title>{esc(en["siteTitle"])}</title>
  <link rel="icon" href="icons/favicon.svg" type="image/svg+xml">
  <link rel="stylesheet" href="css/styles.css">
  <script src="js/languages.js"></script>
  <script>
  const selected = resolveSiteLanguage(navigator.languages || [navigator.language || 'en']);
  location.replace('index-' + selected + '.html' + location.search + location.hash);
  </script>
</head>
<body>
<main class="language-fallback"><h1>{esc(en["siteTitle"])}</h1><p>Choose your language</p><nav>{nav}</nav><p><a href="about-en.html">{esc(en["aboutLabel"])}</a></p></main>
</body>
</html>
'''


def build_redirect(site):
    """A page left at an old language address: it sends visitors to the English page and is not indexed."""
    en = site['text']['en']
    return f'''<!doctype html>
<!-- Generated by tools/build_pages.py: this language is no longer published, so the address forwards to English. -->
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="noindex">
  <link rel="canonical" href="index-en.html">
  <title>{esc(en["siteTitle"])}</title>
  <meta http-equiv="refresh" content="0; url=index-en.html">
  <script>location.replace('index-en.html' + location.search + location.hash);</script>
</head>
<body><a href="index-en.html">{esc(en["siteTitle"])}</a></body>
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

    index_alt = alternates('index', '', site['indexed'])
    about_codes = [l['code'] for l in site['languages'] if l['code'] in site['about']]
    about_alt = alternates('about', 'about-en.html', about_codes)
    body = url(base, '1.0', index_alt)
    body += ''.join(url(f'{base}index-{l["code"]}.html', '0.8', index_alt)
                    for l in site['languages'] if l['code'] in site['indexed'])
    body += ''.join(url(f'{base}about-{c}.html', '0.5', about_alt) for c in about_codes)
    order = [a for g in site['groups'] for a in site['apps'] if a['group'] == g]
    body += ''.join(url(homepage(site, a['id']), '0.7') for a in order)
    return ('<?xml version="1.0" encoding="UTF-8"?>\n'
            '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n'
            + body + '</urlset>\n')


def check(site):
    codes = [l['code'] for l in site['languages']]
    assert set(codes) == set(site['text']), 'every language needs a text entry'
    assert set(site['indexed']) <= set(codes)
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
    # js/languages.js (used by index.html for the automatic redirect) must list the same languages.
    lj = (ROOT / 'js' / 'languages.js').read_text(encoding='utf8')
    for c in codes:
        assert f'"{c}":' in lj, f'{c} missing in js/languages.js'


def write(path, text):
    path.write_text(text, encoding='utf8', newline='\n')


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--lastmod', default=datetime.date.today().isoformat())
    args = parser.parse_args()
    site = json.loads((ROOT / 'data' / 'site.json').read_text(encoding='utf8'))
    check(site)
    year = datetime.date.today().year
    for lang in site['languages']:
        write(ROOT / f'index-{lang["code"]}.html', build_page(site, lang, year))
        if lang['code'] in site['about']:
            write(ROOT / f'about-{lang["code"]}.html', build_about(site, lang, year))
    redirect = build_redirect(site)
    for code in site.get('redirects', []):
        write(ROOT / f'index-{code}.html', redirect)
    write(ROOT / 'index.html', build_entry(site))
    write(ROOT / 'sitemap.xml', build_sitemap(site, args.lastmod))
    print(f'Built {len(site["languages"])} language pages, {len(site["about"])} About pages, '
          f'{len(site.get("redirects", []))} redirect pages, index.html and sitemap.xml '
          f'({len(site["apps"])} apps, indexed: {", ".join(site["indexed"])}).')


if __name__ == '__main__':
    main()
