"use client"

import React from 'react'

export default function page({
    params:{slug},
    searchParams,
}: {
    params: {slug: string};
    searchParams: {[key: string]: string | string[]| undefined}
}) {
    const title = slug.split("-").join(" ");
  return (
    <div className='container p-8'>
        <h1 className='scroll-m-20 pb-6 text-3xl capitalize font-extrabold tracking-tight lg:text-4xl'>
            {title} (10)
        </h1>
        <div className='max-w-5xl mx-auto grid grid-cols-12 gap-6 lg:gap-10'>
            <div className='col-span-3 shadow border border-gray-200/50 rounded-sm p-6'>
            <h2 className='capitilize'> {title} </h2>
            </div>
        </div>
        <div className='col-span-9'>
            <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum architecto modi expedita nisi sapiente totam vero ipsum repellat ut nemo.</h1>
        </div>
    </div>
  )
}
