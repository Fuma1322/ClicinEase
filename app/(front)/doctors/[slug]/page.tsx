import React from 'react';
import Image from 'next/image'; // Importing Image component from Next.js
import { getDoctorBySlug } from "@/actions/users"; // Importing getDoctorBySlug function from user actions
import { getServerSession } from 'next-auth'; // Importing getServerSession function from NextAuth
import { authOptions } from '@/lib/auth'; // Importing authOptions from auth library
import { getAppointmentsByPatientId } from '@/actions/appointments'; // Importing getAppointmentsByPatientId function from appointments actions
import DoctorDetails from '@/components/DoctorDetails'; // Importing DoctorDetails component
import FixedBookButton from '@/components/FixedBookButton'; // Importing FixedBookButton component
import { Appointment } from '@prisma/client'; // Importing Appointment type from Prisma client
import { DoctorDetail } from '@/types/types'; // Importing Doctor and DoctorDetail types

export default async function page({
  params: { slug }, // Destructuring params to get the slug
}: {
  params: { slug: string }; // Type definition for params containing a string slug
}) {
  const session = await getServerSession(authOptions); // Fetching session data using getServerSession
  const doctor = (await getDoctorBySlug(slug)) || null; // Fetching doctor data based on slug or null if not found
  const user = session?.user; // Extracting user data from session
  const appointment = await getAppointmentsByPatientId(user?.id ?? ""); // Fetching appointments based on patient id

  return (
    <>
      {doctor && doctor.id ? (
        <div className='bg-slate-50 min-h-screen '>
          <div className="bg-white max-w-4xl border border-gray-200 mx-auto shadow-md rounded-md ">
            <div className="py-8 px-6">
              <div className="flex items-center justify-between">
                <div className="">
                  <div className="flex flex-col">
                    <h2 className='uppercase font-bold text-2xl tracking-widest'>{doctor.name}</h2>
                    <p className='text-gray-500 text-xs uppercase '>Adult Health</p>
                  </div>
                  <div className="py-3">
                    <p>{doctor.doctorProfile?.operationMode}</p>
                    <p>{doctor.doctorProfile?.state},{" "}
                      {doctor.doctorProfile?.city},{" "}
                      {doctor.doctorProfile?.country}
                    </p>
                  </div>
                </div>
                <Image 
                  src={doctor.doctorProfile?.profilePicture ?? "/doc-profile.jpeg"} 
                  width={243} 
                  height={207}  
                  alt="Doctor"
                  className='w-36 h-36 rounded-full object-cover' 
                />
              </div>
            </div>
            <div className="">
              <DoctorDetails appointment={appointment as Appointment | null} doctor={doctor as DoctorDetail}/>
            </div>
          </div> 
          <FixedBookButton price={doctor.doctorProfile?.hourlyWage}/>
        </div>
      ) : (
        <div className="min-h-screen flex items-center justify-center">
          <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            No Doctor Details Found
          </h2>
        </div>
      )}
    </>
  );
}
