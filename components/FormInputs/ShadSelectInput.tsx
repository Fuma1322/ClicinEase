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

type SelectInputProps = {
  label: string;
  optionTitle: string;
  //errors: any; 
  placeholder?: string;
  className?: string;
  options: SelectOption[];
  selectedOption: any;
  setSelectedOption: any;
};
export type SelectOption = {
    value: string;
    label: string;
  };

 export default function ShadSelectInput({
    label,
    optionTitle,
    //errors,
    placeholder,
    className = "sm:col-span-2",
    options = [],
    selectedOption,
    setSelectedOption,
  }: SelectInputProps) {
  return (
    <div className={className}>
      <label
        htmlFor={label}
        className="block text-sm font-medium leading-6 text-gray-900 dark:text-slate-50 "
        >
        {label}
      </label> 
      <div className="mt-2">
      <Select onValueChange={(value) => setSelectedOption(value)}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={`Select ${optionTitle}`} />
      </SelectTrigger>
      <SelectContent>
            <SelectGroup>
            <SelectLabel>{optionTitle}</SelectLabel>
            {options.map((option) => {
                return (
                <SelectItem key={option.value} value={option.value}>
                    {option.label}
                </SelectItem>
                );
            })}
            </SelectGroup>
      </SelectContent>
    </Select>
      </div>
    </div>
  )
}
