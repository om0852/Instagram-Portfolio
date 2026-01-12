import React, { useState, useEffect } from "react";
import Image from "next/image";
import { usePostInteraction } from "@/app/hooks/usePostInteraction";
import {
  Heart,
  MessageCircle,
  Send,
  Bookmark,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  Play,
  ExternalLink,
  Github,
  FileText,
} from "lucide-react";

const PostCard = ({
  title = "mumbaiindians",
  subtitle = "Mumbai Indians",
  content = "The He-man of Bollywood will forever remain in our hearts",
  images = [
    "https://images.unsplash.com/photo-1566753323558-f4e0952af115?w=800",
    "https://images.unsplash.com/photo-1551817958-11e0f7bbea14?w=800",
    "https://images.unsplash.com/photo-1574169208507-84376144848b?w=800",
  ],
  tags = ["#bollywood", "#legend", "#forever"],
  techStack = ["React", "Node.js", "MongoDB"],
  githubUrl = "https://github.com/example/project",
  liveUrl = "https://example.com",
  caseStudyUrl = "https://example.com/case-study",
  videoUrl = "",
  thumbnailUrl = "https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=150",
  isPinned = false,
  likes = 1234,
  views = 5678,
  comments = 89,
  createdAt = "2024-03-15T10:30:00Z",
  _id = null,
}) => {
  const initialCommentsCount = Array.isArray(comments)
    ? comments.length
    : typeof comments === "number"
      ? comments
      : 0;
  const initialCommentsList = Array.isArray(comments)
    ? comments.map((c) => ({ text: c.text, createdAt: c.createdAt, _id: c._id }))
    : [];

  const {
    isLiked,
    isSaved,
    likeCount,
    commentsCount,
    commentsList,
    toggleLike,
    toggleSave,
    addComment,
    sharePost,
  } = usePostInteraction({
    _id,
    likes,
    comments: initialCommentsCount,
    initialCommentsList,
  });

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [commentText, setCommentText] = useState("");
  const [showComments, setShowComments] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [imageError, setImageError] = useState(false);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now - date;
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInHours / 24);
    const diffInWeeks = Math.floor(diffInDays / 7);

    if (diffInHours < 1) return "just now";
    if (diffInHours < 24) return `${diffInHours}h`;
    if (diffInDays < 7) return `${diffInDays}d`;
    if (diffInWeeks < 4) return `${diffInWeeks}w`;
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  const handleComment = () => {
    addComment(commentText);
    setCommentText("");
  };

  const handleShare = (platform) => {
    sharePost(); // Track share in backend
    const url = liveUrl || window.location.href;
    const text = `Check out this post by ${title}`;

    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`,
    };

    if (shareUrls[platform]) {
      window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    }
    setShowShare(false);
  };

  const copyLink = () => {
    navigator.clipboard.writeText(liveUrl || window.location.href);
    alert('Link copied to clipboard!');
    setShowShare(false);
  };

  const nextImage = () => {
    setImageError(false);
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setImageError(false);
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="bg-black border border-gray-800 rounded-lg mb-4 max-w-[470px] mx-auto sm:max-w-full">
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2.5">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full flex-shrink-0 relative">
            <Image
              src={thumbnailUrl}
              alt={title}
              fill
              className="rounded-full object-cover"
              sizes="32px"
            />
          </div>
          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-1.5">
              <span className="text-white text-sm font-semibold leading-none">{title}</span>
              {isPinned && <span className="text-gray-400 text-xs transform rotate-45">📌</span>}
            </div>
            {subtitle && (
              <span className="text-gray-400 text-xs leading-none mt-0.5">{subtitle}</span>
            )}
          </div>
        </div>
        <button className="text-white hover:opacity-70 transition-opacity">
          <MoreHorizontal size={20} />
        </button>
      </div>

      {/* Media Section */}
      <div className="relative bg-black">
        {videoUrl ? (
          <div className="relative w-full aspect-square">
            <video
              src={videoUrl}
              controls
              className="w-full h-full object-cover"
              poster={images[0]}
            />
            <div className="absolute top-3 right-3 bg-black/60 rounded px-2 py-1">
              <Play size={16} className="text-white" />
            </div>
          </div>
        ) : (
          <div className="relative w-full aspect-square">
            <Image
              src={imageError ? "https://placehold.co/600x400?text=Image+Not+Found" : images[currentImageIndex]}
              alt={`Post ${currentImageIndex + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 470px"
              priority={currentImageIndex === 0}
              onError={() => setImageError(true)}
            />

            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-1.5 transition-all z-10"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-1.5 transition-all z-10"
                >
                  <ChevronRight size={20} />
                </button>

                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                  {images.map((_, idx) => (
                    <div
                      key={idx}
                      className={`w-1.5 h-1.5 rounded-full transition-all ${idx === currentImageIndex ? "bg-white w-2" : "bg-white/50"
                        }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="px-3 py-2.5">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-4">
            <button
              onClick={toggleLike}
              className="hover:opacity-60 transition-opacity"
            >
              <Heart
                size={24}
                className={isLiked ? "text-red-500 fill-red-500" : "text-white"}
                strokeWidth={1.5}
              />
            </button>
            <button
              onClick={() => setShowComments(!showComments)}
              className="hover:opacity-60 transition-opacity"
            >
              <MessageCircle size={24} className="text-white" strokeWidth={1.5} />
            </button>
            <button
              onClick={() => setShowShare(!showShare)}
              className="hover:opacity-60 transition-opacity relative"
            >
              <Send size={24} className="text-white" strokeWidth={1.5} />
            </button>
          </div>
          <button
            onClick={toggleSave}
            className="hover:opacity-60 transition-opacity"
          >
            <Bookmark
              size={24}
              className={isSaved ? "text-white fill-white" : "text-white"}
              strokeWidth={1.5}
            />
          </button>
        </div>

        {/* Share Modal */}
        {showShare && (
          <div className="bg-gray-900 rounded-lg p-3 mb-3 border border-gray-700">
            <div className="text-white text-sm font-semibold mb-2">Share to</div>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleShare('twitter')}
                className="bg-gray-800 hover:bg-gray-700 text-white px-3 py-2 rounded text-sm transition-colors"
              >
                Twitter
              </button>
              <button
                onClick={() => handleShare('facebook')}
                className="bg-gray-800 hover:bg-gray-700 text-white px-3 py-2 rounded text-sm transition-colors"
              >
                Facebook
              </button>
              <button
                onClick={() => handleShare('linkedin')}
                className="bg-gray-800 hover:bg-gray-700 text-white px-3 py-2 rounded text-sm transition-colors"
              >
                LinkedIn
              </button>
              <button
                onClick={() => handleShare('whatsapp')}
                className="bg-gray-800 hover:bg-gray-700 text-white px-3 py-2 rounded text-sm transition-colors"
              >
                WhatsApp
              </button>
            </div>
            <button
              onClick={copyLink}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-sm mt-2 transition-colors"
            >
              Copy Link
            </button>
          </div>
        )}

        {/* Likes */}
        <div className="flex items-center gap-1 mb-2">
          <div className="flex -space-x-2">
            <Image
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50"
              alt=""
              width={20}
              height={20}
              className="w-5 h-5 rounded-full border border-black"
            />
            <Image
              src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=50"
              alt=""
              width={20}
              height={20}
              className="w-5 h-5 rounded-full border border-black"
            />
          </div>
          <span className="text-white text-sm font-semibold">
            {likeCount.toLocaleString()} likes
          </span>
        </div>

        {/* Caption */}
        <div className="mb-1">
          <span className="text-white text-sm">
            <span className="font-semibold">{title}</span> {content}
          </span>
        </div>

        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-2">
            {tags.map((tag, idx) => (
              <span key={idx} className="text-blue-400 text-sm">
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Tech Stack & Links */}
        {(techStack?.length > 0 || githubUrl || liveUrl || caseStudyUrl) && (
          <div className="mb-3 space-y-2">
            {techStack && techStack.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-2">
                {techStack.map((tech, idx) => (
                  <span
                    key={idx}
                    className="bg-[#262626] text-gray-200 text-[11px] font-medium px-2 py-0.5 rounded"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}
            <div className="flex flex-wrap gap-4">
              {githubUrl && (
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-blue-500 text-sm font-semibold hover:text-blue-400 transition-colors"
                >
                  <Github size={14} /> Source Code
                </a>
              )}
              {liveUrl && (
                <a
                  href={liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-blue-500 text-sm font-semibold hover:text-blue-400 transition-colors"
                >
                  <ExternalLink size={14} /> Live Demo
                </a>
              )}
              {caseStudyUrl && (
                <a
                  href={caseStudyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-gray-400 text-sm font-semibold hover:text-gray-300 transition-colors"
                >
                  <FileText size={14} /> Read Case Study
                </a>
              )}
            </div>
          </div>
        )}

        {/* Comments Toggle */}
        <button
          onClick={() => setShowComments(!showComments)}
          className="text-gray-400 text-sm hover:text-gray-300 transition-colors"
        >
          View all {commentsCount} comments
        </button>

        {/* Comments Section */}
        {showComments && (
          <div className="mt-3 space-y-2 max-h-60 overflow-y-auto">
            {commentsList.map((c, idx) => (
              <div key={idx} className="text-sm">
                <span className="text-white font-semibold">{c.optimistic ? "you" : "user"}</span>{" "}
                <span className="text-white">{c.text}</span>
              </div>
            ))}
          </div>
        )}

        {/* Add Comment */}
        <div className="flex items-center gap-2 mt-2 pt-2 border-t border-gray-800">
          <input
            type="text"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleComment()}
            placeholder="Add a comment..."
            className="bg-transparent text-white text-sm flex-1 outline-none placeholder-gray-500"
          />
          {commentText.trim() && (
            <button
              onClick={handleComment}
              className="text-blue-500 text-sm font-semibold hover:text-blue-400 transition-colors"
            >
              Post
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostCard

// // Demo with multiple cards
// export default function App() {
//   const samplePosts = [
//     {
//       title: "techstartup",
//       subtitle: "Tech Startup Inc",
//       content: "Just launched our new AI-powered dashboard! Check out the live demo 🚀",
//       images: [
//         "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800",
//         "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
//         "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800",
//       ],
//       tags: ["#ai", "#dashboard", "#saas"],
//       techStack: ["React", "TypeScript", "TailwindCSS", "Node.js"],
//       githubUrl: "https://github.com",
//       liveUrl: "https://example.com",
//       caseStudyUrl: "https://example.com/case-study",
//       likes: 2341,
//       comments: 156,
//       createdAt: "2024-03-10T14:30:00Z",
//     },
//     {
//       title: "designstudio",
//       subtitle: "Creative Design Studio",
//       content: "New branding project for a sustainable fashion brand 🌿",
//       images: [
//         "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800",
//       ],
//       tags: ["#design", "#branding", "#sustainability"],
//       techStack: ["Figma", "Illustrator", "After Effects"],
//       liveUrl: "https://example.com",
//       likes: 1876,
//       comments: 92,
//       createdAt: "2024-03-12T09:15:00Z",
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-black py-4 px-2 sm:px-4">
//       <div className="max-w-2xl mx-auto space-y-4">
//         {samplePosts.map((post, idx) => (
//           <PostCard key={idx} {...post} />
//         ))}
//       </div>
//     </div>
//   );
// }