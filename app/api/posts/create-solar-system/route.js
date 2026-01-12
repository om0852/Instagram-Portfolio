import { NextResponse } from "next/server";
import { connectToDatabase } from "@/utils/db";
import Post from "@/models/postSchema";

export async function POST(req) {
    try {
        await connectToDatabase();

        // Solar System Project
        const solarSystemProject = {
            type: "project",
            title: "Solar System 3D",
            subtitle: "Interactive 3D Solar System Visualization",
            content: "🌌 Explore the Cosmos in 3D! 🪐\n\nInteractive 3D visualization of our Solar System built with Three.js! Experience the beauty of celestial mechanics in your browser! ✨\n\n🚀 Features:\n• Realistic planet textures and rendering 🌍\n• Accurate orbital paths and animations ⭕\n• Interactive camera controls 📹\n• Beautiful star field background ⭐\n• Smooth WebGL-powered 3D graphics 💫\n• Responsive design for all devices 📱\n\nBringing space exploration to the web! 🔭",
            images: [
                "/posts/solar-system/hero.png",
                "/posts/solar-system/planets.png",
                "/posts/solar-system/animation.png",
            ],
            tags: [
                "#threejs",
                "#3d",
                "#webgl",
                "#solarsystem",
                "#space",
                "#visualization",
                "#animation",
                "#astronomy"
            ],
            techStack: [
                "Three.js",
                "Vite",
                "JavaScript",
                "WebGL",
                "CSS3"
            ],
            githubUrl: "https://github.com/om0852/solar-system",
            liveUrl: "https://solarsystem-six-tawny.vercel.app/",
            thumbnailUrl: "/posts/solar-system/hero.png",
            isPinned: false,
            likes: 0,
            views: 0,
            shares: 0,
            commentsCount: 0,
        };

        // Check if already exists
        const existing = await Post.findOne({ title: "Solar System 3D", type: "project" });
        if (existing) {
            return NextResponse.json(
                { error: "Solar System project already exists" },
                { status: 400 }
            );
        }

        // Create the project
        const project = await Post.create(solarSystemProject);

        return NextResponse.json({
            success: true,
            message: "Solar System project created successfully! 🌌",
            data: project,
        });
    } catch (error) {
        console.error("Error creating Solar System project:", error);
        return NextResponse.json(
            { error: "Failed to create project", details: error.message },
            { status: 500 }
        );
    }
}
