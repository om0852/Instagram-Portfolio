import React from "react";

export default function SkeletonStory() {
    return (
        <div className="flex flex-col items-center gap-1 shrink-0 animate-pulse">
            <div className="w-16 h-16 md:w-[84px] md:h-[84px] rounded-full bg-gray-800" />
            <div className="w-12 h-2.5 bg-gray-800 rounded" />
        </div>
    );
}
