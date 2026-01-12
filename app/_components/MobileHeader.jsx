"use client";
import React from "react";
import { Heart, Send, Menu } from "lucide-react";
import Link from "next/link";

export default function MobileHeader({ setIsMobileMenuOpen }) {
  return (
    <div className="lg:hidden bg-black border-b border-[#262626] px-4 py-3 flex items-center justify-between sticky top-0 z-40">
      <button onClick={() => setIsMobileMenuOpen(true)}>
        <Menu className="text-white" size={24} />
      </button>
      <Link href="/">
        <h1 className="text-white text-xl font-cursive">Instagram</h1>
      </Link>
      <div className="flex gap-4 items-center">
        <Link href="/contact" className="relative">
          <Send className="text-white" size={24} />
          <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-semibold rounded-full w-4 h-4 flex items-center justify-center">8</span>
        </Link>
      </div>
    </div>
  );
}
