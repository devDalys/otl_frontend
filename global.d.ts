import ru from './public/locales/ru.json';

type Messages = typeof ru;
declare global {
  interface Window {
    ym: any;
    yaContextCb?: Array<() => void>;
  }
  interface IntlMessages extends Messages {}
}
export {};
