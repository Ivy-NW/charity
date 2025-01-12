"use client";

import React, { ReactNode } from "react";
import "@rainbow-me/rainbowkit/styles.css";
import { 
  RainbowKitProvider,
  darkTheme,
  Theme,
  DisclaimerComponent
} from "@rainbow-me/rainbowkit";
import { State, WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { config } from "@/blockchain/config/wagmi";

// Create the custom theme
const customTheme = darkTheme({
  accentColor: '#8B5CF6', // Violet-500
  accentColorForeground: 'white',
  borderRadius: 'large',
  fontStack: 'system',
  overlayBlur: 'small',
}) as Theme;

// Custom disclaimer component
const Disclaimer: DisclaimerComponent = ({ Text, Link }) => (
  <Text>
    By connecting your wallet, you agree to the{' '}
    <Link href="https://your-terms-url.com">Terms of Service</Link> and
    acknowledge you have read and understand the protocol{' '}
    <Link href="https://your-disclaimer-url.com">Disclaimer</Link>
  </Text>
);

// Configure the query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 30000,
    },
  },
});

interface ProvidersProps {
  children: ReactNode;
  initialState?: State;
}

export const Providers: React.FC<ProvidersProps> = ({
  children,
  initialState,
}: ProvidersProps) => {
  return (
    <WagmiProvider config={config} initialState={initialState}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          theme={customTheme}
          showRecentTransactions={true}
          appInfo={{
            appName: 'Kara',
            disclaimer: Disclaimer,
            learnMoreUrl: 'https://your-docs-url.com',
          }}
          coolMode
          modalSize="wide"
        >
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};