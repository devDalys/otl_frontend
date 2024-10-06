'use client';

import styles from './Textarea.module.scss';
import classNames from 'classnames';

type Props = {
  alias: string;
  maxLength: number;
  errorMessage?: string;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = ({
  alias,
  maxLength,
  errorMessage,
  ...textAreaProps
}: Props) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h3 className={styles.alias}>{alias}</h3>
        <span
          className={styles.counter}
        >{`${(textAreaProps?.value as string)?.length ?? 0} / ${maxLength}`}</span>
      </div>
      <textarea
        className={classNames(styles.textarea, {
          [styles.error]: errorMessage?.length,
        })}
        {...textAreaProps}
      />
      {errorMessage && (
        <span className={styles.errorMessage}>{errorMessage}</span>
      )}
    </div>
  );
};
