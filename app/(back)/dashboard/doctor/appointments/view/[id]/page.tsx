import { getAppointmentById } from '@/actions/appointments';
import UpdatedAppointmentForm from '@/components/Dashboard/Doctor/UpdatedApointmentForm';
import { Button } from '@/components/ui/button';
import { Calendar, Clock } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

// Component for displaying detailed appointment information
export default async function page({ params: { id } }: { params: { id: string } }) {
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
            {appointment?.appointmentFormattedDate}
          </h2>
          <div className="flex items-center text-sm">
            <Clock className="w-4 h-4 mr-2" />
            <span>{appointment?.appointmentTime}</span>
          </div>
        </div>
      </div>
      <div className="py-4">
        <div className="flex divide-x-2 px-4 py-3 divide-gray-200">
          <p className="px-3 text-sm font-semibold">Reason</p>
          <p className="px-3">{appointment?.appointmentReason}</p>
        </div>
        <div className="flex divide-x-2 px-4 py-3 divide-gray-200">
          <p className="px-3 text-sm font-semibold">Date of Birth</p>
          <p className="px-3">{appointment?.dob?.toISOString().split("T")[0]}</p>
        </div>
        <div className="flex divide-x-2 px-4 py-3 divide-gray-200 border-b">
          <p className="px-3 text-sm font-semibold">Email</p>
          <p className="px-3">{appointment?.email}</p>
        </div>
        <div className="flex divide-x-2 px-4 py-3 divide-gray-200 border-b">
          <p className="px-3 text-sm font-semibold">Location</p>
          <p className="px-3">{appointment?.location}</p>
        </div>
        <div className="flex divide-x-2 px-4 py-3 divide-gray-200 border-b">
          <p className="px-3 text-sm font-semibold">Medical Documents</p>
          <div className="grid grid-cols-4 px-3">
            {appointment?.medicalDocuments.map((item, i) => (
              <Button key={i} variant={"outline"} asChild>
                <Link target="_blank" href={item} download>
                  {`Doc-${i + 1}`}
                </Link>
              </Button>
            ))}
          </div>
        </div>
        <div className="">
          {appointment && appointment.id && <UpdatedAppointmentForm appointment={appointment} />}
        </div>
      </div>
    </div>
  );
}
