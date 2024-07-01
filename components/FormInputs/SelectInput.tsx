import * as React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { boolean } from "zod"

type Clinics ={
  name: string;
  specialization:string[];
}

const clinic: Clinics[] = [
  {
    name: "Mabote Filter Clinic",
    specialization: ["Cardiology" , " dermatologist"],
  },
  {
    name: "Qoaling Filter Clinic",
    specialization: ["Dentist" , " Mid Wife"],
  },
]

 export function SelectInput() {
  return (
    <Select>
      <SelectTrigger className="w-[280px]">
        <SelectValue placeholder="Select Your Primary Specializations" />
      </SelectTrigger>
      <SelectContent>
        {clinic.map((clinic, index)=>(
                  <SelectGroup key={index}>
                  <SelectLabel>{clinic.name}</SelectLabel>
                  {clinic.specialization.map((specialization, specindex)=>(
                  <SelectItem key={specindex} value={specialization}>{specialization}</SelectItem>
                    ))}
                </SelectGroup>
        ))}
      </SelectContent>
    </Select>
  )
}
