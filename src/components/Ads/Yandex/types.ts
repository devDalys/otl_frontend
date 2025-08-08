// Типы для Yandex Ads
export type PlatformType = 'desktop' | 'touch';

export type OnRenderData = {
  floorAdSize?: {
    width: number;
    height: number;
  };
  stickyAdNode?: HTMLElement;
};

export type CommonRenderRequestParts = {
  onClose?: () => void;
  onError?: (data: unknown) => void;
  onRender?: (data: OnRenderData) => void;
};

export type FloorAdRenderRequest = {
  blockId: string;
  type: 'floorAd';
  platform: PlatformType;
} & CommonRenderRequestParts;

export type BannerRenderRequest = {
  blockId: string;
  renderTo: string;
} & CommonRenderRequestParts;

export type AdvManager = {
  render: (
    props: FloorAdRenderRequest | BannerRenderRequest,
    renderFallback: (() => void) | undefined,
  ) => void;
  getPlatform: () => PlatformType;
};

// Расширение глобального window объекта
declare global {
  interface Window {
    yaContextCb?: Array<() => void>;
    Ya?: {
      Context?: {
        AdvManager?: AdvManager;
      };
    };
  }
} 