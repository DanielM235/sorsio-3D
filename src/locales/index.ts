import { createI18n } from 'vue-i18n';
import en from './en.json';
import ptBR from './pt-BR.json';
import fr from './fr.json';

export type MessageSchema = typeof en;

export const SUPPORTED_LOCALES = ['en', 'pt-BR', 'fr'] as const;
export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

/**
 * Detects the user's preferred locale from browser settings
 */
function detectUserLocale(): SupportedLocale {
  const browserLocale = navigator.language;

  // Check for exact match
  if (SUPPORTED_LOCALES.includes(browserLocale as SupportedLocale)) {
    return browserLocale as SupportedLocale;
  }

  // Check for language-only match (e.g., "pt" matches "pt-BR")
  const languageOnly = browserLocale.split('-')[0];
  if (languageOnly === 'pt') return 'pt-BR';
  if (languageOnly === 'fr') return 'fr';

  // Default to English
  return 'en';
}

const i18n = createI18n<[MessageSchema], SupportedLocale>({
  legacy: false,
  locale: detectUserLocale(),
  fallbackLocale: 'en',
  messages: {
    en,
    'pt-BR': ptBR,
    fr,
  },
});

export default i18n;
