'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useAccount } from 'wagmi';
import { TokenInput } from '@/components/analyzer/TokenInput';
import { UserStats } from '@/components/analyzer/UserStats';
import { TokenScore as TokenScoreDisplay } from '@/components/analyzer/TokenScore';
import { WalletGuard } from '@/components/analyzer/WalletGuard';
import type { TokenScore } from '@/types';

export function AnalyzerSection() {
  const { isConnected } = useAccount();
  const t = useTranslations('analyzer');
  const [tokenScore, setTokenScore] = useState<TokenScore | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 glow-text">{t('title')}</h2>
        </div>

        {!isConnected ? (
          <WalletGuard />
        ) : (
          <div className="space-y-8">
            <UserStats />
            
            <div className="grid grid-cols-1 gap-8">
              <TokenInput
                onAnalysisComplete={setTokenScore}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
              />
              
              {tokenScore && <TokenScoreDisplay score={tokenScore} />}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

