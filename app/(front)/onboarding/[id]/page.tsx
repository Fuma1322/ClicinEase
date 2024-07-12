import { getSpecialities } from '@/actions/specialities';
import OnboardingSteps from '@/components/Onboarding/OnboardingSteps';
import React from 'react';

export default async function page({params:{id}}:{params:{id:string}}) {

  const specialities = (await getSpecialities()).data || [];
  return (
    <div className='bg-teal-800 dark:bg-slate-800'>
       <div className="max-w-5xl mx-auto py-8 min-h-screen">
       <OnboardingSteps id={id} specialities={specialities} />
       </div>
    </div>
  )
}
