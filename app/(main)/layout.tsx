import { db } from "@/lib/db";
import { userProfile } from "@/lib/profile";
import { redirect } from "next/navigation";

import AppHeader from "@/components/organisms/AppHeader";

import Providers from "@/components/providers/Providers";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profile = await userProfile();

  if (!profile) redirect("/sign-in");

  const group = await db.group.findFirst({
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
    <Providers profile={profile} group={group}>
      <div className="flex min-h-screen flex-col">
        {profile && group && <AppHeader />}
        {children}
      </div>
    </Providers>
  );
}
