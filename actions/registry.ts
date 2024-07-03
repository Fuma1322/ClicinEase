"use server"

import { prismaClient } from "@/lib/db";
import { BasicInfoProps, RegisterInputProps } from "@/types/types";
import bcrypt from "bcrypt";
import { Resend } from "resend";
import EmailTemplate from "@/components/Emails/emailstemplate";
import { error } from "console";

export async function createClinicProfile(formdata: any) {
    const resend = new Resend(process.env.RESEND_API_KEY);
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