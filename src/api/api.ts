import axios from 'axios';

const isClient = typeof window !== 'undefined';

export const api = axios.create({
  timeout: 3000,
  baseURL: isClient ? '/api' : process.env.BACKAPI_URL,
});
