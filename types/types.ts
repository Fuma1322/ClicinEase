// import { doctorProfile, UserRole } from '@prisma/client';

import { AppointmentStatus } from "@prisma/client";


export type ServiceProps={
    title:string;
    imageUrl:string; 
    slug:string;
}

export type SpecialityProps={
    title:string; 
    slug:string;
}

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
    organizationName: string;
    organizationAddress: any;
    organizationContactNumber: string;
    organizationEmailAddress: string;
    organizationWebsite: any;
    organizationHoursOfOperarion: any;
    servicesOffered: string[];
    insuranceAccepted: string;
    page: string;
    hourlyWage: number;
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
      slug:string;
      doctorProfile:DoctorProfileDetail | null;
  
  };
  export type Doctor = { 
      id: string;
      name: string;
      email: string;
      phone: string;
      slug: string;
      doctorProfile: DoctorProfile | null;
  
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
  interface DoctorProfileDetail extends DoctorProfile {
    id:string | null;
    yearOfExperience:number | null;
    country:string | null;
    city:string | null;
    state:string | null;
    primaryspecialization:string | null;
    otherSpecialization:string | null;
    organizationName:string | null;
    organizationAddress:string | null;
    organizationContactNumber:string | null;
    organizationEmailAddress:string | null;
    organizationWebsite:string | null;
    organizationHoursOfOperation:number | null;
    serviceOffered:string | null;
    insuranceAccepted:string | null;
    educatioHistory:string | null;
    research:string | null;
    accomplishments:string | null;
  }