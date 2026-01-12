import { NextResponse } from "next/server";
import { connectToDatabase } from "@/utils/db";
import Post from "@/models/postSchema";

export async function POST(req) {
    try {
        await connectToDatabase();

        // 3D Shirt Customizer Announcement Post
        const shirtCustomizerPost = {
            type: "post",
            title: "om.salunke",
            subtitle: "Om Salunke • Developer",
            content: "👕 Just Built a 3D Shirt Customizer! 🎨\n\nCreate custom t-shirt designs with real-time 3D visualization using React & Three.js! 🚀\n\n✨ Features:\n• Live 3D model updates 🔄\n• Color customization 🌈\n• Logo uploads 📤\n• Interactive controls 🎮\n\nE-commerce meets 3D graphics! 💫\n\n#React #ThreeJS #3D #WebGL",
            images: [
                "/posts/shirt-customizer/hero.png",
                "/posts/shirt-customizer/colors.png",
            ],
            tags: [
                "#react",
                "#threejs",
                "#3d",
                "#productcustomization",
                "#ecommerce",
                "#webgl",
            ],
            techStack: ["React", "Three.js", "Vite", "WebGL"],
            liveUrl: "https://3dshirt-customizer.vercel.app/",
            githubUrl: "https://github.com/om0852/3d-shirt-customizer",
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
            content: { $regex: "3D Shirt Customizer" }
        });
        if (existing) {
            return NextResponse.json(
                { error: "3D Shirt Customizer post already exists" },
                { status: 400 }
            );
        }

        // Create the post
        const post = await Post.create(shirtCustomizerPost);

        return NextResponse.json({
            success: true,
            message: "3D Shirt Customizer post created successfully! 👕",
            data: post,
        });
    } catch (error) {
        console.error("Error creating 3D Shirt Customizer post:", error);
        return NextResponse.json(
            { error: "Failed to create post", details: error.message },
            { status: 500 }
        );
    }
}
