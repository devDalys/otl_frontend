import './globals.scss';
import HtmlLangLayout from '@/layouts/HtmlLangLayout';
import {GlobalProvider} from '@/providers/GlobalProvider';
import {YaMetric} from '@/scripts/YaMetric';
import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import localFont from 'next/font/local';

const Gilroy = localFont({
  src: [
    {
      weight: '400',
      path: '../../public/fonts/Gilroy-Regular.woff',
    },
    {
      weight: '500',
      path: '../../public/fonts/Gilroy-Medium.woff',
    },
    {
      weight: '600',
      path: '../../public/fonts/Gilroy-Bold.woff',
    },
  ],
  display: 'swap',
  variable: '--gilroy-font',
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const messages = await getMessages({locale: 'ru'});

  return (
    <HtmlLangLayout>
      <NextIntlClientProvider messages={messages} locale="en">
        <body className={`${Gilroy.variable}`}>
          <YaMetric />
          <GlobalProvider>{children}</GlobalProvider>
        </body>
      </NextIntlClientProvider>
    </HtmlLangLayout>
  );
}
