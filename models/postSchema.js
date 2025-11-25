// models/Post.js
import { Schema, models, model } from "mongoose";

/**
 * Post = anything that appears in your feed:
 * - type: "project" → main portfolio projects
 * - type: "post"    → normal updates, thoughts, achievements, etc.
 */

const PostSchema = new Schema(
  {
    // "project" or "post"
    type: {
      type: String,
      enum: ["project", "post"],
      required: true,
      default: "project",
    },

    // Common fields
    title: { type: String, required: true },           // e.g. "AI Cab Pooling Platform"
    subtitle: { type: String },                        // short subheading / one-liner
    content: { type: String },                         // long description / caption
    images: [{ type: String }],                        // screenshots, cover images
    tags: [{ type: String }],                          // e.g. ["Hackathon", "Web App"]

    // Project-specific fields (used when type = "project")
    techStack: [{ type: String }],                     // ["Next.js", "Node", "MongoDB"]
    githubUrl: { type: String },
    liveUrl: { type: String },                         // deployed link
    caseStudyUrl: { type: String },                    // optional blog / detailed page link

    // Meta
    isPinned: { type: Boolean, default: false },       // show on top of feed
    order: { type: Number, default: 0 },               // custom sort if needed

    // Analytics / social-style stuff if you want
    likes: { type: Number, default: 0 },
    views: { type: Number, default: 0 },

    // Future: which user created it (for multi-user, if needed)
    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true, // createdAt, updatedAt
  }
);

// Avoid model overwrite error in Next.js
const Post = models.Post || model("Post", PostSchema);
export default Post;
