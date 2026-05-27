import WorkoutCard from "./WorkoutCard";
import { WorkoutWithMember } from "@/types";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

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

  if (!workouts) return <div>Loading...</div>;

  return (
    <div className="flex flex-col gap-4">
      {workouts.map((workout) => (
        <WorkoutCard key={workout.id} workout={workout} />
      ))}
    </div>
  );
}
