import { NextResponse } from "next/server";
import { connectToDatabase } from "@/utils/db";
import Post from "@/models/postSchema";

export async function GET(req, { params }) {
    try {
        await connectToDatabase();
        const { id } = await params;

        const project = await Post.findById(id);

        if (!project) {
            return NextResponse.json({ error: "Project not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: project });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
