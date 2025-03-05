import {getUserLocale} from './utils';
import {getRequestConfig} from 'next-intl/server';

// let locale = 'ru';

// export const setLocale = (newLocale: string) => {
//   locale = newLocale;
// };

export default getRequestConfig(async () => {
  const locale = await getUserLocale();
  return {
    locale,
    messages: (await import(`../../public/locales/${locale}.json`)).default,
  };
});
