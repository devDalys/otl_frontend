'use client';

import styles from './Creator.module.scss';
import {CreatorForm} from '@/page_components/landing_page/components/CreatorForm/CreatorForm';
import {useSnackbar} from '@/providers/SnackbarProvider/useSnackbar';
import {emitYmEvent} from '@/utils/ymEvent';
import * as Tabs from '@radix-ui/react-tabs';
import classNames from 'classnames';
import React from 'react';

export const Creator = ({}) => {
  const screens = {
    create: {
      name: 'create',
      screen: <CreatorForm />,
    },
    history: {
      name: 'history',
      screen: <div>История</div>,
    },
  };

  const {showSnack} = useSnackbar();

  const onClick = (text: string) => {
    emitYmEvent('clickHistoryButton');
    showSnack({
      title: 'В разработке',
      description: 'Нажмите на кнопку, если вы ждете этот функционал',
      button: {
        text: 'Жду!',
        action: () => emitYmEvent('waitingContent', {button: text}),
      },
    });
  };
  return (
    <Tabs.Root className={styles.Root} defaultValue={screens.create.name}>
      <Tabs.List className={styles.triggers} aria-label="Создание ссылок">
        <Tabs.Trigger
          className={styles.triggers__button}
          value={screens.create.name}
        >
          Создание ссылки
        </Tabs.Trigger>
        <div
          className={classNames(styles.triggers__button, styles.soon)}
          // value={screens.history.name}
          onClick={() => onClick('История')}
        >
          История
        </div>
      </Tabs.List>
      <Tabs.Content className={styles.content} value={screens.create.name}>
        {screens.create.screen}
      </Tabs.Content>
      <Tabs.Content className={styles.content} value={screens.history.name}>
        {screens.history.screen}
      </Tabs.Content>
    </Tabs.Root>
  );
};
