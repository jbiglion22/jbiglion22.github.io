// The page content is written into each index-*.html by tools/build_pages.py (from data/site.json).
// This script only adds the group filter, the icon-board shortcut and the language menu behavior.
// Without JavaScript the page still shows every app; the filter buttons stay hidden.

// Old addresses used #calc for the calculator group.
const hashAliases = {calc: 'money'};

const tabsWrap = document.querySelector('.tabs-wrap');
const tabs = [...document.querySelectorAll('.tab')];
const groupEls = [...document.querySelectorAll('.group')];
const groups = groupEls.map(g => g.dataset.group);
if (tabsWrap) tabsWrap.hidden = false;

// Group filter: the group is kept in the address (for example index-ko.html#learn) so it can be shared.
const setFilter = (id, updateAddress) => {
  tabs.forEach(b => b.setAttribute('aria-pressed', String(b.dataset.filter === id)));
  groupEls.forEach(g => { g.hidden = id !== 'all' && g.dataset.group !== id; });
  // On narrow screens the tabs scroll sideways: keep the selected one in view.
  const active = tabs.find(b => b.dataset.filter === id);
  const row = active.parentElement;
  if (row.scrollWidth > row.clientWidth) row.scrollLeft = active.offsetLeft - row.offsetLeft - 20;
  if (!updateAddress) return;
  try { history.replaceState(null, '', id === 'all' ? window.location.pathname + window.location.search : `#${id}`); } catch (e) { /* Address update is optional. */ }
};
const fromHash = () => {
  const h = window.location.hash.slice(1);
  const g = hashAliases[h] || h;
  return groups.includes(g) ? g : 'all';
};
// Only the app list pages have the filter; the About page does not.
if (tabs.length) {
  tabs.forEach(b => b.addEventListener('click', () => setFilter(b.dataset.filter, true)));
  setFilter(fromHash(), false);
  window.addEventListener('hashchange', () => setFilter(fromHash(), false));
}

// A tile in the intro board shows all groups, then scrolls to that app and briefly marks it.
document.querySelectorAll('.tile').forEach(tile => tile.addEventListener('click', e => {
  e.preventDefault();
  setFilter('all', true);
  const card = document.getElementById(`app-${tile.dataset.app}`);
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  card.scrollIntoView({behavior: reduce ? 'auto' : 'smooth', block: 'center'});
  card.focus({preventScroll: true});
  card.classList.remove('is-marked');
  void card.offsetWidth;
  card.classList.add('is-marked');
}));

// Language menu: keep the address hash (group filter) when switching, close on outside click or Escape.
const langMenu = document.querySelector('details.lang');
if (langMenu) {
  langMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    const h = window.location.hash;
    if (h) a.href = a.getAttribute('href').split('#')[0] + h;
  }));
  document.addEventListener('click', e => { if (langMenu.open && !langMenu.contains(e.target)) langMenu.open = false; });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && langMenu.open) { langMenu.open = false; langMenu.querySelector('summary').focus(); }
  });
}

