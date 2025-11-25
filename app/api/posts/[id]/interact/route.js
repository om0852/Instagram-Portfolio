// app/api/posts/[id]/interact/route.js
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Post from "../../../../../models/postSchema";
import { connectToDatabase } from "../../../../../utils/db";
// POST /api/posts/:id/interact
// body: { action: 'like'|'comment'|'save', like?: boolean, text?: string, save?: boolean }
export async function POST(request, { params }) {
  try {
    await connectToDatabase();
    // `params` can be a Promise in some Next.js versions. Resolve if needed.
    const _params = params && typeof params.then === "function" ? await params : params;
    const { id } = _params || {};
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid id" }, { status: 400 });
    }

    const body = await request.json();
    const { action } = body;
    if (!action) {
      return NextResponse.json(
        { error: "action is required" },
        { status: 400 }
      );
    }

    if (action === "like") {
      const { like } = body;
      if (typeof like !== "boolean") {
        return NextResponse.json(
          { error: "like must be boolean" },
          { status: 400 }
        );
      }
      const inc = like ? 1 : -1;
      console.log(`[interact] like action for post ${id}, like=${like}, inc=${inc}`);
      const post = await Post.findByIdAndUpdate(
        id,
        { $inc: { likes: inc } },
        { new: true }
      ).lean();
      console.log(`[interact] updated post likes ->`, post && post.likes);
      if (!post)
        return NextResponse.json({ error: "Post not found" }, { status: 404 });
      return NextResponse.json({ data: { likes: post.likes } });
    }

    if (action === "comment") {
      const { text } = body;
      if (!text || !text.trim()) {
        return NextResponse.json(
          { error: "text is required" },
          { status: 400 }
        );
      }
      const newComment = { text: text.trim(), createdAt: new Date() };
      const post = await Post.findByIdAndUpdate(
        id,
        { $push: { comments: newComment }, $inc: { commentsCount: 1 } },
        { new: true }
      ).lean();
      if (!post)
        return NextResponse.json({ error: "Post not found" }, { status: 404 });
      // return the newly added comment and updated count
      return NextResponse.json({
        data: { comment: newComment, commentsCount: post.commentsCount },
      });
    }

    if (action === "save") {
      const { save } = body;
      if (typeof save !== "boolean") {
        return NextResponse.json(
          { error: "save must be boolean" },
          { status: 400 }
        );
      }
      const inc = save ? 1 : -1;
      const post = await Post.findByIdAndUpdate(
        id,
        { $inc: { savedCount: inc } },
        { new: true }
      ).lean();
      if (!post)
        return NextResponse.json({ error: "Post not found" }, { status: 404 });
      return NextResponse.json({ data: { savedCount: post.savedCount } });
    }

    return NextResponse.json({ error: "unknown action" }, { status: 400 });
  } catch (error) {
    console.error(`/api/posts/${params.id}/interact error:`, error);
    return NextResponse.json(
      { error: "Failed to perform interaction" },
      { status: 500 }
    );
  }
}
