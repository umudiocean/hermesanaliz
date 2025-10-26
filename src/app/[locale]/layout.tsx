import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { locales } from '@/i18n';
import { Providers } from '@/components/providers/Providers';

export const dynamic = 'force-dynamic';
export const dynamicParams = true;

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!locales.includes(locale as any)) {
    notFound();
  }

  let messages;
  try {
    messages = (await import(`../../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <Providers locale={locale}>{children}</Providers>
    </NextIntlClientProvider>
  );
}

