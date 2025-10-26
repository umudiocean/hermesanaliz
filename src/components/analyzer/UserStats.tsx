'use client';

import { useAccount } from 'wagmi';
import { useTranslations } from 'next-intl';
import { useAnalyzerContract, useHermesContract } from '@/hooks/useHermesContract';
import { formatNumber, formatTimeRemaining } from '@/lib/utils';
import { AlertCircle, CheckCircle, Clock, Wallet } from 'lucide-react';
import { motion } from 'framer-motion';

export function UserStats() {
  const { address } = useAccount();
  const t = useTranslations();
  const { hermesBalance } = useHermesContract();
  const { userInfo, settings } = useAnalyzerContract();

  if (!address || !userInfo || !settings) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="p-6 rounded-xl bg-background-card border border-primary/20 animate-pulse">
            <div className="h-4 bg-primary/10 rounded w-24 mb-2" />
            <div className="h-8 bg-primary/10 rounded w-32" />
          </div>
        ))}
      </div>
    );
  }

  const hermesBalanceNum = parseFloat(hermesBalance);
  const minBalanceNum = parseFloat(settings.minBalance);
  const isEligible = hermesBalanceNum >= minBalanceNum;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* HERMES Balance */}
      <StatCard
        icon={<Wallet className="h-5 w-5" />}
        label={t('wallet.hermesBalance')}
        value={formatNumber(hermesBalance)}
        suffix="HERMES"
        status={isEligible ? 'success' : 'error'}
        delay={0}
      />

      {/* Eligibility */}
      <StatCard
        icon={
          isEligible ? (
            <CheckCircle className="h-5 w-5" />
          ) : (
            <AlertCircle className="h-5 w-5" />
          )
        }
        label="Status"
        value={isEligible ? 'Eligible' : 'Not Eligible'}
        status={isEligible ? 'success' : 'error'}
        delay={0.1}
      />

      {/* Free Analyses */}
      <StatCard
        icon={<CheckCircle className="h-5 w-5" />}
        label={t('analyzer.freeAnalyses')}
        value={`${userInfo.freeRemaining}/${settings.freeLimit}`}
        suffix="remaining"
        status={userInfo.freeRemaining > 0 ? 'success' : 'warning'}
        delay={0.2}
      />

      {/* Reset Time */}
      <StatCard
        icon={<Clock className="h-5 w-5" />}
        label="Resets In"
        value={formatTimeRemaining(userInfo.nextResetTime)}
        status="neutral"
        delay={0.3}
      />
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  suffix,
  status,
  delay,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  suffix?: string;
  status: 'success' | 'error' | 'warning' | 'neutral';
  delay: number;
}) {
  const statusColors = {
    success: 'text-success border-success/20 bg-success/5',
    error: 'text-danger border-danger/20 bg-danger/5',
    warning: 'text-warning border-warning/20 bg-warning/5',
    neutral: 'text-accent border-accent/20 bg-accent/5',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className={`p-6 rounded-xl border transition-all hover:scale-105 ${statusColors[status]}`}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-gray-400">{label}</span>
        <div className={statusColors[status]}>{icon}</div>
      </div>
      <div className="text-2xl font-bold">{value}</div>
      {suffix && <div className="text-xs text-gray-500 mt-1">{suffix}</div>}
    </motion.div>
  );
}

