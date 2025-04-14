'use client';

import {
  initTracerError,
  initTracerErrorUploader,
  initTracerLog,
} from '@apptracer/sdk';
import {useLayoutEffect} from 'react';

type Props = {
  appToken: string;
};

export const Tracer = ({appToken}: Props) => {
  useLayoutEffect(() => {
    const isProd = document.location.host === 'onetimelink.ru';
    if (isProd) {
      initTracerError();
      initTracerLog();
      initTracerErrorUploader({
        versionName: 'latest',
        versionCode: 1,
        appToken,
      });
    }
  }, []);
  return null;
};
