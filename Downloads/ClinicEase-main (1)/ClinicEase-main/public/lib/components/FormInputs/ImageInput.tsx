import { UploadDropzone } from "@/utils/uploadthing";
import { Pencil } from "lucide-react";
import Image from "next/image";
import React from "react";
import toast from "react-hot-toast";

export default function ImageInput({
    label,
    imageUrl = "",
    setImageUrl,
    className = "col-span-full",
    endpoint = "",
}:{
    label: string;
    imageUrl: string;
    setImageUrl: any;
    className?: string;
    endpoint: any;
}) {
  return (
    <div className={className}>
        <div className="flex justify-between items-center mb-4">
        <label
              htmlFor="image"
              className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-400 mb-2 "
            >
              {label}
            </label>
            {imageUrl && (
                <button
                onClick={() => setImageUrl("")}
                type="button"
                className="flex space-x-2 bg-slate-900 rounded-md shadow text-sky-400 py-2 px-4">
                <Pencil className="w-5 h-5" />
                <span>Change Image</span>    
                </button>                
            )}
        </div>
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt="course image"
                width={1000}
                height={667}
                className="w-full h-64 object-contain"
              />
            ) : (
              <UploadDropzone
                endpoint={`${endpoint}` as any}
                onClientUploadComplete={(res: any) => {
                    setImageUrl(res[0].url);
                    //Do Something With The Response
                    toast.success("Image Upload Complete");
                    console.log("Files: ",res);
                    console.log("Upload Completed");
                }}
                onUploadError={(error) => {
                    // Do something with the error.
                  alert(`ERROR! ${error.message}`);
                }}
                />
            )}
            {/* <button
                type="submit"
                className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-purple-700 rounded-lg focus:ring-4 focus:ring-purple-200 dark:focus:ring-purple-900 hover:bg-purple-800"
                >
                <Plus className="w-5 h-5 mr-2" />
                <span>Choose</span>
            </button> */}
        </div>
  );
}