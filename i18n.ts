import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Using require keeps this simple for Metro/Expo.
// eslint-disable-next-line @typescript-eslint/no-var-requires
const en = require('./locales/en.json');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const es = require('./locales/es.json');

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    compatibilityJSON: 'v4',
    resources: {
      en: { translation: en },
      es: { translation: es },
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
  });
} else {
  // Fast Refresh preserves the i18n singleton; merge latest JSON so new keys appear immediately.
  i18n.addResourceBundle('en', 'translation', en, true, true);
  i18n.addResourceBundle('es', 'translation', es, true, true);
}

export default i18n;

