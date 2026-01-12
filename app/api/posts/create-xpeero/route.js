import { NextResponse } from "next/server";
import { connectToDatabase } from "@/utils/db";
import Post from "@/models/postSchema";

export async function POST(req) {
    try {
        await connectToDatabase();

        // Xpeero Project
        const xpeeroProject = {
            type: "project",
            title: "Xpeero",
            subtitle: "Secure P2P File Sharing Platform",
            content: "📁 Share Files Securely and Fast! ⚡\n\nXpeero is a modern file sharing platform offering lightning-fast peer-to-peer transfers with end-to-end encryption! 🔒\n\n✨ Choose Your Sharing Method:\n• Multi P2P Share - Create rooms for real-time file sharing 👥\n• Quick Share - Generate instant one-time links 🔗\n\n🚀 Key Features:\n• Direct browser-to-browser transfers ⚡\n• End-to-end encryption 🔐\n• No file size limits 📦\n• Ephemeral sharing (files don't stay on servers) 🌐\n• Lightning fast P2P connections 💨\n\nSecure, fast, and privacy-focused file sharing! 💜",
            images: [
                "/posts/xpeero/hero.png",
                "/posts/xpeero/p2p.png",
                "/posts/xpeero/features.png",
            ],
            tags: [
                "#filesharing",
                "#p2p",
                "#encryption",
                "#privacy",
                "#webrtc",
                "#security",
                "#webdev",
                "#nextjs"
            ],
            techStack: [
                "Next.js",
                "WebRTC",
                "TypeScript",
                "End-to-End Encryption",
                "P2P"
            ],
            githubUrl: "https://github.com/om0852/xpeero",
            liveUrl: "https://xpeero.vercel.app/",
            thumbnailUrl: "/posts/xpeero/hero.png",
            isPinned: true,
            likes: 0,
            views: 0,
            shares: 0,
            commentsCount: 0,
        };

        // Check if already exists
        const existing = await Post.findOne({ title: "Xpeero", type: "project" });
        if (existing) {
            return NextResponse.json(
                { error: "Xpeero project already exists" },
                { status: 400 }
            );
        }

        // Create the project
        const project = await Post.create(xpeeroProject);

        return NextResponse.json({
            success: true,
            message: "Xpeero project created successfully! 📁",
            data: project,
        });
    } catch (error) {
        console.error("Error creating Xpeero project:", error);
        return NextResponse.json(
            { error: "Failed to create project", details: error.message },
            { status: 500 }
        );
    }
}
