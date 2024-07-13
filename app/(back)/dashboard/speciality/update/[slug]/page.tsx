
import { getSpecialityBySlug } from '@/actions/specialities';
import SpecialityForm from '@/components/Dashboard/SpecialityForm'
import React from 'react'

export default async function page(
  {
    params: {slug},
  }: {
    params: { slug: string};
  }) {
    const speciality = (await getSpecialityBySlug(slug))?.data;
  return (
    <div>
        {speciality && speciality.id && (
          <SpecialityForm title="Update Speciality" initialData={speciality}/>
        )}
    </div>
  )
}