# AI 작업 지침

## 기본사항
- 작업을 시작하기 전에 저장소 루트의 `공통지침.md`, `프로젝트.md` 를 먼저 읽고, 그 내용을 이 문서와 함께 따른다.
- README.md은 인공지능이 수정하지 않는다.
- AGENTS.md는 인공지능이 다른 인공지능, 혹인 이후 작업을 위해 이 파일에 작성해둔다.

## 프로젝트 목적
- 이 저장소는 사용자가 개발 중인 앱을 위한 홈페이지입니다.

---

이 아래는 AI가 관리하는 현재 상태 기록이다. 지시가 바뀌거나 더 이상 맞지 않는 내용은 덧붙이지 말고 고치거나 지운다(`공통지침.md`). 마지막 정리: 2026-11-13.

## 사람이 쓰는 문서 (AI가 수정하지 않음)
- `공통지침.md`, `README.md`, `프로젝트.md`.
- 커밋 메시지는 한국어로 쓴다. pull·push는 사용자가 하라고 할 때만 한다. 사용자의 자동 도구가 "COM-PC01" 같은 커밋을 만들거나 푸시하는 일이 있으니 작업 전에 `git status`를 확인한다.

## 사이트 성격
- `https://jbiglion22.github.io/` (GitHub Pages, Jekyll). 앱들이 있다는 것을 알리고 각 앱의 홈페이지로 안내하는 사이트다. 여기서 바로 다운로드시키지 않는다.
- 앱 홈페이지(`https://jbiglion22.github.io/<id>_home/`)는 별도 저장소에서 관리한다. 이 저장소에 앱 홈페이지를 만들지 않는다.
- 사이트 제목: 한국어 `J's 앱 소개`(ASCII 작은따옴표), 영어 `J’s Apps`. 저작권 표기 `© 연도 jbiglion22`.
- 디자인 방향: 차분하고 세련된 앱 디렉터리. 사용자가 "주기율표" 콘셉트를 촌스럽다고 거절했다. 비유나 장치(원소 칸, 뽑기 등)를 넣지 않는다.
- 소개 문구 방향(사용자 요청, 2026-11-13): 한 개발자의 앱 모음이라는 점을 앞세우지 않고, "쓸 만한 작은 앱들을 모아 소개하는 사이트"라는 느낌으로 쓴다. 다른 개발자의 앱이라고 주장하는 등 사실과 다른 내용은 쓰지 않는다. Google Play 개발자 이름(J.Biglion)과 개발자 페이지 링크는 소개 페이지에서 뺐다.
- 앱 설명은 각 앱 홈페이지와 Google Play를 직접 확인해 쓴다. 확인되지 않은 기능·평점·이용자 수는 쓰지 않는다. 투자 앱에 투자 권유·수익 보장 표현을 쓰지 않는다.

## 언어
- 영어(en)·한국어(ko)만 만든다(프로젝트.md). 영어는 미국식 철자, 여러 나라 사람이 이해하기 쉬운 표현.
- 2026-11-13에 지운 10개 언어의 예전 주소(`index-zh-hans/zh-hant/fr/de/id/ja/pt/ru/es/vi.html`)는 `index-en.html`로 보내는 noindex 연결 페이지다(쿼리·해시 유지). 사이트맵에 있던 주소라 검색 결과에서 빠질 때까지 남겨 둔다. Search Console에서 더 이상 보이지 않으면 `redirects`에서 지우고 파일도 삭제해도 된다. 더 오래된 `index-ar/my/hi/th/es-mx/pt-br.html`은 정리 요청(2026-11-13)으로 삭제했다(404). 지운 번역은 Git 기록(커밋 702435a의 `data/site.json`)에 있다.
- 언어를 다시 만들 때: `data/site.json`의 `languages`·`text.<언어>`·(필요하면 `about.<언어>`)와 `js/languages.js`를 함께 고치고 `redirects`에서 그 언어를 뺀 뒤 생성 스크립트를 실행한다.

