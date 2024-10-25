'use client';

import styles from './OpenPage.module.scss';
import {api} from '@/api/api';
import {OpenedContent} from '@/page_components/[id]/components/OpenedContent/OpenedContent';
import {useSnackbar} from '@/providers/SnackbarProvider/useSnackbar';
import {SuccessResponse} from '@/types/responses';
import {Button} from '@/ui-kit/Button/Button';
import {showError} from '@/utils/showError';
import {emitYmEvent} from '@/utils/ymEvent';
import {useState} from 'react';
import {useMutation, useQuery} from 'react-query';

type Props = {
  withPassword: boolean;
  id: string;
};

type Response = SuccessResponse<{content: string}>;

export const OpenPage = ({withPassword, id}: Props) => {
  const [content, setContent] = useState(
    'STRAPI_URL=https://strapi.stage.rustore.devmail.ru\nCLIENT_OMICRON_URL=https://omicron.rustore.ru\nSERVER_OMICRON_URL=https://omicron.rustore.ru\nOMICRON_URL_CONFIG_ID=rustore_test_landings\nOMICRON_URL_ENV=dev\nQR_REDIRECT_FALLBACK_URL=https://rustore.ru/instruction.html\nAPI_URL=https://app-catalog.stage.rustore.devmail.ru\nCOOKIE_DOMAIN=test.rustore.devmail.ru\nYANDEX_CAPTCHA_CLIENT_ID=ysc1_S4J3cvj8BYKwHh44yi0CMDeBnDwXJxPHsiQ4C4Ztca64c597\nYANDEX_CAPTCHA_SERVER_ID=ysc2_S4J3cvj8BYKwHh44yi0CtAK8FWOtk3s8gvgoqbWT36b85094\nDEEPLINK_URL=https://api.rustore.ru\nIMAGE_PROXY_SALT=5720d659f3d0676463fa08ca9fc52a3ae7e9198cb8f142f5f8bce32361f79416f323490620319e8bcfb1fc8a75cbc67a75e28a15bb9b4d070ca2cc767f4378ae\nIMAGE_PROXY_KEY=4405748f99e02e67f5b08c2a15d392910fecb0ba3e7fd1663eaf0c578746d8de2ff3fe9891742dca355c2d9acf91e4dcae32b3cf86e0d38982fe323564765426\nIMAGE_PROXY_URL=https://imgproxy.rustore.devmail.ru\nTRACER_MODULE=DEV\n',
  );
  const {showSnack} = useSnackbar();
  const {mutate, isLoading} = useMutation({
    mutationFn: () =>
      api.post<Response>('/link/open', {
        id,
      }),
    onSuccess: ({data}) => {
      setContent(data.body.content);
    },
    onError: (error) => showError(error, showSnack),
  });
  const onOpenClick = () => {
    mutate();
    // emitYmEvent()
  };
  if (content) return <OpenedContent content={content + content} />;
  return (
    <div className={styles.wrapper}>
      {!withPassword && (
        <>
          <h1 className={styles.h1}>
            Нажмите "Открыть" чтобы
            <br />
            просмотреть содержимое
          </h1>
          <h2 className={styles.h2}>
            Если Вы не знаете, что это за ссылка - не пытайтесь открыть её.
            <br /> One Time Link не несет ответственности за её содержимое.
          </h2>
        </>
      )}
      <Button
        size="xl"
        color="accent"
        className={styles.button}
        onClick={() => mutate()}
        isLoading={isLoading}
      >
        Открыть
      </Button>
    </div>
  );
};
