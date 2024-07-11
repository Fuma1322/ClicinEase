import { UploadDropzone } from "@/utils/uploadthing";
import { Pencil, Plus } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import toast from "react-hot-toast";

type MultipleImageInputProps = {
  label: string;
  imageUrls: string[];
  setImageUrls: any
  className?: string;
  endpoint: any;
};

export default function MultipleImageInput({
  label,
  imageUrls = [],
  setImageUrls,
  className = "col-span-full",
  endpoint,
}: MultipleImageInputProps) {
  const handleRemoveImage = (index: number) => {
    const newImageUrls = [...imageUrls];
    newImageUrls.splice(index, 1);
    setImageUrls(newImageUrls);
  };

  return (
    <div className={className}>
      <div className="flex justify-between items-center mb-4">
        <label
          htmlFor="images"
          className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-400 mb-2"
        >
          {label}
        </label>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {imageUrls.map((imageUrl, index) => (
          <div key={index} className="relative">
            <Image
              src={imageUrl}
              alt={`Uploaded image ${index + 1}`}
              width={1000}
              height={667}
              className="w-full h-64 object-contain"
            />
            <button
              onClick={() => handleRemoveImage(index)}
              type="button"
              className="absolute top-2 right-2 bg-slate-900 rounded-full shadow text-sky-400 p-2"
            >
              <Pencil className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>
      <UploadDropzone
        endpoint={endpoint as any}
        onClientUploadComplete={(res: any) => {
          setImageUrls([...imageUrls, ...res.map((file: any) => file.url)]);
          toast.success("Image Upload Complete");
          console.log("Files: ", res);
          console.log("Upload Completed");
        }}
        onUploadError={(error) => {
          alert(`ERROR! ${error.message}`);
        }}
      />
    </div>
  );
}
