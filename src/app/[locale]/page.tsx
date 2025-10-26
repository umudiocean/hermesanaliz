import { setRequestLocale } from 'next-intl/server';
import { HeroSection } from '@/components/sections/HeroSection';
import { AnalyzerSection } from '@/components/sections/AnalyzerSection';

type Props = {
  params: { locale: string };
};

export default function HomePage({ params: { locale } }: Props) {
  // Enable static rendering
  setRequestLocale(locale);
  
  return (
    <main className="min-h-screen">
      <HeroSection />
      <AnalyzerSection />
    </main>
  );
}

