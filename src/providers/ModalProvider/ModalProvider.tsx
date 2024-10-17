'use client';

import styles from './ModalProvider.module.scss';
import * as Dialog from '@radix-ui/react-dialog';
import CloseIcon from 'public/icons/Close.svg';
import {createContext, useState} from 'react';
import * as React from 'react';

type CreateProps = {
  title: string;
  subtitle: string;
  content: React.ReactNode;
};

type ModalContext = {
  createModal: (props: CreateProps) => void;
  hideModal: () => void;
};

const ModalContext = createContext<ModalContext>({
  createModal: () => null,
  hideModal: () => null,
});

const ModalProvider = ({children}: {children: React.ReactNode}) => {
  const [modal, setModal] = useState<CreateProps>();
  const createModal = (props: CreateProps) => {
    setModal(props);
  };
  const hideModal = () => {
    setModal(undefined);
  };

  return (
    <ModalContext.Provider value={{createModal, hideModal}}>
      {modal?.title && (
        <Dialog.Root open={!!modal?.title} onOpenChange={hideModal}>
          <Dialog.Portal>
            <Dialog.Overlay className={styles.overlay} />
            <Dialog.Content className={styles.content}>
              <Dialog.Title className={styles.title}>
                {modal.title}
              </Dialog.Title>
              <Dialog.Description className={styles.description}>
                {modal.subtitle}
              </Dialog.Description>
              {modal.content}
              <Dialog.Close asChild>
                <button className={styles.iconButton} aria-label="Close">
                  <CloseIcon />
                </button>
              </Dialog.Close>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      )}
      {children}
    </ModalContext.Provider>
  );
};

export {ModalContext, ModalProvider};
