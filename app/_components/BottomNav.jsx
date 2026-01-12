"use client";
import React from "react";
import { Home, Search, PlusSquare, PlaySquare } from "lucide-react";

export default function BottomNav() {
  return (
    <div className="lg:hidden bg-black border-t border-[#262626] px-4 py-2 fixed bottom-0 left-0 right-0 z-40">
      <div className="flex justify-around items-center">
        <Home className="text-white" size={26} strokeWidth={1.5} />
        <Search className="text-white" size={26} strokeWidth={1.5} />
        <PlusSquare className="text-white" size={26} strokeWidth={1.5} />
        <PlaySquare className="text-white" size={26} strokeWidth={1.5} />
        <div className="w-7 h-7 rounded-full bg-gray-700 relative overflow-hidden">
          {/* Profile placeholder - ideally use Image component or similar logic if user is avail */}
          <div className="w-full h-full bg-gradient-to-tr from-yellow-400 to-red-500 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}
