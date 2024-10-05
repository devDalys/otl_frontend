import {Header} from '@/ui-kit/Header/Header';
import type {Metadata} from 'next';

export const metadata: Metadata = {
  title:
    'One Time Link - одноразовые ссылки с настройкой срока действия и паролем',
  description: 'Генератор одноразовых ссылок',
};

const links = [
  {url: '/', text: 'Главная'},
  {url: '', text: 'Помощь', disabled: true},
  {url: '', text: 'API', disabled: true},
  {url: '', text: 'Личный кабинет', disabled: true},
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header links={links} loginButtonText="Войти" />
      {children}
    </>
  );
}
