"use client";
import React from "react";
import Image from "next/image";

export default function StoryList({ stories, openStory }) {
  return (
    <div className="flex overflow-x-auto w-[100%] gap-3 md:gap-4 mb-6 px-4 scrollbar-hide" style={{ scrollbarWidth: "none" }}>
      {stories.map((story, index) => {
        const thumb = story?.media?.[0]?.thumbnail || story?.media?.[0]?.url || story.image;
        return (
          <button key={index} onClick={() => openStory(index)} className="flex flex-col items-center gap-1 shrink-0">
            <div className={`p-[3px] rounded-full bg-gradient-to-tr ${story.gradient || "from-purple-600 via-pink-500 to-orange-400"}`}>
              <div className="p-[3px] bg-black rounded-full">
                <Image
                  src={thumb}
                  alt={story.title || `story-${index}`}
                  width={120}
                  height={120}
                  className="w-[80px] h-[80px] rounded-full object-cover"
                />
              </div>
            </div>
            <span className="text-xs text-white max-w-[80px] truncate">{story.title || story.ownerName || `Story ${index + 1}`}</span>
          </button>
        );
      })}
    </div>
  );
}
