import styles from './LandingPage.module.scss';

type Props = {};

export const LandingPage = ({}: Props) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.titles}>
          <h1 className={styles.h1}>
            Создайте одноразовые ссылки с настройкой срока действия и паролем
          </h1>
          <h2 className={styles.h2}>
            Все данные защищены, поэтому делиться ими через One Time Link
            безопасно. Но следите за тем, кому вы её отправляете.
          </h2>
        </div>
      </div>
    </div>
  );
};
