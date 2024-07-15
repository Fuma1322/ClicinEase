"use client"
import { Tabs } from "flowbite-react";
import { HiAdjustments } from "react-icons/hi";
import ServiceList from "./Services/ServiceList";
import LinkCards from "./Doctors/LinkCards";
import { Syringe, User2Icon } from "lucide-react";
import { Service, Speciality, Symptom } from "@prisma/client";

type TabbedItemProps = {
  services: Service[];
  specialities: Speciality[];
  symptoms: Symptom[];
}

export default function TabbedItems({
  services,
  specialities,
  symptoms,
}: TabbedItemProps) {

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
      component: <LinkCards className="bg-pink-950"  />, // Pass className here
      content: []
    },
    {
      title: "Symptoms",
      icon: Syringe,
      component: <LinkCards />, // Pass className here
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
