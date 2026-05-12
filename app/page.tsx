"use client";

import CreateGroupSection from "@/components/organisms/CreateGroupSection";
import JoinGroupSection from "@/components/organisms/JoinGroupSection";
import WelcomeSection from "@/components/organisms/WelcomeSection";

import { useState } from "react";

export default function Home() {
  const [action, setAction] = useState<"create" | "join" | "">("");

  return (
    <div className="p-4 min-h-screen flex flex-col items-center justify-center gap-4">
      {action === "" && <WelcomeSection setAction={setAction} />}

      {action === "create" && <CreateGroupSection setAction={setAction} />}

      {action === "join" && <JoinGroupSection setAction={setAction} />}
    </div>
  );
}
