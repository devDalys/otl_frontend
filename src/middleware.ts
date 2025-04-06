import {NextRequest, NextResponse} from 'next/server';

const LANGUAGE_COOKIE = 'X-Next-Locale';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  //Серверный прокси до бекенда
  if (url.pathname.startsWith('/api')) {
    const clientIp =
      request.headers.get('x-real-ip') || request.ip || '127.0.0.1';

    const backapi = new URL(process.env.BACKAPI_URL as string);

    if (url.pathname.startsWith('/api/health')) {
      return NextResponse.next();
    }

    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('host', backapi.hostname);
    requestHeaders.set('x-real-ip', clientIp);

    url.protocol = backapi.protocol;
    url.hostname = backapi.hostname;
    url.port = '';
    url.pathname = url.pathname.replace('/api', '');

    return NextResponse.rewrite(url, {
      headers: requestHeaders,
    });
  }

  if (url.pathname.startsWith('/en')) {
    const response = NextResponse.next();
    response.headers.set(LANGUAGE_COOKIE, 'en');
    return response;
  } else {
    const response = NextResponse.next();
    response.headers.set(LANGUAGE_COOKIE, 'ru');
    return response;
  }
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
