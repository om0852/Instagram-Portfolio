// app/api/posts/[id]/route.js
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Post from "../../../../models/postSchema";
import { connectToDatabase } from "../../../../utils/db";

// GET /api/posts/:id
export async function GET(_request, { params }) {
  try {
    await connectToDatabase();
    // Resolve params if it's a Promise (Next.js may provide params as a Promise)
    const _params = params && typeof params.then === "function" ? await params : params;
    const { id } = _params || {};
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid id" }, { status: 400 });
    }

    const post = await Post.findById(id).lean();
    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json({ data: post });
  } catch (error) {
    console.error(`GET /api/posts/${params.id} error:`, error);
    return NextResponse.json(
      { error: "Failed to fetch post" },
      { status: 500 }
    );
  }
}

// PUT /api/posts/:id
export async function PUT(request, { params }) {
  try {
    await connectToDatabase();
    const _params = params && typeof params.then === "function" ? await params : params;
    const { id } = _params || {};
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid id" }, { status: 400 });
    }

    const updates = await request.json();

    // If updating to reel, make sure videoUrl exists
    if (updates.type === "reel" && !updates.videoUrl) {
      return NextResponse.json(
        { error: "videoUrl is required when type is 'reel'" },
        { status: 400 }
      );
    }

    const post = await Post.findByIdAndUpdate(id, updates, {
      new: true,
    });

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json({ data: post });
  } catch (error) {
    console.error(`PUT /api/posts/${params.id} error:`, error);
    return NextResponse.json(
      { error: "Failed to update post" },
      { status: 500 }
    );
  }
}

// DELETE /api/posts/:id
export async function DELETE(_request, { params }) {
  try {
    await connectToDatabase();
    const _params = params && typeof params.then === "function" ? await params : params;
    const { id } = _params || {};
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid id" }, { status: 400 });
    }

    const deleted = await Post.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(`DELETE /api/posts/${params.id} error:`, error);
    return NextResponse.json(
      { error: "Failed to delete post" },
      { status: 500 }
    );
  }
}
