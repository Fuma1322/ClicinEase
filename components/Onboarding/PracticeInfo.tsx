"use client"
import Link from "next/link";
import { useForm } from "react-hook-form";
import TextInput from "@components/FormInputs/TextInput";
import SubmitButton from "@components/FormInputs/SubmitButton";
import { useState } from "react";
import { createUser } from "@/actions/users";
import { UserRole } from "@prisma/client";
import toast from "react-hot-toast";
import { BioDataFormProps, RegisterInputProps } from "@/types/types";
import { Button } from "@components/ui/button";
import Image from 'next/image';
import { useRouter } from "next/navigation";
import { DatePickerInput } from "@components/FormInputs/DatePickerInput";
import { TextAreaInput } from "@components/FormInputs/TextAreaInput";
import RadioInput from "@components/FormInputs/RadioInput";
import ImageInput from "@components/FormInputs/ImageInput";


export type StepFormProps={
  page:string, 
  title:string, 
  description:string 
}

export default function BioDataForm({page, title, description}:StepFormProps) {
  const [isLoading, setIsLoading]=useState(false);
  const [dob, setDOB] = useState<Date>();
  const [expiry, setExpiry] = useState<Date>();
  const [profileImage, setProfileImage] = useState("");
  const genderOptions = [
    {
        label: "Male",
        value: "male"
    },
    {
        label: "Female",
        value: "female",
    }
]
 // console.log(date)
  const {
    register,
    handleSubmit,
    reset,
    formState:{errors},
  }=useForm<BioDataFormProps>();
  const router = useRouter()
  async function onSubmit (data: BioDataFormProps){
    if(!dob){
      toast.error("Please select your date of birth");
      return;
    }
    if(!expiry){
      toast.error("Please select your License Expiry Date");
      return;
    }
    data.dob = dob;
    data.medicalLicenseExpiry = expiry;
    data.page = page
   console.log(data)
   //setIsLoading(true);
}
    return (
<div className="w-full">
          <div className="text-center border-b border-gray-200 pb-4">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-2">
                {title}
            </h1>
            <p className="text-balance text-muted-foreground">
              {description}
            </p>
          </div>
          <form className="py-4 px-4 mx-auto" onSubmit={handleSubmit(onSubmit)}>
            
          <div className="grid gap-4 grid-cols-2">
          <TextInput 
            label="First Name" 
            register={register} 
            name="firstName" 
            errors={errors}
            placeholder="Enter your first name" // Add placeholder
            className="col-span-full sm:col-span-1"
            />
            <TextInput 
             label="Last Name" 
             register={register} 
             name="lastName"
             errors={errors}
             placeholder="Eg. Ramoonyane"
             className="col-span-full sm:col-span-1" 
            />
            <TextInput 
             label="Middle Name (Optional)" 
             register={register} 
             name="middleName" 
             errors={errors}
             placeholder="Eg. Joseph"
             className="col-span-full sm:col-span-1" 
            />
            <DatePickerInput
            className="col-span-full sm:col-span-1" 
            date={dob} 
            setDate={setDOB} 
            title="Date of Birth"
            />

            <RadioInput
            radioOptions={genderOptions} 
            errors={errors} 
            title="Gender" 
            name="gender" 
            register={register}
            />

          </div>
            <div className="mt-8 flex justify-center items-center">
            <SubmitButton title="Save and Continue" 
                isLoading={isLoading} 
                loadingTitle="Saving please wait..." />
            </div>
          </form>
        </div>
    )
  }

  