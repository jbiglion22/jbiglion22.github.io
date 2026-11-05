// English and Korean first, then English language names in alphabetical order.
const languageNames = {
  "en": "English",
  "ko": "한국어",
  "zh-hans": "简体中文",
  "zh-hant": "繁體中文",
  "fr": "Français",
  "de": "Deutsch",
  "id": "Bahasa Indonesia",
  "ja": "日本語",
  "pt": "Português",
  "ru": "Русский",
  "es": "Español",
  "vi": "Tiếng Việt"
};
const languageTags = {"en": "en", "ko": "ko", "zh-hans": "zh-Hans", "zh-hant": "zh-Hant", "fr": "fr", "de": "de", "id": "id", "ja": "ja", "pt": "pt", "ru": "ru", "es": "es", "vi": "vi"};

function resolveSiteLanguage(preferences) {
  for (const preference of preferences) {
    const locale = preference.toLowerCase();
    if (Object.hasOwn(languageNames, locale)) return locale;
    const base = locale.split('-')[0];
    if (base === 'zh') {
      const parts = locale.split('-');
      if (parts.includes('hant')) return 'zh-hant';
      if (parts.includes('hans')) return 'zh-hans';
      return parts.some(part => ['tw', 'hk', 'mo'].includes(part)) ? 'zh-hant' : 'zh-hans';
    }
    if (base === 'es') return 'es';
    if (base === 'pt') return 'pt';
    if (base === 'in') return 'id';
    if (Object.hasOwn(languageNames, base)) return base;
  }
  return 'en';
}
