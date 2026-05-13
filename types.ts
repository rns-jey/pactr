import { Prisma } from "./lib/generated/prisma/client";

export type GroupWithUsers = Prisma.GroupGetPayload<{
  include: { owner: true; member: true };
}>;
