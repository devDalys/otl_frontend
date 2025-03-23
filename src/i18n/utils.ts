'use server';

import {cookies} from 'next/headers';

// In this example the locale is read from a cookie. You could alternatively
// also read it from a database, backend service, or any other source.
const LANGUAGE_COOKIE = 'NEXT_LOCALE';

export async function getUserLocale() {
  return (await cookies()).get(LANGUAGE_COOKIE)?.value || 'ru';
}

export async function setUserLocale(locale: 'ru' | 'en') {
  (await cookies()).set(LANGUAGE_COOKIE, locale);
}
