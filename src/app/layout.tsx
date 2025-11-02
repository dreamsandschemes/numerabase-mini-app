import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { OnchainKitProvider } from '@coinbase/onchainkit';
import { defineChain } from 'viem'; // Import defineChain from viem

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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

export const metadata: Metadata = {
  title: "NumeraBase",
  description: "Discover your Life Path destiny on Base. Mint your unique NFT! 🔮 Web3 awaits!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <OnchainKitProvider apiKey={process.env.ONCHAINKIT_API_KEY} chain={baseChain}>
          {children}
        </OnchainKitProvider>
      </body>
    </html>
  );
}