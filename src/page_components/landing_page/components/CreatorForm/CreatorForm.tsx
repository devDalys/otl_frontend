'use client';

import styles from './CreatorForm.module.scss';
import {api} from '@/api/api';
import {useLocale} from '@/hooks/useLocale';
import {SuccessCreate} from '@/page_components/landing_page/components/SuccessCreate/SuccessCreate';
import {useSnackbar} from '@/providers/SnackbarProvider/useSnackbar';
import {SuccessResponse} from '@/types/responses';
import {Button} from '@/ui-kit/Button/Button';
import {Input} from '@/ui-kit/Input/Input';
import {Select} from '@/ui-kit/Select/Select';
import {Textarea} from '@/ui-kit/Textarea/Textarea';
import {historyActions} from '@/utils/history';
import {scrollToTop} from '@/utils/scrollToTop';
import {showError} from '@/utils/showError';
import {emitYmEvent} from '@/utils/ymEvent';
import {yupResolver} from '@hookform/resolvers/yup';
import {useTranslations} from 'next-intl';
import Link from 'next/link';
import {useState, useTransition} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {useMutation} from 'react-query';
import * as yup from 'yup';

type Form = {
  content: string;
  password?: string;
  countOpening: string;
  staleTime?: string;
};

type CreateResponse = SuccessResponse<{
  href: string;
}>;

const selectCountVariants = (t: ReturnType<typeof useTranslations>) => [
  {value: '1', label: '1'},
  {value: '2', label: '2'},
  {value: '3', label: '3'},
  {value: '4', label: '4'},
  {value: '5', label: '5'},
  {value: '10', label: '10'},
  {value: '50', label: '50'},
  {value: '100', label: '100'},
  {value: 'Infinity', label: t('Неограниченно')},
];
const selectStaleVariants = (t: ReturnType<typeof useTranslations>) => [
  {value: '5m', label: t('5 минут')},
  {value: '30m', label: t('30 минут')},
  {value: '1h', label: t('1 час')},
  {value: '6h', label: t('6 часов')},
  {value: '12h', label: t('12 часов')},
  {value: '1d', label: t('1 день')},
  {value: '7d', label: t('1 неделя')},
  {value: '1mn', label: t('1 месяц')},
  {value: '1y', label: t('1 год')},
];

const schema = (t: ReturnType<typeof useTranslations>) =>
  yup.object().shape({
    content: yup
      .string()
      .required(t('обязательное_поле'))
      .max(5000, t('максимальная_длина_поля', {value: 5000}))
      .min(3, t('минимальная_длина_поля', {value: 3})),
    countOpening: yup.string().required(),
    password: yup
      .string()
      .max(20, t('максимальная_длина_поля', {value: 20}))
      .optional(),
    staleTime: yup.string().optional(),
  });

export const CreatorForm = () => {
  const {showSnack} = useSnackbar();
  const [createdHref, setCreatedHref] = useState('');
  const locale = useLocale();
  const {mutate, isLoading} = useMutation({
    mutationFn: (data: Form) => api.post<CreateResponse>('/link/create', data),
    onSuccess: (data) => onSuccess(data.data),
    onError: (error) => showError(error, showSnack),
  });
  const t = useTranslations('creatorForm');
  const formTranslations = useTranslations('form');
  const onSuccess = (data: CreateResponse) => {
    scrollToTop();
    reset();
    const link = `${document.location.origin}${locale === 'en' ? '/en' : ''}/${data.body.href}`;
    setCreatedHref(link);
    historyActions.add({link, timestamp: Date.now(), type: 'creating'});
  };

  const {handleSubmit, control, reset} = useForm({
    defaultValues: {
      content: '',
      countOpening: '1',
      password: '',
      staleTime: '1d',
    },
    resolver: yupResolver(schema(formTranslations)),
    mode: 'onChange',
    reValidateMode: 'onChange',
  });
  const onSubmit = (data: Form) => {
    emitYmEvent('createLinkClick', {withPassword: !!data?.password});
    mutate(data);
  };

  if (createdHref)
    return <SuccessCreate setHref={setCreatedHref} href={createdHref} />;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <Controller
        name="content"
        control={control}
        render={({field: {ref, ...field}, fieldState: {error}}) => (
          <Textarea
            placeholder={t('contentPlaceholder')}
            alias={t('content')}
            maxLength={5000}
            errorMessage={error?.message}
            disabled={isLoading}
            testId="contentField"
            {...field}
          />
        )}
      />
      <Controller
        name="password"
        control={control}
        render={({field: {ref, ...field}, fieldState: {error}}) => (
          <Input
            alias={t('password')}
            placeholder="12345"
            errorMessage={error?.message}
            disabled={isLoading}
            type="password"
            autoComplete="off"
            testId="passwordField"
            {...field}
          />
        )}
      />

      <div className={styles.selects}>
        <Controller
          name="countOpening"
          control={control}
          render={({field: {ref, ...field}}) => (
            <Select
              alias={t('countOpening')}
              defaultValue={field.value}
              value={field.value}
              onValueChange={field.onChange}
              items={selectCountVariants(t)}
              tooltipText={t('countPlaceholder')}
              disabled={isLoading}
            />
          )}
        />
        <Controller
          name="staleTime"
          control={control}
          render={({field: {ref, ...field}}) => (
            <Select
              alias={t('lifetime')}
              defaultValue={field.value}
              value={field.value}
              onValueChange={field.onChange}
              items={selectStaleVariants(t)}
              tooltipText={t('ttlPlaceholder')}
              disabled={isLoading}
            />
          )}
        />
      </div>
      <span className={styles.termsOfUse}>
        {t.rich('terms', {
          href: (chunks) => (
            <a href={locale === 'en' ? '/en/terms' : '/terms'}>{chunks}</a>
          ),
        })}
      </span>
      <Button
        size="xl"
        color="accent"
        type="submit"
        isLoading={isLoading}
        className={styles.button}
        testId="createButton"
      >
        {t('create')}
      </Button>
    </form>
  );
};
