import styles from './LandingPage.module.scss';
import {Creator} from '@/page_components/landing_page/components/Creator/Creator';
import {FAQ} from '@/page_components/landing_page/components/FAQ/FAQ';
import {useTranslations} from 'next-intl';

export const LandingPage = () => {
  const t = useTranslations('mainpage');

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.titles}>
          <h1 className={styles.h1}>{t('h1')}</h1>
          <h2 className={styles.h2}>{t('h2')}</h2>
        </div>
        <Creator />
        <FAQ />
      </div>
    </div>
  );
};
