"use client";

import { useState, useEffect } from "react";
import { GuestbookEntry } from "@/data/guestbook";
import GuestbookForm from "@/components/guestbook-form";
import { deleteGuestbookEntry } from "./actions";

export default function GuestbookPage() {
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchEntries = async () => {
    try {
      const res = await fetch("/api/guestbook");
      const data = await res.json();
      setEntries(data);
    } catch (error) {
      console.error("Failed to fetch entries", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const res = await deleteGuestbookEntry(id);
      if (res.success) {
        fetchEntries();
      }
    } catch (error) {
      console.error("Failed to delete entry", error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Lưu bút</h1>

      <GuestbookForm />

      <div>
        <h2 className="text-xl font-semibold mb-4">Các lời nhắn trước đó</h2>
        {isLoading ? (
          <p>Đang tải...</p>
        ) : entries.length === 0 ? (
          <p className="text-gray-500">Chưa có lời nhắn nào.</p>
        ) : (
          <div className="space-y-4">
            {entries.map((entry) => (
              <div key={entry.id} className="border p-4 rounded-lg relative">
                <button
                  onClick={() => handleDelete(entry.id)}
                  className="absolute top-4 right-4 text-red-500 hover:text-red-700 text-sm"
                >
                  Xóa
                </button>
                <h3 className="font-semibold">{entry.name}</h3>
                <p className="text-gray-600 mt-2">{entry.message}</p>
                <div className="text-xs text-gray-400 mt-2">
                  {new Date(entry.createdAt).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
