import { auth } from "./auth/server";
import { prisma } from "./db";

export async function userProfile() {
  const { data: session } = await auth.getSession();

  if (!session) return null;

  const profile = await prisma.profile.findUnique({
    where: {
      userId: session.user.id,
    },
  });

  if (profile) {
    return profile;
  } else {
    const newProfile = await prisma.profile.create({
      data: {
        userId: session.user.id,
        name: session.user.name,
      },
    });

    return newProfile;
  }
}
