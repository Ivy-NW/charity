"use client";

import { useAccount, useEnsName, useEnsAvatar } from "wagmi";
import { useState, useEffect } from "react";
import Image from "next/image";
import { sepolia } from "wagmi/chains";
import { ExternalLink, Copy, CheckCircle2 } from "lucide-react";

export function Profile() {
  const { address, isConnected } = useAccount();
  const { data: ensNameData, isLoading: ensLoading } = useEnsName({
    address,
    chainId: sepolia.id,
  });
  const ensName = ensNameData ?? undefined;
  const { data: ensAvatar } = useEnsAvatar({
    name: ensName,
    chainId: sepolia.id,
  });

  const [mounted, setMounted] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const copyAddress = async () => {
    if (address) {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!mounted) return null;
  if (!isConnected || !address) return null;

  return (
    <div className="flex flex-col space-y-6 p-6 rounded-2xl 
                    bg-gray-900/90 backdrop-blur-md border border-gray-800 
                    shadow-xl animate-fade-in">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-4">
          {ensLoading ? (
            <ProfileSkeleton />
          ) : (
            <>
              <div className="relative group">
                <ENSAvatar ensAvatar={ensAvatar} ensName={ensName || address} size={48} />
                <div className="absolute inset-0 rounded-full 
                              bg-violet-500/10 opacity-0 group-hover:opacity-100 
                              transition-opacity duration-300" />
              </div>
              
              <div className="flex flex-col">
                {ensName ? (
                  <>
                    <span className="text-lg font-space-grotesk font-bold 
                                   text-gray-100">
                      {ensName}
                    </span>
                    <button
                      onClick={copyAddress}
                      className="flex items-center space-x-2 text-sm 
                               text-gray-400 hover:text-violet-400 
                               transition-colors duration-200"
                    >
                      <span>{address.slice(0, 6)}...{address.slice(-4)}</span>
                      {copied ? (
                        <CheckCircle2 className="w-4 h-4 text-green-400" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </>
                ) : (
                  <button
                    onClick={copyAddress}
                    className="flex items-center space-x-2 text-lg 
                             font-space-grotesk font-bold text-gray-100 
                             hover:text-violet-400 transition-colors duration-200"
                  >
                    <span>{address.slice(0, 6)}...{address.slice(-4)}</span>
                    {copied ? (
                      <CheckCircle2 className="w-4 h-4 text-green-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {/* ENS Information Card */}
      <div className="p-4 rounded-xl bg-gray-800/50 border border-gray-700">
        <h3 className="text-sm font-medium text-gray-300 mb-3">
          Get your ENS name on Sepolia
        </h3>
        <ol className="space-y-2">
          {[
            "Visit the Sepolia ENS app",
            "Connect your wallet",
            "Register a .eth name",
          ].map((step, index) => (
            <li key={index} className="flex items-center space-x-2 
                                     text-sm text-gray-400">
              <span className="flex items-center justify-center w-5 h-5 
                             rounded-full bg-violet-500/20 text-violet-400 
                             text-xs font-medium">
                {index + 1}
              </span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
        <a
          href="https://app.ens.domains"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2 mt-4 text-sm 
                     text-violet-400 hover:text-violet-300 
                     transition-colors duration-200"
        >
          <span>Visit ENS App</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}

function ProfileSkeleton() {
  return (
    <div className="animate-pulse flex items-center space-x-4">
      <div className="w-12 h-12 rounded-full bg-gray-800" />
      <div className="flex flex-col space-y-2">
        <div className="h-5 w-32 bg-gray-800 rounded" />
        <div className="h-4 w-24 bg-gray-800 rounded" />
      </div>
    </div>
  );
}

interface ENSAvatarProps {
  ensAvatar: string | null | undefined;
  ensName: string;
  size?: number;
}

export function ENSAvatar({ ensAvatar, ensName, size = 48 }: ENSAvatarProps) {
  const [error, setError] = useState(false);

  if (!ensAvatar || error) {
    return (
      <div
        className="bg-gradient-to-r from-violet-500 to-teal-500 
                   flex items-center justify-center text-white font-bold 
                   shadow-lg"
        style={{ width: size, height: size, borderRadius: "50%" }}
      >
        {ensName.slice(0, 2).toUpperCase()}
      </div>
    );
  }

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <Image
        src={ensAvatar}
        alt={ensName}
        width={size}
        height={size}
        className="rounded-full object-cover ring-2 ring-violet-500/20"
        onError={() => setError(true)}
      />
    </div>
  );
}