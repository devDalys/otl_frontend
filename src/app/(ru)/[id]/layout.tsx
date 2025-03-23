import {PropsWithChildren} from 'react';

export const metadata = {
  robots: 'noindex, nofollow',
};
export const dynamic = 'force-dynamic';

export default function IdPageLayout({children}: PropsWithChildren) {
  return children;
}
