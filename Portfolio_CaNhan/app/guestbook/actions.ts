"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { guestbookEntries, GuestbookEntry } from "@/data/guestbook";

const GuestbookSchema = z.object({
  name: z
    .string()
    .min(1, "Vui lòng nhập tên")
    .max(50, "Tên không được vượt quá 50 ký tự"),
  message: z
    .string()
    .min(1, "Vui lòng nhập lời nhắn")
    .max(500, "Lời nhắn không được vượt quá 500 ký tự"),
});

export async function createGuestbookEntry(
  prevState: unknown,
  formData: FormData,
) {
  try {
    const rawData = {
      name: formData.get("name"),
      message: formData.get("message"),
    };

    const validatedData = GuestbookSchema.safeParse(rawData);

    if (!validatedData.success) {
      return {
        success: false,
        errors: validatedData.error.flatten().fieldErrors,
        message: "Dữ liệu không hợp lệ",
      };
    }

    const { name, message } = validatedData.data;

    const newEntry: GuestbookEntry = {
      id: crypto.randomUUID(),
      name,
      message,
      createdAt: new Date().toISOString(),
    };

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    guestbookEntries.unshift(newEntry);

    revalidatePath("/guestbook");
    return { success: true, message: "Gửi lời nhắn thành công!" };
  } catch (error: unknown) {
    return { success: false, message: "Đã có lỗi xảy ra. Vui lòng thử lại." };
  }
}

export async function deleteGuestbookEntry(id: string) {
  try {
    const index = guestbookEntries.findIndex((entry) => entry.id === id);
    if (index === -1) {
      return { success: false, message: "Không tìm thấy lời nhắn" };
    }

    guestbookEntries.splice(index, 1);
    revalidatePath("/guestbook");
    return { success: true };
  } catch (error: unknown) {
    return { success: false, message: "Xóa thất bại" };
  }
}
