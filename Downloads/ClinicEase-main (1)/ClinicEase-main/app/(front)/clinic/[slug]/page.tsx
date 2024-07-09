import React from 'react'
import Image from 'next/image'
import ClinicDetails from '@/components/ClinicDetails'

export default function page() {
  return (
    <div className='bg-slate-50 min-h-screen '>
        <div className="bg-white max-w-4xl border border-gray-200 mx-auto shadow-md rounded-md ">
          <div className="py-8 px-6">
            <div className="flex items-center justify-between">
              <div className="">
              <div className="flex flex-col">
            <h2 className='uppercase font-bold text-2xl tracking-widest'>Vijal Patel, PA-C</h2>
            <p className='text-gray-500 text-xs uppercase '>Adult Health</p>
            </div>
            <div className="py-3">
            <p>In-person doctor visit</p>
            <p>3250 Lincoln Highway, Kendall Park, NJ 08824</p>
            </div>
              </div>
              <Image 
            src="/herp.jpeg" 
            width={1024} 
            height={1024} 
            alt='Clinic' 
            className='w-36 h-36 rounded-full object-cover' 
            />
            </div>

          </div>
          <div className="">
          <ClinicDetails/>
          </div>
        </div>
    </div>
  )
}

