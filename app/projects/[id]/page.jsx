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

    // Interaction States
    const [isLiked, setIsLiked] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const [commentText, setCommentText] = useState("");
    const [submittingComment, setSubmittingComment] = useState(false);

    React.useEffect(() => {
        const fetchProject = async () => {
            try {
                const res = await fetch(`/api/projects/${id}`);
                const data = await res.json();
                if (data.success) {
                    setProject(data.data);
                    setIsSaved(data.data.isSaved || false);
                    // Check local storage or session for 'liked' state if needed, 
                    // otherwise default false for visitor
                }
            } catch (error) {
                console.error("Failed to fetch project", error);
            } finally {
                setLoading(false);
            }
        };
        if (id) fetchProject();
    }, [id]);

    const handleLike = async () => {
        const newLikeState = !isLiked;
        setIsLiked(newLikeState);
        setProject(prev => ({ ...prev, likes: prev.likes + (newLikeState ? 1 : -1) }));

        try {
            await fetch(`/api/posts/${id}/interact`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ action: "like", like: newLikeState })
            });
        } catch (error) {
            console.error("Failed to like", error);
        }
    };

    const handleSave = async () => {
        const newSaveState = !isSaved;
        setIsSaved(newSaveState);

        try {
            await fetch(`/api/posts/${id}/interact`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ action: "save", save: newSaveState })
            });
        } catch (error) {
            console.error("Failed to save", error);
        }
    };

    // Toast State
    const [toast, setToast] = useState({ show: false, message: "" });

    const showToast = (message) => {
        setToast({ show: true, message });
        setTimeout(() => setToast({ show: false, message: "" }), 3000);
    };

    const handleShare = async () => {
        const url = window.location.href;
        if (navigator.share) {
            try {
                await navigator.share({
                    title: project.title,
                    text: `Check out ${project.title} by Om Salunke`,
                    url: url
                });
            } catch (err) {
                console.log("Error sharing", err);
            }
        } else {
            navigator.clipboard.writeText(url);
            showToast("Link copied to clipboard!");
        }
    };

    const handleComment = async () => {
        if (!commentText.trim()) return;
        setSubmittingComment(true);

        const newComment = {
            text: commentText,
            createdAt: new Date().toISOString(),
            user: { username: "visitor" } // Simplified for now
        };

        // Optimistic update
        setProject(prev => ({
            ...prev,
            comments: [...(prev.comments || []), newComment]
        }));
        setCommentText("");

        try {
            await fetch(`/api/posts/${id}/interact`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ action: "comment", text: newComment.text })
            });
        } catch (error) {
            console.error("Failed to post comment", error);
            // Revert on failure (optional, skipping for simplicity)
        } finally {
            setSubmittingComment(false);
        }
    };

    if (loading) return <div className="min-h-screen bg-black text-white flex items-center justify-center">Loading...</div>;
    if (!project) return <div className="min-h-screen bg-black text-white flex items-center justify-center">Project not found</div>;

    const images = project.images && project.images.length > 0
        ? project.images
        : ["https://placehold.co/600x400?text=No+Image"];

    const projectUser = project.user || {
        username: "omsalunke",
        avatar: "/omsalunke_photo.jpg",
        fullName: "Om Salunke"
    };

    return (
        <div className="flex bg-black min-h-screen text-white font-sans pb-16 lg:pb-0 relative">
            {/* Toast Notification */}
            {toast.show && (
                <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-[#262626] text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in-down border border-gray-700 flex items-center gap-2">
                    <span className="text-sm font-semibold">{toast.message}</span>
                </div>
            )}

            <InstagramSidebar isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />

            <div className="flex-1 lg:ml-64">
                {/* Mobile Header (Standard) */}
                <div className="md:hidden">
                    <MobileHeader setIsMobileMenuOpen={setIsMobileMenuOpen} />
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
                                    <Image src={projectUser.avatar || "/omsalunke_photo.jpg"} alt={projectUser.username} fill className="object-cover" />
                                </div>
                                <span className="font-semibold text-sm">{projectUser.username}</span>
                            </div>
                            <MoreHorizontal size={20} />
                        </div>

                        {/* Scrollable Content Area */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-800">
                            {/* Description - Simplified: Just Text */}
                            <div className="flex gap-3">
                                <div className="text-sm w-full">
                                    <h2 className="font-bold text-base mb-1">{project.title}</h2>
                                    <div className="whitespace-pre-line text-gray-200 leading-relaxed font-light">{project.description}</div>
                                    <div className="text-gray-500 text-[10px] mt-2 uppercase tracking-wide">{project.date}</div>
                                </div>
                            </div>

                            {/* Tech Stack Tags */}
                            <div className="flex flex-wrap gap-2">
                                {project.techStack.map(tech => (
                                    <span key={tech} className="bg-[#1c1c1c] text-blue-400 text-xs px-2.5 py-1 rounded-md border border-[#333]">
                                        #{tech.replace(/\s+/g, '').toLowerCase()}
                                    </span>
                                ))}
                            </div>

                            {/* Links */}
                            {project.links && (
                                <div className="flex flex-col gap-2 mt-2">
                                    {project.links.demo && (
                                        <a href={project.links.demo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-blue-400 text-sm hover:underline font-semibold">
                                            <ExternalLink size={14} /> Live Demo
                                        </a>
                                    )}
                                    {project.links.github && (
                                        <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-300 text-sm hover:text-white font-semibold">
                                            <Github size={14} /> Source Code
                                        </a>
                                    )}
                                </div>
                            )}

                            {/* Comments Section */}
                            {project.comments && project.comments.length > 0 && (
                                <div className="mt-4 border-t border-[#262626] pt-4">
                                    {project.comments.map((comment, index) => (
                                        <div key={index} className="flex gap-3 mb-3">
                                            <div className="w-8 h-8 relative rounded-full overflow-hidden flex-shrink-0 bg-gray-800">
                                                {/* Placeholder for commenter avatar */}
                                                <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">?</div>
                                            </div>
                                            <div className="text-sm">
                                                <span className="font-semibold mr-2">visitor</span>
                                                <span className="text-gray-200">{comment.text}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                        </div>

                        {/* Actions Footer */}
                        <div className="p-4 border-t border-[#262626] bg-black mt-auto">
                            <div className="flex justify-between items-center mb-3">
                                <div className="flex items-center gap-4">
                                    <Heart
                                        size={24}
                                        onClick={handleLike}
                                        className={`cursor-pointer transition-colors ${isLiked ? "fill-red-500 text-red-500" : "hover:text-gray-400"}`}
                                    />
                                    <MessageCircle size={24} className="hover:text-gray-400 cursor-pointer" />
                                    <Send size={24} onClick={handleShare} className="hover:text-gray-400 cursor-pointer" />
                                </div>
                                <Bookmark
                                    size={24}
                                    onClick={handleSave}
                                    className={`cursor-pointer transition-colors ${isSaved ? "fill-white text-white" : "hover:text-gray-400"}`}
                                />
                            </div>
                            <div className="font-semibold text-sm mb-1">{project.likes.toLocaleString()} likes</div>
                            <div className="text-[10px] text-gray-500 uppercase">1 DAY AGO</div>

                            {/* Add Comment Input */}
                            <div className="flex items-center gap-2 mt-3 pt-3 border-t border-[#262626]">
                                <div className="w-6 h-6 rounded-full bg-gray-700">
                                    <Image src={projectUser.avatar || "/omsalunke_photo.jpg"} alt={projectUser.username} width={24} height={24} className="rounded-full object-cover" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Add a comment..."
                                    className="bg-transparent text-sm flex-1 outline-none placeholder-gray-500"
                                    value={commentText}
                                    onChange={(e) => setCommentText(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleComment()}
                                />
                                <button
                                    onClick={handleComment}
                                    disabled={!commentText.trim() || submittingComment}
                                    className="text-blue-500 text-sm font-semibold hover:text-white disabled:opacity-50"
                                >
                                    Post
                                </button>
                            </div>
                        </div>

                    </div>

                </main>
            </div>
            <BottomNav />
        </div>
    );
}
