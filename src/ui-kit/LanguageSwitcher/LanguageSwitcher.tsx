import styles from './LanguageSwitcher.module.scss';
import * as Select from '@radix-ui/react-select';
import React, {useState} from 'react';

const languages = [
  {label: 'Русский', value: 'RU'},
  {label: 'English', value: 'EN'},
];

export const LanguageSwitcher = () => {
  const [value, setValue] = useState('RU');

  return (
    <Select.Root value={value} onValueChange={(value) => setValue(value)}>
      <Select.Trigger className={styles.select} aria-label="Выбор языка">
        {value}
      </Select.Trigger>
      <Select.Portal>
        <Select.Content
          sideOffset={6}
          className={styles.select__content}
          position="popper"
        >
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
