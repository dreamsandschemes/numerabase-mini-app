import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { OnchainKitProvider } from '@coinbase/onchainkit';
import { base } from 'viem/chains';  // Import base chain from viem

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
        <OnchainKitProvider apiKey={process.env.ONCHAINKIT_API_KEY} chain={base}>
          {children}
        </OnchainKitProvider>
      </body>
    </html>
  );
}