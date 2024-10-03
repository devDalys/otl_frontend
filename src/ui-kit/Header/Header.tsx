'use client';

import styles from './Header.module.scss';
import {Badge} from '@nextui-org/badge';
import {Tooltip} from '@nextui-org/tooltip';
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
                <Tooltip
                  content="Скоро"
                  showArrow
                  color="foreground"
                  placement="right"
                  closeDelay={200}
                >
                  {text}
                </Tooltip>
              </span>
            ),
          )}
        </nav>
      </div>
    </header>
  );
};
