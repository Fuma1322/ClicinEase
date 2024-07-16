"use client"

import { deleteService } from '@/actions/services'; // Import deleteService action
import { Link, Pencil, PencilIcon, Trash } from 'lucide-react'; // Icons from Lucide React
import React from 'react'; // React library
import toast from 'react-hot-toast'; // Toast notifications library
import Image from 'next/image'; // Next.js Image component
import { Service } from "@prisma/client"; // Service type from Prisma client
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
} from "@/components/ui/alert-dialog"; // Components for AlertDialog from custom UI

export default function ServiceCard({
  service
}:{
  service:Service
}) {
  // Function to handle service deletion
  async function handleDelete( id : string) {
    await deleteService (id); // Call deleteService API action
    toast.success("Service Deleted Successfully"); // Display success toast
  }

  return (
    <div 
      className='border mb-2 border-gray-100 shadow-sm text-xs bg-slate-900 
      py-3 px-4 justify-between w-full rounded-md dark:text-slate-900 flex items-center gap-2'
    >
      <div className="flex items-center gap-3">
        {/* Display service image */}
        <Image 
          src={service.imageUrl} 
          alt={service.title} 
          width={512} 
          height={512} 
          className='w-14 h-auto'
        />
        {/* Display service title */}
        <h2 className='text-white font-bold text-2xl'>{service.title}</h2>
      </div>
      <div className="flex">
        {/* Link to update service */}
        <Link className='text-blue-600' href={`/dashboard/services/update/${service.slug}`}>
          <PencilIcon className='w-4 h-4'/>
        </Link>
        {/* AlertDialog component for confirming service deletion */}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <button className='text-red-600'>
              <Trash className='w- h-4'/>
            </button>
          </AlertDialogTrigger>
          {/* AlertDialogContent with deletion confirmation */}
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className='text-red-600'>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                service.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={()=> handleDelete(service.id)}>Delete</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
