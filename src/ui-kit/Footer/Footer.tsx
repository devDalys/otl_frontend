'use client';

import styles from './Footer.module.scss';
import {HelpForm} from '@/components/HelpForm/HelpForm';
import {useModal} from '@/providers/ModalProvider/useModal';

export const Footer = () => {
  const {createModal, hideModal} = useModal();
  const onClick = () => {
    createModal({
      title: 'Обратная связь',
      subtitle:
        'Напишите нам, какой функционал вы ждете, или с какой проблемой столкнулись.',
      content: <HelpForm hideModal={hideModal} />,
    });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <h3 className={styles.timestamp}>© 2024 OneTimeLink</h3>
        <button className={styles.help} onClick={onClick}>
          Написать нам
        </button>
      </div>
    </footer>
  );
};
