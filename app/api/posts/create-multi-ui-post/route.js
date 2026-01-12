import { NextResponse } from "next/server";
import { connectToDatabase } from "@/utils/db";
import Post from "@/models/postSchema";

export async function POST(req) {
    try {
        await connectToDatabase();

        // Multi-UI Announcement Post
        const multiUIPost = {
            type: "post",
            title: "om.salunke",
            subtitle: "Om Salunke • Developer",
            content: "🎉 FIRST OPEN SOURCE CONTRIBUTION! 🚀\n\nJust launched Multi-UI - a React component library with 30+ variants for each component! 🎨\n\nIt's been an incredible journey building something for the developer community. From ideation to CLI implementation, every step taught me something new! 💡\n\nCheck it out and let me know what you think! ⭐",
            images: [
                "/posts/multi-ui/hero.png",
                "/posts/multi-ui/components.png",
            ],
            tags: [
                "#opensource",
                "#firstproject",
                "#reactjs",
                "#nextjs",
                "#webdevelopment",
                "#coding",
            ],
            techStack: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
            liveUrl: "https://www.multi-ui.in/",
            githubUrl: "https://github.com/om0852/multi-ui",
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
            content: { $regex: "FIRST OPEN SOURCE CONTRIBUTION" }
        });
        if (existing) {
            return NextResponse.json(
                { error: "Multi-UI post already exists" },
                { status: 400 }
            );
        }

        // Create the post
        const post = await Post.create(multiUIPost);

        return NextResponse.json({
            success: true,
            message: "Multi-UI post created successfully! 🎉",
            data: post,
        });
    } catch (error) {
        console.error("Error creating Multi-UI post:", error);
        return NextResponse.json(
            { error: "Failed to create post", details: error.message },
            { status: 500 }
        );
    }
}
