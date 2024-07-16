"use client"

import { useForm } from "react-hook-form";
import TextInput from "@/components/FormInputs/TextInput";
import SubmitButton from "@/components/FormInputs/SubmitButton";
import { useState } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { X } from "lucide-react";
import generateSlug from "@/utils/generateSlug";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { createSpeciality, updateSpeciality } from "@/actions/specialities";
import { Speciality } from "@prisma/client";

// Type definition for SpecialityProps
export type SpecialityProps = {
  title: string;
  slug: string;
};

// SpecialityForm component definition
export default function SpecialityForm({
  title,
  initialData,
}: {
  title: string;
  initialData?: Speciality;
}) {
  // Determine if editing or creating new
  const editingId = initialData?.id || "";

  // State for loading status
  const [isLoading, setIsLoading] = useState(false);

  // React hook form setup
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SpecialityProps>({
    defaultValues: {
      title: initialData?.title,
    },
  });

  // Next.js router instance
  const router = useRouter();

  // Form submission handler
  async function onSubmit(data: SpecialityProps) {
    setIsLoading(true); // Set loading state
    const slug = generateSlug(data.title); // Generate slug from title
    data.slug = slug; // Assign slug to data
    console.log(data);

    // Check if editing or creating
    if (editingId) {
      await updateSpeciality(editingId, data); // Update existing speciality
      toast.success("Speciality Updated Successfully"); // Show success toast
    } else {
      await createSpeciality(data); // Create new speciality
      toast.success("Speciality Created Successfully"); // Show success toast
    }

    reset(); // Reset form after submission
    router.push("/dashboard/speciality"); // Navigate to speciality dashboard
  }

  return (
    <div className="w-full max-w-xl shadow-sm rounded-md m-3 border border-gray-200 mx-auto">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm py-4 border-gray-200 dark:border-gray-600">
        <div className="flex items-center justify-between px-6">
          <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight">
            {title}
          </h1>
          {/* Button to navigate back */}
          <Button type="button" asChild variant={"outline"}>
            <Link href="/dashboard/speciality">
              <X className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="py-4 px-4 mx-auto">
        <div className="grid gap-4 grid-cols-2">
          {/* TextInput for speciality title */}
          <TextInput
            label="Speciality Title"
            register={register}
            name="title"
            errors={errors}
            placeholder="Enter Speciality title"
          />
        </div>

        <div className="mt-8 flex justify-between gap-4 items-center">
          {/* Button to navigate back */}
          <Button asChild variant={"outline"}>
            <Link href="/dashboard/speciality">
              Cancel
            </Link>
          </Button>
          {/* Button to create or update speciality */}
          <Button asChild variant={"outline"}>
            Create Many Specialities
          </Button>
          <SubmitButton
            title={editingId ? "Update Speciality" : "Create Speciality"}
            isLoading={isLoading}
            LoadingTitle={editingId ? "Updating Please Wait..." : "Create please wait..."}
          />
        </div>
      </form>
    </div>
  );
}
