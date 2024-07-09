"use client"

import { AvailabilityFormProps } from "@/types/types";
import {useForm} from "react-hook-form"
import SubmitButton from "../FormInputs/SubmitButton";
import { useState } from "react";
import { useRouter } from "next/navigation";
import TextInput from "../FormInputs/TextInput";
import RadioInput from "@components/FormInputs/RadioInput";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { StepFormProps } from "./BioDataForm";

export default function Availability({
  page, 
  title,
  description,
}: StepFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [additionalDocs, setAdditionalDocs] = useState([]);

  const {register, 
    handleSubmit, 
    reset, 
    formState:{errors},
} = useForm<AvailabilityFormProps>();
const availabilityOptions = [
  {
      label: "Weekly (You're available one or more times during the week, every week)",
      value: "weekly",
    },
    {
      label: "Specific Dates (You're only available on specific dates)",
      value: "specific",
    },
];
const router = useRouter();
  async function onSubmit (data: AvailabilityFormProps){
    data.page = page;
    console.log(data);
    // setIsLoading(true) 
  }
    return (
        <div className="w-full">
            <div className="text-center border-b border-gray-200 pb-4">
              <h1 className="scroll-m-20 text-4xl mb-2 font-extrabold tracking-tight lg:text-5x">
                {title}
              </h1>
              <p className="text-balance text-muted-foreground">
                {description}
              </p>
            </div>
            <form 
            className="py-4 px-4 mx-auto" 
            onSubmit={handleSubmit(onSubmit)}
            >
            <div className="grid gap-4 grid-cols-2">
            <TextInput  
                label="What Is The Duration Of Your Meetings"
                register={register}
                name="meetingDuration"
                errors={errors} 
                placeholder="Enter Education History"
                className="col-span-full sm:col-span-1"
             />
              <RadioInput 
              name="availabilityType" 
              register={register} 
              title="When Are You Available For This Meeting?" 
              errors={errors}
              radioOptions={availabilityOptions} 
              />
              <div className="col-span-full">
            <h2>Define Your Weekly Availability Below:</h2>
            <div className=" border py-6 px-4 border-gray flex items-center justify-between grid grid-cols-1 md:grid-cols-3 gap-4">
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
                      <SelectItem value="AM">AM</SelectItem>
                      <SelectItem value="PM">PM</SelectItem>
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
              <div className="ml-16">
                <Button variant="ghost">
                  <Plus className="h4 w-4 flex-shrink-0" />
                  Add Window
                </Button>
              </div>
            </div>
          </div>
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
  