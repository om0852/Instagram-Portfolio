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
            <div className="w-6 h-6 relative rounded-full overflow-hidden border border-[#262626]">
              <Image src="/omsalunke_photo.jpg" alt="Profile" fill className="object-cover" />
            </div>
            <span className="text-base">Profile</span>
          </Link>
        </nav>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Drawer Content */}
          <div className="relative w-[80%] max-w-[300px] bg-[#121212] h-full border-r border-[#262626] flex flex-col p-5 shadow-2xl animate-in fade-in slide-in-from-left duration-200">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-white text-2xl font-cursive">
                <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
                  <Image
                    src={"/instagram-name-logo.png"}
                    alt="Logo"
                    width={140}
                    height={45}
                    className="h-[40px] w-auto object-contain"
                  />
                </Link>
              </h1>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-1 hover:bg-[#262626] rounded-full transition-colors"
              >
                <X className="text-white" size={28} />
              </button>
            </div>

            <nav className="flex-1 space-y-1 overflow-y-auto">
              {menuItems.filter(item => item.href !== "/create").map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className="w-full flex items-center gap-4 px-3 py-3.5 text-white hover:bg-[#262626] active:bg-[#262626] rounded-lg transition-colors group"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div className="relative group-hover:scale-110 transition-transform duration-200">
                    <item.icon size={26} strokeWidth={2} />
                    {item.badge && (
                      <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center border border-[#121212]">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <span className="text-base font-medium">{item.label}</span>
                </Link>
              ))}

              <div className="h-px bg-[#262626] my-2" />

              <Link
                href="/profile"
                className="w-full flex items-center gap-4 px-3 py-3.5 text-white hover:bg-[#262626] rounded-lg transition-colors group"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <div className="w-7 h-7 relative rounded-full overflow-hidden border border-[#262626] group-hover:border-white transition-colors">
                  <Image src="/omsalunke_photo.jpg" alt="Profile" fill className="object-cover" />
                </div>
                <span className="text-base font-medium">Profile</span>
              </Link>
            </nav>

            <div className="mt-auto pt-6 border-t border-[#262626]">
              <div className="flex items-center gap-3 px-3 py-2 text-gray-400 hover:text-white transition-colors cursor-pointer">
                <Menu size={24} />
                <span className="text-sm">More Options</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
