"use client"

import { BasicInfoProps, type RegisterInputProps } from "@/types/types";
import { useForm } from "react-hook-form"
import TextInput from "../FormInputs/TextInput";
import SubmitButton from "../FormInputs/SubmitButton";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ImageInput from "../FormInputs/ImageInput";
import generateTrackingNumber from "@/lib/generatetracking";
import { createClinicProfile } from "@/actions/registry";
import OnBoardingContext, { useOnboardingContext } from "@/context/context";
import toast from "react-hot-toast";

export type StepFormprops = {
  page: string;
  title: string;
  description: string;
  userId?: string;
  nextPage?: string;
  formId?: string;
};
export default function BasicInfo({
  page, 
  title, 
  description, 
  userId,
  nextPage,
  formId=""
}: StepFormprops) {
  const {trackingNumber,setTrackingNumber,clinicProfileId, setClinicProfileId} = useOnboardingContext();
  console.log(trackingNumber,clinicProfileId);
  const [profileImage,setprofileImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const {basicData, setBasicData,savedDBData}=useOnboardingContext()
   const {
    register,
    handleSubmit,
    reset,
    formState:{errors},
  } = useForm<BasicInfoProps>({
    defaultValues: {
      clinicName: basicData.clinicName || savedDBData.clinicName,
      email: basicData.email || savedDBData.email,
      phone: basicData.phone || savedDBData.phone,
      address: basicData.address || savedDBData.address,
      profilePicture: basicData.profilePicture || savedDBData.profilePicture,
      page: basicData.page || savedDBData.page,
      trackingNumber: basicData.trackingNumber || savedDBData.trackingNumber,
      userId: basicData.userId || savedDBData.userId,
    }
  });
  const router = useRouter();
  async function onSubmit (data: BasicInfoProps) {
    setIsLoading(true);
    data.userId = userId,
    data.trackingNumber = generateTrackingNumber()
    data.page = page;
    data.profilePicture=profileImage;
    console.log(data);

    try {
      const res = await createClinicProfile(data);
              //save data to the API --TODO
      setBasicData(data)
      if (res.status===201){
        setIsLoading(false)
        toast.success("Clinic Profile created");

        const{data}=res
        setTrackingNumber(res.data?.trackingNumber??"");
        setClinicProfileId(res.data?.id??"");

        //ROUTE TO THE NEXT FORM
      router.push(`/registry/${userId}?page=${nextPage}`);
      console.log(res.data)
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error)
    }
  }
    return (
        <div className=" min-h-full flex-1 flex-col justify-center px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-4xl font-bold leading-9 tracking-tight text-gray-400">
              {title}
            </h2>
            <p className="text-balance text-muted-foreground justify-center flex py-2">
              {description}
            </p>
          </div>
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm grid-cols-2">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <TextInput 
              label="Clinic Name" 
              register={register} 
              name="clinicName" 
              errors={errors} 
              />
              <TextInput 
              label="Email Address" 
              register={register} 
              name="email"
              type="email"
              errors={errors} 
              />
              <TextInput 
              label="Phone Number" 
              register={register} 
              name="phone"
              type="tel"
              errors={errors} 
              />
              <TextInput 
              label="Address" 
              register={register} 
              name="address"
              errors={errors} 
              />
              <ImageInput 
                label ="Profile Image"
                imageUrl = {profileImage}
                setImageUrl = {setprofileImage}
                endpoint = "clinicProfilePicture"
                />
              
              <div className="py-4">
                <SubmitButton title="Save & Continue" isLoading={isLoading} loadingTitle={"Saving, Please Wait..."} />
              </div>
            </form>
          </div>
        </div>
    )
  }
  