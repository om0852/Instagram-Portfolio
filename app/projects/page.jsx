"use client";
import InstagramSidebar from "../_components/Sidebar";
import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";
import { Layers, Smartphone, Globe, PenTool, Layout, FolderKanban, Star, GitBranch, ExternalLink, Heart, MessageCircle, Send } from "lucide-react";
import MobileHeader from "../_components/MobileHeader";
import BottomNav from "../_components/BottomNav";

export default function ProjectsPage() {
    const [activeCategory, setActiveCategory] = useState("All");
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    const categories = [
        { name: "All", icon: Layers },
        { name: "Web", icon: Globe },
        { name: "Mobile", icon: Smartphone },
        { name: "Design", icon: PenTool },
    ];

    React.useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await fetch('/api/projects');
                const data = await res.json();
                if (data.success) {
                    setProjects(data.data.map(p => ({
                        id: p._id,
                        title: p.title,
                        category: p.tags?.[0] || "Web", // Default to Web if no tag
                        image: p.images?.[0] || "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800",
                        description: p.content,
                        tech: p.techStack || [],
                        likes: p.likes || 0,
                        comments: p.commentsCount || 0
                    })));
                }
            } catch (error) {
                console.error("Failed to fetch projects", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProjects();
    }, []);

    const filteredProjects = activeCategory === "All"
        ? projects
        : projects.filter(p => p.category?.toLowerCase() === activeCategory.toLowerCase() || p.tech?.some(t => t.toLowerCase().includes(activeCategory.toLowerCase())));

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <div className="flex bg-black min-h-screen text-white font-sans pb-16 lg:pb-0">
            <InstagramSidebar isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />
            <div className="flex-1 lg:ml-64">
                <MobileHeader />
                <main className="max-w-5xl mx-auto px-4 py-8 md:px-8">

                    {/* Portfolio Header */}
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-12 border-b border-[#262626] pb-12">
                        <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 p-[2px]">
                            <div className="w-full h-full rounded-full bg-black p-1 flex items-center justify-center">
                                <FolderKanban size={48} className="text-white" strokeWidth={1} />
                            </div>
                        </div>

                        <div className="flex-1 text-center md:text-left">
                            <div className="flex flex-col md:flex-row items-center gap-4 mb-4">
                                <h1 className="text-2xl md:text-3xl font-light">projects_portfolio</h1>
                                <div className="flex gap-2">
                                    <button className="bg-[#363636] hover:bg-[#262626] px-4 py-1.5 rounded-lg text-sm font-semibold transition-colors">
                                        Message
                                    </button>
                                    <button className="bg-[#363636] hover:bg-[#262626] px-4 py-1.5 rounded-lg text-sm font-semibold transition-colors">
                                        Contact
                                    </button>
                                </div>
                            </div>

                            <div className="flex justify-center md:justify-start gap-8 mb-4 text-sm md:text-base">
                                <span><span className="font-bold">{projects.length}</span> posts</span>
                                <span><span className="font-bold">12.5k</span> followers</span>
                                <span><span className="font-bold">342</span> following</span>
                            </div>

                            <div className="text-sm md:text-base">
                                <h2 className="font-bold">Om Salunke | Projects</h2>
                                <p className="text-gray-300">
                                    Building digital experiences. 🚀 <br />
                                    Full Stack Developer & UI/UX Designer <br />
                                    👇 Check out my latest work below
                                </p>
                                <a href="#" className="text-blue-400 hover:underline text-sm font-semibold">omsalunke.com/portfolio</a>
                            </div>
                        </div>
                    </div>

                    {/* Highlights / Skills (Optional) */}
                    <div className="flex gap-4 md:gap-8 overflow-x-auto pb-6 mb-6 scrollbar-hide px-2">
                        {categories.map((cat) => (
                            <div key={cat.name} className="flex flex-col items-center gap-2 cursor-pointer group" onClick={() => setActiveCategory(cat.name)}>
                                <div className={`w-16 h-16 rounded-full p-[2px] ${activeCategory === cat.name ? 'bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500' : 'bg-[#262626]'}`}>
                                    <div className="w-full h-full bg-black rounded-full flex items-center justify-center group-hover:bg-[#121212] transition-colors">
                                        <cat.icon size={24} className={activeCategory === cat.name ? "text-white" : "text-gray-400"} />
                                    </div>
                                </div>
                                <span className={`text-xs font-medium ${activeCategory === cat.name ? "text-white" : "text-gray-400"}`}>{cat.name}</span>
                            </div>
                        ))}
                    </div>

                    <div className="border-t border-[#262626] mb-6"></div>

                    {/* Project Grid */}
                    <h3 className="text-xs font-bold text-gray-500 mb-4 uppercase tracking-widest flex items-center gap-2">
                        <Layout size={12} />
                        {activeCategory} Projects
                    </h3>

                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 md:gap-8">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="aspect-square bg-[#121212] animate-pulse rounded" />
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 md:gap-8">
                            {filteredProjects.map((project) => (
                                <Link href={`/projects/${project.id}`} key={project.id} className="group flex flex-col cursor-pointer">
                                    {/* Card Header (Mobile only aesthetics) */}
                                    <div className="flex items-center justify-between py-2 md:hidden">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center">
                                                <FolderKanban size={14} />
                                            </div>
                                            <span className="text-sm font-semibold truncate w-40">{project.title}</span>
                                        </div>
                                        <MoreHorizontal size={16} />
                                    </div>

                                    {/* Card Image */}
                                    <div className="relative aspect-square w-full bg-[#121212] md:rounded overflow-hidden border border-transparent md:border-[#262626] group-hover:border-gray-700 transition-all">
                                        <Image
                                            src={project.image}
                                            alt={project.title}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        />

                                        {/* Desktop Hover Overlay */}
                                        <div className="hidden md:flex absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 items-center justify-center gap-6">
                                            <div className="flex items-center gap-2 text-white font-bold text-lg">
                                                <Heart fill="white" size={24} /> {project.likes}
                                            </div>
                                            <div className="flex items-center gap-2 text-white font-bold text-lg">
                                                <MessageCircle fill="white" size={24} /> {project.comments}
                                            </div>
                                        </div>

                                        <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider text-white md:hidden">
                                            {project.category}
                                        </div>
                                    </div>

                                    {/* Desktop Details (Below Image) */}
                                    <div className="hidden md:block mt-3">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="font-bold text-base truncate pr-4">{project.title}</h3>
                                            <div className="flex gap-2">
                                                {project.tech.slice(0, 3).map((t, i) => (
                                                    <span key={i} className="text-[10px] bg-[#262626] text-gray-300 px-2 py-0.5 rounded-full">{t}</span>
                                                ))}
                                            </div>
                                        </div>
                                        <p className="text-gray-400 text-sm line-clamp-2 leading-relaxed mb-3">
                                            {project.description}
                                        </p>
                                        <button className="text-xs font-semibold text-blue-400 hover:text-white flex items-center gap-1 transition-colors">
                                            View Details <ExternalLink size={12} />
                                        </button>
                                    </div>

                                    {/* Mobile Actions Bar (Below Image) */}
                                    <div className="md:hidden px-2 py-2">
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="flex items-center gap-3">
                                                <Heart size={24} />
                                                <MessageCircle size={24} />
                                                <Send size={24} />
                                            </div>
                                            <GitBranch size={24} />
                                        </div>
                                        <div className="font-semibold text-sm mb-1">{project.likes} likes</div>
                                        <p className="text-sm">
                                            <span className="font-semibold mr-2">{project.category}</span>
                                            {project.description}
                                        </p>
                                    </div>

                                </Link>
                            ))}
                        </div>
                    )}

                    {/* Empty State */}
                    {!loading && filteredProjects.length === 0 && (
                        <div className="py-20 flex flex-col items-center justify-center text-gray-500">
                            <div className="w-16 h-16 rounded-full border-2 border-gray-700 flex items-center justify-center mb-4">
                                <CameraOff size={32} />
                            </div>
                            <p className="font-semibold text-xl">No Projects Yet</p>
                        </div>
                    )}

                </main>
            </div>
            <BottomNav />
        </div>
    );
}

function MoreHorizontal({ size }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /><circle cx="5" cy="12" r="1" /></svg>
    )
}

function CameraOff({ size }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="2" x2="22" y1="2" y2="22" /><path d="M7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16" /><path d="M9.5 4h5L17 7h3a2 2 0 0 1 2 2v7.5" /><path d="M14.121 15.121A3 3 0 1 1 9.88 10.88" /></svg>
    )
}
