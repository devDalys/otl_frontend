import styles from './Service500.module.scss';
import {Button} from '@/ui-kit/Button/Button';
import Link from 'next/link';

export const Service500 = (props: {
  error: Error & {digest?: string};
  reset: () => void;
}) => {
  const onClick = () => {
    window.location.reload();
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.notFound}>500</div>
      <h1 className={styles.notFoundText}>Сервис временно не доступен</h1>
      <Link href="/">
        <Button
          size="xl"
          color="accent"
          className={styles.button}
          onClick={onClick}
        >
          Обновить страницу
        </Button>
      </Link>
    </div>
  );
};
