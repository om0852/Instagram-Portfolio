"use client";
import React from "react";
import InstagramSidebar from "../_components/Sidebar";
import Image from "next/image";
import { Heart, MessageCircle, Send, MoreHorizontal, MousePointerClick } from "lucide-react";
import MobileHeader from "../_components/MobileHeader";
import BottomNav from "../_components/BottomNav";

export default function ReelsPage() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
    const reels = [
        {
            id: 1,
            title: "Fintech App Walkthrough",
            likes: "124K",
            comments: "1.2K",
            videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-software-developer-working-on-code-screen-close-up-1728-large.mp4", // Placeholder
            user: {
                username: "om_salunke_dev",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300"
            },
            description: "Quick look at the analytics dashboard animation! 🚀 #react #dashboard #ui"
        },
        {
            id: 2,
            title: "Mobile Interactions",
            likes: "45K",
            comments: "890",
            videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-man-working-on-a-computer-keyboard-1636-large.mp4", // Placeholder
            user: {
                username: "om_salunke_dev",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300"
            },
            description: "Smooth transitions on the new travel app ✈️ #mobile #design"
        },
    ];

    return (
        <div className="flex bg-black min-h-screen text-white font-sans pb-16 lg:pb-0">
            <InstagramSidebar isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />
            <div className="flex-1 lg:ml-64 flex flex-col items-center pt-0 md:pt-8 bg-black">
                <div className="w-full md:hidden">
                    <MobileHeader setIsMobileMenuOpen={setIsMobileMenuOpen} />
                </div>
                <div className="w-full max-w-[400px] h-[calc(100vh-40px)] space-y-4 overflow-y-auto scrollbar-hide snap-y snap-mandatory">
                    {reels.map((reel) => (
                        <div key={reel.id} className="relative w-full h-[85vh] bg-[#1a1a1a] rounded-lg overflow-hidden snap-center border border-[#262626] group">

                            {/* Video Placeholder */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                {/* Imagine a real <video> tag here */}
                                <Image
                                    src="https://images.unsplash.com/photo-1616469829941-c7200edec809?w=800&q=80"
                                    alt="Reel Cover"
                                    fill
                                    className="object-cover opacity-60"
                                />
                                <div className="z-10 bg-black/50 p-4 rounded-full">
                                    <MousePointerClick size={32} />
                                </div>
                            </div>

                            {/* Right Side Actions */}
                            <div className="absolute right-4 bottom-20 flex flex-col items-center gap-6 z-20">
                                <div className="flex flex-col items-center gap-1">
                                    <Heart size={28} />
                                    <span className="text-xs font-semibold">{reel.likes}</span>
                                </div>
                                <div className="flex flex-col items-center gap-1">
                                    <MessageCircle size={28} />
                                    <span className="text-xs font-semibold">{reel.comments}</span>
                                </div>
                                <div className="flex flex-col items-center gap-1">
                                    <Send size={28} className="-rotate-45 mb-1" />
                                </div>
                                <MoreHorizontal size={24} />

                                <div className="w-8 h-8 rounded-lg border-2 border-white overflow-hidden">
                                    <Image src={reel.user.image} alt={reel.user.username} width={32} height={32} />
                                </div>
                            </div>

                            {/* Bottom Info */}
                            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent z-10">
                                <div className="flex items-center gap-2 mb-3">
                                    <div className="w-8 h-8 rounded-full overflow-hidden relative">
                                        <Image src={reel.user.image} alt={reel.user.username} fill className="object-cover" />
                                    </div>
                                    <span className="font-semibold text-sm">{reel.user.username}</span>
                                    <button className="border border-white/60 px-3 py-1 rounded-lg text-xs font-semibold backdrop-blur-sm">Follow</button>
                                </div>
                                <p className="text-sm mb-4 line-clamp-2">{reel.description}</p>

                                <div className="flex items-center gap-2 text-xs">
                                    <span>♫ Original Audio • {reel.user.username}</span>
                                </div>
                            </div>

                        </div>
                    ))}

                    <div className="h-20 flex items-center justify-center text-gray-500 pb-10">
                        <p>You've reached the end!</p>
                    </div>
                </div>
            </div>
            <BottomNav />
        </div>
    );
}
