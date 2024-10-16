import styles from './LandingPage.module.scss';
import {Creator} from '@/page_components/landing_page/components/Creator/Creator';

export const LandingPage = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.titles}>
          <h1 className={styles.h1}>
            {`Создайте одноразовые ссылки\nс паролем и сроком действия`}
          </h1>
          <h2 className={styles.h2}>
            {
              'Все данные защищены, поэтому делиться\nданными через One Time Link безопасно.'
            }
          </h2>
        </div>
        <Creator />
      </div>
    </div>
  );
};
