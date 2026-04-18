"use client";

import { useState } from "react";
import { createClient } from "@/src/lib/supabase/client";

interface LikeButtonProps {
  postId: string;
  initialLikeCount: number;
  initialHasLiked: boolean;
}

export function LikeButton({ postId, initialLikeCount, initialHasLiked }: LikeButtonProps) {
  const [hasLiked, setHasLiked] = useState(initialHasLiked);
  const [likeCount, setLikeCount] = useState(initialLikeCount);
  const [isLoading, setIsLoading] = useState(false);
  const supabase = createClient();

  const handleToggleLike = async () => {
    setIsLoading(true);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        alert("Vui lòng đăng nhập để thực hiện chức năng này");
        return;
      }

      if (hasLiked) {
        // Unlike
        const { error } = await supabase
          .from("likes")
          .delete()
          .eq("post_id", postId)
          .eq("user_id", user.id);

        if (!error) {
          setHasLiked(false);
          setLikeCount((prev) => Math.max(0, prev - 1));
        }
      } else {
        // Like
        const { error } = await supabase
          .from("likes")
          .insert({
            post_id: postId,
            user_id: user.id,
          });

        if (!error) {
          setHasLiked(true);
          setLikeCount((prev) => prev + 1);
        }
      }
    } catch (error) {
      console.error("Error toggling like:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleToggleLike}
      disabled={isLoading}
      className={`flex items-center gap-2 px-4 py-2 mt-8 rounded-full border transition-all ${
        hasLiked 
          ? "bg-red-50 text-red-500 border-red-200 hover:bg-red-100" 
          : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"
      }`}
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="h-5 w-5" 
        viewBox="0 0 20 20" 
        fill={hasLiked ? "currentColor" : "none"} 
        stroke="currentColor"
        strokeWidth={hasLiked ? "0" : "2"}
      >
        <path 
          fillRule="evenodd" 
          d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" 
          clipRule="evenodd" 
        />
      </svg>
      <span>{likeCount} {hasLiked ? "Đã thích" : "Thích"}</span>
    </button>
  );
}
