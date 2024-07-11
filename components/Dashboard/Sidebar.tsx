"use client"
import {AlarmClock, Bell, Globe, Home, LineChart, Mail, Package, Package2, Power, Router, Settings, SettingsIcon, ShoppingCart, Users } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Session } from 'next-auth'
import { signOut } from "next-auth/react";
 
export default function Sidebar({session}:{session:Session}) {
  const {user} = session;
  const role = user?.role;
  const roles ={
    USER: [
      {title:"Dashboard", path:"/dashboard", icon: Home},
      {title:"My Appointments", path:"/dashboard/user/appointments", icon: AlarmClock},
      {title:"Settings", path:"/dashboard/user/settings", icon: SettingsIcon}
    ],
    ADMIN: [
      {title:"Dashboard", path:"/dashboard", icon: Home},
      {title:"Doctors", path:"/dashboard/doctors", icon: Users},
      {title:"Patients", path:"/dashboard/patients", icon: Users},
      {title:"Appointments", path:"/dashboard/appointments", icon: Users},
      {title:"Services", path:"/dashboard/services", icon: Users},
      {title:"Speciality", path:"/dashboard/speciality", icon: Users},
      {title:"Settings", path:"/dashboard/settings", icon: SettingsIcon}
    ],
    DOCTOR: [
      {title:"Dashboard", path:"/dashboard", icon: Home},
      {title:"Apointments", path:"/dashboard/doctor/appointments", icon: AlarmClock},
      {title:"Patients", path:"/dashboard/doctor/patients", icon: Users},
      {title:"Tasks", path:"/dashboard/doctor/tasks", icon: Users},
      {title:"Inbox", path:"/dashboard/doctor/inbox", icon: Mail},
      {title:"Settings", path:"/dashboard/doctor/settings", icon: SettingsIcon},
      
      
    ],
  };
console.log(role);
let sideBarLinks = roles[role] || [];
  
  const pathname = usePathname();
  const router =useRouter()
 async function handleLogout(){
    await signOut()
    Router
    router.push("/login")
  }
  return (
    <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Package2 className="h-6 w-6" />
              <span className="">Clinic Ease</span>
            </Link>
            <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
              <Bell className="h-4 w-4" />
              <span className="sr-only">Toggle notifications</span>
            </Button>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              {
                sideBarLinks.map((item,i)=>{
                  const Icon = item.icon;
                  return (
                    <Link
                    key={i}
                href={item.path}
                className={cn("flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                  pathname === item.path ? "bg-muted text-primary": "" 
                )}
              >
                <Icon className="h-4 w-4" />
                {item.title}
                {/* {item.badgeCount&& <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                  {item.badgeCount}
                </Badge>} */}
              </Link>
            );
          })}
          </nav>
          </div>
          {/* <div className="mt-auto p-4">
            <Card x-chunk="dashboard-02-chunk-0">
              <CardHeader className="p-2 pt-0 md:p-4">
                <CardTitle>Upgrade to Pro</CardTitle>
                <CardDescription>
                  Unlock all features and get unlimited access to our support
                  team.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
                <Button size="sm" className="w-full">
                  Upgrade
                </Button>
              </CardContent>
            </Card>
          </div> */}

          <div className="mt-auto p-4">
          <Button size="sm" className="w-full">
            <Power className="w-4 h-4 mr-1 "/>
                  Logout
                </Button>
          </div>
        </div>
      </div>
  );
}