'use client';

import styles from './SuccessCreate.module.scss';
import {useSnackbar} from '@/providers/SnackbarProvider/useSnackbar';
import {Button} from '@/ui-kit/Button/Button';
import {Input} from '@/ui-kit/Input/Input';
import {SetStateAction} from 'react';

type Props = {
  setHref: React.Dispatch<SetStateAction<string>>;
  href: string;
};

export const SuccessCreate = ({setHref, href}: Props) => {
  const {showSnack} = useSnackbar();
  const onCopy = () => {
    navigator.clipboard.writeText(`https://${href}`);
    showSnack({
      title: 'Ссылка скопирована',
      description: 'Поделитесь ей любым удобным для Вас способом',
    });
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.image}></div>
      <h3 className={styles.title}>Ссылка создана! </h3>
      <div className={styles.inputWrapper}>
        <Input value={href} disabled className={styles.input} />
      </div>
      <Button
        onClick={onCopy}
        size="xl"
        color="accent"
        className={styles.button}
      >
        Скопировать ссылку
      </Button>
      <Button
        onClick={() => setHref('')}
        size="xl"
        color="transparent"
        className={styles.button}
      >
        Создать новую ссылку
      </Button>
    </div>
  );
};
