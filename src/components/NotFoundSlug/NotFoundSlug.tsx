import styles from './NotFoundSlug.module.scss';
import {Button} from '@/ui-kit/Button/Button';
import Link from 'next/link';

export const NotFoundSlugPage = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.notFound}>404 :(</div>
      <h1 className={styles.notFoundText}>Ссылка не найдена</h1>
      <h1 className={styles.description}>
        Возможно у неё истёк срок действия или лимит открытий.
      </h1>
      <Link href="/">
        <Button size="xl" color="accent" className={styles.button}>
          Создать новую
        </Button>
      </Link>
    </div>
  );
};
