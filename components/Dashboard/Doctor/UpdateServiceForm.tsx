"use client"
import { SelectOption } from '@/components/FormInputs/SelectInput'
import ShadSelectInput from '@/components/FormInputs/ShadSelectInput';
import { Button } from '@/components/ui/button';
import { CardContent, CardFooter } from '@/components/ui/card';
import React, { useState } from 'react'

export default function UpdateServiceForm({
    services,
    specialties,
    symptoms
}:{
    services: SelectOption[];
    specialties: SelectOption[];
    symptoms: SelectOption[];
}) {
    const [selectedServiceId, setSelectedServiceId]=useState();
    const [specialtyId, setSpecialtyId]=useState();
    const [symptomIds, setSymptomIds]=useState()
  return (
    <>
    <CardContent className="space-y-3">
        <ShadSelectInput 
        label="Select Service" 
        optionTitle="Service" 
        options={services} 
        selectedOption={selectedServiceId} 
        setSelectedOption={setSelectedServiceId} 
        />
        <ShadSelectInput 
        label="Select Specialty" 
        optionTitle="Specialty" 
        options={specialties} 
        selectedOption={specialtyId} 
        setSelectedOption={setSpecialtyId} 
        />
        {/* <ShadSelectInput 
        label="Select Service" 
        optionTitle="Service" 
        options={services} 
        selectedOption={selectedServiceId} 
        setSelectedOption={setSelectedServiceId} 
        /> */}
                
              </CardContent>
              <CardFooter className="border-t px-6 py-4">
              <Button>Save</Button>
              </CardFooter>
    </>
    
  )
}
