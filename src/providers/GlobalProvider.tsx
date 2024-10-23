import {ModalProvider} from '@/providers/ModalProvider/ModalProvider';
import {QueryClientProvider} from '@/providers/QueryClient/QueryClient';
import {SnackbarProvider} from '@/providers/SnackbarProvider/SnackbarProvider';

export const GlobalProvider = ({children}: {children: React.ReactNode}) => {
  return (
    <QueryClientProvider>
      <ModalProvider>
        <SnackbarProvider>{children}</SnackbarProvider>
      </ModalProvider>
    </QueryClientProvider>
  );
};
