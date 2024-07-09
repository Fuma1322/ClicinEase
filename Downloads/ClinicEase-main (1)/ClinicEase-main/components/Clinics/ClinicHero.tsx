import React, { useState } from "react";
import CustomButton from "../ui/CustomButton";

export default function Hero() {
  const cards = [
    {
      title: "Enroll Your Clinic",
      description: "Start a new application to join our network of healthcare providers",
      link: "/registry/666c3921b93cbecfd85baaa8?page",
      linkTitle: "Start New Application"
    },
    {
        title: "Resume Application",
        description: "Pick up where you left off and complete enrolling your clinic",
        link: "/registry/resume",
        linkTitle: "Resume Application"
      },  
    ]
  return (
    <>
      <div className="relative bg-black pb-[110px] pt-[120px] lg:pt-[150px]">
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4 lg:w-5/12">
              <div className="hero-content">
                <h1 className="mb-5 text-4xl font-extrabold !leading-[1.208] text-gray-300 sm:text-[42px] lg:text-[40px] xl:text-5xl ">
                  Join ClinicEase to lessen the long queues at your clinic! 
                </h1>
                <p className="mb-8 max-w-[480px] text-base text-body-color ">
                  With ClinicEase, business and students thrive together
                </p>
                <div className="grid gap-4 md:grid-cols-2 sm:grid-cols-1">
                      {cards.map((card, i) => (
                          <div key={i} className="bg-gray-900 p-4 rounded-lg shadow-2xl">
                              <h3 className="text-2xl font-semibold text-gray-200">{card.title}</h3>
                                <p className="text-gray-400 text-xs py-3">{card.description}</p>
                                  <CustomButton
                                  title={card.linkTitle}
                                  href={card.link}
                                  className="bg-sky-300 hover:bg-indigo-600"
                                  />
                          </div>
                        ))}
                  </div>
                {/* <div className="clients pt-16">
                  <h6 className="mb-6 flex items-center text-xs font-bold text-body-color ">
                    Some Of Our Clients
                    <span className="ml-3 inline-block h-px w-8 bg-body-color"></span>
                  </h6>
                  <div className="flex items-center space-x-4">
                    <SingleImage
                      href="#"
                      imgSrc="https://cdn.tailgrids.com/2.0/image/assets/images/brands/ayroui.svg"
                    />

                    <SingleImage
                      href="#"
                      imgSrc="https://cdn.tailgrids.com/2.0/image/assets/images/brands/graygrids.svg"
                    />

                    <SingleImage
                      href="#"
                      imgSrc="https://cdn.tailgrids.com/2.0/image/assets/images/brands/uideck.svg"
                    />
                  </div>
                </div> */}
              </div>
            </div>
            <div className="hidden px-4 lg:block lg:w-1/12"></div>
            <div className="w-full px-4 lg:w-6/12">
              <div className="lg:ml-auto lg:text-right">
                <div className="relative z-10 inline-block pt-11 lg:pt-0">
                  <img
                    src="/hero3.jpeg"
                    alt="hero"
                    width="600"
                    height="600"
                    className="max-w-full lg:ml-auto rounded-lg" 
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

interface SingleImageProps {
  href: string;
  imgSrc: string;
}

const SingleImage: React.FC<SingleImageProps> = ({ href, imgSrc }) => {
  return (
    <>
      <a href={href} className="flex w-full items-center justify-center">
        <img src={imgSrc} alt="brand image" className="h-10 w-full" />
      </a>
    </>
  );
};

interface ListItemProps {
  children: React.ReactNode;
  NavLink: string;
}

const ListItem: React.FC<ListItemProps> = ({ children, NavLink }) => {
  return (
    <>
      <li>
        <a
          href={NavLink}
          className="flex py-2 text-base font-medium text-dark hover:text-primary lg:ml-10 lg:inline-flex"
        >
          {children}
        </a>
      </li>
    </>
  );
};
