"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Menu, X, Info, Wallet, Heart, LayoutGrid } from "lucide-react";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.style.overflow = !isMenuOpen ? "hidden" : "unset";
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActivePath = (path: string) => pathname === path;

  const NavLink = ({ href, children, icon: Icon }: any) => (
    <Link
      href={href}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300
                ${
                  isActivePath(href)
                    ? "bg-violet-500/20 text-violet-400"
                    : "text-gray-300 hover:text-violet-400 hover:bg-gray-800"
                }`}
      onClick={() => setIsMenuOpen(false)}
    >
      <Icon className="w-4 h-4" />
      <span>{children}</span>
    </Link>
  );

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300
                ${
                  isScrolled
                    ? "bg-gray-900/95 backdrop-blur-md shadow-lg"
                    : "bg-transparent"
                }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16 lg:justify-around">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-2 group"
            onClick={() => setIsMenuOpen(false)}
          >
            <span className="text-2xl font-space-grotesk font-bold 
                          bg-gradient-to-r from-violet-400 to-teal-400 
                          bg-clip-text text-transparent">
              Kara
            </span>
          </Link>

          {/* Desktop navigation - Centered */}
          <div className="hidden lg:flex items-center justify-center space-x-2">
            <NavLink href="/how-it-works" icon={Info}>
              About Us
            </NavLink>
            <NavLink href="/campaign" icon={LayoutGrid}>
              Campaigns
            </NavLink>
            <NavLink href="/create-campaign" icon={Heart}>
              Create Campaign
            </NavLink>
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
            <div className="flex flex-col gap-2 p-6">
              <NavLink href="/how-it-works" icon={Info}>
                About Us
              </NavLink>
              <NavLink href="/campaign" icon={LayoutGrid}>
                Campaigns
              </NavLink>
              <NavLink href="/create-campaign" icon={Heart}>
                Create Campaign
              </NavLink>
              <div className="mt-4 glass-button">
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

export default Navbar;