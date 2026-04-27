"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useStellarWallet } from "@/hooks/useStellarWallet";

function truncate(addr: string) {
  return `${addr.slice(0, 4)}...${addr.slice(-4)}`;
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { address, connect, disconnect } = useStellarWallet();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleWallet = () => (address ? disconnect() : connect());

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#08080f]/90 backdrop-blur-md border-b border-violet-900/20"
          : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center flex-shrink-0">
            <Image
              src="/Stabble_X_Stellar_logo.png"
              alt="Built on Stellar"
              width={130}
              height={48}
              className="h-10 w-auto rounded-xl"
              priority
            />
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {[
              { label: "Pools", href: "/pool" },
              { label: "Swap", href: "/pool" },
              { label: "About", href: "#features" },
              { label: "Docs", href: "#" },
            ].map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-gray-400 hover:text-white transition-colors text-sm font-medium"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Wallet button */}
          <button
            onClick={handleWallet}
            className={`hidden md:block px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
              address
                ? "bg-violet-900/30 border border-violet-500/50 text-violet-300 font-mono"
                : "bg-violet-600 hover:bg-violet-500 text-white"
            }`}
          >
            {address ? `● ${truncate(address)}` : "Connect Wallet"}
          </button>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-gray-400 hover:text-white"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <div className="w-5 h-0.5 bg-current mb-1.5" />
            <div className="w-5 h-0.5 bg-current mb-1.5" />
            <div className="w-5 h-0.5 bg-current" />
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden pb-4 border-t border-violet-900/20 mt-2 pt-4 flex flex-col gap-3">
            {[
              { label: "Pools", href: "/pool" },
              { label: "Swap", href: "/pool" },
              { label: "About", href: "#features" },
              { label: "Docs", href: "#" },
            ].map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-gray-400 hover:text-white text-sm font-medium"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <button
              onClick={() => {
                handleWallet();
                setMenuOpen(false);
              }}
              className={`mt-2 w-full px-4 py-2.5 rounded-xl text-sm font-medium ${
                address
                  ? "bg-violet-900/30 border border-violet-500/50 text-violet-300 font-mono"
                  : "bg-violet-600 hover:bg-violet-500 text-white"
              }`}
            >
              {address ? `● ${truncate(address)}` : "Connect Wallet"}
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
