import {ModalProvider} from '@/providers/ModalProvider/ModalProvider';
import {QueryClientProvider} from '@/providers/QueryClient/QueryClient';
import {SnackbarProvider} from '@/providers/SnackbarProvider/SnackbarProvider';

export const GlobalProvider = ({children}: {children: React.ReactNode}) => {
  return (
    <QueryClientProvider>
      <SnackbarProvider>
        <ModalProvider>{children}</ModalProvider>
      </SnackbarProvider>
    </QueryClientProvider>
  );
};
