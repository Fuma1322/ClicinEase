//context => useSTate to a global Level 
"use client"

import { AdditionalFormProps, BioDataFormProps, ContactFormProps, EducationFormProps, PracticeFormProps, ProfileFormProps } from "@/types/types";
import DoctorProfile  from "@prisma/client";
import { createContext, ReactNode, useContext, useState } from "react";

interface IOnBoardingContextData {
    trackingNumber: string;
    doctorProfileId: string; 
    setTrackingNumber: (value: string) => void;
    setDoctorProfileId: (value: string) => void;

    // TRACK THE FORM DATA
    bioData: BioDataFormProps;
    profileData: ProfileFormProps;
    contactData: ContactFormProps;
    educationData: EducationFormProps;
    practiceData: PracticeFormProps;
    additionalData: AdditionalFormProps;
    savedDBData: any;
    setSavedDBData: (data:any) => void;
    setBioData: (data: BioDataFormProps) => void;
    setProfileData: (data: ProfileFormProps) => void;
    setContactData: (data: ContactFormProps) => void;
    setEducationData: (data: EducationFormProps) => void;
    setPracticeData: (data: PracticeFormProps) => void;
    setAdditionalData: (data: AdditionalFormProps) => void;
}


const initialBioData: BioDataFormProps = {
    page: "",
    firstName: "",
    lastName: "",
    middleName: "",
    dob: "",
    gender: "",
    userId: "",
    trackingNumber: "",  
};

const initialProfileData: ProfileFormProps = {
    profilePicture: "",
    bio: "",
    yearsOfExperience: 0,
    page: "",
    medicalLicense: "",
    medicalLicenseExpiry: "", 
};

const initialContactData: ContactFormProps = {
    email: "",
    phone: "",
    country: "",
    city: "",
    state: "",
    page: "",
};

const initialEducationData: EducationFormProps = {
    medicalSchool: "",
    graduationYear: 0,
    primarySpecialization: "",
    otherSpecialities: [],
    docCertificates: [],
    page: "",
};

const initialPracticeData: PracticeFormProps = {
    organizationName: "",
    organizationAddress: "",
    organizationContactNumber: "",
    organizationEmailAddress: "",
    organizationWebsite: "",
    organizationHoursOfOperarion: 0,
    servicesOffered: [],
    insuranceAccepted: "",
    page: "",
};

const initialAdditionalData: AdditionalFormProps = {
    educationHistory: "",
    research: "",
    accomplishments: "",
    additionalDocs: [],
    page: "",
};

const initialContextData: IOnBoardingContextData = {
    setTrackingNumber: () => {},
    setDoctorProfileId: () => {},
    setBioData: () => {},
    setProfileData: () => {},
    setContactData: () => {},
    setEducationData: () => {},
    setPracticeData: () => {}, // Corrected typo here
    setAdditionalData: () => {},
    savedDBData: {},
    setSavedDBData: () => {},
    trackingNumber: "",
    doctorProfileId: "",
    bioData: initialBioData,
    profileData: initialProfileData,
    contactData: initialContactData,
    educationData: initialEducationData,
    practiceData: initialPracticeData,
    additionalData: initialAdditionalData,
};

const OnBoardingContext = createContext<IOnBoardingContextData>(initialContextData);

export function OnboardingContextProvider({
    children,
}: {
    children: ReactNode;
}) {
    const [trackingNumber, setTrackingNumber] = useState<string>("");
    const [doctorProfileId, setDoctorProfileId] = useState<string>("");
    const [bioData, setBioData] = useState<BioDataFormProps>(initialBioData);
    const [profileData, setProfileData] = useState<ProfileFormProps>(initialProfileData);
    const [contactData, setContactData] = useState<ContactFormProps>(initialContactData);
    const [educationData, setEducationData] = useState<EducationFormProps>(initialEducationData);
    const [practiceData, setPracticeData] = useState<PracticeFormProps>(initialPracticeData);
    const [additionalData, setAdditionalData] = useState<AdditionalFormProps>(initialAdditionalData);
    const [savedDBData, setSavedDBData] = useState<any>({});
    console.log(savedDBData);

    const contextValues = {
        trackingNumber,
        setTrackingNumber,
        doctorProfileId,
        setDoctorProfileId,
        bioData,
        setBioData,
        profileData,
        setProfileData,
        contactData,
        setContactData,
        educationData,
        setEducationData,
        practiceData,
        setPracticeData,
        additionalData,
        setAdditionalData,
        savedDBData,
        setSavedDBData,
    };

    return <OnBoardingContext.Provider value={contextValues}>{children}</OnBoardingContext.Provider>;
}

export function useOnboardingContext() {
    return useContext(OnBoardingContext);
}

export default OnBoardingContext;
