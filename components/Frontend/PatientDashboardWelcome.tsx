"use client"

import { TypewriterEffectSmooth } from "../ui/typewriter-effect";
export function Welcome() {
  const words = [
    {
      text: "Welcome",
    },
    {
      text: "To",
    },
    {
      text: "ClinicEase.",
      className: "text-blue-500 dark:text-blue-500",
    },
  ];
  return (
    <div className="flex flex-col items-center justify-center h-[40rem]  ">
      <p className="text-neutral-600 dark:text-neutral-200 text-2xl font-bold sm:text-base  ">
        From Screen To Clinic: Your Health Is In Your Hands
      </p>
      <TypewriterEffectSmooth words={words} />
    </div>
  );
}
