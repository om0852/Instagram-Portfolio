import { NextResponse } from "next/server";
import { connectToDatabase } from "@/utils/db";
import Story from "@/models/storySchema";

export async function POST(req, { params }) {
    try {
        await connectToDatabase();
        const { id } = await params;
        const body = await req.json();

        const story = await Story.findByIdAndUpdate(
            id,
            {
                $push: { comments: { text: body.text } }
            },
            { new: true }
        );

        if (!story) {
            return NextResponse.json({ success: false, error: "Story not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: story });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
