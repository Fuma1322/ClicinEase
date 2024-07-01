"use client"
import { BasicInfoProps, ClinicDetailsProps } from "@/types/types";
import { ClinicProfile } from "@prisma/client";
import { ReactNode, createContext, useContext, useState } from "react";
import { number } from "zod";

// Wrap the entire app with the provider
interface IOnBoardingContextData {
    trackingNumber: string;
    setTrackingNumber: (value: string) => void;
    clinicProfileId: string;
    setClinicProfileId: (value: string) => void;

    // TRACK THE FORM DATA
    basicData: BasicInfoProps;
    clinicData: ClinicDetailsProps
    savedDBData:any
    setSavedDBData:(data:any)=>void
    setBasicData: (data: BasicInfoProps) => void;
    setClinicData: (data:ClinicDetailsProps) => void;
}

const initialBasicData: BasicInfoProps = {
    clinicName: "",
    email: "",
    phone: "",
    address: "",
    profilePicture: "",
    page: "",
    userId: "",
    trackingNumber: "",
};

const initialClinicData: ClinicDetailsProps = {
    page: "",
    duration: "",
    availability: "",
    specialization: "",
    servicesOffered: [],
    clinicHours: 0
};

const initialContextData: IOnBoardingContextData = {
    trackingNumber: "",
    clinicProfileId: "",
    setTrackingNumber: () => {},
    setClinicProfileId: () => {},
    setBasicData: () => {},
    setClinicData: () => {},
    basicData: initialBasicData,
    clinicData: initialClinicData,
    savedDBData:{},
    setSavedDBData:()=>{}
};

const OnBoardingContext = createContext<IOnBoardingContextData>(initialContextData);

// Creating and exporting the context provider
export function OnboardingContextProvider({ children }: { children: ReactNode }) {
    const [trackingNumber, setTrackingNumber] = useState("");
    const [clinicProfileId, setClinicProfileId] = useState("");
    const [basicData, setBasicData] = useState<BasicInfoProps>(initialBasicData);
    const [clinicData, setClinicData] = useState<ClinicDetailsProps>(
        initialClinicData);
     
    const [savedDBData, setSavedDBData] = useState<any>({});

    const contextValues = {
        trackingNumber,
        setTrackingNumber,
        clinicProfileId,
        setClinicProfileId,
        basicData,
        setBasicData,
        clinicData,
        setClinicData,
        savedDBData, 
        setSavedDBData
    };

    return (
        <OnBoardingContext.Provider value={contextValues}>
            {children}
        </OnBoardingContext.Provider>
    );
}

// Creating and exporting useContext
export function useOnboardingContext() {
    return useContext(OnBoardingContext);
}

export default OnBoardingContext;
