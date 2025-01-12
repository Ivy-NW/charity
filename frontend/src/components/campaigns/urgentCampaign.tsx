"use client";

import { useCrowdfunding } from "@/blockchain/hooks/useCrowdfunding";
import { CampaignCard } from "./CampaignCard";
import Link from "next/link";
import { useEffect, useState } from "react";
import { QueryObserverResult } from "@tanstack/react-query";
import { ReadContractErrorType } from "viem";
import { Loader2, Clock, AlertCircle } from "lucide-react";

interface Campaign {
  id: string;
  title: string;
  description: string;
  targetAmount: bigint;
  raisedAmount: bigint;
  deadline: bigint;
  isCompleted: boolean;
  owner: string;
}

export function UrgentCampaign() {
  const { campaigns, refetchCampaigns } = useCrowdfunding() as {
    campaigns: Campaign[];
    refetchCampaigns: () => Promise<
      QueryObserverResult<unknown, ReadContractErrorType>
    >;
  };

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [urgentCampaigns, setUrgentCampaigns] = useState<Campaign[]>([]);

  // Fetch campaigns on component mount
  useEffect(() => {
    const fetchCampaigns = async () => {
      setLoading(true);
      setError(null);
      try {
        await refetchCampaigns();
      } catch (error) {
        console.error("Error fetching campaigns:", error);
        setError("Failed to fetch urgent campaigns");
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, [refetchCampaigns]);

  // Find the most urgent campaigns
  useEffect(() => {
    if (campaigns && campaigns.length > 0) {
      const now = Math.floor(Date.now() / 1000);
      const sortedCampaigns = campaigns
        .filter((campaign) => !campaign.isCompleted && campaign.deadline > now)
        .sort((a, b) => Number(a.deadline) - Number(b.deadline))
        .slice(0, 4);

      setUrgentCampaigns(sortedCampaigns);
    }
  }, [campaigns]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[300px] p-8">
        <div className="glass-card p-8 text-center animate-fade-in">
          <Loader2 className="w-9 h-8 text-violet-400 animate-spin mx-auto mb-4" />
          <p className="text-gray-300 font-space-grotesk">
            Loading urgent campaigns
          </p>
          <p className="text-gray-400 text-sm mt-2">
            Fetching data from blockchain...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[300px] p-6">
        <div className="glass-card p-8 text-center max-w-md animate-fade-in">
          <AlertCircle className="w-8 h-8 text-red-400 mx-auto mb-4" />
          <p className="text-gray-300 font-space-grotesk mb-2">
            Failed to load campaigns
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

  if (!urgentCampaigns || urgentCampaigns.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[300px] p-6">
        <div className="glass-card p-8 text-center max-w-md animate-fade-in">
          <Clock className="w-8 h-8 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-300 font-space-grotesk mb-2">
            No Urgent Campaigns
          </p>
          <p className="text-gray-400 text-sm">
            All current campaigns are well within their deadlines.
          </p>
        </div>
      </div>
    );
  }

  return (
    <section className="p-1 animate-fade-in">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <Clock className="w-6 h-6 text-violet-400" />
          <h2 className="text-2xl font-space-grotesk font-bold 
                       text-gray-100 bg-gradient-to-r from-violet-400 
                       to-teal-400 bg-clip-text text-transparent">
            Urgent Campaigns
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {urgentCampaigns.map((campaign) => (
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
      </div>
    </section>
  );
}