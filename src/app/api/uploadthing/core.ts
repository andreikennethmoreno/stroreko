import { stackServerApp } from "@/stack";
import { createUploadthing, type FileRouter } from "uploadthing/next";


const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  postImage: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  })
    // Set permissions and file types for this FileRoute
    .middleware(async ({ req }) => {
      // This code runs on your server before upload
      const user = await stackServerApp.getUser();
      // If you throw, the user will not be able to upload
      if (!user) throw new Error("Unauthorized");
      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      try{
        console.log("Upload complete for userId:", metadata.userId);
        console.log("file url", file.ufsUrl);
        return { fileUrl: file.ufsUrl }; 
      }catch (error) {
        console.error("Error in onUploadComplete:", error);
        throw error;
      }
    }),
} satisfies FileRouter;
export type OurFileRouter = typeof ourFileRouter;