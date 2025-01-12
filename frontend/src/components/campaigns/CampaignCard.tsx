// components/campaigns/CampaignCard.tsx
import { formatEther } from "ethers";
import { useEnsName, useEnsAvatar } from "wagmi";
import Image from "next/image";
import { Calendar, Target } from "lucide-react";

interface CampaignCardProps {
  campaign: {
    id: string;
    title: string;
    description: string;
    targetAmount: bigint;
    raisedAmount: bigint;
    deadline: bigint;
    isCompleted: boolean;
    owner: string;
  };
}

export function CampaignCard({ campaign }: CampaignCardProps) {
  const { data: ensName } = useEnsName({
    address: campaign.owner as `0x${string}`,
  });
  const { data: ensAvatar } = useEnsAvatar({ name: ensName || "" });

  const progress =
    (Number(campaign.raisedAmount) / Number(campaign.targetAmount)) * 100;

  return (
    <div className="glass-card p-6 flex flex-col justify-between h-full 
                    group hover:transform hover:scale-[1.02] transition-all 
                    duration-300 relative overflow-hidden">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 
                    to-transparent opacity-0 group-hover:opacity-100 
                    transition-opacity duration-300" />

      {/* Content wrapper */}
      <div className="relative z-10">
        {/* Header Section */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-4">
            {ensAvatar ? (
              <Image
                src={ensAvatar}
                alt={ensName || campaign.owner}
                width={40}
                height={40}
                className="rounded-full ring-2 ring-violet-500/20"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-gradient-to-br 
                           from-violet-500 to-teal-500 animate-pulse" />
            )}
            <div>
              <h2 className="font-space-grotesk text-xl font-bold text-gray-100 
                          line-clamp-1 group-hover:text-violet-400 
                          transition-colors duration-300">
                {campaign.title}
              </h2>
              <p className="text-sm text-gray-400 font-mono">
                by{" "}
                {ensName ||
                  `${campaign.owner.slice(0, 6)}...${campaign.owner.slice(-4)}`}
              </p>
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-300 mb-4 line-clamp-2">
            {campaign.description}
          </p>
        </div>

        {/* Progress Section */}
        <div className="space-y-4">
          <div className="h-2 bg-gray-700/50 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-violet-500 to-teal-500 
                       transition-all duration-300 ease-in-out"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-gray-300 font-mono">
              {formatEther(campaign.raisedAmount)} ETH raised
            </span>
            <span className="text-violet-400 font-medium">
              {Math.round(progress)}%
            </span>
          </div>
        </div>

        {/* Footer Section */}
        <div className="mt-6 space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-teal-400" />
              <div className="flex flex-col">
                <span className="text-sm text-gray-400">Target</span>
                <span className="font-medium text-gray-200 font-mono">
                  {formatEther(campaign.targetAmount)} ETH
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-teal-400" />
              <div className="flex flex-col text-right">
                <span className="text-sm text-gray-400">Ends</span>
                <span className="font-medium text-gray-200">
                  {new Date(Number(campaign.deadline) * 1000).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>

          <div>
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full 
                       text-sm font-medium ${
                         campaign.isCompleted
                           ? "bg-green-500/10 text-green-400"
                           : "bg-violet-500/10 text-violet-400"
                       }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full mr-2 ${
                campaign.isCompleted ? "bg-green-400" : "bg-violet-400"
              }`} />
              {campaign.isCompleted ? "Completed" : "Active"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}