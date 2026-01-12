import { NextResponse } from "next/server";
import { connectToDatabase } from "@/utils/db";
import Post from "@/models/postSchema";

export async function POST(req) {
    try {
        await connectToDatabase();

        // XtraCarbon Project
        const xtraCarbonProject = {
            type: "project",
            title: "XtraCarbon",
            subtitle: "Blockchain Carbon Credit Registry",
            content: "🌍 Empowering Climate Action, One Block at a Time! ♻️\n\nXtraCarbon is a blockchain-based Universal Carbon Credit Registry bringing transparency, security, and inclusivity to global carbon markets! 🌱\n\n✨ Key Features:\n• Buy Carbon Credits from verified projects 🛒\n• Retire Credits to offset emissions 🌿\n• Real-time Portfolio Management 📊\n• Digital Certificates 🏆\n• Transparent Blockchain Records ⛓️\n• Credit Distribution Tracking 📈\n\nBuilding the future of sustainable finance! 💚",
            images: [
                "/posts/xtra-carbon/hero.png",
                "/posts/xtra-carbon/dashboard.png",
                "/posts/xtra-carbon/portfolio.png",
            ],
            tags: [
                "#blockchain",
                "#climateaction",
                "#carboncredits",
                "#sustainability",
                "#web3",
                "#typescript",
                "#nextjs",
                "#greentech"
            ],
            techStack: [
                "TypeScript",
                "Next.js",
                "Blockchain",
                "JavaScript",
                "CSS"
            ],
            githubUrl: "https://github.com/XtraFusion/XtraCarbon",
            liveUrl: "https://xtra-carbon.vercel.app/",
            thumbnailUrl: "/posts/xtra-carbon/hero.png",
            isPinned: true,
            likes: 0,
            views: 0,
            shares: 0,
            commentsCount: 0,
        };

        // Check if already exists
        const existing = await Post.findOne({ title: "XtraCarbon", type: "project" });
        if (existing) {
            return NextResponse.json(
                { error: "XtraCarbon project already exists" },
                { status: 400 }
            );
        }

        // Create the project
        const project = await Post.create(xtraCarbonProject);

        return NextResponse.json({
            success: true,
            message: "XtraCarbon project created successfully! 🌍",
            data: project,
        });
    } catch (error) {
        console.error("Error creating XtraCarbon project:", error);
        return NextResponse.json(
            { error: "Failed to create project", details: error.message },
            { status: 500 }
        );
    }
}
