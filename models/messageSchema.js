import { Schema, models, model } from "mongoose";

const MessageSchema = new Schema(
    {
        senderName: { type: String, required: true },
        senderEmail: { type: String }, // Optional, mostly for 'Inquiry'
        type: {
            type: String,
            enum: ["general", "inquiry"],
            default: "general",
        },
        messages: [
            {
                text: { type: String, required: true },
                image: { type: String }, // Base64 or URL
                isReply: { type: Boolean, default: false }, // true if from Admin
                createdAt: { type: Date, default: Date.now },
            }
        ],
        status: {
            type: String,
            enum: ["unread", "read", "replied"],
            default: "unread",
        },
    },
    { timestamps: true }
);

const Message = models.Message || model("Message", MessageSchema);
export default Message;
