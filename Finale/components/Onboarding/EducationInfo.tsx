"use client"

import { EducationFormProps } from "@/types/types";
import {useForm} from "react-hook-form"
import TextInputs from "../FormInputs/TextInput";
import SubmitButton from "../FormInputs/SubmitButton";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { StepFormProps } from "./BioDataForm";
import ArrayItemsInput from "../FormInputs/ArrayItemsInput";
import SelectInput from "../FormInputs/SelectInput";
import MultipleFile, { File } from "../FormInputs/MultipleFile";
import { updateDoctorProfile } from "@/actions/onboarding";
import toast from "react-hot-toast";
import { useOnboardingContext } from "@/context/context";

export default function EducationInfo({
  page,
  title, 
  description,
  formId,
  userId,
  nextPage,
}: StepFormProps) {
  const {educationData, savedDBData, setEducationData} = useOnboardingContext();
  const [isLoading, setIsLoading] = useState(false);  
  const {register, 
    handleSubmit, 
    reset, 
    formState:{errors},
} = useForm<EducationFormProps>({
  defaultValues: {
    medicalSchool: educationData.medicalSchool || savedDBData.medicalSchool,
    graduationYear: educationData.graduationYear || savedDBData.graduationYear,
    primarySpecialization: educationData.primarySpecialization || savedDBData.primarySpecialization,
    page: educationData.page || savedDBData.page,
  }
});
const specialities = [
  {
      label: "Medicine",
      value: "medicine",
    },
    {
      label: "Mental Health", 
      value: "mental-health",
    },
];
const initialSpecialities = educationData.otherSpecialities.length > 0 ? educationData.otherSpecialities : savedDBData.otherSpecialities;
const [otherSpecialities, setOtherSpecialities] = useState(initialSpecialities);
const initialDocs = educationData.docCertificates || savedDBData.docCertificates;
const [docs, setDocs] = useState<File[]>(initialDocs);
console.log(docs);

const router = useRouter();

  async function onSubmit (data: EducationFormProps){
    data.page = page;
    data.otherSpecialities = otherSpecialities;
    data.docCertificates = docs.map((doc) => doc.url);
    console.log(data);
    setIsLoading(true); 
  
    try {
      const res = await updateDoctorProfile(formId, data);
      setEducationData(data);
      if (res?.status === 201) {
        setIsLoading(false);
        toast.success("Education Info Updated Successfully")
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
                label="Medical School"
                register={register} 
                name="school"
                errors={errors}
                placeholder="Enter Your Grad School Name" 
              />
              <TextInputs  
                label="Graduation Year"
                register={register}
                name="year"
                errors={errors} 
                placeholder="Enter Your Grad Year"
                className="col-span-full sm:col-span-1" 
                />
                <SelectInput  
                label="Select Primary Specializations"
                register={register}
                name="primarySpecialization"
                errors={errors}
                placeholder="Enter Primary Specialities"
                className="col-span-full sm:col-span-1"
                options={specialities}
                />
                <ArrayItemsInput 
                setItems={setOtherSpecialities}
                items={otherSpecialities} 
                itemTitle="Add Other Specialities" 
              />
              <MultipleFile 
              label="Upload Your Academic Documents (Max of 4 docs)" 
              files={docs} 
              setFiles={setDocs}
              endpoint="doctorProfessionDocs"
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


  