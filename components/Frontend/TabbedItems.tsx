"use client"
import { Tabs } from "flowbite-react";
import { HiAdjustments } from "react-icons/hi";
import ServiceList from "./Services/ServiceList";
import LinkCards from "./Doctors/SymptomCard";
import { Activity, Stethoscope, Syringe, User2Icon } from "lucide-react";
import { Service, Speciality, Symptom } from "@prisma/client";
import { ServiceWithDoctorProfileCount } from "@/actions/services";
import SymptomCards from "./Doctors/SymptomCard";
import SpecialityCards from "./Doctors/SpecialityCards";

type TabbedItemProps = {
  services: ServiceWithDoctorProfileCount[];
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
      icon: Stethoscope,
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
      icon: Activity,
      component: (<SpecialityCards className="bg-blue-900" specialities={specialities} />), // Pass className here
      content: []
    },
    {
      title: "Symptoms",
      icon: Syringe,
      component: <SymptomCards symptoms={symptoms} className="bg-pink-950"/>, // Pass className here
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
