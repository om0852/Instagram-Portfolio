import { NextResponse } from "next/server";
import { connectToDatabase } from "@/utils/db";
import Post from "@/models/postSchema";

export async function POST(req) {
    try {
        await connectToDatabase();

        // Red Green Light Announcement Post
        const redGreenLightPost = {
            type: "post",
            title: "om.salunke",
            subtitle: "Om Salunke • Developer",
            content: "🎮 Built Red Light Green Light for GDGC Events! 🚦\n\nMultiplayer typing game where students race when GREEN, freeze when RED! Perfect for tech event icebreakers! ⌨️\n\nOrganizers control the lights in real-time while multiple students compete! Built with Next.js & WebSockets! 💻\n\nSquid Game + Coding = Fun! 🎯\n\n#GameDev #WebSockets #GDGC",
            images: [
                "https://placehold.co/800x600/0EA471/FFFFFF?text=Green+Light",
                "https://placehold.co/800x600/DC3545/FFFFFF?text=Red+Light",
            ],
            tags: [
                "#game",
                "#typing",
                "#multiplayer",
                "#websocket",
                "#nextjs",
                "#gdgc",
            ],
            techStack: ["Next.js", "WebSockets", "Socket.io"],
            liveUrl: "https://red-green-light-one.vercel.app/",
            githubUrl: "https://github.com/om0852/RedGreenLight",
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
            content: { $regex: "Red Light Green Light" }
        });
        if (existing) {
            return NextResponse.json(
                { error: "Red Green Light post already exists" },
                { status: 400 }
            );
        }

        // Create the post
        const post = await Post.create(redGreenLightPost);

        return NextResponse.json({
            success: true,
            message: "Red Green Light post created successfully! 🎮",
            data: post,
        });
    } catch (error) {
        console.error("Error creating Red Green Light post:", error);
        return NextResponse.json(
            { error: "Failed to create post", details: error.message },
            { status: 500 }
        );
    }
}
