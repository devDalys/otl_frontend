import styles from './Input.module.scss';
import classNames from 'classnames';

type Props = {
  errorMessage?: string;
  alias: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const Input = ({alias, errorMessage, ...inputProps}: Props) => {
  return (
    <div className={styles.wrapper}>
      <h3 className={styles.alias}>{alias}</h3>
      <input
        className={classNames(styles.input, {
          [styles.error]: errorMessage?.length,
        })}
        {...inputProps}
      />
      {errorMessage && (
        <span className={styles.errorMessage}>{errorMessage}</span>
      )}
    </div>
  );
};
