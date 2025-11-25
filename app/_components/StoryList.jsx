"use client";
import React from "react";

export default function StoryList({ stories, openStory }) {
  return (
    <div
      className="flex gap-3 md:gap-4 mb-6 px-4 overflow-x-auto scrollbar-hide"
      style={{ scrollbarWidth: "none" }}
    >
      {stories.map((story, index) => (
        <button
          key={index}
          onClick={() => openStory(index)}
          className="flex flex-col items-center gap-1 flex-shrink-0"
        >
          <div className={`p-[2px] rounded-full bg-gradient-to-tr ${story.gradient}`}>
            <div className="p-[2px] md:p-[3px] bg-black rounded-full " style={{ scrollbarWidth: "none" }}>
              <img
                src={story.image}
                alt={story.username}
                className="w-14 h-14 md:w-20 md:h-20 rounded-full object-cover"
              />
            </div>
          </div>
          <span className="text-xs text-white max-w-[60px] truncate">{story.username}</span>
        </button>
      ))}
    </div>
  );
}
