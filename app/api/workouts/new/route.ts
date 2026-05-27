import { db } from "@/lib/db";
import { userProfile } from "@/lib/profile";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const profile = await userProfile();

    if (!profile) return new NextResponse("Unauthorized", { status: 401 });

    const { imageUrl, groupId, memberId } = await req.json();

    if (!imageUrl)
      return new NextResponse("Image URL is required", { status: 400 });

    if (!groupId)
      return new NextResponse("Group ID is required", { status: 400 });

    if (!memberId)
      return new NextResponse("Member ID is required", { status: 400 });

    const workout = await db.workOut.create({
      data: {
        description: "Uploaded workout",
        imageUrl: imageUrl,
        memberId: memberId,
        groupId: groupId,
      },
    });

    return NextResponse.json(workout);
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
