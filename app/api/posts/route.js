// app/api/posts/route.js
import { NextResponse } from "next/server";
import Post from "../../../models/postSchema";
import { connectToDatabase } from "../../../utils/db";

// GET /api/posts?type=project|post|reel
export async function GET(request) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type"); // optional

    const filter = {};
    if (["project", "post", "reel"].includes(type)) {
      filter.type = type;
    }

    const posts = await Post.find(filter)
      .sort({ isPinned: -1, order: 1, createdAt: -1 })
      .lean();

    return NextResponse.json({ data: posts });
  } catch (error) {
    console.error("GET /api/posts error:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}

// POST /api/posts
export async function POST(request) {
  try {
    await connectToDatabase();

    const body = await request.json();

    const {
      type = "project",
      title,
      subtitle,
      content,
      images = [],
      tags = [],
      techStack = [],
      githubUrl,
      liveUrl,
      caseStudyUrl,
      videoUrl,
      thumbnailUrl,
      isPinned = false,
      order = 0,
    } = body;

    if (!title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    // Optional basic validation for reel
    if (type === "reel" && !videoUrl) {
      return NextResponse.json(
        { error: "videoUrl is required when type is 'reel'" },
        { status: 400 }
      );
    }

    const post = await Post.create({
      type,
      title,
      subtitle,
      content,
      images,
      tags,
      techStack,
      githubUrl,
      liveUrl,
      caseStudyUrl,
      videoUrl,
      thumbnailUrl,
      isPinned,
      order,
    });

    return NextResponse.json({ data: post }, { status: 201 });
  } catch (error) {
    console.error("POST /api/posts error:", error);
    return NextResponse.json(
      { error: "Failed to create post" },
      { status: 500 }
    );
  }
}
