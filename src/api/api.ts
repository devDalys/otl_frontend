import axios from 'axios';

export const api = axios.create({
  timeout: 3000,
  // baseURL: process.env['NEXT_PUBLIC_BACKAPI_URL'],
});
