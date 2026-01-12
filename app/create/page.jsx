"use client";
import React, { useState } from "react";
import InstagramSidebar from "../_components/Sidebar";
import MobileHeader from "../_components/MobileHeader";
import BottomNav from "../_components/BottomNav";
import { ArrowLeft, Image as ImageIcon, MapPin, Smile, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { toast } from "sonner";

export default function CreatePage() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [step, setStep] = useState(1); // 1: Select, 2: Details
    const [selectedImage, setSelectedImage] = useState(null);
    const [caption, setCaption] = useState("");
    const [loading, setLoading] = useState(false);
    const [adminCode, setAdminCode] = useState("");

    const handleSubmit = async () => {
        if (adminCode !== "1234") {
            toast.error("🚫 Access Denied: Only the owner can post projects.");
            return;
        }

        setLoading(true);
        try {
            // In real app, upload image to S3/Cloudinary first
            // Here we use the selectedImage (mock URL)
            const newPost = {
                title: "New Project Proposal",
                type: "project",
                content: caption,
                images: [selectedImage],
                techStack: ["React", "Next.js"], // Mock data
                createdBy: "60d0fe4f5311236168a109ca" // Mock User ID
            };

            const res = await fetch('/api/posts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newPost)
            });

            if (res.ok) {
                toast.success("Project Proposed Successfully!");
                setTimeout(() => {
                    window.location.href = "/";
                }, 1500);
            } else {
                toast.error("Failed to submit project.");
            }
        } catch (error) {
            console.error(error);
            toast.error("Error submitting project.");
        } finally {
            setLoading(false);
        }
    };

    // Mock file selection
    const handleFileSelect = () => {
        // Just toggle a mock image for effect
        setSelectedImage("https://images.unsplash.com/photo-1517292987719-0369a794ec0f?w=800");
        setStep(2);
    };

    return (
        <div className="flex bg-black min-h-screen text-white font-sans pb-16 lg:pb-0">
            <div className="hidden lg:block">
                <InstagramSidebar isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />
            </div>

            <div className="flex-1 lg:ml-64 flex flex-col items-center justify-center bg-black md:bg-[#121212]">

                {/* Mobile Header */}
                <div className="w-full md:hidden fixed top-0 z-50">
                    <MobileHeader />
                </div>

                {/* Modal Container (Center on Desktop) */}
                <div className="w-full h-full md:h-auto md:max-w-[800px] md:aspect-[4/3] bg-[#262626] md:rounded-xl md:border md:border-[#363636] flex flex-col overflow-hidden mt-12 md:mt-0">

                    {/* Header */}
                    <div className="h-[44px] border-b border-[#363636] flex items-center justify-between px-4 bg-[#262626]">
                        {step === 1 ? (
                            <h1 className="font-semibold text-base mx-auto">Create new post</h1>
                        ) : (
                            <>
                                <button onClick={() => setStep(1)} className="text-white"><ArrowLeft size={24} /></button>
                                <h1 className="font-semibold text-base">New Project Inquiry</h1>
                                <button
                                    className="text-blue-500 font-semibold text-sm hover:text-white disabled:opacity-50"
                                    onClick={handleSubmit}
                                    disabled={loading}
                                >
                                    {loading ? "Sending..." : "Share"}
                                </button>
                            </>
                        )}
                    </div>

                    {/* Content Area */}
                    <div className="flex-1 flex flex-col md:flex-row bg-black relative">

                        {/* Step 1: Select Image/File (Left side or Full) */}
                        {(step === 1 || window.innerWidth >= 768) && (
                            <div className={`flex flex-col items-center justify-center bg-[#1a1a1a] transition-all duration-300
                        ${step === 1 ? 'w-full h-full p-10' : 'hidden md:flex md:w-[60%] border-r border-[#363636]'}
                    `}>
                                {selectedImage ? (
                                    <div className="relative w-full h-full">
                                        <Image src={selectedImage} alt="Preview" fill className="object-cover" />
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center">
                                        <div className="mb-4">
                                            <ImageIcon size={64} strokeWidth={1} />
                                        </div>
                                        <h3 className="text-xl font-light mb-4">Have an idea?</h3>
                                        <button
                                            onClick={handleFileSelect}
                                            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1.5 px-4 rounded-md text-sm transition-colors"
                                        >
                                            Select from computer
                                        </button>
                                        <p className="mt-8 text-gray-500 text-xs text-center max-w-xs">
                                            Start a conversation by "uploading" your project concept here.
                                        </p>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Step 2: Form (Right side) */}
                        {step === 2 && (
                            <div className="flex-1 bg-[#262626] p-4 flex flex-col text-sm h-full overflow-y-auto">

                                {/* User Row */}
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-8 h-8 relative rounded-full overflow-hidden">
                                        <Image src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300" alt="User" fill className="object-cover" />
                                    </div>
                                    <span className="font-semibold">om_salunke_dev</span>
                                </div>

                                {/* Caption Input */}
                                <textarea
                                    className="bg-transparent text-white resize-none w-full h-32 outline-none text-base placeholder-gray-400"
                                    placeholder="Describe your project idea... (e.g., A React-based e-commerce platform with stripe integration)"
                                    value={caption}
                                    onChange={(e) => setCaption(e.target.value)}
                                ></textarea>

                                <div className="h-[1px] bg-[#363636] my-2"></div>

                                {/* Admin Code Section */}
                                <div className="flex flex-col gap-2 py-2">
                                    <label className="text-sm text-gray-400">Admin Access Code (Required)</label>
                                    <input
                                        type="password"
                                        value={adminCode}
                                        onChange={(e) => setAdminCode(e.target.value)}
                                        placeholder="Enter admin PIN to post"
                                        className="bg-[#1a1a1a] text-white p-2 rounded border border-[#363636] focus:border-blue-500 outline-none transition-colors"
                                    />
                                </div>

                                <div className="h-[1px] bg-[#363636] my-1"></div>

                                {/* Fields */}
                                <div className="flex items-center justify-between py-3 cursor-pointer group">
                                    <div className="flex items-center gap-2 text-gray-200">
                                        <span className="text-sm">Add Location (Company Name)</span>
                                    </div>
                                    <MapPin size={20} className="text-gray-400 group-hover:text-white" />
                                </div>

                                <div className="h-[1px] bg-[#363636] my-1"></div>

                                <div className="flex items-center justify-between py-3 cursor-pointer group">
                                    <div className="flex items-center gap-2 text-gray-200">
                                        <span className="text-sm">Accessibility</span>
                                    </div>
                                    <ChevronRight size={20} className="text-gray-400 group-hover:text-white" />
                                </div>

                                <div className="h-[1px] bg-[#363636] my-1"></div>

                                <div className="flex items-center justify-between py-3 cursor-pointer group">
                                    <div className="flex items-center gap-2 text-gray-200">
                                        <span className="text-sm">Advanced Settings</span>
                                    </div>
                                    <ChevronRight size={20} className="text-gray-400 group-hover:text-white" />
                                </div>

                            </div>
                        )}
                    </div>
                </div>

            </div>
            <BottomNav />
        </div>
    );
}
