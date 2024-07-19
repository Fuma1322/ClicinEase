import { Doctor, DoctorProfileAvailability } from '@/types/types';
import { getDayName } from '@/utils/getDayName';
import { getFormattedDate } from '@/utils/getFormattedShortDate';
import { Stethoscope, Video } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function DoctorCard({
  isInPerson = false,
  doctor, 
}:{
    isInPerson?: boolean;
    doctor: Doctor;
  }) {

    const today: keyof DoctorProfileAvailability = getDayName();
    const times = doctor.doctorProfile?.availability?.[today] ?? null;
    const formattedDate = getFormattedDate();
    console.log(times);

    // console.log("DoctorCard received doctor:", doctor);
    // console.log("Times for today:", times);

  return (
   <div className='border border-gray-200 bg-white inline-flex flex-col py-8 px-6 rounded-md hover:border-gray-400 duration-300 transition-all'>
     <Link href={`/doctors/${doctor.slug}`}>
       <h2 className='uppercase font-bold text-2xl tracking-widest'>
        {doctor.name}
       </h2>
       {isInPerson && (<p className='py-3'>{doctor.email}</p>)}
       <div className="flex items-center gap-4 py-4">
         <div className="relative">
           <Image 
             src={doctor.doctorProfile?.profilePicture ?? "/steph.jpg"}
             width={243} 
             height={243} 
             alt={doctor.name} 
             className="w-24 h-24 rounded-full object-cover"
           />
           {!isInPerson && (
             <p className='absolute bottom-0 right-2 bg-blue-200 w-10 h-10 flex items-center justify-center rounded-full text-blue-700'>
               <Video className='w-6 h-6' />
             </p>
           )}
         </div>
         <div className="flex flex-col gap-2">
           <p className='flex items-center'>
             <Stethoscope className='w-4 h-4 mr-2 flex-shrink-0 text-red-600'/>
             <span>Family Medicine</span>
           </p>
           {times && times.length > 0 ? (
             <p className="bg-green-200 py-3 px-6 rounded-lg uppercase">
               Available today
             </p>
           ) : (
             <p className="bg-red-200 rounded-lg
              py-3 px-6 uppercase">
               Not available today
             </p>
           )}
         </div>
       </div>
     </Link>
     {times && times.length > 0 ? (
       <div className="pt-6 border-t border-gray-400 dark:border-gray-600">
         <h3 className='flex gap-4 justify-between items-center'>
           <span className='text-gray-600 dark:text-gray-400'>
            {formattedDate}
            </span>{" "}
           <span className='fond-bold'>
            M{doctor.doctorProfile?.hourlyWage}
            </span>
         </h3>
         <div className="py-3 grid grid-cols-3 gap-2">
           {times.slice(0,5).map((item,i) => (
             <Link 
             className='bg-blue-600 text-sm text-white p-2 text-center rounded-lg' 
             key={i} 
             href={`/doctors/${doctor.slug}`}>
               {item}
             </Link>
           ))}
           <Link 
           className='text-[0.7rem] text-center bg-blue-900 text-white py-2 px-3 truncate rounded-lg' 
           href={`/doctors/${doctor.slug}`}>
            More times
           </Link>
         </div>
       </div>
     ) : (
       <div className="pt-6 border-t border-gray-400 dark:border-gray-600">
         <p className='text-gray-600 dark:text-gray-400'>No available times for today</p>
       </div>
     )}
   </div>
  )
}
