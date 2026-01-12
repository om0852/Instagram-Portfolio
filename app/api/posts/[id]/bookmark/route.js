import { NextResponse } from "next/server";
import { connectToDatabase } from "@/utils/db";
import Post from "@/models/postSchema";

export async function POST(req, { params }) {
    try {
        await connectToDatabase();
        const { id } = await params;

        const post = await Post.findById(id);

        if (!post) {
            return NextResponse.json({ success: false, error: "Post not found" }, { status: 404 });
        }

        // Toggle 'isSaved' state (Portfolio Owner Logic)
        // AND increment/decrement savedCount for analytics
        const newSavedState = !post.isSaved;

        const updatedPost = await Post.findByIdAndUpdate(
            id,
            {
                isSaved: newSavedState,
                $inc: { savedCount: newSavedState ? 1 : -1 }
            },
            { new: true }
        );

        return NextResponse.json({ success: true, data: updatedPost });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
