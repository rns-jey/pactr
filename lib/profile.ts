import { auth } from "./auth/server";
import { db } from "./db";

export async function userProfile() {
  const { data: session } = await auth.getSession();

  if (!session) return null;

  return db.profile.upsert({
    where: { userId: session.user.id },
    update: {
      name: session.user.name,
      email: session.user.email,
    },
    create: {
      userId: session.user.id,
      name: session.user.name,
      email: session.user.email,
    },
  });
}
