"use client"

import { deleteSpeciality } from '@/actions/specialities';
import { Pencil, Trash } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import toast from 'react-hot-toast';
import { Speciality } from "@prisma/client";
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
} from "@/components/ui/alert-dialog";

export default function SpecialityCard({ speciality }: { speciality: Speciality }) {

  // Function to handle deletion of speciality
  async function handleDelete(id: string) {
    await deleteSpeciality(id); // Call deleteSpeciality action
    toast.success("Speciality Deleted Successfully"); // Show success toast
  }

  return (
    <div 
      className='border mb-2 border-gray-100 shadow-sm text-xs bg-slate-900 
      py-3 px-4 w-full rounded-md dark:text-slate-900 flex items-center gap-4 justify-between'
    >
      {/* Display speciality title */}
      <h2 className='text-white font-bold text-2xl'>{speciality.title}</h2>

      {/* Edit and delete buttons */}
      <div className="flex">
        {/* Link to update speciality */}
        <Link className='text-blue-600' href={`/dashboard/speciality/update/${speciality.slug}`}>
          <Pencil className='w-4 h-4'/>
        </Link>

        {/* AlertDialog for delete confirmation */}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <button className='text-red-600'>
              <Trash className='w- h-4'/>
            </button>
          </AlertDialogTrigger>

          {/* AlertDialogContent for confirmation dialog */}
          <AlertDialogContent>
            <AlertDialogHeader>
              {/* Title of confirmation dialog */}
              <AlertDialogTitle className='text-red-600'>Are you absolutely sure?</AlertDialogTitle>
              
              {/* Description of deletion action */}
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your speciality.
              </AlertDialogDescription>
            </AlertDialogHeader>

            {/* AlertDialogFooter with cancel and delete actions */}
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => handleDelete(speciality.id)}>Delete</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
