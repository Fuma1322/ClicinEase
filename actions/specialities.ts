"use server"

// Import necessary modules and components
import { SpecialityProps } from "@/components/Dashboard/SpecialityForm";
import { prismaClient } from "@/lib/db";
import { revalidatePath } from "next/cache";

// Function to create a new speciality
export async function createSpeciality(data: SpecialityProps) {
    try {
        // Validate if slug is provided
        if (!data.slug) {
            return {
                data: null,
                status: 400,
                error: "Slug is required",
            };
        }

        // Check if speciality with the same slug already exists
        const existingSpeciality = await prismaClient.speciality.findUnique({
            where: {
                slug: data.slug,
            },
        });

        // If speciality already exists, return conflict error
        if (existingSpeciality) {
            return {
                data: null,
                status: 409,
                error: "Speciality already exists",
            };
        }

        // Create new speciality in the database
        const newSpeciality = await prismaClient.speciality.create({
            data,
        });

        // Invalidate cache for the specialities dashboard page
        revalidatePath("/dashboard/speciality");

        console.log(newSpeciality);

        // Return success response
        return {
            data: newSpeciality,
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

// Function to fetch a speciality by slug
export async function getSpecialityBySlug(slug: string) {
    try {
        // Fetch speciality with the specified slug
        const speciality = await prismaClient.speciality.findUnique({
           where:{
                slug
           },
        });

        // If speciality not found, return not found error
        if (!speciality) {
            return {
                data: null,
                status: 404,
                error: "Speciality not found",
            };
        }

        // Return success response with fetched speciality
        return {
            data: speciality,
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

// Function to fetch all specialities ordered by creation date
export async function getSpecialities() {
    try {
        // Fetch all specialities ordered by creation date (descending)
        const specialities = await prismaClient.speciality.findMany({
           orderBy:{
                createdAt: "desc"
           },
        });

        // Return success response with fetched specialities
        return {
            data: specialities,
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

// Function to delete a speciality by ID
export async function deleteSpeciality(id: string) {
    try {
        // Delete speciality with the specified ID from the database
        await prismaClient.speciality.delete({
           where:{
                id,
           },
        });

        // Invalidate cache for the specialities dashboard page
        revalidatePath("/dashboard/speciality");

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

// Function to update a speciality by ID
export async function updateSpeciality(id: string, data: SpecialityProps) {
    try {
        // Check if speciality with the specified ID exists
        const existingSpeciality = await prismaClient.speciality.findUnique({
            where: {
                id,
            },
        });

        // If speciality does not exist, return not found error
        if (!existingSpeciality) {
            return {
                data: null,
                status: 404,
                error: "Specialty does not exist",
            };
        }

        // Update the speciality with the provided data
        const updatedSpecialty = await prismaClient.speciality.update({
            where:{
                id
            },
             data,
        });

        // Invalidate cache for the specialities dashboard page
        revalidatePath("/dashboard/speciality");

        console.log(updatedSpecialty);

        // Return success response
        return {
            data: updatedSpecialty,
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

// Function to create multiple predefined specialities
export async function createManySpecialities() {
    try {
        // Array of predefined specialities to create
        const specialities = [
            {
                title: "Primary Care",
                slug: "primary-care",
    
            },
            {
                title: "Dermatology",
                slug: "dermatolog",
    
            },
            {
                title: "Dental",
                slug: "dental",
            },
        ];

        // Iterate through specialities array and create each speciality
        for (const speciality of specialities) {
            try {
                await createSpeciality(speciality);
            } catch (error) {
                console.log(`Error creating speciality "${speciality.title}":`, error);
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
