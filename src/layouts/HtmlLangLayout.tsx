'use client';

import {useLocale} from '@/hooks/useLocale';
import {PropsWithChildren} from 'react';

export default function HtmlLangLayout({children}: PropsWithChildren) {
  const lang = useLocale();
  return <html lang={lang}>{children}</html>;
}
