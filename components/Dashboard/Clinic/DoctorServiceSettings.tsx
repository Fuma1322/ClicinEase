import React from "react";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import ShadSelectInput, {
    SelectOption,
} from "@/components/FormInputs/ShadSelectInput";
import UpdateServiceForm from "./UpdateServiceForm";
import {getServices} from "@/actions/services";
import {getSpecialities} from "@/actions/specialities";
import {getSymptoms} from "@/actions/symptom";
import {DoctorProfile} from "@prisma/client";

export default async function DoctorServiceSettings({
    profile,
}:{
    profile: DoctorProfile | undefined|null;
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