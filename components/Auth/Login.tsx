"use client"

import TextInput from "../FormInputs/TextInput";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import SubmitButton from "../FormInputs/SubmitButton";
import { LoginInputProps } from "@/types/types";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Alert } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";
import { Button } from "../ui/button";
import Image from 'next/image';


export default function LoginFormWithBg() {
    const [isLoading, setIsLoading]=useState(false);
    const [showNotification, setShowNotification]=useState(false)
    const router = useRouter()
    const {
      register,
      handleSubmit,
      reset,
      formState:{errors},
    }=useForm<LoginInputProps>();
    async function onSubmit (data: LoginInputProps){
      try {
        setIsLoading(true);
        console.log("Attempting to sign in with credentials:", data);
        const loginData = await signIn("credentials", {
          ...data,
          redirect: false,
        });
        console.log("SignIn response:", loginData);
        if (loginData?.error) {
          setIsLoading(false);
          toast.error("Sign-in error: Check your credentials");
          setShowNotification(true);
        } else {
          // Sign-in was successful
          setShowNotification(false);
          reset();
          setIsLoading(false);
          toast.success("Login Successful");
          router.push("/dashboard");
        }
      } catch (error) {
        setIsLoading(false);
        console.error("Network Error:", error);
        toast.error("Its seems something is wrong with your Network");
      }
    }
  return (
    <div className="w-full lg:grid h-screen lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to login to your account
            </p>
          </div>
          <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
          {showNotification && (
            <Alert color="failure" icon={HiInformationCircle}>
              <span className="font-medium">Sign-in error!</span> Please Check
              your credentials
            </Alert>
          )}
          <TextInput label="Email Address"
            register={register} 
            name="email"
            type="email"
            errors={errors}
            placeholder="Eg. clinicease03@gmail.com" 
            />

            <TextInput 
             label="Password" 
             register={register}
             page="login" 
             name="password"
             type="password" 
             errors={errors}
             placeholder="******" 
            />
            
            <SubmitButton 
            title="Login" 
            isLoading={isLoading} 
            LoadingTitle="Logging you in please wait...." 
            />
            <Button variant="outline" className="w-full">
              Login with Google
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <Image
          src="/Doctor.jpeg"
          alt="Image"
          width= "1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  )
}
