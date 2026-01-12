"use client";
import React, { useState, useEffect } from "react";
import { Settings, Grid, Bookmark, Briefcase, Link as LinkIcon, MapPin, Calendar, ExternalLink, Heart, MessageCircle } from "lucide-react";
import InstagramSidebar from "../_components/Sidebar";
import Image from "next/image";
import MobileHeader from "../_components/MobileHeader";
import BottomNav from "../_components/BottomNav";
import axios from "axios";

export default function PortfolioProfile() {
  const [activeTab, setActiveTab] = useState("projects");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [profileData, setProfileData] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

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
    { title: "Hardhat", image: "https://raw.githubusercontent.com/NomicFoundation/hardhat/main/docs/static/favicon.ico" },

    // Languages & Others
    { title: "Python", image: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg" },
    { title: "Java", image: "https://upload.wikimedia.org/wikipedia/en/3/30/Java_programming_language_logo.svg" },
    { title: "C++", image: "https://upload.wikimedia.org/wikipedia/commons/1/18/ISO_C%2B%2B_Logo.svg" },
    { title: "Git", image: "https://upload.wikimedia.org/wikipedia/commons/e/e0/Git-logo.svg" },
    { title: "Docker", image: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Docker_%28container_engine%29_logo.svg" },
  ];

  const [savedPosts, setSavedPosts] = useState([]);

  useEffect(() => {
    if (activeTab === "saved") {
      fetch("/api/posts/saved")
        .then(res => res.json())
        .then(data => {
          if (data.success) setSavedPosts(data.data);
        })
        .catch(err => console.error("Failed to fetch saved posts", err));
    }
  }, [activeTab]);

  const projectsToDisplay = activeTab === "saved" ? savedPosts : projects;


  if (loading) {
    return (
      <div className="flex bg-black min-h-screen items-center justify-center text-white">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
      </div>
    )
  }

  // Fallback defaults if no profile data yet (e.g. before seed)
  const user = profileData || {
    username: "om_salunke_dev",
    fullName: "Om Salunke",
    bio: "Loading bio...",
    projectsCount: 0,
    experienceYears: 0,
    certificationsCount: 0,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300"
  };

  return (
    <div className="flex bg-black min-h-screen text-white font-sans pb-16 lg:pb-0">
      <InstagramSidebar isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />
      <div className="flex-1 lg:ml-64">
        <MobileHeader />
        <main className="max-w-[935px] mx-auto px-5 pt-4 md:pt-8 pb-12">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row gap-6 md:gap-24 mb-6 md:mb-12">

            {/* Profile Picture */}
            <div className="flex justify-start md:block flex-shrink-0">
              <div className="relative w-20 h-20 md:w-36 md:h-36 rounded-full p-[2px] bg-gradient-to-tr from-[#FFC107] to-[#F44336]">
                <div className="w-full h-full rounded-full p-[2px] bg-black">
                  <div className="relative w-full h-full rounded-full overflow-hidden">
                    <Image
                      src={user.avatar || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300"}
                      alt="Profile"
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-1">
              <div className="flex flex-col gap-5">
                {/* Username Row */}
                <div className="flex items-center gap-4 flex-wrap">
                  <h2 className="text-xl font-normal">{user.username}</h2>
                  <Settings className="w-6 h-6 cursor-pointer" />
                </div>

                {/* Stats Row */}
                <div className="flex items-center gap-10 text-base">
                  <div className="cursor-pointer">
                    <span className="font-semibold">{user.projectsCount}</span> projects
                  </div>
                  <div className="cursor-pointer">
                    <span className="font-semibold">{user.experienceYears}y</span> exp
                  </div>
                  <div className="cursor-pointer">
                    <span className="font-semibold">{user.certificationsCount}</span> certifications
                  </div>
                </div>

                {/* Bio Section */}
                <div className="text-sm">
                  <h1 className="font-semibold text-base mb-1">{user.fullName}</h1>
                  <p className="text-gray-300 whitespace-pre-line">{user.bio}</p>

                  {user.externalLinks && user.externalLinks.map((link, i) => (
                    <a
                      key={i}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-[#E0F1FF] font-semibold mt-1 hover:underline"
                    >
                      <LinkIcon size={14} className="rotate-45" />
                      {link.url.replace(/^https?:\/\//, '')}
                    </a>
                  ))}

                  {/* Hashtags */}
                  <div className="mt-3 text-blue-300 flex flex-wrap gap-2 text-xs">
                    <span className="cursor-pointer hover:underline">#FullStackDeveloper</span>
                    <span className="cursor-pointer hover:underline">#Blockchain</span>
                    <span className="cursor-pointer hover:underline">#Web3</span>
                    <span className="cursor-pointer hover:underline">#SoftwareEngineer</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Highlights */}
          <div className="flex gap-4 md:gap-10 mb-8 md:mb-12 overflow-x-auto pb-4 scrollbar-hide">
            {highlights.map((item, idx) => (
              <div key={idx} className="flex flex-col items-center gap-2 flex-shrink-0 cursor-pointer group">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full p-[1px] bg-gray-700 group-hover:bg-gray-500 transition-colors">
                  <div className="w-full h-full rounded-full p-[2px] bg-black">
                    <div className="relative w-full h-full rounded-full overflow-hidden bg-white">
                      <Image src={item.image} alt={item.title} fill className="object-contain p-2" />
                    </div>
                  </div>
                </div>
                <span className="text-xs font-medium text-white">{item.title}</span>
              </div>
            ))}
            <div className="flex flex-col items-center gap-2 flex-shrink-0 cursor-pointer group">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border border-gray-700 flex items-center justify-center bg-transparent group-hover:border-gray-500 transition-colors">
                <span className="text-3xl text-white font-light">+</span>
              </div>
              <span className="text-xs font-medium text-white">Add Skill</span>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-t border-[#262626]">
            <div className="flex justify-center gap-12">
              <button
                onClick={() => setActiveTab("projects")}
                className={`flex items-center gap-2 h-[52px] border-t border-transparent text-xs font-semibold tracking-widest uppercase transition-colors -mt-[1px]
                  ${activeTab === "projects" ? "!border-white text-white" : "text-[#A8A8A8]"}`}
              >
                <Grid size={12} strokeWidth={2} /> <span className="hidden md:inline">Projects</span>
              </button>
              <button
                onClick={() => setActiveTab("saved")}
                className={`flex items-center gap-2 h-[52px] border-t border-transparent text-xs font-semibold tracking-widest uppercase transition-colors -mt-[1px]
                  ${activeTab === "saved" ? "!border-white text-white" : "text-[#A8A8A8]"}`}
              >
                <Bookmark size={12} strokeWidth={2} /> <span className="hidden md:inline">Saved</span>
              </button>
              <button
                onClick={() => setActiveTab("resume")}
                className={`flex items-center gap-2 h-[52px] border-t border-transparent text-xs font-semibold tracking-widest uppercase transition-colors -mt-[1px]
                  ${activeTab === "resume" ? "!border-white text-white" : "text-[#A8A8A8]"}`}
              >
                <Briefcase size={12} strokeWidth={2} /> <span className="hidden md:inline">Resume</span>
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="grid grid-cols-3 gap-1 md:gap-1">
            {activeTab === 'resume' ? (
              <div className="col-span-3 py-6 px-2 md:px-0 text-left">
                {/* Experience Section */}
                {user.experience && user.experience.length > 0 && (
                  <div className="mb-10 animate-fade-in">
                    <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
                      <Briefcase size={20} className="text-gray-400" /> Experience
                    </h3>
                    <div className="relative border-l border-gray-800 ml-3 space-y-10">
                      {user.experience.map((exp, i) => (
                        <div key={i} className="ml-10 relative group">
                          {/* Timeline Line (Gradient) */}
                          {i !== user.experience.length - 1 && (
                            <div className="absolute -left-[39px] top-10 bottom-[-24px] w-[2px] bg-[#262626] group-hover:bg-[#333] transition-colors"></div>
                          )}

                          {/* Timeline Dot / Logo */}
                          <div className="absolute -left-[60px] top-0 w-11 h-11 bg-black border border-[#262626] rounded-full overflow-hidden flex items-center justify-center p-1 group-hover:border-gray-500 transition-colors z-10">
                            {exp.logo ? (
                              <Image
                                src={exp.logo}
                                alt={exp.company}
                                width={44}
                                height={44}
                                className="object-contain rounded-full"
                              />
                            ) : (
                              <div className="w-full h-full bg-[#1c1c1c] rounded-full"></div>
                            )}
                          </div>

                          <div className="flex flex-col gap-1 pb-2">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                              <h4 className="font-bold text-base text-white">{exp.role}</h4>
                              <span className="text-xs text-gray-500 font-medium bg-[#111] px-2 py-1 rounded border border-[#222] whitespace-nowrap">{exp.duration}</span>
                            </div>

                            <h5 className="text-sm font-semibold text-blue-400 mb-1">{exp.company}</h5>

                            <p className="text-sm text-gray-400 leading-relaxed font-light mt-1 max-w-2xl border-l-2 border-[#1c1c1c] pl-3 py-1 bg-gradient-to-r from-[#111] to-transparent rounded-r-lg">
                              {exp.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Education Section */}
                {user.education && user.education.length > 0 && (
                  <div className="mb-8 animate-fade-in">
                    <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
                      <span className="text-xl">🎓</span> Education
                    </h3>
                    <div className="relative border-l border-gray-800 ml-3 space-y-10">
                      {user.education.map((edu, i) => (
                        <div key={i} className="ml-8 relative">
                          <div className="absolute -left-[41px] w-5 h-5 bg-black border-2 border-gray-600 rounded-full mt-1.5"></div>
                          <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-1">
                            <h4 className="font-semibold text-base">{edu.degree}</h4>
                            <span className="text-xs text-gray-500 font-mono">{edu.duration}</span>
                          </div>
                          <h5 className="text-sm text-gray-400 mb-1">{edu.institution}</h5>
                          {edu.grade && <span className="text-xs bg-gray-800 px-2 py-0.5 rounded text-gray-300">Grade: {edu.grade}</span>}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : projectsToDisplay.length === 0 ? (
              <div className="col-span-3 text-center py-10 text-gray-500">
                No projects found.
              </div>
            ) : (
              projectsToDisplay.map((project) => (
                <div key={project._id || project.id} className="relative aspect-square group cursor-pointer bg-gray-900">
                  <Image
                    src={project.image || (project.images && project.images[0]) || "/placeholder.jpg"}
                    alt={project.title}
                    fill
                    className="object-cover transition-opacity group-hover:opacity-70"
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="flex gap-6 text-white font-bold">
                      <span className="flex items-center gap-2"><Heart className="fill-white text-white" size={20} /> {project.likes || 0}</span>
                      <span className="flex items-center gap-2"><MessageCircle className="fill-white text-white" size={20} /> {project.commentsCount || 0}</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </main>
      </div>
      <BottomNav />
    </div>
  );
}
