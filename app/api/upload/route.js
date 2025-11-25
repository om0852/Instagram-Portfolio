// app/api/upload/route.js
import { NextResponse } from "next/server";
import { put } from "@vercel/blob";

export const runtime = "edge"; // Vercel Blob works great with edge

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // file is a Blob (from browser)
    const blob = await put(file.name, file, {
      access: "public", // makes it accessible via URL
    });

    // blob.url = public URL
    return NextResponse.json({ url: blob.url });
  } catch (err) {
    console.error("Upload error:", err);
    return NextResponse.json(
      { error: "Failed to upload file" },
      { status: 500 }
    );
  }
}
