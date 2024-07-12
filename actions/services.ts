"use server"

import { prismaClient } from "@/lib/db";
import { ServiceProps } from "@/types/types";
import { revalidatePath } from "next/cache";


export async function createService(data:ServiceProps) {
    try {
        const existingService = await prismaClient.service.findUnique({
            where: {
                slug: data.slug
            },
        });

        if (existingService) {
            return {
                data: null,
                status: 409,
                error: "Service already exists"
            };
        }

        // const formattedTitle = { set: [data.title] };

        const newService = await prismaClient.service.create({
            data,
        });

        console.log(newService);

        return {
            data: newService,
            status: 201,
            error: null,
        };
    } catch (error) {
        console.error(error);

        return {
            data: null,
            status: 501,
            error: "Service not created",
        };
    }
}

export async function updateService(id:string, data:ServiceProps) {
    try {
        const existingService = await prismaClient.service.findUnique({
            where: {
                slug: data.slug
            },
        });

        if (existingService) {
            return {
                data: null,
                status: 409,
                error: "Service already exists"
            };
        }

        // const formattedTitle = { set: [data.title] };

        const newService = await prismaClient.service.create({
            data,
        });

        console.log(newService);

        return {
            data: newService,
            status: 201,
            error: null,
        };
    } catch (error) {
        console.error(error);

        return {
            data: null,
            status: 501,
            error: "Service not created",
        };
    }
}

export async function getServices() {
    try {
        const services = await prismaClient.service.findMany({
           orderBy:{
                createdAt: "desc"
           }
        });
        return {
            data: services,
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

export async function getServiceBSlug(slug: string) {
    try {
     if(slug){
        const service = await prismaClient.service.findUnique({
            Where:{
                 slug,
            }
         });
         return {
             data: service,
             status: 200,
             error:null,
         };
     }   
    } catch (error) {
        console.log(error)
        return {
            data: null,
            status: 500,
            error,
    };
    }
}

export async function createManyServices() {
   
    try {
        const services = [
            {
                title: "UTI Consult",
                slug: "uti-consult",
                imageUrl: "",
    
            },
            {
                title: "video prescription refill",
                slug: "video-refill",
                imageUrl: "",
            },
            {
                title: "In person clinic visit",
                slug: "in-person-visit",
                imageUrl: "",
    
            },
            {
                title: "Mental Health Consult",
                slug: "mental-health-consult",
                imageUrl: "",
            },
        ];
        for (const service of services) {
            try {
                await createService(service);
            } catch (error) {
                console.log(`Error creating service "${service.title}":`, error);
            }
        }
    } catch (error) {
        console.log(error)
        return {
            data: null,
            status: 500,
            error,
        };
    }
}

export async function updateDoctorProfileWithService(
    id: string | undefined,
    data:any
) {
    if (id) {
        try {
        const updatedProfile = await prismaClient.doctorProfile.update({
            where: {
                id,
            },
            data,
        });
        console.log(updatedProfile);
        revalidatePath("/dashboard/doctor/settings");
        return {
            data: updatedProfile,
            status: 201,
            error: null,
        };
    } catch (error) {
        console.log(error);
        return {
            data: null,
            status:500,
            error: "Profile was not updated",
        };
    }
}
}