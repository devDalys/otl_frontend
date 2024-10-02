import styles from './Badge.module.scss';

type Props = {
  text: string;
  children: React.ReactNode;
};

export const Badge = ({children, text}: Props) => {
  return (
    <div className={styles.wrapper}>
      <span className={styles.badge}>{text}</span>
      {children}
    </div>
  );
};
