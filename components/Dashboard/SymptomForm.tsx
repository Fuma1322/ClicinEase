"use client"

// React Hook Form for form handling
import { useForm } from "react-hook-form";

// Custom TextInput component
import TextInput from "@/components/FormInputs/TextInput";

// Custom SubmitButton component
import SubmitButton from "@/components/FormInputs/SubmitButton";

// React library for state management
import { useState } from "react";

// Custom Button component
import { Button } from "../ui/button";

// Next.js Link component for navigation
import Link from "next/link";

// Lucide icon for close button
import { X } from "lucide-react";

// Utility function for generating slugs
import generateSlug from "@/utils/generateSlug";

// Toast notification library
import toast from "react-hot-toast";

// Next.js useRouter for navigation
import { useRouter } from "next/navigation";

// Prisma client Symptom type
import { Symptom } from "@prisma/client";

// Action functions for CRUD operations
import { createManySymptoms, createSymptom, updateSymptomById } from "@/actions/symptom";

// Define props type for SymptomForm component
export type SymptomProps = {
  title: string;
  slug: string;
};

// SymptomForm component definition
export default function SymptomForm({
  title,
  initialData,
}: {
  title: string;
  initialData?: Symptom;
}) {
  // Determine if editing or creating new
  const editingId = initialData?.id || "";

  // State for loading state
  const [isLoading, setIsLoading] = useState(false);

  // React Hook Form usage with default values
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SymptomProps>({
    defaultValues: {
      title: initialData?.title,
    },
  });

  // Next.js useRouter for navigation
  const router = useRouter();

  // Handle form submit action
  async function onSubmit(data: SymptomProps) {
    setIsLoading(true); // Set loading state

    // Generate slug from title
    const slug = generateSlug(data.title);
    data.slug = slug; // Assign generated slug to data

    console.log(data);

    // Check if editing or creating new symptom
    if (editingId) {
      await updateSymptomById(editingId, data); // Update existing symptom
      toast.success("Symptom Updated Successfully"); // Show success toast
    } else {
      await createSymptom(data); // Create new symptom
      toast.success("Symptom Created Successfully"); // Show success toast
    }

    reset(); // Reset form fields
    router.push("/dashboard/symptoms"); // Redirect to symptoms dashboard
  }

  // Handle creating many symptoms
  async function handleCreateMany() {
    setIsLoading(true); // Set loading state
    try {
      await createManySymptoms(); // Call action to create many symptoms
      setIsLoading(false); // Set loading state to false
    } catch (error) {
      console.log(error); // Log any errors
    }
  }

  return (
    <div className=" w-full max-w-xl shadow-sm rounded-md m-3 border border-gray-200 mx-auto">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm py-4 border-gray-200 dark:border-gray-600">
        <div className="flex items-center justify-between px-6">
          <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight">
            {title}
          </h1>
          <Button type="button" onClick={handleCreateMany} className="">
            {isLoading ? "Creating...." : "Create Many"}
          </Button>
          <Button type="button" asChild variant={"outline"}>
            <Link href="/dashboard/symptoms">
              <X className="w-4 h-4" />
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
            placeholder="Enter Symptom title"
          />
        </div>

        <div className="mt-8 flex justify-between gap-4 items-center">
          <Button asChild variant={"outline"}>
            <Link href="/dashboard/symptoms">
              Cancel
            </Link>
          </Button>
          <SubmitButton
            title={editingId ? "Update Symptom" : "Create Symptom"}
            isLoading={isLoading}
            LoadingTitle={editingId ? "Updating Please Wait..." : "Creating please wait..."}
          />
        </div>
      </form>
    </div>
  );
}
