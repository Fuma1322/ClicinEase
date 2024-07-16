import { getDoctorAppointments } from '@/actions/appointments';
import DisplayPannel from '@/components/Dashboard/Doctor/DisplayPannel';
import NewButton from '@/components/Dashboard/Doctor/NewButton';
import NotAuthorised from '@/components/NotAuthorised';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import React from 'react';

// Page component for displaying doctor's appointments
export default async function page() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  // Redirect to not authorized page if user is not a doctor
  if (user?.role !== "DOCTOR") {
    return <NotAuthorised />;
  }

  // Fetch doctor's appointments
  const appointments = (await getDoctorAppointments(user.id)).data || [];

  return (
    <div>
      <div className="py-2 px-4 border-b border-gray-200 flex items-center justify-end">
        <div className="flex items-center gap-4">
          <NewButton 
            title='New Appointment' 
            href="/dashboard/doctor/appointments/new"
          />
        </div> 
      </div>
      <DisplayPannel 
        title="Appointments" 
        newAppointmentLink="/dashboard/doctor/appointments/new" 
        count={appointments.length}
      />  
    </div>
  );
}
