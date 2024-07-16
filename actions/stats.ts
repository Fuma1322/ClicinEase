"use server"

import { prismaClient } from "@/lib/db";

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
