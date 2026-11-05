// Existing app homepages are maintained separately from this directory site.
const apps = [
  {id:'phonebanner', homepage:'https://jbiglion22.github.io/phonebanner_home/', packageId:'com.phonensoft.phonebanner', icon:'icons/favicon.svg'},
  {id:'phonespec', homepage:'https://jbiglion22.github.io/phonespec_home/', packageId:'com.phonensoft.phonespec', icon:'icons/phonespec.svg'},
  {id:'resistorcalculator', homepage:'https://jbiglion22.github.io/resistorcalculator_home/', packageId:'com.phonensoft.resistorcalculator', icon:'icons/resistorcalculator.svg'},
  {id:'arthistorynote', homepage:'https://jbiglion22.github.io/arthistorynote_home/', packageId:'com.phonensoft.arthistorynote', icon:'icons/arthistorynote.svg'},
  {id:'koreanstudy', homepage:'https://jbiglion22.github.io/koreanstudy_home/', packageId:'com.phonensoft.koreanstudy', icon:'icons/koreanstudy.svg'},
  {id:'snapstudy_cbible', homepage:'https://jbiglion22.github.io/snapstudy_cbible_home/', packageId:'com.phonensoft.snapstudy_cbible', icon:'icons/snapstudy_cbible.svg'},
  {id:'phonecheck', homepage:'https://jbiglion22.github.io/phonecheck_home/', packageId:'com.phonensoft.phonecheck', icon:'icons/phonecheck.svg'}
];
const lang = document.documentElement.lang.toLowerCase();
const t = {...(text[lang] || text.en), ...(extraText[lang] || extraText.en)};
const siteTitle = siteTitles[lang] || siteTitles.en;
const route = app => app.homepage;
const header = `<header id="top"><a class="brand" href="index-${lang}.html"><span class="studio-mark" aria-hidden="true">j.</span><span class="site-title"><bdi>${siteTitle}</bdi></span></a><nav aria-label="${t.nav}"><a href="index-${lang}.html#apps">${t.nav}</a></nav><div class="language-control"><span aria-hidden="true">◎</span><select id="language" aria-label="${t.languageLabel}">${Object.entries(languageNames).map(([code,name])=>`<option value="${code}" lang="${languageTags[code]}" dir="${code === 'ar' ? 'rtl' : 'ltr'}">${name}</option>`).join('')}</select></div></header>`;
const footer = `<footer><div><a class="brand" href="index-${lang}.html"><bdi>${siteTitle}</bdi></a><p>${t.footer}</p></div><a href="#top">${t.top} ↑</a><p class="copyright">© <bdi>${new Date().getFullYear()} jbiglion22</bdi></p></footer>`;
const artwork = {
  phonebanner: '<div class="mini-board">HELLO<span>••••••••••••</span></div>',
  phonespec: '<div class="spec-device"><span>Phone Spec</span><i></i><i></i><i></i><b>≡</b></div>',
  resistorcalculator: '<div class="resistor-art"><span class="resistor-wire"></span><div class="resistor-body"><i></i><i></i><i></i><i></i></div><span class="resistor-value">4.7 kΩ <small>±5%</small></span></div>',
  arthistorynote: '<div class="art-frame"><div class="abstract-work"><i></i><b></b><span></span></div><span class="frame-caption">ART HISTORY / NOTES</span></div>',
  koreanstudy: '<div class="korean-art"><b>한</b><span>ㄱ ㄴ ㄷ ㄹ</span><i></i></div>',
  snapstudy_cbible: '<div class="bible-art"><div class="bible-book"><span class="bible-cross"></span><em>Q&amp;A</em></div></div>',
  phonecheck: '<div class="check-art"><span>PhoneCheck</span><p><i></i><u>✓</u></p><p><i></i><u>✓</u></p><p><i></i><u>✓</u></p></div>'
};
const cards = apps.map((app,i)=>`<a class="app-card ${app.id}" href="${route(app)}"><div class="app-art" aria-hidden="true">${artwork[app.id]}<span class="art-number">0${i+1}</span></div><div class="app-card-body"><div class="app-identity"><img src="${app.icon}" width="48" height="48" alt=""><div><p class="app-category">${t.categories[i]}</p><h3>${t.names[i]}</h3></div></div><p>${t.descs[i]}</p><span class="app-card-link">${t.visit}<span class="round-arrow" aria-hidden="true">↗</span></span></div></a>`).join('');
const showcase = `<aside class="collection-showcase" aria-label="${t.gallery}"><div class="showcase-heading"><span>${t.collection}</span><span>01—${String(apps.length).padStart(2,'0')}</span></div><div class="portal-grid">${apps.map((app,i)=>`<a class="app-portal portal-${app.id}" href="${app.homepage}" aria-label="${t.names[i]} · ${t.visit}"><span class="portal-number" aria-hidden="true">0${i+1}</span><span class="portal-art" aria-hidden="true">${artwork[app.id]}</span><span class="portal-name">${t.names[i]}<span aria-hidden="true">↗</span></span></a>`).join('')}</div><p class="showcase-footnote"><span aria-hidden="true">✳</span>${t.galleryNote}</p></aside>`;
const hub = `<main id="main"><section class="directory-hero"><div class="hero-copy"><p class="eyebrow"><span class="live-dot"></span>${t.tag}</p><h1>${t.title.replace('\n','<br>')}</h1><div class="directory-intro"><p>${t.intro.replace('\n','<br>')}</p><a href="#apps" class="primary-link">${t.browse} <span aria-hidden="true">↘</span></a></div><p class="hero-index"><span>01—${String(apps.length).padStart(2,'0')}</span> ${t.collection}</p></div>${showcase}</section><section id="apps" class="app-directory"><div class="directory-heading"><div><p class="eyebrow">${t.discover}</p><h2>${t.list}<span class="collection-count">${String(apps.length).padStart(2,'0')}</span></h2></div><p>${t.listNote}</p></div><div class="app-grid">${cards}</div></section></main>`;

document.getElementById('site').innerHTML = header + hub + footer;
const language = document.getElementById('language');
language.value = lang;
language.addEventListener('change', () => { window.location.href = `index-${language.value}.html` + window.location.hash; });
