const projects = [
  {
    title: "Website Portfolio",
    description: "Website cá nhân xây dựng bằng Next.JS và Tailwind CSS",
    tech: ["Next.JS", "Tailwind CSS", "TypeScript"],
  },
  {
    title: "Ứng dụng gợi ý lịch trình du lịch Đà Lạt thông minh",
    description:
      "Ứng dụng sử dụng Gemini để gợi ý các địa điểm nên du lịch trong Đà Lạt theo sở thích người dùng",
    tech: [
      "Angular",
      "Ionic",
      "TypeScript|JavaScript",
      "Express",
      "PostgreSQL",
    ],
  },
  {
    title: "Ứng dụng quản lý tài nguyên học tập",
    description:
      "Ứng dụng cho phép người dùng lưu trữ, chia sẻ các tài liệu học tập",
    tech: ["React", "Express", "PostgreSQL"],
  },
];
export default function ProjectsPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Dự án</h1>
      <div className="grid gap-6">
        {projects.map((project, index) => (
          <div
            key={index}
            className="border rounded-lg p-6 hover:shadow-md transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-2">{project.title}</h2>
            <p className="text-gray-600 mb-4">{project.description}</p>
            <div className="flex gap-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="bg-blue-100 text-blue-700 text-sm px-3 py-1 roundedfull"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
