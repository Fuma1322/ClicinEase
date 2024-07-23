"use client"

// React library for component-based UI
import React from 'react';

// Flowbite Tabs component for tabbed navigation
import { Tabs } from "flowbite-react";

// Individual day components for availability settings
import Monday from './AvailabilityDays/Monday';
import Tuesday from './AvailabilityDays/Tuesday';
import Wednesday from './AvailabilityDays/Wednesday';
import Thursday from './AvailabilityDays/Thursday';
import Friday from './AvailabilityDays/Friday';
import Saturday from './AvailabilityDays/Saturday';
import Sunday from './AvailabilityDays/Sunday';

// DoctorProfile type from Prisma client
import { DoctorProfile } from '@prisma/client';

// AvailabilitySettings component definition
export default function AvailabilitySettings({
   profile,
}: {
   profile: DoctorProfile | undefined | null; // Prop for doctor profile information
}) {
    // Define tabs configuration for each day of the week
    const tabs = [
        {
           title: "Monday", // Tab title
           component: <Monday profile={profile} day='monday'/> // Component to render when tab is active
        },
        {
            title: "Tuesday", // Tab title
            component: <Tuesday profile={profile} day='tuesday'/> // Component to render when tab is active
         },
         {
            title: "Wednesday", // Tab title
            component: <Wednesday profile={profile} day='wednesday'/> // Component to render when tab is active
         },
         {
            title: "Thursday", // Tab title
            component: <Thursday profile={profile} day='thursday'/> // Component to render when tab is active
         },
         {
            title: "Friday", // Tab title
            component: <Friday profile={profile} day='friday'/> // Component to render when tab is active
         },
         {
            title: "Saturday", // Tab title
            component: <Saturday profile={profile} day='saturday'/> // Component to render when tab is active
         },
         {
            title: "Sunday", // Tab title
            active: false, // Example of an inactive tab
            component: <Sunday profile={profile} day='sunday'/> // Component to render when tab is active
         },
    ];

    // Render the component
    return (
        <div>
            <p className='py-3 font-semibold'>Please Add the Availability for the Whole Week</p> {/* Instructional text */}
            {/* Tabs component for navigation */}
            <Tabs aria-label="Tabs with underline" style="underline">
              {
                // Map through tabs configuration and render each tab
                tabs.map((tab, i) => {
                    return (
                        <Tabs.Item key={i} active={tab.active} title={tab.title}>
                            {tab.component} {/* Render the component associated with the tab */}
                        </Tabs.Item>
                    );
                })
              }
            </Tabs>
        </div>
    );
}
