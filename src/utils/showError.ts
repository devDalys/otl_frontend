import {TSnackbarElem} from '@/providers/SnackbarProvider/SnackbarProvider';
import {AxiosError} from 'axios';

export const showError = (
  e: unknown,
  callback: (props: TSnackbarElem) => void,
) => {
  if (e instanceof AxiosError && e.status === 429) {
    return callback({
      title: 'Превышен лимит попыток, попробуйте позже.',
      type: 'error',
    });
  }
  if (e instanceof AxiosError && e?.response?.data?.msg) {
    return callback({title: e.response.data.msg, type: 'error'});
  }

  return callback({title: 'Что-то пошло не так', type: 'error'});
};
