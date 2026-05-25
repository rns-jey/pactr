import { Users2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../molecules/Card";
import { Profile } from "@/lib/generated/prisma/client";
import { GroupWithUsers } from "@/types";
import { Button } from "../atoms/Button";
import UserCard from "../molecules/UserCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../molecules/Tabs";

import UploadCard from "../molecules/UploadCard";
import WorkoutList from "./WorkoutList";

interface GroupHomePageProps {
  group: GroupWithUsers;
  profile: Profile;
}

export default function GroupHomePage({ group, profile }: GroupHomePageProps) {
  const { name, members } = group;

  return (
    <main className="p-4">
      <Tabs defaultValue="workout">
        <TabsList variant={"line"}>
          <TabsTrigger value="workout">Workout</TabsTrigger>
          <TabsTrigger value="group">Group</TabsTrigger>
        </TabsList>
        <TabsContent value="workout" className="mt-4 flex flex-col gap-4">
          <UploadCard groupId={group.id} />

          <WorkoutList groupId={group.id} />
        </TabsContent>
        <TabsContent value="group">
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
                  isCurrentUser={member.profileId === profile.userId}
                />
              ))}

              {members.length < 2 && group && (
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
        </TabsContent>
      </Tabs>
    </main>
  );
}
