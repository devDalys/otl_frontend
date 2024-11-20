import {useSnackbar} from '@/providers/SnackbarProvider/useSnackbar';

type Props = {
  title: string;
  text: string;
  url: string;
};

export const useShare = (props: Props) => {
  const {showSnack} = useSnackbar();

  const isCanShare = Boolean(navigator?.canShare?.(props));

  const share = () => {
    if (isCanShare) {
      try {
        navigator.share(props);
      } catch (e) {
        showSnack({
          title: 'Ваше устройство не поддерживает этот функционал',
          type: 'error',
        });
      }
    }
  };

  return {isCanShare, share};
};
