import { ClinicProfile, UserRole } from "@prisma/client";

export type ServiceProps = { 
    title: string; 
    image: string; 
    slug: string 
};

export type RegisterInputProps = {
    fullName: string;
    email: string;
    phone: string;
    password: string;
    role: any;
}

export type LoginInputProps = {
    email: string;
    password: string;
}

export type BasicInfoProps = {
    clinicName: string;
    email: string;
    phone: string;
    address: string;
    profilePicture: any;
    page: string;
    userId?: string | undefined;
    trackingNumber: string;
    
}

export type ClinicDetailsProps = { 
    page: string;
    duration: string;
    availability: string;
    specialization:string;
    servicesOffered:string[];
    clinicHours:number;

};

// Response type for getting application by tracking number
export type GetApplicationByTrackingNumberResponse = {
    data: ClinicProfile | null;
    status: number;
    error: string | null;
  };