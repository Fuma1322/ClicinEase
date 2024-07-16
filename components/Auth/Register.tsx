"use client"

import { type RegisterInputProps } from "@/types/types"; // Importing RegisterInputProps type
import Link from "next/link"; // Importing Link component from Next.js
import {useForm} from "react-hook-form"; // Importing useForm hook from react-hook-form
import TextInputs from "../FormInputs/TextInput"; // Importing custom TextInput component
import SubmitButton from "../FormInputs/SubmitButton"; // Importing custom SubmitButton component
import { useState } from "react"; // Importing useState hook from React
import { createUser } from "@/actions/users"; // Importing createUser function from actions/users
import toast from "react-hot-toast"; // Importing toast notifications from react-hot-toast
import { Button } from "../ui/button"; // Importing custom Button component
import Image from "next/image"; // Importing Image component from Next.js
import { useRouter } from "next/navigation"; // Importing useRouter hook from next/navigation

export default function RegisterFormWitBg({
  role="USER", // Default role set to "USER"
  plan= "", // Default plan set to an empty string
}:{
  role?: string | string[] | undefined; // Role prop can be string or array of strings or undefined
  plan?: string | string[] | undefined; // Plan prop can be string or array of strings or undefined
}) {
  const [isLoading, setIsLoading] = useState(false); // State for loading state
  const {
    register,
    handleSubmit,
    reset,
    formState:{errors},
  } = useForm<RegisterInputProps>(); // useForm hook for form handling with RegisterInputProps type
  const router = useRouter(); // useRouter hook for routing

  async function onSubmit (data: RegisterInputProps) {
    setIsLoading(true); // Start loading
    data.role = role; // Assigning role from props to form data
    data.plan = plan; // Assigning plan from props to form data
    try {
      const user = await createUser(data); // Calling createUser function with form data
      if (user && user.status === 200) {
        console.log("User created successfully");
        reset(); // Reset form
        setIsLoading(false); // Stop loading
        toast.success("User created successfully"); // Success toast for user creation
        router.push(`/verify-account/${user.data?.id}`); // Redirect to verification page with user ID
        console.log(user.data);
      } else {
        console.log(user.error);
      }
    } catch (error) {
      console.log(error); // Log any errors
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
              placeholder={"Eg. Clinic Ease"}
            />

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
              name="phone"
              type="tel"
              errors={errors}
              placeholder="Eg. +266 57897856"
            />

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
      {/* Placeholder for an Image component */}
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
  );
}
