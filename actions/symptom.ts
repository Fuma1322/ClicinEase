"use server"

import { SpecialityProps } from "@/components/Dashboard/SpecialityForm";
import { SymptomProps } from "@/components/Dashboard/SymptomForm";
import { prismaClient } from "@/lib/db";
import { revalidatePath } from "next/cache";


export async function createSymptom(data: SymptomProps) {
    try {
        const existingSymptom = await prismaClient.symptom.findUnique({
            where: {
                slug: data.slug
            },
        });

        if (existingSymptom) {
            return {
                data: null,
                status: 409,
                error: "Symptom already exists"
            };
        }
        const newSymptom = await prismaClient.symptom.create({
            data,
        });
        revalidatePath("/dashboard/symptoms")
        console.log(newSymptom);
        return {
            data: newSymptom,
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

export async function getSymptoms() {
    try {
        const symptoms = await prismaClient.symptom.findMany({
           orderBy:{
                createdAt: "desc"
           },
        });
        return {
            data: symptoms,
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
        const services = [
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
        revalidatePath("/dashboard/specialities")
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