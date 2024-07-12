import { getSpecialtyBySlug } from '@/actions/specialities';
import { getSymptomsBySlug } from '@/actions/symptoms';
import SymptomForm from '@/components/Dashboard/SymptomForm';
import React from 'react'

export default async function page({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const symptom = (await getSymptomsBySlug(slug))?.data;
  return (
    <div>
      {symptom && symptom.id && (
        <SymptomForm title="Update Symptom" initialData={symptom} />
      )}
    </div>
  );
}
