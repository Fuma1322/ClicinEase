import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import { ServiceProps } from '@/types/types'

export default function ServiceCard({service}:{service:ServiceProps}) {
  return (
    <Link 
    href={`/services/${service.slug}`} 
    className='rounded-md bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 duration-300 flex gap-4 overflow-hidden '>
        <Image 
        src={service.imageUrl} 
        width={275} 
        height={183} 
        alt={service.title} 
        className="w-14 h-14 object-cover aspect-video" />
        <div className="flex flex-col w-2/3 py-4">
            <h2> {service.title} </h2>
            <p className='text-[0.6rem]'>936 Doctors Available</p>
        </div>
    </Link>
  )
}
