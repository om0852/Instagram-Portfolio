import { NextResponse } from "next/server";
import { connectToDatabase } from "@/utils/db";
import Story from "@/models/storySchema";

export async function POST(req) {
    try {
        await connectToDatabase();

        // Hackathon 5: Mumbai Hacks
        const hackathon5 = {
            title: "Mumbai Hacks 🌆",
            ownerName: "Om Salunke",
            media: [
                {
                    url: "/stories/hackathon5/slide1.png",
                    type: "image",
                    duration: 5000,
                    caption: "🎯 SELECTED! Our Carbon Credit MRV Blockchain project got us through the first round! 🚀\n\nSubmitted our PPT & demo video 📊 and boom - we're heading to Mumbai for the offline round! 💯\n\nFirst time visiting Mumbai! The excitement was unreal! 🎉\n\n#MumbaiHacks #FirstSelection #BlockchainProject #TeamWork",
                },
                {
                    url: "/stories/hackathon5/slide2.png",
                    type: "image",
                    duration: 5000,
                    caption: "😱 THE CROWD WAS MASSIVE!\n\n3,500+ participants! 🔥 One of India's largest hackathons! 🇮🇳\n\nLong queues everywhere... but we managed to enter relatively quickly! 🏃‍♂️💨\n\nThe energy was INSANE! Never experienced anything like this before! ⚡\n\n#MassiveEvent #TeamExperience #HackathonVibes",
                },
                {
                    url: "/stories/hackathon5/slide3.png",
                    type: "image",
                    duration: 5000,
                    caption: "🏢 INSIDE THE VENUE!\n\nHuge hall, perfectly organized! 🎯 Proper tables, seating, everything sorted! 👌\n\nGot bands & phone stands as welcome gifts! 🎁\n\nInauguration ceremony begins... and it's officially ON! 🔥\n\nTime to build something amazing! 💻✨\n\n#WellOrganized #HackathonStarts #ReadyToCode",
                },
                {
                    url: "/stories/hackathon5/slide4.png",
                    type: "image",
                    duration: 5000,
                    caption: "❌ NETWORK DOWN!\n\nWi-Fi crashed 🛜❌ Mobile internet? Not working either! 📵\n\nWaited until 12 PM hoping it'd fix... but NOPE! 😓\n\nDecision time: Move outside to find better connectivity! 🚶‍♂️\n\nChallenges make it interesting, right? 💪\n\n#NetworkIssues #StayingPositive #AdaptAndOvercome",
                },
                {
                    url: "/stories/hackathon5/slide5.png",
                    type: "image",
                    duration: 5000,
                    caption: "⏰ 3:00 AM GRIND!\n\nCoding outside the hall since afternoon 💻 Still going strong! 💪\n\nWi-Fi came back but... unstable connection 😅\n\nDoesn't matter - we're LOCKED IN! 🔒 Carbon Credit MRV system taking shape! ⛓️\n\nSleep? Never heard of it! ☕😴\n\n#LateNightCoding #Dedication #HustleMode #3AMCrew",
                },
                {
                    url: "/stories/hackathon5/slide6.png",
                    type: "image",
                    duration: 5000,
                    caption: "✅ MVP SUBMITTED!\n\nBeat the deadline! ⏱️ Despite ALL the challenges - network issues, working outside, unstable Wi-Fi 📡\n\nWe completed our Carbon Credit MRV Blockchain System! ⛓️🌱\n\nExhausted but RELIEVED! 😮‍💨\n\nNow... the waiting game begins... 🤞\n\n#Submitted #MVPDone #TeamEffort #MissionAccomplished",
                },
                {
                    url: "/stories/hackathon5/slide7.png",
                    type: "image",
                    duration: 5000,
                    caption: "💔 Didn't make top 3... heartbreaking for the team 😢\n\nBUT...\n\n✨ The EXPOSURE was incredible!\n📈 Learned SO MUCH!\n🌟 One of India's LARGEST hackathons!\n💪 Overcame MASSIVE challenges!\n🚀 Grew as developers and as a team!\n\nThis experience? PRICELESS! 🏆\n\nOn to the next one! 🎯\n\n#LessonsLearned #KeepGrowing #Experience #NextLevel #MumbaiHacks",
                },
            ],
            isPinned: true,
            likes: 0,
            views: 0,
            metadata: {
                hackathonNumber: 5,
                location: "Mumbai, India",
                year: "2024",
                topic: "Carbon Credit MRV System using Blockchain",
                participants: "3,500+",
                organizer: "TEAM",
                challenges: ["Network connectivity issues", "Working outside venue", "Unstable Wi-Fi", "Massive crowd"],
            },
        };

        // Check if story already exists
        const existing = await Story.findOne({ "metadata.hackathonNumber": 5 });
        if (existing) {
            return NextResponse.json(
                { error: "Mumbai Hacks story already exists" },
                { status: 400 }
            );
        }

        // Create the story
        const story = await Story.create(hackathon5);

        return NextResponse.json({
            success: true,
            message: "Mumbai Hacks story created successfully! 🌆",
            data: story,
        });
    } catch (error) {
        console.error("Error creating Mumbai Hacks story:", error);
        return NextResponse.json(
            { error: "Failed to create story", details: error.message },
            { status: 500 }
        );
    }
}
