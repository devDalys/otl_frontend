'use client';

import {LanguageSwitcher} from '../LanguageSwitcher/LanguageSwitcher';
import styles from './Header.module.scss';
import {useLocale} from '@/hooks/useLocale';
import {useTranslations} from 'next-intl';
import Link from 'next/link';
import Logo from 'public/images/Logo.svg';

export const Header = () => {
  const locale = useLocale();
  const languagePrefix = locale === 'ru' ? '' : '/en';
  const t = useTranslations('header');

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <span className={styles.logo}>
          <Logo />
        </span>
        <div>
          <Link href={languagePrefix + '/'} className={styles.link}>
            {t('home')}
          </Link>
          <Link href={languagePrefix + '/help'} className={styles.link}>
            {t('support')}
          </Link>
          <Link href={languagePrefix + '/updates'} className={styles.link}>
            {t('updates')}
          </Link>
        </div>
        <div className={styles.rightSide}>
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
};
