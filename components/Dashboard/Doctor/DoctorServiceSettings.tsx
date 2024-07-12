import React from 'react'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Checkbox } from '@/components/ui/checkbox'
import UpdateServiceForm from './UpdateServiceForm'
import { getServices } from '@/actions/services'
import { getSymptoms } from '@/actions/symptoms'
import { SelectOption } from '@/components/FormInputs/SelectInput'
import { getSpecialties } from '@/actions/specialities'

export default async function DoctorServiceSettings() {
    const allServices =(await getServices()).data
    const allSpecialties =(await getSpecialties()).data
    const allSymptoms =(await getSymptoms()).data

    const services: SelectOption[] = (allServices?.map((item)=>{
        return {
            label: item.title,
            value: item.id
        }
      } )) || [];

      const specialties: SelectOption[] =(allSpecialties?.map((item)=>{
        return {
            label: item.title,
            value: item.id
        }
      } )) || [];

      const symptoms: SelectOption[] =(allSymptoms?.map((item)=>{
        return {
            label: item.title,
            value: item.id
        }
      } )) || [];


  return (
    <div className="grid gap-6 w-full">
            <Card className="w-full" x-chunk="dashboard-04-chunk-1">
              <CardHeader>
                <CardTitle>Choose Service</CardTitle>
                <CardDescription>
                  Used to identify your store in the marketplace.
                </CardDescription>
              </CardHeader>
              <UpdateServiceForm services={services} specialties={specialties} symptoms={symptoms} />
              
            </Card>
            
          </div>
  )
}
