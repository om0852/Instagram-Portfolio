"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  Home,
  Search,
  Compass,
  PlaySquare,
  Send,
  Heart,
  PlusSquare,
  BarChart3,
  User,
  MoreHorizontal,
  MessageCircle,
  X,
  Menu,
} from "lucide-react";

export default function InstagramSidebar({
  isMobileMenuOpen,
  setIsMobileMenuOpen,
}) {
  const menuItems = [
    { icon: Home, label: "Home", badge: null },
    { icon: Search, label: "Search", badge: null },
    { icon: Compass, label: "Explore", badge: null },
    { icon: PlaySquare, label: "Reels", badge: null },
    { icon: Send, label: "Messages", badge: 8 },
    { icon: Heart, label: "Notifications", badge: 7 },
    { icon: PlusSquare, label: "Create", badge: null },
    { icon: BarChart3, label: "Dashboard", badge: null },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex w-64 bg-black border-r border-gray-800 flex-col px-3 py-4 fixed h-screen z-40">
        <div className=" px-2">
          <h1 className="text-white text-2xl font-cursive">
            <img
              src={"/instagram-name-logo.png"}
              width={160}
              className="h-[50px] object-cover"
            />
          </h1>
        </div>

        <nav className="flex-1 space-y-2">
          {menuItems.map((item, index) => (
            <button
              key={index}
              className="w-full  flex items-center gap-4 px-3 py-3 text-white hover:bg-gray-900 rounded-lg transition-colors"
            >
              <div className="relative">
                <item.icon size={26} strokeWidth={2} />
                {item.badge && (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-base">{item.label}</span>
            </button>
          ))}

          <button className="w-full flex items-center gap-4 px-3 py-3 text-white hover:bg-gray-900 rounded-lg transition-colors">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 flex items-center justify-center">
              <User size={16} className="text-white" />
            </div>
            <span className="text-base">Profile</span>
          </button>
        </nav>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-black bg-opacity-95 z-50">
          <div className="flex flex-col h-full p-6">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-white text-2xl font-cursive">
                <img src={"/instagram-name-logo.png"} />
              </h1>
              <button onClick={() => setIsMobileMenuOpen(false)}>
                <X className="text-white" size={28} />
              </button>
            </div>
            <nav className="flex-1 space-y-2">
              {menuItems.map((item, index) => (
                <button
                  key={index}
                  className="w-full flex items-center gap-4 px-3 py-3 text-white hover:bg-gray-900 rounded-lg transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div className="relative">
                    <item.icon size={26} strokeWidth={2} />
                    {item.badge && (
                      <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <span className="text-base">{item.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
