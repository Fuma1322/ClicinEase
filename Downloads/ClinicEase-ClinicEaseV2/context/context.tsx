//  "use client"
// import { BasicInfoProps, ClinicDetailsProps } from "@/types/types";
// import { ClinicProfile } from "@prisma/client";
// import { ReactNode, createContext, useContext, useState } from "react";
// import { number } from "zod";

// // Wrap the entire app with the provider
// interface IOnBoardingContextData {
//     trackingNumber: string;
//     setTrackingNumber: (value: string) => void;
//     clinicProfileId: string;
//     setClinicProfileId: (value: string) => void;

//     // TRACK THE FORM DATA
//     basicData: BasicInfoProps;
//     clinicData: ClinicDetailsProps
//     savedDBData:any
//     setSavedDBData:(data:any)=>void
//     setBasicData: (data: BasicInfoProps) => void;
//     setClinicData: (data:ClinicDetailsProps) => void;
// }

// const initialBasicData: BasicInfoProps = {
//     clinicName: "",
//     email: "",
//     phone: "",
//     address: "",
//     profilePicture: "",
//     page: "",
//     userId: "",
//     trackingNumber: "",
// };

// const initialClinicData: ClinicDetailsProps = {
//     page: "",
//     duration: "",
//     availability: "",
//     specialization: "",
//     servicesOffered: [],
//     clinicHours: 0
// };

// const initialContextData: IOnBoardingContextData = {
//     trackingNumber: "",
//     clinicProfileId: "",
//     setTrackingNumber: () => {},
//     setClinicProfileId: () => {},
//     setBasicData: () => {},
//     setClinicData: () => {},
//     basicData: initialBasicData,
//     clinicData: initialClinicData,
//     savedDBData:{},
//     setSavedDBData:()=>{}
// };

// const OnBoardingContext = createContext<IOnBoardingContextData>(initialContextData);

// // Creating and exporting the context provider
// export function OnboardingContextProvider({ children }: { children: ReactNode }) {
//     const [trackingNumber, setTrackingNumber] = useState("");
//     const [clinicProfileId, setClinicProfileId] = useState("");
//     const [basicData, setBasicData] = useState<BasicInfoProps>(initialBasicData);
//     const [clinicData, setClinicData] = useState<ClinicDetailsProps>(
//         initialClinicData);
     
//     const [savedDBData, setSavedDBData] = useState<any>({});

//     const contextValues = {
//         trackingNumber,
//         setTrackingNumber,
//         clinicProfileId,
//         setClinicProfileId,
//         basicData,
//         setBasicData,
//         clinicData,
//         setClinicData,
//         savedDBData, 
//         setSavedDBData
//     };

//     return (
//         <OnBoardingContext.Provider value={contextValues}>
//             {children}
//         </OnBoardingContext.Provider>
//     );
// }

// // Creating and exporting useContext
// export function useOnboardingContext() {
//     return useContext(OnBoardingContext);
// }

// export default OnBoardingContext;



//context => useSTate to a global Level 
"use client"

import { init } from "next/dist/compiled/webpack/webpack";
import { createContext, ReactNode, useContext, useState } from "react";

//Steps for creating context API
//CREATING AND EXPORT THE CONTEXT
//1)Define the shapeof the data you want to track
//2) Define the intial data
//3) create and export the context
//4) add the types to the context and initial data

//CREATE AND EXPORT THE CONTEXT PROVIDER


//CREATE AND EXPORT USECONTEXT HOOK

//WRAP THE ENTIRE APP WITH THE PROVIDER 

interface IOnBoardingContextData {
    trackingNumber : string;
    doctorProfileId: string; 
    setTrackingNumber: (value: string) => void;
    setDoctorProfileId: (value: string) => void;
}
const intialData = {
    trackingNumber : "",
    doctorProfileId: "",
    setTrackingNumber: () => {},
    setDoctorProfileId: () => {},
}

const OnBoardingContext = createContext<IOnBoardingContextData>(intialData);


export function OnboardingContextProvider({children} : {children:ReactNode}) {
    const [trackingNumber, setTrackingNumber] = useState("O2E550EQV1")
    const [doctorProfileId,setDoctorProfileId] = useState("6688752c283ccf76236f18fa")

    const contextValues = {
        trackingNumber, 
        setTrackingNumber, 
        doctorProfileId,
        setDoctorProfileId 
    };
    return <OnBoardingContext.Provider value={contextValues}>
        {children}
    </OnBoardingContext.Provider> 
 }  

 export function useOnboardingContext() {
    return useContext(OnBoardingContext)
 }
 export default OnBoardingContext;