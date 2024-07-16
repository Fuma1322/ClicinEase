import { getSymptoms } from '@/actions/symptom'; // Importing getSymptoms function from symptom actions
import NewButton from '@/components/Dashboard/Doctor/NewButton'; // Importing NewButton component for creating new symptoms
import PannelHeader from '@/components/Dashboard/Doctor/PannelHeader'; // Importing PannelHeader component for the symptoms panel header
import SymptomCard from '@/components/Dashboard/SymptomCard'; // Importing SymptomCard component to display individual symptoms
import { ScrollArea } from '@/components/ui/scroll-area'; // Importing ScrollArea component for scrollable area
import { Activity, LayoutGrid } from 'lucide-react'; // Importing Activity and LayoutGrid icons from lucide-react
import React from 'react'; // Importing React for JSX rendering

export default async function page() {
  // Fetching symptoms data from the server
  const symptoms = (await getSymptoms()).data || [];

  return (
    <div>
      {/* Main grid layout for the page */}
      <div className="grid grid-cols-12">
        {/* Left column (hidden on large screens) */}
        <div className="lg:col-span-4 col-span-full py-3 border-r border-gray-100">
          <div className="flex items-center justify-between">
            {/* Panel header for Symptoms */}
            <PannelHeader 
              title='Symptoms' 
              count={(symptoms.length).toString().padStart(2, "0")} 
              icon={Activity}
            />
            {/* New button for creating a new symptom (visible on small screens) */}
            <div className="lg:hidden">
              <NewButton title='New Symptoms' href='/dashboard/symptoms/new'/>
            </div>
          </div>
          {/* Scrollable area for displaying symptoms */}
          <div className="px-3">
            <ScrollArea className="h-96 w-full">
              {/* Mapping through symptoms and displaying each SymptomCard */}
              {symptoms.map((symptom) => (
                <SymptomCard key={symptom.title} symptom={symptom}/>
              ))}
            </ScrollArea>
          </div>
        </div>
        
        {/* Right column (visible on large screens) */}
        <div className="lg:col-span-8 col-span-full hidden lg:block">
          {/* Header section with a new button for creating a new symptom */}
          <div className="py-2 px-4 border-b border-gray-200 flex items-center justify-end">
            <div className="flex items-center gap-4">
              <NewButton title='New Symptoms' href='/dashboard/symptoms/new'/>
            </div>
          </div>

          {/* Display panel for showing symptom statistics and options */}
          <div className="flex h-1/2 items-center justify-center">
            <div className=' py-4 px-6 text-center border-white shadow-md rounded-md flex flex-col items-center gap-1 text-sm'>
              <Activity/> {/* Icon representing symptoms */}
              <div className="py-3">
                {" "}
                {/* Information about the number of symptoms */}
                <p>You have {symptoms.length.toString().padStart(2,"0")}{" "} Symptoms today.</p>
              </div>
              {/* Button for creating a new symptom */}
              <NewButton title='New Symptoms' href="/dashboard/symptoms/new"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
