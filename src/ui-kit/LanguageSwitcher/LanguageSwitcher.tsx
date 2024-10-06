import styles from './LanguageSwitcher.module.scss';
import * as Select from '@radix-ui/react-select';
import React from 'react';

const languages = [
  {label: 'RU', value: 'RU'},
  {label: 'EN', value: 'EN'},
];

export const LanguageSwitcher = () => {
  return (
    <Select.Root>
      <Select.Trigger className={styles.select} aria-label="Выбор языка">
        <Select.Value placeholder="RU" />
      </Select.Trigger>
      <Select.Portal>
        <Select.Content className={styles.select__content} position="popper">
          <Select.Viewport>
            {languages.map((language) => (
              <Select.Item
                key={language.value}
                value={language.value}
                className={styles.select__item}
              >
                <Select.ItemText> {language.label}</Select.ItemText>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};
