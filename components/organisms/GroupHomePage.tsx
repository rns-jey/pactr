"use client";

import { Camera, Users2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../molecules/Card";
import { Profile } from "@/lib/generated/prisma/client";
import { GroupWithUsers } from "@/types";
import { Button } from "../atoms/Button";
import UserCard from "../molecules/UserCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../molecules/Tabs";
import { cn, UploadButton } from "@/lib/utils";

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
        <TabsContent value="workout">
          <Card>
            <CardContent>
              <UploadButton
                endpoint="imageUploader"
                input={{ groupId: group.id }}
                appearance={{
                  button: cn(
                    "w-full inline-flex items-center justify-center gap-2",
                    "rounded-md text-sm font-medium h-10 px-4 py-2", // match your Button's base styles
                    "bg-primary text-primary-foreground hover:bg-primary/90", // match your Button variant
                    "transition-colors focus-visible:outline-none focus-visible:ring-2",
                  ),
                  allowedContent: "hidden",
                  container: "w-full",
                }}
                content={{
                  button: (
                    <>
                      <Camera className="h-4 w-4" />
                      Share your workout
                    </>
                  ),
                }}
                onClientUploadComplete={(res) => {
                  // Do something with the response
                  console.log("Files: ", res[0].ufsUrl);
                  alert("Upload Completed");
                }}
                onUploadError={(error: Error) => {
                  // Do something with the error.
                  alert(`ERROR! ${error.message}`);
                }}
              />
            </CardContent>
          </Card>
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
