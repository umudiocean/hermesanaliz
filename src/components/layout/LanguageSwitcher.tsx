'use client';

import { useState } from 'react';
import { useParams, usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { Globe } from 'lucide-react';
import { locales, type Locale } from '@/i18n';

const languageNames: Record<Locale, string> = {
  en: 'English',
  tr: 'Türkçe',
  es: 'Español',
  zh: '中文',
  ru: 'Русский',
  ja: '日本語',
};

export function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const [isOpen, setIsOpen] = useState(false);

  const currentLocale = (params?.locale as Locale) || 'en';

  const handleLanguageChange = (locale: Locale) => {
    const newPath = pathname.replace(`/${currentLocale}`, `/${locale}`);
    router.push(newPath);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-background-card border border-primary/20 hover:border-primary/40 transition-all"
      >
        <Globe className="h-5 w-5 text-primary" />
        <span className="hidden sm:inline text-sm font-medium">
          {languageNames[currentLocale]}
        </span>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-48 py-2 bg-background-card border border-primary/20 rounded-lg shadow-2xl z-50">
            {locales.map((locale) => (
              <button
                key={locale}
                onClick={() => handleLanguageChange(locale)}
                className={`w-full px-4 py-2 text-left hover:bg-primary/10 transition-colors ${
                  locale === currentLocale ? 'text-primary font-semibold' : ''
                }`}
              >
                {languageNames[locale]}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

