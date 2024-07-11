import { getAppointmentById } from '@/actions/appointments'
import UpdatedAppointmentForm from '@/components/Dashboard/Doctor/UpdatedApointmentForm';
import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';
import Link from 'next/link';
import React from 'react'

export default async function page({params:{id}}:{params:{id:string}}) {
  const appointment = await getAppointmentById(id);
  return (
  <div className="">
    <div className="flex items-center justify-between px-4 py-4 border-b">
    <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        {`${appointment?.firstName} ${appointment?.lastName}`}
        </h2>
        <div className="flex space-x-2 divide-x-2 divide-gray-200 text-sm">
          <p className="capitalize px-2">{appointment?.gender}</p>
          <p className="px-2">{appointment?.phone}</p>
        </div>
        <div className="">
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        {appointment?.appointmentFormattedDate}</h2>
        <div className="flex items-center text-sm">
          <Calendar  className="w-4 h-4 mr-2"/> 
          <span>{appointment?.appointmentTime}</span>
        </div>
    </div>
    </div>
    <div className="py-4">
      <div className="flex divide-x-2 px-4 py-3 divide-gray-200">
        <p className="px-3 text-sm font-semibold ">Reason</p>
        <p className="px-3">{appointment?.appointmentReason}</p>
      </div>
      <div className="flex divide-x-2 px-4 py-3 divide-gray-200">
        <p className="px-3 text-sm font-semibold ">Date of Birth</p>
        <p className="px-3">{appointment?.dob?.toISOString().split("T")[0]}</p>
      </div>
      <div className="flex divide-x-2 px-4 py-3 divide-gray-200 border-b">
        <p className="px-3 text-sm font-semibold ">Email</p>
        <p className="px-3">{appointment?.email}</p>
      </div>
      <div className="flex divide-x-2 px-4 py-3 divide-gray-200 border-b">
        <p className="px-3 text-sm font-semibold ">Location</p>
        <p className="px-3">{appointment?.location}</p>
      </div>
      <div className="flex divide-x-2 px-4 py-3 divide-gray-200 border-b">
        <p className="px-3 text-sm font-semibold ">Medical Documents</p>
        <div className="grid grid-cols-4 px-3">
          {appointment?.medicalDocuments.map((item,i)=>{
            return (
              <Button key={i} variant={"outline"}asChild>
                  <Link target="_blank" href={item} download>
                  {`Doc-${i+1}`}
                  </Link>
              </Button>
            )
          })}
          
        </div>
      </div>
      {/* <div className="">
      <div className="border shadow rounded-md p-4 mt-4">
            <div className="sm:col-spin-4">
                <div className="flex items-center justify-between border-b">
                    <h2 className="scroll-m-20 text-xl font-semibold tracking-tight py-2 mb-3">
                        Update Hour Price
                    </h2>
                    <Button disabled={} onClick={}>
                        {savingPrice ? "Saving please wait..." : "Update Price"}
                    </Button>
                </div>
                <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                        <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">
                            M
                        </span>
                        <input 
                        type="number" 
                        name="price" 
                        id="price" 
                        value={price} 
                        onChange={(e) => setPrice(+e.target.value)}
                        autoComplete="price" 
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 
                        focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="100"
                        />
                    </div>
                </div>
            </div>
        </div>
      </div> */}
      <div className="">
      {appointment && appointment.id && <UpdatedAppointmentForm appointment={appointment}/>}
      </div>
    </div>
  </div>
  ); 
}