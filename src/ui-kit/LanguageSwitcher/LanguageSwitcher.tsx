import styles from './LanguageSwitcher.module.scss';
import * as Select from '@radix-ui/react-select';
import classnames from 'classnames';
import React from 'react';

const languages = [
  {label: 'RU', value: 'RU'},
  {label: 'EN', value: 'EN'},
];

export const LanguageSwitcher = () => {
  return (
    <Select.Root>
      <Select.Trigger className={styles.select} aria-label="language">
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

const SelectItem = React.forwardRef(
  ({children, className, ...props}, forwardedRef) => {
    return (
      <Select.Item
        className={classnames(styles.Item, className)}
        {...props}
        ref={forwardedRef}
      >
        <Select.ItemText>{children}</Select.ItemText>
      </Select.Item>
    );
  },
);
