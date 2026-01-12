// models/Post.js
import { Schema, models, model } from "mongoose";

const PostSchema = new Schema(
  {
    // "project" = main portfolio projects
    // "post"    = normal updates
    // "reel"    = short video demos
    type: {
      type: String,
      enum: ["project", "post", "reel"],
      required: true,
      default: "project",
    },

    // Common fields
    title: { type: String, required: true },   // e.g. "AI Cab Pooling Platform"
    subtitle: { type: String },
    content: { type: String },
    images: [{ type: String }],
    tags: [{ type: String }],

    // Project-specific / shared
    techStack: [{ type: String }],
    githubUrl: { type: String },
    liveUrl: { type: String },
    caseStudyUrl: { type: String },

    // Reel-specific
    videoUrl: { type: String },       // used when type === "reel"
    thumbnailUrl: { type: String },

    // Meta
    isPinned: { type: Boolean, default: false },
    isSaved: { type: Boolean, default: false }, // For "Saved" tab
    order: { type: Number, default: 0 },

    // Simple analytics
    likes: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
    shares: { type: Number, default: 0 },

    // Interaction details
    comments: [
      {
        text: { type: String },
        createdAt: { type: Date, default: Date.now },
      },
    ],
    commentsCount: { type: Number, default: 0 },
    savedCount: { type: Number, default: 0 },

    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const Post = models.Post || model("Post", PostSchema);
export default Post;
