import styles from './Creator.module.scss';
import {CreatorForm} from '@/page_components/landing_page/components/CreatorForm/CreatorForm';
import * as Tabs from '@radix-ui/react-tabs';
import React from 'react';

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

export const Creator = () => (
  <Tabs.Root className={styles.Root} defaultValue={screens.create.name}>
    <Tabs.List className={styles.triggers} aria-label="Создание ссылок">
      <Tabs.Trigger
        className={styles.triggers__button}
        value={screens.create.name}
      >
        Создание ссылки
      </Tabs.Trigger>
      <Tabs.Trigger
        className={styles.triggers__button}
        value={screens.history.name}
      >
        История
      </Tabs.Trigger>
    </Tabs.List>
    <Tabs.Content className={styles.content} value={screens.create.name}>
      {screens.create.screen}
    </Tabs.Content>
    <Tabs.Content className={styles.content} value={screens.history.name}>
      {screens.history.screen}
    </Tabs.Content>
  </Tabs.Root>
);
