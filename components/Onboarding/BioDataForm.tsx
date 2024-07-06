"use client"
import Link from "next/link";
import { useForm } from "react-hook-form";
import TextInput from "@components/FormInputs/TextInput";
import SubmitButton from "@components/FormInputs/SubmitButton";
import { useState } from "react";
import { createUser } from "@/actions/users";
import { UserRole } from "@prisma/client";
import toast from "react-hot-toast";
import { RegisterInputProps } from "@/types/types";
import { Button } from "@components/ui/button";
import Image from 'next/image';
import { useRouter } from "next/navigation";


export default function BioDataForm() {
  const [isLoading, setIsLoading]=useState(false)
  const {
    register,
    handleSubmit,
    reset,
    formState:{errors},
  }=useForm<RegisterInputProps>();
  const router = useRouter()
  async function onSubmit (data: RegisterInputProps){
   // console.log(data)
   setIsLoading(true);
}
    return (
<div className="w-full">
          <div className="text-center border-b border-gray-200 pb-4">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-2">
                Bio Data
            </h1>
            <p className="text-balance text-muted-foreground">
              Enter your information to create an account
            </p>
          </div>
          <form className="py-4 px-4 mx-auto" onSubmit={handleSubmit(onSubmit)}>
            
          <div className="grid gap-4 grid-cols-2">
          <TextInput 
            label="Full Name" 
            register={register} 
            name="fullName" 
            errors={errors}
            placeholder="Enter your full name" // Add placeholder 
            />
            <TextInput 
             label="Email Address" 
             register={register} 
             name="email"
             type="email" 
             errors={errors}
             placeholder="Eg. thetele@gmail.com"
             className="col-span-full sm:col-span-1" 
            />
            <TextInput 
             label="Email Address" 
             register={register} 
             name="email"
             type="email" 
             errors={errors}
             placeholder="Eg. thetele@gmail.com"
             className="col-span-full sm:col-span-1" 
            />
            <TextInput 
             label="Email Address" 
             register={register} 
             name="email"
             type="email" 
             errors={errors}
             placeholder="Eg. thetele@gmail.com"
             className="col-span-full sm:col-span-1" 
            />
            <TextInput 
             label="Phone Number" 
             register={register} 
             name="phone"
             type="tel" 
             errors={errors}
             placeholder="Enter your phone number" // Add placeholder
             className="col-span-full sm:col-span-1" 
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

  