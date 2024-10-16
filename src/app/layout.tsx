import './globals.scss';
import {GlobalProvider} from '@/providers/GlobalProvider';
import {YaMetric} from '@/scripts/YaMetric';
import {Footer} from '@/ui-kit/Footer/Footer';
import {Header} from '@/ui-kit/Header/Header';
import type {Metadata} from 'next';
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

export const metadata: Metadata = {
  title: 'One Time Link - одноразовые ссылки с паролем',
  description: 'Генератор одноразовых ссылок',
  icons: {
    icon: '/images/Logo.png',
    apple: '/images/Logo.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${Gilroy.variable}`}>
        <YaMetric />
        <GlobalProvider>
          <Header />
          {children}
          <Footer />
        </GlobalProvider>
      </body>
    </html>
  );
}
