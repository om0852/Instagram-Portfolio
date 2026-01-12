import { NextResponse } from "next/server";
import { connectToDatabase } from "@/utils/db";
import Post from "@/models/postSchema";

export async function POST(req) {
    try {
        await connectToDatabase();

        // Red Green Light Project
        const redGreenLightProject = {
            type: "project",
            title: "Red Light Green Light",
            subtitle: "Multiplayer Typing Game for GDGC Events",
            content: "🎮 Red Light, Green Light - Typing Edition! ⌨️\n\nMultiplayer typing game for GDGC tech events! Students type when it's GREEN, freeze when it's RED - organizer controls the lights in real-time! 🚦\n\n✨ Game Features:\n• Real-time multiplayer with WebSockets 🌐\n• Organizer light control dashboard 🎛️\n• Multiple students play simultaneously 👥\n• Live leaderboard and scoring 🏆\n• Perfect for tech event warm-ups! 🎯\n\nTurning Squid Game into a coding challenge! 💻",
            images: [
                "https://placehold.co/800x600/0EA471/FFFFFF?text=Green+Light+GO",
                "https://placehold.co/800x600/DC3545/FFFFFF?text=Red+Light+STOP",
                "https://placehold.co/800x600/6C757D/FFFFFF?text=Multiplayer+Leaderboard",
            ],
            tags: [
                "#game",
                "#typing",
                "#multiplayer",
                "#websocket",
                "#gdgc",
                "#techevent",
                "#nextjs",
                "#realtime"
            ],
            techStack: [
                "Next.js",
                "WebSockets",
                "JavaScript",
                "Socket.io",
                "Tailwind CSS"
            ],
            githubUrl: "https://github.com/om0852/RedGreenLight",
            liveUrl: "https://red-green-light-one.vercel.app/",
            thumbnailUrl: "https://placehold.co/800x600/0EA471/FFFFFF?text=Red+Green+Light",
            isPinned: false,
            likes: 0,
            views: 0,
            shares: 0,
            commentsCount: 0,
        };

        // Check if already exists
        const existing = await Post.findOne({ title: "Red Light Green Light", type: "project" });
        if (existing) {
            return NextResponse.json(
                { error: "Red Green Light project already exists" },
                { status: 400 }
            );
        }

        // Create the project
        const project = await Post.create(redGreenLightProject);

        return NextResponse.json({
            success: true,
            message: "Red Green Light project created successfully! 🎮",
            data: project,
        });
    } catch (error) {
        console.error("Error creating Red Green Light project:", error);
        return NextResponse.json(
            { error: "Failed to create project", details: error.message },
            { status: 500 }
        );
    }
}
