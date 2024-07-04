import Footer from "@components/Frontend/Footer";
import MegaMenu from "@components/Frontend/MegaMenu";
import Navbar from "@components/Frontend/Navbar";
import { SiteHeader } from "@components/site-header";
import React, { ReactNode } from 'react'

export default function Layout({children}: {children:ReactNode}) {
  return (
    <div className="">
         <SiteHeader />
        {/* <div className="bg-white mx-auto py-4 fixed top-16 w-full left-0 z-50 right-0 border-t border-blue-400/30 container ">
           <MegaMenu />
        </div >         */}
       {children}
        <Footer/>
    </div>
  )
}
