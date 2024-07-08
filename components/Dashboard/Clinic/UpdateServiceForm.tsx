"use client"
import {updateDoctorProfileWithService} from "@/actions/services";

import {Button} from "@/components/ui/button";
import {CardContent, CardFooter} from "@/components/ui/card";
import {DoctorProfile, Service, Speciality, Symptom} from "@prisma/client";
import {Loader, Map,Video} from "lucide-react";
import React , {useState} from "react";
import toast from "react-hot-toast";

export default function UpdateServiceForm({
    services,
    specialities,
    symptoms,
    profile,
}: {
    services: Service[] | null;
    specialities: Speciality[] | null;
    symptoms: Symptom[] | null;
    profile: DoctorProfile | undefined | null;
}) {
    console.log(profile);
    const profileId = profile?.id;
    if (status === "loading"){
        return (
            <div className="flex items-center">
                <Loader className="mr-1 w-4 h-4 animate-spin"/>
                <span>Loading a User</span>
            </div>
        );
        const [selectedServicId, setSelectedserviceId] = useState(
            profile?.serviceIds
        );
        const [specialityId, setSpecialtyId] useState(profile?.specialityId);
        const [opertionMode, seOperationMode] = useState(profile?.opertionMode);
        const [symptomIds, setSymptomIds] = useState<string[]>(
            profile?.symptomIds || []
        );
        const [savingServices, setSavingServices] = useState(false);
        const [savingId, setSavingPrice] = useState(false);
        const [price, setPrice] = useState(profile?.hourlyWage);
        const [savingSpeciality, setSavingSpecialty] = useState(false);
        const [savingSymptoms, setSavingSymptoms] = useState(false);
        const [savingMode, setSavingMode] = useState(false);
        console.log(price);
        const opertionMode = [
        {
            title: "Telehealth visit",
            slug: "telehealth-visit",
            icon: Video,
        },
        {
            title: "In-person visit",
            slug: "inperson-visit",
            icon: Map,
        }
    ];
async function handleUpdateservice() {
    setSavingServices(true);
    const = {
        serviceId: selectedServiceId,
    };
    try {
        await updateDoctorProfileWithService(profileId,data);
        toast.success("Service Updated Successfully");
        setSavingServices(false);
    } catch (error) {
        console.log(error)
        setSavingServices(false);
        
    }
    console.log(data);
}
async function handleUpdatePrice() {
    setSavingPrice(true);
    const data = {
        hourlyWage: price,
    };
    try {
        await updateDoctorProfileWithService(profileId,data);
        toast.success("Price Updated Successfully");
        setSavingPrice(false);
    } catch (error) {
        console.log(error);
        setSavingPrice(false);
    }
    console.log(data);
}
async function handleUpdateSpeciality() {
    setSavingSpecialty(true);
    const data = {
       specialityId,
    };
    try {
        await updateDoctorProfileWithService(profileId,data);
        toast.success("Spciality Updated Successfully");
        setSavingSpecialty(false);
    } catch (error) {
        console.log(error);
        setSavingSpecialty(false);
    }
    console.log(data);
}
async function handleUpdateSymptoms() {
    setSavingSymptoms(true);
    const data = {
       symptomIds,
    };
    try {
        await updateDoctorProfileWithService(profileId,data);
        toast.success("Symptoms Updated Successfully");
        setSavingSymptoms(false);
    } catch (error) {
        console.log(error);
        setSavingSymptoms(false);
    }
    console.log(data);
}
async function handleUpdateMode() {
    setSavingMode(true);
    const data = {
       opertionMode,
    };
    try {
        await updateDoctorProfileWithService(profileId,data);
        toast.success("Operation Mode Updated Successfully");
        setSavingMode(false);
    } catch (error) {
        console.log(error);
        setSavingMode(false);
    }
    console.log(data);
}
return (
    <>
    <CardContent className="space-y-3">
        <div className="border shadow rounded-md p-4 mt-4">
            <div className="sm:col-spin-4">
                <div className="flex items-center justify-between border-b">
                    <h2 className="scroll-m-20 text-xl font-semibold tracking-tight py-2 mb-3">
                        Update Hour Price
                    </h2>
                    <Button disabled={} onClick={}>
                        {savingPrice ? "Saving please wait..." : "Update Price"}
                    </Button>
                </div>
                <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                        <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">
                            M
                        </span>
                        <input 
                        type="number" 
                        name="price" 
                        id="price" 
                        value={price} 
                        onChange={(e) => setPrice(+e.target.value)}
                        autoComplete="price" 
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 
                        focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="100"
                        />
                    </div>
                </div>
            </div>
        </div>
    </CardContent>
    </>
)
    }
}