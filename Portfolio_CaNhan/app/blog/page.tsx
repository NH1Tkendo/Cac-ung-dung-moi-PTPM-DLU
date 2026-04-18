import Link from "next/link";
import { Post } from "@/types/post";

export default async function BlogPage() {
  const res = await fetch(
    "https://jsonplaceholder.typicode.com/posts?_limit=10",
  );
  const posts: Post[] = await res.json();

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Blog</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <div key={post.id} className="border p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-2 capitalize">
              {post.title}
            </h2>
            <p className="text-gray-600 mb-4 line-clamp-3">{post.body}</p>
            <Link
              href={`/blog/${post.id}`}
              className="text-blue-500 hover:underline"
            >
              Đọc tiếp &rarr;
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
