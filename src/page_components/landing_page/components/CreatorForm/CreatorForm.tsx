'use client';

import styles from './CreatorForm.module.scss';
import {Button} from '@/ui-kit/Button/Button';
import {Input} from '@/ui-kit/Input/Input';
import {Select} from '@/ui-kit/Select/Select';
import {Textarea} from '@/ui-kit/Textarea/Textarea';
import {yupResolver} from '@hookform/resolvers/yup';
import {Controller, useForm} from 'react-hook-form';
import * as yup from 'yup';

type Form = {
  content: string;
  password?: string;
  countOpening: string;
  staleTime?: string;
};

const selectCountVariants = [
  {value: '1', label: '1 открытие'},
  {value: '2', label: '2 открытия'},
  {value: '3', label: '3 открытия'},
  {value: '4', label: '4 открытия'},
  {value: '5', label: '5 открытий'},
  {value: 'Infinite', label: 'Неограниченно'},
];

const selectStaleVariants = [
  {value: '5m', label: '5 минут'},
  {value: '30m', label: '30 минут'},
  {value: '1h', label: '1 час'},
  {value: '6h', label: '6 часов'},
  {value: '12h', label: '12 часов'},
  {value: '1d', label: '1 день'},
  {value: '7d', label: '1 неделя'},
  {value: '1m', label: '1 месяц'},
  {value: '1y', label: '1 год'},
];

export const CreatorForm = () => {
  const schema = yup.object().shape({
    content: yup.string().required('Обязательное поле').max(2000).min(1),
    countOpening: yup.string().required(),
    password: yup.string().optional(),
    staleTime: yup.string().optional(),
  });

  const {handleSubmit, control} = useForm({
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
    console.log(data);
  };

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
            {...field}
          />
        )}
      />

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
          />
        )}
      />
      <Button size="xl" color="accent" type="submit">
        Создать
      </Button>
    </form>
  );
};
