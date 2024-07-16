"use server"

import { SpecialityProps } from "@/components/Dashboard/SpecialityForm";
import { SymptomProps } from "@/components/Dashboard/SymptomForm";
import { prismaClient } from "@/lib/db";
import { revalidatePath } from "next/cache";

// Function to create a new symptom
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

        // Invalidate cache for the dashboard symptoms page
        revalidatePath("/dashboard/symptoms");

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

// Function to fetch all symptoms ordered by creation date
export async function getSymptoms() {
    try {
        const symptoms = await prismaClient.symptom.findMany({
            orderBy: {
                createdAt: "desc"
            },
        });

        return {
            data: symptoms,
            status: 200,
            error: null,
        };
    } catch (error) {
        console.log(error);
        return {
            data: null,
            status: 500,
            error,
        };
    }
}

// Function to fetch a symptom by its slug
export async function getSymptomsBySlug(slug: string) {
    try {
        const symptom = await prismaClient.symptom.findUnique({
            where: {
                slug
            }
        });

        return {
            data: symptom,
            status: 200,
            error: null,
        };
    } catch (error) {
        console.log(error);
        return {
            data: null,
            status: 500,
            error,
        };
    }
}

// Function to create multiple predefined symptoms
export async function createManySymptoms() {
    try {
        const symptoms = [
            // List of predefined symptoms
            {
                title: "Fever",
                slug: "fever",
            },
            {
                title: "Cough",
                slug: "cough",
            },
            {
                title: "Shortness of Breath",
                slug: "shortness-of-breath",
            },
            {
                title: "Headache",
                slug: "headache",
            },
            {
                title: "Nausea",
                slug: "nausea",
            },
            {
                title: "Vomiting",
                slug: "vomiting",
            },
            {
                title: "Diarrhea",
                slug: "diarrhea",
            },
            {
                title: "Fatigue",
                slug: "fatigue",
            },
            {
                title: "Sore Throat",
                slug: "sore-throat",
            },
            {
                title: "Chest Pain",
                slug: "chest-pain",
            },
            {
                title: "Dizziness",
                slug: "dizziness",
            },
            {
                title: "Muscle Pain",
                slug: "muscle-pain",
            },
            {
                title: "Joint Pain",
                slug: "joint-pain",
            },
            {
                title: "Rash",
                slug: "rash",
            },
            {
                title: "Itching",
                slug: "itching",
            },
            {
                title: "Swelling",
                slug: "swelling",
            },
            {
                title: "Abdominal Pain",
                slug: "abdominal-pain",
            },
            {
                title: "Loss of Appetite",
                slug: "loss-of-appetite",
            },
            {
                title: "Weight Loss",
                slug: "weight-loss",
            },
            {
                title: "Weight Gain",
                slug: "weight-gain",
            },
            {
                title: "Chills",
                slug: "chills",
            },
            {
                title: "Night Sweats",
                slug: "night-sweats",
            },
            {
                title: "Confusion",
                slug: "confusion",
            },
            {
                title: "Memory Loss",
                slug: "memory-loss",
            },
            {
                title: "Blurred Vision",
                slug: "blurred-vision",
            },
            {
                title: "Dry Mouth",
                slug: "dry-mouth",
            },
            {
                title: "Increased Thirst",
                slug: "increased-thirst",
            },
            {
                title: "Increased Urination",
                slug: "increased-urination",
            },
            {
                title: "Constipation",
                slug: "constipation",
            },
            {
                title: "Heart Palpitations",
                slug: "heart-palpitations",
            },
            {
                title: "Difficulty Sleeping",
                slug: "difficulty-sleeping",
            },
            {
                title: "Anxiety",
                slug: "anxiety",
            },
            {
                title: "Depression",
                slug: "depression",
            },
            {
                title: "Hair Loss",
                slug: "hair-loss",
            },
            {
                title: "Skin Discoloration",
                slug: "skin-discoloration",
            },
            {
                title: "Nosebleed",
                slug: "nosebleed",
            },
            {
                title: "Ear Pain",
                slug: "ear-pain",
            },
            {
                title: "Tinnitus",
                slug: "tinnitus",
            },
            {
                title: "Hearing Loss",
                slug: "hearing-loss",
            },
            {
                title: "Eye Redness",
                slug: "eye-redness",
            },
            {
                title: "Eye Pain",
                slug: "eye-pain",
            },
            {
                title: "Light Sensitivity",
                slug: "light-sensitivity",
            },
            {
                title: "Dry Eyes",
                slug: "dry-eyes",
            },
            {
                title: "Sneezing",
                slug: "sneezing",
            },
            {
                title: "Runny Nose",
                slug: "runny-nose",
            },
            {
                title: "Stuffy Nose",
                slug: "stuffy-nose",
            },
            {
                title: "Loss of Taste",
                slug: "loss-of-taste",
            },
            {
                title: "Loss of Smell",
                slug: "loss-of-smell",
            },
            {
                title: "Swollen Lymph Nodes",
                slug: "swollen-lymph-nodes",
            },
            {
                title: "Bloating",
                slug: "bloating",
            },
            {
                title: "Gas",
                slug: "gas",
            },
            {
                title: "Hiccups",
                slug: "hiccups",
            },
            {
                title: "Belching",
                slug: "belching",
            },
            {
                title: "Heartburn",
                slug: "heartburn",
            },
            {
                title: "Indigestion",
                slug: "indigestion",
            },
            {
                title: "Swollen Feet",
                slug: "swollen-feet",
            },
            {
                title: "Swollen Ankles",
                slug: "swollen-ankles",
            },
            {
                title: "Cold Hands",
                slug: "cold-hands",
            },
            {
                title: "Cold Feet",
                slug: "cold-feet",
            },
            {
                title: "Hot Flashes",
                slug: "hot-flashes",
            },
            {
                title: "Frequent Infections",
                slug: "frequent-infections",
            },
            {
                title: "Slow Healing",
                slug: "slow-healing",
            },
            {
                title: "Bleeding Gums",
                slug: "bleeding-gums",
            },
            {
                title: "Dry Skin",
                slug: "dry-skin",
            },
            {
                title: "Oily Skin",
                slug: "oily-skin",
            },
            {
                title: "Acne",
                slug: "acne",
            },
            {
                title: "Eczema",
                slug: "eczema",
            },
            {
                title: "Psoriasis",
                slug: "psoriasis",
            },
            {
                title: "Bruising",
                slug: "bruising",
            },
            {
                title: "Bleeding",
                slug: "bleeding",
            },
            {
                title: "Frequent Urination",
                slug: "frequent-urination",
            },
            {
                title: "Painful Urination",
                slug: "painful-urination",
            },
            {
                title: "Blood in Urine",
                slug: "blood-in-urine",
            },
            {
                title: "Weakness",
                slug: "weakness",
            },
            {
                title: "Tremors",
                slug: "tremors",
            },
            {
                title: "Seizures",
                slug: "seizures",
            },
            {
                title: "Numbness",
                slug: "numbness",
            },
            {
                title: "Tingling",
                slug: "tingling",
            },
            {
                title: "Loss of Coordination",
                slug: "loss-of-coordination",
            },
            {
                title: "Difficulty Walking",
                slug: "difficulty-walking",
            },
            {
                title: "Slurred Speech",
                slug: "slurred-speech",
            },
            {
                title: "Stiff Neck",
                slug: "stiff-neck",
            },
            {
                title: "Back Pain",
                slug: "back-pain",
            },
            {
                title: "Neck Pain",
                slug: "neck-pain",
            },
            {
                title: "Shoulder Pain",
                slug: "shoulder-pain",
            },
            {
                title: "Hip Pain",
                slug: "hip-pain",
            },
            {
                title: "Knee Pain",
                slug: "knee-pain",
            },
            {
                title: "Ankle Pain",
                slug: "ankle-pain",
            },
            {
                title: "Foot Pain",
                slug: "foot-pain",
            },
            {
                title: "Hand Pain",
                slug: "hand-pain",
            },
            {
                title: "Wrist Pain",
                slug: "wrist-pain",
            },
            {
                title: "Elbow Pain",
                slug: "elbow-pain",
            },
            {
                title: "Hearing Ringing",
                slug: "hearing-ringing",
            },
            {
                title: "Numbness in Fingers",
                slug: "numbness-in-fingers",
            },
            {
                title: "Numbness in Toes",
                slug: "numbness-in-toes",
            },
            {
                title: "Frequent Nosebleeds",
                slug: "frequent-nosebleeds",
            },
            {
                title: "Loss of Balance",
                slug: "loss-of-balance",
            },
            {
                title: "Difficulty Swallowing",
                slug: "difficulty-swallowing",
            },
            {
                title: "Loss of Consciousness",
                slug: "loss-of-consciousness",
            },
            {
                title: "Rapid Heart Rate",
                slug: "rapid-heart-rate",
            },
            {
                title: "Slow Heart Rate",
                slug: "slow-heart-rate",
            }
        ];

        // Loop through symptoms and create each one
        for (const symptom of symptoms) {
            try {
                await createSymptom(symptom);
            } catch (error) {
                console.log(`Error creating symptom "${symptom.title}":`, error);
            }
        }
    } catch (error) {
        console.log(error);
        return {
            data: null,
            status: 500,
            error,
        };
    }
}

