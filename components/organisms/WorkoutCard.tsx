import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../molecules/Card";
import { Heart, MessageCircle, User } from "lucide-react";
import Image from "next/image";
import { WorkoutWithMember } from "@/types";
import { timeAgo } from "@/lib/utils";

import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/molecules/Drawer";

interface WorkoutCardProps {
  workout: WorkoutWithMember;
}

export default function WorkoutCard({ workout }: WorkoutCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <User className="bg-muted h-8 w-8 rounded-full" />
          <CardTitle className="text-sm">
            <p>{workout.member.profile.name}</p>
            <p>{timeAgo(workout.createdAt)}</p>
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <Drawer>
          <DrawerTrigger asChild>
            <div className="relative h-96 w-full">
              <Image
                src={workout.imageUrl}
                alt="Workout"
                width={400}
                height={300}
                className="h-full w-full rounded-md object-cover"
              />
            </div>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader className="hidden">
              <DrawerTitle />
            </DrawerHeader>
            <div className="mx-auto flex h-screen w-full flex-col p-4">
              <div className="relative flex w-full flex-1 items-center">
                <Image
                  src={workout.imageUrl}
                  alt="Workout"
                  width={720}
                  height={720}
                  className="max-h-[80vh] w-full object-contain"
                />
              </div>
              <div className="absolute bottom-0 w-full px-4 py-10 backdrop-blur-xs">
                <div className="flex items-center gap-2">
                  <User className="bg-muted h-8 w-8 rounded-full" />
                  <p className="text-sm">{workout.member.profile.name}</p>
                </div>
                <p></p>
              </div>
            </div>
          </DrawerContent>
        </Drawer>
      </CardContent>
      <CardFooter className="flex items-center gap-4">
        <div className="flex items-center gap-1">
          <Heart className="inline-block h-4 w-4" />
          <span className="text-sm">24</span>
        </div>
        <div className="flex items-center gap-1">
          <MessageCircle className="inline-block h-4 w-4" />
          <span className="text-sm">8</span>
        </div>
      </CardFooter>
    </Card>
  );
}
