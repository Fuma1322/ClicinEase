import { UploadDropzone } from "@/utils/uploadthing";
import { File, Pencil, XCircle } from "lucide-react";
import React from "react";
import toast from "react-hot-toast";

type MultipleFileInputProps = {
    label: string;
    files: File[];
    setFiles: any;
    className?: string;
    endpoint?: any;
};
export type File = {
    title: string;
    size: number;
    url: string;
};

export default function MultipleFile({
    label,
    files,
    setFiles,
    className = "col-span-full",
    endpoint = "",
}: MultipleFileInputProps) {
    function handleImageRemove(fileIndex: any) {
        const updatedFiles = files.filter(
            (file, index) => index !== fileIndex
        );
        setFiles(updatedFiles);
    }

    return (
        <div className={className}>
        <div className="flex justify-between items-center mb-4">
        <label
              htmlFor="image"
              className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-400 mb-2 "
            >
              {label}
            </label>
            {files && (
                <button
                onClick={() => setFiles([])}
                type="button"
                className="flex space-x-2 bg-slate-900 rounded-md shadow text-sky-400 py-2 px-4">
                <Pencil className="w-5 h-5" />
                <span>Change Files</span>    
                </button>                
            )} 
            </div>
            {files.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {files.map((file, i) => {
                        return (
                            <div key={i} className="relative mb-6">
                                <button
                                type="button"
                                onClick={() => handleImageRemove(i)}
                                className="absolute -top-4 -right-2 bg-slate-100 text-slate-900 rounded-full"
                                >
                                <XCircle className="" />
                                </button>
                                <div className="py-3 rounded-md px-6 bg-white flex items-center dark:bg-slate-800 text-slate-800 dark:text-slate-200 border bg-border-200">
                                   <File className="w-6 h-6 flex flex-shrink-0 mr-2"/>
                                   <div className="flex flex-col">
                                   <span className="line-clamp-1">{file.title}</span>
                                   <span className="text-xs">{(file.size/1000).toFixed(2)}KB</span>
                                   </div>
                                </div>
                            </div>
                        );
                    })} 
                </div>
            ) : (
                <UploadDropzone
                endpoint={endpoint}
                onClientUploadComplete={(res) => {
                    console.log(res);
                    const urls = res.map ((item) => {
                        return {
                            url: item.url,
                            title: item.name,
                            size: item.size,
                        }
                    });
                    setFiles(urls);
                    console.log(urls);
                    console.log("Upload Completed");
                }}
                onUploadError= {(error) => {
                 toast.error("File Upload Failed, Try Again");
                 console.log(`ERROR! ${error.message}`, error);   
                }}
            />
        )}
      </div>
    );
}