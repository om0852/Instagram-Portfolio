import { NextResponse } from "next/server";
import { connectToDatabase } from "@/utils/db";
import Post from "@/models/postSchema";

export async function POST(req) {
    try {
        await connectToDatabase();

        // Multi-UI Project
        const multiUIProject = {
            type: "project",
            title: "Multi-UI",
            subtitle: "Open Source React Component Library",
            content: "🚀 Excited to share my FIRST OPEN SOURCE PROJECT! 🎉\n\nMulti-UI is a versatile React component library designed for Next.js with MULTIPLE design variants for each component! 💎\n\n✨ What makes it special?\n• 30+ variants for each component 🎨\n• Next.js 14+ native support ⚡\n• TypeScript ready 📘\n• Tailwind CSS integration 🎭\n• Powerful CLI tool for easy setup 🛠️\n\nBuilt with passion and ready for the dev community! 🌟",
            images: [
                "/posts/multi-ui/hero.png",
                "/posts/multi-ui/components.png",
                "/posts/multi-ui/features.png",
            ],
            tags: [
                "#opensource",
                "#reactjs",
                "#nextjs",
                "#typescript",
                "#tailwindcss",
                "#webdev",
                "#componentlibrary",
                "#multiui"
            ],
            techStack: [
                "React",
                "Next.js",
                "TypeScript",
                "Tailwind CSS",
                "MongoDB",
                "GitHub"
            ],
            githubUrl: "https://github.com/om0852/multi-ui",
            liveUrl: "https://www.multi-ui.in/",
            thumbnailUrl: "/posts/multi-ui/hero.png",
            isPinned: true,
            likes: 0,
            views: 0,
            shares: 0,
            commentsCount: 0,
        };

        // Check if already exists
        const existing = await Post.findOne({ title: "Multi-UI", type: "project" });
        if (existing) {
            return NextResponse.json(
                { error: "Multi-UI project already exists" },
                { status: 400 }
            );
        }

        // Create the project
        const project = await Post.create(multiUIProject);

        return NextResponse.json({
            success: true,
            message: "Multi-UI project created successfully! 🚀",
            data: project,
        });
    } catch (error) {
        console.error("Error creating Multi-UI project:", error);
        return NextResponse.json(
            { error: "Failed to create project", details: error.message },
            { status: 500 }
        );
    }
}
