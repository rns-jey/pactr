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
        <Image src={workout.imageUrl} alt="Workout" width={400} height={300} />
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
