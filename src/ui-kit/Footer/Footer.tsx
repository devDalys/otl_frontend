'use client';

import styles from './Footer.module.scss';
import {HelpForm} from '@/components/HelpForm/HelpForm';
import {useModal} from '@/providers/ModalProvider/useModal';

export const Footer = () => {
  const {createModal} = useModal();
  const onClick = () => {
    createModal({
      title: 'Форма обратной связи',
      subtitle:
        'Напишите нам, какой функционал вы ждете. Или оставьте нам отзыв по сервису.',
      content: <HelpForm />,
    });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <h3 className={styles.timestamp}>© 2024 One Time Link</h3>
        <button className={styles.help} onClick={onClick}>
          Написать нам
        </button>
      </div>
    </footer>
  );
};
