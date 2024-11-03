import {NextRequest, NextResponse} from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();

  const backapi = new URL(process.env.BACKAPI_URL as string);

  if (url.pathname.startsWith('/api/health')) {
    return NextResponse.next();
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('host', backapi.hostname);

  url.protocol = backapi.protocol;
  url.hostname = backapi.hostname;
  url.port = '';
  url.pathname = url.pathname.replace('/api', '');

  return NextResponse.rewrite(url, {
    headers: requestHeaders,
  });
}

export const config = {
  matcher: ['/api/:path*'],
};
