import { db } from "@/lib/db";
import { userProfile } from "@/lib/profile";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ groupId: string }> },
) {
  try {
    const profile = await userProfile();
    const { groupId } = await params;

    if (!profile) return new NextResponse("Unauthorized", { status: 401 });

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
