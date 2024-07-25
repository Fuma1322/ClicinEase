import { DataProps, getDoctorsByServiceSlug } from '@/actions/doctors';
import { getServices } from '@/actions/services';
import { getDoctors } from '@/actions/users';
import DoctorCard from '@/components/DoctorCard';
import { Doctor } from '@/types/types';
import Link from 'next/link';
import React from 'react'

export default async function page({
    params:{slug},
    searchParams,
}: {
    params: {slug: string};
    searchParams: {[key: string]: string | string[]| undefined}
}) {
    const {mode} = searchParams;
    const allDoctors = (await getDoctors()) || []; // Fetching list of doctors asynchronously
    const doctors = allDoctors.filter(
      (doctor) => doctor.doctorProfile?.operationMode === mode // Filtering doctors by mode
    );
    const services = await (await getServices()).data || [];
  return (
    <div className='container p-8'>
        <h1 className='scroll-m-20 pb-6 text-3xl capitalize font-extrabold tracking-tight lg:text-4xl'>
            {mode} ({doctors.length.toString().padStart(2, "0")})
        </h1>
        <div className='max-w-5xl mx-auto grid grid-cols-12 gap-6 lg:gap-10'>
            <div className='col-span-3 border border-gray-200/50 rounded-sm p-6'>
            <h2 className='capitilize font-semibold'>Other Services</h2>
            {
                    services && services.length > 0 && (
                        <div className="py-3 flex flex-col text-sm space-y-2">
                         {services.map((service,i)=>{
                            return (
                                <Link key={i} 
                                href={`/service/${service.slug}`} 
                                className="hover:text-blue-600">
                                {service.title}
                                </Link>
                            )
                         })}
                        </div>
                    )}
            </div>
            <div className='col-span-9'>
            {
                doctors && doctors.length > 0 ? (
                <div className="grid grid-cols-2 gap-6">
                    {
                        doctors.map((doctor:Doctor)=>{
                            return (
                                <DoctorCard key={doctor.id} doctor={doctor}/>
                            )
                        })
                    }
                </div>
                ):(
                    <div className="">
                        <h2>No Doctors for this Category</h2>
                    </div>
                )
            }
        </div>
        </div>
    </div>
  );
}
