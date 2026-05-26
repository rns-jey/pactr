"use client";
import { LogOut, UsersIcon } from "lucide-react";
import { Button } from "../atoms/Button";
import { authClient } from "@/lib/auth/client";
import { redirect } from "next/navigation";

export default function AppHeader() {
  const handleSignOut = async () => {
    await authClient.signOut();
    redirect("/sign-in");
  };

  return (
    <header className="bg-background/95 sticky top-0 z-10 border-b">
      <nav className="flex items-center justify-between p-4">
        <div className="flex items-center gap-2">
          <UsersIcon className="h-10 w-10" />
          <div>
            <h1 className="font-bold">Pactr</h1>
            <p className="text-muted-foreground text-xs">
              Accountability for groups
            </p>
          </div>
        </div>

        <Button variant={"ghost"} size={"sm"} onClick={handleSignOut}>
          <LogOut className="mr-2 h-4 w-4" />
          Sign out
        </Button>
      </nav>
    </header>
  );
}
