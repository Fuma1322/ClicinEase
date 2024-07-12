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
import { Speciality } from "@prisma/client";
import { updateSpecialty } from "@/actions/specialities";

export type SpecialityProps = {
  title: string;
  slug:string;
}
export default function SpecialityForm({
  title,
  initialData,
}:{
  title: string;
  initialData?: Speciality;
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
  } = useForm<SpecialtyProps>({
    defaultValues: {
      title: initialData?.title,
    },
  });
  const router = useRouter();
  async function onSubmit(data: SpecialityProps) {
    setIsLoading(true)
    const slug = generateSlug(data.title);
    data.slug=slug;
    console.log(data);
    if (edititingId){
      await updateSpecialty(edititingId, data);
      toast.success("Speciality Updated Successfully");
    }else {
      await createSpeciality(data);
      toast.success("Speciality Updated Successfully");
    }
    reset();
    router.push("/dashboard/speciality")
  }
async function handleCreateMany(){
  setIsLoading(true);
  try {
    await createManySpecialities()
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
              <Link href="/dashboard/specialities">
              <X className="w-4 h-4"/>
              </Link>
            </Button>
           </div>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="py-4 px-4 mx-auto">
              <div className="grid gap-4 grid-cols-2">
              <TextInput 
              label="Speciality Title" 
              register={register} 
              name="title" 
              errors={errors} 
              placeholder="Enter Speciality title"
              />
              </div>
        
              <div className="mt-8 flex justify-between gap-4 items-center">
              <Button asChild variant={"outline"}>
              <Link href="/dashboard/specialities">
              Cancel
              </Link>
            </Button>
            <Button asChild variant={"outline"}>Create Many specialities</Button>
            <SubmitButton 
            title={edititingId ? "Update Speciality" : "Create Speciality"} 
            isLoading={isLoading} 
            loadingTitle={edititingId ? "Updating Please Wait..." : "Saving please wait..."} />
              </div>
            </form>
        </div>
    );
  }
  