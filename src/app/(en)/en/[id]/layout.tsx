import {PropsWithChildren} from 'react';

export const metadata = {
  robots: 'noindex, nofollow',
};

export default function IdPageLayout({children}: PropsWithChildren) {
  return children;
}
