'use client';

import styles from './OpenedContent.module.scss';
import {useSnackbar} from '@/providers/SnackbarProvider/useSnackbar';
import {Button} from '@/ui-kit/Button/Button';
import Link from 'next/link';

type Props = {
  content: string;
};

export const OpenedContent = ({content}: Props) => {
  const {showSnack} = useSnackbar();
  const onCopy = () => {
    navigator.clipboard.writeText(content);
    showSnack({title: 'Содержимое скопировано'});
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>{content}</div>
      <Button
        size="xl"
        color="accent"
        className={styles.button}
        onClick={onCopy}
      >
        Скопировать содержимое
      </Button>
      <Link href="/">
        <Button size="xl" color="transparent" className={styles.createButton}>
          Создать новую ссылку
        </Button>
      </Link>
    </div>
  );
};
