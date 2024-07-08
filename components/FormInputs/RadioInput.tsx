import {cn} from "@/lib/utils";
import { RegisterInputProps } from "@/types/types";
import React from "react";
type RadioInputProps = {
    className?: string;
    name: string;
    title: string;
    register: any;
    errors:any;
    radioOptions: RadioOption[];
  };
  export type RadioOption = {
    value: string;
    label: string
  };
  export default function RadioInput ({
    className = "col-span-full",
    name,
    title,
    register,
    errors,
    radioOptions,
  }: RegisterInputProps){
    return (
        <div className={cn("grid gap-2",className)}>
            <h3 className="font-normal text-gray-900 dark:text-white">{title}</h3>
            <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 
            rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                {radioOptions.map((item,i)=>{

                })}

            </ul>
        </div>
    )
  }