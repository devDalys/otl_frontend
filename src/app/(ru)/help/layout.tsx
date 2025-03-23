import type {Metadata} from 'next';

export const metadata: Metadata = {
  title: 'Связаться с OneTimeLink — Поддержка и вопросы по одноразовым ссылкам',
  description:
    'Нужна помощь по сервису OneTimeLink? Задайте вопрос через форму обратной связи или напишите на email. Поддержка по созданию одноразовых ссылок, защите данных и безопасности передачи информации.',

  alternates: {
    canonical: 'https://onetimelink.ru/help',
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
