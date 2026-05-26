"use client";

import GroupHomePage from "@/components/organisms/GroupHomePage";
import HomeClient from "@/components/organisms/HomeClient";
import { useGroup } from "@/components/providers/GroupProvider";
import { useUserProfile } from "@/components/providers/UserProfileProvider";

export default function Home() {
  const group = useGroup();
  const profile = useUserProfile();

  if (group) {
    return <GroupHomePage group={group} profile={profile} />;
  } else {
    return <HomeClient profile={profile} />;
  }
}
