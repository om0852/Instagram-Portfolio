"use client";
import React, { useState, useEffect } from "react";
import { Settings, Grid, Bookmark, Briefcase, Link as LinkIcon, Menu, PlusSquare, User, ChevronDown, Heart, MessageCircle } from "lucide-react";
import InstagramSidebar from "../_components/Sidebar";
import BottomNav from "../_components/BottomNav";
import Image from "next/image";
import axios from "axios";
import Link from "next/link";

export default function PortfolioProfile() {
  const [activeTab, setActiveTab] = useState("projects");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState(null);
  const [projects, setProjects] = useState([]);
  const [savedPosts, setSavedPosts] = useState([]);

  // Fetch Profile Data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/api/profile");
        if (res.data.success) {
          setProfileData(res.data.data.user);
          setProjects(res.data.data.projects);
        }
      } catch (error) {
        console.error("Failed to fetch profile data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Fetch Saved Posts
  useEffect(() => {
    if (activeTab === "saved") {
      fetch("/api/posts/saved")
        .then((res) => res.json())
        .then((data) => {
          if (data.success) setSavedPosts(data.data);
        })
        .catch((err) => console.error("Failed to fetch saved posts", err));
    }
  }, [activeTab]);

  const highlights = [
    // Frontend
    { title: "React", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png" },
    { title: "Next.js", image: "https://assets.vercel.com/image/upload/v1662130559/nextjs/Icon_light_background.png" },
    { title: "Tailwind", image: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg" },
    { title: "Vue.js", image: "https://upload.wikimedia.org/wikipedia/commons/9/95/Vue.js_Logo_2.svg" },

    // Backend
    { title: "Node.js", image: "https://nodejs.org/static/images/logo.svg" },
    { title: "Express", image: "https://upload.wikimedia.org/wikipedia/commons/6/64/Expressjs.png" },
    { title: "Django", image: "https://upload.wikimedia.org/wikipedia/commons/7/75/Django_logo.svg" },
    { title: "PHP", image: "https://upload.wikimedia.org/wikipedia/commons/2/27/PHP-logo.svg" },

    // Database
    { title: "MongoDB", image: "https://upload.wikimedia.org/wikipedia/commons/9/93/MongoDB_Logo.svg" },

    // Blockchain
    { title: "Solidity", image: "https://upload.wikimedia.org/wikipedia/commons/9/98/Solidity_logo.svg" },
    { title: "MetaMask", image: "https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg" },
    { title: "Hardhat", image: "https://upload.wikimedia.org/wikipedia/commons/0/05/Ethereum_logo_2014.svg" },

    // Languages & Others
    { title: "Python", image: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg" },
    { title: "Java", image: "https://upload.wikimedia.org/wikipedia/en/3/30/Java_programming_language_logo.svg" },
    { title: "C++", image: "https://upload.wikimedia.org/wikipedia/commons/1/18/ISO_C%2B%2B_Logo.svg" },
    { title: "Git", image: "https://upload.wikimedia.org/wikipedia/commons/e/e0/Git-logo.svg" },
    { title: "Docker", image: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Docker_%28container_engine%29_logo.svg" },
  ];

  if (loading) {
    return (
      <div className="flex bg-black min-h-screen items-center justify-center text-white">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  // Fallback Content
  const user = profileData || {
    username: "om_salunke_dev",
    fullName: "Om Salunke",
    bio: "Full Stack Developer",
    projectsCount: 0,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300",
  };

  const projectsToDisplay = activeTab === "saved" ? savedPosts : projects;

  return (
    <div className="flex bg-black min-h-screen text-white font-sans pb-16 lg:pb-0 w-full overflow-x-hidden">
      {/* Sidebar for Desktop */}
      <InstagramSidebar isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />

      <main className="flex-1 lg:ml-64 relative w-full">

        {/* --- MOBILE TOP BAR (Sticky) --- */}
        <div className="lg:hidden sticky top-0 bg-black z-40 flex items-center justify-between px-4 h-[44px] border-b border-[#262626]">
          <div className="flex items-center gap-1 cursor-pointer">
            <span className="text-xl font-bold">{user.username}</span>
          </div>
          <div className="flex items-center gap-6">
            <PlusSquare size={24} strokeWidth={2.5} className="cursor-pointer" />
            <Menu size={24} strokeWidth={2.5} className="cursor-pointer" onClick={() => setIsMobileMenuOpen(true)} />
          </div>
        </div>

        <div className="max-w-[935px] mx-auto md:pt-8 md:px-5 pb-4">

          {/* =================================================================================
              MOBILE LAYOUT (< md)
              Instagram Style: Row 1 [Avatar | Stats], Row 2 [Bio], Row 3 [Buttons]
             ================================================================================= */}
          <div className="md:hidden px-4 pt-4">
            {/* ROW 1: Avatar + Stats */}
            <div className="flex items-center mb-4 px-2">
              {/* Avatar Column */}
              <div className="mr-8 flex-shrink-0">
                <div className="w-[86px] h-[86px] rounded-full p-[2px] bg-gradient-to-tr from-[#FFC107] to-[#F44336]">
                  <div className="w-full h-full rounded-full p-[2px] bg-black">
                    <div className="relative w-full h-full rounded-full overflow-hidden bg-gray-900">
                      <Image
                        src={user.avatar && user.avatar.length > 10 ? user.avatar : "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300"}
                        alt="profile"
                        fill
                        className="object-cover"
                        priority
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats Column */}
              <div className="flex-1 flex justify-around items-center text-center">
                <div className="flex flex-col cursor-pointer">
                  <span className="font-bold text-[18px]">{user.projectsCount}</span>
                  <span className="text-[13px] text-gray-200">posts</span>
                </div>
                <div className="flex flex-col cursor-pointer">
                  <span className="font-bold text-[18px]">303</span>
                  <span className="text-[13px] text-gray-200">followers</span>
                </div>
                <div className="flex flex-col cursor-pointer">
                  <span className="font-bold text-[18px]">336</span>
                  <span className="text-[13px] text-gray-200">following</span>
                </div>
              </div>
            </div>

            {/* ROW 2: Bio */}
            <div className="mb-4 px-2">
              <div className="font-bold text-sm tracking-wide">{user.fullName}</div>
              <div className="text-sm text-gray-400 mb-1">Web Designer</div>
              <div className="text-sm whitespace-pre-line leading-snug">
                {user.bio || "Building things for the web."}
              </div>
              {/* Hashtags */}
              <div className="text-sm text-[#E0F1FF] mt-1 space-x-1">
                <span>#FullStack</span>
                <span>#Blockchain</span>
                <span>#Freelancer</span>
                <span>#Pune</span>
              </div>

              {/* Links */}
              <div className="mt-2 space-y-1">
                {user.externalLinks && user.externalLinks.map((link, i) => (
                  <a key={i} href={link.url} target="_blank" className="flex items-center gap-2 text-[#E0F1FF] text-sm font-medium truncate bg-[#1a1a1a] p-1.5 rounded-lg border border-[#262626] hover:bg-[#262626] transition-colors w-full cursor-pointer">
                    <div className="bg-[#262626] p-1 rounded-full">
                      <LinkIcon size={10} className="text-gray-300" />
                    </div>
                    <span>{link.url.replace(/^https?:\/\//, '').replace(/^mailto:/, '').replace(/\/$/, '')}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* ROW 3: Action Buttons */}
            <div className="flex gap-2">
              <button className="flex-1 bg-[#363636] h-[32px] rounded-lg text-sm font-semibold hover:bg-[#262626] transition-colors">
                Edit profile
              </button>
              <button className="flex-1 bg-[#363636] h-[32px] rounded-lg text-sm font-semibold hover:bg-[#262626] transition-colors">
                Share profile
              </button>
              <button className="w-[32px] h-[32px] bg-[#363636] rounded-lg flex items-center justify-center hover:bg-[#262626] transition-colors">
                <User size={16} className="text-white" />
              </button>
            </div>
          </div>


          {/* =================================================================================
              DESKTOP LAYOUT (>= md)
              Standard Style: Avatar Left, Info Right
             ================================================================================= */}
          <div className="hidden md:flex flex-row gap-12 mb-10 px-4 md:px-0">
            <div className="flex-shrink-0 w-[150px] h-[150px] mx-auto md:mx-0">
              <div className="relative w-full h-full rounded-full p-[2px] bg-gradient-to-tr from-[#FFC107] to-[#F44336]">
                <div className="w-full h-full rounded-full p-[2px] bg-black">
                  <div className="relative w-full h-full rounded-full overflow-hidden bg-gray-800">
                    <Image
                      src={user.avatar && user.avatar.length > 10 ? user.avatar : "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300"}
                      alt="profile"
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4 flex-1">
              <div className="flex items-center gap-4">
                <h2 className="text-xl font-normal">{user.username}</h2>
                <div className="flex gap-2 ml-4">
                  <button className="bg-white text-black px-4 py-1.5 rounded font-semibold text-sm hover:bg-gray-200">Edit profile</button>
                  <button className="bg-[#363636] text-white px-4 py-1.5 rounded font-semibold text-sm hover:bg-[#262626]">View archive</button>
                </div>
                <Settings className="w-6 h-6 ml-2 cursor-pointer" />
              </div>

              <div className="flex gap-10 text-base">
                <span><span className="font-bold">{user.projectsCount}</span> posts</span>
                <span><span className="font-bold">303</span> followers</span>
                <span><span className="font-bold">336</span> following</span>
              </div>

              <div>
                <div className="font-bold">{user.fullName}</div>
                <div className="text-sm whitespace-pre-line leading-relaxed">{user.bio}</div>
                <div className="text-sm text-[#E0F1FF] mt-1 space-x-1">
                  <span>#FullStack</span> <span>#Blockchain</span> <span>#Freelancer</span>
                </div>
              </div>
            </div>
          </div>


          {/* --- HIGHLIGHTS (Common) --- */}
          <div className="flex gap-6 px-4 md:px-0 overflow-x-auto pb-4 scrollbar-hide my-6 md:my-8 justify-center md:justify-start">
            {highlights.map((h, i) => (
              <div key={i} className="flex flex-col items-center gap-1 min-w-[70px] cursor-pointer group">
                <div className="w-[80px] h-[80px] md:w-[77px] md:h-[77px] rounded-full p-[1px] bg-gray-600 group-hover:bg-white transition-colors">
                  <div className="w-full h-full rounded-full p-[2px] bg-black">
                    <div className="relative w-full h-full rounded-full overflow-hidden bg-white">
                      <Image src={h.image} alt={h.title} fill className="object-contain p-2" />
                    </div>
                  </div>
                </div>
                <span className="text-xs truncate max-w-full">{h.title}</span>
              </div>
            ))}
            {/* New Highlight */}
            <div className="flex flex-col items-center gap-1 min-w-[70px] cursor-pointer">
              <div className="w-[80px] h-[80px] md:w-[77px] md:h-[77px] rounded-full border border-gray-600 flex items-center justify-center">
                <PlusSquare size={24} className="text-white" />
              </div>
              <span className="text-xs">New</span>
            </div>
          </div>


          {/* --- TABS --- */}
          <div className="border-t border-[#262626]">
            <div className="flex justify-around md:justify-center md:gap-14">
              <button
                onClick={() => setActiveTab("projects")}
                className={`flex items-center gap-2 py-3 md:py-4 border-t border-transparent text-xs font-semibold uppercase tracking-widest ${activeTab === 'projects' ? '!border-white text-white' : 'text-[#8e8e8e]'} -mt-[1px]`}
              >
                <Grid size={12} strokeWidth={activeTab === 'projects' ? 2 : 1.5} />
                <span className="hidden md:block">Posts</span>
                <span className="md:hidden"></span>
              </button>
              <button
                onClick={() => setActiveTab("saved")}
                className={`flex items-center gap-2 py-3 md:py-4 border-t border-transparent text-xs font-semibold uppercase tracking-widest ${activeTab === 'saved' ? '!border-white text-white' : 'text-[#8e8e8e]'} -mt-[1px]`}
              >
                <Bookmark size={12} strokeWidth={activeTab === 'saved' ? 2 : 1.5} />
                <span className="hidden md:block">Saved</span>
              </button>
              <button
                onClick={() => setActiveTab("resume")}
                className={`flex items-center gap-2 py-3 md:py-4 border-t border-transparent text-xs font-semibold uppercase tracking-widest ${activeTab === 'resume' ? '!border-white text-white' : 'text-[#8e8e8e]'} -mt-[1px]`}
              >
                <Briefcase size={12} strokeWidth={activeTab === 'resume' ? 2 : 1.5} />
                <span className="hidden md:block">Resume</span>
              </button>
            </div>
          </div>


          {/* --- CONTENT GRID --- */}
          <div className="min-h-[200px]">
            {activeTab === 'resume' ? (
              <ResumeSection user={user} />
            ) : (
              <div className="grid grid-cols-3 gap-0.5 md:gap-4">
                {projectsToDisplay.length > 0 ? projectsToDisplay.map((project) => (
                  <Link href={`/projects/${project._id || project.id}`} key={project._id || project.id} className="relative aspect-square group bg-[#121212] cursor-pointer block">
                    <Image
                      src={project.image || (project.images && project.images[0]) || "/placeholder.jpg"}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="flex items-center text-white font-bold">
                        <Heart className="fill-white mr-1" size={18} /> {project.likes || 0}
                      </div>
                      <div className="flex items-center text-white font-bold">
                        <MessageCircle className="fill-white mr-1" size={18} /> {project.commentsCount || 0}
                      </div>
                    </div>
                  </Link>
                )) : (
                  <div className="col-span-3 py-10 text-center text-gray-500 text-sm">
                    {activeTab === 'saved' ? 'Only you can see what you\'ve saved' : 'No posts yet'}
                  </div>
                )}
              </div>
            )}
          </div>

        </div>
      </main>

      {/* Mobile Bottom Nav */}
      <BottomNav />
    </div>
  );
}

// --- Sub-component for Resume to keep main file clean ---
function ResumeSection({ user }) {
  if (!user.experience && !user.education) return <div className="p-10 text-center text-gray-500">No resume info available.</div>;

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 md:px-0">
      {/* Experience */}
      {user.experience?.length > 0 && (
        <div className="mb-12">
          <h3 className="font-bold text-lg mb-6 flex items-center gap-2">Experience</h3>
          <div className="relative border-l border-[#262626] ml-3 space-y-8">
            {user.experience.map((exp, i) => (
              <div key={i} className="ml-8 relative">
                <span className="absolute -left-[39px] top-1 w-5 h-5 rounded-full border border-[#262626] bg-black flex items-center justify-center overflow-hidden">
                  {exp.logo ? <Image src={exp.logo} alt="" width={20} height={20} className="object-cover" /> : <div className="w-2 h-2 bg-gray-500 rounded-full"></div>}
                </span>
                <div className="mb-1">
                  <h4 className="font-bold text-base text-white">{exp.role}</h4>
                  <span className="text-sm text-blue-400">{exp.company}</span>
                </div>
                <p className="text-xs text-gray-500 mb-2">{exp.duration}</p>
                <p className="text-sm text-gray-300 leading-relaxed font-light">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {user.education?.length > 0 && (
        <div>
          <h3 className="font-bold text-lg mb-6 flex items-center gap-2">Education</h3>
          <div className="relative border-l border-[#262626] ml-3 space-y-8">
            {user.education.map((edu, i) => (
              <div key={i} className="ml-8 relative">
                <span className="absolute -left-[37px] top-1.5 w-3 h-3 bg-white rounded-full"></span>
                <div className="mb-1">
                  <h4 className="font-bold text-base text-white">{edu.institution}</h4>
                  <span className="text-sm text-gray-400">{edu.degree}</span>
                </div>
                <p className="text-xs text-gray-500 font-mono">{edu.duration}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
