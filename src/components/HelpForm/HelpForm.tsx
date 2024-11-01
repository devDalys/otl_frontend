'use client';

import styles from './HelpForm.module.scss';
import {api} from '@/api/api';
import {useSnackbar} from '@/providers/SnackbarProvider/useSnackbar';
import {Button} from '@/ui-kit/Button/Button';
import {Input} from '@/ui-kit/Input/Input';
import {Textarea} from '@/ui-kit/Textarea/Textarea';
import {showError} from '@/utils/showError';
import {yupResolver} from '@hookform/resolvers/yup';
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

const schema = yup.object().shape({
  name: yup
    .string()
    .required('Обязательное поле')
    .max(30, 'Максимальная длина поля: 30')
    .min(2, 'Минимальная длина поля: 2'),
  content: yup
    .string()
    .required('Обязательное поле')
    .max(2000, 'Максимальная длина поля: 2000')
    .min(50, 'Минимальная длина поля: 50'),
  email: yup.string().email('Неверный формат почты'),
});

export const HelpForm = ({hideModal}: Props) => {
  const {showSnack} = useSnackbar();
  const {isLoading, mutate} = useMutation({
    mutationFn: (data: Form) => {
      return api.post('/feedback/public', data);
    },
    onSuccess: () => {
      showSnack({
        title: 'Спасибо за обращение',
        description: 'Мы обязательно рассмотрим его в ближайшее время',
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
    resolver: yupResolver(schema),
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const onSubmit = (data: Form) => {
    mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <Controller
        name="name"
        control={control}
        render={({field: {ref, ...field}, fieldState: {error}}) => (
          <Input
            placeholder="Петр"
            alias="Как к вам обращаться"
            errorMessage={error?.message}
            disabled={isLoading}
            {...field}
          />
        )}
      />
      <Controller
        name="content"
        control={control}
        render={({field: {ref, ...field}, fieldState: {error}}) => (
          <Textarea
            placeholder="Предлагаю сделать личный кабинет, чтобы я мог..."
            alias="Обращение"
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
            alias="Почта для ответа"
            placeholder="petya@mail.ru"
            errorMessage={error?.message}
            disabled={isLoading}
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
        Отправить
      </Button>
    </form>
  );
};
