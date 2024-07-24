import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from "@/components/ui/theme-provider"
import Providers from '@/components/ui/Providers'
import { siteConfig } from '@/config/site'
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from './api/uploadthing/core';
import { Inter as FontSans } from 'next/font/google'
import { OnboardingContextProvider } from '@/context/context'
import { cn } from '@/lib/utils'
import AuthProvider from './AuthProvider'

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  metadataBase: new URL(siteConfig.url),
  keywords: [
    "Next.js",
    "React",
    "Tailwind CSS",
    "Server Components",
    "Radix UI",
  ],
  authors: [
    {
      name: "shadcn",
      url: "https://shadcn.com",
    },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <AuthProvider>
        <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
        >
        <NextSSRPlugin
          routerConfig={extractRouterConfig(ourFileRouter)}
        />
           <Providers>
          <OnboardingContextProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
             >
              {children}
            </ThemeProvider>
          </OnboardingContextProvider>
          </Providers>
        </body>
        </AuthProvider>
      </html>
    </>
  )
}