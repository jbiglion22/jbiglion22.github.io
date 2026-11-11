// To add an app: add one line to `apps` (with its group), add its entry to every language in js/translations.js,
// add its link to the <noscript> list of each index-*.html, and add its homepage to sitemap.xml.
// The homepage address is https://jbiglion22.github.io/<id>_home/, so `id` must match that folder name.
// `icon` is the inside of a 24x24 line icon drawn for this site (not the official app icon).
// To use a real app icon instead, set `image: 'images/name.png'`.
// To add a group: add it to `groups`, to `groups` in every language, and add its colors in css/styles.css.
const groups = ['learn', 'science', 'phone', 'money', 'play'];
const apps = [
  {id: 'koreanstudy', group: 'learn', icon: '<path d="M4 5h16v11H9l-5 4z"/><path d="M8 9h8M8 12.5h5"/>'},
  {id: 'englishproverbs', group: 'learn', icon: '<path d="M3 5.5c2.2-1 5.2-1 9 .7 3.8-1.7 6.8-1.7 9-.7V19c-2.2-1-5.2-1-9 .7-3.8-1.7-6.8-1.7-9-.7z"/><path d="M12 6.2v13.5"/>'},
  {id: 'snapstudy_koreanhistory', group: 'learn', icon: '<path d="M7 4h11a2 2 0 0 1 0 4H7"/><path d="M7 4a2 2 0 0 0 0 4v10a2 2 0 0 0 2 2h9V8"/><path d="M11 12h4M11 15.5h4"/>'},
  {id: 'arthistorynote', group: 'learn', icon: '<path d="M4 5h16v14H4z"/><path d="M4 16l5-5 4 4 3-3 4 4"/><circle cx="15" cy="9" r="1.4"/>'},
  {id: 'snapstudy_cbible', group: 'learn', icon: '<path d="M6 3h12v18H6z"/><path d="M12 7v9M9 10h6"/>'},
  {id: 'mathnote', group: 'science', icon: '<path d="M5 3h14v18H5z"/><path d="M15 7.5H9l3 4.5-3 4.5h6"/>'},
  {id: 'mathlab', group: 'science', icon: '<path d="M3 15h18M12 3v18"/><path d="M5 5c2 13 12 13 14 0"/>'},
  {id: 'physicsnote', group: 'science', icon: '<circle cx="12" cy="12" r="1.5"/><ellipse cx="12" cy="12" rx="9.5" ry="3.8"/><ellipse cx="12" cy="12" rx="9.5" ry="3.8" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="9.5" ry="3.8" transform="rotate(120 12 12)"/>'},
  {id: 'chemnote', group: 'science', icon: '<path d="M9 3h6M10 3v6l-5.2 9a2 2 0 0 0 1.7 3h11a2 2 0 0 0 1.7-3L14 9V3"/><path d="M7.4 15h9.2"/>'},
  {id: 'resistorcalculator', group: 'science', icon: '<path d="M2 12h4l1.5-3.5 3 7 3-7 3 7 1.5-3.5h4"/>'},
  {id: 'phonecheck', group: 'phone', icon: '<rect x="7" y="2.5" width="10" height="19" rx="2"/><path d="M9.5 12l2 2 3.5-4"/>'},
  {id: 'phonespec', group: 'phone', icon: '<rect x="3.5" y="4" width="7.5" height="16" rx="1.5"/><rect x="13" y="7" width="7.5" height="13" rx="1.5"/>'},
  {id: 'phonebanner', group: 'phone', icon: '<rect x="2.5" y="7" width="19" height="10" rx="2"/><path d="M6.5 12h.01M9.25 12h.01M12 12h.01M14.75 12h.01M17.5 12h.01"/>'},
  {id: 'wifideadzone', group: 'phone', icon: '<path d="M2.5 9.5a14 14 0 0 1 19 0M6 13.2a9 9 0 0 1 12 0M9.4 16.8a4 4 0 0 1 5.2 0M12 20h.01"/>'},
  {id: 'stockcalculator', group: 'money', icon: '<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M8 7h8M8.5 11h.01M12 11h.01M15.5 11h.01M8.5 14.5h.01M12 14.5h.01M15.5 14.5h.01M8.5 18h.01M12 18h.01M15.5 18h.01"/>'},
  {id: 'stocksimulation', group: 'money', icon: '<path d="M4 4v16h16"/><path d="M8 15l3-4 3 2 5-6"/>'},
  {id: 'chromaray', group: 'play', icon: '<path d="M12 5l7 12.5H5z"/><path d="M1.5 13.5l7-2M15.5 10l7-3M16.5 12h6M17 14l5.5 3"/>'},
  {id: 'snowglobe', group: 'play', icon: '<circle cx="12" cy="10" r="7.5"/><path d="M7 21h10l-1.4-3.6H8.4z"/><path d="M12 7v6M9.4 8.5l5.2 3M14.6 8.5l-5.2 3"/>'}
];
// Old addresses used #calc for the calculator group.
const hashAliases = {calc: 'money'};

