import { NextResponse } from "next/server";
import { connectToDatabase } from "@/utils/db";
import Post from "@/models/postSchema";

export async function POST(req) {
    try {
        await connectToDatabase();

        // Xpeero Announcement Post
        const xpeeroPost = {
            type: "post",
            title: "om.salunke",
            subtitle: "Om Salunke • Developer",
            content: "📁 Introducing Xpeero - Secure File Sharing Made Simple! ⚡\n\nBuilt a P2P file sharing platform with end-to-end encryption! 🔒\n\nShare files directly browser-to-browser without storing anything on servers. Privacy-first approach! 💜\n\n✨ Features:\n• Multi-user P2P rooms 👥\n• Quick one-time links 🔗\n• Lightning fast transfers ⚡\n• Zero server storage 🚫\n\n#WebRTC #FileSharing #Privacy",
            images: [
                "/posts/xpeero/hero.png",
                "/posts/xpeero/p2p.png",
            ],
            tags: [
                "#filesharing",
                "#p2p",
                "#privacy",
                "#webdev",
                "#encryption",
                "#nextjs",
            ],
            techStack: ["Next.js", "WebRTC", "TypeScript"],
            liveUrl: "https://xpeero.vercel.app/",
            githubUrl: "https://github.com/om0852/xpeero",
            thumbnailUrl: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=150",
            isPinned: false,
            likes: 0,
            views: 0,
            shares: 0,
            commentsCount: 0,
        };

        // Check if already exists
        const existing = await Post.findOne({
            title: "om.salunke",
            content: { $regex: "Xpeero" }
        });
        if (existing) {
            return NextResponse.json(
                { error: "Xpeero post already exists" },
                { status: 400 }
            );
        }

        // Create the post
        const post = await Post.create(xpeeroPost);

        return NextResponse.json({
            success: true,
            message: "Xpeero post created successfully! 📁",
            data: post,
        });
    } catch (error) {
        console.error("Error creating Xpeero post:", error);
        return NextResponse.json(
            { error: "Failed to create post", details: error.message },
            { status: 500 }
        );
    }
}
