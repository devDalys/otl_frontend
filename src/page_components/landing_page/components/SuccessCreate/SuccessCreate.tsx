'use client';

import styles from './SuccessCreate.module.scss';
import {useShare} from '@/hooks/useShare';
import {useSnackbar} from '@/providers/SnackbarProvider/useSnackbar';
import {Button} from '@/ui-kit/Button/Button';
import {Input} from '@/ui-kit/Input/Input';
import {scrollToTop} from '@/utils/scrollToTop';
import {emitYmEvent} from '@/utils/ymEvent';
import {SetStateAction, useMemo} from 'react';

type Props = {
  setHref: React.Dispatch<SetStateAction<string>>;
  href: string;
};

export const SuccessCreate = ({setHref, href}: Props) => {
  const {showSnack} = useSnackbar();
  const {share, isCanShare} = useShare({
    url: href,
    title: 'OneTimeLink',
    text: 'Одноразовая ссылка, перейдите по ссылке чтобы открыть её.',
  });
  const onCopy = () => {
    emitYmEvent('copyButtonClick');
    navigator.clipboard.writeText(href);
    showSnack({
      title: 'Ссылка скопирована',
      description: 'Поделитесь ей любым удобным для Вас способом',
    });
  };
  const onShare = () => {
    emitYmEvent('shareButtonClick');
    share();
  };
  const valueForInput = useMemo(() => {
    const url = new URL(href);
    return `${url.host + url.pathname}`;
  }, [href]);

  return (
    <div className={styles.wrapper} data-testid="successScreen">
      <div className={styles.image}></div>
      <h3 className={styles.title}>Ссылка создана! </h3>
      <div className={styles.inputWrapper}>
        <Input
          value={valueForInput}
          content={href}
          disabled
          className={styles.input}
          testId="successFullCreateInput"
        />
      </div>
      <Button
        onClick={onCopy}
        size="xl"
        color="accent"
        className={styles.button}
        testId="copyLink"
      >
        Скопировать ссылку
      </Button>
      {isCanShare && (
        <Button
          onClick={onShare}
          size="xl"
          color="transparent"
          className={styles.button}
        >
          Поделиться ссылкой
        </Button>
      )}
      <Button
        onClick={() => {
          setHref('');
          scrollToTop();
        }}
        size="xl"
        color="transparent"
        className={styles.button}
      >
        Создать новую ссылку
      </Button>
    </div>
  );
};
