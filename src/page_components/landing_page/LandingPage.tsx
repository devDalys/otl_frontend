import styles from './LandingPage.module.scss';
import {Creator} from '@/page_components/landing_page/components/Creator/Creator';

type Props = {
  h1: string;
  h2: string;
};

export const LandingPage = ({h1, h2}: Props) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.titles}>
          <h1 className={styles.h1}>{h1}</h1>
          <h2 className={styles.h2}>{h2}</h2>
        </div>
        <Creator />
      </div>
    </div>
  );
};
