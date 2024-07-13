import { Button } from '@/components/ui/button'
import { Loader, Plus, X } from 'lucide-react'
import React from 'react'

type SelectedProps ={
handleAddAll: ()=> void;
timesArray:string[];
handleAddTime:(time:string)=>void;
handleSubmit:()=>void;
loading:boolean;
selectedTimes:string[];
clearAll:()=>void;
handleRemoveTime:(index:number)=> void
day:string;
};
export default function SelectedTimes({day,timesArray,handleAddAll,handleAddTime,handleRemoveTime,handleSubmit,loading,selectedTimes,clearAll}:SelectedProps) {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 border-gray-900 dark:border-gray-600 shadow rounded-md divide-x divide-gray-600'>
    <div className="p-4">
    <h2 className='font-semibold'>Select the Times you are available for this Day</h2>
    <div className="py-6 grid grid-cols-3 gap-3">
            <button  onClick={handleAddAll} className="flex items-center py-2 px-3 border border-sky-400 dark:bg-gray-800 rounded-md text-sm gap-2 justify-center">
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
    <h2 className='font-semibold'>Here is Availability for <span className='uppercase'>{day}</span></h2>
    <div className="py-6 grid grid-cols-3 gap-3">
      {
        selectedTimes.map((time, i)=>{
          return (
            <button onClick={()=>handleRemoveTime(i)} key={i} className="flex items-center py-2 px-3 border border-sky-400 dark:bg-gray-800 rounded-md text-sm gap-2 justify-center">
              <span>{time}</span>
              <X className='w-3 h-3 ml-2'/>
            </button>

          )
        })
      }
    </div>
    <div className="border-t border-gray-600 p-4 flex justify-between gap-6">
       {loading? ( <Button disabled>
          <Loader className='animate-spin w-4 h-4'/>
          Saving Please wait...
        </Button>):(
       <Button onClick={handleSubmit} className='bg-gray-800 text-white border border-gray-600'>Save Settings</Button>)}
       
        <button  onClick={clearAll} className="flex text-white items-center px-3 border border-red-600 bg-gray-800 rounded-md text-sm gap-6 justify-center">
              <span>Clear All</span>
              <X className='w-5 h-5'/>
            </button>
      </div> 
    </div>
</div>
  )
}
