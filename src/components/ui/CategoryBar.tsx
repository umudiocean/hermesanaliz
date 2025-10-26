'use client';

import { motion } from 'framer-motion';

interface CategoryBarProps {
  label: string;
  value: number;
  max: number;
  icon: React.ReactNode;
  delay?: number;
}

export function CategoryBar({ label, value, max, icon, delay = 0 }: CategoryBarProps) {
  const percentage = (value / max) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="space-y-2"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="text-primary">{icon}</div>
          <span className="font-medium">{label}</span>
        </div>
        <span className="font-bold text-primary">
          {value}/{max}
        </span>
      </div>
      <div className="h-3 bg-background-secondary rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ delay: delay + 0.2, duration: 1, ease: 'easeOut' }}
          className="h-full gradient-primary"
        />
      </div>
    </motion.div>
  );
}

