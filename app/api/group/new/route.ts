import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";
import { customAlphabet } from "nanoid";
import { Prisma } from "@/lib/generated/prisma/client";
import { userProfile } from "@/lib/profile";

const generateGroupCode = customAlphabet("ABCDEFGHJKLMNPQRSTUVWXYZ23456789", 6);

export async function POST(req: Request) {
  try {
    const { name } = await req.json();

    const profile = await userProfile();

    if (!profile) return new NextResponse("Unauthorized", { status: 401 });

    const codeExpiry = new Date();
    codeExpiry.setDate(codeExpiry.getDate() + 2);

    for (let i = 0; i < 5; i++) {
      const code = generateGroupCode();

      try {
        const group = await prisma.group.create({
          data: {
            name,
            profileId: profile.userId,
            code,
            codeExpiry,
            members: {
              create: [
                {
                  profileId: profile.userId,
                  role: "ADMIN",
                },
              ],
            },
          },
        });

        return NextResponse.json({ group }, { status: 201 });
      } catch (error) {
        if (
          error instanceof Prisma.PrismaClientKnownRequestError &&
          error.code === "P2002"
        ) {
          continue;
        }

        throw error;
      }
    }

    return NextResponse.json(
      { error: "Failed to create a group." },
      { status: 500 },
    );
  } catch (error) {
    console.error("Error creating group:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
