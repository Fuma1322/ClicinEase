"use client"

import { PracticeFormProps } from "@/types/types";
import {useForm} from "react-hook-form"
import TextInputs from "../FormInputs/TextInput";
import SubmitButton from "../FormInputs/SubmitButton";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShadSelectInput } from "@/components/FormInputs/ShadSelectInput";
import { StepFormProps } from "./BioDataForm";
import { updateDoctorProfile } from "@/actions/onboarding";
import toast from "react-hot-toast";
import { useOnboardingContext } from "@/context/context";
import ArrayItemsInput from "../FormInputs/ArrayItemsInput";

export default function PracticeInfo({
  page,
  title, 
  description,
  formId,
  userId,
  nextPage,
}: StepFormProps) {
  const {practiceData, savedDBData, setPracticeData} = useOnboardingContext();
  const insuranceOptions = [
    {
        label: "Yes",
        value: "yes",
      },
      {
        label: "No", 
        value: "no",
      },
  ];
  const initialServices = practiceData.servicesOffered.length > 0 ? practiceData.servicesOffered : savedDBData.servicesOffered;
  const initialInsuranceAccepted = practiceData.insuranceAccepted || savedDBData. insuranceAccepted;
  const [isLoading, setIsLoading] = useState(false)
  const [services, setServices] = useState(initialServices);
  const [insuranceAccepted, setInsuranceAccepted] = useState(initialInsuranceAccepted);
  const {register, 
    handleSubmit, 
    reset, 
    formState:{errors},
} = useForm<PracticeFormProps>({
  defaultValues: {
    organizationName: practiceData.organizationName || savedDBData.organizationName,
    organizationAddress: practiceData.organizationAddress || savedDBData.organizationAddress,
    organizationContactNumber: practiceData.organizationContactNumber || savedDBData.organizationContactNumber,
    organizationEmailAddress: practiceData.organizationEmailAddress || savedDBData.organizationEmailAddress,
    organizationWebsite: practiceData.organizationWebsite || savedDBData.organizationWebsite,
    organizationHoursOfOperarion: practiceData.organizationHoursOfOperarion || savedDBData.organizationHoursOfOperarion,
    insuranceAccepted: practiceData.insuranceAccepted || savedDBData.insuranceAccepted,
    servicesOffered: practiceData.servicesOffered || savedDBData.servicesOffered,
    page: practiceData.page || savedDBData.page,
  }
});
const router = useRouter()

  async function onSubmit (data: PracticeFormProps){
    
    data.page = page;
    data.insuranceAccepted = insuranceAccepted;
    data.servicesOffered = services;
    console.log(data);
    setIsLoading(true);
    
    try {
      const res = await updateDoctorProfile(formId, data);
      setPracticeData(data);
      if (res?.status === 201) {
        setIsLoading(false);
        toast.success("Practice Info Updated Successfully")
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
                label="Organization Name"
                register={register}
                name="organizationName"
                errors={errors} 
                placeholder="Enter Organization Name"
                className="col-span-full sm:col-span-1"
             />
             <TextInputs 
                label="Organization Address"
                register={register} 
                name="organizationAddress"
                errors={errors}
                placeholder="Enter Organization Address"
                className="col-span-full sm:col-span-1" 
             />
             <TextInputs 
                label="Organization Contact Number"
                register={register} 
                name="organizationContactNumber"
                errors={errors}
                placeholder="Enter Organization Contact Number"
                className="col-span-full sm:col-span-1" 
             />
             <TextInputs 
                label="Organization Email Address"
                register={register} 
                name="organizationEmailAddress"
                errors={errors}
                placeholder="Eg. clinicease03@gmail.com"
                className="col-span-full sm:col-span-1" 
              />
              <TextInputs 
                label="Organization Website(Optional)"
                register={register} 
                name="organizationWebsite"
                errors={errors}
                placeholder="Enter Organization Website"
                isRequired = {false}
                className="col-span-full sm:col-span-1" 
              />
              <TextInputs 
                label="Organization Hours Of Operation "
                register={register} 
                name="organizationHoursOfOperarion"
                errors={errors}
                placeholder="Enter Organization Hours Of Operation"
                className="col-span-full sm:col-span-1" 
              />
                <ShadSelectInput 
                label="Do You Accept Insurance" 
                optionTitle="Insurance Acceptable" 
                options={insuranceOptions} 
                errors={errors}
                selectedOption={insuranceAccepted} 
                setSelectedOption={setInsuranceAccepted}              
                />
              <ArrayItemsInput 
                setItems={setServices}
                items={services} 
                itemTitle="Add Clinic Services" 
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
  