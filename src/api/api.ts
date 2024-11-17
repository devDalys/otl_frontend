import axios from 'axios';

const isClient = typeof window !== 'undefined';

export const api = axios.create({
  timeout: 3000,
  baseURL: 'https://backapi.onetimelink.ru',
});
