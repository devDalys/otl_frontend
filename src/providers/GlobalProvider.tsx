import {SnackbarProvider} from '@/providers/SnackbarProvider/SnackbarProvider';

export const GlobalProvider = ({children}: {children: React.ReactNode}) => {
  return <SnackbarProvider>{children}</SnackbarProvider>;
};
