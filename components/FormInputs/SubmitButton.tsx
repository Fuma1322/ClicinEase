import { Button } from '@components/ui/moving-border';
import { Loader, Loader2 } from 'lucide-react';
import React from 'react'

type SubmitButtonProps={
    title: string;
    buttontype?: "submit" | "reset" | "button" | undefined
    isLoading: boolean;
    loadingTitle: string
}

export default function SubmitButton({title, buttontype="submit", isLoading=false, loadingTitle}:SubmitButtonProps) {
  return (
    <>
    {isLoading ?(
        <button
        type={buttontype}
        disabled
        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 
        text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 
        focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 
        focus-visible:outline-indigo-600 items-center"
      >
       <Loader2 className="w-4 h-4 mr-2 flex-shrink-0 animate-spin" /> {loadingTitle}
    </button>
    ):(
      <Button type={buttontype} className="w-full" >
        {title}
      </Button>
    )}
    </>
  )
}
