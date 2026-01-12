import { NextResponse } from "next/server";
import { connectToDatabase } from "@/utils/db";
import Post from "@/models/postSchema";

export async function POST(req) {
    try {
        await connectToDatabase();

        // Solar System Announcement Post
        const solarSystemPost = {
            type: "post",
            title: "om.salunke",
            subtitle: "Om Salunke • Developer",
            content: "🌌 Journey Through the Solar System! 🪐\n\nBuilt an interactive 3D visualization of our solar system using Three.js! Explore planets, orbits, and the beauty of space right in your browser! 🚀\n\n✨ Features:\n• Realistic 3D planet rendering 🌍\n• Interactive controls 🎮\n• Smooth animations ⭕\n• Beautiful space visuals 🌟\n\nSpace meets web development! 🔭\n\n#ThreeJS #3D #WebGL #Space",
            images: [
                "/posts/solar-system/hero.png",
                "/posts/solar-system/planets.png",
            ],
            tags: [
                "#threejs",
                "#3d",
                "#webgl",
                "#solarsystem",
                "#webdev",
                "#animation",
            ],
            techStack: ["Three.js", "Vite", "JavaScript", "WebGL"],
            liveUrl: "https://solarsystem-six-tawny.vercel.app/",
            githubUrl: "https://github.com/om0852/solar-system",
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
            content: { $regex: "Solar System" }
        });
        if (existing) {
            return NextResponse.json(
                { error: "Solar System post already exists" },
                { status: 400 }
            );
        }

        // Create the post
        const post = await Post.create(solarSystemPost);

        return NextResponse.json({
            success: true,
            message: "Solar System post created successfully! 🌌",
            data: post,
        });
    } catch (error) {
        console.error("Error creating Solar System post:", error);
        return NextResponse.json(
            { error: "Failed to create post", details: error.message },
            { status: 500 }
        );
    }
}
