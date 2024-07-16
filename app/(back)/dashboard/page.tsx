import Dashboard from '@/components/Dashboard/Dashboard'; // Importing Dashboard component for generic user dashboard
import DoctorDashboard from '@/components/Dashboard/DoctorDashboard'; // Importing DoctorDashboard component for doctor-specific dashboard
import PatientsDashboard from '@/components/Dashboard/UserDashboard'; // Importing PatientsDashboard component for patient-specific dashboard
import { authOptions } from '@/lib/auth'; // Importing authOptions for authentication configuration
import { getServerSession } from 'next-auth'; // Importing getServerSession from NextAuth for server-side session retrieval
import React from 'react'; // Importing React for component-based development

export default async function page() {
  const session = await getServerSession(authOptions); // Fetching server session using authOptions
  const user = session?.user; // Extracting user object from session
  const role = user?.role; // Extracting role from user object

  // Conditional rendering based on user's role
  if (role === "DOCTOR") {
    return (
      <>
        {/* Displaying user's role */}
        <p>The user role is {user?.role}</p>
        <DoctorDashboard /> {/* Rendering DoctorDashboard for doctors */}
      </>
    );
  }
  
  if (role === "USER") {
    return (
      <>
        {/* Displaying user's role */}
        <p>The user role is {user?.role}</p>
        <PatientsDashboard /> {/* Rendering PatientsDashboard for users */}
      </>
    );
  }

  // Default rendering for other roles or scenarios
  return (
    <div>
      {/* Displaying user's role */}
      <p>The user role is {user?.role}</p>
      <Dashboard /> {/* Rendering generic Dashboard component */}
    </div>
  );
}
