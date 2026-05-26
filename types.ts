import { Prisma } from "./lib/generated/prisma/client";

export type GroupWithUsers = Prisma.GroupGetPayload<{
  include: {
    members: {
      include: { profile: true };
    };
  };
}>;

export type WorkoutWithMember = Prisma.WorkOutGetPayload<{
  include: {
    member: {
      include: {
        profile: true;
      };
    };
  };
}>;
