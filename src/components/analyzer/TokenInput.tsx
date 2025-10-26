'use client';

import { useState } from 'react';
import { useAccount } from 'wagmi';
import { useTranslations } from 'next-intl';
import { useAnalyzerContract, useHermesContract } from '@/hooks/useHermesContract';
import { isValidAddress, formatNumber } from '@/lib/utils';
import { Search, Loader2, AlertCircle } from 'lucide-react';
import { parseUnits } from 'viem';
import toast from 'react-hot-toast';
import type { TokenScore } from '@/types';

interface TokenInputProps {
  onAnalysisComplete: (score: TokenScore | null) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

export function TokenInput({ onAnalysisComplete, isLoading, setIsLoading }: TokenInputProps) {
  const { address } = useAccount();
  const t = useTranslations();
  const [tokenAddress, setTokenAddress] = useState('');
  const [error, setError] = useState('');

  const { approveTokens, allowance, refetchAllowance } = useHermesContract();
  const { userInfo, settings, requestAnalysis, refetchUserInfo } = useAnalyzerContract();

  const needsPayment = userInfo ? userInfo.freeRemaining === 0 : false;
  const analysisPrice = settings?.price || '0';
  const analysisPriceWei = parseUnits(analysisPrice, 18);
  const hasAllowance = allowance >= analysisPriceWei;

  const handleAnalyze = async () => {
    setError('');

    if (!tokenAddress) {
      setError(t('analyzer.enterAddress'));
      return;
    }

    if (!isValidAddress(tokenAddress)) {
      setError(t('analyzer.invalidAddress'));
      return;
    }

    if (!address || !userInfo) {
      toast.error(t('toast.error'));
      return;
    }

    try {
      setIsLoading(true);

      // If needs payment and no allowance, approve first
      if (needsPayment && !hasAllowance) {
        toast.loading(t('analyzer.approving'));
        const approveTx = await approveTokens(analysisPriceWei);
        await approveTx;
        await refetchAllowance();
        toast.dismiss();
        toast.success(t('toast.approvalSuccess'));
      }

      // Request analysis from contract
      toast.loading(t('analyzer.analyzing'));
      const tx = await requestAnalysis();
      await tx;
      toast.dismiss();

      // Refetch user info
      await refetchUserInfo();

      // Call backend API to get analysis
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tokenAddress, userAddress: address }),
      });

      if (!response.ok) {
        throw new Error('Analysis failed');
      }

      const data = await response.json();
      onAnalysisComplete(data.score);
      toast.success(t('toast.analysisComplete'));
    } catch (err: any) {
      console.error('Analysis error:', err);
      toast.error(err.message || t('toast.analysisFailed'));
      onAnalysisComplete(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8 rounded-2xl bg-background-card border border-primary/20 glow-border">
      <label className="block text-sm font-medium mb-3">
        {t('analyzer.inputLabel')}
      </label>

      <div className="flex gap-3">
        <div className="flex-1">
          <input
            type="text"
            value={tokenAddress}
            onChange={(e) => setTokenAddress(e.target.value)}
            placeholder={t('analyzer.inputPlaceholder')}
            className="w-full px-4 py-3 rounded-lg bg-background-secondary border border-primary/20 focus:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            disabled={isLoading}
          />
          {error && (
            <div className="flex items-center gap-2 mt-2 text-sm text-danger">
              <AlertCircle className="h-4 w-4" />
              <span>{error}</span>
            </div>
          )}
        </div>

        <button
          onClick={handleAnalyze}
          disabled={isLoading || !userInfo?.eligible}
          className="px-8 py-3 rounded-lg gradient-primary font-semibold hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2 whitespace-nowrap"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              <span className="hidden sm:inline">{t('analyzer.analyzing')}</span>
            </>
          ) : (
            <>
              <Search className="h-5 w-5" />
              <span className="hidden sm:inline">{t('analyzer.analyze')}</span>
            </>
          )}
        </button>
      </div>

      {needsPayment && (
        <div className="mt-4 p-4 rounded-lg bg-warning/10 border border-warning/20">
          <p className="text-sm text-warning font-medium">
            {t('analyzer.paymentRequired')}: {formatNumber(analysisPrice)} HERMES
          </p>
          {!hasAllowance && (
            <p className="text-xs text-gray-400 mt-1">
              You'll need to approve the token spending first.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

