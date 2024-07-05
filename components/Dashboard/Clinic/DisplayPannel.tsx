import { Calendar, LayoutGrid } from 'lucide-react'
import React from 'react'
import NewButton from './NewButton'

type DisplayPannelProps = {
  count: number
}
export default function DisplayPannel({count}:DisplayPannelProps) {
  return (
    <div className="flex h-1/2 items-center justify-center">
        <div className=' py-4 px-6 text-center border-white shadow-md rounded-md flex flex-col items-center gap-1 text-sm'>
            <LayoutGrid/>
            <div className="py-3">
            <p>You have {count} appointments today</p>
            </div>
            <NewButton title='New Apointment' href='#'/>
        </div>
    </div>
  )
}
