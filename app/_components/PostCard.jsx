import React, { useState, useEffect } from "react";
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
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);
  // normalize incoming `comments` prop which may be a number or an array of comment objects
  const initialCommentsCount = Array.isArray(comments)
    ? comments.length
    : typeof comments === "number"
    ? comments
    : 0;
  const initialCommentsList = Array.isArray(comments)
    ? comments.map((c) => ({ text: c.text, createdAt: c.createdAt, _id: c._id }))
    : [];

  const [commentsCount, setCommentsCount] = useState(initialCommentsCount);
  const [commentsList, setCommentsList] = useState(initialCommentsList); // { text, createdAt }
  const [commentText, setCommentText] = useState("");
  const [showComments, setShowComments] = useState(false);
  // we'll store comments (server + optimistic) in `commentsList`
  const [showShare, setShowShare] = useState(false);

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

  // Load fresh post data and local like/save state
  useEffect(() => {
    if (!_id) return;

    const lsLiked = localStorage.getItem(`liked_${_id}`) === "1";
    const lsSaved = localStorage.getItem(`saved_${_id}`) === "1";
    setIsLiked(lsLiked);
    setIsSaved(lsSaved);

    let mounted = true;
    (async () => {
      try {
        const res = await fetch(`/api/posts/${_id}`);
        if (!res.ok) return;
        const json = await res.json();
        const post = json.data;
        if (!mounted || !post) return;
        setLikeCount(post.likes || 0);
        setCommentsCount(post.commentsCount || (post.comments ? post.comments.length : 0));
        setCommentsList((post.comments || []).map((c) => ({ text: c.text, createdAt: c.createdAt })));
      } catch (err) {
        console.error("Failed to fetch post data", err);
      }
    })();

    // If user had liked locally but server may not have recorded it (no per-user tracking),
    // attempt a one-time sync so the DB reflects this browser's like. This avoids showing
    // the heart as liked but likes count remaining 0 after a refresh.
    (async () => {
      try {
        const syncedFlag = localStorage.getItem(`synced_like_${_id}`) === "1";
        const lsLikedNow = localStorage.getItem(`liked_${_id}`) === "1";
        if (lsLikedNow && !syncedFlag) {
          // send a like=true to ensure DB increments once for this client
          const r = await fetch(`/api/posts/${_id}/interact`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ action: "like", like: true }),
          });
          if (r.ok) {
            localStorage.setItem(`synced_like_${_id}`, "1");
            const j = await r.json();
            if (j.data && typeof j.data.likes === "number") {
              setLikeCount(j.data.likes);
            }
          }
        }
      } catch (err) {
        console.warn("One-time like sync failed", err);
      }
    })();

    return () => (mounted = false);
  }, [_id]);

  const handleLike = async () => {
    const previousLiked = isLiked;
    const previousCount = likeCount;
    const newLiked = !isLiked;

    // optimistic UI
    setIsLiked(newLiked);
    setLikeCount(newLiked ? likeCount + 1 : Math.max(0, likeCount - 1));
    if (_id) localStorage.setItem(`liked_${_id}`, newLiked ? "1" : "0");

    try {
      const res = await fetch(`/api/posts/${_id}/interact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "like", like: newLiked }),
      });

      if (!res.ok) {
        // revert optimistic
        setIsLiked(previousLiked);
        setLikeCount(previousCount);
        if (_id) localStorage.setItem(`liked_${_id}`, previousLiked ? "1" : "0");
        const text = await res.text();
        console.error("Like API returned error:", res.status, text);
        return;
      }

      const json = await res.json();
      if (json.data && typeof json.data.likes === "number") {
        setLikeCount(json.data.likes);
      }
    } catch (err) {
      // network or other error -> revert optimistic
      setIsLiked(previousLiked);
      setLikeCount(previousCount);
      if (_id) localStorage.setItem(`liked_${_id}`, previousLiked ? "1" : "0");
      console.error("Like API error", err);
    }
  };

  const handleComment = async () => {
    const text = commentText.trim();
    if (!text) return;
    // optimistic UI: add to comments list with optimistic flag
    const optimistic = { text, createdAt: new Date().toISOString(), optimistic: true };
    setCommentsList((prev) => [...prev, optimistic]);
    setCommentText("");

    try {
      const res = await fetch(`/api/posts/${_id}/interact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "comment", text }),
      });
      if (res.ok) {
        // re-fetch post to get authoritative comments and count
        const p = await fetch(`/api/posts/${_id}`);
        if (p.ok) {
          const json = await p.json();
          const post = json.data;
          setCommentsList((post.comments || []).map((c) => ({ text: c.text, createdAt: c.createdAt })));
          setCommentsCount(post.commentsCount || (post.comments ? post.comments.length : 0));
        }
      }
    } catch (err) {
      console.error("Comment API error", err);
    }
  };

  const handleShare = (platform) => {
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
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="bg-black border border-gray-800 rounded-lg mb-4 max-w-[470px] mx-auto sm:max-w-full">
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2.5">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full flex-shrink-0">
            <img
              src={thumbnailUrl}
              alt={title}
              className="w-full h-full rounded-full object-cover"
            />
          </div>
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-white text-sm font-semibold">{title}</span>
            {subtitle && (
              <span className="text-gray-400 text-xs">• {subtitle}</span>
            )}
            <svg
              className="w-3.5 h-3.5 text-blue-500 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
            </svg>
            <span className="text-gray-400 text-xs">• {formatDate(createdAt)}</span>
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
            <img
              src={images[currentImageIndex]}
              alt={`Post ${currentImageIndex + 1}`}
              className="w-full h-full object-cover"
            />
            
            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-1.5 transition-all"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-1.5 transition-all"
                >
                  <ChevronRight size={20} />
                </button>
                
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                  {images.map((_, idx) => (
                    <div
                      key={idx}
                      className={`w-1.5 h-1.5 rounded-full transition-all ${
                        idx === currentImageIndex ? "bg-white w-2" : "bg-white/50"
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
              onClick={handleLike}
              className="hover:opacity-50 transition-opacity"
            >
              <Heart
                size={26}
                className={isLiked ? "text-red-500 fill-red-500" : "text-white"}
                strokeWidth={1.5}
              />
            </button>
            <button
              onClick={() => setShowComments(!showComments)}
              className="hover:opacity-50 transition-opacity"
            >
              <MessageCircle size={26} className="text-white" strokeWidth={1.5} />
            </button>
            <button
              onClick={() => setShowShare(!showShare)}
              className="hover:opacity-50 transition-opacity relative"
            >
              <Send size={26} className="text-white" strokeWidth={1.5} />
            </button>
          </div>
            <button
              onClick={async () => {
                const newSaved = !isSaved;
                setIsSaved(newSaved);
                if (_id) localStorage.setItem(`saved_${_id}`, newSaved ? "1" : "0");
                try {
                  const res = await fetch(`/api/posts/${_id}/interact`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ action: "save", save: newSaved }),
                  });
                  if (res.ok) {
                    const json = await res.json();
                    // optionally use json.data.savedCount if you want to show saved count
                    // setSavedCount(json.data.savedCount)
                  }
                } catch (err) {
                  console.error("Save API error", err);
                }
              }}
              className="hover:opacity-50 transition-opacity"
            >
              <Bookmark
                size={26}
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
          <div className="bg-gray-900 rounded-lg p-2.5 mb-2 space-y-2">
            {techStack && techStack.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {techStack.map((tech, idx) => (
                  <span
                    key={idx}
                    className="bg-gray-800 text-gray-300 text-xs px-2 py-1 rounded"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}
            <div className="flex flex-wrap gap-2">
              {githubUrl && (
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 bg-gray-800 hover:bg-gray-700 text-white text-xs px-2 py-1 rounded transition-colors"
                >
                  <Github size={12} /> Code
                </a>
              )}
              {liveUrl && (
                <a
                  href={liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white text-xs px-2 py-1 rounded transition-colors"
                >
                  <ExternalLink size={12} /> Live Demo
                </a>
              )}
              {caseStudyUrl && (
                <a
                  href={caseStudyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 bg-gray-800 hover:bg-gray-700 text-white text-xs px-2 py-1 rounded transition-colors"
                >
                  <FileText size={12} /> Case Study
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