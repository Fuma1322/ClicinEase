import { createAvailability, updateAvailabilityById } from '@/actions/registry';
import SubmitButton from '@/components/FormInputs/SubmitButton';
import { Button } from '@/components/ui/button';
import { ClinicProfile } from '@prisma/client';
import { Loader, Plus, X } from 'lucide-react';
import React, { useState } from 'react'
import toast from 'react-hot-toast';

export default function Monday({profile}:{profile:any}) {
  const availability = profile?.availablity || "";
  const timesArray = [
    "7:00 AM", "8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM",
  ];
  const [selectedTimes, setSelectedTimes]=useState(["7:00 AM", "8:00 AM", "9:00 AM", "10:00 AM"]);
  // console.log(selectedTimes);
  function handleAddTime(time:string){
    if (!selectedTimes.includes(time)){
      setSelectedTimes((prevTimes)=>[...prevTimes,time])
    }else {
      toast.error(`${time} Already Added!`);
    }
    
  }
  function handleRemoveTime(index:number){
    const updatedTimes = selectedTimes.filter((_,i)=>i!==index)
    setSelectedTimes(updatedTimes)
  }
  function handleAddAll(){
    setSelectedTimes([...timesArray]);
  }
  function clearAll(){
    setSelectedTimes([]);
  }
  async function handleSubmit() {
    setLoading(true)
   try {
    if (profile?.id && availability?.id){
      const data = {
        monday: selectedTimes,
        clinicProfileId: profile.id
      };
      await updateAvailabilityById(availability?.id,data);
      setLoading(false)
      toast.success("Settings Updated Successfully")
      console.log(data);
     } else if (profile?.id){
      console.log("Id not set")
      const data = {
        tuesday: selectedTimes,
        clinicProfileId: profile.id
      };
      await createAvailability(data);
      setLoading(false)
     } else {
      console.log("Profile id not set")
     }
   } catch (error) {
    setLoading(false)
    console.log(error);
   }
  }
  const [loading, setLoading]=useState(false)
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 border-gray-900 dark:border-gray-600 shadow rounded-md divide-x divide-gray-600'>
        <div className="p-4">
        <h2 className='font-semibold'>Select the Times you are available for this Day</h2>
        <div className="py-6 grid grid-cols-3 gap-3">
                <button  onClick={handleAddAll} className="flex items-center py-2 px-3 border border-sky-400 bg-gray-800 rounded-md text-sm gap-2 justify-center">
                  <span>Add All</span>
                  <Plus className='w-3 h-3 ml-2'/>
                </button>
          {
            timesArray.map((time, i)=>{
              return (
                <button  onClick={()=> handleAddTime(time)} key={i} className="flex items-center justify-center py-2 px-3 border border-gray-600 rounded-md text-sm gap-2">
                  <span>{time}</span>
                  <Plus className='w-3 h-3 ml-2'/>
                </button>

              )
            })
          }
        </div>
        </div>
        <div className="p-4">
        <h2 className='font-semibold'>Here is your selected Time</h2>
        <div className="py-6 grid grid-cols-3 gap-3">
          {
            selectedTimes.map((time, i)=>{
              return (
                <button  onClick={()=>handleRemoveTime(i)} key={i} className="flex items-center py-2 px-3 border border-sky-400 bg-gray-800 rounded-md text-sm gap-2 justify-center">
                  <span>{time}</span>
                  <X className='w-3 h-3 ml-2'/>
                </button>

              )
            })
          }
        </div>
        {
          selectedTimes.length > 0 && (
            <div className="border-t border-gray-600 p-4 flex justify-between gap-6">
           {loading? ( <Button disabled>
              <Loader className='animate-spin w-4 h-4'/>
              Saving Please wait...
            </Button>):(
           <Button onClick={handleSubmit} className='bg-gray-800 text-white border border-gray-600'>Save Settings</Button>)}
           
            <button  onClick={clearAll} className="flex items-center px-3 border border-red-600 bg-gray-800 rounded-md text-sm gap-6 justify-center">
                  <span>Clear All</span>
                  <X className='w-5 h-5'/>
                </button>
          </div>
          )
        }
        </div>
    </div>
  )
}
