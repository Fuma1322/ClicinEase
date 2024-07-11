import { UploadDropzone } from "@/utils/uploadthing";
import { Pencil, Plus } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";

type MultipleFileUploadProps = {
  label: string;
  fileUrls: string[];
  setFileUrls: React.Dispatch<React.SetStateAction<string[]>>;
  className?: string;
  endpoint: string; // Ensure this matches the new endpoint name
};

export default function MultipleFileUpload({
  label,
  fileUrls = [],
  setFileUrls,
  className = "col-span-full",
  endpoint,
}: MultipleFileUploadProps) {
  const handleRemoveFile = (index: number) => {
    const newFileUrls = [...fileUrls];
    newFileUrls.splice(index, 1);
    setFileUrls(newFileUrls);
  };

  return (
    <div className={className}>
      <div className="flex justify-between items-center mb-4">
        <label
          htmlFor="files"
          className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-400 mb-2"
        >
          {label}
        </label>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {fileUrls.map((fileUrl, index) => (
          <div key={index} className="relative">
            <a
              href={fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-blue-500 underline"
            >
              File {index + 1}
            </a>
            <button
              onClick={() => handleRemoveFile(index)}
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
          setFileUrls([...fileUrls, ...res.map((file: any) => file.url)]);
          toast.success("File Upload Complete");
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