const lang = document.documentElement.lang.toLowerCase();
const t = translations[lang] || translations.en;
const appText = id => t.apps[id] || translations.en.apps[id];
const homepage = id => `https://jbiglion22.github.io/${id}_home/`;
const iconMarkup = (app, size) => app.image
  ? `<img src="${app.image}" width="${size * 2}" height="${size * 2}" alt="">`
  : `<svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${app.icon}</svg>`;
const groupApps = g => apps.filter(a => a.group === g);

const appCard = app => {
  const a = appText(app.id);
  return `<a class="app" id="app-${app.id}" href="${homepage(app.id)}" target="_blank" rel="noopener noreferrer">
    <span class="app-icon g-${app.group}">${iconMarkup(app, 24)}</span>
    <span class="app-body">
      <span class="app-name">${a.name}</span>
      <span class="app-tag">${a.tag}</span>
      <span class="app-desc">${a.desc}</span>
    </span>
    <span class="app-arrow" aria-hidden="true">↗</span>
    <span class="sr-only">${t.visit} ${t.newWindow}</span>
  </a>`;
};

const sections = groups.map(g => {
  const list = groupApps(g);
  return `<section class="group" data-group="${g}" aria-labelledby="title-${g}">
    <h2 id="title-${g}" class="group-title"><span class="group-dot g-${g}" aria-hidden="true"></span>${t.groups[g]}<span class="group-count">${list.length}</span></h2>
    <ul class="app-list" role="list">${list.map(a => `<li>${appCard(a)}</li>`).join('')}</ul>
  </section>`;
}).join('');

// The icon board in the intro: every app as a small tile, in group order. It is a shortcut to the app in the list.
const board = groups.flatMap(groupApps).map(app =>
  `<a class="tile g-${app.group}" href="#app-${app.id}" data-app="${app.id}" tabindex="-1" title="${appText(app.id).name}">${iconMarkup(app, 22)}</a>`
).join('');

const tab = (id, label, n) => `<button type="button" class="tab" data-filter="${id}" aria-pressed="false">${label}<span class="tab-count">${n}</span></button>`;

document.getElementById('site').innerHTML = `
<header class="top" id="top">
  <a class="brand" href="index-${lang}.html"><span class="brand-mark" aria-hidden="true">J</span><bdi>${t.siteTitle}</bdi></a>
  <label class="lang"><span class="sr-only">${t.languageLabel}</span><select id="language">${Object.entries(languageNames).map(([code, name]) => `<option value="${code}" lang="${languageTags[code]}">${name}</option>`).join('')}</select></label>
</header>
<main id="main">
  <section class="hero">
    <div class="hero-text">
      <h1>${t.title.replace('\n', ' <br>')}</h1>
      <p>${t.intro}</p>
    </div>
    <div class="board" aria-hidden="true">${board}</div>
  </section>
  <section class="apps" id="apps">
    <div class="tabs-wrap"><div class="tabs" role="group" aria-label="${t.filterLabel}">
      ${tab('all', t.all, apps.length)}
      ${groups.map(g => tab(g, t.groups[g], groupApps(g).length)).join('')}
    </div></div>
    ${sections}
  </section>
</main>
<footer class="foot">
  <p>${t.footer}</p>
  <p class="copyright">© <bdi>${new Date().getFullYear()} jbiglion22</bdi></p>
</footer>`;

const language = document.getElementById('language');
language.value = lang;
language.addEventListener('change', () => { window.location.href = `index-${language.value}.html${window.location.hash}`; });

// Group filter: the group is kept in the address (for example index-ko.html#learn) so it can be shared.
const tabs = [...document.querySelectorAll('.tab')];
const groupEls = [...document.querySelectorAll('.group')];
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
tabs.forEach(b => b.addEventListener('click', () => setFilter(b.dataset.filter, true)));
const fromHash = () => {
  const h = window.location.hash.slice(1);
  const g = hashAliases[h] || h;
  return groups.includes(g) ? g : 'all';
};
setFilter(fromHash(), false);
window.addEventListener('hashchange', () => setFilter(fromHash(), false));

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
