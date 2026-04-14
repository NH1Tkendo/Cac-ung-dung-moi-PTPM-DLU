"use client"; // Các component Error phải dùng 'use client'

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Gọi logger ở đây để theo dõi lỗi
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4">
      <h2 className="text-3xl font-bold text-red-600 mb-4">
        Đã có lỗi xảy ra!
      </h2>
      <p className="text-gray-600 mb-8 max-w-md">
        Rất tiếc, hệ thống đã gặp sự cố trong quá trình xử lý yêu cầu của bạn.
        Vui lòng thử lại.
      </p>
      <button
        onClick={() => reset()}
        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Thử lại
      </button>
    </div>
  );
}
