import Link from "next/link";
import { notFound } from "next/navigation";
import { Post, User, Comment } from "@/types/post";
import LikeButton from "@/components/like-button";

interface BlogPostPageProps {
  params: Promise<{ id: string }>;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { id } = await params;

  // Lấy dữ liệu bài viết
  const postRes = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`,
  );

  if (!postRes.ok) {
    notFound();
  }

  const post: Post = await postRes.json();

  // Chạy song song request lấy user và comments bằng Promise.all
  const [userRes, commentsRes] = await Promise.all([
    fetch(`https://jsonplaceholder.typicode.com/users/${post.userId}`),
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`),
  ]);

  const user: User = await userRes.json();
  const comments: Comment[] = await commentsRes.json();

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

      {/* Hiển thị Comments */}
      <div className="mt-12 pt-8 border-t">
        <h2 className="text-2xl font-bold mb-6">
          Bình luận ({comments.length})
        </h2>
        <div className="space-y-6">
          {comments.map((comment) => (
            <div key={comment.id} className="bg-gray-50 p-4 rounded-lg">
              <div className="font-semibold mb-1">{comment.name}</div>
              <div className="text-sm text-gray-500 mb-3">{comment.email}</div>
              <p className="text-gray-700">{comment.body}</p>
            </div>
          ))}
        </div>
      </div>
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
