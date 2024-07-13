
import { getSymptomsBySlug } from '@/actions/symptom';
import ServiceForm from '@/components/Dashboard/ServiceForm'
import SymptomForm from '@/components/Dashboard/SymptomForm';
import React from 'react'

export default async function page({
  params:{ slug },
}:{
  params:{slug:string};
}) {
  const symptom = (await getSymptomsBySlug(slug))?.data;
  return (
    <div>
        {/* <ServiceForm title="Update Service" initialData={service} /> */}
        {symptom && symptom.id && <SymptomForm title="Update Symptom" initialData={symptom} />}
    </div>
  )
}