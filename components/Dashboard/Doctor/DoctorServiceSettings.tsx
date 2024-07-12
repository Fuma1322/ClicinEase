import React from "react";
import {
    Card,
} from "@/components/ui/card";
import UpdateServiceForm from "./UpdateServiceForm";
import {getServices} from "@/actions/services";
import {getSymptoms} from "@/actions/symptom";
import {DoctorProfile} from "@prisma/client";
import { getSpecialities } from "@/actions/specialities";

export default async function DoctorServiceSettings({
    profile,
}:{
    profile: DoctorProfile | undefined | null;
}){
    const services = (await getServices()).data;
    const specialities = (await getSpecialities()).data;
    const symptoms = await (await getSymptoms()).data;
    console.log(profile);

    return(
        <div className="grid gap-6 w-full">
            <Card className="w-full">
                <UpdateServiceForm 
                profile={profile}
                services={services}
                specialities={specialities}
                symptoms={symptoms}/>
            </Card>
        </div>
    );
}