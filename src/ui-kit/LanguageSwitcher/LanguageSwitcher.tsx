'use client';

import {Select} from '../Select/Select';
import styles from './LanguageSwitcher.module.scss';
import {useLocale} from '@/hooks/useLocale';
import {setUserLocale} from '@/i18n/utils';
import {usePathname, useRouter} from 'next/navigation';
import {useTransition} from 'react';

export const LanguageSwitcher = () => {
  const router = useRouter();
  const pathName = usePathname();
  const locale = useLocale();
  const [isPending, startTransition] = useTransition();

  const onSelect = (value: 'ru' | 'en') => {
    const prefix = value === 'en' ? '/en' : '';
    const path = prefix + pathName.replace('/en', '') || '/';
    startTransition(() => {
      setUserLocale(locale);
    });
    router.push(path);
  };

  return (
    <Select
      items={[
        {label: 'Русский', value: 'ru'},
        {label: 'English', value: 'en'},
      ]}
      defaultValue={locale}
      disabled={isPending}
      onValueChange={onSelect}
      className={styles.select}
    />
  );
};
