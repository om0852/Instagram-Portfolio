import { NextResponse } from "next/server";
import { connectToDatabase } from "@/utils/db";
import Post from "@/models/postSchema";

export async function POST(req) {
    try {
        await connectToDatabase();

        // 3D Shirt Customizer Project
        const shirtCustomizerProject = {
            type: "project",
            title: "3D Shirt Customizer",
            subtitle: "Interactive 3D Product Configurator",
            content: "👕 Design Your Perfect Shirt in 3D! 🎨\n\nInteractive 3D shirt customization tool built with React and Three.js! Create unique designs with real-time 3D visualization! ✨\n\n🚀 Features:\n• Real-time 3D shirt model rendering 🔄\n• Instant color customization 🎨\n• Logo and pattern upload 📤\n• Interactive camera controls 📹\n• Realistic fabric textures 👔\n• Export custom designs 💾\n\nBringing product customization to life! 🌟",
            images: [
                "/posts/shirt-customizer/hero.png",
                "/posts/shirt-customizer/colors.png",
                "/posts/shirt-customizer/design.png",
            ],
            tags: [
                "#threejs",
                "#3d",
                "#react",
                "#productcustomization",
                "#ecommerce",
                "#webgl",
                "#customizer",
                "#design"
            ],
            techStack: [
                "React",
                "Three.js",
                "Vite",
                "WebGL",
                "JavaScript"
            ],
            githubUrl: "https://github.com/om0852/3d-shirt-customizer",
            liveUrl: "https://3dshirt-customizer.vercel.app/",
            thumbnailUrl: "/posts/shirt-customizer/hero.png",
            isPinned: false,
            likes: 0,
            views: 0,
            shares: 0,
            commentsCount: 0,
        };

        // Check if already exists
        const existing = await Post.findOne({ title: "3D Shirt Customizer", type: "project" });
        if (existing) {
            return NextResponse.json(
                { error: "3D Shirt Customizer project already exists" },
                { status: 400 }
            );
        }

        // Create the project
        const project = await Post.create(shirtCustomizerProject);

        return NextResponse.json({
            success: true,
            message: "3D Shirt Customizer project created successfully! 👕",
            data: project,
        });
    } catch (error) {
        console.error("Error creating 3D Shirt Customizer project:", error);
        return NextResponse.json(
            { error: "Failed to create project", details: error.message },
            { status: 500 }
        );
    }
}
