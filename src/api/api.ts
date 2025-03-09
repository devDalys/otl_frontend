import axios from 'axios';

const isClient = typeof window !== 'undefined';

const getClientUrl = () => {
  if (window.Cypress) {
    return 'https://onetimelink.ru/api';
  }
  return '/api';
};

export const api = axios.create({
  timeout: 3000,
  baseURL: isClient ? getClientUrl() : process.env['SERVER_SIDE_URL'],
});
