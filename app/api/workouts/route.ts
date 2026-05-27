import { db } from "@/lib/db";
import { userProfile } from "@/lib/profile";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const profile = await userProfile();

    if (!profile) return new NextResponse("Unauthorized", { status: 401 });

    const { searchParams } = new URL(req.url);
    const groupId = searchParams.get("groupId");

    if (!groupId)
      return new NextResponse("Group ID is required", { status: 400 });

    const workouts = await db.workOut.findMany({
      where: {
        groupId: groupId,
      },
      include: {
        member: {
          include: {
            profile: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(workouts);
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
