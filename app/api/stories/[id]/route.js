import { NextResponse } from "next/server";
import Story from "../../../../models/storySchema";
import { connectToDatabase } from "../../../../utils/db";

export async function GET(request, { params }) {
  try {
    await connectToDatabase();
    const id = params?.id;
    const story = await Story.findById(id).lean();
    if (!story) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ data: story });
  } catch (error) {
    console.error("GET /api/stories/[id] error:", error);
    return NextResponse.json({ error: "Failed to fetch story" }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectToDatabase();
    const id = params?.id;
    await Story.findByIdAndDelete(id);
    return NextResponse.json({ data: true });
  } catch (error) {
    console.error("DELETE /api/stories/[id] error:", error);
    return NextResponse.json({ error: "Failed to delete story" }, { status: 500 });
  }
}
