import React from 'react'

export default function SectionHeading({title}:{title:string}) {
  return (
    <h2 className="mb-3 scroll-m-20 tracking-tight lg:text-4xl text-4xl font-extrabold leading-[1.2] text-dark dark:text-white sm:text-4xl md:text-[40px]">
      {title}
    </h2>
  )
}
