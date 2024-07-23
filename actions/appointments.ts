"use server"

// Import necessary modules and components
import { AppointmentUpdateProps } from "@/components/Dashboard/Doctor/UpdatedApointmentForm";
import NewAppointmentEmail from "@/components/Emails/new-appointment";
import { prismaClient } from "@/lib/db";
import { AppointmentProps } from "@/types/types";
import { Appointment } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { Resend } from "resend";

// Initialize Resend API client and base URL from environment variables
const resend = new Resend(process.env.RESEND_API_KEY);
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

// Function to create a new appointment
export async function createAppointments(data: AppointmentProps) {
    try {
        // Retrieve doctor information using the provided doctorId
        const doctor = await prismaClient.user.findUnique({
            where: {
                id: data.doctorId
            }
        });

        // Create a new appointment in the database
        const newAppointment = await prismaClient.appointment.create({
            data,
        });

        // Prepare email details for the doctor
        const firstName = doctor?.name;
        const doctorMail = doctor?.email;
        const link = `${baseUrl}/dashboard/doctor/appointments/view/${newAppointment.id}`;
        const message =
            "You have a new appointment request. Please review and approve the appointment by clicking the button below.";

        // Send notification email to the doctor
        const sendMail = await resend.emails.send({
            from: "ClinicEase <bookings@clinicease.tech>",
            to: doctorMail ?? "",
            subject: "New Appointment Notification",
            react: NewAppointmentEmail({ firstName, link, message }),
        });

        // Invalidate cache for doctor's appointments list
        revalidatePath("dashboard/doctor/appointments");

        // Log the newly created appointment and return success response
        console.log(newAppointment);
        return {
            data: newAppointment,
            status: 201,
            error: null,
        };
    } catch (error) {
        // Handle errors and return error response
        console.error(error);
        return {
            data: null,
            status: 500,
            error,
        };
    }
}

// Function to update an existing appointment
export async function updateAppointment(id: string, data: AppointmentProps) {
    try {
        // Update the appointment with the specified ID
        const updatedAppointment = await prismaClient.appointment.update({
            where: {
                id,
            },
            data,
        });

        // Invalidate cache for doctor's appointments list
        revalidatePath("/dashboard/doctor/appointments");

        // Log the updated appointment and return success response
        console.log(updatedAppointment);
        return {
            data: updatedAppointment,
            status: 200,
            error: null,
        };
    } catch (error) {
        // Handle errors and return error response
        console.log(error);
        return {
            data: null,
            status: 500,
            error,
        };
    }
}

// Function to fetch all appointments
export async function getAppointments() {
    try {
        // Fetch all appointments ordered by creation date descending
        const appointments = await prismaClient.appointment.findMany({
            orderBy: {
                createdAt: "desc",
            },
        });

        // Return success response with fetched appointments
        return {
            data: appointments,
            status: 200,
            error: null,
        };
    } catch (error) {
        // Handle errors and return error response
        console.log(error);
        return {
            data: null,
            status: 500,
            error,
        };
    }
}

// Function to fetch an appointment by its ID
export async function getAppointmentById(id: string) {
    try {
        // Fetch the appointment with the specified ID
        const appointment = await prismaClient.appointment.findUnique({
            where: {
                id,
            },
        });

        // Return the fetched appointment
        return appointment;
    } catch (error) {
        // Handle errors
        console.log(error);
    }
}

// Function to delete an appointment by its ID
export async function deleteAppointment(id: string) {
    try {
        // Delete the appointment with the specified ID
        await prismaClient.appointment.delete({
            where: {
                id,
            },
        });

        // Invalidate cache for doctor's appointments list
        revalidatePath("/dashboard/doctor/appointments");

        // Return success response
        return {
            ok: true,
            status: 200,
            error: null,
        };
    } catch (error) {
        // Handle errors and return error response
        console.log(error);
        return {
            data: null,
            status: 500,
            error,
        };
    }
}

// Function to fetch appointments for a specific patient
export async function getPatientAppointments(patientId: string) {
    try {
        // Fetch appointments for the specified patient ID
        const appointments = await prismaClient.appointment.findMany({
            orderBy: {
                createdAt: "desc",
            },
            where: {
                patientId
            }
        });

        // Return success response with fetched appointments
        return {
            data: appointments,
            status: 200,
            error: null,
        };
    } catch (error) {
        // Handle errors and return error response
        console.log(error);
        return {
            data: null,
            status: 500,
            error,
        };
    }
}

// Function to fetch the latest appointment for a specific patient
export async function getAppointmentsByPatientId(patientId: string | undefined) {
    if (patientId) {
        try {
            // Fetch the latest appointment for the specified patient ID
            const appointment = await prismaClient.appointment.findFirst({
                where: {
                    patientId
                }
            });

            // If no appointment found, return null
            if (!appointment) {
                return null;
            }

            // Return the fetched appointment
            return appointment as Appointment;
        } catch (error) {
            // Handle errors and return error response
            console.log(error);
            return {
                data: null,
                status: 500,
                error,
            };
        }
    }
}

// Function to fetch appointments for a specific doctor
export async function getDoctorAppointments(doctorId: string) {
    try {
        // Fetch appointments for the specified doctor ID
        const appointments = await prismaClient.appointment.findMany({
            orderBy: {
                createdAt: "desc",
            },
            where: {
                doctorId
            }
        });

        // Return success response with fetched appointments
        return {
            data: appointments,
            status: 200,
            error: null,
        };
    } catch (error) {
        // Handle errors and return error response
        console.log(error);
        return {
            data: null,
            status: 500,
            error,
        };
    }
}

// Function to update an appointment by its ID with updated details
export async function updatedAppointmentById(
    id: string,
    data: AppointmentUpdateProps
) {
    try {
        // Update the appointment with the specified ID using updated data
        const updatedAppointment = await prismaClient.appointment.update({
            where: {
                id,
            },
            data,
        });

        // Fetch patient details for the updated appointment
        const patientId = updatedAppointment.patientId;
        const patient = await prismaClient.user.findUnique({
            where: {
                id: patientId ?? undefined,
            },
        });

        // Prepare email details for the patient
        const firstName = patient?.name;
        const doctorMail = patient?.email || undefined;
        const link = `${baseUrl}/dashboard/user/appointments/view/${updatedAppointment.id}`;
        const message =
            "Your appointment has been approved. You can view the Details here";

        // Send notification email to the patient
        const sendMail = await resend.emails.send({
            from: "ClinicEase <bookings@clinicease.tech>",
            to: doctorMail ?? "",
            subject: "Appointment Approved",
            react: NewAppointmentEmail({ firstName, link, message }),
        });

        // Invalidate cache for doctor's and user's appointments list
        revalidatePath("/dashboard/doctor/appointments");
        revalidatePath("/dashboard/user/appointments");

        // Log the updated appointment and return success response
        console.log(updatedAppointment);
        return {
            data: updatedAppointment,
            status: 200,
            error: null,
        };
    } catch (error) {
        // Handle errors and return error response
        console.log(error);
        return {
            data: null,
            status: 500,
            error,
        };
    }
}
