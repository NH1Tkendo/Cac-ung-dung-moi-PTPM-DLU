"use client";

import { useActionState } from "react";
import { createGuestbookEntry } from "@/app/guestbook/actions";

const initialState = {
  message: "",
  errors: {},
  success: false,
};

export default function GuestbookForm() {
  const [state, formAction, isPending] = useActionState(
    createGuestbookEntry,
    initialState,
  );

  return (
    <form action={formAction} className="mb-12 bg-gray-50 p-6 rounded-lg">
      <div className="mb-4">
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Tên của bạn
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {state?.errors?.name && (
          <p className="text-red-500 text-sm mt-1">{state.errors.name[0]}</p>
        )}
      </div>
      <div className="mb-4">
        <label
          htmlFor="message"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Lời nhắn
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></textarea>
        {state?.errors?.message && (
          <p className="text-red-500 text-sm mt-1">{state.errors.message[0]}</p>
        )}
      </div>

      {state?.success && (
        <p className="text-green-600 text-sm mb-4">{state.message}</p>
      )}
      {!state?.success && state?.message && (
        <p className="text-red-500 text-sm mb-4">{state.message}</p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isPending ? "Đang gửi..." : "Gửi lời nhắn"}
      </button>
    </form>
  );
}
