
const mongoose = require('mongoose');

// Define Schema
const MediaItem = new mongoose.Schema({
    url: { type: String, required: true },
    type: { type: String, enum: ["image", "video"], required: true },
    duration: Number,
    thumbnail: String,
    caption: String,
    link: String,
}, { _id: false });

const storySchema = new mongoose.Schema({
    title: String,
    caption: String,
    media: { type: [MediaItem], default: [] },
    likes: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
    comments: [{ text: String, createdAt: { type: Date, default: Date.now } }],
    isPinned: { type: Boolean, default: false },
    ownerName: String,
    metadata: mongoose.Schema.Types.Mixed,
}, { timestamps: true });

const Story = mongoose.models.Story || mongoose.model('Story', storySchema);

async function main() {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
        console.error("MONGODB_URI missing");
        process.exit(1);
    }

    try {
        await mongoose.connect(uri);
        console.log("Connected to MongoDB");

        // 1. Delete "Certs" and "Update" stories
        const deleteResult = await Story.deleteMany({
            title: { $in: ["Certs", "Update", "Update"] } // "Update" twice just to be sure of typos, but array handles it.
        });
        console.log(`Deleted ${deleteResult.deletedCount} stories (Certs/Update).`);

        // 2. Add New Story with the uploaded image
        const newStory = await Story.create({
            title: "Work 💻",
            isPinned: true,
            ownerName: "Om Salunke",
            media: [{
                url: "/stories/update_story.png",
                type: "image",
                duration: 5000,
                caption: "Latest work in progress! 🚀"
            }]
        });
        console.log("Created new story:", newStory.title);

        process.exit(0);
    } catch (err) {
        console.error("Error:", err);
        process.exit(1);
    }
}

main();
