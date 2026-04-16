import { useEffect } from 'react';
import { useSettingsStore } from '../store/useSettingsStore';
import i18n from '../i18n/config';

function setHtmlLang(lng) {
  const map = { en: 'en', uz: 'uz', ru: 'ru' };
  document.documentElement.lang = map[lng] || 'en';
}

export function DocumentEffects() {
  const theme = useSettingsStore((s) => s.theme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    setHtmlLang(i18n.language);
    const onLang = (lng) => setHtmlLang(lng);
    i18n.on('languageChanged', onLang);
    return () => i18n.off('languageChanged', onLang);
  }, []);

  return null;
}
