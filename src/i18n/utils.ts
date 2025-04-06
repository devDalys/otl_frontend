'use server';

import {revalidatePath} from 'next/cache';
import {cookies, headers} from 'next/headers';

// In this example the locale is read from a cookie. You could alternatively
// also read it from a database, backend service, or any other source.
const LANGUAGE_COOKIE = 'X-Next-Locale';

export async function getUserLocale() {
  return (await headers()).get(LANGUAGE_COOKIE) || 'ru';
}

export async function setUserLocale(locale: 'ru' | 'en') {}
