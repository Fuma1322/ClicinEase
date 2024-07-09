"use client"

import { ContactFormProps } from "@/types/types";
import {useForm} from "react-hook-form"
import TextInputs from "../FormInputs/TextInput";
import SubmitButton from "../FormInputs/SubmitButton";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { StepFormProps } from "./BioDataForm";
import { updateDoctorProfile } from "@/actions/onboarding";
import toast from "react-hot-toast";
import { useOnboardingContext } from "@/context/context";

export default function ContactInfo({
  page,
  title, 
  description,
  formId,
  userId,
  nextPage,
}: StepFormProps) {
  const {contactData, savedDBData, setContactData} = useOnboardingContext();
  const [isLoading, setIsLoading] = useState(false);  
  const {register, 
    handleSubmit, 
    reset, 
    formState:{errors},
} = useForm<ContactFormProps>({
  defaultValues: contactData || savedDBData,
});
const router = useRouter()

  async function onSubmit (data: ContactFormProps){
    setIsLoading(true);
    data.page = page;
    console.log(data); 

    try {
      const res = await updateDoctorProfile(formId, data);
      setContactData(data);  // update the state with the new form data
      if (res?.status === 201) {
        setIsLoading(false);
        toast.success("Contact Info Updated Successfully")
        // extract the profile form data from the updated profile
        router.push(`/onboarding/${userId}?page=${nextPage}`);
        console.log(res.data);
      }else {
        setIsLoading(false);
        throw new Error ("Something went wrong")
      }
    } catch (error) {
      setIsLoading(false);
    }
  }
    return (
        <div className="w-full">
            <div className="text-center border-b border-gray-200 pb-4">
              <h1 className="scroll-m-20 text-4xl mb-2 font-extrabold tracking-tight lg:text-5x">
                {title}
              </h1>
              <p className="text-balance text-muted-foreground">
                {description}
              </p>
            </div>
            <form 
            className="py-4 px-4 mx-auto" 
            onSubmit={handleSubmit(onSubmit)}
            >
            <div className="grid gap-4 grid-cols-2">
            <TextInputs 
                label="Email Address"
                register={register} 
                name="email"
                errors={errors}
                placeholder="Eg. clinicease03@gmail.com" 
              />
              <TextInputs  
                label="Phone Number"
                register={register}
                name="phone" type="tel"
                errors={errors} 
                placeholder="Eg. +266 57897856"
                className="col-span-full sm:col-span-1" 
                />
                <TextInputs  
                label="Country"
                register={register}
                name="country"
                errors={errors} 
                placeholder="Enter Country"
                className="col-span-full sm:col-span-1" 
                />
             <TextInputs 
                label="City"
                register={register} 
                name="city"
                errors={errors}
                placeholder="Enter City"
                className="col-span-full sm:col-span-1" 
             />
             
             <TextInputs 
                label="State"
                register={register} 
                name="state"
                errors={errors}
                placeholder="Enter State"
                className="col-span-full sm:col-span-1"
             />
              
            </div>
              <div className="mt-8 flex justify-center items-center">
              <SubmitButton 
              title="Save & Continue" 
              isLoading={isLoading} 
              LoadingTitle="Saving, please wait...."
              />
              </div>
            </form>
            </div>
    )
  }
  