import { getDoctorAppointments } from '@/actions/appointments';
import PannelHeader from '@/components/Dashboard/Doctor/PannelHeader';
import PatientPanel from '@/components/Dashboard/Doctor/PatientPannel';
import NotAuthorised from '@/components/NotAuthorised';
import { authOptions } from '@/lib/auth';
import { Calendar, Users } from 'lucide-react';
import { getServerSession } from 'next-auth';
import React, { ReactNode } from 'react'

export interface PatientProps{
  patientId: string;
  name: string
  email:string;
  phone:string;
  location:string;
  gender: string;
  occupation: string;
  dob: string;
}
export default async function PatientLayout({children}:{children: ReactNode;}) {
    const session = await getServerSession(authOptions);
    const user = session?.user
    if (user?.role !=="DOCTOR"){
      return (
        <NotAuthorised/>
      )
    }
    const uniquePatientsMap = new Map();
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
   console.log(patients)
    return (
    <div>
      
    <div className="grid grid-cols-12">
    <div className="col-span-4 py-3 border-r border-gray-100">
     <PannelHeader title='Patients' count={(patients.length).toString().padStart(2, "0")} icon={Users}/>
    <div className="px-3">
    <PatientPanel patients={patients} role={user?.role}/>
    </div>
    </div>
     <div className="col-span-8"> 
         {children}
     </div>
    </div>
     
 </div>
  );
}