import {LandingPage} from '@/page_components/landing_page/LandingPage';
import ruLocale from 'localization/ru/main.json';

export default async function Home() {
  return <LandingPage h1={ruLocale.title} h2={ruLocale.subtitle} />;
}
