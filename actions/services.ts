"use server"

// Import necessary modules and components
import { prismaClient } from "@/lib/db";
import { ServiceProps } from "@/types/types";
import { revalidatePath } from "next/cache";

// Function to create a new service
export async function createService(data: ServiceProps) {
    try {
        // Check if service with the same slug already exists
        const existingService = await prismaClient.service.findUnique({
            where: {
                slug: data.slug
            },
        });

        // If service already exists, return conflict error
        if (existingService) {
            return {
                data: null,
                status: 409,
                error: "Service already exists"
            };
        }

        // Create new service in the database
        const newService = await prismaClient.service.create({
            data,
        });

        console.log(newService);

        // Return success response
        return {
            data: newService,
            status: 201,
            error: null,
        };
    } catch (error) {
        // Handle errors and return error response
        console.error(error);

        return {
            data: null,
            status: 501,
            error: "Service not created",
        };
    }
}

export interface ServiceWithDoctorProfileCount {
    id: string;
    title: string;
    slug: string;
    imageUrl: string;
    _count:{
        doctorProfiles: number;
    };
}

// Function to fetch all services ordered by creation date
export async function getServices() {
    try {
        // Fetch all services ordered by creation date (descending)
        const services = await prismaClient.service.findMany({
           orderBy:{
                createdAt: "desc"
           },
           select: {
            id: true,
            title: true,
            slug: true,
            imageUrl: true,
            _count: {
                select:{
                    doctorProfiles:true,
                },
            },
            createdAt: true,
            updatedAt: true,
           },
        });

        // Return success response with fetched services
        return {
            data: services,
            status: 200,
            error:null,
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

// Function to delete a service by ID
export async function deleteService(id: string) {
    try {
        // Delete service with the specified ID from the database
        await prismaClient.service.delete({
           where:{
                id,
           },
        });

        // Invalidate cache for the services dashboard page
        revalidatePath("/dashboard/services")

        // Return success response
        return {
            ok: true,
            status: 200,
            error:null,
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

// Function to create multiple predefined services
export async function createManyServices() {
    try {
        // Array of predefined services to create
        const services = [
            {
                title: "UTI Consult",
                slug: "uti-consult",
                imageUrl: "",
    
            },
            {
                title: "Video Prescription Refill",
                slug: "video-refill",
                imageUrl: "",
            },
            {
                title: "In-Person Clinic Visit",
                slug: "in-person-visit",
                imageUrl: "",
    
            },
            {
                title: "Mental Health Consult",
                slug: "mental-health-consult",
                imageUrl: "",
            },
        ];

        // Iterate through services array and create each service
        for (const service of services) {
            try {
                await createService(service);
            } catch (error) {
                console.log(`Error creating service "${service.title}":`, error);
            }
        }
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

// Function to update a doctor profile with service details
export async function updateDoctorProfileWithService(id: string | undefined, data: any) {
    if (id) {
        try {
            // Update the doctor profile with the specified ID
            const updatedProfile = await prismaClient.doctorProfile.update({
                where: {
                    id,
                },
                data,
            });

            console.log(updatedProfile);

            // Invalidate cache for the doctor settings page
            revalidatePath("/dashboard/doctor/settings");

            // Return success response
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
                status:500,
                error: "Profile was not updated",
            };
        }
    }
}

// Function to fetch a service by slug
export async function getServiceBySlug(slug: string) {
    try {
        // Fetch service with the specified slug
        const service = await prismaClient.service.findUnique({
            where:{
                 slug,
            }
         });

         // Return success response with fetched service
         return {
             data: service,
             status: 200,
             error:null,
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

// Function to update a service by ID
export async function updateService(id: string, data: ServiceProps) {
    try {
        // Check if service with the specified ID exists
        const existingService = await prismaClient.service.findUnique({
            where: {
                id,
            },
        });

        // If service does not exist, return conflict error
        if (!existingService) {
            return {
                data: null,
                status: 409,
                error: "Service with that ID does not exist"
            };
        }

        // Update the service with the provided data
        const updatedService = await prismaClient.service.update({
           where:{
            id
           }, data
        });

        // Invalidate cache for the services dashboard page
        revalidatePath("/dashboard/services")

        console.log(updatedService);

        // Return success response
        return {
            data: updatedService,
            status: 201,
            error: null,
        };
    } catch (error) {
        // Handle errors and return error response
        console.error(error);

        return {
            data: null,
            status: 501,
            error: "Service not updated",
        };
    }
}
