'use client';

import styles from './CreatorForm.module.scss';
import {api} from '@/api/api';
import {SuccessCreate} from '@/page_components/landing_page/components/SuccessCreate/SuccessCreate';
import {useSnackbar} from '@/providers/SnackbarProvider/useSnackbar';
import {SuccessResponse} from '@/types/responses';
import {Button} from '@/ui-kit/Button/Button';
import {Input} from '@/ui-kit/Input/Input';
import {Select} from '@/ui-kit/Select/Select';
import {Textarea} from '@/ui-kit/Textarea/Textarea';
import {showError} from '@/utils/showError';
import {emitYmEvent} from '@/utils/ymEvent';
import {yupResolver} from '@hookform/resolvers/yup';
import {useState} from 'react';
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

const selectCountVariants = [
  {value: '1', label: '1'},
  {value: '2', label: '2'},
  {value: '3', label: '3'},
  {value: '4', label: '4'},
  {value: '5', label: '5'},
  {value: '10', label: '10'},
  {value: '50', label: '50'},
  {value: '100', label: '100'},
  {value: 'Infinity', label: 'Неограниченно'},
];

const selectStaleVariants = [
  {value: '5m', label: '5 минут'},
  {value: '30m', label: '30 минут'},
  {value: '1h', label: '1 час'},
  {value: '6h', label: '6 часов'},
  {value: '12h', label: '12 часов'},
  {value: '1d', label: '1 день'},
  {value: '7d', label: '1 неделя'},
  {value: '1mn  ', label: '1 месяц'},
  {value: '1y', label: '1 год'},
];
const schema = yup.object().shape({
  content: yup
    .string()
    .required('Обязательное поле')
    .max(5000, 'Максимальная длина поля: 5000')
    .min(3, 'Минимальная длина поля: 3'),
  countOpening: yup.string().required(),
  password: yup.string().max(20, 'Максимальная длина поля: 20').optional(),
  staleTime: yup.string().optional(),
});

export const CreatorForm = () => {
  const {showSnack} = useSnackbar();
  const [createdHref, setCreatedHref] = useState('');
  const {mutate, isLoading} = useMutation({
    mutationFn: (data: Form) => api.post<CreateResponse>('/link/create', data),
    onSuccess: (data) => onSuccess(data.data),
    onError: (error) => showError(error, showSnack),
  });

  const onSuccess = (data: CreateResponse) => {
    reset();
    setCreatedHref(`${document.location.host}/${data.body.href}`);
  };

  const {handleSubmit, control, reset} = useForm({
    defaultValues: {
      content: '',
      countOpening: '1',
      password: '',
      staleTime: '1d',
    },
    resolver: yupResolver(schema),
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
            placeholder="Привет! Высылаю тебе пароль от аккаунта: iloveonetimelink"
            alias="Содержимое"
            maxLength={5000}
            errorMessage={error?.message}
            disabled={isLoading}
            {...field}
          />
        )}
      />
      <Controller
        name="password"
        control={control}
        render={({field: {ref, ...field}, fieldState: {error}}) => (
          <Input
            alias="Пароль для открытия"
            placeholder="12345"
            errorMessage={error?.message}
            disabled={isLoading}
            type="password"
            autoComplete="off"
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
              alias="Количество открытий"
              defaultValue={field.value}
              value={field.value}
              onValueChange={field.onChange}
              items={selectCountVariants}
              tooltipText={`Ссылка удалится после достижения лимита открытий.`}
              disabled={isLoading}
            />
          )}
        />
        <Controller
          name="staleTime"
          control={control}
          render={({field: {ref, ...field}}) => (
            <Select
              alias="Время жизни"
              defaultValue={field.value}
              value={field.value}
              onValueChange={field.onChange}
              items={selectStaleVariants}
              tooltipText={`После истечения срока ссылка перестанет открываться.`}
              disabled={isLoading}
            />
          )}
        />
      </div>
      <Button size="xl" color="accent" type="submit" isLoading={isLoading}>
        Создать
      </Button>
    </form>
  );
};
