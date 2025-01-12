"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Menu, X, Plus, Users, Home } from "lucide-react";

const CampaignsNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.style.overflow = !isMenuOpen ? 'hidden' : 'unset';
  };

  return (
    <nav className="bg-gray-900/95 backdrop-blur-md border-b border-gray-800 
                    sticky top-0 z-50 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16 lg:justify-around">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center space-x-2 group"
          >
            <span className="text-2xl font-space-grotesk font-bold 
                          bg-gradient-to-r from-violet-400 to-teal-400 
                          bg-clip-text text-transparent">
              Kara
            </span>
          </Link>

          {/* Desktop navigation - Centered */}
          <div className="hidden lg:flex items-center justify-center space-x-4">
            <Link
              href="/create-campaign"
              className="flex items-center gap-2 px-4 py-2 rounded-lg 
                       bg-gradient-to-r from-violet-500 to-violet-600 
                       text-white font-medium hover:from-violet-600 
                       hover:to-violet-700 transition-all duration-300 
                       shadow-lg hover:shadow-violet-500/25"
            >
              <Plus className="w-4 h-4" />
              Create Campaign
            </Link>
            <Link
              href="/grant-creator"
              className="flex items-center gap-2 px-4 py-2 rounded-lg 
                       bg-gray-800 text-gray-100 hover:bg-gray-700 
                       transition-colors duration-300"
            >
              <Users className="w-4 h-4" />
              Manage Creators
            </Link>
          </div>

          {/* Connect Button - Desktop */}
          <div className="hidden lg:block glass-button">
            <ConnectButton />
          </div>

          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="lg:hidden relative z-50 p-2 rounded-lg 
                     hover:bg-gray-800 transition-colors duration-200"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-gray-100" />
            ) : (
              <Menu className="w-6 h-6 text-gray-100" />
            )}
          </button>
        </div>

        {/* Mobile navigation */}
        <div
          className={`lg:hidden fixed inset-y-0 left-0 w-3/4 sm:w-1/2 
                    bg-gray-900/95 backdrop-blur-md transform 
                    transition-transform duration-300 ease-in-out z-50
                    border-r border-gray-800 ${
                      isMenuOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
        >
          <div className="flex flex-col h-full">
            {/* Mobile Logo */}
            <div className="p-6 border-b border-gray-800">
              <Link
                href="/"
                className="flex items-center space-x-2"
                onClick={toggleMenu}
              >
                <span className="text-2xl font-space-grotesk font-bold 
                              bg-gradient-to-r from-violet-400 to-teal-400 
                              bg-clip-text text-transparent">
                  Kara
                </span>
              </Link>
            </div>

            {/* Mobile Menu Items */}
            <div className="flex flex-col gap-4 p-6">
              <Link
                href="/"
                className="flex items-center gap-2 px-4 py-3 rounded-lg 
                         hover:bg-gray-800 text-gray-300 hover:text-gray-100 
                         transition-colors duration-200"
                onClick={toggleMenu}
              >
                <Home className="w-5 h-5" />
                Home
              </Link>
              <Link
                href="/create-campaign"
                className="flex items-center gap-2 px-4 py-3 rounded-lg 
                         bg-gradient-to-r from-violet-500 to-violet-600 
                         text-white font-medium hover:from-violet-600 
                         hover:to-violet-700 transition-all duration-300"
                onClick={toggleMenu}
              >
                <Plus className="w-5 h-5" />
                Create Campaign
              </Link>
              <Link
                href="/grant-creator"
                className="flex items-center gap-2 px-4 py-3 rounded-lg 
                         bg-gray-800 text-gray-100 hover:bg-gray-700 
                         transition-colors duration-200"
                onClick={toggleMenu}
              >
                <Users className="w-5 h-5" />
                Manage Creators
              </Link>
              <div className="mt-2">
                <ConnectButton
                  accountStatus={{
                    smallScreen: "avatar",
                    largeScreen: "full",
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Overlay */}
        {isMenuOpen && (
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 
                     transition-opacity duration-300"
            onClick={toggleMenu}
          />
        )}
      </div>
    </nav>
  );
};

export default CampaignsNavbar;