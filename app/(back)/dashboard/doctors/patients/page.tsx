import { getAppointments, getDoctorAppointments } from '@/actions/appointments'
import Appointments from '@/components/Dashboard/Appointments/Appointments'
import DisplayPannel from '@/components/Dashboard/Clinic/DisplayPannel'
import ListPannel from '@/components/Dashboard/Clinic/ListPannel'
import NewButton from '@/components/Dashboard/Clinic/NewButton'
import PannelHeader from '@/components/Dashboard/Clinic/PannelHeader'
import NotAuthorised from '@/components/NotAuthorised'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import React from 'react'
import { PatientProps } from './layout'
import generateSlug from '@/utils/generateSlug'

export default async function page() {
  const session = await getServerSession(authOptions);
    const user = session?.user;
    if (user?.role !== "DOCTOR"){
      return 
        <NotAuthorised/>;
      
    }
    const slug = generateSlug(user?.name??"")
    const appointments = (await getDoctorAppointments(user.id)).data || [];
    appointments.forEach((app)=>{
      if (!uniquePatientsMap.has(app.patientId)){
        uniquePatientsMap.set(app.patientId,{
        patientId: app.patientId,
        name: `${app.firstName} ${app.lastName}`,
        email: app.email,
        phone: app.phone,
        location: app.location,
        gender: app.gender,
        dob: app.dob
        });
      }
    });
   const patients = Array.from(uniquePatientsMap.values()) as PatientProps[];

  return (
    <div>
         <div className="py-2 px-4 border-b border-gray-200 flex items-center justify-end">
                <div className="flex items-center gap-4">
                    <NewButton title='New Patient' href={`/doctor/${slug}`}/>
        </div> 
    </div>
          <DisplayPannel title="Patient" newAppointmentLink={`/doctor/${slug}`} count={patients.length}/>  
    </div>
  )
}
