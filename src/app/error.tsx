'use client';

import {Service500} from '@/components/Service500/Service500';

export default function Error(props: {
  error: Error & {digest?: string};
  reset: () => void;
}) {
  return <Service500 {...props} />;
}
