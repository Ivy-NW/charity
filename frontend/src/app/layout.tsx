import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import { headers } from "next/headers";
import { cookieToInitialState } from "wagmi";
import { config } from "../config";
import { Space_Grotesk, Inter, JetBrains_Mono } from 'next/font/google';


// Font configurations
const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  variable: '--font-space-grotesk',
});

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
});

export const metadata: Metadata = {
  title: "Kara | Web3 Charity Platform",
  description: "Empowering change through transparent, blockchain-based charitable giving",
  keywords: "charity, web3, blockchain, ethereum, donation, transparency",
  authors: [{ name: "Kara Team" }],
  themeColor: "#1F2937", // Dark theme color
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  icons: {
    icon: "/favicon.ico",
    // Add other icon sizes if available
    // apple: "/apple-icon.png",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialState = cookieToInitialState(
    config,
    (await headers()).get("cookie")
  );

  return (
    <html lang="en" className={`
      ${spaceGrotesk.variable} 
      ${inter.variable} 
      ${jetbrainsMono.variable}
    `}>
      <body className={`
        bg-gray-900 text-gray-100
        flex flex-col min-h-screen
        mx-auto max-w-[98%] sm:max-w-[94%] lg:max-w-[90%]
        font-inter antialiased
        selection:bg-violet-500/30 selection:text-violet-200
        transition-colors duration-300
      `}>
        {/* Optional: Background gradient effect */}
        <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-gray-900 to-violet-900/20 -z-10" />
        
        {/* Optional: Radial gradient for subtle lighting */}
        <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] 
                      from-violet-500/10 via-transparent to-transparent -z-10" />
        
        <Providers initialState={initialState}>
          {/* Main content wrapper */}
          <div className="relative z-0 flex-grow">
            {children}
          </div>
          
          {/* Optional: Add a subtle grain texture */}
          <div className="fixed inset-0 opacity-20 -z-10">
            <div className="absolute inset-0 backdrop-filter backdrop-grayscale" 
                 style={{ backgroundImage: "url('/noise.png')" }} />
          </div>
        </Providers>
      </body>
    </html>
  );
}