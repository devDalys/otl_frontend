'use client';

import styles from './Header.module.scss';
import {useSnackbar} from '@/providers/SnackbarProvider/useSnackbar';
import {emitYmEvent} from '@/utils/ymEvent';
import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import CloseIcon from 'public/icons/Close.svg';
import MenuIcon from 'public/icons/Menu.svg';
import logo from 'public/images/Logo.webp';
import {useState} from 'react';

export type HeaderProps = {
  links: Array<{url: string; text: string; disabled?: boolean}>;
  loginButtonText: string;
};

export const Header = ({links, loginButtonText}: HeaderProps) => {
  const [isOpened, setIsOpened] = useState(false);
  const onSwitchState = () => {
    setIsOpened((state) => !state);
  };

  const {showSnack} = useSnackbar();

  const onClick = (text: string) => {
    showSnack({
      title: 'В разработке',
      description: 'Нажмите на кнопку, если вы ждете этот функционал',
      button: {
        text: 'Жду!',
        action: () => emitYmEvent('waitingContent', {button: text}),
      },
    });
  };
  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <div className={styles.menuIcon} onClick={onSwitchState}>
          {isOpened ? <CloseIcon /> : <MenuIcon />}
        </div>
        <Link href="/" className={styles.logo}>
          <Image src={logo.src} alt="One Time Link" fill />
        </Link>
        <nav className={classNames(styles.nav, {[styles.opened]: isOpened})}>
          {links.map(({disabled, text, url}) =>
            !disabled ? (
              <Link key={url} className={styles.nav__link} href={url}>
                {text}
              </Link>
            ) : (
              <span
                className={classNames(
                  styles.nav__link,
                  styles.nav__link_disabled,
                )}
                key={text}
                onClick={() => onClick(text)}
              >
                {text}
              </span>
            ),
          )}
        </nav>
        <div className={styles.actions}>
          <Link
            href="/"
            className={styles.loginButton}
            onClick={() => onClick('Войти')}
          >
            {loginButtonText}
          </Link>
        </div>
      </div>
    </header>
  );
};
