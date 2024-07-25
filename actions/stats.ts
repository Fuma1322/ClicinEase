"use server"

import { prismaClient } from "@/lib/db";
import { count } from "console";
import { AlarmClock, DollarSign, LucideIcon, Mail, User, Users } from "lucide-react";
import { getDoctorAppointments } from "./appointments";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export type DoctorAnalyticProps = {
    title: string;
    count: number;
    icon:LucideIcon;
    unit: string;
    detailLink: string
};
// Function to fetch statistics (counts) from the database
export async function getStats() {
    try {
        // Fetch count of services from the database
        const serviceCount = await prismaClient.service.count();

        // Fetch count of doctor profiles from the database
        const doctorCount = await prismaClient.doctorProfile.count();

        // Fetch count of appointments from the database
        const appointmentCount = await prismaClient.appointment.count();

        // Construct stats object with formatted counts
        const stats = {
            doctors: doctorCount.toString().padStart(2, "0"),  // Format doctor count with leading zeros if necessary
            patients: "00",  // Placeholder for patients count (not implemented)
            appointments: "00",  // Placeholder for appointments count (not implemented)
            services: serviceCount.toString().padStart(2, "0"),  // Format service count with leading zeros if necessary
        };

        // Return the constructed stats object
        return stats;
    } catch (error) {
        // Handle errors and return null values for all stats in case of error
        console.log(error);
        return {
            doctors: null,
            patients: null,
            appointments: null,
            services: null,
        };
    }
}

export async function getDoctorAnalytics() {
    try {
        const session = await getServerSession(authOptions);
        const user = session?.user;
        const appointments = (await getDoctorAppointments(user?.id??"")).data || [];

        const analytics = [
            {
                title: "Appointments",
                count: appointments.length??0,
                icon: AlarmClock,
                unit:"",
                detailLink:"/dashboard/doctor/appointments"
            },
            {
                title: "Patients",
                count: 100,
                icon: Users,
                unit:"",
                detailLink:"/dashboard/doctor/patients"
            },
            {
                title: "Inbox",
                count: 100,
                icon: Mail,
                unit:"",
                detailLink:"/dashboard/doctor/inbox"
            },
            
        ]
       

        // Return the constructed stats object
        return analytics as DoctorAnalyticProps[];
    } catch (error) {
        // Handle errors and return null values for all stats in case of error
        console.log(error);
        return [];
    }
}
