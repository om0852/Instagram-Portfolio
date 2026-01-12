"use client";
import React, { useState, useEffect } from "react";
import InstagramSidebar from "../_components/Sidebar";
import { Download, Briefcase, GraduationCap, Award, ExternalLink, Mail, Github, Linkedin, Globe, Code, Layers, Database, Server, PenTool, Terminal } from "lucide-react";
import MobileHeader from "../_components/MobileHeader";
import BottomNav from "../_components/BottomNav";
import axios from "axios";

export default function ResumePage() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get("/api/profile");
                if (res.data.success) {
                    setUser(res.data.data.user);
                    setProjects(res.data.data.projects || []);
                }
            } catch (error) {
                console.error("Failed to fetch resume data", error);
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, []);

    if (loading) {
        return (
            <div className="flex bg-black min-h-screen items-center justify-center text-white">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
            </div>
        );
    }

    if (!user) return null;

    const renderSkillCategory = (title, skills, icon) => {
        if (!skills || skills.length === 0) return null;
        return (
            <div className="mb-6">
                <h3 className="text-sm text-gray-400 mb-2 font-semibold flex items-center gap-2">
                    {icon} {title}
                </h3>
                <div className="flex flex-wrap gap-2">
                    {skills.map((s, i) => (
                        <span key={i} className="bg-[#1c1c1c] text-gray-300 px-3 py-1 rounded text-sm border border-[#333]">{s}</span>
                    ))}
                </div>
            </div>
        )
    }

    return (
        <div className="flex bg-black min-h-screen text-white font-sans pb-16 lg:pb-0">
            <InstagramSidebar isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />
            <div className="flex-1 lg:ml-64">
                <MobileHeader setIsMobileMenuOpen={setIsMobileMenuOpen} />
                <main className="max-w-5xl mx-auto px-6 pt-10 pb-16">

                    {/* Header */}
                    <div className="flex flex-col md:flex-row items-center md:items-start justify-between mb-12 pb-8 border-b border-[#262626]">
                        <div className="flex-1">
                            <h1 className="text-5xl font-bold mb-3 tracking-tighter text-white">{user.fullName}</h1>
                            <p className="text-2xl text-purple-400 font-medium mb-6">{user.title}</p>

                            <div className="flex flex-col gap-3 text-sm text-gray-400">
                                {/* Location (derived from bio line 2) */}
                                {user.bio.split('\n')[1] && (
                                    <div className="flex items-center gap-2">
                                        <Globe size={16} className="text-gray-500" />
                                        <span>{user.bio.split('\n')[1]}</span>
                                    </div>
                                )}

                                {/* User Contact Info (Phone/Email from bio line 3 or External Links) */}
                                <div className="flex flex-wrap gap-x-6 gap-y-2 items-center">
                                    {user.externalLinks?.find(l => l.platform === 'Email') && (
                                        <a href={user.externalLinks.find(l => l.platform === 'Email').url} className="flex items-center gap-2 hover:text-white transition-colors">
                                            <Mail size={16} className="text-gray-500" />
                                            {user.externalLinks.find(l => l.platform === 'Email').url.replace('mailto:', '')}
                                        </a>
                                    )}
                                    {/* Try to extract phone from bio if possible, essentially hardcoding based on user data knowledge or just printing the bio line if simpler */}
                                    <div className="flex items-center gap-2">
                                        <Briefcase size={16} className="text-gray-500" />
                                        <span>8390471333</span>
                                    </div>
                                </div>

                                {/* Social Links */}
                                <div className="flex flex-wrap gap-5 mt-2">
                                    {user.externalLinks?.filter(l => l.platform !== 'Email').map((link, i) => (
                                        <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors border-b border-transparent hover:border-gray-600 pb-0.5">
                                            {link.platform === "GitHub" && <Github size={16} />}
                                            {link.platform === "LinkedIn" && <Linkedin size={16} />}
                                            {link.platform === "Website" && <Globe size={16} />}
                                            <span className="font-medium">{link.platform}</span>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <a
                            href="/OM_SALUNKE_RESUME_2026.pdf"
                            download="OM_SALUNKE_RESUME_2026.pdf"
                            className="mt-8 md:mt-0 flex items-center gap-3 bg-white text-black px-7 py-3 rounded-full font-bold hover:bg-gray-200 transition-all active:scale-95 shadow-lg shadow-white/10 no-print"
                        >
                            <Download size={20} />
                            Download CV
                        </a>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
                        {/* Left Column (Skills, Education, Achievements) - Span 4 */}
                        <div className="md:col-span-4 space-y-10">

                            {/* Education */}
                            <section>
                                <div className="flex items-center gap-2 mb-4 text-green-400">
                                    <GraduationCap size={20} />
                                    <h2 className="text-lg font-bold uppercase tracking-wider">Education</h2>
                                </div>
                                <div className="space-y-6">
                                    {user.education?.map((edu, i) => (
                                        <div key={i} className="group">
                                            <h3 className="font-semibold text-white group-hover:text-green-400 transition-colors">{edu.degree}</h3>
                                            <p className="text-gray-400 text-sm mt-1">{edu.institution}</p>
                                            <div className="flex justify-between items-center mt-1">
                                                <p className="text-gray-500 text-xs">{edu.duration}</p>
                                                {edu.grade && <span className="text-xs bg-[#1c1c1c] px-2 py-0.5 rounded text-gray-400">{edu.grade}</span>}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Skills */}
                            <section>
                                <div className="flex items-center gap-2 mb-4 text-blue-400">
                                    <Code size={20} />
                                    <h2 className="text-lg font-bold uppercase tracking-wider">Skills</h2>
                                </div>
                                <div>
                                    {renderSkillCategory("Languages", user.skillsCategory?.languages, <Terminal size={14} />)}
                                    {renderSkillCategory("Frontend", user.skillsCategory?.frontend, <Layers size={14} />)}
                                    {renderSkillCategory("Backend", user.skillsCategory?.backend, <Server size={14} />)}
                                    {renderSkillCategory("Deployment", user.skillsCategory?.deployment, <Database size={14} />)}
                                    {renderSkillCategory("Tools", user.skillsCategory?.tools, <PenTool size={14} />)}

                                    {user.competitiveProgramming && (
                                        <div className="mt-4 pt-4 border-t border-[#222]">
                                            <h3 className="text-sm text-gray-400 mb-2 font-semibold">Competitive Programming</h3>
                                            <span className="bg-blue-900/30 text-blue-300 px-3 py-1 rounded text-sm border border-blue-900">{user.competitiveProgramming}</span>
                                        </div>
                                    )}
                                </div>
                            </section>

                            {/* Achievements */}
                            <section>
                                <div className="flex items-center gap-2 mb-4 text-yellow-400">
                                    <Award size={20} />
                                    <h2 className="text-lg font-bold uppercase tracking-wider">Achievements</h2>
                                </div>
                                <ul className="space-y-3">
                                    {user.achievements?.map((ach, i) => (
                                        <li key={i} className="text-sm text-gray-300 flex gap-2">
                                            <span className="text-yellow-500 mt-1">◦</span>
                                            {ach}
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        </div>

                        {/* Right Column (Experience, Projects) - Span 8 */}
                        <div className="md:col-span-8 space-y-12">

                            {/* Experience */}
                            <section>
                                <div className="flex items-center gap-2 mb-6 text-purple-400">
                                    <Briefcase size={20} />
                                    <h2 className="text-lg font-bold uppercase tracking-wider">Work Experience</h2>
                                </div>

                                <div className="relative border-l-2 border-[#262626] pl-6 space-y-10 ml-2">
                                    {user.experience?.map((exp, i) => (
                                        <div key={i} className="relative group">
                                            <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-[#1c1c1c] border-4 border-[#262626] group-hover:border-purple-500 transition-colors"></div>
                                            <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors">{exp.role}</h3>
                                            <div className="flex items-center gap-2 text-gray-400 text-sm mb-2">
                                                <span className="font-semibold text-gray-300">{exp.company}</span>
                                                <span>•</span>
                                                <span>{exp.duration}</span>
                                            </div>
                                            <p className="text-gray-300 leading-relaxed text-sm whitespace-pre-line">
                                                {exp.description}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Projects */}
                            <section>
                                <div className="flex items-center gap-2 mb-6 text-pink-400">
                                    <ExternalLink size={20} />
                                    <h2 className="text-lg font-bold uppercase tracking-wider">Projects</h2>
                                </div>

                                <div className="space-y-8">
                                    {projects.map((proj, i) => (
                                        <div key={i} className="bg-[#111] p-6 rounded-xl border border-[#222] hover:border-gray-600 transition-colors">
                                            <div className="flex justify-between items-start mb-2">
                                                <h3 className="text-xl font-bold text-white">{proj.title} <span className="text-sm font-normal text-gray-400 ml-2">({proj.subtitle})</span></h3>
                                            </div>

                                            <div className="flex flex-wrap gap-2 mb-4">
                                                <span className="text-xs font-semibold text-gray-500 uppercase tracking-widest mt-1">Tech Stack:</span>
                                                {proj.techStack?.map((tech, t) => (
                                                    <span key={t} className="text-xs text-blue-300 bg-blue-900/20 px-2 py-0.5 rounded">{tech}</span>
                                                ))}
                                            </div>

                                            <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-line">
                                                {proj.content}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Mini Projects */}
                            <section>
                                <div className="flex items-center gap-2 mb-4 text-teal-400">
                                    <Code size={20} />
                                    <h2 className="text-lg font-bold uppercase tracking-wider">Mini Projects</h2>
                                </div>
                                <div className="bg-[#111] p-5 rounded-xl border border-[#222]">
                                    <p className="text-gray-300 text-sm leading-7">
                                        {user.miniProjects?.map((mp, i) => (
                                            <span key={i} className="inline-block mr-2 mb-2">
                                                <span className="text-teal-200 border-b border-teal-900 hover:border-teal-400 cursor-default transition-colors">{mp}</span>
                                                {i < user.miniProjects.length - 1 && <span className="text-gray-600 ml-2">,</span>}
                                            </span>
                                        ))}
                                    </p>
                                </div>
                            </section>
                        </div>
                    </div>
                </main>
            </div>
            <BottomNav />
        </div>
    );
}
