'use client';

import styles from './History.module.scss';
import {useSnackbar} from '@/providers/SnackbarProvider/useSnackbar';
import {Button} from '@/ui-kit/Button/Button';
import {historyActions, HistoryLink} from '@/utils/history';
import {emitYmEvent} from '@/utils/ymEvent';
import {useTranslations} from 'next-intl';
import {useState} from 'react';

const mock = [
  {
    type: 'creating',
    timestamp: Date.now(),
    link: 'https://onetimelink.ru/asddas2',
  },
  {
    type: 'opening',
    timestamp: Date.now(),
    link: 'https://onetimelink.ru/asddas2',
  },
] as HistoryLink[];

export const History = () => {
  const [history, setHistory] = useState<Array<HistoryLink>>(
    historyActions.get(),
  );

  const t = useTranslations();
  const {showSnack} = useSnackbar();

  const textByType = {
    creating: t('historyScreen.создание'),
    opening: t('historyScreen.открытие'),
  };

  const onCopy = (link: string) => {
    emitYmEvent('copyButtonClick');
    navigator.clipboard.writeText(link);
    showSnack({
      title: t('historyScreen.уведомление'),
    });
  };
  const onDeleteAll = () => {
    emitYmEvent('deleteHistory');
    setHistory([]);
    historyActions.deleteAll();
    showSnack({title: t('historyScreen.успех')});
  };

  if (!history.length)
    return <div className={styles.empty}>{t('historyScreen.информация')}</div>;

  return (
    <>
      <div className={styles.wrapper}>
        {history.map((link, index) => (
          <div
            key={index}
            className={styles.link}
            data-testid="historyItem"
            onClick={() => onCopy(link.link)}
          >
            <div className={styles.header}>
              <span>{textByType[link.type]}</span>
              <span>{new Date(+link.timestamp).toLocaleString()}</span>
            </div>
            {link.link}
          </div>
        ))}
      </div>
      <Button
        onClick={onDeleteAll}
        size="sm"
        color="transparent"
        className={styles.button}
      >
        {t('historyScreen.действие')}
      </Button>
    </>
  );
};
