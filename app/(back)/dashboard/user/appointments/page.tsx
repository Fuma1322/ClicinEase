import { getPatientAppointments } from '@/actions/appointments'
import DisplayPannel from '@/components/Dashboard/Doctor/DisplayPannel'
import NewButton from '@/components/Dashboard/Doctor/NewButton'
import NotAuthorised from '@/components/NotAuthorised'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import React from 'react'

export default async function page() {
  const session = await getServerSession(authOptions);
  const user = session?.user
  if (user?.role !== "USER") {
    return (
      <NotAuthorised />
    )
  }
  const appointments = (await getPatientAppointments(user.id)).data || [];
  return (
    <div>
      <div className="py-2 px-4 border-b border-gray-200 flex items-center justify-end">
        <div className="flex items-center gap-4">
          <NewButton title='New Appointment' href="/dashboard/user/appointments/new" />
        </div>
      </div>
      <div className="hidden lg:block">
        <DisplayPannel title="Appointment" newAppointmentLink="/dashboard/user/appointments/new" count={appointments.length} />
      </div>
    </div>
  );
}
