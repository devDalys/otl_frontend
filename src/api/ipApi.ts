import axios from 'axios';
import {headers} from 'next/headers';

export const ipApi = (ip: string) =>
  axios.create({
    timeout: 3000,
    baseURL: process.env['SERVER_SIDE_URL'],
    headers: {
      'x-real-ip': ip,
    },
  });
