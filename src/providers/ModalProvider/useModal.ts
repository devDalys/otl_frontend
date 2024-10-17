import {ModalContext} from '@/providers/ModalProvider/ModalProvider';
import {useContext} from 'react';

export const useModal = () => useContext(ModalContext);
