import HomeClient from "@/components/organisms/HomeClient";

import { auth } from "@/lib/auth/server";

export default async function Home() {
  const { data: session } = await auth.getSession();

  return <HomeClient session={session} />;
}
