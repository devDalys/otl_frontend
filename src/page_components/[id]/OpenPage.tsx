'use client';

import styles from './OpenPage.module.scss';
import {api} from '@/api/api';
import {useLocale} from '@/hooks/useLocale';
import {OpenedContent} from '@/page_components/[id]/components/OpenedContent/OpenedContent';
import {useSnackbar} from '@/providers/SnackbarProvider/useSnackbar';
import {SuccessResponse} from '@/types/responses';
import {Button} from '@/ui-kit/Button/Button';
import {Input} from '@/ui-kit/Input/Input';
import {historyActions} from '@/utils/history';
import {showError} from '@/utils/showError';
import {emitYmEvent} from '@/utils/ymEvent';
import {yupResolver} from '@hookform/resolvers/yup';
import {useTranslations} from 'next-intl';
import {useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {useMutation} from 'react-query';
import * as yup from 'yup';

type Props = {
  withPassword: boolean;
  id: string;
};

type Response = SuccessResponse<{content: string}>;
const schema = (t: ReturnType<typeof useTranslations>) =>
  yup.object().shape({
    password: yup
      .string()
      .max(20, t('максимальная_длина_поля', {value: 20}))
      .required(t('обязательное_поле')),
  });
export const OpenPage = ({withPassword, id}: Props) => {
  const [content, setContent] = useState('');
  const t = useTranslations('openScreen');
  const f = useTranslations('form');
  const locale = useLocale();
  const {showSnack} = useSnackbar();
  const {control, handleSubmit, reset} = useForm({
    resolver: yupResolver(schema(f)),
    defaultValues: {
      password: '',
    },
  });
  const {mutate, isLoading} = useMutation({
    mutationFn: (password?: string) =>
      api.post<Response>('/link/open', {
        id,
        password,
      }),
    onSuccess: ({data}) => {
      setContent(data.body.content);
      historyActions.add({
        link: `${document.location.origin}/${id}`,
        timestamp: Date.now(),
        type: 'opening',
      });
    },
    onError: (error) => {
      reset();
      showError(error, showSnack);
    },
  });
  const onOpenClick = (password: string) => {
    mutate(password);
    emitYmEvent('clickViewContent');
  };

  if (content) return <OpenedContent content={content} />;

  return (
    <div className={styles.wrapper}>
      {!withPassword && <h1 className={styles.h1}>{t('инструкция')}</h1>}
      {withPassword && <h1 className={styles.h1}>{t('введите_пароль')}</h1>}
      <h2 className={styles.h2}>{t('предупреждение')}</h2>
      <span className={styles.termsOfUse}>
        {t.rich('terms', {
          href: (chunks) => (
            <a href={locale === 'en' ? '/en/terms' : '/terms'}>{chunks}</a>
          ),
        })}
      </span>
      {withPassword && (
        <form
          className={styles.form}
          onSubmit={handleSubmit(({password}) => onOpenClick(password))}
        >
          <Controller
            control={control}
            name="password"
            render={({field: {ref, ...field}, fieldState}) => (
              <Input
                alias={t('пароль')}
                type="password"
                className={styles.input}
                autoComplete="off"
                testId="passwordForOpen"
                {...field}
                errorMessage={fieldState.error?.message}
              />
            )}
          />
          <Button
            size="xl"
            color="accent"
            className={styles.formButton}
            isLoading={isLoading}
            type="submit"
            testId="openButton"
          >
            {t('открыть')}
          </Button>
        </form>
      )}
      {!withPassword && (
        <Button
          size="xl"
          color="accent"
          className={styles.button}
          onClick={() => onOpenClick('')}
          isLoading={isLoading}
        >
          {t('открыть')}
        </Button>
      )}
    </div>
  );
};
