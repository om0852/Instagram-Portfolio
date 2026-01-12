import { NextResponse } from "next/server";
import { connectToDatabase } from "@/utils/db";
import Post from "@/models/postSchema";

export const dynamic = 'force-dynamic';

export async function GET(req) {
    try {
        await connectToDatabase();
        const { searchParams } = new URL(req.url);
        const query = searchParams.get("q");

        let posts;

        if (query) {
            // Search mode: regex on title, tags, or techStack
            const regex = new RegExp(query, "i"); // case-insensitive
            posts = await Post.find({
                type: "project",
                $or: [
                    { title: regex },
                    { tags: { $in: [regex] } },
                    { techStack: { $in: [regex] } },
                    { "content": regex } // Optional: search content/description too
                ]
            })
                .sort({ createdAt: -1 })
                .limit(20);
        } else {
            // Explore mode: show popular posts (most liked) or random
            // For now, let's show most liked projects
            posts = await Post.find({ type: "project" })
                .sort({ likes: -1 })
                .limit(21);
        }

        return NextResponse.json({ success: true, data: posts });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
