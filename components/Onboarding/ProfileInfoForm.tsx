"use client"

import { BioDataFormProps, ProfileFormProps } from "@/types/types";
import {useForm} from "react-hook-form"
import TextInputs from "../FormInputs/TextInput";
import SubmitButton from "../FormInputs/SubmitButton";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { DatePickerInput } from "../FormInputs/DatePickerInput";
import { TextAreaInput } from "../FormInputs/TextAreaInput";
import toast from "react-hot-toast";
import ImageInput from "../FormInputs/ImageInput";
import { StepFormProps } from "./BioDataForm";
import { useOnboardingContext } from "@/context/context";
import { updateDoctorProfile } from "@/actions/onboarding";

export default function ProfileInfoForm({
  page,
  title, 
  description,
  formId,
  userId,
  nextPage,   
}: StepFormProps) {
  const [isLoading, setIsLoading] = useState(false);  
  const {profileData, savedDBData, setProfileData} = useOnboardingContext();

  const initialExpiryDate = profileData.medicalLicenseExpiry || savedDBData.medicalLicenseExpiry;
  const initialProfileImage = profileData.profilePicture || savedDBData.profilePicture;
  const [expiry, setExpiry] = useState<Date>(initialExpiryDate);
  const [profileImage,setProfileImage] = useState(initialProfileImage);
  
  const {register, 
    handleSubmit, 
    reset, 
    formState:{errors},
} = useForm<ProfileFormProps>({
  defaultValues: {
    profilePicture: profileData.profilePicture || savedDBData.profilePicture,
    bio: profileData.bio || savedDBData.bio,
    yearsOfExperience: profileData.yearsOfExperience || savedDBData.yearsOfExperience,
    page: profileData.page || savedDBData.page,
    medicalLicense: profileData.medicalLicense || savedDBData.medicalLicense,
    medicalLicenseExpiry: profileData.medicalLicenseExpiry || savedDBData.medicalLicenseExpiry,
  }
});
const router = useRouter();

  async function onSubmit (data: ProfileFormProps){
    setIsLoading(true);
    if (!expiry) {
        toast.error("Please select your medical license expiry.");
        setIsLoading(false);
        return;
    }
    data.medicalLicenseExpiry = expiry;
    data.page = page;
    data.yearsOfExperience = Number(data.yearsOfExperience);
    data.profilePicture = profileImage;
    console.log(data);

    try {
      const res = await updateDoctorProfile(formId, data);
      setProfileData(data)
      if (res?.status === 201) {
        setIsLoading(false);
        toast.success("Profile Info Updated Successfully")
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
            <div className="text-center border-b border-gray-200 dark:border-slate-600 pb-4">
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
                label="Medical Licence"
                register={register} 
                name="medicalLicense"
                errors={errors}
                placeholder="Enter Medical License"
                // className="col-span-full sm:col-span-1" 
             />
             <TextInputs 
                label="Years of Experience"
                register={register} 
                name="yearsOfExperience"
                errors={errors}
                placeholder="Enter Years Of Experience"
                className="col-span-full sm:col-span-1" 
             />
             <DatePickerInput 
                title="Medical License Expiration"
                date={expiry} 
                setDate={setExpiry}
                className="col-span-full sm:col-span-1"
             />
             <TextAreaInput 
                label="Bio"
                register={register} 
                name="bio"
                errors={errors}
                placeholder="Enter Your Biography"
             />
             <ImageInput 
                label ="Professional Profile Image"
                imageUrl = {profileImage}
                setImageUrl = {setProfileImage}
                endpoint = "doctorProfileImage"
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
  