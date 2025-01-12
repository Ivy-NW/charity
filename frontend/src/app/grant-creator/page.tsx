"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useCrowdfunding } from "@/blockchain/hooks/useCrowdfunding";
import { isAddress } from "ethers";
import { ArrowLeft } from "lucide-react";

export default function GrantCreator() {
  const router = useRouter();
  const { grantCampaignCreatorRole, isAdmin } = useCrowdfunding();
  const [address, setAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!isAddress(address)) {
      setError("Invalid Ethereum address");
      return;
    }

    try {
      setIsLoading(true);
      await grantCampaignCreatorRole(address as `0x${string}`);
      setAddress("");
      alert("Creator role granted successfully!");
    } catch (error) {
      console.error("Error granting creator role:", error);
      setError(
        "Failed to grant creator role. Make sure you have admin permissions."
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen text-gray-100">
        <div className="container mx-auto p-4 max-w-2xl">
          <div className="mb-6 flex justify-between items-center">
            <button
              onClick={() => router.push("/")}
              className="flex items-center gap-2 text-gray-400 hover:text-violet-400 
                       transition-colors duration-300"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Campaigns
            </button>
            <ConnectButton />
          </div>
          <div className="glass-card p-8 border border-red-500/20">
            <h1 className="font-space-grotesk text-3xl font-bold mb-4 text-gray-100">
              Access Denied
            </h1>
            <p className="text-red-400">
              You must be an admin to access this page.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <div className="container mx-auto p-4 max-w-2xl">
        <div className="mb-6 flex justify-between items-center">
          <button
            onClick={() => router.push("/")}
            className="flex items-center gap-2 text-gray-400 hover:text-violet-400 
                     transition-colors duration-300"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Campaigns
          </button>
          <ConnectButton />
        </div>

        <div className="glass-card p-8 relative overflow-hidden">
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 
                        to-transparent pointer-events-none" />
          
          <div className="relative z-10">
            <h1 className="font-space-grotesk text-3xl font-bold mb-8 gradient-text">
              Grant Campaign Creator Role
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Ethereum Address
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full bg-gray-900/90 border border-gray-700/50 
                           rounded-lg px-4 py-3 text-gray-100 focus:ring-2 
                           focus:ring-violet-500/70 focus:border-transparent 
                           transition-all duration-300 font-mono"
                  placeholder="0x..."
                  required
                />
              </div>

              {error && (
                <div className="text-red-400 text-sm bg-red-500/10 
                              border border-red-500/20 rounded-lg p-3">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-violet-600 to-violet-700 
                         text-white px-6 py-4 rounded-lg font-medium 
                         hover:from-violet-500 hover:to-violet-600
                         transition-all duration-300 shadow-lg 
                         hover:shadow-violet-500/20 disabled:opacity-50 
                         disabled:hover:shadow-none"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent 
                                  rounded-full animate-spin" />
                    <span>Processing...</span>
                  </div>
                ) : (
                  "Grant Creator Role"
                )}
              </button>
            </form>
          </div>
        </div>

        <div className="mt-6 text-center text-gray-400 text-sm">
          <p className="flex items-center justify-center gap-2">
            <span className="w-2 h-2 bg-violet-500 rounded-full"></span>
            Only admins can grant campaign creator roles
          </p>
        </div>
      </div>
    </div>
  );
}