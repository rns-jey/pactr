import { prisma } from "@/lib/db";
import { userProfile } from "@/lib/profile";
import { redirect } from "next/navigation";

import AppHeader from "@/components/organisms/AppHeader";

export default async function MainLayout({ children }: { children: React.ReactNode }) {
  const profile = await userProfile();

  if (!profile) redirect("/sign-in");

  const group = await prisma.group.findFirst({
    where: {
      OR: [{ ownerId: profile.userId }, { memberId: profile.userId }],
    },
  });

  return (
    <div className="min-h-full flex flex-col">
      {profile && group && <AppHeader />}
      {children}
    </div>
  );
}
