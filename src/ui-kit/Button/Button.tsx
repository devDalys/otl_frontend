import styles from './Button.module.scss';
import classNames from 'classnames';

type Props = {
  size: 'sm' | 'xl';
  color: 'accent' | 'transparent' | 'gray';
  isLoading?: boolean;
  testId?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({
  size,
  color,
  className,
  isLoading,
  testId,
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
      data-testid={testId}
      {...buttonProps}
    >
      <div className={styles.children}>
        {isLoading && <span className={styles.spinner}></span>}
        {buttonProps.children}
      </div>
    </button>
  );
};
