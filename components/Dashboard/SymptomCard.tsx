"use client"

import { Pencil, Trash } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import toast from 'react-hot-toast';
import { Symptom } from "@prisma/client";
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

// Action function for deleting symptoms
import { deleteSymptom } from '@/actions/symptom';

// SymptomCard component definition
export default function SymptomCard({
    symptom
}: {
    symptom: Symptom
}) {
  // Async function to handle symptom deletion
  async function handleDelete(id: string) {
    await deleteSymptom(id); // Call deleteSymptom action
    toast.success("Symptom Deleted Successfully"); // Show success toast
  }

  return (
    <div 
      className='border mb-2 border-gray-100 shadow-sm text-xs bg-slate-900 
      py-3 px-4 w-full rounded-md dark:text-slate-900 flex items-center gap-4 justify-between'
    >
      <h2 className='text-white font-bold text-2xl'>{symptom.title}</h2>
      <div className="flex">
        {/* Link to update symptom */}
        <Link className='text-blue-600' href={`/dashboard/symptoms/update/${symptom.slug}`}>
          <Pencil className='w-4 h-4'/>
        </Link>
        {/* AlertDialog for delete confirmation */}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <button className='text-red-600'>
              <Trash className='w- h-4'/>
            </button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className='text-red-600'>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                symptom.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => handleDelete(symptom.id)}>Delete</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
