import {Footer} from '@/ui-kit/Footer/Footer';
import {Header} from '@/ui-kit/Header/Header';
import type {Metadata} from 'next';

export const metadata: Metadata = {
  title: 'OneTimeLink - одноразовые короткие ссылки с паролем',
  description:
    'Создать одноразовую или многоразовую короткую ссылку с паролем, сроком действия при помощи OneTimeLink. Бесплатно, безопасно, удобно.',
  icons: {
    icon: '/images/favicon.ico',
    apple: '/images/favicon.ico',
  },
  alternates: {
    canonical: 'https://onetimelink.ru',
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
  // setUserLocale('ru');
  return (
    <>
      <Header />
      {children}

      <Footer />
    </>
  );
}
