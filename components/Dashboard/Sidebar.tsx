"use client"

// Lucide icons for sidebar navigation
import { Activity, AlarmClock, Bell, Globe, Home, LineChart, Mail, Package, Package2, Power, Settings, SettingsIcon, ShoppingCart, Stethoscope, Users } from "lucide-react";
import Link from "next/link"; // Next.js link component
import React from "react"; // React library
import { Badge } from "@/components/ui/badge"; // Badge component
import { Button } from "@/components/ui/button"; // Button component
import { usePathname, useRouter } from "next/navigation"; // Next.js navigation hooks
import { cn } from "@/lib/utils"; // Utility function for classNames
import { Session } from 'next-auth'; // Session type from NextAuth
import { signOut } from "next-auth/react"; // Sign out function from NextAuth

export default function Sidebar({session}:{session:Session}) {
  const {user} = session; // Destructure user from session
  const role = user?.role; // Extract role from user
  const pathname = usePathname(); // Current pathname from router
  const roles = {
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
      {title:"Symptoms", path:"/dashboard/symptoms", icon: Activity},
      {title:"Settings", path:"/dashboard/settings", icon: SettingsIcon}
    ],
    DOCTOR: [
      {title:"Dashboard", path:"/dashboard", icon: Home},
      {title:"Appointments", path:"/dashboard/doctor/appointments", icon: AlarmClock},
      {title:"Patients", path:"/dashboard/doctor/patients", icon: Users},
      {title:"Tasks", path:"/dashboard/doctor/tasks", icon: Users},
      {title:"Inbox", path:"/dashboard/doctor/inbox", icon: Mail},
      {title:"Settings", path:"/dashboard/doctor/settings", icon: SettingsIcon},
    ],
  };

  // Console log the user's role for debugging
  console.log(role);

  // Determine sidebar links based on user's role
  let sideBarLinks = roles[role] || [];
  
  const router = useRouter(); // Router instance

  // Function to handle logout
  async function handlelogOut() {
    await signOut(); // Sign out the user
    router.push("/login"); // Redirect to login page
  }

  return (
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        {/* Header section with logo and notifications button */}
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Stethoscope className="text-red-600 h-6 w-6" />
            <span className="">Clinic Ease</span>
          </Link>
          <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
            <Bell className="h-4 w-4" />
            <span className="sr-only">Toggle notifications</span>
          </Button>
        </div>

        {/* Main navigation section */}
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            {/* Map through sidebar links and render each */}
            {sideBarLinks.map((item,i)=>{
              const Icon = item.icon; // Icon component
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
                  {/* Optional: Badge component */}
                  {/* {item.badgeCount&& <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                    {item.badgeCount}
                  </Badge>} */}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Logout button section */}
        <div className="mt-auto p-4">
          <Button onClick={()=> handlelogOut()} size="sm" className="w-full">
            <Power className="w- h-4 mr-1" />
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
}
