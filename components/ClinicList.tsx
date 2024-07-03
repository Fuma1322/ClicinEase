import React from 'react'
import SectionHeading from './SectionHeading'
import ToggleButton from './ToggleButton'
import Link from 'next/link'
import { Map } from 'lucide-react'
import DoctorsListCarousel from './ClinicListCarousel'

export default function ClinicList({
  title="Telehealth visit", 
  isInPerson,
  className="bg-pink-100 py-8 lg:py-24"
}: {
  title?:string;
  isInPerson?:boolean;
  className?:string
}) {
  const clinics =[
    {
      name: "Mabote Clinic"
    },
    {
      name: "Khubetsoana Clinic"
    },
    {
      name: "Ts'epong Filter Clinic"
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
            <Link href="" className='text-sm flex items-center text-blue-700 font-semibold ' >
              <Map className='mr-2 flex-shrink-0 w-4 h-4' />
              <span>Map View</span>
            </Link>
           ):(
            <ToggleButton/>
           )}
           <Link className='py-3 px-6 border border-blue-600 bg-white' href="#" >See All</Link>
            
           </div>
           <div className="py-6">
             <DoctorsListCarousel clinics={clinics} isInperson={isInPerson} />
          </div>
        </div>
    </div>
  )
}
