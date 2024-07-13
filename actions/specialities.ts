"use server"

import { SpecialityProps } from "@/components/Dashboard/SpecialityForm";
import { prismaClient } from "@/lib/db";

import { revalidatePath } from "next/cache";


export async function createSpeciality(data: SpecialityProps) {
    try {
        if (!data.slug) {
            return {
                data: null,
                status: 400,
                error: "Slug is required",
            };
        }

        const existingSpeciality = await prismaClient.speciality.findUnique({
            where: {
                slug: data.slug,
            },
        });

        if (existingSpeciality) {
            return {
                data: null,
                status: 409,
                error: "Speciality already exists",
            };
        }

        const newSpeciality = await prismaClient.speciality.create({
            data,
        });
        revalidatePath("/dashboard/speciality");
        console.log(newSpeciality);
        return {
            data: newSpeciality,
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


export async function getSpecialityBySlug(slug:string) {
    try {
        const speciality = await prismaClient.speciality.findMany({
           where:{
                slug
           },
        });
        return {
            data: speciality,
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

export async function getSpecialities() {
    try {
        const specialities = await prismaClient.speciality.findMany({
           orderBy:{
                createdAt: "desc"
           },
        });
        return {
            data: specialities,
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
export async function createManySpecialities() {
   
    try {
        const speciality = [
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
            ,
        ];
        for (const speciality of specialities) {
            try {
                await createSpeciality(speciality);
            } catch (error) {
                console.log(`Error creating service "${speciality.title}":`, error);
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
export async function deleteSpeciality( id : string) {
    try {
        await prismaClient.speciality.delete({
           where:{
                id,
           },
        });
        revalidatePath("/dashboard/speciality")
        return {
            ok: true,
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

export async function updateSpeciality(id:string, data:SpecialityProps) {
    try {
        const existingSpeciality = await prismaClient.speciality.findUnique({
            where: {
                id,
            },
        });

        if (!existingSpeciality) {
            return {
                data: null,
                status: 404,
                error: "Specialty does not exist",
            };
        }
        const updatedSpecialty = await prismaClient.speciality.update({
            where:{
                id
            },
             data,
        });
        revalidatePath("/dashboard/speciality")
        console.log(updatedSpecialty);

        return {
            data: updatedSpecialty,
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