// Function to delete a symptom by its ID
export async function deleteSymptom(id: string) {
    try {
        await prismaClient.symptom.delete({
            where: {
                id,
            },
        });

        // Invalidate cache for the dashboard symptoms page
        revalidatePath("/dashboard/symptoms");

        return {
            ok: true,
            status: 200,
            error: null,
        };
    } catch (error) {
        console.log(error);
        return {
            data: null,
            status: 500,
            error,
        };
    }
}

// Function to update a doctor's profile with new service data
export async function updateDoctorProfileWithService(id: string | undefined, data: any) {
    if (id) {
        try {
            const updatedProfile = await prismaClient.doctorProfile.update({
                where: {
                    id,
                },
                data,
            });

            // Invalidate cache for the doctor's settings page
            revalidatePath("/dashboard/doctor/settings");

            console.log(updatedProfile);

            return {
                data: updatedProfile,
                status: 201,
                error: null,
            };
        } catch (error) {
            console.log(error);
            return {
                data: null,
                status: 500,
                error: "Profile was not updated",
            };
        }
    }
}

// Function to update a symptom by its ID
export async function updateSymptomById(id: string, data: SpecialityProps) {
    try {
        const existingSymptom = await prismaClient.symptom.findUnique({
            where: {
                id
            },
        });

        if (!existingSymptom) {
            return {
                data: null,
                status: 404,
                error: "Symptom does not exist",
            };
        }

        const updatedSymptom = await prismaClient.symptom.update({
            where: {
                id
            },
            data,
        });

        // Invalidate cache for the dashboard symptoms page
        revalidatePath("/dashboard/symptoms");

        console.log(updatedSymptom);

        return {
            data: updatedSymptom,
            status: 201,
            error: null,
        };
    } catch (error) {
        console.log(error);

        return {
            data: null,
            status: 500,
            error,
        };
    }
}
