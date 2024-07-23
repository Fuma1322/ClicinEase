import React, { useState } from 'react'
import toast from 'react-hot-toast';
import SelectedTimes from './SelectedTimes';
import { timesArray } from '@/config/constants';
import { createAvailability, updateAvailabilityById } from '@/actions/onboarding';

export default function Saturday({profile,day}:{profile:any,day:string}) {
  let initialData: string[] = ["7:00 AM"];
  if (profile && profile?.availability){
   initialData = profile?.availability[day]|| [];
  }
  const availability = profile?.availablity || "";  
  const [selectedTimes, setSelectedTimes]=useState<string[]>(initialData);
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
  // async function handleSubmit() {
  //   setLoading(true);
  //  try {
  //   if (profile?.id && availability?.id){
  //     const data = {
  //       saturday: selectedTimes,
  //       doctorProfileId: profile.id,
  //     };
  //     await updateAvailabilityById(availability?.id,data);
  //     setLoading(false);
  //     toast.success("Settings Updated Successfully");
  //     // console.log(data);
  //    } else if (profile?.id){
  //     // console.log("Id not set")
  //     const data = {
  //       saturday: selectedTimes,
  //       doctorProfileId: profile.id,
  //     };
  //     await createAvailability(data);
  //     toast.success("Settings created Successfully");
  //     setLoading(false);
  //    } else {
  //     // console.log("Profile id not set")
  //    }
  //  } catch (error) {
  //   setLoading(false);
  //   console.log(error);
  //  }
  // }

  async function handleSubmit() {
    setLoading(true);
    try {
      if (profile?.id) {
        const data = {
          saturday: selectedTimes,
          doctorProfileId: profile.id,
        };
  
        await updateAvailabilityById(availability?.id, data);
        toast.success("Settings Updated Successfully");
      }
  
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error("Something went wrong");
    }
  }
  const [loading, setLoading]=useState(false)
  return (
    <SelectedTimes 
    timesArray={timesArray}
    handleAddAll={handleAddAll}
    handleAddTime={handleAddTime}
    handleSubmit={handleSubmit}
    loading={loading}
    selectedTimes={selectedTimes}
    clearAll={clearAll}
    handleRemoveTime={handleRemoveTime}
    day={day}
    />
  )
}
