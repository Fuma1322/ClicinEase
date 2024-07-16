import { getSpecialities } from '@/actions/specialities'; // Importing the getSpecialities function from specialities actions
import NewButton from '@/components/Dashboard/Doctor/NewButton'; // Importing the NewButton component for creating new specialities
import PannelHeader from '@/components/Dashboard/Doctor/PannelHeader'; // Importing the PannelHeader component for the specialities panel header
import SpecialityCard from '@/components/Dashboard/SpecialityCard'; // Importing the SpecialityCard component to display individual specialities
import { ScrollArea } from '@/components/ui/scroll-area'; // Importing ScrollArea component for scrollable area
import { Anvil, LayoutGrid } from 'lucide-react'; // Importing Anvil and LayoutGrid icons from lucide-react
import React from 'react'; // Importing React for JSX rendering

export default async function page() {
  // Fetching specialities data from the server
  const specialities = (await getSpecialities()).data || [];

  return (
    <div>
      {/* Main grid layout for the page */}
      <div className="grid grid-cols-12">
        {/* Left column (hidden on large screens) */}
        <div className="lg:col-span-4 col-span-full py-3 border-r border-gray-100">
          <div className="flex items-center justify-between">
            {/* Panel header for Specialities */}
            <PannelHeader 
              title='Specialities' 
              count={specialities.length.toString().padStart(2,"0")} 
              icon={Anvil}
            />
            {/* New button for creating a new speciality (visible on small screens) */}
            <div className="lg:hidden">
              <NewButton title='New Speciality' href='/dashboard/speciality/new'/>
            </div>
          </div>
          {/* Scrollable area for displaying specialities */}
          <div className="px-3">
            <ScrollArea className="h-96 w-full">
              {/* Mapping through specialities and displaying each SpecialityCard */}
              {specialities.map((speciality) => (
                <SpecialityCard key={speciality.title} speciality={speciality}/>
              ))}
            </ScrollArea>
          </div>
        </div>
        
        {/* Right column (visible on large screens) */}
        <div className="lg:col-span-8 col-span-full hidden lg:block">
          {/* Header section with a new button for creating a new speciality */}
          <div className="py-2 px-4 border-b border-gray-200 flex items-center justify-end">
            <div className="flex items-center gap-4">
              <NewButton title='New Speciality' href='/dashboard/speciality/new'/>
            </div>
          </div>

          {/* Display panel for showing speciality statistics and options */}
          <div className="flex h-1/2 items-center justify-center">
            <div className=' py-4 px-6 text-center border-white shadow-md rounded-md flex flex-col items-center gap-1 text-sm'>
              <LayoutGrid/> {/* Icon representing specialities */}
              <div className="py-3">
                {" "}
                {/* Information about the number of specialities */}
                <p>You have {specialities.length.toString().padStart(2,"0")}{" "} Specialities today.</p>
              </div>
              {/* Button for creating a new speciality */}
              <NewButton title='New Speciality' href="/dashboard/speciality/new"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
