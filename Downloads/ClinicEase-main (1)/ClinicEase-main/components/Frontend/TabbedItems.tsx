"use client"
import { Tabs } from "flowbite-react";
import { HiAdjustments, HiClipboardList, HiUserCircle } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";
import ServiceList from "./Services/ServiceList";
import LinkCards from "./Doctors/LinkCards";

export default function TabbedItems() {

  const services=[
    {
      title:"Telehealth",
      image:"/Doctor.jpeg",
      slug:"telehealth"
    },
    {
      title:"Video prescription",
      image:"/Doctor.jpeg",
      slug:"telehealth"
    },
    {
      title:"UTI consult",
      image:"/Doctor.jpeg",
      slug:"telehealth"
    },
    {
      title:"Mental health",
      image:"/Doctor.jpeg",
      slug:"telehealth"
    },
    {
      title:"ED consult",
      image:"/Doctor.jpeg",
      slug:"telehealth"
    },
    {
      title:"Urgent care",
      image:"/Doctor.jpeg",
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
    {
      title: "Doctors",
      icon: HiClipboardList,
      component: <LinkCards />,
      content: []
    },
    {
      title: "Specialists",
      icon: HiUserCircle,
      component: <LinkCards className="bg-blue-900" />, // Pass className here
      content: []
    },
    {
      title: "Symptoms",
      icon: HiUserCircle,
      component: <LinkCards className="bg-pink-950" />, // Pass className here
      content: []
    }
  ];

  return (
    <Tabs aria-label="Default tabs" style="default">
      {tabs.map((tab, i) => (
        <Tabs.Item key={i} active title={tab.title} icon={tab.icon}>
          {tab.component}
        </Tabs.Item>
      ))}
    </Tabs>
  );
}
