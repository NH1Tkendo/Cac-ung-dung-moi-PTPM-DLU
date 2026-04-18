import { createClient } from "@/src/lib/supabase/server";
import { redirect } from "next/navigation";
import { ProfileForm } from "@/src/components/profile/profile-form";

export default async function ProfilePage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Get current profile
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (!profile) {
    return <div>Hồ sơ không tồn tại</div>;
  }

  return (
    <main className="max-w-2xl mx-auto px-4 py-8 auto-rows-max">
      <div className="flex gap-4 items-center mb-8">
        <h1 className="text-3xl font-bold">Cài đặt Hồ Sơ</h1>
      </div>
      <ProfileForm initialProfile={profile} userEmail={user.email || ""} />
    </main>
  );
}
