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
    middleName?: string;
    dob?: Date;
    gender: string;
    userId?: string | undefined;
    trackingNumber: string;
};

export type ProfileFormProps = {
    profilePicture?: string;
    bio: string;
    yearsOfExperience: number;
    page: string;
    medicalLicense: string;
    medicalLicenseExpiry?: Date;
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
    docCertificates: string[];
    page: string;
};

export type PracticeFormProps = {
    clinicName: string;
    clinicAddress: number;
    clinicContactNumber: string;
    clinicEmailAddress: string;
    clinicWebsite?: string;
    clinicHoursOfOperarion: string;
    servicesOffered: string[];
    insuranceAccepted: string;
    languagesSpoken: string[];
    page: string;
};

export type AdditionalFormProps = {
    educationHistory: string;
    research: string;
    accomplishments: string;
    additionalDocs: string[];
    page: string;
};

export type AvailabilityFormProps = {
    availabilityType: string;
    meetingDuration: string;
    accomplishments: string;
    additionalDocs: string[];
    page: string;
};
