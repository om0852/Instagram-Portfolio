import { NextResponse } from "next/server";
import connectDB from "@/utils/db";
import Story from "@/models/storySchema";

export async function POST(req) {
    try {
        await connectDB();

        // Hackathon 1: First Win at Sanjivani
        const hackathon1 = {
            title: "First Win 🥉",
            ownerName: "Om Salunke",
            media: [
                {
                    url: "/stories/hackathon1/slide1.png",
                    type: "image",
                    duration: 5000,
                    caption: "First Hackathon at Sanjivani",
                },
                {
                    url: "/stories/hackathon1/slide2.png",
                    type: "image",
                    duration: 5000,
                    caption: "Small laptop, big dreams",
                },
                {
                    url: "/stories/hackathon1/slide3.png",
                    type: "image",
                    duration: 5000,
                    caption: "Team split decision",
                },
                {
                    url: "/stories/hackathon1/slide4.png",
                    type: "image",
                    duration: 5000,
                    caption: "Building the ticket booking system",
                },
                {
                    url: "/stories/hackathon1/slide5.png",
                    type: "image",
                    duration: 5000,
                    caption: "Pressure and presentation",
                },
                {
                    url: "/stories/hackathon1/slide6.png",
                    type: "image",
                    duration: 5000,
                    caption: "First victory - 3rd place!",
                },
            ],
            isPinned: true,
            likes: 0,
            views: 0,
            metadata: {
                hackathonNumber: 1,
                location: "Sanjivani K.B.P Polytechnic",
                year: "Diploma 3rd Year",
                topic: "Online Ticket Booking System",
                rank: "3rd Place",
                prize: "₹2000",
                team: ["Om Salunke", "Hrushikesh", "Rushanbh", "Krushna"],
            },
        };

        // Check if story already exists
        const existing = await Story.findOne({ "metadata.hackathonNumber": 1 });
        if (existing) {
            return NextResponse.json(
                { error: "Hackathon 1 story already exists" },
                { status: 400 }
            );
        }

        // Create the story
        const story = await Story.create(hackathon1);

        return NextResponse.json({
            success: true,
            message: "Hackathon 1 story created successfully!",
            data: story,
        });
    } catch (error) {
        console.error("Error creating hackathon story:", error);
        return NextResponse.json(
            { error: "Failed to create story", details: error.message },
            { status: 500 }
        );
    }
}
