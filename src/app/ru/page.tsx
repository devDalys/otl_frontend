import {LandingPage} from '@/page_components/landing_page/LandingPage';
import {getDictionary} from '@/utils/getDictionary';

export default async function Home() {
  const locale = await getDictionary('ru', 'main');
  return <LandingPage h1={locale.title} h2={locale.subtitle} />;
}
