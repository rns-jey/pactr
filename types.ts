import { Prisma } from "./lib/generated/prisma/client";

export type GroupWithUsers = Prisma.GroupGetPayload<{
  include: {
    members: {
      include: { profile: true };
    };
  };
}>;
