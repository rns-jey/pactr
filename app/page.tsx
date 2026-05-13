import GroupHomePage from "@/components/organisms/GroupHomePage";
import HomeClient from "@/components/organisms/HomeClient";

import { prisma } from "@/lib/db";
import { userProfile } from "@/lib/profile";
import { redirect } from "next/navigation";

export default async function Home() {
  const profile = await userProfile();

  if (!profile) {
    redirect("/sign-in");
  }

  const group = await prisma.group.findFirst({
    where: { ownerId: profile.userId },
    include: { owner: true, member: true },
  });

  if (group) {
    return <GroupHomePage group={group} profile={profile} />;
  } else {
    return <HomeClient profile={profile} />;
  }
}
