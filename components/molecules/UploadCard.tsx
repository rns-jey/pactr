"use client";

import { Card, CardContent } from "./Card";
import { cn, UploadButton } from "@/lib/utils";
import { Camera } from "lucide-react";

interface UploadCardProps {
  groupId: string;
}

export default function UploadCard({ groupId }: UploadCardProps) {
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
  );
}
