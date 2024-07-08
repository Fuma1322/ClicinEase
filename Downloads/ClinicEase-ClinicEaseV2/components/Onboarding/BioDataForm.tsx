"use client"

import { BioDataFormProps } from "@/types/types";
import {useForm} from "react-hook-form"
import TextInputs from "../FormInputs/TextInput";
import SubmitButton from "../FormInputs/SubmitButton";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { DatePickerInput } from "@components/FormInputs/DatePickerInput";
import RadioInput from "@components/FormInputs/RadioInput";
import toast from "react-hot-toast";
import generateTrackingNumber from "@/lib/generatetracking";
import { createDoctorProfile } from "@/actions/onboarding";
import { useOnboardingContext } from "@/context/context";

export type StepFormProps = {
  page: string;
  title: string;
  description: string;
  nextPage?: string;
  userId?: string;
  formId?: string;
}
export default function BioDataForm({
  page, 
  title,
  description,
  userId,
  nextPage,
  formId="",
}: StepFormProps) {
  //GET CONTEXT DATA

  const {
    trackingNumber,
    doctorProfileId,
    setTrackingNumber, 
    setDoctorProfileId, 
  } = useOnboardingContext();
  console.log(trackingNumber,doctorProfileId);
  const [isLoading, setIsLoading] = useState(false)
  const [dob, setDOB] = useState<Date>();
  const genderOptions = [
    {
        label: "Male",
        value: "male",
      },
      {
        label: "Female", 
        value: "female",
      },
]
  const {register, 
    handleSubmit, 
    reset, 
    formState:{errors},
} = useForm<BioDataFormProps>();
const router = useRouter()

  async function onSubmit (data: BioDataFormProps){
    setIsLoading(true);
    if (!dob) {
        toast.error("Please select your date of birth.");
        return;
    }
    data.userId = userId;
    data.trackingNumber = generateTrackingNumber();
    data.dob = dob;
    data.page = page;
    console.log(data);
    // setIsLoading(true) 

    try {
      const res = await createDoctorProfile(data);
      
      if (res?.status === 201) {
        setIsLoading(false);
        toast.success("Profile Completed Successfully");
        setTrackingNumber(res.data?.trackingNumber??"");
        setDoctorProfileId(res.data?.id??"");
        router.push(`/onboarding/${userId}?page=${nextPage}`);
        console.log(res.data);
      } else {
        setIsLoading(false);
        throw new Error("Something went wrong");
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      // toast.error("An error occurred. Please try again.");
    // } finally {
    //   // setIsLoading(false);
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
            className="py-4 px-4 mx-auto" onSubmit={handleSubmit(onSubmit)}
            >
            <div className="grid gap-4 grid-cols-2">
            <TextInputs  
                label="First Name"
                register={register}
                name="firstName"
                errors={errors} 
                placeholder={"Eg. Clinic"}
                className="col-span-full sm:col-span-1"
             />
             <TextInputs 
                label="Last Name"
                register={register} 
                name="lastName"
                errors={errors}
                placeholder="Eg. Ease"
                className="col-span-full sm:col-span-1" 
             />
             <TextInputs 
                label="Middle Name (Optional)"
                register={register} 
                name="middleName"
                errors={errors}
                isRequired={false}
                placeholder="Eg. Booking"
                className="col-span-full sm:col-span-1" 
             />
             <DatePickerInput 
                title="Date of Birth"
                date={dob} 
                setDate={setDOB}
                className="col-span-full sm:col-span-1"
             />
             <RadioInput 
             name="gender" 
             register={register} 
             title="Gender" 
             errors={errors}
             radioOptions={genderOptions} 
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
  