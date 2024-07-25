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
      title: "Tele-Health Visit",
      href: "/category?mode=Telehealth%20visit",
    },
    {
      title: "In-Person Visit",
      href: "/category?mode=In-person%20visit",
    },
    {
      title: "Be A Service Provider",
      href: "/join/doctors",
    },
  ],
  sidebarNav: [
    
  ],
}