"use client"

import Link from "next/link"
import ModeToggle from "@/components/ModeToggle"
import { Button } from "@/components/ui/button"
import { CommandMenu } from "../components/ui/command-menu"
import { MainNav } from "@/components/main-nav"
import { MobileNav } from "@/components/mobile-nav"
import { LogIn } from "lucide-react"
import { Session } from "next-auth"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { generateInitials } from "@/utils/generateInitials"


export default async function SiteHeader({session}:{session:Session | null}) {
const user  = session?.user;
const initials = generateInitials(user?.name);
const router = useRouter();
async function handleLogout() {
  await signOut()
  router.push("/login");
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
            { session && session.user && user?.email?(
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
                <DropdownMenuLabel className='text-center font-extrabold uppercase'>{user.name}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href="/dashboard">Dashboard</Link>
                  </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={()=>handleLogout()}>Logout</DropdownMenuItem>
              </DropdownMenuContent>
                  </DropdownMenu>
            ): (<Button asChild>
              <Link href="/login">
              <LogIn className="mr-2 h-4 w-4" /> Login
              </Link>
            </Button>)}
          
            <ModeToggle />
          </nav>
        </div>
      </div>
    </header>
  )
}