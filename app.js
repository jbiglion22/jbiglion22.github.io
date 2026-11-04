// Existing app homepages are maintained separately from this directory site.
const apps = [
  {id:'phonebanner', homepage:'https://jbiglion22.github.io/phonebanner_home/', packageId:'com.phonensoft.phonebanner', icon:'icons/favicon.svg'},
  {id:'phonespec', homepage:'https://jbiglion22.github.io/phonespec_home/', packageId:'com.phonensoft.phonespec', icon:'icons/phonespec.svg'}
];
const text = {
 ko:{nav:'앱 모아보기',tag:'PHONENSOFT · APPS',title:'우리의 앱을\n한곳에서 만나보세요.',intro:'폰전광판부터 폰스펙까지.\n관심 있는 앱을 고르고, 앱 홈페이지에서 더 알아보세요.',browse:'앱 둘러보기',list:'만나볼 수 있는 앱',listNote:'각 앱의 이야기는 앱 홈페이지에서 이어집니다.',visit:'앱 홈페이지',footer:'각자의 쓰임을 가진 앱들, 하나의 공간에서.',top:'맨 위로',names:['폰전광판','폰스펙'],descs:['전하고 싶은 한마디를 위한 앱.','폰스펙 앱을 만나보세요.'],categories:['메시지를 전하는 순간','새롭게 만나볼 앱']},
 en:{nav:'Our apps',tag:'PHONENSOFT · APPS',title:'A home for\nour apps.',intro:'From Phone LED Board to Phone Spec.\nFind an app and explore its own home.',browse:'Explore apps',list:'Meet the apps',listNote:'Every app has its own story. Continue on its homepage.',visit:'App homepage',footer:'Different apps. A place to find them all.',top:'Back to top',names:['Phone LED Board','Phone Spec'],descs:['An app for the words you want to share.','Meet the Phone Spec app.'],categories:['A moment to say it','An app to discover']},
 vi:{nav:'Ứng dụng',tag:'PHONENSOFT · APPS',title:'Các ứng dụng,\nchung một nơi.',intro:'Từ Bảng LED điện thoại đến Phone Spec.\nChọn ứng dụng và khám phá trang chủ riêng.',browse:'Khám phá ứng dụng',list:'Gặp gỡ các ứng dụng',listNote:'Mỗi ứng dụng có câu chuyện riêng. Tìm hiểu thêm tại trang chủ.',visit:'Trang chủ ứng dụng',footer:'Nhiều ứng dụng. Một nơi để khám phá.',top:'Lên đầu trang',names:['Bảng LED điện thoại','Phone Spec'],descs:['Ứng dụng dành cho những lời bạn muốn chia sẻ.','Khám phá ứng dụng Phone Spec.'],categories:['Khoảnh khắc gửi lời','Ứng dụng để khám phá']}
};
const lang = document.documentElement.lang;
const t = text[lang] || text.en;
const route = app => app.homepage;
const header = `<header id="top"><a class="brand" href="index-${lang}.html"><span class="studio-mark" aria-hidden="true">p.</span>phonensoft</a><nav aria-label="${t.nav}"><a href="index-${lang}.html#apps">${t.nav}</a></nav><select id="language" aria-label="Language / 언어 / Ngôn ngữ"><option value="en">English</option><option value="ko">한국어</option><option value="vi">Tiếng Việt</option></select></header>`;
const footer = `<footer><div><a class="brand" href="index-${lang}.html">phonensoft</a><p>${t.footer}</p></div><a href="#top">${t.top} ↑</a><p class="copyright">© ${new Date().getFullYear()} Phonensoft</p></footer>`;
const cards = apps.map((app,i)=>`<a class="app-card ${app.id}" href="${route(app)}"><div class="app-art" aria-hidden="true">${i===0?'<div class="mini-board">HELLO<span>••••••••••••</span></div>':'<div class="spec-device"><span>Phone Spec</span><i></i><i></i><i></i><b>≡</b></div>'}<span class="art-number">0${i+1}</span></div><div class="app-card-body"><div class="app-identity"><img src="${app.icon}" width="48" height="48" alt=""><div><p class="app-category">${t.categories[i]}</p><h3>${t.names[i]}</h3></div></div><p>${t.descs[i]}</p><span class="app-card-link">${t.visit}<span aria-hidden="true">↗</span></span></div></a>`).join('');
const hub = `<main id="main"><section class="directory-hero"><p class="eyebrow"><span class="live-dot"></span>${t.tag}</p><h1>${t.title.replace('\n','<br>')}</h1><div class="directory-intro"><p>${t.intro.replace('\n','<br>')}</p><a href="#apps" class="text-link">${t.browse} <span aria-hidden="true">↓</span></a></div><span class="directory-star" aria-hidden="true">✳</span></section><section id="apps" class="app-directory"><div class="directory-heading"><div><p class="eyebrow">THE COLLECTION</p><h2>${t.list}</h2></div><p>${t.listNote}</p></div><div class="app-grid">${cards}</div></section></main>`;
document.getElementById('site').innerHTML = header + hub + footer;
const language = document.getElementById('language');
language.value = lang;
language.addEventListener('change', () => { window.location.href = `index-${language.value}.html` + window.location.hash; });
