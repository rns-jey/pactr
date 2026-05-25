import { db } from "@/lib/db";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../molecules/Card";
import { Heart, MessageCircle, User } from "lucide-react";
import Image from "next/image";
import { userProfile } from "@/lib/profile";
import { redirect } from "next/navigation";

interface UploadCardProps {
  groupId: string;
}

export default async function WorkoutList({ groupId }: UploadCardProps) {
  const profile = await userProfile();

  if (!profile) redirect("/sign-in");

  const workouts = await db.workOut.findMany({
    where: {
      groupId: groupId,
    },
    include: {
      member: {
        include: {
          profile: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="flex flex-col gap-4">
      {workouts.map((workout) => (
        <Card key={workout.id}>
          <CardHeader>
            <div className="flex items-center gap-2">
              <User className="bg-muted h-8 w-8 rounded-full" />
              <CardTitle className="text-sm">
                <p>{workout.member.profile.name}</p>
                <p>Just Now</p>
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <Image
              src={workout.imageUrl}
              alt="Workout"
              width={400}
              height={300}
            />
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
      ))}
    </div>
  );
}
