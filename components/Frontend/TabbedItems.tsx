"use client"
import { Tabs } from "flowbite-react";
import { HiAdjustments, HiClipboardList, HiUserCircle } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";
import ServiceList from "./Services/ServiceList";
import LinkCards from "./Doctors/LinkCards";
import { LucideHospital, User2Icon } from "lucide-react";

export default function TabbedItems() {

  const services=[
    {
      title:"Telehealth",
      image:"/Doctor.jpeg",
      slug:"telehealth"
    },
    {
      title:"Video prescription",
      image:"https://utfs.io/f/d94d58bd-c32e-4ded-801e-f24f620a3639-1uswaj.jpg",
      slug:"telehealth"
    },
    {
      title:"UTI consult",
      image:"https://utfs.io/f/14aa68fa-36d3-46b4-aa16-bc57a92d9016-2hm2.jpg",
      slug:"telehealth"
    },
    {
      title:"Mental health",
      image:"https://utfs.io/f/eb967a61-3621-4dff-b9e5-a862a9b273da-htnc3b.jpg",
      slug:"telehealth"
    },
    {
      title:"ED consult",
      image:"https://utfs.io/f/c84e7f6f-f68f-4396-9324-7a9c75a02965-lxr081.jpg",
      slug:"telehealth"
    },
    {
      title:"Urgent care",
      image:"https://utfs.io/f/3a563e25-83ae-46be-a399-a70c9aa9c2a3-du9sxr.jpg",
      slug:"telehealth"
    }
  ]
  const tabs = [
    {
      title: "Popular Services",
      icon: HiAdjustments,
      component: <ServiceList data={services} />,
      content: []
    },
    // {
    //   title: "Doctors",
    //   icon: HiClipboardList,
    //   component: <LinkCards />,
    //   content: []
    // },
    {
      title: "Specialists",
      icon: User2Icon,
      component: <LinkCards />, // Pass className here
      content: []
    },
    {
      title: "Symptoms",
      icon: LucideHospital,
      component: <LinkCards  />, // Pass className here
      content: []
    }
  ];

  return (
    <Tabs aria-label="Default tabs" style="underline">
      {tabs.map((tab, i) => (
        <Tabs.Item key={i} active title={tab.title} icon={tab.icon}>
          {tab.component}
        </Tabs.Item>
      ))}
    </Tabs>
  );
}
