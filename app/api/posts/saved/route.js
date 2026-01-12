import { NextResponse } from "next/server";
import { connectToDatabase } from "@/utils/db";
import Post from "@/models/postSchema";

export const dynamic = 'force-dynamic';

export async function GET(req) {
    try {
        await connectToDatabase();

        const savedPosts = await Post.find({ isSaved: true }).sort({ updatedAt: -1 });

        return NextResponse.json({ success: true, data: savedPosts });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
