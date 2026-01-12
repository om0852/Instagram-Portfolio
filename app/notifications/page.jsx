"use client";
import React from "react";
import InstagramSidebar from "../_components/Sidebar";
import Image from "next/image";
import { Heart, MessageCircle, UserPlus, Zap } from "lucide-react";
import MobileHeader from "../_components/MobileHeader";
import BottomNav from "../_components/BottomNav";

export default function NotificationsPage() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
    const [dynamicNotifications, setDynamicNotifications] = React.useState([]);

    // 1. Static Notifications (Hardcoded as requested)
    const staticNotifications = [
        {
            id: "static_1",
            type: "like",
            user: { username: "sarah_designer", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150" },
            content: "liked your project Fintech Dashboard.",
            time: "2m",
            projectImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=150",
            isFollowing: false
        },
        {
            id: "static_2",
            type: "comment",
            user: { username: "tech_recruiter_dave", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150" },
            content: "commented: \"Impressive work! Are you open to new roles?\"",
            time: "1h",
            projectImage: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=150",
            isFollowing: true
        },
        {
            id: "static_3",
            type: "follow",
            user: { username: "startup_hub", image: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=150" },
            content: "started following you.",
            time: "3h",
            isFollowing: true
        },
        {
            id: "static_4",
            type: "update",
            user: { username: "om_salunke_dev", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150" },
            content: "posted a new project: AI Brand Identity.",
            time: "5h",
            projectImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=150",
            isFollowing: false
        },
        {
            id: "static_5",
            type: "like",
            user: { username: "react_fans", image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=150" },
            content: "liked your story.",
            time: "1d",
            projectImage: "https://images.unsplash.com/photo-1592210454359-9043f067919b?w=150",
            isFollowing: true
        },
        {
            id: "static_6",
            type: "follow",
            user: { username: "design_daily", image: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=150" },
            content: "started following you.",
            time: "2d",
            isFollowing: false
        },
        {
            id: "static_7",
            type: "comment",
            user: { username: "alex_coder", image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150" },
            content: "commented: \"Which tech stack is this?\"",
            time: "3d",
            projectImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=150",
            isFollowing: false
        }
    ];

    // 2. Dynamic Notifications (Fetch Comments from DB)
    React.useEffect(() => {
        const fetchDynamicInteractions = async () => {
            // Mock fetching posts to get their comments to simulate "Notifications"
            try {
                const res = await fetch('/api/posts?limit=10');
                const data = await res.json();
                if (data.success && data.data) {
                    const posts = data.data;
                    let newNotifs = [];

                    posts.forEach(post => {
                        if (post.comments && post.comments.length > 0) {
                            post.comments.forEach((comment, idx) => {
                                // Simulate a user for the comment since DB doesn't have it
                                newNotifs.push({
                                    id: `dyn_${post._id}_${idx}`,
                                    type: "comment",
                                    user: {
                                        username: `user_${Math.floor(Math.random() * 1000)}`,
                                        image: `https://ui-avatars.com/api/?name=User+${idx}&background=random`
                                    },
                                    content: `commented: "${comment.text}"`,
                                    time: "Recent", // Simply marking as recent
                                    projectImage: post.images && post.images.length > 0 ? post.images[0] : null,
                                    isFollowing: false
                                });
                            });
                        }
                    });
                    setDynamicNotifications(newNotifs);
                }
            } catch (e) {
                console.error("Failed to fetch dynamic notifications", e);
            }
        };
        fetchDynamicInteractions();
    }, []);

    const allNotifications = [...dynamicNotifications, ...staticNotifications];

    return (
        <div className="flex bg-black min-h-screen text-white font-sans pb-16 lg:pb-0">
            <InstagramSidebar isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />
            <div className="flex-1 lg:ml-64">
                <MobileHeader />
                <main className="max-w-2xl mx-auto px-0 md:px-5 pt-4 md:pt-8 pb-12">

                    <h1 className="text-2xl font-bold px-4 mb-6">Notifications</h1>

                    {/* Notification List */}
                    <div className="flex flex-col">
                        {allNotifications.length > 0 ? (
                            allNotifications.map((notif) => (
                                <NotificationItem key={notif.id} item={notif} />
                            ))
                        ) : (
                            <div className="py-10 text-center text-gray-500 text-sm">No notifications yet.</div>
                        )}
                    </div>

                    <div className="py-10 text-center text-gray-500 text-sm">
                        No more notifications
                    </div>

                </main>
            </div>
            <BottomNav />
        </div>
    );
}

function NotificationItem({ item }) {
    return (
        <div className="flex items-center justify-between px-4 py-3 hover:bg-[#121212] transition-colors cursor-pointer">
            <div className="flex items-center gap-3 flex-1">
                {/* User Avatar */}
                <div className="relative w-11 h-11 flex-shrink-0">
                    <Image
                        src={item.user.image}
                        alt={item.user.username}
                        fill
                        className="rounded-full object-cover border border-[#262626]"
                    />
                    {/* Icon Badge based on type */}
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center border-2 border-black">
                        {item.type === 'like' && <div className="bg-red-500 w-full h-full rounded-full flex items-center justify-center"><Heart size={10} fill="white" className="text-white" /></div>}
                        {item.type === 'comment' && <div className="bg-blue-500 w-full h-full rounded-full flex items-center justify-center"><MessageCircle size={10} fill="white" className="text-white" /></div>}
                        {item.type === 'follow' && <div className="bg-purple-500 w-full h-full rounded-full flex items-center justify-center"><UserPlus size={10} fill="white" className="text-white" /></div>}
                        {item.type === 'update' && <div className="bg-green-500 w-full h-full rounded-full flex items-center justify-center"><Zap size={10} fill="white" className="text-white" /></div>}
                    </div>
                </div>

                {/* Text Content */}
                <div className="text-sm">
                    <span className="font-semibold mr-1">{item.user.username}</span>
                    <span className="text-gray-300">{item.content}</span>
                    <span className="text-gray-500 text-xs ml-2">{item.time}</span>
                </div>
            </div>

            {/* Action / Right Side */}
            <div className="ml-4">
                {item.type === 'follow' ? (
                    <button className={`${item.isFollowing ? 'bg-[#262626] text-white' : 'bg-blue-500 text-white'} px-4 py-1.5 rounded-lg text-sm font-semibold hover:opacity-90`}>
                        {item.isFollowing ? 'Following' : 'Follow'}
                    </button>
                ) : item.projectImage ? (
                    <div className="relative w-11 h-11 rounded border border-[#262626] overflow-hidden">
                        <Image src={item.projectImage} alt="Post" fill className="object-cover" />
                    </div>
                ) : null}
            </div>
        </div>
    )
}
