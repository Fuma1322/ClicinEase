import React, { ReactNode } from 'react'
import Sidebar from "@/components/Dashboard/Sidebar"
import NavBar from "@/components/Dashboard/NavBar"
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function Layout({ children }:{ children: ReactNode }) {
  const session = await getServerSession(authOptions);
  if(!session){
    redirect("/login")
  }
  const user = session.user
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <Sidebar />
      <div className="flex flex-col">
        <NavBar session ={session} />
        <div className="p-8">
        {children}
        </div>
      </div>
    </div>
  )
}