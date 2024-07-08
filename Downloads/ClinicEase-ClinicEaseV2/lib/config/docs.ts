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
      title: "Find A Doctor",
      href: "/doctors",
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
      title: "Be A Service Provider",
      href: "/service provider",
    },
    {
      title: "About",
      href: "/about",
    },
  ],
  sidebarNav: [
    {
      title: "Getting Started",
      items: [
        {
          title: "Introduction",
          href: "/docs",
          items: [],
        },
      ],
    },
  ],
}