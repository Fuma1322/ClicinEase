import ServiceForm from '@/components/Dashboard/ServiceForm'
import React from 'react'

export default function page({params:{id}} : {params:{id:string}}) {
  return (
    <div>
        <ServiceForm title="Update Service" />
    </div>
  )
}
