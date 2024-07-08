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
export async function createManyServices() {
   
    try {
        const services = [
            {
                title: "UTI Consult",
                slug: "uti-consult",
    
            },
            {
                title: "video prescription refill",
                slug: "video-refill",
            },
            {
                title: "In person clinic visit",
                slug: "in-person-visit",
    
            },
            {
                title: "Mental Health Consult",
                slug: "mental-health-consult",
            },
        ];
        for (const service of services) {
            try {
                await createService(services);
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