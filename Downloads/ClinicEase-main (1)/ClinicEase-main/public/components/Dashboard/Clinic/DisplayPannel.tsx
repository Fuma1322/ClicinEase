import { Calendar } from 'lucide-react'
import React from 'react'
import NewButton from './NewButton'

export default function DisplayPannel() {
  return (
    <div className="flex h-1/2 items-center justify-center">
        <div className=' py-4 px-6 text-center border-white shadow-md rounded-md flex flex-col items-center gap-1 text-sm'>
            <Calendar/>
            <div className="py-3">
            <p>You have 11 appointments today</p>
            <p>11 New Patients, 3 Follow Ups, 4 Annual Physicals</p>
            </div>
            <NewButton title='New Apointment' href='#'/>
        </div>
    </div>
  )
}
