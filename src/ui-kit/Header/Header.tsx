'use client';

import styles from './Header.module.scss';
import Link from 'next/link';
import Logo from 'public/images/Logo.svg';

export const Header = () => {
  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logo}>
        <Logo />
      </Link>
    </header>
  );
};
