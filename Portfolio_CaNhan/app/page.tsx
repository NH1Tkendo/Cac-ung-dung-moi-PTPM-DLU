import Link from "next/link";
import Counter from "@/components/counter";
import ThemeToggle from "@/components/theme-toggle";
import CopyButton from "@/components/copy-button";

export default function HomePage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16 relative">
      {/* Top right actions */}
      <div className="absolute top-0 right-4 flex gap-4">
        <ThemeToggle />
        <CopyButton textToCopy="https://example.com/portfolio" />
      </div>

      {/* Hero section */}
      <div className="text-center mb-16 mt-12">
        <div
          className="w-24 h-24 bg-blue-100 rounded-full mx-auto mb-6 flex
items-center justify-center"
        >
          <span className="text-4xl">A</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Xin chào! Tôi là <span className="text-blue-600">Ngô Bá Tài</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Sinh viên Công nghệ Thông tin tại Đại học Đà Lạt. Đam mê phát triển
          web và khám phá các công nghệ mới.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            href="/projects"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue700 transition-colors"
          >
            Xem dự án
          </Link>
          <Link
            href="/contact"
            className="border border-gray-300 px-6 py-3 rounded-lg hover:bg-gray50 transition-colors"
          >
            Liên hệ
          </Link>
        </div>

        <div className="mt-8 flex justify-center">
          <Counter />
        </div>
      </div>
      {/* Skills section */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-center mb-8">Kỹ năng</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            "JavaScript",
            "TypeScript",
            "React",
            "Next.JS",
            "Tailwind CSS",
            "Node.js",
            "Git",
            "SQL",
          ].map((skill) => (
            <div
              key={skill}
              className="bg-black-50 rounded-lg p-4 text-center hover:bg-blue-50
hover:text-blue-600 transition-colors"
            >
              {skill}
            </div>
          ))}
        </div>
      </div>
      {/* CTA section */}
      <div className="bg-blue-50 rounded-2xl p-8 text-center">
        <h2 className="text-2xl font-bold mb-3">Đọc Blog của tôi</h2>
        <p className="text-gray-600 mb-4">
          Chia sẻ kiến thức và kinh nghiệm về lập trình, công nghệ
        </p>
        <Link
          href="/blog"
          className="text-blue-600 font-semibold hover:underline"
        >
          Xem blog →
        </Link>
      </div>
    </div>
  );
}
