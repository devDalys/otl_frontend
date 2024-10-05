'use client';

import styles from './Header.module.scss';
import {LanguageSwitcher} from '@/ui-kit/LanguageSwitcher/LanguageSwitcher';
import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import logo from 'public/images/Logo.webp';

export type HeaderProps = {
  links: Array<{url: string; text: string; disabled?: boolean}>;
  loginButtonText: string;
};

export const Header = ({links, loginButtonText}: HeaderProps) => {
  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <Link href="/" className={styles.logo}>
          <Image src={logo.src} alt="One Time Link" fill />
        </Link>
        <nav className={styles.nav}>
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
              >
                {text}
              </span>
            ),
          )}
        </nav>
        <div className={styles.actions}>
          <LanguageSwitcher />
          <Link href="/" className={styles.loginButton}>
            {loginButtonText}
          </Link>
        </div>
      </div>
    </header>
  );
};
