import Link from "next/link";
import React from 'react';
import {Speciality} from "@/prisma/client";

types SpecialityCardsProps = {
  className?: string;
  specialities: Speciality[];
};
export default function SpecialityCards({ className, specialities }: SpecialityCardsProps) {
  return (
    <div className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
      
      {specialities.map((item)=>{
        return (
          <Link  key={item.id} href={`/speciality/${item.slug}`} 
          className={`rounded-md py-3 border bg-slate-100 px-6 flex gap-4 border-blue-500 dark:border-slate-600 dark:bg-slate-800 text-slate-900 dark:text-slate-300 ${className} justify-between`}>
        <h2>{item.title}</h2>
        <span aria-hidden="true">&rarr;</span>
      </Link> 
        )
      })}
    </div>
  );
}
