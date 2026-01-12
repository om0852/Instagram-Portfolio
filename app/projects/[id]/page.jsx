"use client";
import React, { useState } from "react";
import InstagramSidebar from "../../_components/Sidebar";
import MobileHeader from "../../_components/MobileHeader";
import BottomNav from "../../_components/BottomNav";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Github, Heart, MessageCircle, Send, Bookmark, MoreHorizontal } from "lucide-react";

export default function ProjectDetailsPage({ params }) {
    const { id } = React.use(params);
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    React.useEffect(() => {
        const fetchProject = async () => {
            try {
                const res = await fetch(`/api/projects/${id}`);
                const data = await res.json();
                if (data.success) {
                    setProject(data.data);
                }
            } catch (error) {
                console.error("Failed to fetch project", error);
            } finally {
                setLoading(false);
            }
        };
        if (id) fetchProject();
    }, [id]);

    if (loading) {
        return (
            <div className="flex bg-black min-h-screen text-white font-sans items-center justify-center">
                <div className="animate-spin h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent"></div>
            </div>
        );
    }

    if (!project) return <div className="text-white text-center pt-20">Project not found</div>;

    // Use fetched images or placeholder
    const images = project.images && project.images.length > 0
        ? project.images
        : ["https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200"];

    return (
        <div className="flex bg-black min-h-screen text-white font-sans pb-16 lg:pb-0">
            <div className="hidden lg:block">
                <InstagramSidebar isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />
            </div>

            <div className="flex-1 lg:ml-64">
                {/* Mobile Header (Standard) */}
                <div className="md:hidden">
                    <MobileHeader />
                </div>

                {/* Desktop-ish Header / Navigation */}
                <div className="hidden md:flex items-center px-8 py-4 border-b border-[#262626] sticky top-0 bg-black z-20">
                    <Link href="/projects" className="mr-4 text-gray-400 hover:text-white transition-colors">
                        <ArrowLeft size={24} />
                    </Link>
                    <h1 className="text-xl font-bold">Posts</h1>
                </div>

                <main className="max-w-4xl mx-auto md:py-8 lg:flex lg:gap-8 lg:items-start lg:justify-center">

                    {/* Left Column: Media Carousel */}
                    <div className="w-full lg:max-w-xl bg-black border border-[#262626] rounded-sm overflow-hidden">
                        {/* Mobile Back Button Overlay */}
                        <Link href="/projects" className="absolute top-4 left-4 z-10 p-2 bg-black/50 rounded-full md:hidden text-white backdrop-blur-md">
                            <ArrowLeft size={20} />
                        </Link>

                        <div className="relative aspect-square w-full bg-[#1a1a1a]">
                            <Image
                                src={images[currentImageIndex]}
                                alt={project.title}
                                fill
                                className="object-cover"
                                priority
                            />

                            {/* Carousel Dots */}
                            {images.length > 1 && (
                                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5 z-10">
                                    {images.map((_, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setCurrentImageIndex(idx)}
                                            className={`w-1.5 h-1.5 rounded-full transition-colors ${currentImageIndex === idx ? 'bg-white' : 'bg-white/40'}`}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Column: Details & Comments style */}
                    <div className="flex-1 w-full lg:max-w-[350px] bg-black border-l-0 lg:border lg:border-[#262626] lg:h-[600px] flex flex-col">

                        {/* Header (User/Post Info) */}
                        <div className="flex items-center justify-between p-4 border-b border-[#262626]">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 relative rounded-full overflow-hidden border border-[#262626]">
                                    <Image src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300" alt="Om" fill className="object-cover" />
                                </div>
                                <span className="font-semibold text-sm">om_salunke_dev</span>
                            </div>
                            <MoreHorizontal size={20} />
                        </div>

                        {/* Scrollable Content Area */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-800">
                            {/* Description as "Comment" */}
                            <div className="flex gap-3">
                                <div className="w-8 h-8 relative rounded-full overflow-hidden flex-shrink-0">
                                    <Image src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300" alt="Om" fill className="object-cover" />
                                </div>
                                <div className="text-sm">
                                    <span className="font-semibold mr-2">{project.title}</span> <br />
                                    <span className="whitespace-pre-line text-gray-200">{project.content}</span>
                                    <div className="text-gray-500 text-xs mt-2 uppercase tracking-wide">
                                        {new Date(project.createdAt).toLocaleDateString()}
                                    </div>
                                </div>
                            </div>

                            {/* Tech Stack Tags */}
                            <div className="pl-11 flex flex-wrap gap-2">
                                {project.techStack && project.techStack.map((tech, i) => (
                                    <span key={i} className="bg-[#262626] text-blue-300 text-xs px-2 py-1 rounded hover:bg-[#363636] cursor-default transition-colors">
                                        #{tech.replace(/\s+/g, '').toLowerCase()}
                                    </span>
                                ))}
                            </div>

                            {/* Links */}
                            <div className="pl-11 flex flex-col gap-2 mt-2">
                                {project.liveUrl && (
                                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-blue-400 text-sm hover:underline font-semibold">
                                        <ExternalLink size={14} /> Live Demo
                                    </a>
                                )}
                                {project.githubUrl && (
                                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-300 text-sm hover:text-white font-semibold">
                                        <Github size={14} /> Source Code
                                    </a>
                                )}
                            </div>

                        </div>

                        {/* Actions Footer */}
                        <div className="p-4 border-t border-[#262626] bg-black mt-auto">
                            <div className="flex justify-between items-center mb-3">
                                <div className="flex items-center gap-4">
                                    <Heart size={24} className="hover:text-gray-400 cursor-pointer" />
                                    <MessageCircle size={24} className="hover:text-gray-400 cursor-pointer" />
                                    <Send size={24} className="hover:text-gray-400 cursor-pointer" />
                                </div>
                                <Bookmark size={24} className="hover:text-gray-400 cursor-pointer" />
                            </div>
                            <div className="font-semibold text-sm mb-1">{(project.likes || 0).toLocaleString()} likes</div>
                            <div className="text-[10px] text-gray-500 uppercase">
                                {new Date(project.createdAt).toDateString()}
                            </div>

                            {/* Add Comment Input */}
                            <div className="flex items-center gap-2 mt-3 pt-3 border-t border-[#262626]">
                                <div className="w-6 h-6 rounded-full bg-gray-700"></div>
                                <input type="text" placeholder="Add a comment..." className="bg-transparent text-sm flex-1 outline-none placeholder-gray-500" />
                                <button className="text-blue-500 text-sm font-semibold hover:text-white">Post</button>
                            </div>
                        </div>

                    </div>

                </main>
            </div>
            <BottomNav />
        </div>
    );
}
