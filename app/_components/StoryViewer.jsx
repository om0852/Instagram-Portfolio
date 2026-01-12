"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { X, Heart, Send } from "lucide-react";

export default function StoryViewer({
  activeStoryIndex,
  stories,
  closeStory,
  handleStoryPress,
  handleStoryRelease,
  handleTouchStart,
  handleTouchEnd,
  onNextStory,
  onPrevStory,
}) {
  const [mediaIndex, setMediaIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);
  const [liked, setLiked] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [showComments, setShowComments] = useState(false);
  const intervalRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    setMediaIndex(0);
    setProgress(0);
  }, [activeStoryIndex]);

  // initialize liked state when story changes
  useEffect(() => {
    try {
      const story = stories?.[activeStoryIndex];
      if (story && story._id) {
        const key = `story_liked_${story._id}`;
        setLiked(!!localStorage.getItem(key));
      } else {
        setLiked(false);
      }
    } catch (e) {
      setLiked(false);
    }
  }, [activeStoryIndex, stories]);

  useEffect(() => {
    if (activeStoryIndex === null) return;
    const story = stories?.[activeStoryIndex];
    if (!story) return;

    const normalizedMedia = story.media || [{ type: 'image', url: story.content || story.image, duration: 7000 }];
    const current = normalizedMedia[mediaIndex];
    if (!current) return;

    // determine duration (ms) - use longer duration for stories with captions
    let duration = current.duration || (current.type === "image" ? 7000 : 0);

    // If there's a caption, give more time to read
    if (current.caption && current.caption.length > 100) {
      duration = 8000; // 8 seconds for longer captions
    }

    // video: wait for video element's metadata
    if (current.type === "video") {
      setProgress(0);
      // if video element available, play and listen to ended
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch(() => { });
        const onLoaded = () => {
          duration = Math.floor((videoRef.current.duration || 7) * 1000);
          startTimer(duration);
        };
        const onEnded = () => goToNextMedia();
        videoRef.current.addEventListener("loadedmetadata", onLoaded);
        videoRef.current.addEventListener("ended", onEnded);
        return () => {
          if (videoRef.current) {
            videoRef.current.removeEventListener("loadedmetadata", onLoaded);
            videoRef.current.removeEventListener("ended", onEnded);
          }
        };
      }
    } else {
      setProgress(0);
      startTimer(duration);
    }

    function startTimer(dur) {
      clearInterval(intervalRef.current);
      const step = 50; // Update every 50ms for smoother animation
      const totalSteps = Math.max(1, Math.floor(dur / step));
      let counter = 0;

      intervalRef.current = setInterval(() => {
        if (paused) return;
        counter++;
        const newProgress = Math.min(100, (counter / totalSteps) * 100);
        setProgress(newProgress);

        if (counter >= totalSteps) {
          clearInterval(intervalRef.current);
          goToNextMedia();
        }
      }, step);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeStoryIndex, mediaIndex, paused]);

  if (activeStoryIndex === null) return null;

  const story = stories ? stories[activeStoryIndex] : null;

  if (!story) return null;

  // Normalize simple stories (from local const) to match the media array structure
  const media = story.media || [{ type: 'image', url: story.content || story.image, duration: 5000 }];
  const current = media[mediaIndex] || media[0];

  function goToNextMedia() {
    if (mediaIndex < media.length - 1) {
      setMediaIndex(mediaIndex + 1);
      setProgress(0);
    } else {
      // move to next story
      if (onNextStory) onNextStory();
      else closeStory();
    }
  }

  function goToPrevMedia() {
    if (mediaIndex > 0) {
      setMediaIndex(mediaIndex - 1);
      setProgress(0);
    } else {
      if (onPrevStory) onPrevStory();
    }
  }

  // like handling (simple toggle stored in localStorage; server increments/decrements)
  // liked state is declared at top; compute key per-story here
  const likedKey = story && story._id ? `story_liked_${story._id}` : null;

  async function toggleLike() {
    try {
      const newLike = !liked;
      setLiked(newLike);
      if (newLike) localStorage.setItem(likedKey, "1");
      else localStorage.removeItem(likedKey);

      await fetch(`/api/stories/${story._id}/like`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ like: newLike }),
      });
    } catch (err) {
      console.error("Failed to toggle like", err);
      setLiked((s) => !s);
    }
  }

  async function handleSendComment(e) {
    if ((e.key === "Enter" || e.type === "click") && commentText.trim()) {
      const text = commentText;
      setCommentText("");
      // Optimistic/Feedback
      alert("Message sent! 🔥");

      try {
        await fetch(`/api/stories/${story._id}/comment`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text }),
        });
      } catch (err) {
        console.error("Failed to send comment", err);
      }
    }
  }

  return (
    <div className="fixed inset-0 bg-black z-[60] flex items-center justify-center" role="dialog" aria-modal="true">
      <div className="absolute top-2 left-2 right-2 flex gap-1 z-10">
        {(story.media || [{}]).map((_, index) => (
          <div key={index} className="flex-1 h-0.5 bg-gray-600 rounded-full overflow-hidden">
            <div className="h-full bg-white transition-all duration-100" style={{ width: index < mediaIndex ? "100%" : index === mediaIndex ? `${progress}%` : "0%" }} />
          </div>
        ))}
      </div>

      <div className="absolute top-6 left-4 right-4 flex items-center justify-between z-10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-white relative">
            <Image
              src={story.media?.[0]?.thumbnail || story.media?.[0]?.url}
              alt={story.title || "story"}
              fill
              className="object-cover"
            />
          </div>
          <span className="text-white font-semibold text-sm">{story.ownerName || story.title}</span>
          <span className="text-gray-300 text-xs">{new Date(story.createdAt).toLocaleString()}</span>
        </div>
        <button onClick={closeStory} className="text-white">
          <X size={28} />
        </button>
      </div>


      <div
        className="w-full h-full flex items-center justify-center cursor-pointer select-none relative"
        onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const width = rect.width;
          // Left third: go to previous
          if (x < width / 3) {
            goToPrevMedia();
          }
          // Right two-thirds: go to next
          else {
            goToNextMedia();
          }
        }}
        onMouseDown={() => { handleStoryPress && handleStoryPress(); setPaused(true); }}
        onMouseUp={() => { handleStoryRelease && handleStoryRelease(); setPaused(false); }}
        onMouseLeave={() => { handleStoryRelease && handleStoryRelease(); setPaused(false); }}
        onTouchStart={(e) => { handleStoryPress && handleStoryPress(); handleTouchStart && handleTouchStart(e); setPaused(true); }}
        onTouchEnd={(e) => { handleStoryRelease && handleStoryRelease(); handleTouchEnd && handleTouchEnd(e); setPaused(false); }}
      >
        {current?.type === "video" ? (
          <video ref={videoRef} src={current.url} className="max-w-full max-h-full object-contain" controls={false} playsInline />
        ) : (
          <Image
            src={current?.url}
            alt={story.title || "story-image"}
            fill
            className="object-contain"
            priority
          />
        )}

        {/* Storytelling Caption Overlay */}
        {current?.caption && (
          <div className="absolute inset-x-0 bottom-24 flex items-center justify-center px-6 z-20 pointer-events-none animate-fadeIn">
            <div className="max-w-lg w-full">
              <p className="text-white text-center text-lg md:text-xl font-medium leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] px-4 py-3 rounded-lg bg-black/20 backdrop-blur-sm">
                {current.caption}
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="absolute bottom-8 left-4 right-4 flex items-center gap-2 z-10">
        <input
          type="text"
          placeholder="Send message..."
          className="flex-1 bg-transparent border border-gray-400 rounded-full px-4 py-3 text-white placeholder-gray-300 outline-none focus:border-white transition-colors"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          onKeyDown={handleSendComment}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        />
        <button onClick={toggleLike} className="flex items-center active:scale-95 transition-transform">
          <Heart className={`transition-colors ${liked ? "text-red-500 fill-red-500" : "text-white"}`} size={28} strokeWidth={1.5} />
        </button>
        <button onClick={(e) => handleSendComment({ ...e, type: 'click' })} className="flex items-center active:scale-95 transition-transform">
          <Send className="text-white" size={28} strokeWidth={1.5} />
        </button>
      </div>
    </div>
  );
}
