'use client';

import styles from './HelpForm.module.scss';
import {Button} from '@/ui-kit/Button/Button';
import {Input} from '@/ui-kit/Input/Input';
import {Textarea} from '@/ui-kit/Textarea/Textarea';
import {yupResolver} from '@hookform/resolvers/yup';
import {Controller, useForm} from 'react-hook-form';
import * as yup from 'yup';

type Form = {
  content: string;
  email?: string;
};

export const HelpForm = () => {
  const schema = yup.object().shape({
    name: yup
      .string()
      .required('Обязательное поле')
      .max(15, 'Максимальная длина поля: 15')
      .min(2, 'Минимальная длина поля: 2'),
    content: yup
      .string()
      .required('Обязательное поле')
      .max(2000, 'Максимальная длина поля: 2000')
      .min(50, 'Минимальная длина поля: 50'),
    email: yup.string().email('Неверный формат почты'),
  });

  const {handleSubmit, control} = useForm({
    defaultValues: {
      content: '',
      email: '',
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
        name="name"
        control={control}
        render={({field: {ref, ...field}, fieldState: {error}}) => (
          <Input
            placeholder="Петр"
            alias="Как к вам обращаться"
            errorMessage={error?.message}
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
            maxLength={5000}
            errorMessage={error?.message}
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
            {...field}
          />
        )}
      />

      <Button size="xl" color="accent" type="submit" className={styles.button}>
        Отправить
      </Button>
    </form>
  );
};
