import type {Metadata} from 'next';

export const metadata: Metadata = {
  title: 'Contact OneTimeLink — Support and Questions About One-Time Links',
  description:
    'Need help with OneTimeLink? Submit your question via the contact form or email us directly. Support for creating one-time links, secure data sharing, and information protection.',

  alternates: {
    canonical: 'https://onetimelink.ru/en/help',
    languages: {
      ru: 'https://onetimelink.ru/help',
      en: 'https://onetimelink.ru/en/help',
      'x-default': 'https://onetimelink.ru/help',
    },
  },
};
export const dynamic = 'force-dynamic';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
