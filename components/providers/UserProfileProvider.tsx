"use client";

import { createContext, useContext, ReactNode } from "react";
import { Profile } from "@/lib/generated/prisma/client";

interface UserProfileProviderProps {
  profile: Profile;
  children: ReactNode;
}

const UserProfileContext = createContext<Profile | null>(null);

export default function UserProfileProvider({
  profile,
  children,
}: UserProfileProviderProps) {
  return (
    <UserProfileContext.Provider value={profile}>
      {children}
    </UserProfileContext.Provider>
  );
}

export const useUserProfile = (): Profile => {
  const context = useContext(UserProfileContext);
  if (!context)
    throw new Error("useUserProfile must be used within UserProfileProvider");
  return context;
};
