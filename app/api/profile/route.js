import { NextResponse } from "next/server";
import { connectToDatabase } from "@/utils/db";
import User from "@/models/userSchema";
import Post from "@/models/postSchema";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        await connectToDatabase();

        // Fetch the main user (singe user portfolio for now)
        const user = await User.findOne({ username: "om_salunke_dev" });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        // Fetch recent posts/projects for the grid
        // In a real app we might paginate or filter by tab
        const projects = await Post.find({ type: "project" }).sort({ createdAt: -1 }).limit(9);

        // Calculate stats dynamic if needed, or rely on cached User stats
        // Let's do a quick real-time count for accuracy
        const projectsCount = await Post.countDocuments({ type: "project" });

        return NextResponse.json({
            success: true,
            data: {
                user: {
                    ...user.toObject(),
                    projectsCount // override with real count if desired
                },
                projects
            },
        });
    } catch (error) {
        console.error("Profile API error:", error);
        return NextResponse.json({ error: "Failed to fetch profile" }, { status: 500 });
    }
}
