"use client"
import { Session } from "next-auth"
import AnalyticsCard from "../AnalyticsCard"
import { getDoctorAnalytics } from "@/actions/stats";

export default async function  DoctorDashboard({session}:{session:Session | null}) {
  const user = session?.user;
  const analytics = await getDoctorAnalytics() || [];
  return (
    <div className="p-8 py-4">
      <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight mb-3">
        Welcome, Dr. {user?.name}
      </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         {analytics.map((item,i)=>{
          return <AnalyticsCard key={i} data={item}/>;
          
         })}
        </div>
    </div>
  )
}


