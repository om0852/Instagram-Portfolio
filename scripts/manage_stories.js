
const mongoose = require('mongoose');
// require('dotenv').config({ path: '.env.local' });
// If .env.local doesn't work/exist, try .env (user has .env open)

async function connectToDatabase() {
    if (mongoose.connection.readyState >= 1) return;
    // Hardcoding the connection string from what I can infer or using process.env
    // user has .env open, let's assume MONGODB_URI is in there. 
    // If I can't read .env easily in this script without dotenv, I might need to rely on the environment being set?
    // Actually, I can just peek at .env content first if needed, but I'll use dotenv.

    const uri = process.env.MONGODB_URI;
    if (!uri) {
        console.error("MONGODB_URI is not defined");
        process.exit(1);
    }

    return mongoose.connect(uri);
}

const storySchema = new mongoose.Schema({
    title: String,
    media: Array,
    likes: Number,
    views: Number,
    isPinned: Boolean,
    ownerName: String,
    comments: Array,
}, { timestamps: true });

const Story = mongoose.models.Story || mongoose.model('Story', storySchema);

async function main() {
    try {
        await connectToDatabase();
        console.log("Connected to DB");

        // 1. Delete "Certs"
        const deleteRes = await Story.findOneAndDelete({ title: "Certs" });
        if (deleteRes) console.log("Deleted Certs story:", deleteRes._id);
        else console.log("Certs story not found");

        // 2. Update "Update" story
        // Using FindOne just in case ID is dynamic, but title "Update" is unique enough
        const updateStory = await Story.findOne({ title: "Update" });
        if (updateStory) {
            updateStory.media[0].url = "/stories/update_story.png";
            // Update caption if needed, but keeping it simple
            updateStory.media[0].caption = "New Update! 🚀";
            await updateStory.save();
            console.log("Updated 'Update' story image to /stories/update_story.png");
        } else {
            console.log("'Update' story not found");
            // Optionally create it?
        }

        process.exit(0);
    } catch (error) {
        console.error("Error:", error);
        process.exit(1);
    }
}

main();
