import { Clock, User, Users2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../molecules/Card";
import { Group, Profile } from "@/lib/generated/prisma/client";
import { GroupWithUsers } from "@/types";
import { Button } from "../atoms/Button";

interface GroupHomePageProps {
  group: GroupWithUsers;
  profile: Profile;
}

export default function GroupHomePage({ group, profile }: GroupHomePageProps) {
  const { name, owner, member } = group;

  return (
    <main className="p-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users2 />
            <span className="font-semibold">{name}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <div className="flex items-center gap-2 p-4 rounded-xl bg-secondary/50">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
              <User className="w-6 h-6" />
            </div>
            <div>
              <p className="font-medium">{owner.name}</p>
              <p className="text-sm text-muted-foreground">You</p>
            </div>
          </div>

          {member ? (
            <div className="flex items-center gap-2 p-4 rounded-xl bg-secondary/50">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                <User className="w-6 h-6" />
              </div>
              <div>
                <p className="font-medium">{member.name}</p>
                <p className="text-sm text-muted-foreground">You</p>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2 p-4 rounded-xl border-2 border-dashed border-border">
              <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <p className="font-medium">Waiting for Partner</p>
                <p className="text-sm text-muted-foreground">Share your code below</p>
              </div>
            </div>
          )}

          {!member && group && (
            <div className="p-6 rounded-xl bg-secondary text-center">
              <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wider">YOUR INVITE CODE</p>
              <p className="text-3xl font-mono font-bold tracking-wider text-primary mb-4">{group.code}</p>
              <Button variant={"outline"} size={"sm"}>
                Copy code
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
