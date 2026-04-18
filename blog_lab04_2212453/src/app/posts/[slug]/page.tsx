import { createClient } from "@/src/lib/supabase/server";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { LikeButton } from "@/src/components/post/like-button";

type Params = Promise<{ slug: string }>;

interface PostPageProps {
  params: Params;
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const decodedSlug = decodeURIComponent(resolvedParams.slug);
  const supabase = await createClient();

  const { data: post } = await supabase
    .from("posts")
    .select("title, excerpt")
    .eq("slug", decodedSlug)
    .eq("status", "published")
    .single();
  return {
    title: post?.title || "Bài viết",
    description: post?.excerpt || "",
  };
}
export default async function PostPage({ params }: PostPageProps) {
  const resolvedParams = await params;
  const decodedSlug = decodeURIComponent(resolvedParams.slug);

  const supabase = await createClient();
  
  // Get current user if logged in
  const { data: { user } } = await supabase.auth.getUser();
  
  const { data: post, error } = await supabase
    .from("posts")
    .select(
      `
 *,
 profiles (
 display_name,
 avatar_url
 )
 `,
    )
    .eq("slug", decodedSlug)
    .eq("status", "published")
    .single();

  if (error || !post) {
    notFound();
  }

  // Fetch likes count
  const { count: likeCount } = await supabase
    .from("likes")
    .select("*", { count: "exact", head: true })
    .eq("post_id", post.id);

  // Check if current user has liked this post
  let hasLiked = false;
  if (user) {
    const { data: likeData } = await supabase
      .from("likes")
      .select("id")
      .eq("post_id", post.id)
      .eq("user_id", user.id)
      .single();
      
    hasLiked = !!likeData;
  }

  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      <article>
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>

          <div className="flex items-center gap-4 text-gray-500">
            <span>Bởi {post.profiles?.display_name || "Ẩn danh"}</span>
            <span>•</span>
            <time>
              {post.published_at
                ? new Date(post.published_at).toLocaleDateString("vi-VN", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : ""}
            </time>
          </div>
        </header>
        <div className="prose prose-lg max-w-none">
          {/* Render markdown content */}
          {post.content
            ?.split("\n")
            .map((paragraph: string, index: string | number) => (
              <p key={index}>{paragraph}</p>
            ))}
        </div>
        
        <LikeButton 
          postId={post.id} 
          initialLikeCount={likeCount || 0} 
          initialHasLiked={hasLiked} 
        />
      </article>
    </main>
  );
}
