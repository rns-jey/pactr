import WorkoutCard from "./WorkoutCard";
import { WorkoutWithMember } from "@/types";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../molecules/Card";
import { Heart, MessageCircle, User } from "lucide-react";
import Image from "next/image";
import { Skeleton } from "../molecules/Skeleton";

interface UploadCardProps {
  groupId: string;
}

export default function WorkoutList({ groupId }: UploadCardProps) {
  const { data: workouts } = useQuery<WorkoutWithMember[]>({
    queryKey: ["workouts"],
    queryFn: async () => {
      const response = await axios.get(`/api/workouts`, {
        params: {
          groupId,
        },
      });

      return response.data;
    },
    staleTime: 0,
  });

  if (!workouts)
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Skeleton className="bg-muted h-8 w-8 rounded-full" />
            <CardTitle className="text-sm">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="mt-1 h-3 w-16" />
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="relative h-96 w-full">
            <Skeleton className="h-full w-full rounded-md object-cover" />
          </div>
        </CardContent>
      </Card>
    );

  return (
    <div className="flex flex-col gap-4">
      {workouts.map((workout) => (
        <WorkoutCard key={workout.id} workout={workout} />
      ))}
    </div>
  );
}
