import { doctorProfile, UserRole } from "@prisma/client";
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
};
export type stats = {
  doctors: string;
  patients: string;
  appointments: string;
  services: string;
};

export type DoctorProfileAvailability = {
    monday: string[];
    tueday: string[];
    wednesday: string[];
    thursday: string[];
    friday: string[];
    saturday: string[];
    sunday: string[];
    
};

export type DoctorDetail = { 
    id: string;
    name: string;
    email: string;
    phone:string;
    slug:string[];
    doctorProfile:DoctorProfile|null;

};
export type Doctor = { 
    id: string;
    name: string;
    email: string;
    phone:string;
    slug:string[];
    doctorProfile:DoctorProfile|null;

};

export type GetApplicationByTrackingNumberResponse = {
    data: DoctorProfile | null;
    status: number;
    error: string | null;
  };
  export interface AppointmentProps{
    appointmentDate: Date | undefined;
    appointmentFormattedDate: string;
    appointmentMonth: string;
    doctorId: string;
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
    patientId:string;
    status: AppointmentStatus;
    meetingLink: string;
    meetingProvider: string;
  }
  export interface DoctorProfile{
    firstName:string;
    lastName:string;
    gender:string;
    bio:string | null;
    operationMode:string | null;
    hourlyWage:number;
    availability:DoctorProfileAvailability | null;

  }
  interface DoctorProfileDetails extends DoctorProfile {
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