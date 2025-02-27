import CustomButton from '@/components/CustomButton'; // Importing CustomButton component
import CustomAccordion, { FAQItem } from '@/components/Frontend/CustomAccordion'; // Importing CustomAccordion component and FAQItem type
import Pricing from '@/components/Frontend/Pricing'; // Importing Pricing component
import { Check } from 'lucide-react'; // Importing Check icon from lucide-react
import Image from 'next/image'; // Importing Image component from Next.js
import React from 'react'; // Importing React library

export default function page() {
    const features = [
        "ClinicEase brings patients to you",
        "Seamless e-prescribing experience",
        "Integrated clinical note-taking",
    ]; // Array of features
    const steps = [
        "List your practice",
        "Create competitive offerings",
        "Start seeing patients",
    ]; // Array of steps
    const cards = [
        {
            title: "Begin Your Journey",
            description: "Start a new application to join our network of healthcare providers", // Card description
            link: "/register?role=DOCTOR&plan=free", // Link for starting a new application
            linkTitle: "Start a new application" // Title for the link
        },
        {
            title: "Resume Application",
            description: "Pick up where you left off and complete your registration process. Schedule for Physical Approval", // Card description
            link: "/onboarding/resume", // Link for resuming application
            linkTitle: "Continue your Application", // Title for the link
        },
        {
            title: "Schedue a call", // Title of the card
            description: "Arrange a time for a call to finalize your application.", // Card description
            link: "/", // Link for scheduling a call
            linkTitle: "Schedule a call" // Title for the link
        },
        {
            title: "Track your Progress", // Title of the card
            description: "Monitor the status of your application and approvals in real-time.", // Card description
            link: "/", // Link for tracking progress
            linkTitle: "Check Status" // Title for the link
        }
    ]; // Array of cards for various actions
    const faqs: FAQItem[] = [
        {
            qn: 'How do I sign up for the ClinicEase?', // FAQ question
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
            ), // FAQ answer with embedded CustomButton
        },
        {
            qn: 'Can I use the ClinicEase on multiple devices?', // FAQ question
            ans: 'You can install Next.js using npm or yarn. Run <code>npm install next react react-dom</code> or <code>yarn add next react react-dom</code> to get started.' // FAQ answer
        },
        {
            qn: 'Is my data secure on the ClinicEase?', // FAQ question
            ans: 'To create a new page, add a new file to the <code>pages</code> directory. The file name will determine the URL path.' // FAQ answer
        },
        {
            qn: 'How can I reset my password?', // FAQ question
            ans: 'Yes, Next.js has built-in TypeScript support. Create a <code>tsconfig.json</code> file in the root of your project and install the required dependencies using <code>npm install --save-dev typescript @types/react @types/node</code>.' // FAQ answer
        },
        {
            qn: 'Do you offer customer support?', // FAQ question
            ans: 'To add global CSS, import your CSS file in <code>pages/_app.js</code> or <code>pages/_app.tsx</code>. For example: <code>import \'../styles/global.css\';</code>.' // FAQ answer
        },
        {
            qn: 'Can I upgrade or downgrade my plan?', // FAQ question
            ans: 'You can create API routes by adding files to the <code>pages/api</code> directory. Each file in this directory will be mapped to an API endpoint.' // FAQ answer
        }
    ]; // Array of FAQs

    return (
        <div className="min-h-screen">
            <section className="py-12 px-4">
                <div className="max-w-6xl gap-4 mx-auto grid grid-cols-1 md:grid-cols-2">
                    <div className="">
                        <h2 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl ">
                            Build a thriving{" "}
                            <span className="text-blue-600 font-semibold">direct-pay</span>{" "}
                            practice with ClinicEase.
                        </h2>
                        <p className="py-4">
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
                                features.map((feature, i) => {
                                    return (
                                        <p key={i} className="flex items-center">
                                            <Check className="w-4 h-4 mr-2 flex-shrink-0 text-blue-500" />
                                            {feature}
                                        </p>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <Image
                        src="https://utfs.io/f/ed46bbbc-1a7b-462e-8137-21ed8f9f1737-1y1ii.avif"
                        alt=""
                        width={"275"}
                        height={183}
                        className="w-full rounded-3xl"
                    />
                </div>
            </section>
            <section className="py-20 px-4">
                <div className="max-w-6xl gap-8 mx-auto grid grid-cols-1 md:grid-cols-2">
                    <Image
                        src="https://utfs.io/f/358f597c-2582-490e-a027-71620046322b-1obayw.jpg"
                        alt=""
                        width={"275"}
                        height={183}
                        className="w-full hidden md:block mr-4 rounded-3xl py-22"
                    />
                    <div className="">
                        <h2 className="sm:text-3xl text-2xl">
                            Join ClinicEase to increase your
                            <span className="text-blue-600 font-semibold mx-2">patient-reach</span>{" "}
                            today.
                        </h2>
                        <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-4 py-6">
                            {cards.map((card, i) => {
                                return (
                                    <div key={i} className="bg-blue-900 p-4 rounded-lg shadow-2xl text-center">
                                        <h3 className="text-2xl font-semibold text-white">
                                            {card.title}
                                        </h3>
                                        <p className="text-gray-200 text-xs py-3">
                                            {card.description}
                                        </p>
                                        <CustomButton
                                            title={card.linkTitle}
                                            href={card.link}
                                            className="bg-blue-600 hover:bg-blue-900 w-full"
                                        />
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </section>
            <section className="py-12 px-4">
                <div className="max-w-6xl gap-4 mx-auto">
                    <Pricing />
                </div>
            </section>
            <section className="py-12 px-4">
                <div className="max-w-2xl gap-4 mx-auto">
                    <CustomAccordion FAQS={faqs} />
                </div>
            </section>
        </div>
    );
}
