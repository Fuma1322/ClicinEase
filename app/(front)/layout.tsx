import { authOptions } from "@/lib/auth";
import Footer from "@components/Frontend/Footer";
import MegaMenu from "@components/Frontend/MegaMenu";
import Navbar from "@components/Frontend/Navbar";
import { SiteHeader } from "@components/site-header";
import { getServerSession } from "next-auth";
import React, { ReactNode } from 'react'

export default async function Layout({children}: {children:ReactNode}) {
  const session = await getServerSession(authOptions)
  
  return (
    <div className="">
         <SiteHeader session={session} />
        {/* <div className="bg-white mx-auto py-4 fixed top-16 w-full left-0 z-50 right-0 border-t border-blue-400/30 container ">
           <MegaMenu />
        </div >         */}
       {children}
        <Footer/>
    </div>
  )
}
