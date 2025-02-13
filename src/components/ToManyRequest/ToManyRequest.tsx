import styles from './ToManyRequest.module.scss';

export const ToManyRequestPage = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.notFound}>403 :(</div>
      <h1 className={styles.description}>
        Мы обнаружили от Вас
        <br />
        слишком много запросов.
      </h1>
    </div>
  );
};
