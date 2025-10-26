'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { getRiskLevel, formatNumber } from '@/lib/utils';
import { CircularProgress } from '@/components/ui/CircularProgress';
import { CategoryBar } from '@/components/ui/CategoryBar';
import type { TokenScore as TokenScoreType } from '@/types';
import { TrendingUp, Users, Shield, Activity, DollarSign, Repeat } from 'lucide-react';

interface TokenScoreProps {
  score: TokenScoreType;
}

export function TokenScore({ score }: TokenScoreProps) {
  const t = useTranslations('score');
  const riskLevel = getRiskLevel(score.overallScore);

  const categories = [
    { key: 'liquidity', icon: <DollarSign className="h-5 w-5" />, max: 25 },
    { key: 'holders', icon: <Users className="h-5 w-5" />, max: 20 },
    { key: 'security', icon: <Shield className="h-5 w-5" />, max: 20 },
    { key: 'activity', icon: <Activity className="h-5 w-5" />, max: 15 },
    { key: 'performance', icon: <TrendingUp className="h-5 w-5" />, max: 10 },
    { key: 'dex', icon: <Repeat className="h-5 w-5" />, max: 10 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="p-8 rounded-2xl bg-background-card border border-primary/20 glow-border">
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Overall Score */}
          <div className="flex-shrink-0">
            <CircularProgress value={score.overallScore} size={180} />
          </div>

          {/* Token Info */}
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-3xl font-bold mb-2">
              {score.name} ({score.symbol})
            </h3>
            <p className="text-gray-400 text-sm mb-4 font-mono break-all">
              {score.address}
            </p>

            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${riskLevel.bgColor}`}>
              <span className={`text-lg font-semibold ${riskLevel.color}`}>
                {t(`riskLevel`)}: {t(riskLevel.label.toLowerCase())}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="p-8 rounded-2xl bg-background-card border border-primary/20">
        <h4 className="text-2xl font-bold mb-6">{t('breakdown')}</h4>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {categories.map((cat, index) => (
            <CategoryBar
              key={cat.key}
              label={t(`categories.${cat.key}`)}
              value={score.categories[cat.key as keyof typeof score.categories]}
              max={cat.max}
              icon={cat.icon}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>

      {/* Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <DetailCard
          label={t('totalLiquidity')}
          value={`$${formatNumber(score.details.totalLiquidity)}`}
          delay={0}
        />
        <DetailCard
          label={t('tradingVolume')}
          value={`$${formatNumber(score.details.volume24h)}`}
          delay={0.1}
        />
        <DetailCard
          label={t('holderCount')}
          value={formatNumber(score.details.holderCount, 0)}
          delay={0.2}
        />
        <DetailCard
          label={t('topHolders')}
          value={`${score.details.topHoldersPercentage.toFixed(1)}%`}
          delay={0.3}
        />
      </div>
    </motion.div>
  );
}

function DetailCard({
  label,
  value,
  delay,
}: {
  label: string;
  value: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.5 }}
      className="p-6 rounded-xl bg-background-card border border-primary/20 hover:border-primary/40 transition-all"
    >
      <p className="text-sm text-gray-400 mb-2">{label}</p>
      <p className="text-2xl font-bold">{value}</p>
    </motion.div>
  );
}

