import { getServices } from '@/actions/services'; // Importing the getServices function from services actions
import NewButton from '@/components/Dashboard/Doctor/NewButton'; // Importing the NewButton component for creating new services
import PannelHeader from '@/components/Dashboard/Doctor/PannelHeader'; // Importing the PannelHeader component for the services panel header
import ServiceCard from '@/components/Dashboard/ServiceCard'; // Importing the ServiceCard component to display individual services
import { ScrollArea } from '@/components/ui/scroll-area'; // Importing ScrollArea component for scrollable area
import { LayoutGrid } from 'lucide-react'; // Importing LayoutGrid icon from lucide-react for panel header icon
import React from 'react'; // Importing React for JSX rendering

export default async function page() {
  // Fetching services data from the server
  const services = (await getServices()).data || [];

  return (
    <div>
      {/* Main grid layout for the page */}
      <div className="grid grid-cols-12">
        {/* Left column (hidden on large screens) */}
        <div className="lg:col-span-4 col-span-full py-3 border-r border-gray-100">
          <div className="flex items-center justify-between">
            {/* Panel header for Services */}
            <PannelHeader 
              title='Services' 
              count={(services.length).toString().padStart(2, "0")} 
              icon={LayoutGrid}
            />
            {/* New button for creating a new service (visible on small screens) */}
            <div className="lg:hidden">
              <NewButton title='New Services' href='/dashboard/services/new'/>
            </div>
          </div>
          {/* Scrollable area for displaying services */}
          <div className="px-3">
            <ScrollArea className="h-96 w-full">
              {/* Mapping through services and displaying each ServiceCard */}
              {services.map((service) => (
                <ServiceCard key={service.title} service={service} />
              ))}
            </ScrollArea>
          </div>
        </div>
        
        {/* Right column (visible on large screens) */}
        <div className="lg:col-span-8 col-span-full hidden lg:block">
          {/* Header section with a new button for creating a new service */}
          <div className="py-2 px-4 border-b border-gray-200 flex items-center justify-end">
            <div className="flex items-center gap-4">
              <NewButton title='New Services' href='/dashboard/services/new'/>
            </div>
          </div>

          {/* Display panel for showing service statistics and options */}
          <div className="flex h-1/2 items-center justify-center">
            <div className=' py-4 px-6 text-center border-white shadow-md rounded-md flex flex-col items-center gap-1 text-sm'>
              <LayoutGrid/> {/* Icon representing services */}
              <div className="py-3">
                {" "}
                {/* Information about the number of services */}
                <p>You have {services.length.toString().padStart(2,"0")}{" "} Services today.</p>
              </div>
              {/* Button for creating a new service */}
              <NewButton title='New Service' href="/dashboard/services/new"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
