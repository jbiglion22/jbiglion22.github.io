// Languages the site is published in (English first). index.html uses this to pick a page.
// Keep it in step with "languages" in data/site.json; tools/build_pages.py checks this.
const languageNames = {
  "en": "English",
  "ko": "한국어"
};
const languageTags = {"en": "en", "ko": "ko"};

function resolveSiteLanguage(preferences) {
  for (const preference of preferences) {
    const base = preference.toLowerCase().split('-')[0];
    if (Object.hasOwn(languageNames, base)) return base;
  }
  return 'en';
}
