import {Footer} from '@/ui-kit/Footer/Footer';
import {Header} from '@/ui-kit/Header/Header';
import type {Metadata} from 'next';

export const metadata: Metadata = {
  title: 'OneTimeLink - one-time short links with a password',
  description:
    'Create a one-time or reusable short link with password, expiration date with OneTimeLink. Free, safe, convenient.',
  icons: {
    icon: '/images/favicon.ico',
    apple: '/images/favicon.ico',
  },
  alternates: {
    canonical: 'https://onetimelink.ru/en',
    languages: {
      ru: 'https://onetimelink.ru',
      en: 'https://onetimelink.ru/en',
      'x-default': 'https://onetimelink.ru',
    },
  },
};
export const dynamic = 'force-dynamic';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      {children}

      <Footer />
    </>
  );
}
