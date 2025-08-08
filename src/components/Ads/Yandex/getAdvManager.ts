import {AdvManager} from './types';

export const getAdvManager = (): AdvManager =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any).Ya.Context.AdvManager;
