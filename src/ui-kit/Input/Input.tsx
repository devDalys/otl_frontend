'use client';

import styles from './Input.module.scss';
import classNames from 'classnames';
import Lock from 'public/icons/Lock.svg';
import {useMemo, useState} from 'react';

type Props = {
  errorMessage?: string;
  alias?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const Input = ({
  alias,
  errorMessage,
  className,
  type,
  ...inputProps
}: Props) => {
  const [inputType, setInputType] = useState(type);
  const isPassword = useMemo(() => inputType, []);
  const onChangePasswordVisibility = () => {
    setInputType((value) => (value === 'password' ? 'text' : 'password'));
  };

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.alias}>{alias}</h3>
      <div className={styles.inputWrapper}>
        <input
          className={classNames(styles.input, className, {
            [styles.error]: errorMessage?.length,
          })}
          type={inputType}
          {...inputProps}
        />
        {isPassword && (
          <span
            className={classNames(styles.lock, {
              [styles.lock__unlock]: inputType === 'text',
            })}
            onClick={onChangePasswordVisibility}
          >
            <Lock />
          </span>
        )}
      </div>
      {errorMessage && (
        <span className={styles.errorMessage}>{errorMessage}</span>
      )}
    </div>
  );
};
