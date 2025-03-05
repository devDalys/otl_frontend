import {usePathname} from 'next/navigation';

export const useLocale = () => {
  const pathName = usePathname() as string;
  if (!pathName) return 'ru';
  const isEn = pathName.startsWith('/en');

  if (isEn) {
    return 'en';
  }

  return 'ru';
};
