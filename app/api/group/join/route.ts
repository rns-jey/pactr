import { prisma } from "@/lib/db";
import { userProfile } from "@/lib/profile";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  try {
    const profile = await userProfile();

    if (!profile) return new NextResponse("Unauthorized", { status: 401 });

    const { code } = await req.json();

    const group = await prisma.group.findUnique({
      where: {
        code: code,
      },
    });

    if (!group) return new NextResponse("Not found", { status: 404 });

    const joinGroup = await prisma.group.update({
      where: { code: code },
      data: {
        memberId: profile.userId,
      },
      include: { owner: true, member: true },
    });

    return NextResponse.json(joinGroup);
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
