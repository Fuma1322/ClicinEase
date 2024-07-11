import React from 'react'
import SectionHeading from './SectionHeading'
import ToggleButton from './ToggleButton'
import Link from 'next/link'
import { Map } from 'lucide-react'
import DoctorsListCarousel from './DoctorListCarousel'
import { User } from '@prisma/client'
import { Button } from './ui/button'

export default function DoctorList({
  title="Telehealth visit", 
  isInPerson,
  className="bg-pink-100 py-8 lg:py-24",
  doctors,
}: {
  title?:string;
  isInPerson?:boolean;
  className?:string;
  doctors: User[];
}) {
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
            <Button asChild>
            <Link className='' href="#" >
           See All
           </Link>
            </Button>
           </div>
           <div className="py-6">
             <DoctorsListCarousel  isInperson={isInPerson} doctors={doctors} />
          </div>
        </div>
    </div>
  );
}
