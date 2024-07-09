"use client";
 
import { zodResolver } from "@hookform/resolvers/zod";
import { tuple, z } from "zod";
import { HiInformationCircle } from "react-icons/hi";
import { Alert } from "flowbite-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { updateUserById } from "@/actions/users";
import SubmitButton from "../FormInputs/SubmitButton";
import { UserRole } from "@prisma/client";
import { Input } from "@components/ui/input";
import { Button } from "@components/ui/button";
import Link from "next/link";
import { getApplicationByTrack } from "@/actions/onboarding";
 
const FormSchema = z.object({
  token: z.string().min(6, {
    message: "Your token must be 6 characters.",
  }),
});
 
export default function TrackingForm() {
  const [loading, setLoading] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const router = useRouter();
  const FormSchema = z.object({
    trackingNumber: z.string().min(2, {
      message: "Tracking Number must be at least 10 characters.",
    }),
  })

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      trackingNumber: "",
    },
  })
 
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setLoading(true);
      try {
       //make request
       const res = await getApplicationByTrack(data.trackingNumber)
       if(res?.status===404) {
       setShowNotification(true)
       setLoading(false)
       }
       if(res?.status===200) {
        toast.success("Redirecting You")
        // setUserId(res.data?.userId!)
        // setPage(res.data?.page!)
        // setTrackingSuccess(true)
        router.push(`/onboarding/${res.data?.userId}?page=${res.data?.page}`)
        setLoading(false)
        } else {
          throw new Error("Something Went Wrong")
        }
        //onboarding page
      } catch (error) {
        toast.error("Something Went Wrong, Try Again")
        setLoading(false);
        console.log(error);
      }
      }
  
 
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        {showNotification && (
          <Alert color="failure" icon={HiInformationCircle}>
            <span className="font-medium">Wrong Tracking Number!</span> Please Check the
            nummber and Enter again
          </Alert>
        )}
       
        <FormField
          control={form.control}
          name="trackingNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tracking Number</FormLabel>
              <FormControl>
                <Input placeholder="Eg. O2E550EQV1" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> 
            <SubmitButton 
              title="Submit To Resume" 
              isLoading={loading} 
              LoadingTitle="Fetching, please wait...."
              />
      </form>
    </Form>
  );
}