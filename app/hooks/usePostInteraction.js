import { useState, useEffect } from "react";

export function usePostInteraction({
    _id,
    likes = 0,
    comments = 0,
    initialCommentsList = [],
}) {
    const [isLiked, setIsLiked] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const [likeCount, setLikeCount] = useState(likes);
    const [commentsCount, setCommentsCount] = useState(comments);
    const [commentsList, setCommentsList] = useState(initialCommentsList);

    useEffect(() => {
        if (!_id) return;

        const lsLiked = localStorage.getItem(`liked_${_id}`) === "1";
        const lsSaved = localStorage.getItem(`saved_${_id}`) === "1";
        setIsLiked(lsLiked);
        setIsSaved(lsSaved);

        // Sync likes if needed
        (async () => {
            try {
                const syncedFlag = localStorage.getItem(`synced_like_${_id}`) === "1";
                if (lsLiked && !syncedFlag) {
                    const r = await fetch(`/api/posts/${_id}/interact`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ action: "like", like: true }),
                    });
                    if (r.ok) localStorage.setItem(`synced_like_${_id}`, "1");
                }
            } catch (err) {
                console.warn("One-time like sync failed", err);
            }
        })();
    }, [_id]);

    const toggleLike = async () => {
        const previousLiked = isLiked;
        const previousCount = likeCount;
        const newLiked = !isLiked;

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
                setIsLiked(previousLiked);
                setLikeCount(previousCount);
                if (_id) localStorage.setItem(`liked_${_id}`, previousLiked ? "1" : "0");
            } else {
                const json = await res.json();
                if (json.data && typeof json.data.likes === "number") {
                    setLikeCount(json.data.likes);
                }
            }
        } catch (err) {
            setIsLiked(previousLiked);
            setLikeCount(previousCount);
            console.error("Like API error", err);
        }
    };

    const toggleSave = async () => {
        const newSaved = !isSaved;
        setIsSaved(newSaved);
        if (_id) localStorage.setItem(`saved_${_id}`, newSaved ? "1" : "0");
        try {
            await fetch(`/api/posts/${_id}/interact`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ action: "save", save: newSaved }),
            });
        } catch (err) {
            console.error("Save API error", err);
        }
    };

    const addComment = async (text) => {
        if (!text.trim()) return;
        const optimistic = { text, createdAt: new Date().toISOString(), optimistic: true };
        setCommentsList((prev) => [...prev, optimistic]);
        setCommentsCount((prev) => prev + 1);

        try {
            const res = await fetch(`/api/posts/${_id}/interact`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ action: "comment", text }),
            });
            if (res.ok) {
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

    const sharePost = async () => {
        try {
            await fetch(`/api/posts/${_id}/interact`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ action: "share" }),
            });
        } catch (err) {
            console.error("Share API error", err);
        }
    };

    return {
        isLiked,
        isSaved,
        likeCount,
        commentsCount,
        commentsList,
        toggleLike,
        toggleSave,
        addComment,
        sharePost,
        setLikeCount,
        setCommentsCount,
        setCommentsList,
    };
}
