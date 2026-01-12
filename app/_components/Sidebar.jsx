"use client";
import Link from "next/link";
import Image from "next/image";
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
    { icon: Home, label: "Home", badge: null, href: "/" },
    { icon: Search, label: "Search", badge: null, href: "/search" },
    { icon: Compass, label: "Projects", badge: null, href: "/projects" },
    { icon: Send, label: "Contact", badge: null, href: "/contact" },
    { icon: Heart, label: "Notifications", badge: 3, href: "/notifications" },
    { icon: PlusSquare, label: "Add Project", badge: null, href: "/create" },
    { icon: BarChart3, label: "Resume", badge: null, href: "/resume" },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex w-64 bg-black border-r border-[#262626] flex-col px-3 py-4 fixed h-screen z-40">
        <div className=" px-2">
          <h1 className="text-white text-2xl font-cursive">
            <Link href="/">
              <Image
                src={"/instagram-name-logo.png"}
                alt="Logo"
                width={160}
                height={50}
                className="h-[50px] object-cover"
                priority
              />
            </Link>
          </h1>
        </div>

        <nav className="flex-1 space-y-2">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
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
            </Link>
          ))}

          <Link href="/profile" className="w-full flex items-center gap-4 px-3 py-3 text-white hover:bg-gray-900 rounded-lg transition-colors">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 flex items-center justify-center">
              <User size={16} className="text-white" />
            </div>
            <span className="text-base">Profile</span>
          </Link>
        </nav>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-black bg-opacity-95 z-50">
          <div className="flex flex-col h-full p-6">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-white text-2xl font-cursive">
                <Link href="/">
                  <img src={"/instagram-name-logo.png"} alt="Logo" />
                </Link>
              </h1>
              <button onClick={() => setIsMobileMenuOpen(false)}>
                <X className="text-white" size={28} />
              </button>
            </div>
            <nav className="flex-1 space-y-2">
              {menuItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
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
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
