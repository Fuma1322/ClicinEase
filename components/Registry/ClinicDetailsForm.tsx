import { ClinicDetailsProps } from "@/types/types";
import { useForm } from "react-hook-form";
import TextInput from "../FormInputs/TextInput";
import SubmitButton from "../FormInputs/SubmitButton";
import { useState } from "react";
import { useRouter } from "next/navigation";
import RadioGroupDemo from "../FormInputs/RadioGroup";
import { Checkbox } from "../ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { useOnboardingContext } from "@/context/context";
import { StepFormprops } from "./BasicInfoForm";
import toast from "react-hot-toast"; // For showing success or error messages
import { completeProfile, createClinicProfile, updateClinicProfile } from "@/actions/registry";
import { SelectInput } from "../FormInputs/SelectInput";
import { number } from "zod";

export default function ClinicDetails({
  page, 
  title, 
  description,
  userId,
  formId
}: StepFormprops) {
  const [services,setServices]=useState([]);
  const [speciality,setSpeciality]=useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { clinicData, setClinicData,savedDBData } = useOnboardingContext();
  const { register, handleSubmit, formState: { errors } } = useForm<ClinicDetailsProps>({
    defaultValues: {
      duration: clinicData.duration || savedDBData.duration,
      availability: clinicData.availability || savedDBData.availability,
      specialization: clinicData.specialization || savedDBData.specialization,
      servicesOffered: clinicData.servicesOffered || savedDBData.servicesOffered,
      page: clinicData.page || savedDBData.page
    }
  });
  const router = useRouter();

  async function onSubmit(data: ClinicDetailsProps) {
    data.page = page;
    data.servicesOffered = services;
    data.clinicHours = Number(data.clinicHours);
    // data.specialization = [];
    console.log(data);
    setIsLoading(true);

    try {
      const res = await completeProfile(formId,data);
      setClinicData(data);

      if (res?.status === 201) {
        setIsLoading(false);
        toast.success("Profile Completed Successfully");
        router.push("/login");
        console.log(res.data);
      } else {
        setIsLoading(false);
        throw new Error("Something went wrong");
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full">
      <div className="text-center border-gray pb-4">
        <h2 className="mt-10 text-center text-4xl font-bold leading-9 tracking-tight text-gray-400">
          {title}
        </h2>
        <p className="text-balance text-muted-foreground justify-center flex py-2">
          {description}
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="mx-auto py-4 px-4">
        <div className="grid gap-4 grid-cols-2">

        <SelectInput  />
        <TextInput 
            label="Clinic Hours" 
            register={register} 
            name="hours"
            errors={errors}
            className="col-span-col-1"/>

          {/* <ArrayItemsInputs setItems={}
          items={}
          itemTitle=""/> */}

          <TextInput 
            label="What Is The Duration For Your Meetings" 
            register={register} 
            name="meetingDuration"
            errors={errors}
            className="col-span-full"
          />
          <RadioGroupDemo 
            name="availability" 
            register={register} 
            title="Availability" 
            errors={errors}
          />
          <div className="col-span-full">
            <h2>Define Your Weekly Availability Below:</h2>
            <div className=" border py-6 px-4 border-gray items-center justify-between grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Check Box */}
              <div className="">
                <div className="flex items-center space-x-2">
                  <Checkbox id="day" />
                  <label
                    htmlFor="day"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Monday
                  </label>
                </div>
              </div>
              {/* Time */}
              <div className="grid grid-cols-2 gap-4">
                <div className="grid grid-cols-3 gap-2">
                  <Select>
                    <SelectTrigger id="month">
                      <SelectValue placeholder="Month" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 12 }, (_, i) => (
                        <SelectItem 
                          key={i} 
                          value={`${(i + 1).toString().padStart(2,"0")}`}
                        >
                          {(i + 1).toString().padStart(2,"0")}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger id="year">
                      <SelectValue placeholder="Year" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 59 }, (_, i) => (
                        <SelectItem 
                          key={i} 
                          value={`${(i + 1.).toString().padStart(2,"0")}`}
                        >
                          {(i + 1).toString().padStart(2,"0")}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger id="year">
                      <SelectValue placeholder="Year" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3">AM</SelectItem>
                      <SelectItem value="4">PM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <Select>
                    <SelectTrigger id="month">
                      <SelectValue placeholder="Month" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 12 }, (_, i) => (
                        <SelectItem 
                          key={i} 
                          value={`${(i + 1).toString().padStart(2,"0")}`}
                        >
                          {(i + 1).toString().padStart(2,"0")}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger id="year">
                      <SelectValue placeholder="Year" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 59 }, (_, i) => (
                        <SelectItem 
                          key={i} 
                          value={`${(i + 1.).toString().padStart(2,"0")}`}
                        >
                          {(i + 1).toString().padStart(2,"0")}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger id="year">
                      <SelectValue placeholder="Year" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3">AM</SelectItem>
                      <SelectItem value="4">PM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              {/* Add Window */}
              <div className="">
                <Button variant="ghost">
                  <Plus className="h4 w-4 flex-shrink-0" />
                  Add Window
                </Button>
              </div>
            </div>
          </div>
          <div className="py-4 flex justify-center items-center">
            <SubmitButton title="Complete" isLoading={isLoading} loadingTitle={"Saving, Please Wait..."} />
          </div>
        </div>
      </form>
    </div>
  );
}
