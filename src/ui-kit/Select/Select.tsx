import styles from './Select.module.scss';
import * as SelectRadix from '@radix-ui/react-select';
import {SelectProps} from '@radix-ui/react-select';
import React from 'react';

type Props = {
  alias: string;
  items: Array<{label: string; value: string}>;
} & SelectProps;

export const Select = ({
  alias,
  items,
  value,
  defaultValue,
  ...selectProps
}: Props) => {
  return (
    <div className={styles.wrapper}>
      <span className={styles.alias}>{alias}</span>

      <SelectRadix.Root {...selectProps}>
        <SelectRadix.Trigger className={styles.select} aria-label="Выбор языка">
          <SelectRadix.Value placeholder={defaultValue} />
        </SelectRadix.Trigger>
        <SelectRadix.Content
          className={styles.select__content}
          position="popper"
          sideOffset={10}
        >
          <SelectRadix.Viewport>
            {items.map((item) => (
              <SelectRadix.Item
                key={item.value}
                value={item.value}
                className={styles.select__item}
              >
                <SelectRadix.ItemText> {item.label}</SelectRadix.ItemText>
              </SelectRadix.Item>
            ))}
          </SelectRadix.Viewport>
        </SelectRadix.Content>
      </SelectRadix.Root>
    </div>
  );
};
