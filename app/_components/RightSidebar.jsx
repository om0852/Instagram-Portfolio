"use client";
import React from "react";
import Image from "next/image";

export default function RightSidebar({ suggestions = [], footerLinks = [] }) {
  return (
    <div className="hidden md:block w-[340px] bg-black px-8 py-8 overflow-y-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Image src="/omsalunke_photo.jpg" alt="Profile" width={48} height={48} className="w-12 h-12 rounded-full object-cover" />
          <div>
            <p className="text-white text-sm font-semibold">salunke_om0852</p>
            <p className="text-gray-400 text-xs">om_salunke</p>
          </div>
        </div>
        <button className="text-blue-500 text-xs font-semibold">Switch</button>
      </div>

      <div className="flex items-center justify-between mb-4">
        <p className="text-gray-400 text-sm font-semibold">Suggested for you</p>
        <button className="text-white text-xs font-semibold">See All</button>
      </div>

      <div className="space-y-3 mb-8">
        {suggestions.map((user, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Image src={user.image} alt={user.username} width={44} height={44} className="w-11 h-11 rounded-full object-cover" />
              <div>
                <div className="flex items-center gap-1">
                  <p className="text-white text-sm font-semibold">{user.username}</p>
                  {user.verified && (
                    <svg className="w-3 h-3 text-blue-500" fill="currentColor" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" /></svg>
                  )}
                </div>
                <p className="text-gray-400 text-xs">{user.subtitle}</p>
              </div>
            </div>
            <button className="text-blue-500 text-xs font-semibold">Follow</button>
          </div>
        ))}
      </div>

      <div className="text-gray-500 text-xs space-y-3">
        <div className="flex flex-wrap gap-1">
          {footerLinks.map((link, index) => (
            <React.Fragment key={index}>
              <a href="#" className="hover:underline">{link}</a>
              {index < footerLinks.length - 1 && <span>·</span>}
            </React.Fragment>
          ))}
        </div>
        <p className="text-gray-500">© 2025 INSTAGRAM FROM META</p>
      </div>
    </div>
  );
}
