import { NextResponse } from "next/server";
import { connectToDatabase } from "@/utils/db";
import Post from "@/models/postSchema";

export async function POST(req, { params }) {
  try {
    await connectToDatabase();
    const { id } = await params; // Await params for Next.js 15
    const body = await req.json();
    const { action } = body;

    const post = await Post.findById(id);
    if (!post) {
      return NextResponse.json({ success: false, error: "Post not found" }, { status: 404 });
    }

    let update = {};

    if (action === 'like') {
      const increment = body.like ? 1 : -1;
      update = { $inc: { likes: increment } };
    }
    else if (action === 'save') {
      // Toggle 'isSaved' for the portfolio owner view
      update = {
        isSaved: body.save,
        $inc: { savedCount: body.save ? 1 : -1 }
      };
    }
    else if (action === 'comment') {
      update = {
        $push: { comments: { text: body.text } },
        $inc: { commentsCount: 1 }
      };
    }

    const updatedPost = await Post.findByIdAndUpdate(id, update, { new: true });

    return NextResponse.json({ success: true, data: updatedPost });

  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
