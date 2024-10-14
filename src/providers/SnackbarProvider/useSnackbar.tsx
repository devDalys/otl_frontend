import {SnackbarContext} from '@/providers/SnackbarProvider/SnackbarProvider';
import {useContext} from 'react';

export const useSnackbar = () => useContext(SnackbarContext);
