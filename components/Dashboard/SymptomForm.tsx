"use client"

import { useForm } from "react-hook-form"
import TextInput from "@/components/FormInputs/TextInput";
import SubmitButton from "@/components/FormInputs/SubmitButton";
import { useState } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { X } from "lucide-react";
import generateSlug from "@/utils/generateSlug";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Symptom } from "@prisma/client";
import { createManySymptoms, createSymptom, updateSymptomById } from "@/actions/symptom";


export type SymptomProps = {
  title: string;
  slug:string;
}
export default function SymptomForm({
  title,
  initialData,
}:{
  title: string;
  initialData?: Symptom;
}) {
  const edititingId = initialData?.id || "";
  const [isLoading, setIsLoading]=useState(false);
  // const initialImageUrl = initialData?.imageUrl || "";
  // const [imageUrl, setImageUrl] = useState(initialImageUrl);
  const {
    register,
    handleSubmit,
    reset,
    formState:{errors},
  } = useForm<SymptomProps>({
    defaultValues: {
      title: initialData?.title,
    },
  });
  const router = useRouter();
  async function onSubmit(data: SymptomProps) {
    setIsLoading(true)
    const slug = generateSlug(data.title);
    data.slug=slug;
    console.log(data);
    if (edititingId){
      await updateSymptomById(edititingId, data);
      toast.success("Symptom Updated Successfully");
    }else {
      await createSymptom(data);
      toast.success("Symptom Updated Successfully");
    }
    reset();
    router.push("/dashboard/symptoms")
  }
async function handleCreateMany(){
  setIsLoading(true);
  try {
    await createManySymptoms()
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
            {/* <Button type="button" onClick={handleCreateMany} className="">
              {isLoading ? "Creating...." : "Create Many"}
            </Button> */}
            <Button type="button" asChild variant={"outline"}>
              <Link href="/dashboard/symptoms">
              <X className="w-4 h-4"/>
              </Link>
            </Button>
           </div>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="py-4 px-4 mx-auto">
              <div className="grid gap-4 grid-cols-2">
              <TextInput 
              label="Symptom Title" 
              register={register} 
              name="title" 
              errors={errors} 
              placeholder="Enter Symptoms title"
              />
              </div>
        
              <div className="mt-8 flex justify-between gap-4 items-center">
              <Button asChild variant={"outline"}>
              <Link href="/dashboard/symptoms">
              Cancel
              </Link>
            </Button>
            <SubmitButton 
            title={edititingId ? "Update Symptoms" : "Create Symptoms"} 
            isLoading={isLoading} 
            LoadingTitle={edititingId ? "Updating Please Wait..." : "Creating please wait..."} />
              </div>
            </form>
        </div>
    );
  }
  