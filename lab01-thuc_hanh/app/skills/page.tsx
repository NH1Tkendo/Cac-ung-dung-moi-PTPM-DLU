const programming_skills_best = ["JavaScript", "TypeScript", "C++"];
const programming_skills_normal = ["C#", "Python", "Java"];

export default function SkillsPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Kỹ năng lập trình</h1>

      <div className="mb-8 border rounded-lg p-6 shadow-sm">
        <h2 className="text-2xl font-semibold mb-4 text-blue-600">
          Giỏi nhất (Best)
        </h2>
        <div className="flex flex-wrap gap-3">
          {programming_skills_best.map((skill) => (
            <span
              key={skill}
              className="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg font-medium"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div className="border rounded-lg p-6 shadow-sm">
        <h2 className="text-2xl font-semibold mb-4 text-green-600">
          Biết sử dụng (Normal)
        </h2>
        <div className="flex flex-wrap gap-3">
          {programming_skills_normal.map((skill) => (
            <span
              key={skill}
              className="bg-green-100 text-green-800 px-4 py-2 rounded-lg font-medium"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
