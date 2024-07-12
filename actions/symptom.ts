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
export async function createManySymptoms() {
   
    try {
        const symptoms = [
            {
                title: "Eczema",
                slug: "eczema",
    
            },
            {
                title: "Dizziness",
                slug: "dizziness",
    
            },
            {
                title: "Fever",
                slug: "fever",
            },
            {
                title: "Sore Throat",
                slug: "sore-throat",
            },
            {
                title: "Itchy Skin",
                slug: "itchy-skin",
            },
            {
                title: "Ear Infection",
                slug: "ear-infection",
            },
            {
                title: "Vaginal Itching",
                slug: "vaginal-itching",
            },
            {
                title: "Asthma",
                slug: "asthma",
            },
            {
                title: "Erectile Dysfuction",
                slug: "erectile-dysfunction",
            },
            {
                title: "Back Pain",
                slug: "back-pain",
            },
            {
                title: "UTI",
                slug: "uti",
            },
            {
                title: "Depression",
                slug: "depsression",
            },
            {
                title: "Anxiety",
                slug: "Anxiety",
            },
            {
                title: "Diarrhoea",
                slug: "diarrhoea",
            },
            {
                title: "Rush",
                slug: "rush",
            },
            {
                title: "Acne",
                slug: "acne",
            },
            {
                title: "Tooth Pain",
                slug: "tooth-pain",
            },
            {
                title: "Flu, Cough or Cold",
                slug: "flu-cough-cold",
            },

        ];
        for (const symptom of symptoms) {
            try {
                await createSymptom(symptom);
            } catch (error) {
                console.log(`Error creating service "${symptom.title}":`, error);
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
export async function deleteSymptom( id : string) {
    try {
        await prismaClient.symptom.delete({
           where:{
                id,
           },
        });
        revalidatePath("/dashboard/symptoms")
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