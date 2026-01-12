import { NextResponse } from "next/server";
import { connectToDatabase } from "@/utils/db";
import User from "@/models/userSchema";
import Post from "@/models/postSchema";

export async function GET() {
    try {
        await connectToDatabase();

        // --- 1. Seed User ---
        const seedUser = {
            username: "om_salunke_dev",
            fullName: "Om Salunke",
            title: "Full Stack & Blockchain Developer",
            bio: "Full Stack | Blockchain Developer\nBased in Pune (Mah.), India\nSalunkeom474@gmail.com | 8390471333\nom.me | om_salunke | om0852",
            avatar: "/omsalunke_photo.jpg",

            // Detailed Categories
            skillsCategory: {
                languages: ["C", "C++", "Java", "Python", "Solidity", "Javascript"],
                frontend: ["ReactJS", "Nextjs", "Tailwind", "Sass", "VueJS", "AngularJs", "ReactNative"],
                backend: ["Nodejs", "Expressjs", "NestJs", "PHP", "Danjo"],
                deployment: ["Git", "Netlify", "Vercel", "Render", "Remix", "Truffle", "Gitlab", "Railway", "Docker"],
                tools: ["ComfyUI", "Zustand", "Redux", "Postman", "Ganche", "Metamask", "Hardhat"]
            },
            competitiveProgramming: "LeetCode",

            // Stats
            experienceYears: 2,
            certificationsCount: 10,

            experience: [
                {
                    role: "Fullstack Developer",
                    company: "Creatosaurus Pvt Ltd",
                    duration: "July - 2025 - present",
                    description: "Fullstack Developer responsibilities.",
                    logo: "https://ui-avatars.com/api/?name=Creatosaurus&background=0D8ABC&color=fff"
                },
                {
                    role: "Fullstack Developer",
                    company: "Eqvisor",
                    duration: "2024 - present",
                    description: "Develop the official website of eqvisor.",
                    logo: "https://ui-avatars.com/api/?name=Eqvisor&background=random"
                },
                {
                    role: "Tech Lead",
                    company: "ACES",
                    duration: "2025 - present",
                    description: "Develop the official ACES Website and manage college Personal Projects.",
                    logo: "https://ui-avatars.com/api/?name=ACES&background=random"
                },
                {
                    role: "Tech Co-ordinator",
                    company: "ACES",
                    duration: "2024 - 2025",
                    description: "Helping the technical team in organizing events and workshops.",
                    logo: "https://ui-avatars.com/api/?name=ACES&background=random"
                },
                {
                    role: "Web Co-ordinator",
                    company: "GDGC DYPCOE",
                    duration: "2024 - 2025",
                    description: "Made the official website and conducted multiple workshops.",
                    logo: "https://developers.google.com/community/gdg/images/logo-lockup-gdg-horizontal.png"
                },
                {
                    role: "Python Developer",
                    company: "Tech King Pvt Ltd",
                    duration: "June 2023 - July 2023",
                    description: "Python Developer intern/role.",
                    logo: "https://ui-avatars.com/api/?name=Tech+King&background=random"
                },
                {
                    role: "Web Developer",
                    company: "Tech King Pvt Ltd",
                    duration: "June 2023 - July 2023",
                    description: "Web Developer intern/role.",
                    logo: "https://ui-avatars.com/api/?name=Tech+King&background=random"
                }
            ],
            education: [
                {
                    institution: "D.Y. Patil College of Engineering, Akurdi, Pune, Maharashtra",
                    degree: "Bachelor of Engineering",
                    duration: "Nov 2024 – June 2027",
                    grade: "Pursuing",
                    logo: "https://ui-avatars.com/api/?name=DYP&background=random"
                },
                {
                    institution: "Sanjivani K.B.P Polytechnic, Kopargaon, Maharashtra",
                    degree: "Diploma in Computer Technology",
                    duration: "Aug 2021 – June 2024",
                    grade: "93.14%",
                    logo: "https://ui-avatars.com/api/?name=Sanjivani&background=random"
                }
            ],

            miniProjects: [
                "Xpeero", "3D Shirt Designer", "PCCOEManager", "ACES offical", "3D solar system", "Medicare", "QuickDual",
                "RedGreenLight", "Flappybird", "2048", "Eqvisor", "portflio2.0", "Taskify", "Primastore", "DigitalGramPanchayat",
                "UManager", "GetChai"
            ],

            achievements: [
                "3rd Position in Techbliz Hackthon (Sanjivani K.B.P Polytechnic,Pune)",
                "1st Position in Code War (Sanjivani K.B.P Polytechnic,Pune)",
                "5th Position in Avinay Hackthon(JSPM College of Engineering,Pune)",
                "Magnitude Hackthon Participation(D.Y.Patil College of Engineering,Pune)",
                "TENET Hackthon Participation(ASSIM IOT ,Pune)",
                "Mumbai Hack 2025 Participation (RSCOE,Mumbai)"
            ],

            externalLinks: [
                { platform: "Website", url: "https://om.me" },
                { platform: "LinkedIn", url: "https://www.linkedin.com/in/om-salunke-81bb63292/" },
                { platform: "GitHub", url: "https://github.com/om0852" },
                { platform: "Email", url: "mailto:salunkeom474@gmail.com" }
            ]
        };

        // Delete existing user to ensure clean slate (and force schema update)
        await User.deleteOne({ username: seedUser.username });

        // Create new user with fresh data
        const user = await User.create(seedUser);

        // --- 2. Seed Projects (Posts) ---
        const projects = [
            {
                title: "Multi-UI",
                subtitle: "Animated component library",
                type: "project",
                content: "Multi-UI is a sleek animated component library offering customizable and reusable components to create dynamic and visually engaging user interfaces. It focuses on flexibility, adaptability, and seamless design integration.",
                techStack: ["Next.js", "Typescript", "Framer-Motion", "Styled-component"],
                images: ["https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800"],
                createdBy: user._id,
                likes: 230,
                commentsCount: 45
            },
            {
                title: "XtraCarbon",
                subtitle: "Blockchain-based Carbon Credit MRV",
                type: "project",
                content: "Built an AI/ML system for tree counting from satellite data, reducing MRV time by 70–80%. Integrated blockchain for transparent carbon credit tracking and reporting.",
                techStack: ["Next.js", "FastAPI", "Python", "DeepTree", "Express.js", "Mongodb", "Aws", "Vercel", "Solidity", "Metamask", "hardhat"],
                images: ["https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800"],
                createdBy: user._id,
                likes: 156,
                commentsCount: 12
            },
            {
                title: "XtraSecurity",
                subtitle: "Secure Environment Variable & Secret Management Platform",
                type: "project",
                content: "A Blockchain-based Certification Platform securely generates, issues, and verifies tamper-proof certificates. It provides an API for seamless certificate creation and integration, ensuring authenticity and trust.",
                techStack: ["Next.js", "Node.js", "Express.js", "Mongodb", "Aws", "Vercel"],
                images: ["https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800"],
                createdBy: user._id,
                likes: 89,
                commentsCount: 5
            }
        ];
        // Delete old projects to avoid duplicates during seed dev
        await Post.deleteMany({ createdBy: user._id, type: "project" });

        // Insert new projects
        await Post.insertMany(projects);

        return NextResponse.json({
            success: true,
            message: "Reseeded User and Projects from 2026 Resume",
            data: { user, projects }
        });
    } catch (error) {
        console.error("Seed error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
