"use client";

import { useCrowdfunding } from "@/blockchain/hooks/useCrowdfunding";
import { CampaignCard } from "./CampaignCard";
import Link from "next/link";
import { useEffect, useState } from "react";
import { QueryObserverResult } from "@tanstack/react-query";
import { ReadContractErrorType } from "viem";
import { Loader2, AlertCircle, Search } from "lucide-react";

export function CampaignGrid() {
  const { campaigns, refetchCampaigns } = useCrowdfunding() as {
    campaigns: Array<{
      id: string;
      title: string;
      description: string;
      targetAmount: bigint;
      raisedAmount: bigint;
      deadline: bigint;
      isCompleted: boolean;
      owner: string;
    }>;
    refetchCampaigns: () => Promise<
      QueryObserverResult<unknown, ReadContractErrorType>
    >;
  };

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch campaigns on component mount
  useEffect(() => {
    const fetchCampaigns = async () => {
      setLoading(true);
      setError(null);
      try {
        await refetchCampaigns();
      } catch (error) {
        console.error("Error fetching campaigns:", error);
        setError("Failed to fetch campaigns. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, [refetchCampaigns]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="glass-card p-8 text-center animate-fade-in">
          <Loader2 className="w-8 h-8 text-violet-400 animate-spin mx-auto mb-4" />
          <p className="text-gray-300 font-space-grotesk">
            Loading campaigns from the blockchain
          </p>
          <p className="text-gray-400 text-sm mt-2">
            This may take a few moments...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="glass-card p-8 text-center max-w-md animate-fade-in">
          <AlertCircle className="w-8 h-8 text-red-400 mx-auto mb-4" />
          <p className="text-gray-300 font-space-grotesk mb-2">
            Oops! Something went wrong
          </p>
          <p className="text-gray-400 text-sm">{error}</p>
          <button
            onClick={() => refetchCampaigns()}
            className="mt-4 px-4 py-2 bg-violet-500/20 text-violet-400 
                     rounded-lg hover:bg-violet-500/30 transition-colors 
                     duration-300 font-medium text-sm"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!campaigns || campaigns.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="glass-card p-8 text-center max-w-md animate-fade-in">
          <Search className="w-8 h-8 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-300 font-space-grotesk mb-2">
            No Campaigns Found
          </p>
          <p className="text-gray-400 text-sm">
            Be the first to create a campaign and make a difference!
          </p>
          <Link
            href="/create-campaign"
            className="inline-block mt-4 px-6 py-3 bg-gradient-to-r 
                     from-violet-500 to-violet-600 text-white rounded-lg 
                     hover:from-violet-600 hover:to-violet-700 
                     transition-all duration-300 font-medium text-sm 
                     shadow-lg hover:shadow-violet-500/25"
          >
            Create Campaign
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-4 
                    animate-fade-in">
      {campaigns.map((campaign) => (
        <Link
          href={`/campaign/${campaign.id}`}
          key={campaign.id}
          className="transform transition-transform duration-300 
                   hover:scale-[1.02] focus:outline-none 
                   focus:ring-2 focus:ring-violet-500/50 
                   focus:ring-offset-2 focus:ring-offset-gray-900 
                   rounded-xl"
        >
          <CampaignCard campaign={campaign} />
        </Link>
      ))}
    </div>
  );
}