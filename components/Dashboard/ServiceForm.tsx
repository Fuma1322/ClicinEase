"use client"

import { BasicInfoProps } from "@/types/types";
import { useForm } from "react-hook-form"
import TextInput from "@/components/FormInputs/TextInput";
import SubmitButton from "@/components/FormInputs/SubmitButton";
import { useState } from "react";
import ImageInput from "@/components/FormInputs/ImageInput";
import { Button } from "../ui/button";
import Link from "next/link";
import { X } from "lucide-react";
import generateSlug from "@/utils/generateSlug";
import { createManyService, createService } from "@/actions/services";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export type ServiceProps = {
  title: string;
  imageUrl: string;
  slug:string;
}
export default function ServiceForm() {
  const router = useRouter();
  async function onSubmit(data: ServiceProps) {
    setIsLoading(true)
    const slug = generateSlug(data.title);
    data.imageUrl = imageUrl;
    data.slug=slug;
    console.log(data);
    await createService(data);
    toast.success("Service Created Successfully");
    reset();
    router.push("/dashboard/services")
  }
async function handleCreateMany(){
  setIsLoading(true);
  try {
    await createManyService()
    setIsLoading(false)
  } catch (error) {
    console.log(error);
  }
}
  const [imageUrl,setImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
   const {
    register,
    handleSubmit,
    reset,
    formState:{errors},
  } = useForm<ServiceProps>()
    return (
        <div className=" w-full max-w-xl shadow-sm rounded-md m-3 border-border-gray-200 mx-auto">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm py-4">
           <div className="flex items-center justify-between px-6">
           <h1 className="scroll-m-20 text-2xl font-extrabold leading-9 tracking-tight flex justify-center">
              Create Services
            </h1>
            {/* <Button onClick={handleCreateMany} className="">
              {isLoading ? "Creating...." : "Create Many"}
            </Button> */}
            <Button asChild variant={"outline"}>
              <Link href="/dashboard/services">
              <X className="w-4 h-4"/>
              </Link>
            </Button>
           </div>
          </div>
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm grid-cols-2">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <TextInput 
              label="Service Title" 
              register={register} 
              name="title" 
              errors={errors} 
              />
              <ImageInput 
                label ="Service Image"
                imageUrl = {imageUrl}
                setImageUrl = {setImageUrl}
                endpoint = "serviceImage"
                />
              
              <div className="mt-8 flex justify-between gap-4 items-center">
                <SubmitButton title="Create Service" isLoading={isLoading} loadingTitle={"Creating, Please Wait..."} />
              <Button asChild variant={"outline"}>
              <Link href="/dashboard/services">
              Cancel
              </Link>
            </Button>
              </div>
            </form>
          </div>
        </div>
    )
  }
  