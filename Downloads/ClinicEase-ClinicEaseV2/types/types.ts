import { UserRole } from '@prisma/client';


export type ServiceProps={
    title:string;
    image:string; 
    slug:string};

export type RegisterInputProps={
    fullName: string;
    email: string;
    password: string;
    phone: string;
    role: any;
    plan: any;
};

export type LoginInputProps={
    email: string;
    password: string;
};

export type BioDataFormProps = {
    page: string;
    firstName: string;
    lastName: string;
    middleName: any;
    dob: any;
    gender: string;
    userId: string;
    trackingNumber: string;
};

export type ProfileFormProps = {
    profilePicture: string;
    bio: string;
    yearsOfExperience: number;
    page: string;
    medicalLicense: string;
    medicalLicenseExpiry: any;
};

export type ContactFormProps={
    email: string;
    phone: string;
    country: string;
    city: string;
    state: string;
    page: string;
};

export type EducationFormProps = {
    medicalSchool: string;
    graduationYear: number;
    primarySpecialization: string;
    otherSpecialities: string[];
    docCertificates: any;
    page: string;
};

export type PracticeFormProps = {
    clinicName: string;
    clinicAddress: any;
    clinicContactNumber: string;
    clinicEmailAddress: string;
    clinicWebsite: any;
    clinicHoursOfOperarion: any;
    servicesOffered: string[];
    insuranceAccepted: string;
    languagesSpoken: string[];
    page: string;
};

export type AdditionalFormProps = {
    educationHistory: string;
    research: string;
    accomplishments: string;
    additionalDocs: any;
    page: string;
};

export type AvailabilityFormProps = {
    availabilityType: string;
    meetingDuration: string;
    accomplishments: string;
    additionalDocs: string[];
    page: string;
};
