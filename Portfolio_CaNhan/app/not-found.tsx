import Link from "next/link";
export default function NotFound() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-24 text-center">
      <div className="mb-8 flex justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-32 w-32 text-gray-300 animate-bounce"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1}
            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <h1 className="text-6xl font-bold text-blue-600 mb-4">404</h1>
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        Trang không tồn tại
      </h2>
      <p className="text-gray-600 mb-8 max-w-md mx-auto">
        Xin lỗi, trang bạn đang tìm kiếm không có trên website này hoặc đã bị
        chuyển đi.
      </p>
      <Link
        href="/"
        className="bg-blue-600 text-white px-6 py-3 rounded-full font-medium hover:bg-blue-700
transition-all inline-block shadow-md hover:shadow-lg transform hover:-translate-y-1"
      >
        Về trang chủ
      </Link>
    </div>
  );
}
