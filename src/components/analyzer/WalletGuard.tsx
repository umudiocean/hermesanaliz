'use client';

import { useTranslations } from 'next-intl';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Wallet } from 'lucide-react';
import { motion } from 'framer-motion';

export function WalletGuard() {
  const t = useTranslations('wallet');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md mx-auto"
    >
      <div className="p-8 rounded-2xl bg-background-card border border-primary/20 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 border border-primary/20 mb-6">
          <Wallet className="h-8 w-8 text-primary" />
        </div>
        
        <h3 className="text-2xl font-bold mb-4">{t('connect')}</h3>
        
        <p className="text-gray-400 mb-8">
          Connect your wallet to start analyzing BSC tokens with AI-powered insights.
        </p>
        
        <div className="flex justify-center">
          <ConnectButton />
        </div>
      </div>
    </motion.div>
  );
}

