"use server"

import NewAppointmentEmail from "@/components/Emails/new-appointment";
import { prismaClient } from "@/lib/db";
import { AppointmentProps, ServiceProps } from "@/types/types";
import { error } from "console";
import { revalidatePath } from "next/cache";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function createAppointments(data:AppointmentProps) {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    try {
        const doctor = await prismaClient.user.findUnique({
            where:{
                id:data.clinicId
            }
        })
        const newAppointment = await prismaClient.appointment.create({
            data,
        });
        const firstName = doctor?.name;
        const doctorMail = doctor?.email;
        const link = `${baseUrl}/dashboard/doctor/appointments/view/${newAppointment.id}`;
        const message =
       "You have a new appointment request. Please review and approve the appointment by clicking the button below.";
        const sendMail = await resend.emails.send({
       from: "ClinicEase <bookings@clinicease.tech>",
       to: doctorMail??"",
       subject: "New Appointment Notification",
       react: NewAppointmentEmail({ firstName, link, message }),
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
export async function getPatientAppointments(patientId:string) {
    try {
        const appointments = await prismaClient.appointment.findMany({
        orderBy: {
            createAt: "desc",
        },
        where:{
            patientId
        }
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

export async function getDoctorAppointments(doctorId:string) {
    try {
        const appointments = await prismaClient.appointment.findMany({
        orderBy: {
            createAt: "desc",
        },
        where:{
            doctorId
        }
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