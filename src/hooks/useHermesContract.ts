'use client';

import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { CONTRACTS } from '@/config/contracts';
import { HERMES_TOKEN_ABI, HERMES_ANALYZER_ABI } from '@/config/abis';
import { parseUnits, formatUnits } from 'viem';

export function useHermesContract() {
  const { address } = useAccount();
  const { writeContractAsync } = useWriteContract();

  // Read Hermes balance
  const { data: hermesBalance, refetch: refetchBalance } = useReadContract({
    address: CONTRACTS.HERMES_TOKEN,
    abi: HERMES_TOKEN_ABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
    },
  });

  // Read allowance
  const { data: allowance, refetch: refetchAllowance } = useReadContract({
    address: CONTRACTS.HERMES_TOKEN,
    abi: HERMES_TOKEN_ABI,
    functionName: 'allowance',
    args: address ? [address, CONTRACTS.ANALYZER] : undefined,
    query: {
      enabled: !!address,
    },
  });

  // Approve tokens
  const approveTokens = async (amount: bigint) => {
    if (!address) throw new Error('Wallet not connected');
    
    return await writeContractAsync({
      address: CONTRACTS.HERMES_TOKEN,
      abi: HERMES_TOKEN_ABI,
      functionName: 'approve',
      args: [CONTRACTS.ANALYZER, amount],
    });
  };

  return {
    hermesBalance: hermesBalance ? formatUnits(hermesBalance as bigint, 18) : '0',
    allowance: allowance ? (allowance as bigint) : BigInt(0),
    approveTokens,
    refetchBalance,
    refetchAllowance,
  };
}

export function useAnalyzerContract() {
  const { address } = useAccount();
  const { writeContractAsync } = useWriteContract();

  // Get user info
  const { data: userInfo, refetch: refetchUserInfo } = useReadContract({
    address: CONTRACTS.ANALYZER,
    abi: HERMES_ANALYZER_ABI,
    functionName: 'getUserInfo',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
      refetchInterval: 10000, // Refetch every 10 seconds
    },
  });

  // Get contract settings
  const { data: settings } = useReadContract({
    address: CONTRACTS.ANALYZER,
    abi: HERMES_ANALYZER_ABI,
    functionName: 'getSettings',
  });

  // Get statistics
  const { data: statistics } = useReadContract({
    address: CONTRACTS.ANALYZER,
    abi: HERMES_ANALYZER_ABI,
    functionName: 'getStatistics',
  });

  // Request analysis
  const requestAnalysis = async () => {
    if (!address) throw new Error('Wallet not connected');
    
    return await writeContractAsync({
      address: CONTRACTS.ANALYZER,
      abi: HERMES_ANALYZER_ABI,
      functionName: 'requestAnalysis',
    });
  };

  // Admin functions
  const setMinimumBalance = async (amount: string) => {
    const amountWei = parseUnits(amount, 18);
    return await writeContractAsync({
      address: CONTRACTS.ANALYZER,
      abi: HERMES_ANALYZER_ABI,
      functionName: 'setMinimumBalance',
      args: [amountWei],
    });
  };

  const setAnalysisPrice = async (amount: string) => {
    const amountWei = parseUnits(amount, 18);
    return await writeContractAsync({
      address: CONTRACTS.ANALYZER,
      abi: HERMES_ANALYZER_ABI,
      functionName: 'setAnalysisPrice',
      args: [amountWei],
    });
  };

  const setDailyFreeLimit = async (limit: number) => {
    return await writeContractAsync({
      address: CONTRACTS.ANALYZER,
      abi: HERMES_ANALYZER_ABI,
      functionName: 'setDailyFreeLimit',
      args: [BigInt(limit)],
    });
  };

  const setPauseStatus = async (paused: boolean) => {
    return await writeContractAsync({
      address: CONTRACTS.ANALYZER,
      abi: HERMES_ANALYZER_ABI,
      functionName: 'setPauseStatus',
      args: [paused],
    });
  };

  return {
    userInfo: userInfo ? {
      eligible: userInfo[0] as boolean,
      hermesBalance: formatUnits(userInfo[1] as bigint, 18),
      freeRemaining: Number(userInfo[2]),
      totalAnalyses: Number(userInfo[3]),
      nextResetTime: Number(userInfo[4]),
    } : null,
    settings: settings ? {
      minBalance: formatUnits(settings[0] as bigint, 18),
      price: formatUnits(settings[1] as bigint, 18),
      freeLimit: Number(settings[2]),
      wallet: settings[3] as string,
      paused: settings[4] as boolean,
    } : null,
    statistics: statistics ? {
      totalAnalyses: Number(statistics[0]),
      totalRevenue: formatUnits(statistics[1] as bigint, 18),
    } : null,
    requestAnalysis,
    refetchUserInfo,
    // Admin functions
    setMinimumBalance,
    setAnalysisPrice,
    setDailyFreeLimit,
    setPauseStatus,
  };
}

