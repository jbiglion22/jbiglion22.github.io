// Existing app homepages are maintained separately from this directory site.
const apps = [
  {id:'phonebanner', homepage:'https://jbiglion22.github.io/phonebanner_home/', packageId:'com.phonensoft.phonebanner', icon:'icons/favicon.svg'},
  {id:'phonespec', homepage:'https://jbiglion22.github.io/phonespec_home/', packageId:'com.phonensoft.phonespec', icon:'icons/phonespec.svg'},
  {id:'resistorcalculator', homepage:'https://jbiglion22.github.io/resistorcalculator_home/', packageId:'com.phonensoft.resistorcalculator', icon:'icons/resistorcalculator.svg'},
  {id:'arthistorynote', homepage:'https://jbiglion22.github.io/arthistorynote_home/', packageId:'com.phonensoft.arthistorynote', icon:'icons/arthistorynote.svg'}
];
const text = {
 ko:{collection:'앱 컬렉션',discover:'당신의 다음 앱을 만나보세요',nav:'앱 모아보기',tag:'JBIGLION22 · APPS',title:'작은 아이디어,\n손안의 가능성.',intro:'응원부터 기기 비교, 회로 계산과 미술 탐색까지.\n관심 있는 앱을 고르고, 앱 홈페이지에서 더 알아보세요.',browse:'앱 둘러보기',list:'만나볼 수 있는 앱',listNote:'각 앱의 이야기는 앱 홈페이지에서 이어집니다.',visit:'앱 홈페이지',footer:'각자의 쓰임을 가진 앱들, 하나의 공간에서.',top:'맨 위로',names:['폰전광판','폰스펙','저항계산기','미술사노트'],descs:['문구와 색상, 움직임을 꾸며 휴대폰을 응원용 LED 전광판으로 바꿔보세요.','스마트폰을 검색하고 크기와 주요 사양을 나란히 비교해보세요.','색띠와 SMD 코드를 읽고, 회로 계산부터 보유 저항 조합 찾기까지.','서양 미술사의 사조·작가·작품을 탐색하고, 소장 미술관과 관람노트를 살펴보세요.'],categories:['응원 · LED 메시지','스마트폰 · 사양 비교','전자회로 · 계산 도구','미술 · 탐색과 기록']},
 en:{collection:'App collection',discover:'Find your next app',nav:'Our apps',tag:'JBIGLION22 · APPS',title:'Small ideas.\nEveryday possibilities.',intro:'Messages, phone comparisons, circuits and art.\nFind an app and explore its own home.',browse:'Explore apps',list:'Meet the apps',listNote:'Every app has its own story. Continue on its homepage.',visit:'App homepage',footer:'Different apps. A place to find them all.',top:'Back to top',names:['Phone LED Board','Phone Spec','Resistor Calculator','Art History Note'],descs:['Turn your phone into a cheering LED board with custom text, colors and motion.','Search smartphones and compare their sizes and key specifications side by side.','Decode color bands and SMD codes, calculate circuits and find resistor combinations.','Explore Western art movements, artists and works, with museum information and visit notes.'],categories:['Cheers · LED messages','Smartphones · Comparisons','Electronics · Calculations','Art · Explore and collect']},
 vi:{collection:'Bộ sưu tập ứng dụng',discover:'Khám phá ứng dụng tiếp theo',nav:'Ứng dụng',tag:'JBIGLION22 · APPS',title:'Ý tưởng nhỏ.\nKhả năng mới.',intro:'Từ lời cổ vũ đến so sánh điện thoại, mạch điện và mỹ thuật.\nChọn ứng dụng và khám phá trang chủ riêng.',browse:'Khám phá ứng dụng',list:'Gặp gỡ các ứng dụng',listNote:'Mỗi ứng dụng có câu chuyện riêng. Tìm hiểu thêm tại trang chủ.',visit:'Trang chủ ứng dụng',footer:'Nhiều ứng dụng. Một nơi để khám phá.',top:'Lên đầu trang',names:['Bảng LED điện thoại','Phone Spec','Máy tính điện trở','Ghi chú lịch sử mỹ thuật'],descs:['Biến điện thoại thành bảng LED cổ vũ với lời nhắn, màu sắc và chuyển động tùy chỉnh.','Tìm điện thoại và so sánh kích thước cùng thông số kỹ thuật cạnh nhau.','Đọc vòng màu, mã SMD, tính mạch điện và tìm cách kết hợp các điện trở.','Khám phá trào lưu, họa sĩ, tác phẩm phương Tây, bảo tàng và ghi chú tham quan.'],categories:['Cổ vũ · Lời nhắn LED','Điện thoại · So sánh','Điện tử · Tính toán','Mỹ thuật · Khám phá và ghi chép']}
};

