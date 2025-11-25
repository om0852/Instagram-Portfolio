// app/admin/posts/page.jsx
"use client";

import React, { useState } from "react";

const initialFormState = {
  type: "project",
  title: "",
  subtitle: "",
  content: "",
  tags: "",
  techStack: "",
  githubUrl: "",
  liveUrl: "",
  caseStudyUrl: "",
};

export default function AdminPostsPage() {
  const [form, setForm] = useState(initialFormState);
  const [imageFiles, setImageFiles] = useState([]);
  const [videoFile, setVideoFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setImageFiles(Array.from(e.target.files || []));
  };

  const handleVideoChange = (e) => {
    setVideoFile(e.target.files?.[0] || null);
  };

  const uploadFileToBlob = async (file) => {
    const fd = new FormData();
    fd.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: fd,
    });

    if (!res.ok) {
      throw new Error("Upload failed");
    }

    const data = await res.json();
    return data.url; // blob URL
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    try {
      // 1️⃣ Upload images
      const imageUrls = [];
      for (const file of imageFiles) {
        const url = await uploadFileToBlob(file);
        imageUrls.push(url);
      }

      // 2️⃣ Upload video (if exists)
      let videoUrl = undefined;
      if (videoFile) {
        videoUrl = await uploadFileToBlob(videoFile);
      }

      // 3️⃣ Prepare payload for /api/posts
      const payload = {
        type: form.type,
        title: form.title,
        subtitle: form.subtitle || undefined,
        content: form.content || undefined,
        images: imageUrls,
        tags: form.tags
          ? form.tags.split(",").map((t) => t.trim()).filter(Boolean)
          : [],
        techStack: form.techStack
          ? form.techStack.split(",").map((t) => t.trim()).filter(Boolean)
          : [],
        githubUrl: form.githubUrl || undefined,
        liveUrl: form.liveUrl || undefined,
        caseStudyUrl: form.caseStudyUrl || undefined,
        videoUrl: videoUrl || undefined,
        // thumbnailUrl: you can pick first image or leave undefined
        thumbnailUrl: imageUrls[0] || undefined,
      };

      // 4️⃣ Create post
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || "Failed to create post");
      }

      setMessage("✅ Post created successfully!");
      setForm(initialFormState);
      setImageFiles([]);
      setVideoFile(null);
    } catch (err) {
      console.error(err);
      setMessage(`❌ ${err.message || "Something went wrong"}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex justify-center px-4 py-10">
      <div className="w-full max-w-3xl bg-zinc-900 rounded-2xl p-6 md:p-8 shadow-lg border border-zinc-800">
        <h1 className="text-2xl font-semibold mb-6">
          Admin – Create Post / Project / Reel
        </h1>

        {message && (
          <div className="mb-4 text-sm">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Type */}
          <div>
            <label className="block text-sm mb-1">Type</label>
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-md px-3 py-2 text-sm outline-none"
            >
              <option value="project">Project</option>
              <option value="post">Post</option>
              <option value="reel">Reel</option>
            </select>
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm mb-1">Title *</label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-md px-3 py-2 text-sm outline-none"
              placeholder="AI Cab Pooling Platform"
              required
            />
          </div>

          {/* Subtitle */}
          <div>
            <label className="block text-sm mb-1">Subtitle</label>
            <input
              name="subtitle"
              value={form.subtitle}
              onChange={handleChange}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-md px-3 py-2 text-sm outline-none"
              placeholder="Blockchain + AI-based ride sharing"
            />
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm mb-1">Content / Description</label>
            <textarea
              name="content"
              value={form.content}
              onChange={handleChange}
              rows={4}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-md px-3 py-2 text-sm outline-none resize-none"
              placeholder="Describe the project / post / reel..."
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm mb-1">Tags (comma separated)</label>
            <input
              name="tags"
              value={form.tags}
              onChange={handleChange}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-md px-3 py-2 text-sm outline-none"
              placeholder="Hackathon, Web App, Portfolio"
            />
          </div>

          {/* Tech Stack */}
          <div>
            <label className="block text-sm mb-1">
              Tech Stack (comma separated)
            </label>
            <input
              name="techStack"
              value={form.techStack}
              onChange={handleChange}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-md px-3 py-2 text-sm outline-none"
              placeholder="Next.js, Node.js, MongoDB, Tailwind"
            />
          </div>

          {/* Links – only really useful for projects */}
          <div className="grid md:grid-cols-3 gap-3">
            <div>
              <label className="block text-sm mb-1">GitHub URL</label>
              <input
                name="githubUrl"
                value={form.githubUrl}
                onChange={handleChange}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-md px-3 py-2 text-sm outline-none"
                placeholder="https://github.com/..."
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Live URL</label>
              <input
                name="liveUrl"
                value={form.liveUrl}
                onChange={handleChange}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-md px-3 py-2 text-sm outline-none"
                placeholder="https://project-demo.com"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Case Study URL</label>
              <input
                name="caseStudyUrl"
                value={form.caseStudyUrl}
                onChange={handleChange}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-md px-3 py-2 text-sm outline-none"
                placeholder="https://blog-or-notion-link.com"
              />
            </div>
          </div>

          {/* Images */}
          <div>
            <label className="block text-sm mb-1">
              Images (screenshots, thumbnails)
            </label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              className="block w-full text-sm text-gray-300
                         file:mr-4 file:py-2 file:px-4
                         file:rounded-md file:border-0
                         file:text-sm file:font-semibold
                         file:bg-purple-600 file:text-white
                         hover:file:bg-purple-700"
            />
            {imageFiles.length > 0 && (
              <p className="mt-1 text-xs text-gray-400">
                Selected {imageFiles.length} image(s)
              </p>
            )}
          </div>

          {/* Video (for reels or project demo) */}
          <div>
            <label className="block text-sm mb-1">
              Video (for reel or project demo)
            </label>
            <input
              type="file"
              accept="video/*"
              onChange={handleVideoChange}
              className="block w-full text-sm text-gray-300
                         file:mr-4 file:py-2 file:px-4
                         file:rounded-md file:border-0
                         file:text-sm file:font-semibold
                         file:bg-blue-600 file:text-white
                         hover:file:bg-blue-700"
            />
            {videoFile && (
              <p className="mt-1 text-xs text-gray-400">
                Selected: {videoFile.name}
              </p>
            )}
          </div>

          {/* Submit */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full md:w-auto px-6 py-2.5 rounded-md bg-gradient-to-r from-pink-500 via-purple-500 to-orange-400 text-sm font-semibold disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Saving..." : "Create Post"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
