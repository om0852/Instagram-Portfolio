import { NextResponse } from "next/server";
import { connectToDatabase } from "@/utils/db";
import Story from "@/models/storySchema";

export async function GET(req) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(req.url);
    const limit = parseInt(searchParams.get("limit")) || 20;

    // Fetch active stories (you might want to filter by createdAt > 24h ago for real ephemeral)
    // For portfolio, we might keep them longer or have "isPinned" for Highlights
    const stories = await Story.find({})
      .sort({ isPinned: -1, createdAt: -1 })
      .limit(limit);

    return NextResponse.json({ success: true, data: stories });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectToDatabase();
    const body = await req.json();

    const story = await Story.create(body);
    return NextResponse.json({ success: true, data: story }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
