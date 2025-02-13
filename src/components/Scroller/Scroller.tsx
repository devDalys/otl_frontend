'use client';

import {usePathname} from 'next/navigation';
import {useLayoutEffect} from 'react';

export const Scroller = () => {
  const pathName = usePathname();
  useLayoutEffect(() => {
    window.scrollTo({top: 0, behavior: 'smooth'});
  }, [pathName]);
  return null;
};
