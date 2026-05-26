import { db } from "@/lib/db";

import { userProfile } from "@/lib/profile";
import { redirect } from "next/navigation";

import WorkoutCard from "./WorkoutCard";

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
        <WorkoutCard key={workout.id} workout={workout} />
      ))}
    </div>
  );
}
