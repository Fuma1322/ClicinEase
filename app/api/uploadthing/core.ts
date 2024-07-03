import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
 
const f = createUploadthing();
 
 
// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  clinicProfilePicture: f({ image: { maxFileSize: "1MB" } })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("file url", file.url);
      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { uploadedBy: "ClinicEase" };
    }),
    serviceImage: f({ image: { maxFileSize: "1MB" } })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("file url", file.url);
      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { uploadedBy: "ClinicEase" };
    }),
    patientProfilePicture: f({ image: { maxFileSize: "1MB" } })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("file url", file.url);
      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { uploadedBy: "ClinicEase" };
    }),
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;