import React from "react";
import { Card, CardContent } from "@/components/molecules/Card";
import { UserPlus, UsersIcon } from "lucide-react";
import { Button } from "../atoms/Button";
import { authClient } from "@/lib/auth/client";
import { redirect } from "next/navigation";

import { Profile } from "@/lib/generated/prisma/client";

interface WelcomeSectionProps {
  setAction: React.Dispatch<React.SetStateAction<"" | "create" | "join">>;
  profile: Profile;
}

export default function WelcomeSection({ setAction, profile }: WelcomeSectionProps) {
  const handleSignOut = async () => {
    await authClient.signOut();
    redirect("/sign-in");
  };

  return (
    <>
      <div>
        <h2 className="font-semibold text-center text-2xl">Welcome, {profile.name}!</h2>
        <p className="text-center text-muted-foreground">Let&apos;s get you connected with an accountability partner</p>
      </div>

      <Card className="cursor-pointer hover:bg-muted w-full min-h-24 max-w-sm" onClick={() => setAction("create")}>
        <CardContent className="flex items-center gap-2">
          <div>
            <UsersIcon className="w-10 h-10" />
          </div>

          <div>
            <h3 className="font-semibold text-base">Create a Group</h3>
            <p>Start a new accountability group and invite your friends to join you on your journey.</p>
          </div>
        </CardContent>
      </Card>

      <Card className="cursor-pointer hover:bg-muted w-full min-h-24 max-w-sm" onClick={() => setAction("join")}>
        <CardContent className="flex items-center gap-2 my-auto">
          <div>
            <UserPlus className="w-10 h-10" />
          </div>

          <div className="">
            <h3 className="font-semibold text-base">Join a Group</h3>
            <p>Enter a code to join an existing accountability group.</p>
          </div>
        </CardContent>
      </Card>

      <Button variant={"outline"} className="w-full max-w-sm" onClick={handleSignOut}>
        Sign out
      </Button>
    </>
  );
}
