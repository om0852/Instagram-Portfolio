import { Schema, models, model } from "mongoose";

const MediaItem = new Schema(
  {
    url: { type: String, required: true },
    type: { type: String, enum: ["image", "video"], required: true },
    duration: { type: Number }, // optional duration in ms for images, video duration in ms
    thumbnail: { type: String }, // optional thumbnail for videos
    caption: { type: String },
    link: { type: String },
  },
  { _id: false }
);

const StorySchema = new Schema(
  {
    title: { type: String },
    caption: { type: String },
    media: { type: [MediaItem], default: [] },
    likes: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
    comments: [
      {
        text: { type: String },
        createdAt: { type: Date, default: Date.now },
      },
    ],
    isPinned: { type: Boolean, default: false },
    // optional owner reference (kept as string for now to avoid adding User model)
    ownerName: { type: String },
    metadata: { type: Schema.Types.Mixed },
  },
  { timestamps: true }
);

// Force recompilation if schema changed (Development hack)
if (process.env.NODE_ENV === "development" && models.Story) {
  delete models.Story;
}

const Story = models.Story || model("Story", StorySchema);
export default Story;
