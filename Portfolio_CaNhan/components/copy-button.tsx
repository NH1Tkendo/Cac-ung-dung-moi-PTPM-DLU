"use client";

import { useState } from "react";

interface CopyButtonProps {
  textToCopy: string;
}

export default function CopyButton({ textToCopy }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={`px-4 py-2 rounded-md transition-colors ${
        copied
          ? "bg-green-500 text-white hover:bg-green-600"
          : "bg-gray-200 text-gray-800 hover:bg-gray-300"
      }`}
    >
      {copied ? "✓ Đã copy!" : "📋 Copy link"}
    </button>
  );
}
