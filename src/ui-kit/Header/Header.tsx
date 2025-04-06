'use client';

import {LanguageSwitcher} from '../LanguageSwitcher/LanguageSwitcher';
import styles from './Header.module.scss';
import {useLocale} from '@/hooks/useLocale';
import {useTranslations} from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
//@ts-ignore
import Logo from 'public/images/Logo.svg?url';

export const Header = () => {
  const locale = useLocale();
  const languagePrefix = locale === 'ru' ? '' : '/en';
  const t = useTranslations('header');

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <span className={styles.logo}>
          <Image
            src={Logo.src}
            width={80}
            height={40}
            alt="OneTimeLink"
            className={styles.logo}
          />
        </span>
        <div className={styles.links}>
          <Link
            href={languagePrefix + '/'}
            prefetch={false}
            className={styles.link}
          >
            {t('home')}
          </Link>
          <Link
            href={languagePrefix + '/help'}
            prefetch={false}
            className={styles.link}
          >
            {t('support')}
          </Link>
          {/* <Link href={languagePrefix + '/updates'} className={styles.link}>
            {t('updates')}
          </Link> */}
        </div>
        <div className={styles.rightSide}>
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
};
