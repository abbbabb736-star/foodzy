import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from '../locales/en.json';
import uz from '../locales/uz.json';
import ru from '../locales/ru.json';

const resources = {
  en: { translation: en },
  uz: { translation: uz },
  ru: { translation: ru },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    supportedLngs: ['en', 'uz', 'ru'],
    interpolation: { escapeValue: false },
    // Birinchi kirishda brauzer tilini (masalan ru) emas, doim EN.
    // Foydalanuvchi EN/UZ/RU tanlasa — localStorage'da saqlanadi.
    detection: {
      order: ['localStorage'],
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng',
    },
  });

export default i18n;
