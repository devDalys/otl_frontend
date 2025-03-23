'use client';

import styles from './ToManyRequest.module.scss';
import {useTranslations} from 'next-intl';

export const ToManyRequestPage = () => {
  const t = useTranslations('toManyRequest');

  return (
    <div className={styles.wrapper}>
      <div className={styles.notFound}>429 :(</div>
      <h1 className={styles.description}>{t('error')}</h1>
    </div>
  );
};
