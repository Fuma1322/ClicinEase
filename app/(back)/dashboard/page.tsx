import ClinicDashboard from '@/components/Dashboard/ClinicDashboard';
import { Dashboard } from '@/components/Dashboard/Dashboard'
import PatientsDashboard from '@/components/Dashboard/PatientsDashboard';
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import React from 'react'

export default async function page () {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  const role =user?.role
  if (role==="CLINIC"){
    return (
      <>
      <p>The user role is {user?.role}</p>
      <ClinicDashboard/>
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