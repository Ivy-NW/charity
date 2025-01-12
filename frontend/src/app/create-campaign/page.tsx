"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { parseEther } from "ethers";
import { useCrowdfunding } from "@/blockchain/hooks/useCrowdfunding";
import { ArrowLeft } from "lucide-react"; // Add this import for the back arrow icon

export default function CreateCampaign() {
  const router = useRouter();
  const { createCampaign } = useCrowdfunding();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    targetAmount: "",
    duration: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await createCampaign(
        formData.title,
        formData.description,
        parseEther(formData.targetAmount),
        Number(formData.duration)
      );
      router.push("/");
    } catch (error) {
      console.error("Error creating campaign:", error);
    } finally {
      setIsLoading(false);
    }
  };

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

        <div className="glass-card p-8 border border-gray-700/50">
          <h1 className="text-3xl font-space-grotesk font-bold mb-8 gradient-text">
            Create New Campaign
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Campaign Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="w-full bg-gray-800 border border-gray-700 rounded-lg 
                         px-4 py-3 text-gray-100 focus:ring-2 focus:ring-violet-500 
                         focus:border-transparent transition-all duration-300"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full bg-gray-800 border border-gray-700 rounded-lg 
                         px-4 py-3 h-32 text-gray-100 focus:ring-2 
                         focus:ring-violet-500 focus:border-transparent 
                         transition-all duration-300 resize-none"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Target Amount (ETH)
                </label>
                <input
                  type="number"
                  value={formData.targetAmount}
                  onChange={(e) =>
                    setFormData({ ...formData, targetAmount: e.target.value })
                  }
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg 
                           px-4 py-3 text-gray-100 focus:ring-2 focus:ring-violet-500 
                           focus:border-transparent transition-all duration-300"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Duration (days)
                </label>
                <input
                  type="number"
                  value={formData.duration}
                  onChange={(e) =>
                    setFormData({ ...formData, duration: e.target.value })
                  }
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg 
                           px-4 py-3 text-gray-100 focus:ring-2 focus:ring-violet-500 
                           focus:border-transparent transition-all duration-300"
                  min="1"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-violet-500 to-violet-600 
                       text-white px-6 py-4 rounded-full font-medium 
                       transform hover:scale-105 transition-all duration-300 
                       shadow-lg hover:shadow-violet-500/25 disabled:opacity-50 
                       disabled:hover:scale-100 mt-8"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent 
                                rounded-full animate-spin" />
                  Creating...
                </div>
              ) : (
                "Create Campaign"
              )}
            </button>
          </form>
        </div>

        {/* Optional: Add helper text */}
        <div className="mt-6 text-center text-gray-400 text-sm">
          <p>
            All campaigns are verified on the blockchain and are completely
            transparent.
          </p>
        </div>
      </div>
    </div>
  );
}