"use client";
import React from "react";
import { Heart, Send } from "lucide-react";

export default function MobileHeader() {
  return (
    <div className="lg:hidden bg-black border-b border-gray-800 px-4 py-3 flex items-center justify-between sticky top-0 z-40">
      <h1 className="text-white text-xl font-cursive">Instagram</h1>
      <div className="flex gap-4 items-center">
        <Heart className="text-white" size={24} />
        <div className="relative">
          <Send className="text-white" size={24} />
          <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-semibold rounded-full w-4 h-4 flex items-center justify-center">8</span>
        </div>
      </div>
    </div>
  );
}
