import styles from './Button.module.scss';
import classNames from 'classnames';

type Props = {
  size: 'sm' | 'xl';
  color: 'accent';
  isLoading?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({
  size,
  color,
  className,
  isLoading,
  ...buttonProps
}: Props) => {
  return (
    <button
      className={classNames(
        styles.button,
        styles[size],
        styles[color],
        className,
        {[styles.isLoading]: isLoading},
      )}
      {...buttonProps}
    >
      <div className={styles.children}>
        {isLoading && <span className={styles.spinner}></span>}
        {buttonProps.children}
      </div>
    </button>
  );
};
