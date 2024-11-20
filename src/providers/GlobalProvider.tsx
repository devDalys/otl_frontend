import {ModalProvider} from '@/providers/ModalProvider/ModalProvider';
import {QueryClientProvider} from '@/providers/QueryClient/QueryClient';
import {SnackbarProvider} from '@/providers/SnackbarProvider/SnackbarProvider';

// import {Tracer} from '@/providers/Tracer/Tracer';

export const GlobalProvider = ({children}: {children: React.ReactNode}) => {
  return (
    <QueryClientProvider>
      {/*<Tracer appToken={`${process.env['TRACER_TOKEN']}`} />*/}
      <SnackbarProvider>
        <ModalProvider>{children}</ModalProvider>
      </SnackbarProvider>
    </QueryClientProvider>
  );
};
