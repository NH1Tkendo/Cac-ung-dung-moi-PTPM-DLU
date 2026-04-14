export default function Loading() {
  return (
    <div className="animate-pulse">
      <div className="h-4 bg-gray-200 rounded w-32 mb-6"></div>
      <article>
        <div className="flex items-center gap-3 mb-4">
          <div className="h-6 bg-gray-200 rounded w-20"></div>
          <div className="h-4 bg-gray-200 rounded w-24"></div>
        </div>
        <div className="h-10 bg-gray-200 rounded w-3/4 mb-6"></div>
        <div className="space-y-3">
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          <div className="h-4 bg-gray-200 rounded w-4/6 mt-4"></div>
          <div className="h-4 bg-gray-200 rounded"></div>
        </div>
      </article>
    </div>
  );
}
