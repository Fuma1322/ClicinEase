import { getAppointments, getPatientAppointments } from '@/actions/appointments'
import Appointments from '@/components/Dashboard/Appointments/Appointments'
import DisplayPannel from '@/components/Dashboard/Clinic/DisplayPannel'
import ListPannel from '@/components/Dashboard/Clinic/ListPannel'
import NewButton from '@/components/Dashboard/Clinic/NewButton'
import PannelHeader from '@/components/Dashboard/Clinic/PannelHeader'
import NotAuthorised from '@/components/NotAuthorised'
import { authOptions } from '@/lib/auth'
import { count } from 'console'
import { Calendar } from 'lucide-react'
import { getServerSession } from 'next-auth'
import React from 'react'

export default async function page() {
  const session = await getServerSession(authOptions);
  const user = session?.user
  if (user?.role !=="USER"){
    return (
      <NotAuthorised/>
    )
  }
  const appointments = (await getPatientAppointments(user.id)).data || [];
  return (
    <div>
         <div className="py-2 px-4 border-b border-gray-200 flex items-center justify-end">
                <div className="flex items-center gap-4">
                    <NewButton title='New Apointment' href='#'/>
        </div> 
    </div>
          <DisplayPannel count={appointments.length}/>  
    </div>
  );
}
