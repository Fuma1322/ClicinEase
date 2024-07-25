import { getDoctorAppointments } from '@/actions/appointments';
import PannelHeader from '@/components/Dashboard/Doctor/PannelHeader';
import PatientPanel from '@/components/Dashboard/Doctor/PatientPannel';
import NotAuthorised from '@/components/NotAuthorised';
import { authOptions } from '@/lib/auth';
import { Calendar, Users } from 'lucide-react';
import { getServerSession } from 'next-auth';
import React, { ReactNode } from 'react';

// Define the interface for patient props
export interface PatientProps {
  patientId: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  gender: string;
  occupation: string;
  dob: string;
}

// PatientLayout component
export default async function PatientLayout({ children }: { children: ReactNode; }) {
  // Fetch session data from server
  const session = await getServerSession(authOptions);
  const user = session?.user;

  // Check if user is authorized as a doctor, otherwise show NotAuthorised component
  if (user?.role !== "DOCTOR") {
    return <NotAuthorised />;
  }

  // Initialize a map to store unique patients
  const uniquePatientsMap = new Map();
  
  // Fetch doctor's appointments
  const appointments = (await getDoctorAppointments(user.id)).data || [];

  // Iterate through appointments to populate uniquePatientsMap
  appointments.forEach((app) => {
    if (!uniquePatientsMap.has(app.patientId)) {
      uniquePatientsMap.set(app.patientId, {
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

  // Convert uniquePatientsMap values to an array of PatientProps
  const patients = Array.from(uniquePatientsMap.values()) as PatientProps[];
  
  // Log patients for debugging purposes
  console.log(patients);

  // Render the PatientLayout component
  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Sidebar section for patient list */}
        <div className="col-span-1 lg:col-span-4 py-3 lg:border-r border-gray-100">
          {/* Panel header with Patients title and count */}
          <PannelHeader title='Patients' count={(patients.length).toString().padStart(2, "0")} icon={Users} />
          <div className="px-3">
            {/* Display list of patients */}
            <PatientPanel patients={patients} role={user?.role} />
          </div>
        </div>
        {/* Main content section */}
        <div className="col-span-1 lg:col-span-8">
          {/* Render children components */}
          {children}
        </div>
      </div>
    </div>
  );
}
