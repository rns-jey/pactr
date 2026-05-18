import { cn } from "@/lib/utils";
import { Clock, User } from "lucide-react";

interface UserCardProps {
  name: string;
  isCurrentUser: boolean;
  pending?: boolean;
}

export default function UserCard({
  name,
  isCurrentUser,
  pending,
}: UserCardProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-xl p-4",
        pending ? "border-border border-2 border-dashed" : "bg-secondary/50",
      )}
    >
      <div
        className={cn(
          "flex h-12 w-12 items-center justify-center rounded-full",
          pending ? "bg-muted" : "bg-primary/20",
        )}
      >
        {pending ? <Clock className="h-6 w-6" /> : <User className="h-6 w-6" />}
      </div>
      <div>
        <p className="font-medium">{pending ? "Waiting for Partner" : name}</p>
        <p className="text-muted-foreground text-sm">
          {pending
            ? "Share your code below"
            : isCurrentUser
              ? "You"
              : "Partner"}
        </p>
      </div>
    </div>
  );
}
