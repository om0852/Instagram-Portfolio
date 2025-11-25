"use client";
import React from "react";
import PostCard from "@/app/_components/PostCard";

export default function Feed({ feed }) {
  return (
    <div className="max-w-[630px] mx-auto py-4 md:py-8">
      {feed && feed.map((item) => (
        <PostCard key={item._id} {...item} />
      ))}
    </div>
  );
}
