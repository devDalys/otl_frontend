import styles from './NotFound.module.scss';
import {Button} from '@/ui-kit/Button/Button';
import Link from 'next/link';

export const NotFoundPage = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.notFound}>404</div>
      <h1 className={styles.notFoundText}>Страница не найдена</h1>
      <Link href="/">
        <Button size="xl" color="accent" className={styles.button}>
          На главную
        </Button>
      </Link>
    </div>
  );
};
