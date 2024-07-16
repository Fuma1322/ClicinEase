import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"; // Assuming the correct path for Tabs components
import AvailabilitySettings from '@/components/Dashboard/Doctor/AvailabilitySettings'; // Assuming the correct path for AvailabilitySettings component
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getDoctorProfileById } from '@/actions/onboarding';
import DoctorServiceSettings from '@/components/Dashboard/Doctor/DoctorServiceSettings'; // Assuming the correct path for DoctorServiceSettings component

export default async function page() {
    // Fetch session data from the server
    const session = await getServerSession(authOptions);
    const user = session?.user;

    // Fetch doctor's profile data based on user ID
    const profile = await getDoctorProfileById(user?.id);

    return (
        <div className="max-w-5xl mx-auto px-6 py-6">
            {/* Page title */}
            <h2 className='scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl pb-4'>
                Settings
            </h2>

            {/* Tabs component for managing settings */}
            <Tabs defaultValue="availability" className="w-[800px]">
                {/* Tab list */}
                <TabsList>
                    {/* Tab trigger for Availability Settings */}
                    <TabsTrigger value="availability">
                        Availability Settings
                    </TabsTrigger>
                    {/* Tab trigger for Service Settings */}
                    <TabsTrigger value="service">
                        Service Settings
                    </TabsTrigger>
                </TabsList>

                {/* Tab content for Availability Settings */}
                <TabsContent value="availability" className='w-full'>
                    <AvailabilitySettings profile={profile?.data} />
                </TabsContent>

                {/* Tab content for Service Settings */}
                <TabsContent value="service">
                    <DoctorServiceSettings profile={profile?.data} />
                </TabsContent>
            </Tabs>
        </div>
    );
}
