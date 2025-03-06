'use client';

import styles from './HelpForm.module.scss';
import {api} from '@/api/api';
import {useSnackbar} from '@/providers/SnackbarProvider/useSnackbar';
import {Button} from '@/ui-kit/Button/Button';
import {Input} from '@/ui-kit/Input/Input';
import {Textarea} from '@/ui-kit/Textarea/Textarea';
import {showError} from '@/utils/showError';
import {emitYmEvent} from '@/utils/ymEvent';
import {yupResolver} from '@hookform/resolvers/yup';
import {useTranslations} from 'next-intl';
import {Controller, useForm} from 'react-hook-form';
import {useMutation} from 'react-query';
import * as yup from 'yup';

type Form = {
  content: string;
  email?: string;
  name: string;
};

type Props = {
  hideModal: () => void;
};

const schema = (t: any) =>
  yup.object().shape({
    name: yup
      .string()
      .required(t('обязательное_поле'))
      .max(30, t('максимальная_длина_поля', {value: 30}))
      .min(2, t('минимальная_длина_поля', {value: 2})),
    content: yup
      .string()
      .required(t('обязательное_поле'))
      .max(2000, t('максимальная_длина_поля', {value: 2000}))
      .min(50, t('минимальная_длина_поля', {value: 50})),
    email: yup
      .string()
      .required(t('обязательное_поле'))
      .email(t('неверная_почта')),
  });

export const HelpForm = ({hideModal}: Props) => {
  const {showSnack} = useSnackbar();
  const t = useTranslations('feedbackform');
  const {isLoading, mutate} = useMutation({
    mutationFn: (data: Form) => {
      return api.post('/feedback/public', data);
    },
    onSuccess: () => {
      showSnack({
        title: t('спасибо_за_обращение'),
        description: t('рассмотрение_обращения'),
      });
      reset();
      hideModal();
    },
    onError: (error) => showError(error, showSnack),
  });

  const {handleSubmit, control, reset} = useForm({
    defaultValues: {
      content: '',
      email: '',
      name: '',
    },
    resolver: yupResolver(schema(t)),
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const onSubmit = (data: Form) => {
    mutate(data);
    emitYmEvent('feedBackFormSend');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <Controller
        name="name"
        control={control}
        render={({field: {ref, ...field}, fieldState: {error}}) => (
          <Input
            placeholder={t('fakename')}
            alias={t('как_к_вам_обращаться')}
            errorMessage={error?.message}
            disabled={isLoading}
            {...field}
            autoComplete="name"
          />
        )}
      />
      <Controller
        name="content"
        control={control}
        render={({field: {ref, ...field}, fieldState: {error}}) => (
          <Textarea
            placeholder={t('предложение_личного_кабинета')}
            alias={t('обращение')}
            maxLength={2000}
            errorMessage={error?.message}
            disabled={isLoading}
            {...field}
          />
        )}
      />
      <Controller
        name="email"
        control={control}
        render={({field: {ref, ...field}, fieldState: {error}}) => (
          <Input
            alias={t('почта_для_ответа')}
            placeholder={t('fakemail')}
            errorMessage={error?.message}
            disabled={isLoading}
            autoComplete="email"
            {...field}
          />
        )}
      />

      <Button
        isLoading={isLoading}
        size="xl"
        color="accent"
        type="submit"
        className={styles.button}
      >
        {t('отправить')}
      </Button>
    </form>
  );
};
