'use client';

import styles from './OpenedContent.module.scss';
import {useLocale} from '@/hooks/useLocale';
import {useSnackbar} from '@/providers/SnackbarProvider/useSnackbar';
import {Button} from '@/ui-kit/Button/Button';
import {useTranslations} from 'next-intl';
import Link from 'next/link';

type Props = {
  content: string;
};

export const OpenedContent = ({content}: Props) => {
  const {showSnack} = useSnackbar();
  const t = useTranslations('openScreen');
  const locale = useLocale();
  const onCopy = () => {
    navigator.clipboard.writeText(content);
    showSnack({title: t('уведомление')});
  };
  const href = locale === 'en' ? '/en' : '/';

  return (
    <div className={styles.wrapper}>
      <div className={styles.content} data-testid="openedContent">
        {content}
      </div>
      <Button
        size="xl"
        color="accent"
        className={styles.button}
        onClick={onCopy}
      >
        {t('копировать')}
      </Button>
      <Link href={href} prefetch={false}>
        <Button size="xl" color="transparent" className={styles.createButton}>
          {t('создать_ссылку')}
        </Button>
      </Link>
    </div>
  );
};
