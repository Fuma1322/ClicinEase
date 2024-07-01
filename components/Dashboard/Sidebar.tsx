"use client"

import React from 'react'
import Link from "next/link"
import {
  AlarmClock,
    Bell,
    Home,
    Hospital,
    LucideHome,
    Mail,
    Settings,
    Settings2Icon,
    SettingsIcon,
    User,
    UserCircle2Icon,
    UserPlus2Icon,
    Users,
    UsersIcon,
  } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button" 
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Session } from 'next-auth'
 
export default function Sidebar({session}:{session:Session}) {
  const {user} = session;
  const role = user?.role;
  const roles ={
    USER: [
      {title:"Dashboard", path:"/dashboard", icon: Home},
      {title:"Settings", path:"/dashboard/user/settings", icon: SettingsIcon}
    ],
    ADMIN: [
      {title:"Dashboard", path:"/dashboard", icon: Home},
      {title:"Clinics", path:"/dashboard/clinic", icon: Users},
      {title:"Patients", path:"/dashboard/patients", icon: Users},
      {title:"Apointments", path:"/dashboard/appointments", icon: Users},
      {title:"Services", path:"/dashboard/clinic/services", icon: Users},
      {title:"Speciality", path:"/dashboard/clinic/speciality", icon: Users},
      {title:"Settings", path:"/dashboard/settings", icon: SettingsIcon}
    ],
    CLINIC: [
      {title:"Dashboard", path:"/dashboard", icon: Home},
      {title:"Patients", path:"/dashboard/clinics/patients", icon: Users},
      {title:"Apointments", path:"/dashboard/clinics/appointments", icon: AlarmClock},
      {title:"Tasks", path:"/dashboard/clinics/tasks", icon: Users},
      {title:"Inbox", path:"/dashboard/clinics/inbox", icon: Mail},
      {title:"Settings", path:"/dashboard/clinics/settings", icon: SettingsIcon},
      
      
    ],
  };
console.log(role);
let sideBarLinks = roles[role] || [];

  const pathName = usePathname()
  // const sideBarLinks =[
  //   {
  //     name: "Dashboard",
  //     path: "/dashboard",
  //     icon: LucideHome,
  //   },
  //   {
  //     name: "Patients",
  //     path: "/dashboard/patients",
  //     icon: UserPlus2Icon,
  //   },
  //   {
  //     name: "Clinics",
  //     path: "/dashboard/clinics",
  //     icon: Hospital,
  //   },
  //   {
  //     name: "Appointments",
  //     path: "/dashboard/appointments",
  //     icon: Users,
  //     badgeCount: 6,
  //   },
  //   {
  //     name: "Settings",
  //     path: "/dashboard/settings",
  //     icon: Settings,
  //   },
  //   {
  //     name: "Logout",
  //     path: "/dashboard/logout",
  //     icon: UserCircle2Icon,
  //   },
  // ]
  return (
    <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <span className="text-sky-400">ClinicEase</span>
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
                  {item.title}
                  {/* {item.badgeCount && <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                  {item.badgeCount}
                </Badge>} */}
                </Link>
                )
              })}
            </nav>
          </div>
        </div>
      </div>
  )
}
