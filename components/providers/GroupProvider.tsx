"use client";

import { createContext, useContext, ReactNode } from "react";
import { GroupWithUsers } from "@/types";

interface GroupProviderProps {
  group: GroupWithUsers | null;
  children: ReactNode;
}

const GroupContext = createContext<GroupWithUsers | null>(null);

export default function GroupProvider({ group, children }: GroupProviderProps) {
  return (
    <GroupContext.Provider value={group}>{children}</GroupContext.Provider>
  );
}

export const useGroup = (): GroupWithUsers | null => {
  const context = useContext(GroupContext);
  return context;
};
