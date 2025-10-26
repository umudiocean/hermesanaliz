import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['en', 'tr', 'es', 'zh', 'ru', 'ja'],
  defaultLocale: 'en',
  localePrefix: 'always'
});

export const config = {
  // Match all pathnames except for
  // - /api routes
  // - /_next (Next.js internals)
  // - /_vercel (Vercel internals)
  // - Static files (e.g. /favicon.ico, /logo.svg)
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};

