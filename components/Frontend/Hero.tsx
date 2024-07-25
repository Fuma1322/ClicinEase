import React from "react";
import TransitionalText from "./TransitionalText";
import { Pill, Search, Stethoscope } from "lucide-react";
import { CommandMenu } from "../ui/command-menu";
import { Button } from "../ui/button";
import Link from "next/link";
import SearchBar from "./SearchBar";


const Hero = () => {
    const TEXTS = [ "Dermatology", "Dental Health", "General Health", "Mental Health"];
  return (
    <>
      <div className="bg-blue-950 dark:bg-gray-950 ">
      <div className="relative pb-[110px] pt-[50px] dark:bg-dark lg:pt-[50px] max-w-6xl mx-auto ">
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4 lg:w-6/12">
              <div className="hero-content">
                <h1 className="mb-5 text-4xl font-bold !leading-[1.208] text-gray-50 dark:text-white sm:text-[42px] lg:text-[40px] xl:text-5xl flex flex-wrap items-center gap-3">
                <span>Book your</span> <TransitionalText className="text-blue-500" TEXTS={TEXTS} />
                <br />
                <span>sessions now</span>
                </h1>
                <p className="mb-8 max-w-[480px] text-xl text-gray-200 dark:text-dark-6">
                Your Health, Your Schedule: Book Doctors Online
                </p>
                {/* SEARCH BAR HERE */}
                {/* <SearchBar /> */}
                <div className="w-full flex-1 md:flex-none">
            <SearchBar />
          </div>
                {/* CTA BTNS */}
                <ul className="flex flex-wrap items-center mt-6">
                  <li>
                    <a
                      href="/register"
                      className="inline-flex items-center justify-center rounded-md bg-gray-950 px-6 py-3 text-center text-base font-medium text-white hover:bg-blue-700 lg:px-7"
                    >
                      Get Started
                    </a>
                  </li>
                  {/* <Button variant="outline">
                    <Link href="/register">
                      Get Started
                    </Link>
                  </Button> */}
                  <li>
                    <a
                      href="/join/doctors"
                      className="inline-flex items-center justify-center px-5 py-3 text-center text-base font-medium text-gray-50 hover:text-blue-500 dark:text-white"
                    >
                      <span className="mr-2">
                        <Stethoscope className="flex-shrink-0 h-5 w-5 text-red-600"/>
                        
                      </span>
                     Are you a doctor?
                    </a>
                  </li>
                </ul>
                <div className="py-4 pt-8 flex gap-4">
                  <div className="flex flex-col items-center justify-center">
                    <span className="fond-bold text-gray-50">600</span>
                    <span className="text-sm text-gray-400">Active Specialits</span>
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    <span className="fond-bold text-gray-50">1800</span>
                    <span className="text-sm text-gray-400">Active Patients</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="hidden px-4 lg:block lg:w-1/12"></div>
            <div className="w-full px-4 lg:w-5/12">
              <div className="lg:ml-auto lg:text-right">
                <div className="relative z-10 inline-block pt-11 lg:pt-0">
                  <img
                    src="https://utfs.io/f/e3e1c3d1-c780-4f2a-94c2-91d4de3e7033-1wkca.jpg"
                    alt="hero"
                    className="max-w-full inline-block align-middle lg:ml-auto rounded-3xl"
                  />
                  <span className="absolute -bottom-8 -left-8 z-[-1]">
                    <svg
                      width="93"
                      height="93"
                      viewBox="0 0 93 93"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="2.5" cy="2.5" r="2.5" fill="#3056D3" />
                      <circle cx="2.5" cy="24.5" r="2.5" fill="#3056D3" />
                      <circle cx="2.5" cy="46.5" r="2.5" fill="#3056D3" />
                      <circle cx="2.5" cy="68.5" r="2.5" fill="#3056D3" />
                      <circle cx="2.5" cy="90.5" r="2.5" fill="#3056D3" />
                      <circle cx="24.5" cy="2.5" r="2.5" fill="#3056D3" />
                      <circle cx="24.5" cy="24.5" r="2.5" fill="#3056D3" />
                      <circle cx="24.5" cy="46.5" r="2.5" fill="#3056D3" />
                      <circle cx="24.5" cy="68.5" r="2.5" fill="#3056D3" />
                      <circle cx="24.5" cy="90.5" r="2.5" fill="#3056D3" />
                      <circle cx="46.5" cy="2.5" r="2.5" fill="#3056D3" />
                      <circle cx="46.5" cy="24.5" r="2.5" fill="#3056D3" />
                      <circle cx="46.5" cy="46.5" r="2.5" fill="#3056D3" />
                      <circle cx="46.5" cy="68.5" r="2.5" fill="#3056D3" />
                      <circle cx="46.5" cy="90.5" r="2.5" fill="#3056D3" />
                      <circle cx="68.5" cy="2.5" r="2.5" fill="#3056D3" />
                      <circle cx="68.5" cy="24.5" r="2.5" fill="#3056D3" />
                      <circle cx="68.5" cy="46.5" r="2.5" fill="#3056D3" />
                      <circle cx="68.5" cy="68.5" r="2.5" fill="#3056D3" />
                      <circle cx="68.5" cy="90.5" r="2.5" fill="#3056D3" />
                      <circle cx="90.5" cy="2.5" r="2.5" fill="#3056D3" />
                      <circle cx="90.5" cy="24.5" r="2.5" fill="#3056D3" />
                      <circle cx="90.5" cy="46.5" r="2.5" fill="#3056D3" />
                      <circle cx="90.5" cy="68.5" r="2.5" fill="#3056D3" />
                      <circle cx="90.5" cy="90.5" r="2.5" fill="#3056D3" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  );
};

export default Hero;

const SingleImage = ({ href, imgSrc }:{href:string,imgSrc:string}) => {
  return (
    <>
      <a href={href} className="flex w-full items-center justify-center">
        <img src={imgSrc} alt="brand image" className="h-10 w-full" />
      </a>
    </>
  );
};

