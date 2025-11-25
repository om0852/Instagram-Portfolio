"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  Home,
  Search,
  Compass,
  PlaySquare,
  Send,
  Heart,
  PlusSquare,
  BarChart3,
  User,
  MoreHorizontal,
  MessageCircle,
  X,
  Menu,
} from "lucide-react";
import InstagramSidebar from "./_components/Sidebar";

export default function InstagramHome() {
  const [activeStoryIndex, setActiveStoryIndex] = useState(null);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const timerRef = useRef(null);

  const stories = [
    {
      username: "Your story",
      image:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150",
      gradient: "from-purple-600 via-pink-500 to-orange-400",
      content:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=800",
    },
    {
      username: "comeonashh_",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
      gradient: "from-yellow-400 via-pink-500 to-purple-600",
      content:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800",
    },
    {
      username: "shubh_kothariii",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
      gradient: "from-yellow-400 via-orange-500 to-pink-500",
      content:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800",
    },
    {
      username: "ashishchand",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
      gradient: "from-purple-600 via-pink-500 to-orange-400",
      content:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800",
    },
    {
      username: "tech_wizzd",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
      gradient: "from-yellow-400 via-pink-500 to-purple-600",
      content:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800",
    },
    {
      username: "sw_p_nill",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
      gradient: "from-orange-500 via-red-500 to-pink-600",
      content:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800",
    },
  ];

  const suggestions = [
    {
      username: "nikkita_bidwai",
      subtitle: "Followed by kanishka_73 + 13 ...",
      image:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150",
      verified: false,
    },
    {
      username: "swapnalivyawahare_",
      subtitle: "Followed by _pramodini_41 + 1...",
      image:
        "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150",
      verified: false,
    },
    {
      username: "mayurpawar_02_",
      subtitle: "Followed by pruthvi_sing_rajput...",
      image:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150",
      verified: false,
    },
    {
      username: "manisha_kite10",
      subtitle: "Followed by _shravan_999",
      image:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
      verified: false,
    },
    {
      username: "rizwan_inamdarrr",
      subtitle: "Followed by pruthvi_sing_rajput...",
      image:
        "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150",
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
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [activeStoryIndex, isPaused]);

  const openStory = (index) => {
    setActiveStoryIndex(index);
    setProgress(0);
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
    } else {
      closeStory();
    }
  };

  const goToPreviousStory = () => {
    if (activeStoryIndex > 0) {
      setActiveStoryIndex(activeStoryIndex - 1);
      setProgress(0);
    }
  };

  const handleStoryPress = () => {
    setIsPaused(true);
  };

  const handleStoryRelease = () => {
    setIsPaused(false);
  };

  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        goToNextStory();
      } else {
        goToPreviousStory();
      }
    }
  };

  const handleStoryClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.width;

    if (x < width / 2) {
      goToPreviousStory();
    } else {
      goToNextStory();
    }
  };

  return (
    <div className="flex bg-black min-h-screen">
      <InstagramSidebar
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      {/* Main Content */}
      <div className="flex-1 lg:ml-64">
        {/* Mobile Header */}
        <div className="lg:hidden bg-black border-b border-gray-800 px-4 py-3 flex items-center justify-between sticky top-0 z-40">
          <h1 className="text-white text-xl font-cursive">Instagram</h1>
          <div className="flex gap-4 items-center">
            <Heart className="text-white" size={24} />
            <div className="relative">
              <Send className="text-white" size={24} />
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-semibold rounded-full w-4 h-4 flex items-center justify-center">
                8
              </span>
            </div>
          </div>
        </div>

        <div className="flex">
          {/* Feed */}
          <div className="flex-1 overflow-y-auto bg-black">
            <div className="max-w-[630px] mx-auto py-4 md:py-8">
              {/* Stories Section */}
              <div
                className="flex gap-3 md:gap-4 mb-6 px-4 overflow-x-auto scrollbar-hide"
                style={{
                  scrollbarWidth: "none",
                }}
              >
                {stories.map((story, index) => (
                  <button
                    key={index}
                    onClick={() => openStory(index)}
                    className="flex flex-col items-center gap-1 flex-shrink-0"
                  >
                    <div
                      className={`p-[2px] rounded-full bg-gradient-to-tr ${story.gradient}`}
                    >
                      <div
                        className="p-[2px] md:p-[3px] bg-black rounded-full "
                        style={{
                          scrollbarWidth: "none",
                        }}
                      >
                        <img
                          src={story.image}
                          alt={story.username}
                          className="w-14 h-14 md:w-20 md:h-20 rounded-full object-cover"
                        />
                      </div>
                    </div>
                    <span className="text-xs text-white max-w-[60px] truncate">
                      {story.username}
                    </span>
                  </button>
                ))}
              </div>

              {/* Post */}
              <div className="bg-black border-b border-gray-800 mb-4">
                <div className="flex items-center justify-between px-3 py-2.5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full">
                      <img
                        src="https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=150"
                        alt="mumbaiindians"
                        className="w-full h-full rounded-full object-cover"
                      />
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-white text-sm font-semibold">
                        mumbaiindians
                      </span>
                      <svg
                        className="w-3.5 h-3.5 text-blue-500"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                      </svg>
                      <span className="text-gray-400 text-sm">• 6h</span>
                    </div>
                  </div>
                  <button className="text-white">
                    <MoreHorizontal size={20} />
                  </button>
                </div>

                <img
                  src="https://images.unsplash.com/photo-1566753323558-f4e0952af115?w=800"
                  alt="Post"
                  className="w-full aspect-square object-cover"
                />

                <div className="px-3 py-2.5">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-4">
                      <button className="hover:opacity-50 transition-opacity">
                        <Heart
                          size={26}
                          className="text-white"
                          strokeWidth={1.5}
                        />
                      </button>
                      <button className="hover:opacity-50 transition-opacity">
                        <MessageCircle
                          size={26}
                          className="text-white"
                          strokeWidth={1.5}
                        />
                      </button>
                      <button className="hover:opacity-50 transition-opacity">
                        <Send
                          size={26}
                          className="text-white"
                          strokeWidth={1.5}
                        />
                      </button>
                    </div>
                    <button className="hover:opacity-50 transition-opacity">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        viewBox="0 0 24 24"
                      >
                        <path d="M5 5l7-2 7 2v11.5l-7 2.5-7-2.5V5z" />
                      </svg>
                    </button>
                  </div>

                  <div className="flex items-center gap-1 mb-2">
                    <div className="flex -space-x-2">
                      <img
                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50"
                        alt=""
                        className="w-5 h-5 rounded-full border border-black"
                      />
                      <img
                        src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=50"
                        alt=""
                        className="w-5 h-5 rounded-full border border-black"
                      />
                    </div>
                    <span className="text-white text-sm font-semibold">
                      205,290 likes
                    </span>
                  </div>

                  <div className="mb-1">
                    <span className="text-white text-sm font-semibold">
                      mumbaiindians{" "}
                    </span>
                    <svg
                      className="w-3 h-3 text-blue-500 inline"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                    <span className="text-white text-sm">
                      {" "}
                      The He-man of Bollywood will forever remain in our hearts{" "}
                    </span>
                    <span className="text-blue-400 text-sm">💙</span>
                  </div>
                  <button className="text-gray-400 text-sm">... more</button>

                  <button className="text-gray-400 text-sm block mt-1">
                    View all 649 comments
                  </button>

                  <div className="flex items-center gap-2 mt-2 pt-2 border-t border-gray-800">
                    <input
                      type="text"
                      placeholder="Add a comment..."
                      className="bg-transparent text-white text-sm flex-1 outline-none placeholder-gray-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar - Desktop/Tablet Only */}
          <div className="hidden md:block w-[340px] bg-black px-8 py-8 overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150"
                  alt="Profile"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="text-white text-sm font-semibold">
                    salunke_om0852
                  </p>
                  <p className="text-gray-400 text-xs">om_salunke</p>
                </div>
              </div>
              <button className="text-blue-500 text-xs font-semibold">
                Switch
              </button>
            </div>

            <div className="flex items-center justify-between mb-4">
              <p className="text-gray-400 text-sm font-semibold">
                Suggested for you
              </p>
              <button className="text-white text-xs font-semibold">
                See All
              </button>
            </div>

            <div className="space-y-3 mb-8">
              {suggestions.map((user, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={user.image}
                      alt={user.username}
                      className="w-11 h-11 rounded-full object-cover"
                    />
                    <div>
                      <div className="flex items-center gap-1">
                        <p className="text-white text-sm font-semibold">
                          {user.username}
                        </p>
                        {user.verified && (
                          <svg
                            className="w-3 h-3 text-blue-500"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                          </svg>
                        )}
                      </div>
                      <p className="text-gray-400 text-xs">{user.subtitle}</p>
                    </div>
                  </div>
                  <button className="text-blue-500 text-xs font-semibold">
                    Follow
                  </button>
                </div>
              ))}
            </div>

            <div className="text-gray-500 text-xs space-y-3">
              <div className="flex flex-wrap gap-1">
                {footerLinks.map((link, index) => (
                  <React.Fragment key={index}>
                    <a href="#" className="hover:underline">
                      {link}
                    </a>
                    {index < footerLinks.length - 1 && <span>·</span>}
                  </React.Fragment>
                ))}
              </div>
              <p className="text-gray-500">© 2025 INSTAGRAM FROM META</p>
            </div>
          </div>
        </div>

        {/* Mobile Bottom Navigation */}
        <div className="lg:hidden bg-black border-t border-gray-800 px-4 py-2 fixed bottom-0 left-0 right-0 z-40">
          <div className="flex justify-around items-center">
            <Home className="text-white" size={28} />
            <Search className="text-gray-400" size={28} />
            <PlusSquare className="text-gray-400" size={28} />
            <PlaySquare className="text-gray-400" size={28} />
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400"></div>
          </div>
        </div>
      </div>

      {/* Story Viewer Modal */}
      {activeStoryIndex !== null && (
        <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
          {/* Progress Bars */}
          <div className="absolute top-2 left-2 right-2 flex gap-1 z-10">
            {stories.map((_, index) => (
              <div
                key={index}
                className="flex-1 h-0.5 bg-gray-600 rounded-full overflow-hidden"
              >
                <div
                  className="h-full bg-white transition-all duration-100"
                  style={{
                    width:
                      index < activeStoryIndex
                        ? "100%"
                        : index === activeStoryIndex
                        ? `${progress}%`
                        : "0%",
                  }}
                />
              </div>
            ))}
          </div>

          {/* Header */}
          <div className="absolute top-6 left-4 right-4 flex items-center justify-between z-10">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-white">
                <img
                  src={stories[activeStoryIndex].image}
                  alt={stories[activeStoryIndex].username}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-white font-semibold text-sm">
                {stories[activeStoryIndex].username}
              </span>
              <span className="text-gray-300 text-xs">1h</span>
            </div>
            <button onClick={closeStory} className="text-white">
              <X size={28} />
            </button>
          </div>

          {/* Story Content */}
          <div
            className="w-full h-full flex items-center justify-center cursor-pointer select-none"
            onMouseDown={handleStoryPress}
            onMouseUp={handleStoryRelease}
            onMouseLeave={handleStoryRelease}
            onTouchStart={(e) => {
              handleStoryPress();
              handleTouchStart(e);
            }}
            onTouchEnd={(e) => {
              handleStoryRelease();
              handleTouchEnd(e);
            }}
            onClick={handleStoryClick}
          >
            <img
              src={stories[activeStoryIndex].content}
              alt="Story"
              className="max-w-full max-h-full object-contain"
            />
          </div>

          {/* Story Actions */}
          <div className="absolute bottom-8 left-4 right-4 flex items-center gap-2 z-10">
            <input
              type="text"
              placeholder="Send message"
              className="flex-1 bg-transparent border border-gray-400 rounded-full px-4 py-2 text-white placeholder-gray-400 outline-none"
            />
            <Heart className="text-white" size={28} />
            <Send className="text-white" size={28} />
          </div>
        </div>
      )}

      {/* Messages Button - Desktop Only */}
      <div className="hidden lg:block fixed bottom-6 right-6 z-30">
        <button className="flex items-center gap-3 bg-gray-900 hover:bg-gray-800 px-6 py-3 rounded-full transition-colors shadow-lg">
          <div className="relative">
            <MessageCircle size={24} className="text-white" />
            <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center">
              8
            </span>
          </div>
          <span className="text-white font-semibold">Messages</span>
          <div className="flex -space-x-2">
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150"
              alt=""
              className="w-6 h-6 rounded-full border-2 border-gray-900"
            />
            <img
              src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150"
              alt=""
              className="w-6 h-6 rounded-full border-2 border-gray-900"
            />
            <img
              src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150"
              alt=""
              className="w-6 h-6 rounded-full border-2 border-gray-900"
            />
            <div className="w-6 h-6 rounded-full bg-gray-700 border-2 border-gray-900 flex items-center justify-center">
              <span className="text-white text-xs">···</span>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}
