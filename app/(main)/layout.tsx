import { prisma } from "@/lib/db";
import { userProfile } from "@/lib/profile";
import { redirect } from "next/navigation";

import AppHeader from "@/components/organisms/AppHeader";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profile = await userProfile();

  if (!profile) redirect("/sign-in");

  const group = await prisma.group.findFirst({
    where: {
      members: {
        some: {
          profileId: profile.userId,
        },
      },
    },
    include: {
      members: {
        include: { profile: true },
      },
    },
  });

  return (
    <div className="flex min-h-full flex-col">
      {profile && group && <AppHeader />}
      {children}
    </div>
  );
}
