import React from "react";
import UserProfileProvider from "./UserProfileProvider";
import { Profile } from "@/lib/generated/prisma/client";
import GroupProvider from "./GroupProvider";
import { GroupWithUsers } from "@/types";

interface ProvidersProps {
  profile: Profile;
  group: GroupWithUsers | null;
  children: React.ReactNode;
}

export default function Providers({
  profile,
  group,
  children,
}: ProvidersProps) {
  return (
    <UserProfileProvider profile={profile}>
      <GroupProvider group={group}>{children}</GroupProvider>
    </UserProfileProvider>
  );
}
