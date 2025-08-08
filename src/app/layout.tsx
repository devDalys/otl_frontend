import './globals.scss';
import {YaFloor} from '@/components/Ads/Yandex/YaFloor';
import HtmlLangLayout from '@/layouts/HtmlLangLayout';
import {GlobalProvider} from '@/providers/GlobalProvider';
import {YaMetric} from '@/scripts/YaMetric';
import {NextIntlClientProvider} from 'next-intl';
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

export const dynamic = 'force-dynamic';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <HtmlLangLayout>
      <NextIntlClientProvider>
        <body className={`${Gilroy.variable}`}>
          <YaMetric />
          <YaFloor />
          <GlobalProvider>{children}</GlobalProvider>
        </body>
      </NextIntlClientProvider>
    </HtmlLangLayout>
  );
}
