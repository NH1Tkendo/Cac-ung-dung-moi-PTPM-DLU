import Link from "next/link";
export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          <Link
            href="/"
            className="text-xl font-bold text-blue-600 whitespace-nowrap"
          >
            Ngô Bá Tài
          </Link>
          <div className="flex flex-wrap items-center justify-end gap-x-6 gap-y-2">
            <Link
              href="/"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Trang chủ
            </Link>
            <Link
              href="/about"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Giới thiệu
            </Link>
            <Link
              href="/blog"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Blog
            </Link>
            <Link
              href="/projects"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Dự án
            </Link>
            <Link
              href="/contact"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Liên hệ
            </Link>
            <Link
              href="/guestbook"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Lưu bút
            </Link>
            <Link
              href="/pokemon"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Pokédex
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
