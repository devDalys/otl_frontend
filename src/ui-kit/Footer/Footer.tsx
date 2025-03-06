'use client';

import styles from './Footer.module.scss';
import {HelpForm} from '@/components/HelpForm/HelpForm';
import {useModal} from '@/providers/ModalProvider/useModal';
import {emitYmEvent} from '@/utils/ymEvent';
import {useTranslations} from 'next-intl';

export const Footer = () => {
  const {createModal, hideModal} = useModal();
  const t = useTranslations('feedbackform');
  const onClick = () => {
    emitYmEvent('feedBackFormOpen');
    createModal({
      title: t('обратная_связь'),
      subtitle: t('напишите_нам'),
      content: <HelpForm hideModal={hideModal} />,
    });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <h3 className={styles.timestamp}>© 2024 - 2025 OneTimeLink</h3>
        <button className={styles.help} onClick={onClick}>
          {t('написать_нам')}
        </button>
      </div>
    </footer>
  );
};
