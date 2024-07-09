import CustomButton from '@/components/CustomButton'
import CustomAccordion, { FAQItem } from '@/components/Frontend/CustomAccordion';
import Pricing from '@/components/Frontend/Pricing';
import { Check } from 'lucide-react';
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function page() {
    const features = [
        "ClinicEase brings patients to you",
        "Seamless e-prescribing experience",
        "Integrated clinical note-taking",
    ];
    const steps = [
        "List your practice",
        "Create competitive offerings",
        "Start seeing patients",
    ];
    const cards = [
        {
            title: "Begin Your Journey",
            description: "Start a new application to join our network of healthcare providers",
            link: "/register?role=DOCTOR&plan=free",
            linkTitle: "Start a new application"
        },
        {
            title: "Resume Application",
            description: 
            "Pick up where you left off and complete your registration process. Schedule for Physical Approval",
            link: "/onboarding/resume",
            linkTitle: "Continue your Application",
        },
        {
            title: "Schedue a call",
            description: "Arrange a time for a call to finalize your application.",
            link: "/",
            linkTitle: "Schedule a call"
        },
        {
            title: "Track your Progress",
            description: "Monitor the status of your application and approvals in real-time.",
            link: "/",
            linkTitle: "Check Status"
        }
    ];
    const faqs: FAQItem[] = [
        {
          qn: 'How do I sign up for the ClinicEase?',
          ans: (
          <div>
            You can sign up by visiting our website and clicking on the{" "}
            <CustomButton 
             title="Signup" 
             href="/register?role='DOCTOR'" 
             className="bg-blue-600 hover:bg-blue-800" 
            />{" "}
            Follow the instructions to create your account.
          </div>
            ),
        },
        {
          qn: 'Can I use the ClinicEase on multiple devices?',
          ans: 'You can install Next.js using npm or yarn. Run <code>npm install next react react-dom</code> or <code>yarn add next react react-dom</code> to get started.'
        },
        {
          qn: 'Is my data secure on the ClinicEase?',
          ans: 'To create a new page, add a new file to the <code>pages</code> directory. The file name will determine the URL path.'
        },
        {
          qn: 'How can I reset my password?',
          ans: 'Yes, Next.js has built-in TypeScript support. Create a <code>tsconfig.json</code> file in the root of your project and install the required dependencies using <code>npm install --save-dev typescript @types/react @types/node</code>.'
        },
        {
          qn: 'Do you offer customer support?',
          ans: 'To add global CSS, import your CSS file in <code>pages/_app.js</code> or <code>pages/_app.tsx</code>. For example: <code>import \'../styles/global.css\';</code>.'
        },
        {
          qn: 'Can I upgrade or downgrade my plan?',
          ans: 'You can create API routes by adding files to the <code>pages/api</code> directory. Each file in this directory will be mapped to an API endpoint.'
        }
      ];
  return (
    <div className="min-h-screen">
        <section className="py-12 px-4" >
            <div className="max-w-6xl gap-4 mx-auto grid grid-cols-1 md:grid-cols-2">
                <div className="">
                <h2 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl " >
                    Build a thriving{" "}
                    <span className="text-blue-600 font-semibold">direct-pay</span>{" "}
                    practice with ClinicEase.
                    </h2>
                <p className="py-4" >
                    Welcome to ClinicEase, where connecting with patients is made 
                    easier than ever before. 
                    Our platform streamlines the process of 
                    managing appointments, providing care remotely, and keeping track 
                    of patient records.
                </p>
                <CustomButton 
                title="List your Service" 
                href="#" 
                className="bg-blue-600 dark:bg-slate-200 hover:bg-blue-800" 
                />
                <div className="py-6">
                {
                    features.map((feature,i)=>{
                        return(
                            <p key={i} className="flex items-center">
                                <Check className="w-4 h-4 mr-2 flex-shrink-0 text-blue-500" />
                                {feature}
                            </p>
                        )
                    })}
                </div>
                </div>
                <Image 
                src="/Doctor.jpeg" 
                alt="" width={"275"} 
                height={183} 
                className="w-full" 
                />
            </div>
        </section>
        <section className="py-20 px-4" >
            <div className="max-w-6xl gap-8 mx-auto grid grid-cols-1 md:grid-cols-2">

            <Image 
                src="/Doctor.jpeg" 
                alt="" width={"275"} 
                height={183} 
                className="w-full hidden md:block mr-4" 
                />

                <div className="">
                <h2 className="sm:text-3xl text-2xl ">
                    Join ClinicEase to increase your
                    <span className="text-blue-600 font-semibold mx-2">revenue</span>{" "}
                    today.
                    </h2>
                <div className="grid grid-cols-2 gap-4 py-6">
                    {
                        cards.map((card,i)=>{
                            return(
                                <div key={i} className="bg-blue-900 p-4 rounded-lg shadow-2xl text-center">
                        <h3 className="text-2xl font-semibold text-white">
                            {card.title}
                        </h3>
                        <p className="text-gray-200 text-xs py-3" >
                            {card.description}
                        </p>
                        <CustomButton 
                          title={card.linkTitle} 
                          href={card.link} 
                          className="bg-blue-600 hover:bg-blue-800" 
                        />
                    </div>

                            )
                        })
                    }
              </div>
            </div>                
        </div>
    </section>
    
        <section className="py-12 px-4" >
            <div className="max-w-6xl gap-4 mx-auto ">
               <Pricing /> 
            </div>
        </section>
        <section className="py-12 px-4" >
            <div className="max-w-2xl gap-4 mx-auto ">
               <CustomAccordion FAQS={faqs} /> 
            </div>
        </section>
</div>
)}
