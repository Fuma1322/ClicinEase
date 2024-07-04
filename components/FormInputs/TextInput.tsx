import { Input } from '@components/ui/input';
import { Label } from '@components/ui/label';
import Link from 'next/link';
import React from 'react'

type TextInputProps={
    label: string;
    register:any;
    name: string;
    errors: any;
    type?: string;
    placeholder: string; 
}

export default function TextInput({
  label, 
  register, 
  name, 
  errors, 
  type="text",
  placeholder 
}:TextInputProps) {
  
  return (
    <div className="grid gap-2">
                
                {type==="password"?(<div className="flex items-center">
                <Label htmlFor={name}>{label}</Label>
                <Link
                  href="/forgot-password"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link>
              </div>):(<Label htmlFor={name}>{label}</Label>)}
                
                <Input
                {...register(name, { required: '${label} is required'})}
                id={name}
                name={name}
                type={type}
                autoComplete="name"
                placeholder={placeholder}
                required
              />
              {errors[name]&& <span className="text-red-600 text-sm">{label} is required</span>}
              </div>
  )
}
