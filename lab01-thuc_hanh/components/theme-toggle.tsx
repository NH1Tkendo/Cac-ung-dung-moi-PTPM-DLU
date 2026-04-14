"use client";

import { useState } from "react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className="p-2 border rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
    >
      {isDark ? "🌞 Chế độ Sáng" : "🌙 Chế độ Tối"}
    </button>
  );
}
