"use client"

import { deleteService } from '@/actions/services'
import { Link, Pencil, Trash } from 'lucide-react'
import React from 'react'
import toast from 'react-hot-toast'
import Image from 'next/image'
import { Service } from "@prisma/client"
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

export default function ServiceCard({
  service
}:{
  service:Service
}) {
  async function handleDelete( id : string) {
    await deleteService (id)
    toast.success("Service Deleted Successfully")
  }
  return (
    <div 
    className='border mb-2 border-gray-100 shadow-sm text-xs bg-slate-900 
    py-3 px-4 justify-between w-full rounded-md dark:text-slate-900 flex items-center gap-2'
  >
    <div className="flex items-center gap-3">
    <Image 
    src={service.imageUrl} 
    alt={service.title} 
    width={512} 
    height={512} 
    className='w-14 h-auto'
    />
    <h2 className='text-white font-bold text-2xl'>{service.title}</h2>
    </div>
    <div className="flex">
        <Link className='text-blue-600' href={`/dashboard/services/update/${service.slug}`}>
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
              <AlertDialogTitle className='text-red-600'>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                service
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
  )
}