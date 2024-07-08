import { UserRole } from '@prisma/client';


export type ServiceProps={title:string; image:string; slug:string};

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
    firstName: string;
    lastName: string;
    middleName?: string;
    dob?: Date;
    gender: string;
    profilePicture?: string;
    bio: string;
    page: string;
    medicalLicense: string;
    medicalLicenseExpiry?: Date;
}