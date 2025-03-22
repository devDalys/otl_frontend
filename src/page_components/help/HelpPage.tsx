'use client';

import styles from './HelpPage.module.scss';
import {HelpForm} from '@/components/HelpForm/HelpForm';
import {useTranslations} from 'next-intl';

export const HelpPage = () => {
  const t = useTranslations('helpPage');

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h1 className={styles.h1}>{t('h1')}</h1>
        <h2 className={styles.h2}>{t('h2')}</h2>
        <h2 className={styles.h2}>
          {t.rich('contactUs', {
            href: (chunks) => <a href="mailto:help@onetimelink.ru">{chunks}</a>,
          })}
        </h2>
        <HelpForm />
      </div>
    </div>
  );
};
