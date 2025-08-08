'use client';

import {getAdvManager} from '@/components/Ads/Yandex/getAdvManager';
import {
  AD_AUTOREFRESH_INTERVAL_MS,
  DESKTOP_BLOCK_ID,
  MOBILE_BLOCK_ID,
  SESSION_STORAGE_KEY,
} from '@/components/Ads/Yandex/consts';
import {footerPaddings} from '@/components/Ads/Yandex/footerPaddings';
import Script from 'next/script';
import {useCallback, useEffect, useRef, useState} from 'react';

export const YaFloor = () => {
  const [adWasAlreadyClosedInSession] = useState(() =>
    typeof window !== 'undefined' ? sessionStorage.getItem(SESSION_STORAGE_KEY) : null,
  );
  const [adWasClosed, setAdWasClosed] = useState(false);
  const [adScriptError, setAdScriptError] = useState(false);

  const renderWasCalledRef = useRef(false);
  const lastInitTs = useRef(0);

  const canShowAd = !adWasClosed && !adWasAlreadyClosedInSession;

  const onScriptError = useCallback(() => {
    setAdScriptError(true);
    console.log('[YaFloor] Ошибка загрузки скрипта');
  }, []);

  const initAd = useCallback((firstRequest: boolean) => {
    if (
      lastInitTs.current &&
      Date.now() - lastInitTs.current < AD_AUTOREFRESH_INTERVAL_MS
    ) {
      console.log('[YaFloor] Пропускаем обновление рекламы, так как недавно уже обновляли');
      return;
    }

    lastInitTs.current = Date.now();
    window.yaContextCb = window.yaContextCb || [];

    window.yaContextCb.push(() => {
      try {
        const advManager = getAdvManager();
        const platform = advManager.getPlatform();
        const blockId = platform === 'desktop' ? DESKTOP_BLOCK_ID : MOBILE_BLOCK_ID;

        let unbindClickListener: (() => void) | null = null;
        
        if (firstRequest) {
          console.log('[YaFloor] Запрошена реклама', { blockId, platform });
        }

        advManager.render(
          {
            blockId,
            type: 'floorAd',
            platform,
            onRender: (data) => {
              console.log('[YaFloor] Реклама отрендерена', data);
              if (!firstRequest) {
                return;
              }

              if (!renderWasCalledRef.current) {
                renderWasCalledRef.current = true;
                console.log('[YaFloor] Реклама показана', { blockId, platform });

                // Добавляем отступ к футеру при показе рекламы
                footerPaddings.add(data.floorAdSize?.height);

                if (data.stickyAdNode) {
                  const element = data.stickyAdNode;
                  const handleClick = () => {
                    console.log('[YaFloor] Клик по рекламе');
                  };
                  
                  element.addEventListener('click', handleClick);
                  unbindClickListener = () => {
                    element.removeEventListener('click', handleClick);
                  };
                }
              }
            },
            onError: (data) => {
              console.log('[YaFloor] Ошибка рекламы', data);
            },
            onClose: () => {
              console.log('[YaFloor] Реклама закрыта');
              setAdWasClosed(true);
              if (typeof window !== 'undefined') {
                sessionStorage.setItem(SESSION_STORAGE_KEY, '1');
              }

              // Убираем отступ с футера при закрытии рекламы
              footerPaddings.remove();

              if (unbindClickListener) {
                unbindClickListener();
              }
            },
          },
          () => {
            console.log('[YaFloor] Вызван fallback (нет рекламы для показа)');
          },
        );
      } catch (error) {
        console.error('[YaFloor] Ошибка инициализации рекламы:', error);
      }
    });
  }, []);

  useEffect(() => {
    if (!canShowAd) {
      return;
    }

    initAd(true);

    return () => {
      // Убираем отступ при размонтировании компонента
      footerPaddings.remove();
    };
  }, [canShowAd, initAd]);

  // Автообновление при фокусе окна
  useEffect(() => {
    if (!canShowAd) {
      return;
    }

    const handleFocus = () => {
      if (renderWasCalledRef.current) {
        console.log('[YaFloor] Обновляем рекламу при получении фокуса окна');
        initAd(false);
      }
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [canShowAd, initAd]);

  // Автообновление по таймеру
  useEffect(() => {
    if (!canShowAd) {
      return;
    }
    
    const interval = setInterval(() => {
      if (renderWasCalledRef.current) {
        console.log('[YaFloor] Обновляем рекламу по таймеру');
        initAd(false);
      }
    }, AD_AUTOREFRESH_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [canShowAd, initAd]);

  if (!canShowAd || adScriptError) {
    return null;
  }

  return (
    <Script
      id="yandex-ads"
      src="https://yandex.ru/ads/system/context.js"
      async
      onError={onScriptError}
    />
  );
};
