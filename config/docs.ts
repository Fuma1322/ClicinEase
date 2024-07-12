import { MainNavItem, SidebarNavItem } from "@/types/nav"


interface DocsConfig {
  mainNav: MainNavItem[]
  sidebarNav: SidebarNavItem[]
}

export const docsConfig: DocsConfig = {
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Tele-Health",
      href: "/tele_health",
    },
    {
      title: "In-Person",
      href: "/in_person",
    },
    {
      title: "About",
      href: "/about",
    },
  ],
  sidebarNav: [
    
  ],
}