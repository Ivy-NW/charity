"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useAccount } from "wagmi";
import { formatEther, parseEther } from "ethers";
import { useCrowdfunding, useGetCampaign } from "@/blockchain/hooks/useCrowdfunding";
import { Campaign } from "@/types/crowdfunding";
import Navbar from "@/components/navbar";
import { ArrowLeft, Target, Calendar, Wallet, AlertTriangle } from "lucide-react";

export default function CampaignPage() {
  const params = useParams();
  const router = useRouter();
  const { address } = useAccount();
  const campaignId = BigInt(params.id as string);

  const { data } = useGetCampaign(campaignId);
  const campaign = data as Campaign;
  const { isAdmin, donateToCampaign, withdrawFunds, deleteCampaign } = useCrowdfunding();

  const [donationAmount, setDonationAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  if (!campaign) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const isOwner = address === campaign.owner;
  const canManage = Boolean(isOwner || isAdmin);
  const canWithdraw = Boolean(isOwner && campaign.isCompleted && !campaign.fundsWithdrawn);

  const handleDonate = async () => {
    try {
      setIsLoading(true);
      await donateToCampaign(campaignId, parseEther(donationAmount));
      setDonationAmount("");
    } catch (error) {
      console.error("Error donating:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleWithdraw = async () => {
    try {
      setIsLoading(true);
      await withdrawFunds(campaignId);
    } catch (error) {
      console.error("Error withdrawing:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this campaign?")) {
      try {
        setIsLoading(true);
        await deleteCampaign(campaignId);
        router.push("/");
      } catch (error) {
        console.error("Error deleting:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
            <Navbar />

      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="glass-card p-8 relative overflow-hidden">
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 
                        to-transparent pointer-events-none" />
          
          <div className="relative z-10">
            <h1 className="font-space-grotesk text-3xl font-bold mb-6 gradient-text">
              {campaign.title}
            </h1>
            <p className="text-gray-300 mb-8">{campaign.description}</p>

            {/* Campaign Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/50">
                <div className="flex items-center gap-2 text-gray-400 mb-2">
                  <Target className="w-4 h-4" />
                  <span>Target Amount</span>
                </div>
                <p className="text-xl font-bold text-gray-100">
                  {formatEther(campaign.targetAmount)} ETH
                </p>
              </div>

              <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/50">
                <div className="flex items-center gap-2 text-gray-400 mb-2">
                  <Wallet className="w-4 h-4" />
                  <span>Raised Amount</span>
                </div>
                <p className="text-xl font-bold text-gray-100">
                  {formatEther(campaign.raisedAmount)} ETH
                </p>
              </div>

              <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/50">
                <div className="flex items-center gap-2 text-gray-400 mb-2">
                  <Calendar className="w-4 h-4" />
                  <span>Deadline</span>
                </div>
                <p className="text-xl font-bold text-gray-100">
                  {new Date(Number(campaign.deadline) * 1000).toLocaleDateString()}
                </p>
              </div>

              <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/50">
                <div className="flex items-center gap-2 text-gray-400 mb-2">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Status</span>
                </div>
                <p className={`text-xl font-bold ${
                  campaign.isCompleted ? "text-green-400" : "text-blue-400"
                }`}>
                  {campaign.isCompleted ? "Completed" : "Active"}
                </p>
              </div>
            </div>

            {/* Donation Form */}
            {!campaign.isCompleted && (
              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Donation Amount (ETH)
                </label>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="number"
                    value={donationAmount}
                    onChange={(e) => setDonationAmount(e.target.value)}
                    className="flex-1 bg-gray-900/90 border border-gray-700/50 
                             rounded-lg px-4 py-3 text-gray-100 focus:ring-2 
                             focus:ring-violet-500/70 focus:border-transparent 
                             transition-all duration-300 font-mono"
                    placeholder="0.0"
                  />
                  <button
                    onClick={handleDonate}
                    disabled={isLoading || !donationAmount}
                    className="bg-gradient-to-r from-violet-600 to-violet-700 
                             text-white px-6 py-3 rounded-lg font-medium 
                             hover:from-violet-500 hover:to-violet-600
                             transition-all duration-300 shadow-lg 
                             hover:shadow-violet-500/20 disabled:opacity 
                             disabled:hover:shadow-none"
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent 
                                      rounded-full animate-spin" />
                        <span>Processing...</span>
                      </div>
                    ) : (
                      "Donate"
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-3">
              {canWithdraw && (
                <button
                  onClick={handleWithdraw}
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-green-600 to-green-700 
                           text-white px-6 py-4 rounded-lg font-medium 
                           hover:from-green-500 hover:to-green-600
                           transition-all duration-300 shadow-lg 
                           hover:shadow-green-500/20 disabled:opacity-50"
                >
                  {isLoading ? "Processing..." : "Withdraw Funds"}
                </button>
              )}

              {canManage && (
                <button
                  onClick={handleDelete}
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-red-600 to-red-700 
                           text-white px-6 py-4 rounded-lg font-medium 
                           hover:from-red-500 hover:to-red-600
                           transition-all duration-300 shadow-lg 
                           hover:shadow-red-500/20 disabled:opacity-50"
                >
                  {isLoading ? "Processing..." : "Delete Campaign"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}