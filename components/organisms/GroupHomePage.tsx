import { Clock, User, Users2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../molecules/Card";
import { Group, Profile } from "@/lib/generated/prisma/client";
import { GroupWithUsers } from "@/types";
import { Button } from "../atoms/Button";
import UserCard from "../molecules/UserCard";

interface GroupHomePageProps {
  group: GroupWithUsers;
  profile: Profile;
}

export default function GroupHomePage({ group, profile }: GroupHomePageProps) {
  const { name, members } = group;

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
          {members.map((member) => (
            <UserCard
              key={member.id}
              name={member.profile.name}
              isCurrentUser={member.profileId === profile.id}
            />
          ))}

          {!members && group && (
            <div className="bg-secondary rounded-xl p-6 text-center">
              <p className="text-muted-foreground mb-2 text-xs tracking-wider uppercase">
                YOUR INVITE CODE
              </p>
              <p className="text-primary mb-4 font-mono text-3xl font-bold tracking-wider">
                {group.code}
              </p>
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
