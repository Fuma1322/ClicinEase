"use client"

import React from 'react'
import Link from "next/link"
import {
    Bell,
    LucideHome,
    Settings,
    UserCircle2Icon,
    UserPlus2Icon,
    Users,
  } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button" 
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
 
export default async function Sidebar() {
  const pathName = usePathname()
  const sideBarLinks =[
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: LucideHome,
      badgeCount: 6,
    },
    {
      name: "Patients",
      path: "/dashboard/patients",
      icon: UserPlus2Icon,
    },
    {
      name: "Appointments",
      path: "/dashboard/appointments",
      icon: Users,
    },
    {
      name: "Settings",
      path: "/dashboard/settings",
      icon: Settings,
    },
    {
      name: "Logout",
      path: "/dashboard/logout",
      icon: UserCircle2Icon,
    },
  ]
  return (
    <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <span className="text-indigo-600">ClinicEase</span>
            </Link>
            <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
              <Bell className="h-4 w-4" />
              <span className="sr-only">Toggle notifications</span>
            </Button>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              {sideBarLinks.map((item,i) => {
                const Icon = item.icon
                return(
                    <Link
                    key={i}
                    href={item.path}
                    className={cn("flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary", 
                    pathName === item.path ? "bg-muted text-primary":""
                  )}
                    >
                  <Icon className="h-4 w-4" />
                  {item.name}
                  {item.badgeCount && <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                  {item.badgeCount}
                </Badge>}
                </Link>
                )
              })}
            </nav>
          </div>
        </div>
      </div>
  )
}
