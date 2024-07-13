"use client"

import React from 'react'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  import { Input } from "@/components/ui/input"
  import { Button } from "@/components/ui/button"
  import { Badge } from "@/components/ui/badge"
  import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
  import Link from "next/link"
  import {
    Hospital,
    LucideHome,
    Menu,
    Search,
    Settings,
    UserCircle2Icon,
    UserPlus2Icon,
    Users,
  } from "lucide-react"
import { usePathname, useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Session, User } from 'next-auth'
import { signOut } from 'next-auth/react'
import ModeToggle from '../ModeToggle'

export default function NavBar({session}:{session:Session}) {
  const user =session.user;
  const router = useRouter();
  async function handleLogout() {
    await signOut()
    router.push("/login");
  }
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
      name: "Clinics",
      path: "/dashboard/clinics",
      icon: Hospital,
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
    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="shrink-0 md:hidden"
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col">
        <nav className="grid gap-2 text-lg font-medium py-8">
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
      </SheetContent>
    </Sheet>
    <div className="w-full flex-1">
      <form>
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search products..."
            className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
          />
        </div>
      </form>
    </div>
    <ModeToggle />
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
      <Avatar className='cursor-pointer'>
        {user.image ? (
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        ):(
          <AvatarFallback>CE</AvatarFallback>
        )}   
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel className='text-center font-extrabold uppercase'>{user.name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuItem>Support</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={()=>handleLogout()}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </header>
  )
}