Object.assign(text, {
  "hi": {
    "collection": "ऐप संग्रह",
    "discover": "अपना अगला ऐप खोजें",
    "nav": "हमारे ऐप",
    "tag": "JBIGLION22 · APPS",
    "title": "छोटे विचार।\nनई संभावनाएँ।",
    "intro": "संदेश, फ़ोन की तुलना, सर्किट और कला।\nअपनी पसंद का ऐप चुनें और उसकी वेबसाइट पर जानें।",
    "browse": "ऐप देखें",
    "list": "हमारे ऐप से मिलें",
    "listNote": "हर ऐप की अपनी कहानी है। उसकी वेबसाइट पर आगे जानें।",
    "visit": "ऐप की वेबसाइट",
    "footer": "अलग-अलग काम के ऐप, एक ही जगह।",
    "top": "ऊपर जाएँ",
    "names": [
      "फ़ोन LED बोर्ड",
      "फ़ोन स्पेक",
      "रेज़िस्टर कैलकुलेटर",
      "कला इतिहास नोट"
    ],
    "descs": [
      "अपने संदेश, रंग और गति के साथ फ़ोन को LED बोर्ड बनाएँ।",
      "स्मार्टफ़ोन खोजें और उनके आकार व मुख्य विशेषताओं की साथ-साथ तुलना करें।",
      "रंग बैंड और SMD कोड पढ़ें, सर्किट की गणना करें और रेज़िस्टर संयोजन खोजें।",
      "पश्चिमी कला के आंदोलनों, कलाकारों और कृतियों को संग्रहालय की जानकारी और यात्रा नोट के साथ जानें।"
    ],
    "categories": [
      "उत्साह · LED संदेश",
      "स्मार्टफ़ोन · तुलना",
      "इलेक्ट्रॉनिक्स · गणना",
      "कला · खोज और नोट"
    ]
  },
  "id": {
    "collection": "Koleksi aplikasi",
    "discover": "Temukan aplikasi berikutnya",
    "nav": "Aplikasi kami",
    "tag": "JBIGLION22 · APPS",
    "title": "Ide kecil.\nBanyak kemungkinan.",
    "intro": "Pesan, perbandingan ponsel, rangkaian, dan seni.\nPilih aplikasi dan jelajahi situsnya.",
    "browse": "Jelajahi aplikasi",
    "list": "Kenali aplikasinya",
    "listNote": "Setiap aplikasi punya cerita. Lanjutkan di situs masing-masing.",
    "visit": "Situs aplikasi",
    "footer": "Beragam aplikasi, satu tempat untuk menemukannya.",
    "top": "Kembali ke atas",
    "names": [
      "Papan LED Ponsel",
      "Spesifikasi Ponsel",
      "Kalkulator Resistor",
      "Catatan Sejarah Seni"
    ],
    "descs": [
      "Ubah ponsel menjadi papan LED dengan teks, warna, dan gerakan pilihan Anda.",
      "Cari ponsel dan bandingkan ukuran serta spesifikasi utamanya secara berdampingan.",
      "Baca gelang warna dan kode SMD, hitung rangkaian, dan temukan kombinasi resistor.",
      "Jelajahi aliran, seniman, dan karya seni Barat, beserta informasi museum dan catatan kunjungan."
    ],
    "categories": [
      "Dukungan · Pesan LED",
      "Ponsel · Perbandingan",
      "Elektronika · Perhitungan",
      "Seni · Jelajah dan catatan"
    ]
  },
  "es-mx": {
    "collection": "Colección de apps",
    "discover": "Descubre tu próxima app",
    "nav": "Nuestras apps",
    "tag": "JBIGLION22 · APPS",
    "title": "Pequeñas ideas.\nNuevas posibilidades.",
    "intro": "Mensajes, celulares, circuitos y arte.\nElige una app y descubre su sitio web.",
    "browse": "Explorar apps",
    "list": "Conoce las apps",
    "listNote": "Cada app tiene su historia. Continúa en su sitio web.",
    "visit": "Sitio web de la app",
    "footer": "Apps con distintos propósitos, en un solo lugar.",
    "top": "Volver arriba",
    "names": [
      "Letrero LED",
      "Especificaciones del celular",
      "Calculadora de resistencias",
      "Notas de historia del arte"
    ],
    "descs": [
      "Convierte tu celular en un letrero LED con texto, colores y movimiento a tu gusto.",
      "Busca celulares y compara su tamaño y especificaciones principales lado a lado.",
      "Lee bandas de colores y códigos SMD, calcula circuitos y encuentra combinaciones de resistencias.",
      "Explora movimientos, artistas y obras del arte occidental, con museos y notas de visita."
    ],
    "categories": [
      "Apoyo · Mensajes LED",
      "Celulares · Comparación",
      "Electrónica · Cálculos",
      "Arte · Explora y anota"
    ]
  }
});
const siteTitles = {"en": "jbiglion22’s Apps", "ko": "jbiglion22의 앱 소개", "vi": "Ứng dụng của jbiglion22", "hi": "jbiglion22 के ऐप", "id": "Aplikasi jbiglion22", "es-mx": "Apps de jbiglion22"};
const languageNames = {"en": "English", "ko": "한국어", "vi": "Tiếng Việt", "hi": "हिन्दी", "id": "Bahasa Indonesia", "es-mx": "Español (México)"};
const extraText = {"ko": {"languageLabel": "언어 선택", "gallery": "서로 다른 네 가지 가능성", "galleryNote": "작은 도구부터 새로운 발견까지", "noscript": "앱 홈페이지로 이동하려면 아래 링크를 선택하세요."}, "en": {"languageLabel": "Select language", "gallery": "Four ways to explore", "galleryNote": "Little tools. New discoveries.", "noscript": "Choose an app homepage below."}, "vi": {"languageLabel": "Chọn ngôn ngữ", "gallery": "Bốn cách để khám phá", "galleryNote": "Công cụ nhỏ. Khám phá mới.", "noscript": "Chọn trang chủ ứng dụng bên dưới."}, "hi": {"languageLabel": "भाषा चुनें", "gallery": "खोजने के चार रास्ते", "galleryNote": "छोटे उपकरण। नई खोजें।", "noscript": "नीचे ऐप की वेबसाइट चुनें।"}, "id": {"languageLabel": "Pilih bahasa", "gallery": "Empat cara menjelajah", "galleryNote": "Alat kecil. Penemuan baru.", "noscript": "Pilih situs aplikasi di bawah ini."}, "es-mx": {"languageLabel": "Seleccionar idioma", "gallery": "Cuatro formas de explorar", "galleryNote": "Pequeñas herramientas. Nuevos descubrimientos.", "noscript": "Elige el sitio web de una app."}};
const lang = document.documentElement.lang.toLowerCase();
const t = {...(text[lang] || text.en), ...(extraText[lang] || extraText.en)};
const siteTitle = siteTitles[lang] || siteTitles.en;
const route = app => app.homepage;
const header = `<header id="top"><a class="brand" href="index-${lang}.html"><span class="studio-mark" aria-hidden="true">j.</span><span class="site-title">${siteTitle}</span></a><nav aria-label="${t.nav}"><a href="index-${lang}.html#apps">${t.nav}</a></nav><div class="language-control"><span aria-hidden="true">◎</span><select id="language" aria-label="${t.languageLabel}">${Object.entries(languageNames).map(([code,name])=>`<option value="${code}">${name}</option>`).join('')}</select></div></header>`;
const footer = `<footer><div><a class="brand" href="index-${lang}.html">${siteTitle}</a><p>${t.footer}</p></div><a href="#top">${t.top} ↑</a><p class="copyright">© ${new Date().getFullYear()} jbiglion22</p></footer>`;
const artwork = {
  phonebanner: '<div class="mini-board">HELLO<span>••••••••••••</span></div>',
  phonespec: '<div class="spec-device"><span>Phone Spec</span><i></i><i></i><i></i><b>≡</b></div>',
  resistorcalculator: '<div class="resistor-art"><span class="resistor-wire"></span><div class="resistor-body"><i></i><i></i><i></i><i></i></div><span class="resistor-value">4.7 kΩ <small>±5%</small></span></div>',
  arthistorynote: '<div class="art-frame"><div class="abstract-work"><i></i><b></b><span></span></div><span class="frame-caption">ART HISTORY / NOTES</span></div>'
};
const cards = apps.map((app,i)=>`<a class="app-card ${app.id}" href="${route(app)}"><div class="app-art" aria-hidden="true">${artwork[app.id]}<span class="art-number">0${i+1}</span></div><div class="app-card-body"><div class="app-identity"><img src="${app.icon}" width="48" height="48" alt=""><div><p class="app-category">${t.categories[i]}</p><h3>${t.names[i]}</h3></div></div><p>${t.descs[i]}</p><span class="app-card-link">${t.visit}<span class="round-arrow" aria-hidden="true">↗</span></span></div></a>`).join('');
const showcase = `<aside class="collection-showcase" aria-label="${t.gallery}"><div class="showcase-heading"><span>${t.collection}</span><span>01—${String(apps.length).padStart(2,'0')}</span></div><div class="portal-grid">${apps.map((app,i)=>`<a class="app-portal portal-${app.id}" href="${app.homepage}" aria-label="${t.names[i]} · ${t.visit}"><span class="portal-number" aria-hidden="true">0${i+1}</span><span class="portal-art" aria-hidden="true">${artwork[app.id]}</span><span class="portal-name">${t.names[i]}<span aria-hidden="true">↗</span></span></a>`).join('')}</div><p class="showcase-footnote"><span aria-hidden="true">✳</span>${t.galleryNote}</p></aside>`;
const hub = `<main id="main"><section class="directory-hero"><div class="hero-copy"><p class="eyebrow"><span class="live-dot"></span>${t.tag}</p><h1>${t.title.replace('\n','<br>')}</h1><div class="directory-intro"><p>${t.intro.replace('\n','<br>')}</p><a href="#apps" class="primary-link">${t.browse} <span aria-hidden="true">↘</span></a></div><p class="hero-index"><span>01—${String(apps.length).padStart(2,'0')}</span> ${t.collection}</p></div>${showcase}</section><section id="apps" class="app-directory"><div class="directory-heading"><div><p class="eyebrow">${t.discover}</p><h2>${t.list}<span class="collection-count">${String(apps.length).padStart(2,'0')}</span></h2></div><p>${t.listNote}</p></div><div class="app-grid">${cards}</div></section></main>`;

document.getElementById('site').innerHTML = header + hub + footer;
const language = document.getElementById('language');
language.value = lang;
language.addEventListener('change', () => { window.location.href = `index-${language.value}.html` + window.location.hash; });
