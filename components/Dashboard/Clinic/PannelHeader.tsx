import { Button } from '@/components/ui/button'
import { AlignHorizontalDistributeCenter, Calendar, LucideIcon, Plus } from 'lucide-react'
import { title } from 'process'
import React from 'react'
import NewButton from './NewButton'


export default function PannelHeader({title,count,icon}:{title:string,count:string,icon:LucideIcon}) {
  const Icon = icon
  return (
    <div className="py-2 px-6 border-gray-200 flex items-center justify-between">
      <div className="flex items-center  gap-1 text-sm">
        <Icon className='w-4 h-4 flex-shrink-0'/>
        <span>{title}</span>
        <span className="w-6 h-6 rounded-full flex items-center justify-center shadow-sm border text-xs">{count}</span>
      </div>
      {/* <div className="flex items-center gap-4">
      <NewButton title='New Apointment' href='#'/>
      </div> */}
    </div>
  )
}
