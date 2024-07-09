"use client"
import React from 'react'
import { Tabs } from "flowbite-react";
import Monday from './AvailabilityDays/Monday';
import { ClinicProfile } from '@prisma/client';
import Tuesday from './AvailabilityDays/Tuesday';


export default function AvailabilitySettings({profile,}:{profile:ClinicProfile|undefined|null;}) {
    const tabs = [
        {
           title: "Monday",
           component:
           <Monday profile={profile}/>

        },
        {
            title: "Tuesday",
            component:<Tuesday profile={profile}/>

         },
         {
            title: "Wednesday",
            component:<>Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to
         control the content visibility and styling.</> 
         },
         {
            title: "Thursday",
            component:<>Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to
         control the content visibility and styling.</> 
         },
         {
            title: "Friday",
            component:<>Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to
         control the content visibility and styling.</> 
         },
         {
            title: "Saturday",
            component:<>Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to
         control the content visibility and styling.</> 
         },
         {
            title: "Sunday",
            active:false,
            component:<>Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to
         control the content visibility and styling.</> 
         },
    ]
  return (
    <div>
        <p className='py-3'>Please Add the Availability for the Whole Week</p>
        <Tabs aria-label="Tabs with underline" style="underline">
          {
            tabs.map((tab, i)=>{
                return (
                    <Tabs.Item key={i} active title={tab.title}>
                        {tab.component}
                    </Tabs.Item>
                );
            })
            }
        </Tabs>
    </div>
  )
}
