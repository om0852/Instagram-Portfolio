"use client";
import React, { useState } from "react";
import InstagramSidebar from "../_components/Sidebar";
import Image from "next/image";
import { Search, X, TrendingUp } from "lucide-react";
import MobileHeader from "../_components/MobileHeader";
import BottomNav from "../_components/BottomNav";

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [debouncedQuery, setDebouncedQuery] = useState("");

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(searchQuery), 400);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Fetch Logic
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const url = debouncedQuery
          ? `/api/search?q=${encodeURIComponent(debouncedQuery)}`
          : `/api/search`;

        const res = await fetch(url);
        const json = await res.json();
        if (json.success) {
          setResults(json.data);
        }
      } catch (err) {
        console.error("Search fetch error", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [debouncedQuery]);

  const popularSkills = ["React", "Next.js", "Node.js", "Tailwind", "Design", "API"];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex bg-black min-h-screen text-white font-sans pb-16 lg:pb-0">
      <InstagramSidebar isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />
      <div className="flex-1 lg:ml-64">
        <MobileHeader />
        <main className="max-w-[935px] mx-auto pt-8 pb-12 px-4 md:px-0">


          {/* Search Bar */}
          <div className="mb-8 px-2 md:px-0">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="text-gray-400 group-focus-within:text-white transition-colors" size={18} />
              </div>
              <input
                type="text"
                placeholder="Search projects, skills (e.g., 'React')..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#262626] text-white rounded-xl py-3 pl-11 pr-10 focus:outline-none focus:ring-1 focus:ring-gray-700 transition-all placeholder-gray-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white"
                >
                  <X size={16} className="bg-gray-700 rounded-full p-0.5" />
                </button>
              )}
            </div>
          </div>

          {/* Popular / Trending Tags */}
          {!searchQuery && (
            <div className="mb-8 px-2 md:px-0">
              <div className="flex items-center gap-2 mb-3 text-sm font-semibold text-gray-400">
                <TrendingUp size={14} />
                <span>Popular Skills</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {popularSkills.map((skill, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSearchQuery(skill)}
                    className="bg-[#262626] hover:bg-[#363636] px-4 py-1.5 rounded-full text-sm font-medium transition-colors border border-transparent hover:border-gray-700"
                  >
                    {skill}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Grid Content */}
          <div className="grid grid-cols-3 gap-1 md:gap-7">
            {results.map((project) => (
              <div key={project._id} className="relative aspect-[4/5] md:aspect-square group cursor-pointer bg-[#121212]">
                <Image
                  src={project.images?.[0] || "https://placehold.co/600x400?text=No+Image"}
                  alt={project.title}
                  fill
                  className="object-cover transition-opacity duration-300 group-hover:opacity-60"
                  sizes="(max-width: 768px) 33vw, 300px"
                />

                {/* Hover Overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-2 text-center">
                  <h3 className="text-white font-bold text-sm md:text-lg mb-1 drop-shadow-lg">{project.title}</h3>
                  <div className="flex flex-wrap justify-center gap-1 mb-2">
                    {(project.techStack || []).slice(0, 3).map((t, i) => (
                      <span key={i} className="text-[10px] bg-blue-600/80 px-1.5 py-0.5 rounded text-white backdrop-blur-sm">
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4 text-white font-bold drop-shadow-md">
                    <span className="flex items-center gap-1 text-sm"><span className="text-xl">♥</span> {project.likes || 0}</span>
                    <span className="flex items-center gap-1 text-sm"><span className="text-xl">💬</span> {project.commentsCount || (project.comments ? project.comments.length : 0)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {!loading && results.length === 0 && (
            <div className="text-center py-20 text-gray-500">
              <Search size={48} className="mx-auto mb-4 opacity-50" />
              <p>No projects found for "{searchQuery}"</p>
            </div>
          )}

        </main>
      </div>
      <BottomNav />
    </div>
  );
}
