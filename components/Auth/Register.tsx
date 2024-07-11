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
import { useRouter, useSearchParams } from "next/navigation";
import { Console } from "console";


export default function RegisterWithbBg({
  role="USER",
  plan = "",
}:{
  role?: string | string[] | undefined; 
  plan?: string | string[] | undefined;
}) {

  const [isLoading, setIsLoading]=useState(false)
  const {
    register,
    handleSubmit,
    reset,
    formState:{errors},
  }=useForm<RegisterInputProps>();
  const router = useRouter();
  async function onSubmit (data: RegisterInputProps){
   // console.log(data)
   setIsLoading(true);
   data.role = role;
   data.plan = plan;    
    try{
     const user = await createUser(data);
    if(user && user.status===200) {
      console.log("User Created successfully");
      reset();
      setIsLoading(false);
      toast.success("User Created successfully");
      router.push(`/verify-account/${user.data?.id}`)
      console.log(user.data);
      
    }else{
      console.log(user.error);
    }
    }catch (error) {
      console.log(error);
    }
  }
    return (
<div className="w-full lg:grid h-screen lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Sign up</h1>
            <p className="text-balance text-muted-foreground">
              Enter your information to create an account
            </p>
          </div>
          <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
            
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
            />

            <TextInput 
             label="Phone Number" 
             register={register} 
             name="phone"
             type="tel" 
             errors={errors}
             placeholder="Enter your phone number" // Add placeholder 
            />

            <TextInput 
             label="Password" 
             register={register} 
             name="password"
             type="password" 
             errors={errors}
             placeholder="******" 
            />
            
            <SubmitButton title="Sign Up" 
                isLoading={isLoading} 
                loadingTitle="Creating Account please waiting..." />
            <Button variant="outline" className="w-full">
              Sign up with Google
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="underline">
              Login
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <Image
          src="/Doctor.jpeg"
          alt="Image"
          width= "275"
          height="183"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
    )
  }

  