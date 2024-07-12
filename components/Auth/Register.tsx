"use client"

import { type RegisterInputProps } from "@/types/types";
import Link from "next/link";
import {useForm} from "react-hook-form"
import TextInputs from "../FormInputs/TextInput";
import SubmitButton from "../FormInputs/SubmitButton";
import { useState } from "react";
import { createUser } from "@/actions/users";
import toast from "react-hot-toast";
import { Button } from "../ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function RegisterFormWitBg({
  role="USER",
   plan= "",
  }:{
    role?: string | string[]| undefined;
    plan?: string | string[]| undefined;
  }) {
  const [isLoading, setIsLoading] = useState(false)
  const {register, 
    handleSubmit, 
    reset, 
    formState:{errors},
} = useForm<RegisterInputProps>();
const router = useRouter()

  async function onSubmit (data: RegisterInputProps){
    setIsLoading(true)
    data.role = role;
    data.plan = plan; 
    try {
      const user = await createUser(data)
      if (user && user.status===200) {
        console.log("User created sucessfully");
        reset();
        setIsLoading(false);
        toast.success("User created successfully")
        router.push(`/verify-account/${user.data?.id}`)
        console.log(user.data)
      } else {
        console.log(user.error)
      }
    }  catch (error) {
      console.log(error);
    }
  }
    return (
        <div className="w-full flex items-center justify-center h-screen lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
        <div className="flex items-center justify-center py-12">
          <div className="mx-auto grid w-[350px] gap-6">
            <div className="grid gap-2 text-center">
              <h1 className="text-3xl font-bold">Sign Up</h1>
              <p className="text-balance text-muted-foreground">
                Enter your information to create an account
              </p>
            </div>
            <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
             <TextInputs  
                            label="Full Name"
                            register={register}
                            name="fullName"
                            errors={errors} 
                            placeholder={"Eg. Clinic Ease"}              />
             <TextInputs 
                            label="Email Address"
                            register={register} 
                            name="email"
                            type="email"
                            errors={errors}
                            placeholder="Eg. clinicease03@gmail.com" 
                            />
              <TextInputs  
                            label="Phone Number"
                            register={register}
                            name="phone" type="tel"
                            errors={errors} 
                            placeholder="Eg. +266 57897856" />

  
              <TextInputs 
                            label="Password"
                            register={register} 
                            name="password"
                            type="password"
                            errors={errors}
                            placeholder="**********" 
                            />
  
              <SubmitButton 
              title="Sign Up" 
              isLoading={isLoading} 
              LoadingTitle="Creating Account, please wait...."
              />
              <Button variant="outline" className="w-full">
                SignUp with Google
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
        {/* <div className="hidden bg-muted lg:block">
          <Image
            src="/hero2.jpeg"
            alt="Image"
            width="1000"
            height="907"
            className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
          />
        </div> */}
      </div>
    )
  }
  