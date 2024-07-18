"use client"

import Link from "next/link"
import { CommandMenu } from "@/components/ui/command-menu"
import { Button } from "@/components/ui/button"
import { PersonIcon } from "@radix-ui/react-icons"
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { useRouter } from 'next/navigation'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Session, User } from 'next-auth'
import { signOut } from "next-auth/react"
import { MainNav } from "../main-nav"
import { MobileNav } from "../mobile-nav"
import { generateInitials } from "@/utils/generateInitials"

export function SiteHeader({session}:{session:Session|null}) {
  const user =session?.user;
  const initials = generateInitials(user?.name)
  const router = useRouter();
  async function handleLogout() {
    await signOut()
    router.push("/");
  }
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <MainNav />
        <MobileNav />
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <CommandMenu />
          </div>
          <nav className="flex items-center gap-4">
            {session && session.user && user?.email?(
                  <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                  <Avatar className='cursor-pointer'>
                    {user.image ? (
                      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    ):(
                      <AvatarFallback>{initials}</AvatarFallback>
                    )}   
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel className='text-center'>{user.name}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Link href="/dashboard">Dashboard</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={()=>handleLogout()}>Logout</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
            ):(  
            <Button asChild>
              <Link href="/login">
             <PersonIcon className="mr-2 h-4 w-4" /> Login
             </Link>
           </Button>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}