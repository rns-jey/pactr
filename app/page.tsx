import { Button } from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/molecules/Card";
import { Field, FieldLabel } from "@/components/organisms/Field";
import { UserPlus, UsersIcon } from "lucide-react";

export default function Home() {
  return (
    <div className="p-4 min-h-screen flex flex-col items-center justify-center gap-4">
      <div>
        <h2 className="font-semibold text-center text-2xl">Welcome, User!</h2>
        <p className="text-center text-muted-foreground">Let&apos;s get you connected with an accountability partner</p>
      </div>

      <Card className="cursor-pointer hover:bg-muted w-full min-h-24 max-w-sm">
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

      <Card className="cursor-pointer hover:bg-muted w-full min-h-24 max-w-sm">
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

      <Button variant={"outline"} className="w-full max-w-sm">
        Sign out
      </Button>
    </div>
  );
}
