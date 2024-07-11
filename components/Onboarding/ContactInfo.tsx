"use client"
import Link from "next/link";
import { useForm } from "react-hook-form";
import TextInput from "@components/FormInputs/TextInput";
import SubmitButton from "@components/FormInputs/SubmitButton";
import { useState } from "react";
import toast from "react-hot-toast";
import { ContactFormProps } from "@/types/types";
import { Button } from "@components/ui/button";
import { useRouter } from "next/navigation";
import { StepFormProps } from "./BioDataForm";

export default function ContactInfoForm({
  page,
  title,
  description,
}: StepFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormProps>();
  const router = useRouter();

  async function onSubmit(data: ContactFormProps) {
    console.log(data);
    // Implement form submission logic here
    // setIsLoading(true);
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
            label="Email Address"
            register={register}
            name="email"
            errors={errors}
            placeholder="Enter Email Address"
          />
          <TextInput
            label="Phone"
            register={register}
            name="phone"
            errors={errors}
            placeholder="Enter Phone Number"
          />
          <TextInput
            label="City"
            register={register}
            name="city"
            errors={errors}
            placeholder="Enter City"
          />
          <TextInput
            label="Country"
            register={register}
            name="country"
            errors={errors}
            placeholder="Enter Country"
          />
          <TextInput
            label="State"
            register={register}
            name="state"
            errors={errors}
            placeholder="Enter State"
          />
        </div>
        <div className="mt-8 flex justify-center items-center">
          <SubmitButton
            title="Save and Continue"
            isLoading={isLoading}
            loadingTitle="Saving please wait..."
          />
        </div>
      </form>
    </div>
  );
}
