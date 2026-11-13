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
document.querySelectorAll('.subtopics').forEach(box => {
  const list = box.parentElement.querySelector('[data-filterable]');
  if (!list) return;
  box.hidden = false;
  const buttons = [...box.querySelectorAll('.topic')];
  buttons.forEach(button => button.addEventListener('click', () => {
    const value = button.dataset.topic;
    buttons.forEach(b => b.setAttribute('aria-pressed', String(b === button)));
    list.querySelectorAll('.post').forEach(post => {
      const match = value === 'all' || (value === 'kind:app' ? post.dataset.kind === 'app' : post.dataset.topic === value);
      post.hidden = !match;
    });
  }));
});

const year = document.querySelector('.year');
if (year) year.textContent = new Date().getFullYear();
