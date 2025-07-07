import type { LocalizationResource } from '@clerk/types';
import type { LocalePrefixMode } from 'next-intl/routing';
import { enUS, frFR, zhCN } from '@clerk/localizations';

const localePrefix: LocalePrefixMode = 'as-needed';

// FIXME: Update this configuration file based on your project information
export const AppConfig = {
  name: 'X-POCKET',
  locales: ['zh', 'en', 'fr'],
  defaultLocale: 'zh',
  localePrefix,
};

const supportedLocales: Record<string, LocalizationResource> = {
  zh: zhCN,
  en: enUS,
  fr: frFR,
};

export const ClerkLocalizations = {
  defaultLocale: zhCN,
  supportedLocales,
};
