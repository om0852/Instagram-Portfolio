import { NextResponse } from "next/server";
import { connectToDatabase } from "@/utils/db";
import Message from "@/models/messageSchema";

export async function GET(req) {
    try {
        await connectToDatabase();
        const { searchParams } = new URL(req.url);
        const senderName = searchParams.get("senderName");
        const isAdmin = searchParams.get("admin") === "true"; // Simple admin check

        if (isAdmin) {
            // Admin sees ALL conversations, sorted by date
            const messages = await Message.find().sort({ updatedAt: -1 });
            return NextResponse.json({ success: true, data: messages });
        }

        if (!senderName) {
            return NextResponse.json({ error: "Sender name required" }, { status: 400 });
        }

        // Visitor sees only their own messages
        console.log(`Querying for senderName: "${senderName}"`);
        const messages = await Message.find({ senderName: senderName }).sort({ updatedAt: -1 });
        console.log(`Found ${messages.length} threads for ${senderName}`);

        return NextResponse.json({ success: true, data: messages });

    } catch (error) {
        console.error("GET Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        await connectToDatabase();
        const body = await req.json();
        const { senderName, text, type, senderEmail, isAdminReply, messageId, image } = body;

        console.log("POST Body:", JSON.stringify(body, null, 2));

        // If it's an admin reply, we need to find the existing conversation and append
        if (isAdminReply && messageId) {
            console.log("Processing Admin Reply for ID:", messageId);
            const messageThread = await Message.findById(messageId);
            if (!messageThread) return NextResponse.json({ error: "Message not found" }, { status: 404 });

            messageThread.messages.push({
                text: text || "Image",
                image,
                isReply: true,
                createdAt: new Date()
            });
            messageThread.status = "replied";
            await messageThread.save();
            return NextResponse.json({ success: true, data: messageThread });
        }

        // Visitor sending a message
        let conversation = await Message.findOne({ senderName: senderName, type: type || 'general' });
        console.log(`Visitor POST: Found conversation? ${!!conversation} for ${senderName} / ${type}`);

        if (conversation) {
            conversation.messages.push({ text: text || "Image", image, isReply: false });
            conversation.status = "unread";
            await conversation.save();
            console.log("Updated existing conversation:", conversation._id);
        } else {
            conversation = await Message.create({
                senderName,
                senderEmail,
                type: type || 'general',
                messages: [{ text: text || "Image", image, isReply: false }],
                status: "unread"
            });
            console.log("Created NEW conversation:", conversation._id);
        }

        return NextResponse.json({ success: true, data: conversation });

    } catch (error) {
        console.error("POST Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
