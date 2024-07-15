import DoctorCard from '@/components/DoctorCard'
import DoctorList from '@/components/DoctorList'
import React from 'react'

export default function page() {
  return (
    <div className="h2">
      <DoctorCard doctor={{
        id: '',
        name: '',
        email: '',
        phone: '',
        slug: '',
        doctorProfile: null
      }} 
      />
    </div>
  )
}