## 파일 구조와 생성 방법
- 원본 데이터: `data/site.json` — 앱(`apps`: id·group·icon), 그룹(`groups`), 언어별 문구(`text.<언어>`: 사이트 제목·소개·그룹 이름과 설명·앱 이름/분류/설명 등), 소개 페이지(`about`), 연결 페이지 목록(`redirects`).
- 생성: `python tools/build_pages.py` (표준 라이브러리만 사용, Python 3.14 확인). `index-en.html`, `index-ko.html`, `about-en.html`, `about-ko.html`, 연결 페이지 10개, `index.html`, `sitemap.xml`을 만든다. **생성된 HTML을 직접 고치지 말고** 데이터나 스크립트를 고친 뒤 다시 실행한다. `--lastmod YYYY-MM-DD`로 sitemap 날짜를 정한다(기본 오늘). 스크립트가 누락·불일치를 검사한다.
- 본문은 HTML에 직접 들어간다(JavaScript 없이도 읽힘, 애드센스·검색 대응). `js/app.js`는 그룹 필터(`#learn`처럼 주소에 남음, 예전 `#calc`→money), 아이콘 판 클릭 이동, 언어 메뉴(`<details>` 링크), 저작권 연도만 담당한다. `js/languages.js`는 `index.html`의 자동 언어 이동(한국어면 ko, 그 밖에는 en)에 쓴다.
- `css/styles.css`: 색 토큰과 그룹 색 5쌍(라이트·다크), 예비 색 1쌍. 1080px 초과 3열, 720px 초과 2열, 그 이하 1열. 720px 이하에서 헤더 메뉴는 필요하면 다음 줄로 내려간다.
- `_config.yml`의 exclude: 내부 문서(AGENTS.md, README.md, 프로젝트.md, 공통지침.md, 프로젝트지침.md, 이미지요청.md), `data/`, `tools/`, `자료실/` 등은 배포하지 않는다.
- `app-ads.txt`, `ads.txt`, `google686730568d4bc83f.html`(Search Console 확인 파일)은 건드리지 않는다.
- `.idea/`(IDE 설정)는 Git에서 뺐다(`.gitignore`). PC에는 그대로 있다.
- `sitemap.xml`: `/`, 영어·한국어 메인, 소개 페이지 2개, 앱 홈페이지 18개(총 23개). 홈페이지가 바뀔 때마다 생성 스크립트로 갱신한다(프로젝트.md 요구).

## 앱과 그룹 (18개, 5개 그룹)
- learn 언어와 교양: koreanstudy 한국어 학습, englishproverbs 영어 속담 사전, snapstudy_koreanhistory 수능 한국사, arthistorynote 미술사노트, snapstudy_cbible 가톨릭 성경 퀴즈
- science 수학과 과학: mathnote 수학공식노트, mathlab 수학 실험실, physicsnote 수능 물리 공식 노트, chemnote 화학노트, resistorcalculator 저항계산기
- phone 휴대폰: phonecheck 폰체크, phonespec 폰스펙 비교, phonebanner 폰전광판, wifideadzone 와이파이 사각지대 찾기(영어 WiFi DeadZone)
- money 주식과 투자: stockcalculator 주식 매매 계산기, stocksimulation 주식 시뮬레이터
- play 휴식과 놀이: chromaray 크로마 레이, snowglobe 스노우 볼
- 앱 `id`는 홈페이지 폴더 이름(`<id>_home`)과 같아야 한다. 패키지 ID와 다를 수 있다(수능 한국사: `com.phonensoft.snapstudykoreanhistory`, 폴더 `snapstudy_koreanhistory_home`).
- 프로젝트.md의 `Korean Study`는 한국어 학습과 같은 앱이라 따로 넣지 않는다.
- 참고: 폰체크·크로마 레이 홈페이지에는 "Coming soon" 문구가 남아 있으나 Google Play에 등록되어 있다. 수학 실험실·가톨릭 성경 퀴즈는 Play 설명이 더 최신이라 Play를 따랐다. 물리·한국사·수학공식은 한국 수능 대상이라 영어 설명에 CSAT를 밝혔다.
- 앱 추가: `apps`에 `{id, group, icon}`(icon은 24×24 선 아이콘 내부 SVG), `text.en/ko.apps`에 `{name, tag, desc}`, 필요하면 그룹 조정(`groups`, 각 언어 `groups`·`groupDesc`, CSS 색). 앱이 늘면 그룹 수와 구성을 다시 검토한다(주식·놀이는 2개뿐). 앱이 30개를 넘어 찾기 어려워지면 검색을 검토한다.

