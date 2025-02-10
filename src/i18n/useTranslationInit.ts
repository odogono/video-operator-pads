import { useEffect } from 'react';

import { usePathname } from 'next/navigation';

import { Messages, i18n } from '@lingui/core';

export const useTranslationInit = (messages: Messages) => {
  const isClient = typeof window !== 'undefined';
  const pathname = usePathname();
  const locale = pathname?.split('/')[1] ?? 'en';

  if (!isClient && locale !== i18n.locale) {
    // there is single instance of i18n on the server
    // note: on the server, we could have an instance of i18n per supported locale
    // to avoid calling loadAndActivate for (worst case) each request, but right now that's what we do
    i18n.loadAndActivate({ locale, messages });
  }
  if (isClient && !i18n.locale) {
    // first client render
    i18n.loadAndActivate({ locale, messages });
  }

  useEffect(() => {
    const localeDidChange = locale !== i18n.locale;
    if (localeDidChange) {
      i18n.loadAndActivate({ locale, messages });
    }
  }, [locale, messages]);

  return i18n;
};
