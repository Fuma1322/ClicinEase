import * as React from "react"
import { MultiSelect } from "react-multi-select-component"


type SelectInputProps = {
  label: string;
  optionTitle: string;
  errors: any; 
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

 export function CustomMultiSelect({
    label,
    optionTitle,
    errors,
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
      <MultiSelect
        options={options}
        value={selectedOption}
        onChange={setSelectedOption}
        labelledBy={optionTitle}
      />
      </div>
    </div>
  )
}
