import Link from "next/link";
import { notFound } from "next/navigation";
import { Post, User } from "@/types/post";
import LikeButton from "@/components/like-button";

interface BlogPostPageProps {
  params: Promise<{ id: string }>;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { id } = await params;

  const postRes = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`,
  );

  if (!postRes.ok) {
    notFound();
  }

  const post: Post = await postRes.json();

  const userRes = await fetch(
    `https://jsonplaceholder.typicode.com/users/${post.userId}`,
  );
  const user: User = await userRes.json();

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <Link
        href="/blog"
        className="text-blue-600 hover:underline text-sm mb-6 inline-block"
      >
        ← Quay lại danh sách
      </Link>
      <article>
        <h1 className="text-3xl font-bold mb-6">{post.title}</h1>
        <div className="flex items-center text-gray-500 mb-8 pb-4 border-b">
          <span>Tác giả: {user.name}</span>
          <span className="mx-2">•</span>
          <span>Email: {user.email}</span>
        </div>
        <div className="prose lg:prose-xl max-w-none text-gray-700 whitespace-pre-line mb-8">
          <p className="text-lg leading-relaxed whitespace-pre-wrap">
            {post.body}
          </p>
        </div>
        <div className="border-t pt-6">
          <LikeButton />
        </div>
      </article>
    </div>
  );
}

export async function generateStaticParams() {
  const postsRes = await fetch(
    "https://jsonplaceholder.typicode.com/posts?_limit=10",
  );
  const posts: Post[] = await postsRes.json();

  return posts.map((post) => ({
    id: post.id.toString(),
  }));
}
