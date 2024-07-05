"use server"

import { prismaClient } from "@/lib/db";
import { AppointmentProps, ServiceProps } from "@/types/types";
import { error } from "console";
import { revalidatePath } from "next/cache";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function createAppointments(data:AppointmentProps) {
    try {

        // const formattedTitle = { set: [data.title] };

        const newAppointment = await prismaClient.appointment.create({
            data,
        });
        const clinicName = newUser.name.split(" ")[0];
        const linkText = "Verify your Account ";
        const message =
       "Thank you for registering with Clinicease. To complete your registration and verify your email address, please enter the following 6-digit verification code on our website :";
        const sendMail = await resend.emails.send({
       from: "ClinicEase <bookings@clinicease.tech>",
       to: email,
       subject: "New Appointment",
       react: EmailTemplate({ firstName, token, linkText, message }),
     });
        revalidatePath("dashboard/clinic/appointments")
        console.log(newAppointment);
        return {
            data: newAppointment,
            status: 201,
            error: null,
        };
    } catch (error) {
        console.error(error);

        return {
            data: null,
            status: 500,
            error,
        };
    }
}

export async function updateAppointment(id:string,data:AppointmentProps) {
    try {
        const updatedAppointment = await prismaClient.appointment.update({
            where: {
                id,
            },
            data,
        });
        revalidatePath("/dashboard/clinic/appointments");
        console.log(updateAppointment);
        return {
            data:updateAppointment,
            status: 200,
            error:null,
        };
    } catch (error) {
        console.log(error)
        return {
            data: null,
            status: 500,
            error,
    };
    }
}
export async function getAppointments() {
    try {
        const appointments = await prismaClient.appointment.findMany({
        orderBy: {
            createAt: "desc",
        },
        });
        return {
            data: appointments,
            status: 200,
            error: null,
        }
    } catch (error) {
        console.log(error);
        return{
            data: null,
            status:500,
            error,
        };
    }
}
export async function getAppointmentById(id:string){
    try {
        if (id){
            const appointment = await prismaClient.appointment.findUnique({\
                where: {
                    id,
                },
            });
            return appointment;
        }
    } catch (error) {
        console.log(error);
       
    }

}
export async function deleteAppointment(id:string){
    try {
        await prismaClient.appointment.delete({
            where: {
                id,
            },
        });
        revalidatePath("/dashboard/clinic/appointments");
        return {
            ok: true,
            status:200,
            error:null,
        }
    } catch (error) {
        console.log(error)
        return {
            data: null,
            status: 500,
            error,
        }       
    }
}