import Link from "next/link";
import React from 'react';
import {Symptom} from "@/prisma/client";

types SymptomsCardsProps = {
  className?: string;
  symptoms: Symptom[];
};
export default function SymptomCards({ className, symptoms }: SymptomsCardsProps) {
  return (
    <div className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
      
      {specialities.map((item)=>{
        return (
          <Link  key={item.id} href={`/symptoms/${item.slug}?id=${item.id}`} 
          className={`rounded-md py-3 px-6 flex gap-4 bg-slate-800 text-slate-50 ${className} justify-between`}>
        <h2>{item.title}</h2>
        <span aria-hidden="true">&rarr;</span>
      </Link> 
        )
      })}
    </div>
  );
}