## 이미지
- 그림은 선택 사항이다. 생성 스크립트는 `images/` 안에 아래 이름의 파일(`.webp`, `.png`, `.jpg` 순서로 찾음)이 있을 때만 넣고, 없으면 그림 없는 디자인 그대로 만든다.
  - `images/hero.webp` 메인 첫 화면(1200×800, 3:2), `images/about.webp` 소개 페이지(1280×720), `images/og-image.jpg` 공유 미리보기(1200×630, og:image), `images/group-<그룹>.webp` 그룹 그림(800×500), `images/apps/<id>.*` 실제 앱 아이콘.
  - 그룹 그림은 5개 그룹 모두 있을 때만 쓰인다(`group_cover`). 하나라도 없으면 모든 그룹이 그림 없이 나온다.
- 요청 절차(`공통지침.md`): `이미지요청.md`에 요청을 쓰면 ChatGPT가 `자료실/제작-이미지/`(아이콘은 `자료실/제작-아이콘/`)에 만든다. 이미지요청.md 맨 위에 "ChatGPT는 이미지요청.md 파일을 수정하면 안 된다"를 둔다. 요청한 AI가 결과를 확인해 쓴 뒤 그 요청을 이미지요청.md에서 지운다.
- 처리 방법: 글자·로고·실제 기기 모양이 없는지 확인 → Pillow(12.2 설치됨)로 가운데를 용도 비율로 잘라 줄이고 WebP(품질 82, og-image는 JPEG)로 `images/`에 저장 → 생성 스크립트 실행 → 이미지요청.md에서 그 요청 삭제. 원본 PNG는 `자료실/제작-이미지/`에 남긴다(배포 제외). 사용자가 원본 PNG를 `images/`에 복사해 두기도 하니, 원본과 같은지 확인하고 지운다.
- 2026-11-13 반영 완료: hero, about, og-image, group-learn·science·phone·money·play 모두 사용 중이며 이미지요청.md에 남은 요청은 없다. 처음 받은 `group-money.png`에 휴식과 놀이 그림이 들어 있어 그것을 `images/group-play.webp`로 썼고, 그 원본 PNG는 다시 받은 주식 그림으로 덮어써져 `자료실`에 남아 있지 않다(사이트용 WebP만 있음). 새 그룹이 생기면 그 그룹 그림을 요청해야 그룹 그림이 계속 표시된다(`group_cover`는 모든 그룹에 그림이 있어야 표시).
- 앱 아이콘은 ChatGPT로 만들지 않는다. 사용자가 실제 앱 아이콘(512×512)을 `images/apps/<id>.png`로 넣으면 선 아이콘 대신 쓰인다. 일부만 넣으면 섞여 보이므로 한꺼번에 넣기를 권했다.
- 확인: 실제 그림으로 메인·소개 페이지를 1280px·390px·320px, 라이트·다크 모드에서 보았다(넘침 없음, 그림 6장씩 모두 로드, 그룹 그림 5장 표시).

## 애드센스·검색 상황
- 2026-11 애드센스 검토에서 "가치가 별로 없는 콘텐츠"로 거절됐다. 사용자와 정한 개선 순서: 본문 HTML 직접 생성(완료), 언어 정리(완료), 기본 페이지(사이트 소개 완료, 연락처·개인정보처리방침은 공개 이메일 등 사용자 결정 대기), 주제 글 작성(미착수), 그림(완료).
- Search Console에 사이트맵을 제출했었고 "읽을 수 없음"이 표시된 적이 있다. 서버 응답과 XML은 정상이었다. 배포 후 다시 제출하도록 안내했다.

## 확인 방법
- 미리보기: 저장소에서 `python -m http.server 8765 --bind 127.0.0.1` 후 `http://127.0.0.1:8765/index-ko.html`. 끝나면 그 서버만 끈다(다른 Python 프로세스를 한꺼번에 끄지 않는다).
- 확인할 것: 한국어·영어, 320px·390px·1280px, 가로 넘침, 그룹 필터와 주소, 언어 메뉴, 예전 언어 주소 연결, JavaScript를 막아도 카드 18개가 보이는지, 콘솔 오류.
- 확인하지 못한 것(2026-11-13): 실제 휴대폰, 배포된 사이트, 원어민 번역 감수(영어).
