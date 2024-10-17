import styles from './Button.module.scss';
import classNames from 'classnames';

type Props = {
  size: 'sm' | 'xl';
  color: 'accent';
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({size, color, className, ...buttonProps}: Props) => {
  return (
    <button
      className={classNames(
        styles.button,
        styles[size],
        styles[color],
        className,
      )}
      {...buttonProps}
    />
  );
};
