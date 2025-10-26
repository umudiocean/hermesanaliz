import { HeroSection } from '@/components/sections/HeroSection';
import { AnalyzerSection } from '@/components/sections/AnalyzerSection';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <AnalyzerSection />
    </main>
  );
}

