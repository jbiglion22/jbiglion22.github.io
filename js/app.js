// To add an app: add one line to `apps`, add its entry to every language in js/translations.js,
// add its link to the <noscript> list of each index-*.html, and add its homepage to sitemap.xml.
// App homepages are maintained separately from this directory site.
const groups = ['learn', 'phone', 'calc'];
const apps = [
  {id: 'koreanstudy', symbol: 'Ko', group: 'learn'},
  {id: 'snapstudy_cbible', symbol: 'Bq', group: 'learn'},
  {id: 'arthistorynote', symbol: 'Ar', group: 'learn'},
  {id: 'phonecheck', symbol: 'Pc', group: 'phone'},
  {id: 'phonespec', symbol: 'Ps', group: 'phone'},
  {id: 'phonebanner', symbol: 'Pb', group: 'phone'},
  {id: 'wifideadzone', symbol: 'Wf', group: 'phone'},
  {id: 'resistorcalculator', symbol: 'Rc', group: 'calc'},
  {id: 'stockcalculator', symbol: 'Sc', group: 'calc'}
];

const lang = document.documentElement.lang.toLowerCase();
const t = translations[lang] || translations.en;
const appText = id => t.apps[id] || translations.en.apps[id];
const pad = n => String(n).padStart(2, '0');
const homepage = id => `https://jbiglion22.github.io/${id}_home/`;
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

// Numbers follow the display order, so they stay continuous as groups change.
const ordered = groups.flatMap(g => apps.filter(a => a.group === g));
const tile = (app, i) => {
  const a = appText(app.id);
  return `<a class="tile g-${app.group}" href="${homepage(app.id)}" target="_blank" rel="noopener noreferrer" data-id="${app.id}">
    <span class="tile-no" aria-hidden="true">${pad(i + 1)}</span>
    <span class="tile-arrow" aria-hidden="true">↗</span>
    <span class="tile-sym" aria-hidden="true">${app.symbol}</span>
    <div class="tile-head">
      <h3>${a.name}</h3>
      <p class="tile-tag">${a.tag}</p>
    </div>
    <p class="tile-desc">${a.desc}</p>
    <span class="sr-only">${t.visit} ${t.newWindow}</span>
  </a>`;
};
const nextSlot = `<div class="tile tile-next"><span class="tile-sym" aria-hidden="true">?</span><div class="tile-head"><strong>${t.next}</strong></div><p class="tile-desc">${t.nextNote}</p></div>`;

const sections = groups.map((g, gi) => {
  const list = ordered.filter(a => a.group === g);
  const isLast = gi === groups.length - 1;
  return `<section class="group" data-group="${g}" aria-labelledby="title-${g}">
    <h2 id="title-${g}" class="group-title"><i class="swatch g-${g}" aria-hidden="true"></i>${t.groups[g]}<small>${pad(list.length)}</small></h2>
    <div class="table">${list.map(a => tile(a, ordered.indexOf(a))).join('')}${isLast ? nextSlot : ''}</div>
  </section>`;
}).join('');

const chip = (id, label, count, swatch) => `<button type="button" class="chip" data-filter="${id}" aria-pressed="false">${swatch ? `<i class="swatch g-${id}" aria-hidden="true"></i>` : ''}${label}<small>${count}</small></button>`;

