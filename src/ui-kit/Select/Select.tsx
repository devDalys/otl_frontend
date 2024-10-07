import styles from './Select.module.scss';
import {Tooltip} from '@/ui-kit/Tooltip/Tooltip';
import * as SelectRadix from '@radix-ui/react-select';
import {SelectProps} from '@radix-ui/react-select';
import classNames from 'classnames';
import TooltipIcon from 'public/icons/Tooltip.svg';
import React from 'react';

type Props = {
  alias: string;
  items: Array<{label: string; value: string}>;
  errorMessage?: string;
  tooltipText?: string;
} & SelectProps;

export const Select = ({
  alias,
  items,
  value,
  defaultValue,
  errorMessage,
  tooltipText,
  ...selectProps
}: Props) => {
  return (
    <div className={styles.wrapper}>
      <span className={styles.alias}>
        {alias}
        {tooltipText?.length ? (
          <Tooltip text={tooltipText}>
            <span className={styles.tooltip}>
              <TooltipIcon />
            </span>
          </Tooltip>
        ) : null}
      </span>

      <SelectRadix.Root {...selectProps}>
        <SelectRadix.Trigger
          className={classNames(styles.select, {
            [styles.error]: errorMessage?.length,
          })}
          aria-label="Выбор языка"
        >
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
      <span className={styles.errorMessage}>{errorMessage}</span>
    </div>
  );
};
