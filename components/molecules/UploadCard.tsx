"use client";

import { WorkoutWithMember } from "@/types";
import { Card, CardContent } from "./Card";
import { cn, UploadButton } from "@/lib/utils";
import { useQueryClient } from "@tanstack/react-query";
import { Camera } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";

interface UploadCardProps {
  groupId: string;
}

export default function UploadCard({ groupId }: UploadCardProps) {
  const router = useRouter();
  const queryClient = useQueryClient();

  return (
    <Card>
      <CardContent>
        <UploadButton
          endpoint="imageUploader"
          input={{ groupId }}
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
          onClientUploadComplete={async (res) => {
            // Do something with the response

            await axios.post("/api/workouts/new", {
              groupId,
              imageUrl: res[0].ufsUrl, // from the return above
              memberId: res[0].serverData.uploadedBy, // from the return above
            });

            await queryClient.invalidateQueries({ queryKey: ["workouts"] });
            await queryClient.refetchQueries({ queryKey: ["workouts"] });
          }}
          onUploadError={(error: Error) => {
            // Do something with the error.
            alert(`ERROR! ${error.message}`);
          }}
        />
      </CardContent>
    </Card>
  );
}
