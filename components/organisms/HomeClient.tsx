"use client";

import { useState } from "react";

import WelcomeSection from "./WelcomeSection";
import CreateGroupSection from "./CreateGroupSection";
import JoinGroupSection from "./JoinGroupSection";

import { Profile } from "@/lib/generated/prisma/client";

interface HomeClientProps {
  profile: Profile;
}

export default function HomeClient({ profile }: HomeClientProps) {
  const [action, setAction] = useState<"create" | "join" | "">("");

  return (
    <div className="p-4 min-h-screen flex flex-col items-center justify-center gap-4">
      {action === "" && <WelcomeSection setAction={setAction} profile={profile} />}

      {action === "create" && <CreateGroupSection setAction={setAction} />}

      {action === "join" && <JoinGroupSection setAction={setAction} />}
    </div>
  );
}
