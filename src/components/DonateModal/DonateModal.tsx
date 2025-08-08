import {UMoney} from '../UMoney/UMoney';
import styles from './DonateModal.module.scss';

export const DonateModal = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>Немного о проекте:</div>
      <div className={styles.textContent}>
        Проект создан и поддерживается одним человеком. Да, функционал весьма
        небольшой, но работа над поддержкой и разработкой ведется ежедневно. И
        помимо времени - на инфрастуктуру проекта уходят деньги, но на проекте
        нет каких-либо других способов монетизации. Поэтому эти пожертвования
        целиков пойдут на оплату инфрастуктуры, и возможно кофе.
      </div>
      <div className={styles.title}>Как поддержать ?</div>
      <div className={styles.textContent}>
        Не знал, где это лучше организовать, поэтому выбрал по совету ChatGPT:
        yoomoney.
      </div>
      <UMoney />
    </div>
  );
};
