'use client';

import styles from './Creator.module.scss';
import {CreatorForm} from '@/page_components/landing_page/components/CreatorForm/CreatorForm';
import {History} from '@/page_components/landing_page/components/History/History';
import {emitYmEvent} from '@/utils/ymEvent';
import * as Tabs from '@radix-ui/react-tabs';
import {useTranslations} from 'next-intl';
import React from 'react';

export const Creator = ({}) => {
  const screens = {
    create: {
      name: 'create',
      screen: <CreatorForm />,
    },
    history: {
      name: 'history',
      screen: <History />,
    },
  };
  const t = useTranslations('mainpage');

  return (
    <Tabs.Root className={styles.Root} defaultValue={screens.create.name}>
      <Tabs.List className={styles.triggers} aria-label="Создание ссылок">
        <Tabs.Trigger
          className={styles.triggers__button}
          value={screens.create.name}
        >
          {t('createTab')}
        </Tabs.Trigger>
        <Tabs.Trigger
          className={styles.triggers__button}
          value={screens.history.name}
        >
          {t('historyTab')}
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content className={styles.content} value={screens.create.name}>
        {screens.create.screen}
      </Tabs.Content>
      <Tabs.Content
        className={styles.content}
        value={screens.history.name}
        onClick={() => {
          emitYmEvent('clickHistoryButton');
        }}
      >
        {screens.history.screen}
      </Tabs.Content>
    </Tabs.Root>
  );
};
