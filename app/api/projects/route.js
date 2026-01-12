import { NextResponse } from "next/server";
import { connectToDatabase } from "@/utils/db";
import Post from "@/models/postSchema";

export async function GET(req) {
    try {
        await connectToDatabase();

        // Fetch only projects, sorted by order or creation date
        const projects = await Post.find({ type: "project" }).sort({ createdAt: -1 });

        return NextResponse.json({ success: true, data: projects });
    } catch (error) {
        console.error("Projects API Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
