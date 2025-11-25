"use client";
import React, { useState } from "react";
import { Settings, Grid, Bookmark, Film, MessageCircle } from "lucide-react";
import InstagramSidebar from "../_components/Sidebar";

export default function InstagramProfile() {
  const [activeTab, setActiveTab] = useState("posts");

  const highlights = [
    {
      title: "myself",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    },
    {
      title: "coding",
      image:
        "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=150",
    },
    {
      title: "competitions",
      image:
        "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=150",
    },
    {
      title: "sister 🎂",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
    },
    {
      title: "🎂🎊",
      image:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
    },
  ];

  const posts = [
    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400",
    "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400",
    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
  ];

  return (
    <div className="flex">
      <InstagramSidebar />
      <div className="min-h-screen flex-1 bg-black text-white">
        {/* Profile Header */}
        <div className="max-w-4xl mx-auto px-4 pt-8 pb-4">
          <div className="flex items-start gap-20 mb-10">
            {/* Profile Picture */}
            <div className="relative">
              <div className="w-36 h-36 rounded-full border-2 border-gray-700 p-1">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300"
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <button className="absolute bottom-2 right-0 bg-blue-500 text-white text-xs px-2 py-1 rounded">
                Note...
              </button>
            </div>

            {/* Profile Info */}
            <div className="flex-1">
              {/* Username and Actions */}
              <div className="flex items-center gap-5 mb-5">
                <h1 className="text-xl font-light">salunke_om0852</h1>
                <Settings size={24} strokeWidth={1.5} />
              </div>

              {/* Stats */}
              <div className="flex gap-10 mb-5">
                <div>
                  <span className="font-semibold">25</span>
                  <span className="text-white ml-1">posts</span>
                </div>
                <button>
                  <span className="font-semibold">305</span>
                  <span className="text-white ml-1">followers</span>
                </button>
                <button>
                  <span className="font-semibold">337</span>
                  <span className="text-white ml-1">following</span>
                </button>
              </div>

              {/* Bio */}
              <div className="space-y-1 mb-5">
                <p className="text-sm">
                  <span className="text-gray-400">om_salunke</span> he
                </p>
                <p className="text-sm font-semibold">Web Designer</p>
                <p className="text-sm">📚21/9/2004</p>
                <p className="text-sm">🎓29/6/2024</p>
                <p className="text-sm">🏫09/3/2025</p>
                <p className="text-sm">
                  <a href="#" className="text-blue-400">
                    #mybankaiisbetterthanyours
                  </a>
                </p>
                <p className="text-sm">😂😜🤗... more</p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button className="flex-1 bg-gray-700 hover:bg-gray-600 text-white text-sm font-semibold py-1.5 px-4 rounded-lg transition">
                  Edit profile
                </button>
                <button className="flex-1 bg-gray-700 hover:bg-gray-600 text-white text-sm font-semibold py-1.5 px-4 rounded-lg transition">
                  View archive
                </button>
              </div>
            </div>
          </div>

          {/* Highlights */}
          <div className="flex gap-8 mb-8 overflow-x-auto pb-2">
            {highlights.map((highlight, index) => (
              <div
                key={index}
                className="flex flex-col items-center gap-2 flex-shrink-0"
              >
                <div className="w-20 h-20 rounded-full border-2 border-gray-700 p-1 hover:border-gray-500 cursor-pointer transition">
                  <img
                    src={highlight.image}
                    alt={highlight.title}
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
                <span className="text-xs text-white">{highlight.title}</span>
              </div>
            ))}
            <button className="flex flex-col items-center gap-2 flex-shrink-0">
              <div className="w-20 h-20 rounded-full border-2 border-gray-700 flex items-center justify-center hover:border-gray-500 transition">
                <span className="text-4xl text-gray-500">+</span>
              </div>
              <span className="text-xs text-white">New</span>
            </button>
          </div>

          {/* Tabs */}
          <div className="flex border-t border-gray-800">
            <button
              onClick={() => setActiveTab("posts")}
              className={`flex items-center gap-2 px-4 py-3 text-xs font-semibold tracking-wider border-t ${
                activeTab === "posts"
                  ? "border-white text-white"
                  : "border-transparent text-gray-500"
              }`}
            >
              <Grid size={12} />
              POSTS
            </button>
            <button
              onClick={() => setActiveTab("reels")}
              className={`flex items-center gap-2 px-4 py-3 text-xs font-semibold tracking-wider border-t ${
                activeTab === "reels"
                  ? "border-white text-white"
                  : "border-transparent text-gray-500"
              }`}
            >
              <Film size={12} />
              REELS
            </button>
            <button
              onClick={() => setActiveTab("saved")}
              className={`flex items-center gap-2 px-4 py-3 text-xs font-semibold tracking-wider border-t ${
                activeTab === "saved"
                  ? "border-white text-white"
                  : "border-transparent text-gray-500"
              }`}
            >
              <Bookmark size={12} />
              SAVED
            </button>
            <button
              onClick={() => setActiveTab("tagged")}
              className={`flex items-center gap-2 px-4 py-3 text-xs font-semibold tracking-wider border-t ${
                activeTab === "tagged"
                  ? "border-white text-white"
                  : "border-transparent text-gray-500"
              }`}
            >
              <svg
                className="w-3 h-3"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              TAGGED
            </button>
          </div>
        </div>

        {/* Posts Grid */}
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid grid-cols-3 gap-1">
            {posts.map((post, index) => (
              <div
                key={index}
                className="aspect-square relative group cursor-pointer overflow-hidden"
              >
                <img
                  src={post}
                  alt={`Post ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2">
                  <svg
                    className="w-5 h-5 text-white drop-shadow-lg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Messages Button */}
        <div className="fixed bottom-6 right-6">
          <button className="flex items-center gap-3 bg-gray-900 hover:bg-gray-800 px-6 py-3 rounded-full shadow-lg transition-colors">
            <div className="relative">
              <MessageCircle size={24} className="text-white" />
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center">
                8
              </span>
            </div>
            <span className="text-white font-semibold">Messages</span>
            <div className="flex -space-x-2">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150"
                alt=""
                className="w-6 h-6 rounded-full border-2 border-gray-900"
              />
              <img
                src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150"
                alt=""
                className="w-6 h-6 rounded-full border-2 border-gray-900"
              />
              <img
                src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150"
                alt=""
                className="w-6 h-6 rounded-full border-2 border-gray-900"
              />
              <div className="w-6 h-6 rounded-full bg-gray-700 border-2 border-gray-900 flex items-center justify-center">
                <span className="text-white text-xs">···</span>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
