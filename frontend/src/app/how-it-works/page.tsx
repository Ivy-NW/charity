import Navbar from "@/components/navbar";
import { Heart, Users, Globe, ChevronDown } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import React from "react";

const page = () => {
  return (
    <div className="min-h-screen  transition-all duration-300">
      <Navbar />
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 py-16 lg:py-24 items-center">
          <div className="space-y-8">
            <h1 className="font-space-grotesk text-5xl lg:text-7xl font-bold gradient-text leading-tight animate-fade-in">
              Empower Change
            </h1>
            <p className="font-inter text-lg lg:text-xl text-gray-300 leading-relaxed">
              Join our community of givers and make a lasting impact on lives
              around the world.
            </p>
          </div>
          <div className="relative group">
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
                width={500}
                height={400}
                className="rounded-xl shadow-lg object-cover w-full h-full
                         transform transition-transform duration-300 
                         group-hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t 
                            from-gray-900/60 to-transparent" />
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16">
          <div className="glass-card p-8">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center text-center p-4 
                            hover:scale-105 transition-transform duration-300">
                <Heart className="w-12 h-12 text-teal-400 mb-4" />
                <h3 className="font-space-grotesk text-lg text-gray-100 mb-2">
                  Immediate Impact
                </h3>
                <p className="text-gray-400">
                  Your generosity creates instant positive change in someone's life.
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-4 
                            hover:scale-105 transition-transform duration-300">
                <Users className="w-12 h-12 text-violet-400 mb-4" />
                <h3 className="font-space-grotesk text-lg text-gray-100 mb-2">
                  Community Power
                </h3>
                <p className="text-gray-400">
                  Unite with others to amplify your impact and reach.
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-4 
                            hover:scale-105 transition-transform duration-300">
                <Globe className="w-12 h-12 text-teal-400 mb-4" />
                <h3 className="font-space-grotesk text-lg text-gray-100 mb-2">
                  Global Reach
                </h3>
                <p className="text-gray-400">
                  Support causes and individuals across the world.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Statistics */}
        <section className="py-16">
          <div className="glass-card p-8 text-center">
            <h2 className="font-space-grotesk text-4xl lg:text-5xl font-bold mb-4 text-gray-100">
              2+
            </h2>
            <p className="font-inter text-xl lg:text-2xl text-gray-300">
              Generous Souls Making a Difference
            </p>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16">
          <h2 className="font-space-grotesk text-3xl gradient-text font-bold mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            <details className="glass-card p-6">
              <summary className="font-space-grotesk font-semibold text-gray-100 
                               cursor-pointer flex justify-between items-center">
                Is My Donation Tax Deductible?
                <ChevronDown className="text-teal-400" />
              </summary>
              <p className="mt-4 text-gray-300">
                Most donations on our platform are tax-deductible. We provide
                donation receipts for your records.
              </p>
            </details>
            <details className="glass-card p-6">
              <summary className="font-space-grotesk font-semibold text-gray-100 
                               cursor-pointer flex justify-between items-center">
                How Will My Donation Be Used?
                <ChevronDown className="text-teal-400" />
              </summary>
              <p className="mt-4 text-gray-300">
                Your donation goes directly to the campaign you choose, minus a
                small platform fee for operational costs.
              </p>
            </details>
            <details className="glass-card p-6">
              <summary className="font-space-grotesk font-semibold text-gray-100 
                               cursor-pointer flex justify-between items-center">
                Can I Set Up A Recurring Donation?
                <ChevronDown className="text-teal-400" />
              </summary>
              <p className="mt-4 text-gray-300">
                Yes, you can set up monthly recurring donations to support your
                favorite causes consistently.
              </p>
            </details>
          </div>
        </section>
      </div>
    </div>
  );
};

export default page;