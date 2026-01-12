"use client";
import Link from "next/link";
import Image from "next/image";
import { Home, Search, PlusSquare, Compass, User } from "lucide-react";

export default function BottomNav() {
  return (
    <div className="lg:hidden bg-black border-t border-[#262626] px-4 py-3 fixed bottom-0 left-0 right-0 z-50 flex justify-between items-center pb-5 md:pb-3">
      <Link href="/" className="text-white">
        <Home size={28} strokeWidth={1.5} />
      </Link>
      <Link href="/search" className="text-white">
        <Search size={28} strokeWidth={1.5} />
      </Link>
      <Link href="/create" className="text-white">
        <PlusSquare size={28} strokeWidth={1.5} />
      </Link>
      <Link href="/projects" className="text-white">
        <Compass size={28} strokeWidth={1.5} />
      </Link>
      <Link href="/profile" className="text-white">
        <div className="w-7 h-7 relative rounded-full overflow-hidden border border-gray-600">
          <Image
            src="/omsalunke_photo.jpg"
            alt="Profile"
            fill
            className="object-cover"
          />
        </div>
      </Link>
    </div>
  );
}
