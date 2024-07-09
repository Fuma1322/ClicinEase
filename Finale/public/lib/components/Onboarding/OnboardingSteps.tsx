"use client"

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation'
import React from 'react'
import BioDataForm from './BioDataForm';
import ContactInfo from './ContactInfo';
import EducationInfo from "./EducationInfo"
import PracticeInfo from './PracticeInfo';
import AdditionalInfo from './AdditionalInfo';
import Availability from './Availability';
import ProfileInfoForm from './ProfileInfoForm';
import { useOnboardingContext } from '@/context/context';


export default function OnboardingSteps({ id }:{ id: string }) {
    const params = useSearchParams();
    const page = params.get("page")?? "bio-data";
    const {
        trackingNumber,
        doctorProfileId, 
      } = useOnboardingContext();
    console.log(page)
    const steps = [
        {
            title: "Bio Data",
            page: "bio-data",
            components: <BioDataForm 
            nextPage='profile' 
            userId={id} 
            title="Bio Data" 
            description="Please Fill In Your Bio Data Information" 
            page={page}
            formId = {doctorProfileId}
            />,
        },
        {
            title: "Profile Information",
            page: "profile",
            components: <ProfileInfoForm
             nextPage='contact' 
             page={page}
             userId={id} 
             title='Profile Information' 
             description='Please Fill In Your Profile Information' 
             formId = {doctorProfileId}
             />,
        },
        {
            title: "Contact Information",
            page: "contact",
            components: <ContactInfo 
            nextPage='education' 
            page={page} 
            userId={id}
            title="Contact Information" 
            description="Please Fill In Your Contact Information" 
            formId = {doctorProfileId}
            />,
        },
        {
            title: "Education Information",
            page: "education",
            components: <EducationInfo 
            nextPage='practice' 
            page={page}
            userId={id}
            title="Education Information" 
            description="Please Fill In Your Education Information" 
            formId = {doctorProfileId}
            />
        },
        {
            title: "Practice Information",
            page: "practice",
            components: <PracticeInfo 
            nextPage='additional' 
            page={page} 
            userId={id}
            title="Practice Information" 
            description="Please Fill In Your Practice Information"
            formId = {doctorProfileId}
            />,
        },
        {
            title: "Additional Information",
            page: "additional",
            components: <AdditionalInfo 
            nextPage='final' 
            page={page}
            userId={id} 
            title="Additional Information"
            description="Please Fill In Your Additional Information"
            formId = {doctorProfileId}
            />,
        },
        // {
        //     title: "Availability",
        //     page: "availability",
        //     components: <Availability  
        //     page={page}
        //     userId={id} 
        //     title="Availabiity Information" 
        //     description="Please Fill In Your Availability Information" 
        //     formId = {doctorProfileId}
        //     />,
        // },
    ] 
    const currentStep = steps.find((step) =>step.page === page)
    console.log(currentStep)
  return (
    <div className=''>
    <div className='grid grid-cols-12 mx-auto rounded-lg overflow-hidden border bg-slate-100 border-slate-200 min-h-screen shadow-inner'>
        <div className='col-span-full sm:col-span-3 divide-y-2 divide-gray-200 bg-slate-300 h-full'>
            {
                steps.map((step,i) => {
                    return (
                        <Link key={i}
                        href={`/onboarding/${id}?page=${step.page}`} 
                        className={cn("block shadow-inner py-3 px-4 text-slate-800 text-sm uppercase", step.page===page?"bg-teal-800 text-slate-100":"")}>
                            {step.title}
                        </Link>            
                    )
                })
            }
        </div>
        <div className='col-span-full sm:col-span-9 p-4'>
           {trackingNumber &&  <p className='border-b border-gray-200 text-teal-600 pb-2'>
                Your Tracking Number is <span className='font-bold'>{trackingNumber}</span> {" "} <span className='tex-xs lowercase'>(Use This To Check The Status Or Resume Application)</span>
            </p>}
            {currentStep?.components}
        </div>
    </div>
    </div>
  )
}