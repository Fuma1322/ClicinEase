import React from 'react'
import Image from 'next/image'
import ClinicDetails from '@/components/ClinicDetails'
import {getClinicByslug} from "@/actions/users"

export default function page({
  params: { slug },
}:{
  params: {slug:string};
}) {
  const clinic = (await getClinicByslug(slug)) || null;
  return (
    <>
    {clinic && clinic.id ? (
        <div className='bg-slate-50 min-h-screen '>
        <div className="bg-white max-w-4xl border border-gray-200 mx-auto shadow-md rounded-md ">
          <div className="py-8 px-6">
            <div className="flex items-center justify-between">
              <div className="">
              <div className="flex flex-col">
            <h2 className='uppercase font-bold text-2xl tracking-widest'>{clinic.name}</h2>
            <p className='text-gray-500 text-xs uppercase '>Adult Health</p>
            </div>
            <div className="py-3">
            <p>{clinic.clinicProfile?.opertionMode}</p>
            <p>{clinic.clinicProfile?.state},{" "}
                {clinic.clinicProfile?.city},{" "}
                {clinic.clinicProfile?.country}
            </p>
            </div>
              </div>
              <Image 
            src={clinic.clinicProfile?.clinicPicture ?? "/hero1.jpeg"} 
            width={1024} 
            height={1024}  
            alt='Clinic' 
            className='w-36 h-36 rounded-full object-cover' 
            />
            </div>

          </div>
          <div className="">
          <ClinicDetails clinic={clinic}/>
          </div>
        </div>
    </div>
    ):(
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0"></h2>
      </div>
  )
    </>
}

