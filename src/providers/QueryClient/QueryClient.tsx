'use client';

import {QueryClient, QueryClientProvider as QueryClientProv} from 'react-query';

export const QueryClientProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const queryClient = new QueryClient();
  return <QueryClientProv client={queryClient}>{children}</QueryClientProv>;
};
