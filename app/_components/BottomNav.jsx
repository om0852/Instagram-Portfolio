"use client";
import React from "react";
import { Home, Search, PlusSquare, PlaySquare } from "lucide-react";

export default function BottomNav() {
  return (
    <div className="lg:hidden bg-black border-t border-gray-800 px-4 py-2 fixed bottom-0 left-0 right-0 z-40">
      <div className="flex justify-around items-center">
        <Home className="text-white" size={28} />
        <Search className="text-gray-400" size={28} />
        <PlusSquare className="text-gray-400" size={28} />
        <PlaySquare className="text-gray-400" size={28} />
        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400"></div>
      </div>
    </div>
  );
}
