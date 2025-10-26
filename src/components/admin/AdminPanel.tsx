'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useAccount } from 'wagmi';
import { useAnalyzerContract } from '@/hooks/useHermesContract';
import { formatNumber } from '@/lib/utils';
import { Lock, TrendingUp, Users, DollarSign, Activity, Settings, Pause, Play } from 'lucide-react';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

export function AdminPanel() {
  const t = useTranslations('admin');
  const { isConnected } = useAccount();
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    if (password === process.env.NEXT_PUBLIC_ADMIN_SECRET || password === 'Hermes2025@@') {
      setIsAuthenticated(true);
      toast.success('Authenticated successfully');
    } else {
      toast.error('Invalid password');
    }
  };

  if (!isConnected) {
    return (
      <div className="container mx-auto px-4 max-w-md">
        <div className="p-8 rounded-2xl bg-background-card border border-danger/20 text-center">
          <Lock className="h-12 w-12 text-danger mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">{t('unauthorized')}</h2>
          <p className="text-gray-400">Please connect your wallet to access the admin panel.</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-8 rounded-2xl bg-background-card border border-primary/20"
        >
          <div className="text-center mb-6">
            <Lock className="h-12 w-12 text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-bold">{t('login')}</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">{t('password')}</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                className="w-full px-4 py-3 rounded-lg bg-background-secondary border border-primary/20 focus:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/20"
                placeholder="Enter admin password"
              />
            </div>

            <button
              onClick={handleLogin}
              className="w-full px-6 py-3 rounded-lg gradient-primary font-semibold hover:opacity-90 transition-all"
            >
              {t('loginButton')}
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return <AdminDashboard />;
}

function AdminDashboard() {
  const t = useTranslations('admin');
  const { statistics, settings, setMinimumBalance, setAnalysisPrice, setDailyFreeLimit, setPauseStatus } = useAnalyzerContract();
  const [isLoading, setIsLoading] = useState(false);

  const [newMinBalance, setNewMinBalance] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newLimit, setNewLimit] = useState('');

  const handleUpdateMinBalance = async () => {
    if (!newMinBalance) return;
    setIsLoading(true);
    try {
      await setMinimumBalance(newMinBalance);
      toast.success(t('settings.updated'));
      setNewMinBalance('');
    } catch (error: any) {
      toast.error(error.message || 'Update failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdatePrice = async () => {
    if (!newPrice) return;
    setIsLoading(true);
    try {
      await setAnalysisPrice(newPrice);
      toast.success(t('settings.updated'));
      setNewPrice('');
    } catch (error: any) {
      toast.error(error.message || 'Update failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateLimit = async () => {
    if (!newLimit) return;
    setIsLoading(true);
    try {
      await setDailyFreeLimit(parseInt(newLimit));
      toast.success(t('settings.updated'));
      setNewLimit('');
    } catch (error: any) {
      toast.error(error.message || 'Update failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleTogglePause = async () => {
    if (!settings) return;
    setIsLoading(true);
    try {
      await setPauseStatus(!settings.paused);
      toast.success(settings.paused ? 'Contract unpaused' : 'Contract paused');
    } catch (error: any) {
      toast.error(error.message || 'Update failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 max-w-6xl space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-bold glow-text mb-2">{t('title')}</h1>
        <p className="text-gray-400">Manage your Hermes Analyzer platform</p>
      </motion.div>

      {/* Statistics */}
      <div>
        <h2 className="text-2xl font-bold mb-4">{t('stats.title')}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            icon={<Activity className="h-6 w-6" />}
            label={t('stats.totalAnalyses')}
            value={statistics?.totalAnalyses.toLocaleString() || '0'}
            color="primary"
          />
          <StatCard
            icon={<DollarSign className="h-6 w-6" />}
            label={t('stats.totalRevenue')}
            value={`${formatNumber(statistics?.totalRevenue || '0')} HERMES`}
            color="success"
          />
          <StatCard
            icon={<Users className="h-6 w-6" />}
            label={t('stats.activeUsers')}
            value="--"
            color="accent"
          />
          <StatCard
            icon={<TrendingUp className="h-6 w-6" />}
            label={t('stats.todayAnalyses')}
            value="--"
            color="secondary"
          />
        </div>
      </div>

      {/* Settings */}
      <div>
        <h2 className="text-2xl font-bold mb-4">{t('settings.title')}</h2>
        <div className="space-y-6">
          {/* Minimum Balance */}
          <SettingCard
            label={t('settings.minimumBalance')}
            currentValue={settings ? `${formatNumber(settings.minBalance)} HERMES` : '--'}
            placeholder="e.g., 1000000000"
            value={newMinBalance}
            onChange={setNewMinBalance}
            onUpdate={handleUpdateMinBalance}
            isLoading={isLoading}
          />

          {/* Analysis Price */}
          <SettingCard
            label={t('settings.analysisPrice')}
            currentValue={settings ? `${formatNumber(settings.price)} HERMES` : '--'}
            placeholder="e.g., 1000000"
            value={newPrice}
            onChange={setNewPrice}
            onUpdate={handleUpdatePrice}
            isLoading={isLoading}
          />

          {/* Daily Limit */}
          <SettingCard
            label={t('settings.dailyLimit')}
            currentValue={settings ? settings.freeLimit.toString() : '--'}
            placeholder="e.g., 2"
            value={newLimit}
            onChange={setNewLimit}
            onUpdate={handleUpdateLimit}
            isLoading={isLoading}
          />

          {/* Pause Status */}
          <div className="p-6 rounded-xl bg-background-card border border-primary/20">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold mb-1">Contract Status</h3>
                <p className="text-sm text-gray-400">
                  {settings?.paused ? t('settings.paused') : t('settings.active')}
                </p>
              </div>
              <button
                onClick={handleTogglePause}
                disabled={isLoading}
                className={`px-6 py-3 rounded-lg font-semibold hover:opacity-90 disabled:opacity-50 transition-all flex items-center gap-2 ${
                  settings?.paused ? 'bg-success' : 'bg-warning'
                }`}
              >
                {settings?.paused ? <Play className="h-5 w-5" /> : <Pause className="h-5 w-5" />}
                {settings?.paused ? t('settings.unpause') : t('settings.pause')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  color: string;
}) {
  const colorClasses: Record<string, string> = {
    primary: 'text-primary border-primary/20 bg-primary/5',
    success: 'text-success border-success/20 bg-success/5',
    accent: 'text-accent border-accent/20 bg-accent/5',
    secondary: 'text-secondary border-secondary/20 bg-secondary/5',
  };

  return (
    <div className={`p-6 rounded-xl border ${colorClasses[color]}`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-gray-400">{label}</span>
        <div className={colorClasses[color]}>{icon}</div>
      </div>
      <div className="text-2xl font-bold">{value}</div>
    </div>
  );
}

function SettingCard({
  label,
  currentValue,
  placeholder,
  value,
  onChange,
  onUpdate,
  isLoading,
}: {
  label: string;
  currentValue: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  onUpdate: () => void;
  isLoading: boolean;
}) {
  const t = useTranslations('admin.settings');

  return (
    <div className="p-6 rounded-xl bg-background-card border border-primary/20">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex-1">
          <h3 className="font-semibold mb-1">{label}</h3>
          <p className="text-sm text-gray-400">Current: {currentValue}</p>
        </div>
        <div className="flex gap-2 flex-1 max-w-md">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="flex-1 px-4 py-2 rounded-lg bg-background-secondary border border-primary/20 focus:border-primary/40 focus:outline-none"
            disabled={isLoading}
          />
          <button
            onClick={onUpdate}
            disabled={isLoading || !value}
            className="px-6 py-2 rounded-lg gradient-primary font-semibold hover:opacity-90 disabled:opacity-50 transition-all whitespace-nowrap"
          >
            {isLoading ? t('updating') : t('update')}
          </button>
        </div>
      </div>
    </div>
  );
}