// Blog: topic buttons above a post list (category pages, all posts). Without JavaScript every post is shown.
// A list with data-per-page is also split into pages (all posts: 10 per page, ?page=2 in the address).
document.querySelectorAll('.subtopics').forEach(box => {
  const list = box.parentElement.querySelector('[data-filterable]');
  if (!list) return;
  box.hidden = false;
  const buttons = [...box.querySelectorAll('.topic')];
  const posts = [...list.querySelectorAll('.post')];
  const pager = box.parentElement.querySelector('.pager');
  const perPage = Number(list.dataset.perPage) || 0;
  let topic = 'all';
  let page = 1;

  const readPage = () => Math.max(1, parseInt(new URLSearchParams(location.search).get('page'), 10) || 1);
  const writePage = push => {
    const url = new URL(location.href);
    if (page > 1) url.searchParams.set('page', page); else url.searchParams.delete('page');
    history[push ? 'pushState' : 'replaceState'](null, '', url);
  };

  function render() {
    const shown = posts.filter(post => topic === 'all' || (topic === 'kind:app' ? post.dataset.kind === 'app' : post.dataset.topic === topic));
    if (!perPage || !pager) {
      posts.forEach(post => { post.hidden = !shown.includes(post); });
      return;
    }
    const pages = Math.max(1, Math.ceil(shown.length / perPage));
    page = Math.min(page, pages);
    const start = (page - 1) * perPage;
    const visible = shown.slice(start, start + perPage);
    posts.forEach(post => { post.hidden = !visible.includes(post); });
    pager.hidden = pages < 2;
    if (pages < 2) { pager.textContent = ''; return; }
    const button = (go, html, label, extra = '') =>
      `<button type="button" data-go="${go}"${label ? ` aria-label="${label}"` : ''}${extra}>${html}</button>`;
    let html = button(page - 1, `‹<span class="label"> ${pager.dataset.prev}</span>`, pager.dataset.prev, page === 1 ? ' disabled' : '');
    for (let i = 1; i <= pages; i++) html += button(i, i, '', i === page ? ' aria-current="page"' : '');
    html += button(page + 1, `<span class="label">${pager.dataset.next} </span>›`, pager.dataset.next, page === pages ? ' disabled' : '');
    pager.innerHTML = `<div class="pager-buttons">${html}</div>`;
  }

  buttons.forEach(button => button.addEventListener('click', () => {
    topic = button.dataset.topic;
    buttons.forEach(b => b.setAttribute('aria-pressed', String(b === button)));
    page = 1;
    if (perPage) writePage(false);
    render();
  }));
  if (pager) {
    pager.addEventListener('click', event => {
      const target = event.target.closest('[data-go]');
      if (!target || target.disabled) return;
      page = Number(target.dataset.go);
      writePage(true);
      render();
      box.parentElement.querySelector('h1').scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    window.addEventListener('popstate', () => { page = readPage(); render(); });
  }
  if (perPage) page = readPage();
  render();
});

// Blog home: today's featured post. Same rule as tools/blog.py (home): days since the start date in
// Korean time, taken in turn from the rotation list, so it changes at midnight KST and is the same for everyone.
// The HTML already shows the pick for the build day; this only switches it when the day has changed.
const rotationEl = document.getElementById('featured-rotation');
if (rotationEl) {
  try {
    const data = JSON.parse(rotationEl.textContent);
    const day = ms => Math.floor(ms / 86400000);
    const kstDay = day(Date.now() + 9 * 3600000);
    const startDay = day(Date.parse(data.start + 'T00:00:00Z'));
    const n = data.posts.length;
    const pick = data.posts[(((kstDay - startDay) % n) + n) % n];
    const box = rotationEl.parentElement;
    const link = box.querySelector('h1 a');
    if (pick && link && link.getAttribute('href') !== pick.url) {
      const img = box.querySelector(':scope > img');
      if (img && pick.img) img.src = pick.img;
      box.querySelector('.kicker .dot').className = 'dot c-' + pick.cat;
      box.querySelector('.feature-cat').textContent = pick.catName;
      link.href = pick.url;
      link.textContent = pick.title;
      box.querySelector('p').textContent = pick.summary;
      const time = box.querySelector('time');
      time.dateTime = pick.date;
      time.textContent = pick.nice;
      box.querySelector('.btn').href = pick.url;
    }
    // Latest posts: hide today's featured post if it is in the list, otherwise the extra last row.
    const rows = [...document.querySelectorAll('[data-home-latest] .post')];
    const same = rows.find(row => row.getAttribute('href') === pick.url);
    rows.forEach(row => { row.hidden = row === (same || rows[rows.length - 1]); });
  } catch (e) { /* keep the build-day pick */ }
}

const year = document.querySelector('.year');
if (year) year.textContent = new Date().getFullYear();
