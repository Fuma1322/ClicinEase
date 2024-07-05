import React from 'react'
import SectionHeading from './SectionHeading'
import ToggleButton from './ToggleButton'
import Link from 'next/link'
import DoctorCard from './DoctorCard'
import { ArrowUpRight, Map } from 'lucide-react'
import DoctorsListCarousel from './DoctorsListCarousel'
import { Button } from './ui/button'

export default function DoctorsList({
  title="Telehealth visit", 
  isInPerson,
  className="bg-pink-100 dark:bg-blue-800 py-8 lg:py-24"
}: {
  title?:string;
  isInPerson?:boolean;
  className?:string
}) {
  const doctors =[
    {
      name: "John"
    },
    {
      name: "John"
    },
    {
      name: "John"
    },
    {
      name: "John"
    },
    {
      name: "John"
    },
    {
      name: "John"
    },
    {
      name: "John"
    },
    {
      name: "John"
    }
  ]
  return (
    <div className={className} >
        <div className="max-w-6xl mx-auto">
        <SectionHeading title={title} />
        <div className="py-4 flex items-center justify-between" >
           {isInPerson?(
            <Link href="#" className='text-sm flex items-center text-blue-700 font-semibold ' >
              <Map className='mr-2 flex-shrink-0 w-4 h-4' />
              <span>Map View</span>
            </Link>
           ):(
            <ToggleButton/>
           )}
           <Button asChild>
           <Link className="" href="#" >
           See All
           <ArrowUpRight className="h-6 w-4 ms-2" />
           </Link>
           </Button>
            
           </div>
           <div className="py-6">
             <DoctorsListCarousel doctors={doctors} isInperson={isInPerson} />
          </div>
        </div>
    </div>
  )
}
