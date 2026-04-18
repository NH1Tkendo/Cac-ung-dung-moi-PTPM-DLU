import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] px-4">
      <h2 className="text-3xl font-bold mb-4">Không tìm thấy bài viết</h2>
      <p className="text-gray-600 mb-8">
        Bài viết bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.
      </p>
      <Link href="/blog" className="text-blue-500 hover:underline">
        Quay lại Blog
      </Link>
    </div>
  );
}
