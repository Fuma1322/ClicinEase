"use client"

import { Link, Pencil, Trash } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import { SpecialityProps } from './SpecialityForm'
import { toast } from 'react-hot-toast'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export default function SpecialtyCard({
  specialty,
}:{
  speciality: Specialty; //Speciality here comes from prisma
}) {
  async function handleDelete(id:string) {
    await deleteSpeciality(id)
    toast.success("Speciality Deleted Successfully")
  }
  return (
    <div 
    className='border mb-2 border-gray-100 shadow-sm text-xs bg-slate-900 
    py-3 px-4 w-full rounded-md dark:text-slate-900 flex items-center gap-4 justify-between'
  >
    <div className="flex items-center gap-3">
    <h2>{specialty.title}</h2>
    </div>
    <div className="flex">
        <Link className='text-blue-600' href={`/dashboard/specialties/update/${specialty.slug}`}>
            <Pencil className='w-4 h-4'/>
        </Link>
        <AlertDialog>
        <AlertDialogTrigger asChild>
        <button className='text-red-600'>
            <Trash className='w- h-4'/>
        </button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-red-600" >Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              Speciality
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={()=>handleDelete(speciality.id)}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  </div>
  )
}
