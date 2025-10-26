import createMiddleware from 'next-intl/middleware';
import { locales } from './src/i18n';

export default createMiddleware({
  locales,
  defaultLocale: 'en',
  localePrefix: 'as-needed',
});

export const config = {
  matcher: ['/', '/(tr|es|zh|ru|ja)/:path*', '/((?!api|_next|_vercel|.*\\..*).*)'],
};

