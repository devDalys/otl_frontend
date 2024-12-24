'use client';

import styles from './History.module.scss';
import {useSnackbar} from '@/providers/SnackbarProvider/useSnackbar';
import {Button} from '@/ui-kit/Button/Button';
import {historyActions, HistoryLink} from '@/utils/history';
import {emitYmEvent} from '@/utils/ymEvent';
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

const textByType = {
  creating: 'Создание',
  opening: 'Открытие',
};

export const History = () => {
  const [history, setHistory] = useState<Array<HistoryLink>>(
    historyActions.get(),
  );
  const {showSnack} = useSnackbar();

  const onCopy = (link: string) => {
    emitYmEvent('copyButtonClick');
    navigator.clipboard.writeText(link);
    showSnack({
      title: 'Ссылка скопирована',
    });
  };
  const onDeleteAll = () => {
    emitYmEvent('deleteHistory');
    setHistory([]);
    historyActions.deleteAll();
    showSnack({title: 'История успешно очищена'});
  };

  if (!history.length)
    return (
      <div className={styles.empty}>
        Вы пока не создавали и <br />
        не открывали ссылок
      </div>
    );

  return (
    <>
      <div className={styles.wrapper}>
        {history.map((link, index) => (
          <div
            key={index}
            className={styles.link}
            onClick={() => onCopy(link.link)}
          >
            <div className={styles.header}>
              <span>{textByType[link.type]} ссылки</span>
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
        Очистить историю
      </Button>
    </>
  );
};
