import React from 'react';
import { cn } from '@/lib/utils';
import { Label } from '@components/ui/label';
import { Select } from '@components/ui/select'; // Assuming you have a Select component in your UI library

interface SelectInputProps {
    label: string;
    name: string;
    options: { value: string; label: string }[];
    register: any; // Adjust type if necessary
    errors: any;
    className?: string;
    defaultOptionText?: string; // Added prop for the default option text
}

export default function SelectInput({
  label,
  name,
  options,
  register,
  errors,
  className = "col-span-2",
  defaultOptionText = "Select an option" // Default value
}: SelectInputProps) {
  return (
    <div className={cn("grid gap-2", className)}>
      <Label htmlFor={name}>{label}</Label>
      <Select
        {...register(name, { required: `${label} is required` })}
        id={name}
        name={name}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
      >
        <option value="">{defaultOptionText}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
      {errors[name] && (
        <span className="text-red-600 text-sm">{label} is required</span>
      )}
    </div>
  );
}
