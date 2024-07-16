"use client"

import { useForm } from "react-hook-form"; // Form handling library
import TextInput from "@/components/FormInputs/TextInput"; // Text input component
import SubmitButton from "@/components/FormInputs/SubmitButton"; // Submit button component
import { useState } from "react"; // State management library
import { Button } from "../ui/button"; // Button component
import Link from "next/link"; // Link component from Next.js
import generateSlug from "@/utils/generateSlug"; // Utility function for generating slugs
import toast from "react-hot-toast"; // Toast notifications library
import { useRouter } from "next/navigation"; // Next.js router
import { Speciality } from "@prisma/client"; // Speciality type from Prisma
import { createManySpecialities, createSpeciality } from "@/actions/specialities"; // API actions for creating specialities
import { updateService } from "@/actions/services"; // API action for updating services

export type SpecialityProps = {
  title: string;
  imageUrl: string;
  slug:string;
}

export default function PriceUpdateForm({
  title,
  initialData,
}:{
  title: string;
  initialData?: Speciality;
}) {
  const edititingId = initialData?.id || ""; // ID of the item being edited, default to empty string if new
  const [isLoading, setIsLoading]=useState(false); // State for loading status
  const {
    register,
    handleSubmit,
    reset,
    formState:{errors},
  } = useForm<SpecialityProps>({
    defaultValues: {
      title: initialData?.title, // Setting default values for form fields
    },
  });
  const router = useRouter(); // Next.js router instance

  async function onSubmit(data: SpecialityProps) {
    setIsLoading(true); // Start loading
    const slug = generateSlug(data.title); // Generate slug from title
    data.slug=slug; // Assign slug to data object
    console.log(data); // Log data to console for debugging
    
    // Check if editing existing item or creating new
    if (edititingId) {
      await updateService(edititingId, data); // Update existing speciality
      toast.success("Speciality Updated Successfully"); // Toast success message
    } else {
      await createSpeciality(data); // Create new speciality
      toast.success("Speciality Updated Successfully"); // Toast success message
    }
    
    reset(); // Reset form fields
    router.push("/dashboard/speciality"); // Redirect to speciality dashboard
  }

  async function handleCreateMany(){
    setIsLoading(true); // Start loading
    try {
      await createManySpecialities(); // Create multiple specialities
      setIsLoading(false); // Stop loading
    } catch (error) {
      console.log(error); // Log error to console
    }
  }

  return (
    <div className=" w-full max-w-xl shadow-sm rounded-md m-3 border border-gray-200 mx-auto">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm py-4 border-gray-200 dark:border-gray-600">
        <div className="flex items-center justify-between px-6">
          <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight">
            {title}
          </h1>
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
            <Link href="/dashboard/speciality">
              Cancel
            </Link>
          </Button>
          <Button asChild variant={"outline"} onClick={handleCreateMany}>
            Create Many specialities
          </Button>
          <SubmitButton 
            title={edititingId ? "Update Speciality" : "Create Speciality"} 
            isLoading={isLoading} 
            LoadingTitle={edititingId ? "Updating Please Wait..." : "Saving please wait..."} 
          />
        </div>
      </form>
    </div>
  );
}
