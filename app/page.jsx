"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  Home,
  Search,
  PlaySquare,
  Send,
  Heart,
  PlusSquare,
  MessageCircle,
  X,
} from "lucide-react";
import InstagramSidebar from "./_components/Sidebar";
import PostCard from "@/app/_components/PostCard";
import StoryList from "@/app/_components/StoryList";
import StoryViewer from "@/app/_components/StoryViewer";
import Feed from "@/app/_components/Feed";
import MobileHeader from "@/app/_components/MobileHeader";
import RightSidebar from "@/app/_components/RightSidebar";
import BottomNav from "@/app/_components/BottomNav";
import axios from "axios";
import SkeletonPost from "@/app/_components/SkeletonPost";
import SkeletonStory from "@/app/_components/SkeletonStory";

export default function InstagramHome() {
  const [activeStoryIndex, setActiveStoryIndex] = useState(null);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [feed, setFeed] = useState([]);
  const [storiesData, setStoriesData] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const observerTarget = useRef(null);
  const timerRef = useRef(null);

  const fetchFeed = async (pageNum = 1) => {
    try {
      const feedData = await axios.get(`/api/posts?page=${pageNum}&limit=5`);
      const newPosts = feedData.data.data || [];

      if (pageNum === 1) {
        setFeed(newPosts);
      } else {
        setFeed((prev) => {
          const existingIds = new Set(prev.map(p => p._id));
          const uniqueNewPosts = newPosts.filter(p => !existingIds.has(p._id));
          return [...prev, ...uniqueNewPosts];
        });
      }

      if (newPosts.length === 0) {
        setHasMore(false);
      }
    } catch (err) {
      console.error("Failed to fetch feed", err);
      // Fallback for demo if API fails or is mock
      if (pageNum > 1) setHasMore(false);
    }
  };

  const fetchStories = async () => {
    try {
      const res = await axios.get("/api/stories?limit=50");
      setStoriesData(res.data.data || []);
    } catch (err) {
      console.error("Failed to fetch stories", err);
    }
  };

  useEffect(() => {
    const loadInitial = async () => {
      setLoading(true);
      await Promise.all([fetchFeed(1), fetchStories()]);
      setLoading(false);
    };
    loadInitial();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && hasMore) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1.0 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [observerTarget, hasMore, loading]);

  useEffect(() => {
    if (page > 1) {
      fetchFeed(page);
    }
  }, [page]);

  const stories = [
    {
      username: "React",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png",
      gradient: "from-blue-400 via-blue-500 to-blue-600",
      content: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800",
    },
    {
      username: "Node.js",
      image: "https://nodejs.org/static/images/logo.svg",
      gradient: "from-green-400 via-green-500 to-green-600",
      content: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800",
    },
    {
      username: "Design",
      image: "https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg",
      gradient: "from-purple-400 via-pink-500 to-red-500",
      content: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=800",
    },
  ];

  const suggestions = [
    {
      username: "vercel",
      subtitle: "Deployment Platform",
      image: "https://assets.vercel.com/image/upload/front/favicon/vercel/180x180.png",
      verified: true,
    },
    {
      username: "nextjs",
      subtitle: "The React Framework",
      image: "https://assets.vercel.com/image/upload/v1662130559/nextjs/Icon_light_background.png",
      verified: true,
    },
    {
      username: "tailwindcss",
      subtitle: "Utility-first CSS",
      image: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg",
      verified: true,
    },
  ];

  const footerLinks = [
    "About",
    "Help",
    "Press",
    "API",
    "Jobs",
    "Privacy",
    "Terms",
    "Locations",
    "Language",
    "Meta Verified",
  ];

  useEffect(() => {
    if (activeStoryIndex !== null && !isPaused) {
      timerRef.current = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            goToNextStory();
            return 0;
          }
          return prev + 100 / 150;
        });
      }, 100);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [activeStoryIndex, isPaused]);

  const openStory = async (index) => {
    setActiveStoryIndex(index);
    setProgress(0);

    // increment view once per browser session/localStorage for this story
    try {
      const story = storiesData?.[index];
      if (story && story._id) {
        const key = `story_viewed_${story._id}`;
        if (!localStorage.getItem(key)) {
          localStorage.setItem(key, "1");
          await fetch(`/api/stories/${story._id}/view`, { method: "POST" });
        }
      }
    } catch (err) {
      console.error("Failed to record story view", err);
    }
  };
  const closeStory = () => {
    setActiveStoryIndex(null);
    setProgress(0);
    setIsPaused(false);
  };
  const goToNextStory = () => {
    if (activeStoryIndex < stories.length - 1) {
      setActiveStoryIndex(activeStoryIndex + 1);
      setProgress(0);
    } else closeStory();
  };
  const goToPreviousStory = () => {
    if (activeStoryIndex > 0) {
      setActiveStoryIndex(activeStoryIndex - 1);
      setProgress(0);
    }
  };
  const handleStoryPress = () => setIsPaused(true);
  const handleStoryRelease = () => setIsPaused(false);
  const handleTouchStart = (e) => setTouchStart(e.touches[0].clientX);
  const handleTouchEnd = (e) => {
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    if (Math.abs(diff) > 50) {
      if (diff > 0) goToNextStory();
      else goToPreviousStory();
    }
  };
  const handleStoryClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.width;
    if (x < width / 2) goToPreviousStory();
    else goToNextStory();
  };

  const onNextStory = () => {
    if (activeStoryIndex === null) return;
    if (activeStoryIndex < (storiesData.length - 1)) {
      const next = activeStoryIndex + 1;
      setActiveStoryIndex(next);
      setProgress(0);
      // record view for next story
      const story = storiesData[next];
      if (story && story._id) {
        const key = `story_viewed_${story._id}`;
        if (!localStorage.getItem(key)) {
          localStorage.setItem(key, "1");
          fetch(`/api/stories/${story._id}/view`, { method: "POST" }).catch(() => { });
        }
      }
    } else {
      setActiveStoryIndex(null);
    }
  };

  const onPrevStory = () => {
    if (activeStoryIndex === null) return;
    if (activeStoryIndex > 0) {
      setActiveStoryIndex(activeStoryIndex - 1);
      setProgress(0);
    }
  };

  return (
    <div className="flex bg-black min-h-screen">
      <InstagramSidebar
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      <div className="flex-1 lg:ml-64">
        <MobileHeader />

        <div className="flex">
          <div className="flex-1 overflow-y-auto bg-black">
            <div className="max-w-[630px] mx-auto py-4 md:py-8">
              {loading ? (
                <>
                  <div className="flex gap-3 md:gap-4 mb-6 px-4 overflow-x-auto scrollbar-hide" style={{ scrollbarWidth: "none" }}>
                    {[...Array(6)].map((_, i) => (
                      <SkeletonStory key={i} />
                    ))}
                  </div>
                  {[...Array(2)].map((_, i) => (
                    <SkeletonPost key={i} />
                  ))}
                </>
              ) : (
                <>
                  <StoryList stories={storiesData.length ? storiesData : stories} openStory={openStory} />
                  {feed && feed.map((item) => <PostCard key={item._id} {...item} />)}

                  {/* Infinite Scroll Loader & Target */}
                  <div ref={observerTarget} className="h-10 flex items-center justify-center py-4">
                    {hasMore && <div className="w-6 h-6 border-2 border-gray-600 border-t-transparent rounded-full animate-spin"></div>}
                    {!hasMore && feed.length > 0 && <p className="text-gray-500 text-sm">You've caught up!</p>}
                  </div>
                </>
              )}
            </div>
          </div>

          <RightSidebar suggestions={suggestions} footerLinks={footerLinks} />
        </div>

        <StoryViewer
          activeStoryIndex={activeStoryIndex}
          stories={storiesData.length ? storiesData : stories}
          closeStory={closeStory}
          handleStoryPress={handleStoryPress}
          handleStoryRelease={handleStoryRelease}
          handleTouchStart={handleTouchStart}
          handleTouchEnd={handleTouchEnd}
          onNextStory={onNextStory}
          onPrevStory={onPrevStory}
        />

        <BottomNav />
      </div>
    </div>
  );
}
