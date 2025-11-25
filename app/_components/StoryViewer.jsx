"use client";
import React from "react";
import { X, Heart, Send } from "lucide-react";

export default function StoryViewer({
  activeStoryIndex,
  stories,
  progress,
  isPaused,
  closeStory,
  handleStoryPress,
  handleStoryRelease,
  handleTouchStart,
  handleTouchEnd,
  handleStoryClick,
}) {
  if (activeStoryIndex === null) return null;

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      <div className="absolute top-2 left-2 right-2 flex gap-1 z-10">
        {stories.map((_, index) => (
          <div key={index} className="flex-1 h-0.5 bg-gray-600 rounded-full overflow-hidden">
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

      <div className="absolute top-6 left-4 right-4 flex items-center justify-between z-10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-white">
            <img
              src={stories[activeStoryIndex].image}
              alt={stories[activeStoryIndex].username}
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-white font-semibold text-sm">{stories[activeStoryIndex].username}</span>
          <span className="text-gray-300 text-xs">1h</span>
        </div>
        <button onClick={closeStory} className="text-white">
          <X size={28} />
        </button>
      </div>

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
        <img src={stories[activeStoryIndex].content} alt="Story" className="max-w-full max-h-full object-contain" />
      </div>

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
  );
}