document.getElementById('site').innerHTML = `
<header class="top" id="top">
  <a class="brand" href="index-${lang}.html"><span class="brand-mark" aria-hidden="true">J</span><bdi>${t.siteTitle}</bdi></a>
  <label class="lang"><span class="sr-only">${t.languageLabel}</span><select id="language">${Object.entries(languageNames).map(([code, name]) => `<option value="${code}" lang="${languageTags[code]}">${name}</option>`).join('')}</select></label>
</header>
<main id="main">
  <section class="hero">
    <div class="hero-copy">
      <h1>${t.title.replace('\n', '<br>')}</h1>
      <p>${t.intro.replace('\n', ' <br>')}</p>
      <div class="hero-actions">
        <button type="button" class="pick" id="pick"><span aria-hidden="true">⚄</span> ${t.pick}</button>
        <span class="pick-result" id="pick-result" role="status"></span>
      </div>
    </div>
    <div class="element" aria-hidden="true">
      <span class="tile-no">${pad(apps.length)}</span>
      <span class="element-sym">J</span>
      <span class="element-name">${t.siteTitle}</span>
      <span class="element-count">${t.count.replace('{n}', apps.length)}</span>
    </div>
  </section>
  <section class="apps" id="apps">
    <div class="chips" role="group" aria-label="${t.filterLabel}">
      ${chip('all', t.all, apps.length)}
      ${groups.map(g => chip(g, t.groups[g], apps.filter(a => a.group === g).length, true)).join('')}
    </div>
    ${sections}
  </section>
</main>
<footer class="foot">
  <p>${t.footer}</p>
  <a href="#top">${t.top} ↑</a>
  <p class="copyright">© <bdi>${new Date().getFullYear()} jbiglion22</bdi></p>
</footer>`;

const language = document.getElementById('language');
language.value = lang;
language.addEventListener('change', () => { window.location.href = `index-${language.value}.html${window.location.hash}`; });

// Group filter: the group is kept in the address (for example index-ko.html#learn) so it can be shared.
const chips = [...document.querySelectorAll('.chip')];
const groupEls = [...document.querySelectorAll('.group')];
const tiles = [...document.querySelectorAll('a.tile')];
const result = document.getElementById('pick-result');
const clearPick = () => {
  tiles.forEach(el => el.classList.remove('picked', 'lit'));
  result.textContent = '';
};
const setFilter = (id, updateAddress) => {
  clearPick();
  chips.forEach(c => c.setAttribute('aria-pressed', String(c.dataset.filter === id)));
  groupEls.forEach(g => { g.hidden = id !== 'all' && g.dataset.group !== id; });
  if (!updateAddress) return;
  try { history.replaceState(null, '', id === 'all' ? window.location.pathname + window.location.search : `#${id}`); } catch (e) { /* Address update is optional. */ }
};
chips.forEach(c => c.addEventListener('click', () => setFilter(c.dataset.filter, true)));
const fromHash = () => { const h = window.location.hash.slice(1); return groups.includes(h) ? h : 'all'; };
setFilter(fromHash(), false);
window.addEventListener('hashchange', () => setFilter(fromHash(), false));

// "Surprise me": a light runs across the visible squares and stops on one app.
const pickButton = document.getElementById('pick');
let lastPick = null;
const land = el => {
  tiles.forEach(x => x.classList.remove('lit'));
  el.classList.add('picked');
  lastPick = el;
  result.textContent = t.picked.replace('{name}', appText(el.dataset.id).name);
  pickButton.disabled = false;
  const box = el.getBoundingClientRect();
  if (box.top < 0 || box.bottom > window.innerHeight) el.scrollIntoView({block: 'center', behavior: reduceMotion.matches ? 'auto' : 'smooth'});
  el.focus({preventScroll: true});
};
pickButton.addEventListener('click', () => {
  clearPick();
  const visible = tiles.filter(el => !el.closest('.group').hidden);
  if (!visible.length) return;
  const options = visible.length > 1 ? visible.filter(el => el !== lastPick) : visible;
  const chosen = options[Math.floor(Math.random() * options.length)];
  if (reduceMotion.matches || visible.length < 2) { land(chosen); return; }
  pickButton.disabled = true;
  let step = 0;
  const steps = 14;
  let previous = null;
  const run = () => {
    if (previous) previous.classList.remove('lit');
    if (step >= steps) { land(chosen); return; }
    const others = visible.filter(el => el !== previous);
    previous = others[Math.floor(Math.random() * others.length)];
    previous.classList.add('lit');
    step += 1;
    setTimeout(run, 50 + step * step * 1.1);
  };
  run();
});
