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

const selectVariants = [
  {value: '1', label: '1'},
  {value: '2', label: '2'},
  {value: '3', label: '3'},
  {value: '4', label: '4'},
  {value: '5', label: '5'},
  {value: 'Infinite', label: 'Неограниченно'},
];

export const CreatorForm = () => {
  const schema = yup.object().shape({
    content: yup.string().required('Обязательное поле').max(2000).min(1),
    countOpening: yup.string().required(),
    password: yup.string().optional(),
    staleTime: yup.string().optional(),
  });

  const {handleSubmit, control, formState} = useForm({
    defaultValues: {
      content: '',
      countOpening: '1',
      password: '',
      staleTime: '',
    },
    resolver: yupResolver(schema),
    mode: 'onBlur',
    reValidateMode: 'onBlur',
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
            items={selectVariants}
          />
        )}
      />
      <Button size="xl" color="accent" type="submit">
        Создать
      </Button>
    </form>
  );
};
