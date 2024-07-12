import Dashboard from '@/components/Dashboard/Dashboard';
import DoctorDashboard from '@/components/Dashboard/DoctorDashboard';
import PatientsDashboard from '@/components/Dashboard/UserDashboard';
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import React from 'react'

export default async function page () {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  const role =user?.role
  if (role==="DOCTOR"){
    return (
      <>
      <p>The user role is {user?.role}</p>
      <DoctorDashboard/>
      </>
    )
  }
  if (role==="USER"){
    return (
      <>
      <p>The user role is {user?.role}</p>
      <PatientsDashboard/>
      </>
    )
  return (
    <div>
      <p>The user role is {user?.role}</p>
        <Dashboard/>
    </div>
  )
}
}