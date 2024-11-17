import styles from './LandingPage.module.scss';
import {Creator} from '@/page_components/landing_page/components/Creator/Creator';

export const LandingPage = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.titles}>
          <h1 className={styles.h1}>
            {`Создать одноразовую короткую ссылку\nс паролем и сроком действия`}
          </h1>
          <h2 className={styles.h2}>
            {
              'Все данные защищены, поэтому делиться\nими через OneTimeLink безопасно.'
            }
          </h2>
        </div>
        <Creator />
      </div>
    </div>
  );
};
