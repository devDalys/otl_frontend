import styles from './Footer.module.scss';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <h3 className={styles.timestamp}>© 2024 One Time Link</h3>
        <button className={styles.help}>Написать нам</button>
      </div>
    </footer>
  );
};
