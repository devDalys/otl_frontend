'use client';

import styles from './SuccessCreate.module.scss';
import {DonateModal} from '@/components/DonateModal/DonateModal';
import {useLocale} from '@/hooks/useLocale';
import {useShare} from '@/hooks/useShare';
import {useModal} from '@/providers/ModalProvider/useModal';
import {useSnackbar} from '@/providers/SnackbarProvider/useSnackbar';
import {Button} from '@/ui-kit/Button/Button';
import {Input} from '@/ui-kit/Input/Input';
import {scrollToTop} from '@/utils/scrollToTop';
import {emitYmEvent} from '@/utils/ymEvent';
import {useTranslations} from 'next-intl';
import {SetStateAction, useMemo} from 'react';

type Props = {
  setHref: React.Dispatch<SetStateAction<string>>;
  href: string;
};

export const SuccessCreate = ({setHref, href}: Props) => {
  const {showSnack} = useSnackbar();
  const t = useTranslations('successScreen');
  const locale = useLocale();
  const {share, isCanShare} = useShare({
    url: href,
    title: 'OneTimeLink',
    text: t('одноразовая_ссылка'),
  });
  const {createModal} = useModal();
  const onCopy = () => {
    emitYmEvent('copyButtonClick');
    navigator.clipboard.writeText(href);
    showSnack({
      title: t('ссылка_скопирована'),
      description: t('поделитесь_ссылкой'),
    });
  };
  const onShare = () => {
    emitYmEvent('shareButtonClick');
    share();
  };
  const valueForInput = useMemo(() => {
    const url = new URL(href);
    return `${url.host + url.pathname}`;
  }, [href]);

  const onDonateButtonClick = () => {
    emitYmEvent('clickDonate');
    createModal({
      content: <DonateModal />,
      title: 'Поддержать проект 🎁',
      subtitle: '',
    });
  };

  return (
    <div className={styles.wrapper} data-testid="successScreen">
      <div className={styles.image}></div>
      <h3 className={styles.title}>{t('ссылка_создана')}</h3>
      <div className={styles.inputWrapper}>
        <Input
          value={valueForInput}
          content={href}
          disabled
          className={styles.input}
          testId="successFullCreateInput"
        />
      </div>
      <Button
        onClick={onCopy}
        size="xl"
        color="accent"
        className={styles.button}
        testId="copyLink"
      >
        {t('скопировать_ссылку')}
      </Button>
      {locale === 'ru' && (
        <Button
          className={styles.button}
          onClick={onDonateButtonClick}
          size="xl"
          color="gray"
        >
          Поддержать проект
        </Button>
      )}
      {isCanShare && (
        <Button
          onClick={onShare}
          size="xl"
          color="transparent"
          className={styles.button}
        >
          {t('поделиться_ссылкой')}
        </Button>
      )}
      <Button
        onClick={() => {
          setHref('');
          scrollToTop();
        }}
        size="xl"
        color="transparent"
        className={styles.button}
      >
        {t('создать_новую_ссылку')}
      </Button>
    </div>
  );
};
