"""Korean blog pages: home, category pages, posts, app posts and the all-posts list.

Post sources are plain HTML files with a small header comment:

  content/posts/<slug>.html  ->  /posts/<slug>/   (articles)
  content/apps/<app id>.html ->  /apps/<app id>/  (one introduction post per app)

Header fields (one "key: value" per line inside the first <!-- ... --> comment):
  articles: title, date (YYYY-MM-DD), category, topic, apps (comma separated app ids),
            summary, image (optional, e.g. images/posts/x.webp), featured (optional: yes)
  app posts: app, date (the app's release date), topic, title, summary, image (optional)

Everything after the header comment is the body HTML. <h2> headings get ids and form the table of contents.

Pictures inside a post (photo-like images made on request) are written as
  <figure class="photo" data-src="images/posts/x.webp" data-alt="what the picture shows">caption</figure>
The figure is shown only when the file exists, so a requested picture can be placed before it arrives.
Charts and diagrams are drawn directly as inline SVG/HTML inside <figure class="chart">.
"""
import re

CONTENT_POST_KEYS = {'title', 'date', 'category', 'topic', 'apps', 'summary', 'image', 'featured'}
CONTENT_APP_KEYS = {'app', 'date', 'topic', 'title', 'summary', 'image'}


def parse_source(path, allowed):
    text = path.read_text(encoding='utf8')
    m = re.match(r'\s*<!--(.*?)-->', text, re.S)
    assert m, f'{path}: the file must start with a <!-- header --> comment'
    meta = {}
    for line in m.group(1).splitlines():
        line = line.strip()
        if not line:
            continue
        key, _, value = line.partition(':')
        key = key.strip()
        assert key in allowed, f'{path}: unknown header field "{key}"'
        meta[key] = value.strip()
    meta['body'] = text[m.end():].strip()
    assert re.fullmatch(r'\d{4}-\d{2}-\d{2}', meta.get('date', '')), f'{path}: date must be YYYY-MM-DD'
    return meta


def nice_date(iso):
    y, m, d = iso.split('-')
    return f'{y}. {int(m)}. {int(d)}'


def resolve_photos(body, root, esc, ai_label):
    """Turn <figure class="photo" data-src=... data-alt=...>caption</figure> into an image figure
    when the file exists, or drop it while the picture has not arrived yet."""
    def repl(m):
        attrs, caption = m.group(1), m.group(2).strip()
        src = re.search(r'data-src="([^"]+)"', attrs).group(1).lstrip('/')
        alt = re.search(r'data-alt="([^"]*)"', attrs)
        if not (root / src).exists():
            return ''
        return (f'<figure class="photo"><img src="/{src}" alt="{alt.group(1) if alt else ""}" loading="lazy">'
                f'<figcaption>{caption}<span class="ai-label">{esc(ai_label)}</span></figcaption></figure>')

    return re.sub(r'<figure class="photo"([^>]*)>(.*?)</figure>', repl, body, flags=re.S)


def add_heading_ids(body):
    """Give every <h2> an id (s1, s2, ...) and return (body, [(id, title)])."""
    toc = []

    def repl(m):
        attrs, inner = m.group(1), m.group(2)
        found = re.search(r'id="([^"]+)"', attrs)
        hid = found.group(1) if found else f's{len(toc) + 1}'
        toc.append((hid, re.sub(r'<[^>]+>', '', inner)))
        return m.group(0) if found else f'<h2 id="{hid}"{attrs}>{inner}</h2>'

    return re.sub(r'<h2([^>]*)>(.*?)</h2>', repl, body, flags=re.S), toc


