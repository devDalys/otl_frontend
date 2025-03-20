'use client';

import styles from './NotFoundSlug.module.scss';
import {useLocale} from '@/hooks/useLocale';
import {Button} from '@/ui-kit/Button/Button';
import {useTranslations} from 'next-intl';
import Link from 'next/link';

export const NotFoundSlugPage = () => {
  const t = useTranslations('notFoundSlug');
  const locale = useLocale();
  const path = locale === 'en' ? '/en' : '/';

  return (
    <div className={styles.wrapper}>
      <div className={styles.notFound}>404 :(</div>
      <h1 className={styles.notFoundText}>{t('описание')}</h1>
      <h1 className={styles.description}>{t('ошибка')}</h1>
      <Link href={path}>
        <Button size="xl" color="accent" className={styles.button}>
          {t('действие')}
        </Button>
      </Link>
    </div>
  );
};
