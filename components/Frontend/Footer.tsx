"use client"
import { Instagram, Linkedin, Stethoscope, Twitter, Youtube } from 'lucide-react';
import React from 'react'

export default function Footer() {
    const footerNavs = [
        {
            label: "Company",
            items: [
                {
                    href: '/join/doctors',
                    name: 'List your Service'
                },
                {
                    href: 'javascript:void()',
                    name: 'Blog'
                },
                {
                    href: 'javascript:void()',
                    name: 'Team'
                },
                {
                    href: 'javascript:void()',
                    name: 'Careers'
                },
            ],
        },
        {
            label: "Resources",
            items: [
                {
                    href: 'javascript:void()',
                    name: 'contact'
                },
                {
                    href: 'javascript:void()',
                    name: 'Support'
                },
                {
                    href: 'javascript:void()',
                    name: 'Docs'
                },
                {
                    href: 'javascript:void()',
                    name: 'Pricing'
                },
            ],
        },
        {
            label: "About",
            items: [
                {
                    href: 'javascript:void()',
                    name: 'Terms'
                },
                {
                    href: 'javascript:void()',
                    name: 'License'
                },
                {
                    href: 'javascript:void()',
                    name: 'Privacy'
                },
                {
                    href: 'javascript:void()',
                    name: 'About US'
                },
            ]
        }
    ];

    const socialLinks = [
        {
            title: "Linkedin",
            href: "https://www.linkedin.com/company/medical-app",
            icon: Linkedin,
            color: "text-blue-600"
        },
        {
            title: "Youtube",
            href: "https://www.linkedin.com/company/medical-app",
            icon: Youtube,
             color: "text-red-600"
        },
        {
            title: "Twitter",
            href: "https://www.linkedin.com/company/medical-app",
            icon: Twitter,
             color: "text-blue-400"
        },
        {
            title: "Instagram",
            href: "https://www.linkedin.com/company/medical-app",
            icon: Instagram,
             color: "text-pink-600"
        },
    ];

    return (
        <footer className="text-gray-500 bg-white dark:bg-slate-950 px-4 py-5 max-w-screen-xl mx-auto md:px-8">
            <div className="gap-6 justify-between md:flex">
                <div className="flex-1">
                    <div className="max-w-xs">
                        <Stethoscope className='h-10 w-10 text-red-600'/>
                        <p className="leading-relaxed mt-2 text-[15px]">
                            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
                        </p>
                    </div>
                </div>
                <div className="flex-1 mt-10 space-y-6 items-center justify-between sm:flex md:space-y-0 md:mt-0">
                    {
                        footerNavs.map((item, idx) => (
                            <ul
                                className="space-y-4"
                                key={idx}
                            >
                                <h4 className="text-gray-800 dark:text-gray-300 font-medium">
                                    { item.label }
                                </h4>
                                {
                                    item.items.map(((el, idx) => (
                                        <li key={idx}>
                                            <a 
                                                href={el.href}
                                                className="hover:underline dark:text-gray-400 hover:text-indigo-600"
                                            
                                            >
                                                { el.name }
                                            </a>
                                        </li>
                                    )))
                                }
                            </ul>
                        ))
                    }
                </div>
            </div>
            <div className="mt-8 py-6 border-t items-center justify-between sm:flex">
                <div className="mt-4 sm:mt-0">
                    &copy; {new Date().getFullYear()} Float UI All rights reserved.
                </div>
                <div className="mt-6 sm:mt-0">
                    <ul className="flex items-center space-x-4">
                        {
                            socialLinks.map((item,i)=>{
                                const Icon = item.icon
                                return(
                                    <li 
                                    key={i} 
                                    className="w-10 h-10 border rounded-full flex items-center 
                                    justify-center"
                                    >
                                      <a href={item.href} className={item.color} >
                                        <Icon className="w-6 h-6" />
                                      </a>
                                 </li>
                                );
                            })}
                    </ul>
                </div>
            </div>
        </footer>
    )
}

