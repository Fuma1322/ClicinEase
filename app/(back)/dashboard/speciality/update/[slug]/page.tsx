import { getSpecialties, getSpecialtyBySlug } from '@/actions/specialities';
import SpecialityForm from '@/components/Dashboard/SpecialityForm'
import React from 'react'

export default async function page(
  {
    params: {slug},
  }: {
    params: { slug: string};
  }) {
    const specialty = (await getSpecialtyBySlug(slug))?.data;
  return (
    <div>
        {specialty && specialty.id && (
          <SpecialityForm title="Update Specialty" initialData={specialty}/>
        )}
    </div>
  )
}
