"use client"

import TextInput from "../FormInputs/TextInput"; // Importing custom TextInput component
import Link from "next/link"; // Importing Link component from Next.js
import { useState } from "react"; // Importing useState hook from React
import { useForm } from "react-hook-form"; // Importing useForm hook from react-hook-form
import SubmitButton from "../FormInputs/SubmitButton"; // Importing custom SubmitButton component
import { LoginInputProps } from "@/types/types"; // Importing LoginInputProps type
import toast from "react-hot-toast"; // Importing toast notifications from react-hot-toast
import { signIn } from "next-auth/react"; // Importing signIn function from next-auth/react
import { useRouter } from "next/navigation"; // Importing useRouter hook from next/navigation
import { Alert } from "flowbite-react"; // Importing Alert component from flowbite-react
import { HiInformationCircle } from "react-icons/hi"; // Importing HiInformationCircle icon from react-icons/hi
import { Button } from "../ui/button"; // Importing custom Button component
import Image from 'next/image'; // Importing Image component from Next.js

export default function LoginFormWithBg() {
    const [isLoading, setIsLoading]=useState(false); // State for loading state
    const [showNotification, setShowNotification]=useState(false); // State for showing notification
    const router = useRouter(); // useRouter hook for routing
    const {
      register,
      handleSubmit,
      reset,
      formState:{errors},
    }=useForm<LoginInputProps>(); // useForm hook for form handling

    async function onSubmit (data: LoginInputProps) {
      try {
        setIsLoading(true); // Start loading
        console.log("Attempting to sign in with credentials:", data);
        const loginData = await signIn("credentials", {
          ...data,
          redirect: false,
        }); // Signing in using credentials
        console.log("SignIn response:", loginData);
        if (loginData?.error) {
          setIsLoading(false);
          toast.error("Sign-in error: Check your credentials"); // Error toast if sign-in fails
          setShowNotification(true); // Show notification for sign-in error
        } else {
          // Sign-in was successful
          setShowNotification(false); // Hide any existing notification
          reset(); // Reset form
          setIsLoading(false); // Stop loading
          toast.success("Login Successful"); // Success toast for successful login
          router.push("/dashboard"); // Redirect to dashboard
        }
      } catch (error) {
        setIsLoading(false); // Stop loading
        console.error("Network Error:", error);
        toast.error("It seems something is wrong with your Network"); // Error toast for network issues
      }
    }

  return (
    <div className="w-full flex items-center justify-center h-screen lg:grid-cols-2 xl:min-h-[800px]">
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
            <TextInput
              label="Email Address"
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
        {/* Placeholder for an Image component */}
      </div>
    </div>
  );
}
