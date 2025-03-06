import ru from './public/locales/ru.json';

type Messages = typeof ru;
declare global {
  interface Window {
    ym: any;
  }
  interface IntlMessages extends Messages {}
}
export {};
