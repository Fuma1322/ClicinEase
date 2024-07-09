import { cn } from '@/lib/utils';
import React from 'react'
import { Label } from '../ui/label';
import Link from 'next/link';
import { Input } from '../ui/input';

type TextInputProps = {
    label: string;
    register:any;
    name: string;
    errors:any;
    page?: string;
    placeholder?: string;
    type?: string;
    className?: string;
    isRequired?: boolean;
};

export default function TextInput({
  label,
  register,
  name,
  errors,
  type="text",
  placeholder,
  page,
  className="col-span-full",
  isRequired = true,
}:TextInputProps) {
  return ( 
  <div className={cn("grid gap-2", className)}>
    {type === "password" && page === "login" ? (
      <div className="flex items-center">
         <Label htmlFor={`${name}`}>{label}</Label>
         <Link href="/forgot-password" className="ml-auto inline-block text-sm underline">
         Forgot your password
         </Link>
      </div>
    ):(
      <Label htmlFor={`${name}`}>{label}</Label>
    )}
     <Input
    {...register(`${name}`,{required: isRequired})}
      id={`${name}`}
      name={`${name}`}
      type={type}
      autoComplete="name"
      placeholder={placeholder ? placeholder : ""}
    />
    {errors[`${name}`] && (<span className="text-red-600 text-sm">{label} Is Required</span>

  )}
  </div>
  );
}
