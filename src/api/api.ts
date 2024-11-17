import axios from 'axios';
import {headers} from 'next/headers';

const isClient = typeof window !== 'undefined';

export const api = axios.create({
  timeout: 3000,
  baseURL: isClient ? '/api' : process.env.BACKAPI_URL,
  headers: !isClient ? {'x-real-ip': headers().get('x-real-ip')} : {},
});
