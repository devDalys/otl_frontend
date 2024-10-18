'use client';

import styles from './Snackbar.module.scss';
import * as Toast from '@radix-ui/react-toast';
import * as React from 'react';
import {Fragment, lazy, useContext, useState} from 'react';
import {v4} from 'uuid';

type TSnackbarContext = {
  showSnack: (props: TSnackbarElem) => void;
};

type TSnackbarElem = {
  title: string;
  description?: string;
  delay?: number;
  button?: {
    text: string;
    action: () => void;
  };
};

const SnackbarContext = React.createContext<TSnackbarContext>({
  showSnack: () => null,
});

const SnackbarProvider = ({children}: {children: React.ReactNode}) => {
  const [snackbars, setSnackbars] = useState<Record<string, React.ReactNode>>(
    {},
  );

  const handleHide = (id: string) => {
    const timeout = setTimeout(() => {
      setSnackbars((state) => {
        const activeSnacks = {...state};
        delete activeSnacks[id];
        return activeSnacks;
      });
      clearTimeout(timeout);
    }, 500);
  };

  const generateSnackbarElem = ({
    description,
    title,
    id,
    delay = 3000,
    button,
  }: TSnackbarElem & {id: string}) => {
    return (
      <Toast.Root
        className={styles.root}
        duration={delay}
        onOpenChange={() => handleHide(id)}
      >
        <Toast.Title className={styles.title}>{title}</Toast.Title>
        {description && (
          <span className={styles.description}>{description}</span>
        )}
        {button && (
          <Toast.Action className={styles.Action} asChild altText={button.text}>
            <button
              onClick={() => {
                button.action();
                handleHide(id);
              }}
              className={styles.action}
            >
              {button.text}
            </button>
          </Toast.Action>
        )}
      </Toast.Root>
    );
  };
  const showSnackbar = (props: TSnackbarElem) => {
    const id = v4();

    setSnackbars({
      ...snackbars,
      [id]: generateSnackbarElem({...props, id}),
    });
  };

  return (
    <SnackbarContext.Provider value={{showSnack: showSnackbar}}>
      <Toast.Provider swipeDirection="left">
        {Object.entries(snackbars).map(([key, elem]) => (
          <Fragment key={key}>{elem}</Fragment>
        ))}
        <Toast.Viewport className={styles.viewport} />
      </Toast.Provider>
      {children}
    </SnackbarContext.Provider>
  );
};

export {SnackbarContext, SnackbarProvider};
