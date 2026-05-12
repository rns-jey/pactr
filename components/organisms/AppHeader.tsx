import { LogOut, UsersIcon } from "lucide-react";
import { Button } from "../atoms/Button";
import { auth } from "@/lib/auth/server";
import { redirect } from "next/navigation";
import { cn } from "@/lib/utils";

export default async function AppHeader() {
  const { data: session } = await auth.getSession();

  if (!session) {
    redirect("/sign-in");
  }

  return (
    <header className={cn("border-b sticky top-0 z-10", session ? "" : "hidden")}>
      <nav className="flex items-center justify-between p-4">
        <div className="flex items-center gap-2">
          <UsersIcon className="w-10 h-10" />
          <div>
            <h1 className="font-bold">Pactr</h1>
            <p className="text-xs text-muted-foreground">Accountability for groups</p>
          </div>
        </div>

        <Button variant={"ghost"} size={"sm"}>
          <LogOut className="w-4 h-4 mr-2" />
          Sign out
        </Button>
      </nav>
    </header>
  );
}