class Blog:
    def __init__(self, site, h, root):
        self.site, self.h, self.root = site, h, root
        self.t = site['text']['ko']
        self.cfg = site['blog']
        self.cats = {c['id']: c for c in self.cfg['categories']}
        self.apps = {a['id']: a for a in site['apps']}
        self.items = self.load()

    # ---------- content ----------
    def load(self):
        items = []
        for path in sorted((self.root / 'content' / 'posts').glob('*.html')):
            m = parse_source(path, CONTENT_POST_KEYS)
            assert m.get('category') in self.cats, f'{path}: unknown category {m.get("category")}'
            m['apps'] = [a.strip() for a in m.get('apps', '').split(',') if a.strip()]
            for a in m['apps']:
                assert a in self.apps, f'{path}: unknown app {a}'
            m.update(kind='post', slug=path.stem, url=f'/posts/{path.stem}/')
            items.append(m)
        for path in sorted((self.root / 'content' / 'apps').glob('*.html')):
            m = parse_source(path, CONTENT_APP_KEYS)
            app = self.apps.get(m.get('app'))
            assert app and m['app'] == path.stem, f'{path}: "app" must be the app id and match the file name'
            m.update(kind='app', slug=path.stem, url=f'/apps/{path.stem}/', category=app['group'], apps=[path.stem])
            m.setdefault('title', self.h.app_text(self.site, 'ko', path.stem)['name'])
            m.setdefault('summary', self.h.app_text(self.site, 'ko', path.stem)['desc'])
            items.append(m)
        items.sort(key=lambda x: (x['date'], x['title']), reverse=True)
        return items

    def app_post(self, app_id):
        return next((i for i in self.items if i['kind'] == 'app' and i['slug'] == app_id), None)

    def app_link(self, app_id):
        """Apps link to their introduction post when it exists, otherwise to the app homepage."""
        return (self.app_post(app_id) and f'/apps/{app_id}/') or self.h.homepage(self.site, app_id)

    def image_for(self, item):
        if item.get('image'):
            return '/' + item['image'].lstrip('/')
        cover = self.h.find_image(f'group-{item["category"]}')
        return f'/{cover}' if cover else None

    # ---------- shared pieces ----------
    def head(self, title, description, path, noindex=False):
        h, site = self.h, self.site
        robots = '\n  <meta name="robots" content="noindex, follow">' if noindex else ''
        share = h.share_tags(site, self.t['siteTitle'], title, description, path.lstrip('/'), 'ko')
        return f'''<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#f7f7f4">
  <meta name="description" content="{h.esc(description)}">{robots}
  <link rel="canonical" href="{site["baseUrl"]}{path.lstrip("/")}">
{share}
  <title>{h.esc(title)}</title>
  <link rel="icon" href="/icons/favicon.svg" type="image/svg+xml">
  <link rel="stylesheet" href="/css/styles.css">
  <script src="/js/app.js" defer></script>
</head>'''

    def header(self, active=None, en_href='/index-en.html'):
        esc, t = self.h.esc, self.t
        cur = ' class="on" aria-current="page"'
        links = [f'<a href="/index-ko.html"{cur if active == "home" else ""}>{esc(self.cfg["homeLabel"])}</a>']
        links += [f'<a href="/category/{c["id"]}/"{cur if active == c["id"] else ""}>{esc(c["name"])}</a>'
                  for c in self.cfg['categories']]
        apps_cls = ' class="apps-link on" aria-current="page"' if active == 'apps' else ' class="apps-link"'
        links.append(f'<a href="/apps/"{apps_cls}>{esc(self.cfg["appsLabel"])} ↗</a>')
        return f'''<a class="skip" href="#main">{esc(t["skip"])}</a>
<header class="site-head" id="top">
  <div class="wrap">
    <div class="site-head-row">
      <a class="brand" href="/index-ko.html"><span class="brand-mark" aria-hidden="true">J</span><bdi>{esc(t["siteTitle"])}</bdi></a>
      <div class="top-end">
        <a class="top-link" href="/about-ko.html"{cur if active == "about" else ""}>{esc(t["aboutLabel"])}</a>
        <details class="lang">
          <summary aria-label="{esc(t["languageLabel"])}: 한국어">한국어</summary>
          <ul class="lang-menu">
            <li><a href="{en_href}" lang="en" hreflang="en">English</a></li>
            <li><a href="#" lang="ko" aria-current="page">한국어</a></li>
          </ul>
        </details>
      </div>
    </div>
    <nav class="menu" aria-label="{esc(self.cfg["menuLabel"])}">
      {chr(10).join("      " + l if i else l for i, l in enumerate(links))}
    </nav>
  </div>
</header>'''

    def footer(self, year):
        esc = self.h.esc
        return f'''<footer class="wrap blog-foot">
  <nav><a href="/index-ko.html">{esc(self.cfg["homeLabel"])}</a><a href="/apps/">{esc(self.cfg["appsLabel"])}</a><a href="/about-ko.html">{esc(self.t["aboutLabel"])}</a></nav>
  <span>© <bdi><span class="year">{year}</span> jbiglion22</bdi></span>
</footer>'''

    def page(self, title, description, path, active, main, year, en_href='/index-en.html', noindex=False):
        return f'''<!doctype html>
<!-- Generated by tools/build_pages.py from data/site.json and content/. Edit those, then run the script. -->
<html lang="ko" dir="ltr">
{self.head(title, description, path, noindex)}
<body>
{self.header(active, en_href)}
{main}
{self.footer(year)}
</body>
</html>
'''

    def chip(self, cat_id):
        return f'<span class="chip c-{cat_id}">{self.h.esc(self.cats[cat_id]["name"])}</span>'

    def row(self, item, heading='h3'):
        esc = self.h.esc
        img = self.image_for(item)
        img_html = f'\n    <img src="{img}" alt="" loading="lazy">' if img else ''
        app_chip = f'<span class="chip app-chip">{esc(self.cfg["appPostLabel"])}</span>' if item['kind'] == 'app' else ''
        return f'''  <a class="post" href="{item["url"]}" data-kind="{item["kind"]}" data-topic="{esc(item.get("topic", ""))}">
    <div>
      <{heading} class="post-title">{esc(item["title"])}</{heading}>
      <p>{esc(item["summary"])}</p>
      <div class="meta">{app_chip}{self.chip(item["category"])}<time datetime="{item["date"]}">{nice_date(item["date"])}</time></div>
    </div>{img_html}
  </a>'''

    def app_icon(self, app_id, size):
        app = self.apps[app_id]
        return f'<span class="icon g-{app["group"]}">{self.h.icon_markup(app, size)}</span>'

    # ---------- pages ----------
    def home(self, year):
        esc, h = self.h.esc, self.h
        articles = [i for i in self.items if i['kind'] == 'post']
        featured = next((i for i in articles if i.get('featured') == 'yes'), articles[0] if articles else self.items[0])
        img = self.image_for(featured)
        latest = [i for i in self.items if i is not featured][: self.cfg.get('homeCount', 10)]
        side_cats = '\n'.join(f'        <li><a href="/category/{c["id"]}/"><span class="dot c-{c["id"]}"></span>{esc(c["name"])}</a></li>'
                              for c in self.cfg['categories'])
        minis = ''.join(f'<a href="{self.app_link(a["id"])}" class="mini g-{a["group"]}" title="{esc(h.app_text(self.site, "ko", a["id"])["name"])}">{h.icon_markup(a, 16)}</a>'
                        for g in self.site['groups'] for a in self.site['apps'] if a['group'] == g)
        cards = '\n'.join(
            f'      <a href="/category/{c["id"]}/" class="c-{c["id"]}">'
            + (f'<img src="/{h.find_image("group-" + c["id"])}" alt="" loading="lazy">' if h.find_image('group-' + c['id']) else '<span class="noimg"></span>')
            + f'<div><strong>{esc(c["name"])}</strong><span>{esc(c["short"])}</span></div></a>'
            for c in self.cfg['categories'])
        main = f'''<main id="main" class="wrap">
  <section class="feature">
    {f'<img src="{img}" alt="">' if img else ''}
    <div>
      <span class="kicker"><span class="dot c-{featured["category"]}"></span>{esc(self.cats[featured["category"]]["name"])} · {esc(self.cfg["featuredLabel"])}</span>
      <h1><a href="{featured["url"]}">{esc(featured["title"])}</a></h1>
      <p>{esc(featured["summary"])}</p>
      <div class="meta"><time datetime="{featured["date"]}">{nice_date(featured["date"])}</time></div>
      <a class="btn" href="{featured["url"]}">{esc(self.cfg["readLabel"])}</a>
    </div>
  </section>
  <section class="layout">
    <aside class="side">
      <h2>{esc(self.cfg["categoriesLabel"])}</h2>
      <ul>
        <li><a href="/posts/">{esc(self.cfg["allPostsLabel"])}</a></li>
{side_cats}
      </ul>
      <div class="side-apps">
        <h2>{esc(self.cfg["appsTitle"])}</h2>
        <p>{esc(self.cfg["appsIntro"])}</p>
        <div class="mini-icons">{minis}</div>
        <a href="/apps/">{esc(self.cfg["allAppsLabel"])} →</a>
      </div>
    </aside>
    <div>
      <h2 class="section-title">{esc(self.cfg["latestLabel"])}</h2>
      <div class="post-list">
{chr(10).join(self.row(i) for i in latest)}
      </div>
      <a class="more" href="/posts/">{esc(self.cfg["allPostsLabel"])} →</a>
    </div>
  </section>
  <section class="apps-strip">
    <div class="block-head"><h2>{esc(self.cfg["categoriesLabel"])}</h2><a href="/apps/">{esc(self.cfg["allAppsLabel"])} →</a></div>
    <div class="group-cards">
{cards}
    </div>
  </section>
</main>'''
        title = self.t['siteTitle']
        return self.page(title, self.cfg['homeDescription'], '/index-ko.html', 'home', main, year)

    def topic_filter(self, items):
        esc = self.h.esc
        topics = []
        for i in items:
            if i.get('topic') and i['topic'] not in topics:
                topics.append(i['topic'])
        buttons = [f'<button type="button" class="topic" data-topic="all" aria-pressed="true">{esc(self.cfg["allLabel"])}</button>']
        if any(i['kind'] == 'app' for i in items) and any(i['kind'] == 'post' for i in items):
            buttons.append(f'<button type="button" class="topic" data-topic="kind:app" aria-pressed="false">{esc(self.cfg["appPostLabel"])}</button>')
        buttons += [f'<button type="button" class="topic" data-topic="{esc(tp)}" aria-pressed="false">{esc(tp)}</button>' for tp in topics]
        if len(buttons) < 3:
            return ''
        return f'    <div class="subtopics" role="group" aria-label="{esc(self.cfg["topicLabel"])}" hidden>{"".join(buttons)}</div>\n'

    def category(self, cat, year):
        esc, h = self.h.esc, self.h
        items = [i for i in self.items if i['category'] == cat['id']]
        cover = h.find_image(f'group-{cat["id"]}')
        apps = [a for a in self.site['apps'] if a['group'] == cat['id']]
        tiles = '\n'.join(
            f'      <a class="app-tile" href="{self.app_link(a["id"])}">{self.app_icon(a["id"], 22)}<div><strong>{esc(h.app_text(self.site, "ko", a["id"])["name"])}</strong><span>{esc(h.app_text(self.site, "ko", a["id"])["tag"])}</span></div></a>'
            for a in apps)
        main = f'''<main id="main" class="wrap">
  <section class="cat-head c-{cat["id"]}">
    <div>
      <div class="crumb"><a href="/index-ko.html">{esc(self.cfg["homeLabel"])}</a> › {esc(self.cfg["categoryLabel"])}</div>
      <h1>{esc(cat["name"])}</h1>
      <p>{esc(cat["desc"])}</p>
    </div>
    {f'<img src="/{cover}" alt="">' if cover else ''}
  </section>
  <section class="cat-apps">
    <div class="block-head"><h2>{esc(self.cfg["catAppsTitle"])}</h2><span>{esc(self.cfg["catAppsNote"])}</span></div>
    <div class="app-row">
{tiles}
    </div>
  </section>
  <section class="cat-posts">
    <div class="block-head"><h2>{esc(self.cfg["postsLabel"])}</h2><span>{esc(self.cfg["newestFirst"])}</span></div>
{self.topic_filter(items)}    <div class="post-list" data-filterable>
{chr(10).join(self.row(i) for i in items)}
    </div>
  </section>
</main>'''
        title = f'{cat["name"]} · {self.t["siteTitle"]}'
        return self.page(title, cat['desc'], f'/category/{cat["id"]}/', cat['id'], main, year)

    def all_posts(self, year):
        esc = self.h.esc
        main = f'''<main id="main" class="wrap">
  <section class="list-page">
    <div class="crumb"><a href="/index-ko.html">{esc(self.cfg["homeLabel"])}</a></div>
    <h1>{esc(self.cfg["allPostsLabel"])}</h1>
    <p class="list-intro">{esc(self.cfg["allPostsIntro"])}</p>
{self.topic_filter(self.items).replace(' role="group"', ' role="group" data-wide')}    <div class="post-list" data-filterable>
{chr(10).join(self.row(i, 'h2') for i in self.items)}
    </div>
  </section>
</main>'''
        title = f'{self.cfg["allPostsLabel"]} · {self.t["siteTitle"]}'
        return self.page(title, self.cfg['allPostsIntro'], '/posts/', None, main, year)

    def neighbours(self, item, pool):
        """Previous (older) and next (newer) item within the pool, which is sorted newest first."""
        idx = pool.index(item)
        older = pool[idx + 1] if idx + 1 < len(pool) else None
        newer = pool[idx - 1] if idx > 0 else None
        return older, newer

    def prevnext(self, older, newer, older_label, newer_label):
        esc = self.h.esc
        a = f'<a href="{older["url"]}"><small>← {esc(older_label)}</small><strong>{esc(older["title"])}</strong></a>' if older else '<span></span>'
        b = f'<a href="{newer["url"]}"><small>{esc(newer_label)} →</small><strong>{esc(newer["title"])}</strong></a>' if newer else '<span></span>'
        return f'    <nav class="prevnext">{a}{b}</nav>'

    def aside(self, toc, related_title, related):
        esc = self.h.esc
        toc_html = ''.join(f'<li><a href="#{i}">{esc(tx)}</a></li>' for i, tx in toc)
        rel = ''.join(
            f'<a href="{r["url"]}">' + (f'<img src="{self.image_for(r)}" alt="" loading="lazy">' if self.image_for(r) else '<span class="noimg"></span>')
            + f'<span>{esc(r["title"])}</span></a>' for r in related)
        out = '  <aside class="aside">\n'
        if toc_html:
            out += f'    <h2>{esc(self.cfg["tocLabel"])}</h2>\n    <ul class="toc">{toc_html}</ul>\n'
        if rel:
            out += f'    <div class="related"><h2>{esc(related_title)}</h2>{rel}</div>\n'
        return out + '  </aside>'

    def figure(self, item):
        img = self.image_for(item)
        if not img:
            return ''
        return f'\n    <figure class="cover"><img src="{img}" alt=""><figcaption class="sr-only">{self.h.esc(self.t["imageNote"])}</figcaption></figure>'

    def post(self, item, year):
        esc, h = self.h.esc, self.h
        cat = self.cats[item['category']]
        body, toc = add_heading_ids(resolve_photos(item['body'], self.root, esc, self.cfg['aiImageLabel']))
        pool = [i for i in self.items if i['category'] == item['category']]
        older, newer = self.neighbours(item, pool)
        app_cards = '\n'.join(
            f'''    <div class="app-card">
      {self.app_icon(a, 26)}
      <div>
        <small>{esc(self.cfg["relatedAppLabel"])}</small>
        <strong>{esc(h.app_text(self.site, "ko", a)["name"])}</strong>
        <p>{esc(h.app_text(self.site, "ko", a)["desc"])}</p>
      </div>
      <a class="go" href="{self.app_link(a)}">{esc(self.cfg["appPostLink"])} →</a>
    </div>''' for a in item['apps'])
        related = [i for i in pool if i is not item][:3]
        topic = f' › {esc(item["topic"])}' if item.get('topic') else ''
        main = f'''<main id="main" class="wrap article-wrap">
  <article class="article c-{cat["id"]}">
    <div class="crumb"><a href="/index-ko.html">{esc(self.cfg["homeLabel"])}</a> › <a href="/category/{cat["id"]}/">{esc(cat["name"])}</a>{topic}</div>
    <h1>{esc(item["title"])}</h1>
    <p class="lead">{esc(item["summary"])}</p>
    <div class="meta">{esc(self.cfg["writtenLabel"])} <time datetime="{item["date"]}">{nice_date(item["date"])}</time></div>{self.figure(item)}
    <div class="body">
{body}
    </div>
{app_cards}
{self.prevnext(older, newer, self.cfg["olderLabel"], self.cfg["newerLabel"])}
  </article>
{self.aside(toc, self.cfg["moreInCategory"].replace("{category}", cat["name"]), related)}
</main>'''
        title = f'{item["title"]} · {self.t["siteTitle"]}'
        return self.page(title, item['summary'], item['url'], cat['id'], main, year)

    def app_page(self, item, year):
        esc, h, site = self.h.esc, self.h, self.site
        app_id = item['slug']
        app = self.apps[app_id]
        x = h.app_text(site, 'ko', app_id)
        cat = self.cats[item['category']]
        body, toc = add_heading_ids(resolve_photos(item['body'], self.root, esc, self.cfg['aiImageLabel']))
        reading = [i for i in self.items if i['kind'] == 'post' and app_id in i['apps']]
        if reading:
            links = ''.join(f'<li><a class="text-link" href="{r["url"]}">{esc(r["title"])}</a></li>' for r in reading)
            body += f'\n<h2 id="read-more">{esc(self.cfg["readTogether"])}</h2>\n<ul class="link-list">{links}</ul>'
            toc.append(('read-more', self.cfg['readTogether']))
        group_apps = [a['id'] for a in site['apps'] if a['group'] == app['group']]
        idx = group_apps.index(app_id)
        prev_item = self.app_post(group_apps[idx - 1]) if idx > 0 else None
        next_item = self.app_post(group_apps[idx + 1]) if idx + 1 < len(group_apps) else None
        others = [self.app_post(a) for a in group_apps if a != app_id and self.app_post(a)][:4]
        topic = f' · {esc(item["topic"])}' if item.get('topic') else ''
        main = f'''<main id="main" class="wrap article-wrap">
  <article class="article c-{cat["id"]}">
    <div class="crumb"><a href="/index-ko.html">{esc(self.cfg["homeLabel"])}</a> › <a href="/category/{cat["id"]}/">{esc(cat["name"])}</a> › {esc(self.cfg["appPostLabel"])}</div>
    <div class="app-hero">
      <span class="big-icon g-{app["group"]}">{h.icon_markup(app, 40)}</span>
      <div>
        <small>{esc(self.cfg["appPostLabel"])}{topic}</small>
        <h1>{esc(x["name"])}</h1>
        <p class="lead">{esc(item["summary"])}</p>
      </div>
    </div>
    <div class="meta">{esc(self.cfg["writtenLabel"])} <time datetime="{item["date"]}">{nice_date(item["date"])}</time> <span class="muted">({esc(self.cfg["releaseNote"])})</span></div>{self.figure(item)}
    <div class="body">
{body}
    </div>
    <div class="cta">
      <div><strong>{esc(self.cfg["ctaTitle"].replace("{app}", x["name"]))}</strong><span>{esc(self.cfg["ctaText"])}</span></div>
      <a href="{h.homepage(site, app_id)}" target="_blank" rel="noopener noreferrer">{esc(self.cfg["ctaButton"])} ↗<span class="sr-only"> {esc(self.t["newWindow"])}</span></a>
    </div>
    <p class="note-small">{esc(self.cfg["updateNote"])}</p>
{self.prevnext(prev_item, next_item, self.cfg["prevAppLabel"], self.cfg["nextAppLabel"])}
  </article>
{self.aside(toc, self.cfg["otherApps"], others)}
</main>'''
        title = f'{item["title"]} · {self.t["siteTitle"]}'
        return self.page(title, item['summary'], item['url'], cat['id'], main, year)

    # ---------- output ----------
    def pages(self, year):
        """Return {relative output path: html} for every blog page."""
        out = {'index-ko.html': self.home(year), 'posts/index.html': self.all_posts(year)}
        for c in self.cfg['categories']:
            out[f'category/{c["id"]}/index.html'] = self.category(c, year)
        for i in self.items:
            if i['kind'] == 'post':
                out[f'posts/{i["slug"]}/index.html'] = self.post(i, year)
            else:
                out[f'apps/{i["slug"]}/index.html'] = self.app_page(i, year)
        return out

    def sitemap_urls(self):
        """(path, priority) for the sitemap."""
        urls = [('posts/', '0.6')] + [(f'category/{c["id"]}/', '0.7') for c in self.cfg['categories']]
        urls += [(i['url'].lstrip('/'), '0.8' if i['kind'] == 'post' else '0.7') for i in self.items]
        return urls
