import { NextResponse } from "next/server";
import { connectToDatabase } from "@/utils/db";
import Story from "@/models/storySchema";
import Post from "@/models/postSchema";

export async function GET() {
    try {
        await connectToDatabase();

        // Clear existing stories and posts to avoid duplicates
        await Story.deleteMany({});
        await Post.deleteMany({});

        const storiesData = [
            {
                title: "First Win 🥉",
                ownerName: "Om Salunke",
                isPinned: true, // Highlight
                media: [
                    {
                        type: "image",
                        url: "/stories/hackathon1/slide1.png",
                        duration: 8000,
                        caption: "🎓 My very first hackathon journey! Sanjivani K.B.P Polytechnic, Diploma 3rd Year. Nervous but excited to compete! 🚀✨"
                    },
                    {
                        type: "image",
                        url: "/stories/hackathon1/slide2.png",
                        duration: 8000,
                        caption: "😅 The Reality Check: Everyone around me had RGB gaming keyboards, fancy headsets, and pro setups... And there I was with just my small HP laptop 💻 But determination > equipment! 💪"
                    },
                    {
                        type: "image",
                        url: "/stories/hackathon1/slide3.png",
                        duration: 8000,
                        caption: "⚡ Plot Twist! Two competitions scheduled at the same time! 😱 Quick decision: Split the team! Rushanbh + Krushna → Project Competition | Om + Hrushikesh → Hackathon 🎯 Teamwork makes the dream work!"
                    },
                    {
                        type: "image",
                        url: "/stories/hackathon1/slide4.png",
                        duration: 8000,
                        caption: "💻 The BUILD Phase! Topic: Online Ticket Booking System 🎫 | Strategy: Hrushikesh handles Frontend magic ✨ | I tackle Backend logic 🛠️ | GitHub repo ready, code flowing, MVP complete! ✅ Time pressure is real! ⏰"
                    },
                    {
                        type: "image",
                        url: "/stories/hackathon1/slide5.png",
                        duration: 8000,
                        caption: "😰 THE PRESSURE! First judge round - feedback received ✅ | Live changes on the spot 💨 | Team miscommunication adding stress 😓 | Final presentation to the judges 🎤 | Heart racing, palms sweaty... giving it our ALL! 💯🔥"
                    },
                    {
                        type: "image",
                        url: "/stories/hackathon1/slide6.png",
                        duration: 8000,
                        caption: "🥉 WE DID IT! 3rd Place! 🏆 Prize: ₹2,000 (split equally among all 4 teammates) 💰 | First taste of victory! 🎉 From nervous beginners to winners! This is just the beginning! 🚀✨ #NeverGiveUp #HackathonWin"
                    }
                ],
                metadata: {
                    hackathonNumber: 1,
                    location: "Sanjivani K.B.P Polytechnic",
                    year: "Diploma 3rd Year",
                    topic: "Online Ticket Booking System",
                    rank: "3rd Place",
                    prize: "₹2000",
                    team: ["Om Salunke", "Hrushikesh", "Rushanbh", "Krushna"]
                }
            },
            {
                title: "Avinya Challenge 🏆",
                ownerName: "Om Salunke",
                isPinned: true,
                media: [
                    {
                        type: "image",
                        url: "/stories/hackathon2/slide1.png",
                        duration: 8000,
                        caption: "🏫 Degree 3rd Year! New hackathon, new team! Avinya at JSPM Rajarshi Shahu College, Tathawade 🛵 Reached on scooty with Nishant & Atharva. Morning inauguration vibes! Let's go! 🚀✨"
                    },
                    {
                        type: "image",
                        url: "/stories/hackathon2/slide2.png",
                        duration: 8000,
                        caption: "🧠 ROUND 1: APTITUDE! Only 1 teammate allowed. As team leader, I took the challenge! 💪 Out-of-box questions, 1 hour, intense pressure ⏰ Result: PASSED! ✅ 150+ students ELIMINATED! 😱 We survived!"
                    },
                    {
                        type: "image",
                        url: "/stories/hackathon2/slide3.png",
                        duration: 8000,
                        caption: "🎨 ROUND 2: Most UNIQUE challenge ever! 😮 Atharva alone in one room sees 2 images. Me + Nishant in another room. He describes, we recreate! 🖼️ Plot twist: Images were Stranger Things posters! They watched it, I didn't! 📺"
                    },
                    {
                        type: "image",
                        url: "/stories/hackathon2/slide4.png",
                        duration: 8000,
                        caption: "🥈 2ND RANK in Round 2! Our recreated images were nearly PERFECT! 🎯 Communication + teamwork = SUCCESS! 💪 From different rooms to victory! This is what collaboration looks like! 🔥✨ #TeamworkMakesTheDreamWork"
                    },
                    {
                        type: "image",
                        url: "/stories/hackathon2/slide5.png",
                        duration: 8000,
                        caption: "💻 FINAL ROUND: Blockchain Course Platform! Built MVP, finished EARLY, chilled before presentation 😎 Then... DISASTER! ⚠️ Technical glitch from organizers! 😱 Couldn't show demo on screen! Presentation time CUT SHORT! 😓💔"
                    },
                    {
                        type: "image",
                        url: "/stories/hackathon2/slide6.png",
                        duration: 8000,
                        caption: "🏅 5th Place... BUT WAIT! 💼 Got INVESTMENT OFFER from a guest for our 'Multi UI' project! 💰🚀 New contacts made, huge lessons learned! 📚 Sometimes the real victory isn't the rank, it's the opportunities! 🎉 #NeverStop"
                    }
                ],
                metadata: {
                    hackathonNumber: 2,
                    location: "JSPM Rajarshi Shahu College, Tathawade",
                    year: "Degree 3rd Year",
                    event: "Avinya",
                    topic: "Blockchain Course Platform",
                    rank: "5th Place",
                    specialAchievement: "Investment Offer for Multi UI",
                    team: ["Om Salunke", "Nishant", "Atharva"]
                }
            },
            {
                title: "Magnitude 1.0 💪",
                ownerName: "Om Salunke",
                isPinned: true,
                media: [
                    {
                        type: "image",
                        url: "/stories/hackathon3/slide1.png",
                        duration: 8000,
                        caption: "⚡ MAGNITUDE 1.0! D.Y. Patil College of Engineering 🏫 Same core team + NEW member Priti! 👋 Team of 4 ready to crush it! 💪 Growing stronger with each hackathon! 🚀✨"
                    },
                    {
                        type: "image",
                        url: "/stories/hackathon3/slide2.png",
                        duration: 8000,
                        caption: "🚕 THE CHALLENGE: Create a Cab Pooling System! 🤯 NOT easy! Complex ride-sharing logic, matching algorithms, blockchain integration 🔗 This is TOUGH! But we love challenges! 💪🔥"
                    },
                    {
                        type: "image",
                        url: "/stories/hackathon3/slide3.png",
                        duration: 8000,
                        caption: "🌙 ALL-NIGHT GRIND! Brainstorming marathon until sunrise ☀️ Coffee fueled coding session ☕💻 Sticky notes EVERYWHERE! 📝 Pushing our limits, no sleep mode activated! 😴❌ THIS is dedication! 💯🔥"
                    },
                    {
                        type: "image",
                        url: "/stories/hackathon3/slide4.png",
                        duration: 8000,
                        caption: "💡 BREAKTHROUGH MOMENT! We cracked it! 🎉 Amazing blockchain-based cab pooling solution created! 🚕⛓️ Innovation unlocked! Smart contracts, decentralized matching, transparent pricing! THIS WORKS! 🚀✨"
                    },
                    {
                        type: "image",
                        url: "/stories/hackathon3/slide5.png",
                        duration: 8000,
                        caption: "🎤 DEMO TIME! Showcasing our innovation to the judges! 🎯 Presenting the blockchain cab pooling platform! All that hard work on display! 💻 Fingers crossed! 🤞 Nervously excited! 😊💫"
                    },
                    {
                        type: "image",
                        url: "/stories/hackathon3/slide6.png",
                        duration: 8000,
                        caption: "Didn't win Top 3... 😔 BUT! 💪 Learned SO much! Built something amazing! 🚀 Pushed my limits further than ever! 📈 Experience > Trophy! 🏆 The journey taught us more than any prize could! 📚✨ #GrowthMindset #KeepPushing"
                    }
                ],
                metadata: {
                    hackathonNumber: 3,
                    location: "D.Y. Patil College of Engineering",
                    event: "Magnitude 1.0",
                    topic: "Blockchain Cab Pooling System",
                    outcome: "Did not place in top 3",
                    keyLearning: "Pushed limits, learned extensively",
                    team: ["Om Salunke", "Nishant", "Atharva", "Priti"]
                }
            },
            {
                title: "TENET - Builders 🔨",
                ownerName: "Om Salunke",
                isPinned: true,
                media: [
                    {
                        type: "image",
                        url: "/stories/hackathon4/slide1.png",
                        duration: 8000,
                        caption: "🎯 TENET HACKATHON! ASSIM IOT College, Pune 🏫 The journey continues! Ready to showcase our skills and innovation! Let's make an impact! 💪✨ #NextLevel"
                    },
                    {
                        type: "image",
                        url: "/stories/hackathon4/slide2.png",
                        duration: 8000,
                        caption: "✅ SELECTION ROUND CLEARED! Online PPT presentation - NAILED IT! 📊 Moving forward to the main event! 🚀 Our preparation paid off! Qualified and ready to compete! 💯🔥"
                    },
                    {
                        type: "image",
                        url: "/stories/hackathon4/slide3.png",
                        duration: 8000,
                        caption: "🌍 OUR VISION: Carbon Credit MRV System using Blockchain! ⛓️ Tackling climate change with technology! 🌱 Monitoring, Reporting, Verification - all decentralized! We chose to innovate for the planet! 💚🚀"
                    },
                    {
                        type: "image",
                        url: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800",
                        duration: 8000,
                        caption: "🛠️ BUILDING MODE ACTIVATED! Adding extra features beyond requirements! 💻 Going the extra mile! Innovation in action! 🚀 Smart contracts, real-time verification, transparent tracking - WE DID IT ALL! 💪✨"
                    },
                    {
                        type: "image",
                        url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800",
                        duration: 8000,
                        caption: "💪 THE TRUTH: We built the BEST solution compared to others! 🏆 Our tech was superior! Our features were comprehensive! We KNOW what we created was exceptional! Quality > Everything! 🔥💯"
                    },
                    {
                        type: "image",
                        url: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800",
                        duration: 8000,
                        caption: "🚀 Didn't win? WE'RE BUILDERS, NOT LOSERS! 💪 Created the best solution! 🏗️ Learned cutting-edge tech! Expanded our skills! 📈 Innovators NEVER lose - we GROW! Every hackathon makes us STRONGER! 🔥✨ #BuilderMindset"
                    }
                ],
                metadata: {
                    hackathonNumber: 4,
                    location: "ASSIM IOT College, Pune",
                    event: "TENET",
                    selectionRound: "Online PPT - Cleared",
                    topic: "Carbon Credit MRV System (Blockchain)",
                    outcome: "Built best solution",
                    mindset: "Builders, not losers - continuous growth",
                    team: ["Om Salunke", "Nishant", "Atharva", "Priti"]
                }
            },
            {
                ownerName: "Projects",
                isPinned: true, // Highlight
                media: [
                    {
                        type: "image",
                        url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800",
                        duration: 5000,
                        caption: "Humanize AI - Transforming text generation"
                    },
                    {
                        type: "image",
                        url: "https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?w=800",
                        duration: 5000,
                        caption: "Bluechipart - Web3 Asset Marketplace"
                    },
                    {
                        type: "image",
                        url: "https://images.unsplash.com/photo-1661956602116-aa6865609028?w=800",
                        duration: 5000,
                        caption: "Blockchain Cert Generation"
                    }
                ],
                title: "Projects"
            },
            {
                ownerName: "Certs",
                isPinned: true, // Highlight
                media: [
                    {
                        type: "image",
                        url: "https://images.unsplash.com/photo-1570616969692-54d6a5d085b1?w=800",
                        duration: 5000,
                        caption: "NPTEL Certified - Learning Analytics Tools"
                    }
                ],
                title: "Certs"
            },
            {
                ownerName: "om_salunke_dev",
                isPinned: false, // Active Story
                media: [
                    {
                        type: "image",
                        url: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800",
                        duration: 5000,
                        caption: "Working on the new portfolio 🎨 #NextJS"
                    }
                ],
                title: "Update"
            }
        ];

        const postsData = [
            {
                type: "project",
                title: "Fintech Dashboard",
                subtitle: "High-Frequency Trading Platform",
                content: "A real-time analytics dashboard for traders. Features include live stock charts, news aggregation, and automated trading bot integration. Built with Next.js and WebSockets.",
                images: [
                    "https://images.unsplash.com/photo-1611974765270-ca12586343bb?w=800",
                    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800"
                ],
                tags: ["#fintech", "#react", "#dashboard"],
                techStack: ["React", "Next.js", "Node.js", "Socket.io"],
                githubUrl: "https://github.com/omsalunke/fintech",
                liveUrl: "https://fintech-demo.com",
                likes: 342,
                savedCount: 45,
                comments: [{ text: "This UI is incredibly clean! 🔥" }, { text: "What chart library did you use?" }],
                isPinned: true
            },
            {
                type: "project",
                title: "Humanize AI",
                subtitle: "AI Text Humanizer",
                content: "A SaaS tool that paraphrases AI-generated content to bypass detection. Integrated with OpenAI API and custom NLP models.",
                images: ["https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800"],
                tags: ["#ai", "#nlp", "#saas"],
                techStack: ["Python", "FastAPI", "React"],
                likes: 890,
                savedCount: 120,
                comments: [{ text: "Game changer for content creators." }]
            },
            {
                type: "project",
                title: "Bluechipart",
                subtitle: "Web3 Asset Marketplace",
                content: "Fractional ownership of fine art using blockchain. Users can buy/trade NFTs representing shares of physical paintings.",
                images: ["https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?w=800"],
                tags: ["#web3", "#blockchain", "#nft"],
                techStack: ["Solidity", "Ether.js", "Next.js"],
                likes: 567,
                savedCount: 89
            },
            {
                type: "post",
                title: "om_salunke_dev",
                subtitle: "Hackathon Win 🏆",
                content: "Won 1st place at the UNESCO Youth Hackathon! Built a solution for sustainable water management using IoT sensors.",
                images: ["https://images.unsplash.com/photo-1596778402284-8398c7b09521?w=800"],
                tags: ["#hackathon", "#winner", "#iot"],
                likes: 1024,
                comments: [{ text: "Congrats Om!! 🎉" }, { text: "Well deserved." }]
            }
        ];

        await Story.insertMany(storiesData);
        await Post.insertMany(postsData);

        return NextResponse.json({ success: true, message: "Stories seeded successfully!" });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

