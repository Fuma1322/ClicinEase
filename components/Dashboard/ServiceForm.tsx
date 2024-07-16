"use client"

import { useForm } from "react-hook-form"; // Form handling library
import TextInput from "@/components/FormInputs/TextInput"; // Custom text input component
import SubmitButton from "@/components/FormInputs/SubmitButton"; // Custom submit button component
import { useState } from "react"; // State management library
import ImageInput from "@/components/FormInputs/ImageInput"; // Custom image input component
import { Button } from "../ui/button"; // Button component
import Link from "next/link"; // Link component from Next.js
import { X } from "lucide-react"; // Icon component from Lucide React
import generateSlug from "@/utils/generateSlug"; // Utility function for generating slugs
import { createManyServices, createService } from "@/actions/services"; // API actions for creating services
import toast from "react-hot-toast"; // Toast notification library
import { useRouter } from "next/navigation"; // Router hook from Next.js
import { Service } from "@prisma/client"; // Service type from Prisma client

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
  const edititingId = initialData?.id || ""; // Extracting editing ID from initial data
  const [isLoading, setIsLoading]=useState(false); // Loading state for form submission
  const initialImageUrl = initialData?.imageUrl || ""; // Initial image URL for image input
  const [imageUrl, setImageUrl] = useState(initialImageUrl); // State for image URL
  const {
    register,
    handleSubmit,
    reset,
    formState:{errors},
  } = useForm<ServiceProps>({
    defaultValues: {
      title: initialData?.title, // Default values for form fields
    },
  });
  const router = useRouter(); // Router instance

  // Function to handle form submission
  async function onSubmit(data: ServiceProps) {
    setIsLoading(true); // Set loading state to true
    const slug = generateSlug(data.title); // Generate slug from service title
    data.imageUrl = imageUrl; // Set image URL in form data
    data.slug=slug; // Set slug in form data
    console.log(data); // Log form data to console for debugging

    if (edititingId) {
      await UpdateService(edititingId, data); // Call update service API
      toast.success("Service Updated Successfully"); // Display success toast
    } else {
      await createService(data); // Call create service API
      toast.success("Service Created Successfully"); // Display success toast
    }

    reset(); // Reset form fields
    router.push("/dashboard/services"); // Redirect to services dashboard
  }

  // Function to handle creation of multiple services
  async function handleCreateMany(){
    setIsLoading(true); // Set loading state to true
    try {
      await createManyServices(); // Call API to create many services
      setIsLoading(false); // Set loading state to false on success
    } catch (error) {
      console.log(error); // Log any errors that occur
    }
  }

  return (
    <div className=" w-full max-w-xl shadow-sm rounded-md m-3 border border-gray-200 mx-auto">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm py-4 border-gray-200 dark:border-gray-600">
        <div className="flex items-center justify-between px-6">
          <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight">
            {title} {/* Display form title */}
          </h1>
          {/* Button to create many services */}
          <Button onClick={handleCreateMany} className="">
            {isLoading ? "Creating...." : "Create Many"}
          </Button>
          {/* Button to cancel form submission */}
          <Button type="button" asChild variant={"outline"}>
            <Link href="/dashboard/services">
              <X className="w-4 h-4"/>
            </Link>
          </Button>
        </div>
      </div>
      {/* Form for submitting service data */}
      <form onSubmit={handleSubmit(onSubmit)} className="py-4 px-4 mx-auto">
        <div className="grid gap-4 grid-cols-2">
          {/* Text input for service title */}
          <TextInput 
            label="Service Title" 
            register={register} 
            name="title" 
            errors={errors} 
            placeholder="Enter Service title"
          />
          {/* Image input for service */}
          <ImageInput 
            label ="Professional Profile Image"
            imageUrl = {imageUrl}
            setImageUrl = {setImageUrl}
            endpoint = "serviceImage"
          />
        </div>
        
        <div className="mt-8 flex justify-between gap-4 items-center">
          {/* Button to cancel form submission */}
          <Button asChild variant={"outline"}>
            <Link href="/dashboard/services">
              Cancel
            </Link>
          </Button>
          {/* Submit button for form submission */}
          <SubmitButton 
            title={edititingId ? "Update Service" : "Create Service"} 
            isLoading={isLoading} 
            LoadingTitle={edititingId ? "Updating Please Wait..." : "Saving please wait..."} 
          />
        </div>
      </form>
    </div>
  );
}

// Placeholder function for updating a service
function UpdateService(edititingId: string, data: ServiceProps) {
  throw new Error("Function not implemented.");
}
