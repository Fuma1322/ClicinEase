"use server"

// Import necessary modules and components
import WelcomeEmail from "@/components/Emails/welcome-email";
import { prismaClient } from "@/lib/db";
import { Resend } from "resend";

// Initialize Resend API client
const resend = new Resend(process.env.RESEND_API_KEY);

// Function to create a new doctor profile
export async function createDoctorProfile(formData: any) {
    // Destructure form data for easier access
    const {
        page,
        firstName,
        lastName,
        middleName,
        dob,
        gender,
        userId,
        trackingNumber,
    } = formData;

    try {
        // Create a new doctor profile in the database
        const newProfile = await prismaClient.doctorProfile.create({
            data: {
                page,
                firstName,
                lastName,
                middleName,
                dob,
                gender,
                userId,
                trackingNumber,
            },
        });

        // Log the newly created profile and return success response
        console.log(newProfile);
        return {
            data: newProfile,
            status: 201,
            error: null,
        };
    } catch (error) {
        // Handle errors and return error response
        console.log(error);
        return {
            data: null,
            status: 500,
            error: "Something went wrong"
        };
    }
}

// Function to update an existing doctor profile by ID
export async function updateDoctorProfile(id: string | undefined, data: any) {
    if (id) {
        try {
            // Update the doctor profile with the specified ID
            const updatedProfile = await prismaClient.doctorProfile.update({
                where: {
                    id
                },
                data,
            });

            // Log the updated profile and return success response
            console.log(updatedProfile);
            return {
                data: updatedProfile,
                status: 201,
                error: null,
            };
        } catch (error) {
            // Handle errors and return error response
            console.log(error);
            return {
                data: null,
                status: 500,
                error: "Profile was not updated."
            };
        }
    }
}

// Function to fetch a doctor profile by tracking number
export async function getApplicationByTrack(trackingNumber: string) {
    if (trackingNumber) {
        try {
            // Fetch the doctor profile with the specified tracking number
            const existingProfile = await prismaClient.doctorProfile.findUnique({
                where: {
                    trackingNumber,
                }
            });

            // If profile not found, return error response
            if (!existingProfile) {
                return {
                    data: null,
                    status: 404,
                    error: "Wrong Tracking Number",
                };
            }

            // Return success response with fetched profile
            return {
                data: existingProfile,
                status: 200,
                error: null,
            };
        } catch (error) {
            // Handle errors and return error response
            console.log(error);
            return {
                data: null,
                status: 500,
                error: "Something went wrong",
            };
        }
    }
}

// Function to fetch a doctor profile by ID
export async function getDoctorById(id: string) {
    if (id) {
        try {
            // Fetch the doctor profile with the specified ID
            const existingProfile = await prismaClient.doctorProfile.findUnique({
                where: {
                    id
                }
            });

            // If profile not found, return error response
            if (!existingProfile) {
                return {
                    data: null,
                    status: 404,
                    error: "Wrong Tracking Number",
                };
            }

            // Return success response with fetched profile
            return {
                data: existingProfile,
                status: 200,
                error: null,
            };
        } catch (error) {
            // Handle errors and return error response
            console.log(error);
            return {
                data: null,
                status: 500,
                error: "Something went wrong",
            };
        }
    }
}

// Function to create availability for a doctor
export async function createAvailability(data: any) {
    try {
        // Create new availability record in the database
        const newAvail = await prismaClient.availability.create({
            data
        });
        console.log(newAvail);
        return newAvail;
    } catch (error) {
        // Handle errors and return error response
        console.log(error);
        return {
            data: null,
            status: 500,
            error: "Something went wrong"
        };
    }
}

// Function to update availability by ID
export async function updateAvailabilityById(id: string | undefined, data: any) {
    if (id) {
        try {
            // Update availability record with specified ID
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
            // Handle errors and return error response
            console.log(error);
            return {
                data: null,
                status: 500,
                error: "Availability was not updated",
            }
        }
    }
}

// Function to complete doctor profile and send welcome email
export async function completeProfile(id: string | undefined, data: any) {
    // Ensure ID is valid before proceeding
    if (id) {
        try {
            // Fetch existing profile to check validity
            const existingProfile = await prismaClient.doctorProfile.findUnique({
                where: {
                    id,
                }
            });

            // If profile not found, return error response
            if (!existingProfile) {
                return {
                    data: null,
                    status: 404,
                    error: "Profile Not Found",
                };
            }

            // Prepare and send welcome email to the doctor
            const firstName = existingProfile.firstName;
            const email = existingProfile.email as string;
            const previewText = "Welcome to ClinicEase";
            const message =
                "Thank you for joining ClinicEase. We are so grateful to have you onboard.";

            // Send the welcome email
            const sendMail = await resend.emails.send({
                from: "ClinicEase <bookings@clinicease.tech>",
                to: email,
                subject: "Welcome to ClinicEase",
                react: WelcomeEmail({ firstName, previewText, message }),
            });

            // Update the doctor profile with provided data
            const updatedProfile = await prismaClient.doctorProfile.update({
                where: {
                    id,
                },
                data,
            });

            // Log the updated profile and return success response
            console.log(updatedProfile);
            return {
                data: updatedProfile,
                status: 201,
                error: null,
            };
        } catch (error) {
            // Handle errors and return error response
            console.log(error);
            return {
                data: null,
                status: 500,
                error: "Profile was not updated",
            };
        }
    }
}

// Function to fetch doctor profile by user ID
export async function getDoctorProfileById(userId: string | undefined) {
    // Ensure user ID is valid before proceeding
    if (userId) {
        try {
            // Fetch doctor profile with associated availability details
            const profile = await prismaClient.doctorProfile.findUnique({
                where: {
                    userId,
                },
                include: {
                    availability: true,
                }
            });

            // Log the fetched profile and return success response
            console.log(profile);
            return {
                data: profile,
                status: 201,
                error: null,
            };
        } catch (error) {
            // Handle errors and return error response
            console.log(error);
            return {
                data: null,
                status: 500,
                error: "Profile was not fetched."
            };
        }
    }
}
