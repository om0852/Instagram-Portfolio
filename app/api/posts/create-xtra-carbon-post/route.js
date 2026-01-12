import { NextResponse } from "next/server";
import { connectToDatabase } from "@/utils/db";
import Post from "@/models/postSchema";

export async function POST(req) {
    try {
        await connectToDatabase();

        // XtraCarbon Announcement Post
        const xtraCarbonPost = {
            type: "post",
            title: "om.salunke",
            subtitle: "Om Salunke • Developer",
            content: "🌍 Building for a Greener Future! 🌱\n\nExcited to share XtraCarbon - a blockchain-based Universal Carbon Credit Registry! ♻️\n\nThis platform brings transparency and security to carbon markets through:\n• Portfolio management for carbon credits 📊\n• Verified project marketplace 🛒\n• Real-time impact tracking 📈\n• Digital certificate generation 🏆\n\nTechnology meets sustainability! 💚 #ClimateAction",
            images: [
                "/posts/xtra-carbon/hero.png",
                "/posts/xtra-carbon/dashboard.png",
            ],
            tags: [
                "#blockchain",
                "#climatetech",
                "#carboncredits",
                "#web3",
                "#sustainability",
                "#typescript",
            ],
            techStack: ["TypeScript", "Next.js", "Blockchain"],
            liveUrl: "https://xtra-carbon.vercel.app/",
            githubUrl: "https://github.com/XtraFusion/XtraCarbon",
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
            content: { $regex: "XtraCarbon" }
        });
        if (existing) {
            return NextResponse.json(
                { error: "XtraCarbon post already exists" },
                { status: 400 }
            );
        }

        // Create the post
        const post = await Post.create(xtraCarbonPost);

        return NextResponse.json({
            success: true,
            message: "XtraCarbon post created successfully! 🌍",
            data: post,
        });
    } catch (error) {
        console.error("Error creating XtraCarbon post:", error);
        return NextResponse.json(
            { error: "Failed to create post", details: error.message },
            { status: 500 }
        );
    }
}
