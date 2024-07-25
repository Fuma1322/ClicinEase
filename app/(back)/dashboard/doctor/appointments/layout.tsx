import { getDoctorAppointments } from '@/actions/appointments';
import ListPannel from '@/components/Dashboard/Doctor/ListPannel';
import PannelHeader from '@/components/Dashboard/Doctor/PannelHeader';
import NotAuthorised from '@/components/NotAuthorised';
import { authOptions } from '@/lib/auth';
import { Calendar } from 'lucide-react';
import { getServerSession } from 'next-auth';
import React, { ReactNode } from 'react';

// Layout component for doctor's appointment management
export default async function AppointmentLayout({ children }: { children: ReactNode; }) {
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
      <div className="grid grid-cols-1 lg:grid-cols-12">
        <div className="col-span-1 lg:col-span-4 py-3 lg:border-r border-gray-100">
          <PannelHeader
            title="Appointments"
            count={(appointments.length).toString().padStart(2, "0")}
            icon={Calendar}
          />
          <div className="px-3">
            <ListPannel appointments={appointments} role={user?.role} />
          </div>
        </div>
        <div className="col-span-1 lg:col-span-8">
          {children}
        </div>
      </div>
    </div>
  );
}
