import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";
import { customAlphabet } from "nanoid";
import { Prisma } from "@/lib/generated/prisma/client";
import { auth } from "@/lib/auth/server";

const generateGroupCode = customAlphabet("ABCDEFGHJKLMNPQRSTUVWXYZ23456789", 6);

export async function POST(req: Request) {
  try {
    const { data: session } = await auth.getSession();

    if (!session) return new NextResponse("Unauthorized", { status: 401 });

    const { name } = await req.json();

    console.log("Received data:", { name });

    const codeExpiry = new Date();
    codeExpiry.setDate(codeExpiry.getDate() + 2);

    for (let i = 0; i < 5; i++) {
      const code = generateGroupCode();

      try {
        const group = await prisma.group.create({
          data: {
            name,
            owner: session.session.userId,
            code,
            codeExpiry,
          },
        });

        return NextResponse.json({ group }, { status: 201 });
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
          continue;
        }

        throw error;
      }
    }

    return NextResponse.json({ error: "Failed to create a group." }, { status: 500 });
  } catch (error) {
    console.error("Error creating verb:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
