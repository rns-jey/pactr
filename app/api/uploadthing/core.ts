import { db } from "@/lib/db";
import { userProfile } from "@/lib/profile";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { z } from "zod";

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({
    image: {
      /**
       * For full list of options and defaults, see the File Route API reference
       * @see https://docs.uploadthing.com/file-routes#route-config
       */
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  })
    .input(z.object({ groupId: z.string() }))
    // Set permissions and file types for this FileRoute
    .middleware(async ({ input }) => {
      // This code runs on your server before upload
      const user = await userProfile();

      // If you throw, the user will not be able to upload
      if (!user) throw new UploadThingError("Unauthorized");

      const member = await db.member.findFirst({
        where: {
          profileId: user.userId,
          groupId: input.groupId,
        },
      });

      if (!member)
        throw new UploadThingError("Must be a member of the group to upload");

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { memberId: member.id, groupId: input.groupId };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log("Upload complete for memberId:", metadata.memberId);
      console.log("file url", file.ufsUrl);

      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { uploadedBy: metadata.memberId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
