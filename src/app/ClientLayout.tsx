// src/app/ClientLayout.tsx (Client Component)
'use client';
import { OnchainKitProvider } from '@coinbase/onchainkit';
import { defineChain } from 'viem';

// Define Base mainnet chain
const baseChain = defineChain({
  id: 8453,
  name: 'Base Mainnet',
  network: 'base',
  nativeCurrency: {
    decimals: 18,
    name: 'Ether',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: { http: ['https://mainnet.base.org'] },
    public: { http: ['https://mainnet.base.org'] },
  },
  blockExplorers: {
    default: { name: 'Basescan', url: 'https://basescan.org' },
  },
});

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <OnchainKitProvider apiKey={process.env.ONCHAINKIT_API_KEY} chain={baseChain}>
      {children}
    </OnchainKitProvider>
  );
}
