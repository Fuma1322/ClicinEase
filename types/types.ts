import { ClinicProfile, UserRole } from "@prisma/client";
import { FileProps } from "@/components/FormInputs/MultipleFileUploads";

export type ServiceProps = { 
    title: string; 
    slug: string;
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

export type ClinicDetails = { 
    id: string;
    name: string;
    email: string;
    phone:string;
    slug:string[];
    clinicProfile:ClinicProfile|null;

};
export type Clinic = { 
    id: string;
    name: string;
    email: string;
    phone:string;
    slug:string[];
    clinicProfile:ClinicProfile|null;

};

// Response type for getting application by tracking number
export type GetApplicationByTrackingNumberResponse = {
    data: ClinicProfile | null;
    status: number;
    error: string | null;
  };
  export interface AppointmentProps{
    appointmentDate: Date | undefined;
    appointmentFormattedDate: string;
    appointmentMonth: string;
    clinicId: string;
    charge: number;
    appointmentTime: string;
    //Patient details
    firstName: string;
    lastName:string;
    gender: string;
    phone:string;
    email:string;
    dob?:Date;
    location:string;
    appointmentReason:string;
    medicalDocuments:string[];
    occupation:string;
    patientId?:string;
    
  }
  export interface ClinicProfile{
    firstName:string;
    lastName:string;
    gender:string;
    bio:string | null;
    operationMode:string | null;
    hourlyWage:number;
    availability:ClinicProfileAvailability | null;

  }
  interface ClinicProfileDetails extends ClinicProfile {
    id:string | null;
    yearOfExperience:number | null;
    country:string | null;
    city:string | null;
    state:string | null;
    primaryspecialization:string | null;
    otherSpecialization:string | null;
    hospitalName:string | null;
    hospitalAddress:string | null;
    hospitalContactNumber:string | null;
    hospitalEmailAddress:string | null;
    hospitalWebsite:string | null;
    hospitalHoursOfOperation:number | null;
    serviceOffered:string | null;
    insuranceAccepted:string | null;
    educatioHistory:string | null;
    research:string | null;
    accomplishments:string | null;
  }