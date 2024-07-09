"use client"
import { useForm } from "react-hook-form"
import TextInput from "@/components/FormInputs/TextInput";
import SubmitButton from "@/components/FormInputs/SubmitButton";
import { useState } from "react";
import ImageInput from "@/components/FormInputs/ImageInput";
import { Button } from "../ui/button";
import Link from "next/link";
import { X } from "lucide-react";
import generateSlug from "@/utils/generateSlug";
import { createManyServices, createService } from "@/actions/services";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Service } from "@prisma/client";

export type ServiceProps = {
  title: string;
  imageUrl: string;
  slug:string;
}
export default function ServiceForm({
  title,
  initialData,
}:{
  title: string;
  initialData?: Service;
}) {
  const edititingId = initialData?.id || "";
  const [isLoading, setIsLoading]=useState(false);
  const initialImageUrl = initialData?.imageUrl || "";
  const [imageUrl, setImageUrl] = useState(initialImageUrl);
  const {
    register,
    handleSubmit,
    reset,
    formState:{errors},
  } = useForm<ServiceProps>({
    defaultValues: {
      title: initialData?.title,
    },
  });
  const router = useRouter();
  async function onSubmit(data: ServiceProps) {
    setIsLoading(true)
    const slug = generateSlug(data.title);
    data.imageUrl = imageUrl;
    data.slug=slug;
    console.log(data);
    if (edititingId) {
      await UpdateService(edititingId, data);
      toast.success("Service Updated Successfully");
    }else {
      await createService(data);
      toast.success("Service Created Successfully");
    }
    reset();
    router.push("/dashboard/services")
  }
async function handleCreateMany(){
  setIsLoading(true);
  try {
    await createManyServices()
    setIsLoading(false)
  } catch (error) {
    console.log(error);
  }
} 
   
    return (
        <div className=" w-full max-w-xl shadow-sm rounded-md m-3 border border-gray-200 mx-auto">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm py-4 border-gray-200 dark:border-gray-600">
           <div className="flex items-center justify-between px-6">
           <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight">
              {title}
            </h1>
            {/* <Button onClick={handleCreateMany} className="">
              {isLoading ? "Creating...." : "Create Many"}
            </Button> */}
            <Button type="button" asChild variant={"outline"}>
              <Link href="/dashboard/services">
              <X className="w-4 h-4"/>
              </Link>
            </Button>
           </div>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="py-4 px-4 mx-auto">
              <div className="grid gap-4 grid-cols-2">
              <TextInput 
              label="Service Title" 
              register={register} 
              name="title" 
              errors={errors} 
              placeholder="Enter Service title"
              />
              <ImageInput 
                label ="Professional Profile Image"
                imageUrl = {imageUrl}
                setImageUrl = {setImageUrl}
                endpoint = "serviceImage"
                />
              </div>
              
              <div className="mt-8 flex justify-between gap-4 items-center">
              <Button asChild variant={"outline"}>
              <Link href="/dashboard/services">
              Cancel
              </Link>
            </Button>
            <SubmitButton 
            title={edititingId ? "Update Service" : "Create Service"} 
            isLoading={isLoading} 
            LoadingTitle={edititingId ? "Updating Please Wait..." : "Saving please wait..."} />
              </div>
            </form>
        </div>
    );
  }

function UpdateService(edititingId: string, data: ServiceProps) {
  throw new Error("Function not implemented.");
}
  