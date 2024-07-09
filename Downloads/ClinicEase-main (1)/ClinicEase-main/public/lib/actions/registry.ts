"use server"
"use server"

import WelcomeEmail from "@/components/Emails/welcome-email";
import { prismaClient } from "@/lib/db";
import { Resend } from "resend";

export async function createClinicProfile(formdata: any) {
    // const resend = new Resend(process.env.RESEND_API_KEY);
    const { 
        address, 
        clinicName, 
        email, 
        page, 
        phone, 
        trackingNumber, 
        userId
        
    } = formdata;
    try {
        const newProfile = await prismaClient.clinicProfile.create({
            data: {
                address, 
                clinicName, 
                email, 
                page, 
                phone, 
                trackingNumber, 
                userId
            },
        });
        console.log(newProfile);
        return {
            data: newProfile,
            status: 201,
            error: null
        };
    } catch (error) {
        console.log(error);
        return {
            data: null,
            status: 500,
            error: "Something went wrong"
        };
    }
}
export async function updateClinicProfile(id:string|undefined,data:any){
    try{
        const updatedProfile = await prismaClient.clinicProfile.update({
            where:{
                id,
            },
            data,
        });
        console.log(updatedProfile);
        return {
            data: updatedProfile,
            status: 201,
            error: null,
        };
    } catch (error){
        console.log(error);
        return {
            data: null,
            status:500,
            error: "Profile was not updated",
        }
    }
}

export async function getApplicationByTrackingNumber(trackingNumber: string) {
    if (trackingNumber) {
        try {
            const existingProfile = await prismaClient.clinicProfile.findUnique({
                where: {
                    trackingNumber,
                },
            });
            if (!existingProfile) {
                return {
                    data: null,
                    status: 404,
                    error: "Wrong Tracking Number",
                };
            }
            return {
                data: existingProfile,
                status: 200,
                error: null
            };
        } catch (error) {
            console.log(error);
            return {
                data: null,
                status: 500,
                error: "Data cannot be fetched"
            };
        }
    }
}
export async function getClinicProfileById(userId: string | undefined) {
    if (userId){
        try {
            const profile = await prismaClient.clinicProfile.findUnique({
                where: {
                    userId,
                },
                include: {
                    availability:true,
                },
            });
        console.log(profile);
        return {
            data: profile,
            status: 200,
            error: null
        };
    } catch (error) {
        console.log(error);
        return {
            data: null,
            status: 500,
            error: "Profile was not fetched"
        };
    }
}
}
export async function createAvailability(data: any) {
    try {
        const newAvail = await prismaClient.availability.create({
            data});
        console.log(newAvail);
        return  newAvail;
    } catch (error) {
        console.log(error);
        return {
            data: null,
            status: 500,
            error: "Something went wrong"
        };
    }
}
export async function updateAvailabilityById(id: string |undefined, data:any ) {
    if (id){
    try {
        const updateAva = await prismaClient.availability.update({
           where: {
                id,
           },
           data,
        });
        console.log(updateAva);
        return {
            data: updateAva,
            status: 201,
            error: null,
        };
    } catch (error) {
        console.log(error);
        return {
            data: null,
            status: 500,
            error: "Avaliability was not updated",
        }
    }
}
    }
    export async function completeProfile(id:string|undefined,data:any){
        const resend = new Resend(process.env.RESEND_API_KEY);
        if (id){
            try{
                const existingProfile = await prismaClient.clinicProfile.findUnique({
                    where:{
                        id,
                    }
                });
                if (!existingProfile){
                    return {
                        data: null,
                        status: 404,
                        error: "Profile not found",
                    };

                }
                // send welcome email
                const clinicName = existingProfile.clinicName;
                const email = existingProfile.email
                const previewText = "Welcome to ClinicEase";
                const message =
                "Thank you for joining Clinicease. we are so grateful that we have you onboard ";
                const sendMail = await resend.emails.send({
                from: "ClinicEase <bookings@clinicease.tech>",
                to: email,
                subject: "Welcome to ClinicEase",
                react: WelcomeEmail({ clinicName,previewText, message }),
     });
                const updatedProfile = await prismaClient.clinicProfile.update({
                    where:{
                        id,
                    },
                    data,
                });
                console.log(updatedProfile);
                return {
                    data: updatedProfile,
                    status: 201,
                    error: null,
                };
            } catch (error){
                console.log(error);
                return {
                    data: null,
                    status:500,
                    error: "Profile was not updated",
                }
            }
        }
        }
       