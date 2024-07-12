import { deleteService } from '@/actions/services'
import { ServiceProps } from '@/types/types'
import { Service } from '@prisma/client'
import { Link, Pencil, Trash } from 'lucide-react'
import React from 'react'
import toast from 'react-hot-toast'
import Image from 'next/image'
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
import { Button } from "@/components/ui/button"

async function handleDelete( id : string) {
  await deleteService (id)
  toast.success("Service Deleted Successfully")
}
export default function ServiceCard({service}:{service:Service}) {

  return (
    <div 
    className='border mb-2 border-gray-100 shadow-sm text-xs 
    py-3 px-2 w-full rounded-md bg-white dark:text-slate-900 flex items-center gap-4 justify-between'
  >
    <div className="flex items-center gap-3">
    <Image 
    src={service.imageUrl} 
    alt={service.title} 
    width={512} 
    height={512} 
    className='w-14 h-auto'
    />
    <h2>{service.title}</h2>
    </div>
    <div className="flex">
        <Link className='text-blue-600' href={`/dashboard/services/update/${service.slug}`}>
            <Pencil className='w-4 h-4'/>
        </Link>
        <button className='text-red-600'>
            <Trash className='w- h-4'/>
        </button>
    </div>
  </div>
  );
}
