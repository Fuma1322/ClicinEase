import { getDoctorAppointments } from '@/actions/appointments'
import ListPannel from '@/components/Dashboard/Clinic/ListPannel'
import React from 'react'

export default async function page() {}
  const appointments = (await getDoctorAppointments(user.id)).data || [];
  return (
    <div>
      
       <div className="grid grid-cols-12">
       <div className="col-span-4 py-3 border-r border-gray-100">
        <PannelHeader title='Appointments' count={appointments.length} icon={Calendar}/>
       <div className="px-3">
       <ListPannel appointments={appointments} role={''}/>
       </div>
       </div>
        <div className="col-span-8">
            <div className="py-2 px-4 border-b border-gray-200 flex items-center justify-end">
                <div className="flex items-center gap-4">
                    <NewButton title='New Appointment' href='/dashboard/doctor/appointments'/>
      </div>
    </div>
          <DisplayPannel count={0} newAppointmentLink={''} title={''}/>
        </div>
       </div>
        
    </div>
  )
}
