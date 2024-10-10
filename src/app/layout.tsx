import './globals.scss';
import {YaMetric} from '@/scripts/YaMetric';
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

        {children}
      </body>
    </html>
  );
}
