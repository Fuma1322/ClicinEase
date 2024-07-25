import React from "react";
import TabbedItems from "./TabbedItems";
import { getServices } from "@/actions/services";
import { getSpecialities } from "@/actions/specialities";
import { getSymptoms } from "@/actions/symptom";

const  TabbedSection= async () => {
  const services = (await getServices()).data || [];
  const specialities = (await getSpecialities()).data || [];
  const symptoms = (await getSymptoms()).data || [];
  return (
    <section className="pb-12 pt-20 bg-slate-100 dark:bg-slate-600 lg:py-[60px]">
      <div className="container mx-auto">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="mx-auto mb-12 max-w-5xl text-center lg:mb-20">
              <h2 className="mb-3 text-3xl font-bold leading-[1.2] 
              text-dark dark:text-white sm:text-4xl md:text-[40px] 
              scroll-m-20 pb-2 tracking-tight first:mt-0">
                Browse your Doctors By.
              </h2>
              <p className="leading-7 [&:not(:first-child)]:mt-6 text-base text-body-color dark:text-dark-6">
              Choose from thousands of providers at every day affordable prices. 
              </p>
            </div>
          </div>
        </div>

{/* TABS */}
<div className="mx-auto max-w-6xl">
    <TabbedItems services={services} specialities={specialities} symptoms={symptoms} />
</div>
      </div>
    </section>
  );
};

export default TabbedSection;


