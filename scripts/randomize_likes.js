
const mongoose = require('mongoose');

// Define specific schema parts needed for update
const postSchema = new mongoose.Schema({
    type: { type: String, required: true },
    title: { type: String, required: true },
    likes: { type: Number, default: 0 },
}, { strict: false, timestamps: true });

const Post = mongoose.models.Post || mongoose.model('Post', postSchema);

async function main() {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
        console.error("MONGODB_URI missing");
        process.exit(1);
    }

    try {
        await mongoose.connect(uri);
        console.log("Connected to MongoDB");

        const projects = await Post.find({ type: "project" });
        console.log(`Found ${projects.length} projects.`);

        for (const p of projects) {
            // Random likes between 42 and 800
            const randomLikes = Math.floor(Math.random() * (800 - 42 + 1)) + 42;
            p.likes = randomLikes;
            await p.save();
            console.log(`Updated "${p.title}" likes to ${randomLikes}`);
        }

        console.log("All projects updated.");
        process.exit(0);
    } catch (err) {
        console.error("Error:", err);
        process.exit(1);
    }
}

main();
