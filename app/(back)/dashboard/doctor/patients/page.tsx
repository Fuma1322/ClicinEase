import { getDoctorAppointments } from '@/actions/appointments';
import NotAuthorised from '@/components/NotAuthorised';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import React from 'react';
import { PatientProps } from './layout'; // Assuming the path is correct based on your import statement
import generateSlug from '@/utils/generateSlug';
import NewButton from '@/components/Dashboard/Doctor/NewButton';
import DisplayPannel from '@/components/Dashboard/Doctor/DisplayPannel';

export default async function page() {
  // Fetch session data from the server
  const session = await getServerSession(authOptions);
  const user = session?.user;

  // Check if user is authorized as a doctor, otherwise show NotAuthorised component
  if (user?.role !== "DOCTOR") {
    return (
      <NotAuthorised />
    );
  }

  // Initialize a map to store unique patients
  const uniquePatientsMap = new Map();

  // Generate a slug based on the user's name (if available)
  const slug = generateSlug(user?.name ?? "");

  // Fetch doctor's appointments from the server
  const appointments = (await getDoctorAppointments(user.id)).data || [];

  // Iterate through appointments to populate uniquePatientsMap with patient details
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

  // Render the page content
  return (
    <div>
      {/* Header section with a new patient button */}
      <div className="py-2 px-4 border-b border-gray-200 flex items-center justify-end">
        <div className="flex items-center gap-4">
          <NewButton title='New Patient' href={`/doctor/${slug}`} />
        </div>
      </div>
      
      {/* Display panel for patients */}
      <DisplayPannel title="Patient" newAppointmentLink={`/doctor/${slug}`} count={patients.length} />
    </div>
  );
}
