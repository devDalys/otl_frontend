import {ModalProvider} from '@/providers/ModalProvider/ModalProvider';
import {SnackbarProvider} from '@/providers/SnackbarProvider/SnackbarProvider';

export const GlobalProvider = ({children}: {children: React.ReactNode}) => {
  return (
    <ModalProvider>
      <SnackbarProvider>{children}</SnackbarProvider>
    </ModalProvider>
  );
};
