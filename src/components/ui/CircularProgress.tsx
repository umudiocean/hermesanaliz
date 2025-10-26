'use client';

import { motion } from 'framer-motion';
import { getRiskLevel } from '@/lib/utils';

interface CircularProgressProps {
  value: number;
  size?: number;
}

export function CircularProgress({ value, size = 120 }: CircularProgressProps) {
  const circumference = 2 * Math.PI * 45;
  const offset = circumference - (value / 100) * circumference;
  const riskLevel = getRiskLevel(value);

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={45}
          stroke="currentColor"
          strokeWidth="10"
          fill="none"
          className="text-gray-800"
        />
        {/* Progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={45}
          stroke="currentColor"
          strokeWidth="10"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={circumference}
          strokeLinecap="round"
          className={riskLevel.color.replace('text-', 'text-')}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-4xl font-bold"
        >
          {value}
        </motion.span>
        <span className="text-sm text-gray-400">/ 100</span>
      </div>
    </div>
  );
}

