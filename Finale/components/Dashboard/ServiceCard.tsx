import { ServiceProps } from '@/types/types'
import { Briefcase, Dot, Link, Pencil, Trash } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

export default function ServiceCard({service}:{service:ServiceProps}) {
  return (
    <div 
    className='border mb-2 border-gray-100 shadow-sm text-xs bg-slate-900 
    py-3 px-2 w-full rounded-md dark:text-slate-900 flex items-center gap-2'
  >
    {/* <Image src={service.imageUrl} alt={service.title} width={512} height={512} className='w-14 h-auto'/> */}
    <h2>{service.title}</h2>
    <div className="flex">
        <Link className='text-blue-600' href={`/dashboard/services/update/${service.slug}`}>
            <Pencil className='w-4 h-4'/>
        </Link>
        <button className='text-red-600'>
            <Trash className='w- h-4'/>
        </button>
    </div>
  </div>
  )
}
