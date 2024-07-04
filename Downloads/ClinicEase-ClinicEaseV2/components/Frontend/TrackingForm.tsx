"use client";
 
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { HiInformationCircle } from "react-icons/hi";
import { Alert } from "flowbite-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

//import { UserRole } from "@prisma/client";
import { Input } from "../ui/input";
//import Link from "next/link";
import { getApplicationByTrackingNumber } from "@/actions/registry";
import SubmitButton from "../FormInputs/SubmitButton";
import { useOnboardingContext } from "@/context/context";
 
const FormSchema = z.object({
  trackingNumber: z.string().min(2, {
    message: "Tracking Number must be at least 10 characters.",
  }),
});

 
export default function TrackingForm() {
  const {savedDBData, setSavedDBData} = useOnboardingContext()
  const [loading, setLoading] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  

  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      trackingNumber: "",
    },
  })
 
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setLoading(true);
    try {
      // make request
      const res = await getApplicationByTrackingNumber(data.trackingNumber)
      //SAVE THIS TO THE CONTEXT API
      setSavedDBData(res?.data)
      if (res?.status===404){
        setShowNotification(true)
        setLoading(false)
      }
      if (res?.status===200){
        toast.success("Redirecting you")
        // setUserId(res.data?.userId!)
        // setPage(res.data?.page!)
        // setTrackingSuccessful(true)
        // setShowNotification(true)
        setLoading(false)
        router.push(`/registry/${res.data?.userId}?page=${res.data?.page}`)
        
      } else {
        throw new Error("Something went wrong")
      }
      //registry page or onboarding
    } catch (error) {
      toast.error("Something went wrong, Try Again")
      setLoading(false);
      console.log(error);
    }
  }
 
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full mr-3 space-y-6">
        {showNotification && (
          <Alert color="failure" icon={HiInformationCircle}>
            <span className="font-medium">Wrong Traking Number!</span> Please Check the
            Tracking number and Enter again
          </Alert>
        )}
       <FormField
          control={form.control}
          name="trackingNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tracking Number</FormLabel>
              <FormControl>
                <Input placeholder="eg. NKBNMPTRPP" {...field} />
              </FormControl>
              <FormDescription>
                {/* Enter Tracking Number */}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
 
        <SubmitButton title="Submit to Resume" isLoading={loading}loadingTitle="Fetching please wait..." 
        />
      </form>
    </Form>
  );
}