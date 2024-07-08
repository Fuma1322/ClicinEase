import RegistrySteps from '@/components/Registry/RegistrySteps'
import React from 'react'

export default function page({params:{id}}:{params:{id:string}}) {

  //Get existing clinic profile
  return (
    <div className='max-w-5xl mx-auto py-8 min-h-screen'>
        <RegistrySteps id={id} />
    </div>
  )
}
