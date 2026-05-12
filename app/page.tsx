import HomeClient from "@/components/organisms/HomeClient";

import { auth } from "@/lib/auth/server";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";

export default async function Home() {
  const { data: session } = await auth.getSession();

  if (!session) {
    redirect("/sign-in");
  }

  const group = await prisma.group.findFirst({ where: { owner: session.session.userId } });

  if (group) {
    return <div>{group.name}</div>;
  } else {
    return <HomeClient session={session} />;
  }
}
