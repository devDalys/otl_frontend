'use client';

import styles from './Header.module.scss';
import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import logo from 'public/icons/logo.svg';

export type HeaderProps = {
  links: Array<{url: string; text: string; disabled?: boolean}>;
};

export const Header = ({links}: HeaderProps) => {
  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <Link href="/" className={styles.logo}>
          <Image src={logo.src} alt="One Time Link" fill />
        </Link>
        <nav className={styles.nav}>
          {links.map(({disabled, text, url}, index) =>
            !disabled ? (
              <Link className={styles.nav__link} href={url}>
                {text}
              </Link>
            ) : (
              <span
                className={classNames(
                  styles.nav__link,
                  styles.nav__link_disabled,
                )}
              >
                {text}
              </span>
            ),
          )}
        </nav>
      </div>
    </header>
  );
};
