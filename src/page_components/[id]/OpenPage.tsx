'use client';

import styles from './OpenPage.module.scss';
import {api} from '@/api/api';
import {OpenedContent} from '@/page_components/[id]/components/OpenedContent/OpenedContent';
import {useSnackbar} from '@/providers/SnackbarProvider/useSnackbar';
import {SuccessResponse} from '@/types/responses';
import {Button} from '@/ui-kit/Button/Button';
import {Input} from '@/ui-kit/Input/Input';
import {showError} from '@/utils/showError';
import {emitYmEvent} from '@/utils/ymEvent';
import {yupResolver} from '@hookform/resolvers/yup';
import {useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {useMutation} from 'react-query';
import * as yup from 'yup';

type Props = {
  withPassword: boolean;
  id: string;
};

type Response = SuccessResponse<{content: string}>;
const schema = yup.object().shape({
  password: yup
    .string()
    .max(20, 'Максимальная длина поля: 20')
    .required('Обязательное поле'),
});
export const OpenPage = ({withPassword, id}: Props) => {
  const [content, setContent] = useState('');
  const {showSnack} = useSnackbar();
  const {control, handleSubmit, reset} = useForm({
    resolver: yupResolver(schema),
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
      {!withPassword && (
        <h1 className={styles.h1}>
          Нажмите "Открыть" чтобы
          <br />
          просмотреть содержимое
        </h1>
      )}
      {withPassword && (
        <h1 className={styles.h1}>Введите пароль для просмотра содержимого</h1>
      )}
      <h2 className={styles.h2}>
        Если Вы не знаете, что это за ссылка - не пытайтесь открыть её.
        <br /> One Time Link не несет ответственности за её содержимое.
      </h2>
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
                alias="Пароль"
                type="password"
                className={styles.input}
                autoComplete="off"
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
          >
            Открыть
          </Button>
        </form>
      )}
      {!withPassword && (
        <Button
          size="xl"
          color="accent"
          className={styles.button}
          onClick={() => mutate('')}
          isLoading={isLoading}
        >
          Открыть
        </Button>
      )}
    </div>
  );
};
