// src/i18n.js

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from '../locales/en.json';
import de from '../locales/de.json';
import es from '../locales/es.json';
import fr from '../locales/fr.json';
import sv from '../locales/sv.json';
import no from '../locales/no.json';
import fi from '../locales/fi.json';

i18n
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    resources: {
      en: { translation: en },
      de: { translation: de },
      es: { translation: es },
      fr: { translation: fr },
      sv: { translation: sv },
      no: { translation: no },
      fi: { translation: fi },
    },
    lng: 'en', // Default language
    fallbackLng: 'en', // Fallback language in case a translation is missing
    interpolation: {
      escapeValue: false,
    },
  });


export default i18n;
