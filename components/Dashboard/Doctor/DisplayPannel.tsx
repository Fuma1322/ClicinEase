import { Calendar, LayoutGrid } from 'lucide-react'
import React from 'react'
import NewButton from './NewButton'

type HomeDisplayCardProps = {
  count: number,
  newAppointmentLink: string,
  title:string
}
export default function DisplayPannel({count,title,newAppointmentLink}:HomeDisplayCardProps) {
  return (
    <div className="flex h-1/2 items-center justify-center">
        <div className=' py-4 px-6 text-center border-white shadow-md rounded-md flex flex-col items-center gap-1 text-sm'>
            <Calendar/>
            <div className="py-3">
            <p>You have {count} {title}s today</p>
            </div>
            <NewButton title={`New ${title}`} href={newAppointmentLink}/>
        </div>
    </div>
  )
}
