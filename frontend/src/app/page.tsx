import { Heart, Users, Globe, ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { UrgentCampaign } from "@/components/campaigns/urgentCampaign";
import Navbar from "@/components/navbar";

export default function Home() {
  return (
    <div className="min-h-screen transition-all duration-300">
      <Navbar />
      <main className="container mx-auto px-4">
        {/* Hero Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 py-16 lg:py-24 items-center">
          <div className="space-y-8">
            <h1 className="font-space-grotesk text-5xl lg:text-7xl font-bold gradient-text leading-tight animate-fade-in">
              Empower Change Through Web3
            </h1>
            <p className="font-inter text-lg lg:text-xl text-gray-300 leading-relaxed">
              Join our decentralized community of givers and create transparent, 
              immutable impact across the globe.
            </p>
            
            {/* Impact Metrics - Animated */}
            <div className="grid grid-cols-3 gap-4 py-6">
              <div className="animate-pulse-slow glass-card p-4">
                <span className="font-space-grotesk text-2xl text-teal-400 font-bold">\$2.4M+</span>
                <p className="font-inter text-sm text-gray-400">Total Donated</p>
              </div>
              <div className="animate-pulse-slow delay-100 glass-card p-4">
                <span className="font-space-grotesk text-2xl text-teal-400 font-bold">12K+</span>
                <p className="font-inter text-sm text-gray-400">Donors</p>
              </div>
              <div className="animate-pulse-slow delay-200 glass-card p-4">
                <span className="font-space-grotesk text-2xl text-teal-400 font-bold">234</span>
                <p className="font-inter text-sm text-gray-400">Active Campaigns</p>
              </div>
            </div>

            <div className="flex gap-4">
              <Link
                href="/campaign"
                className="btn-primary inline-flex items-center"
              >
                Start Giving
              </Link>
              <Link
                href="/how-it-works"
                className="inline-flex items-center px-8 py-4 rounded-full 
                border-2 border-violet-500 text-violet-400 
                font-inter font-medium hover:bg-violet-500 
                hover:text-white transform hover:scale-105 
                transition-all duration-300 hover:shadow-violet-500/25"
              >
                Learn More
              </Link>
            </div>
          </div>

          <div className="relative group">
            {/* Enhanced Glassmorphic card effect */}
            <div className="absolute inset-0 bg-gradient-to-r 
                          from-violet-500/10 to-teal-500/10 
                          rounded-xl backdrop-blur-sm -z-10 
                          group-hover:from-violet-500/20 
                          group-hover:to-teal-500/20 
                          transition-all duration-300" />
            <div className="relative overflow-hidden rounded-xl">
              <Image
                src="/pamoja1.jpeg"
                alt="People helping each other"
                width={600}
                height={500}
                className="rounded-xl shadow-lg object-cover w-full h-full
                         transform transition-transform duration-300 
                         group-hover:scale-105"
                priority
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t 
                            from-gray-900/60 to-transparent" />
            </div>
          </div>
        </section>

        {/* Urgent campaigns with enhanced glassmorphic cards */}
        <section className="py-0">
          <div className="relative">
            {/* Background glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r 
                          from-violet-500/5 to-teal-500/5 
                          rounded-2xl blur-3xl -z-16" />
            <UrgentCampaign />
          </div>
        </section>

        {/* New Feature Section */}
        <section className="py-16">
          <div className="glass-card p-8">
            <h3 className="font-space-grotesk text-2xl text-gray-100 
                          font-bold mb-6">
              Why Choose Web3 Giving?
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center text-center p-4 
                            hover:scale-105 transition-transform duration-300">
                <Globe className="w-12 h-12 text-violet-400 mb-4" />
                <h4 className="font-space-grotesk text-lg text-gray-100 mb-2">
                  Global Reach
                </h4>
                <p className="text-gray-400">
                  Impact communities worldwide with borderless transactions
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-4 
                            hover:scale-105 transition-transform duration-300">
                <Heart className="w-12 h-12 text-teal-400 mb-4" />
                <h4 className="font-space-grotesk text-lg text-gray-100 mb-2">
                  Transparent Giving
                </h4>
                <p className="text-gray-400">
                  Track your impact with blockchain verification
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-4 
                            hover:scale-105 transition-transform duration-300">
                <Users className="w-12 h-12 text-violet-400 mb-4" />
                <h4 className="font-space-grotesk text-lg text-gray-100 mb-2">
                  Community Driven
                </h4>
                <p className="text-gray-400">
                  Join a network of passionate changemakers
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}