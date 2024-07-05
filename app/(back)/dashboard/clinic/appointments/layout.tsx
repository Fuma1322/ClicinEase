import { getAppointments,getDoctorAppointments } from '@/actions/appointments';
import DisplayPannel from '@/components/Dashboard/Clinic/DisplayPannel';
import ListPannel from '@/components/Dashboard/Clinic/ListPannel';
import NewButton from '@/components/Dashboard/Clinic/NewButton';
import PannelHeader from '@/components/Dashboard/Clinic/PannelHeader';
import NotAuthorised from '@/components/NotAuthorised';
import { authOptions } from '@/lib/auth';
import { Calendar } from 'lucide-react';
import { getServerSession } from 'next-auth';
import React, { ReactNode } from 'react'

export default async function AppointmentLayout({children}:{children: ReactNode;}) {
    const session = await getServerSession(authOptions);
    const user = session?.user
    if (user?.role !=="DOCTOR"){
      return (
        <NotAuthorised/>
      )
    }
    const appointments = (await getDoctorAppointments(user.id)).data || [];
    return (
    <div>
      
    <div className="grid grid-cols-12">
    <div className="col-span-4 py-3 border-r border-gray-100">
     <PannelHeader title='Appointments' count={appointments.length??0} icon={Calendar}/>
    <div className="px-3">
    <ListPannel appointments={appointments} role={user?.role}/>
    </div>
    </div>
     <div className="col-span-8"> 
         {children}
     </div>
    </div>
     
 </div>
  );
}
