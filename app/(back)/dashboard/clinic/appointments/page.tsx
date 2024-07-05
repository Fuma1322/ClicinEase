import { getAppointments } from '@/actions/appointments'
import Appointments from '@/components/Dashboard/Appointments/Appointments'
import DisplayPannel from '@/components/Dashboard/Clinic/DisplayPannel'
import ListPannel from '@/components/Dashboard/Clinic/ListPannel'
import NewButton from '@/components/Dashboard/Clinic/NewButton'
import PannelHeader from '@/components/Dashboard/Clinic/PannelHeader'
import { count } from 'console'
import { Calendar } from 'lucide-react'
import React from 'react'

export default async function page() {
  const appointments = (await getAppointments()).data || [];
  return (
    <div>
         <div className="py-2 px-4 border-b border-gray-200 flex items-center justify-end">
                <div className="flex items-center gap-4">
                    <NewButton title='New Apointment' href='#'/>
        </div> 
    </div>
          <DisplayPannel count={appointments.length}/>  
    </div>
  )
}
