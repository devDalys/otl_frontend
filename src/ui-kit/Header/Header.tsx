'use client';

import styles from './Header.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import logo from 'public/images/Logo.webp';

export const Header = () => {
  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logo}>
        <Image src={logo.src} alt="One Time Link" fill />
      </Link>
    </header>
  );
};
