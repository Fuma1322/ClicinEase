"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"

import { Microscope } from "lucide-react"

export function MainNav() {
  const pathname = usePathname();
  const mainNavLinks = [
    {
      name: "Home",
      path: "/"
    },
    {
      name: "Find Doctor",
      path: "/find-doctor", 
    },
    {
      name: "Telehealth Visit",
      path: "/telehealth"
    },
    {
      name: "Inperson Visit",
      path: "/inperson",
    },
    {
      name: "About",
      path: "/about",
    },
    {
      name: "Be service provider",
      path: "/about",
    },
  ]

  return (
    <div className="mr-4 hidden md:flex">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <Microscope className="h-6 w-6" />
        <span className="hidden font-bold sm:inline-block">
          {siteConfig.name}
        </span>
      </Link>
      <nav className="flex items-center gap-4 text-sm lg:gap-6">
        {
          mainNavLinks.map((item,i)=>{
            return(
              <Link key={i}
          href="/docs"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname === item.path ? "text-foreground" : "text-foreground/60"
          )}
        >
          {item.name}
        </Link>
            )
          })
        }
      </nav>
    </div>
  )
}