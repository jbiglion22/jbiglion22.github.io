// To add an app: add one line to `apps`, add its entry to every language in js/translations.js,
// add its link to the <noscript> list of each index-*.html, and add its homepage to sitemap.xml.
// `icon` is the inside of a 24x24 line icon. To use a real app icon instead, set `image: 'images/name.png'`.
// App homepages are maintained separately from this directory site.
const groups = ['learn', 'phone', 'calc'];
const apps = [
  {id: 'koreanstudy', group: 'learn', icon: '<path d="M4 5h16v11H9l-5 4z"/><path d="M8 9h8M8 12.5h5"/>'},
  {id: 'snapstudy_cbible', group: 'learn', icon: '<path d="M6 3h12v18H6z"/><path d="M12 7v9M9 10h6"/>'},
  {id: 'arthistorynote', group: 'learn', icon: '<path d="M4 5h16v14H4z"/><path d="M4 16l5-5 4 4 3-3 4 4"/><circle cx="15" cy="9" r="1.4"/>'},
  {id: 'phonecheck', group: 'phone', icon: '<rect x="7" y="2.5" width="10" height="19" rx="2"/><path d="M9.5 12l2 2 3.5-4"/>'},
  {id: 'phonespec', group: 'phone', icon: '<rect x="3.5" y="4" width="7.5" height="16" rx="1.5"/><rect x="13" y="7" width="7.5" height="13" rx="1.5"/>'},
  {id: 'phonebanner', group: 'phone', icon: '<rect x="2.5" y="7" width="19" height="10" rx="2"/><path d="M6.5 12h.01M9.25 12h.01M12 12h.01M14.75 12h.01M17.5 12h.01"/>'},
  {id: 'wifideadzone', group: 'phone', icon: '<path d="M2.5 9.5a14 14 0 0 1 19 0M6 13.2a9 9 0 0 1 12 0M9.4 16.8a4 4 0 0 1 5.2 0M12 20h.01"/>'},
  {id: 'resistorcalculator', group: 'calc', icon: '<path d="M2 12h4l1.5-3.5 3 7 3-7 3 7 1.5-3.5h4"/>'},
  {id: 'stockcalculator', group: 'calc', icon: '<path d="M4 4v16h16"/><path d="M8 15l3-4 3 2 5-6"/>'}
];

const lang = document.documentElement.lang.toLowerCase();
const t = translations[lang] || translations.en;
const appText = id => t.apps[id] || translations.en.apps[id];
const homepage = id => `https://jbiglion22.github.io/${id}_home/`;
const iconMarkup = app => app.image
  ? `<img src="${app.image}" width="52" height="52" alt="">`
  : `<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${app.icon}</svg>`;

const appLink = app => {
  const a = appText(app.id);
  return `<a class="app" href="${homepage(app.id)}" target="_blank" rel="noopener noreferrer">
    <span class="app-icon g-${app.group}">${iconMarkup(app)}</span>
    <div class="app-text">
      <h3>${a.name}</h3>
      <p class="app-tag">${a.tag}</p>
      <p class="app-desc">${a.desc}</p>
    </div>
    <span class="app-arrow" aria-hidden="true">↗</span>
    <span class="sr-only">${t.visit} ${t.newWindow}</span>
  </a>`;
};

const sections = groups.map(g => {
  const list = apps.filter(a => a.group === g);
  return `<section class="group" data-group="${g}" aria-labelledby="title-${g}">
    <h2 id="title-${g}" class="group-title">${t.groups[g]}<small>${list.length}</small></h2>
    <div class="app-list">${list.map(appLink).join('')}</div>
  </section>`;
}).join('');

const tab = (id, label) => `<button type="button" class="tab" data-filter="${id}" aria-pressed="false">${label}</button>`;

document.getElementById('site').innerHTML = `
<header class="top" id="top">
  <a class="brand" href="index-${lang}.html"><bdi>${t.siteTitle}</bdi></a>
  <label class="lang"><span class="sr-only">${t.languageLabel}</span><select id="language">${Object.entries(languageNames).map(([code, name]) => `<option value="${code}" lang="${languageTags[code]}">${name}</option>`).join('')}</select></label>
</header>
<main id="main">
  <section class="hero">
    <h1>${t.title.replace('\n', ' <br>')}</h1>
    <p>${t.intro}</p>
  </section>
  <section class="apps" id="apps">
    <div class="tabs" role="group" aria-label="${t.filterLabel}">
      ${tab('all', t.all)}
      ${groups.map(g => tab(g, t.groups[g])).join('')}
    </div>
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
  if (!updateAddress) return;
  try { history.replaceState(null, '', id === 'all' ? window.location.pathname + window.location.search : `#${id}`); } catch (e) { /* Address update is optional. */ }
};
tabs.forEach(b => b.addEventListener('click', () => setFilter(b.dataset.filter, true)));
const fromHash = () => { const h = window.location.hash.slice(1); return groups.includes(h) ? h : 'all'; };
setFilter(fromHash(), false);
window.addEventListener('hashchange', () => setFilter(fromHash(), false));
