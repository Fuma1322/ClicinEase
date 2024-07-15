"use client"

import {updateDoctorProfileWithService} from "@/actions/services";
import {Button} from "@/components/ui/button";
import {CardContent} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {DoctorProfile, Service, Speciality, Symptom} from "@prisma/client";
import {Map,Video} from "lucide-react";
import Image from "next/image";
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
   
    // if (status === "loading") {
    //     return (
    //         <div className="flex items-center">
    //             <Loader className="mr-1 w-4 h-4 animate-spin"/>
    //             <span>Loading a User...</span>
    //         </div>
    //     );
    // }
    
        const profileId = profile?.id;
        const initialServiceId = profile?.serviceId ?? "";
        const initialSpecialityId = profile?.specialityId ?? "";
        const initialOperationMode = profile?.operationMode ?? "";
        const initialSymptomIds = profile?.symptomIds ?? [];
        const initialPrice = profile?.hourlyWage?? 100;
        const [selectedServiceId, setSelectedserviceId] = useState(initialServiceId);
        const [specialityId, setSpecialityId]=useState(initialSpecialityId );
        const [operationMode, setOperationMode] = useState(initialOperationMode);
        const [symptomIds, setSymptomIds] = useState<string[]>(
            initialSymptomIds
        );
        const [savingServices, setSavingServices] = useState(false);
        const [savingPrice, setSavingPrice] = useState(false);
        const [price, setPrice] = useState(initialPrice);
        const [savingSpeciality, setSavingSpeciality] = useState(false);
        const [savingSymptoms, setSavingSymptoms] = useState(false);
        const [savingMode, setSavingMode] = useState(false);
        console.log(price);
        
        const operationModes = [
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
    const data = {
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
    setSavingSpeciality(true);
    const data = {
       specialityId,
    };
    try {
        await updateDoctorProfileWithService(profileId,data);
        toast.success("Speciality Updated Successfully");
        setSavingSpeciality(false);
    } catch (error) {
        console.log(error);
        setSavingSpeciality(false);
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
       operationMode,
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
        {/* PRICE */}
        <div className="border shadow rounded-md p-4 mt-4">
            <div className="sm:col-spin-4">
                <div className="flex items-center justify-between border-b">
                    <h2 className="scroll-m-20 text-xl font-semibold tracking-tight py-2 mb-3">
                        Update Hour Price
                    </h2>
                    <Button disabled={savingPrice} onClick={handleUpdatePrice}>
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
        {/* OPERATION MODE */}
        <div className="border shadow rounded-md p-4 mt-4">
            <div className="sm:col-spin-4">
                <div className="flex items-center justify-between border-b">
                    <h2 className="scroll-m-20 text-xl font-semibold tracking-tight py-2 mb-3">
                        Choose Your Operation Mode
                    </h2>
                    <Button disabled={savingMode} onClick={handleUpdateMode}>
                        {savingMode ? "Saving please wait..." : "Update Operation Mode" }
                    </Button>
                </div>
                <div className="grid grid-cols-4 gap-2 py-3">
                    {operationModes &&
                    operationModes.map((item, i) => {
                        const Icon = item.icon;
                        return (
                            <button key={i} onClick={() => setOperationMode(item.title)}
                            className={cn(
                                "border flex items-center justify-center flex-col py-2 px-3 rounded-md cursor-pointer",
                                operationMode === item.title 
                                ? "border-2 border-purple-600 bg-slate-50"
                                : ""
                            )}
                            >
                                <Icon className="w-8 h-8" />
                                <p className="text-xs">{item.title}</p>
                            </button>
                        );
                    }) }
                </div>
            </div>
        </div>
        {/* SERVICES */}
        <div className="border shadow rounded-md p-4 mt-4">
            <div className="sm:col-spin-4">
                <div className="flex items-center justify-between border-b">
                    <h2 className="scroll-m-20 text-xl font-semibold tracking-tight py-2 mb-3">
                        Choose A Service You Want To Offer
                    </h2>
                    <Button disabled={savingServices} onClick={handleUpdateservice}>
                        {savingServices ? "Saving please wait..." : "Update Service"}
                    </Button>
                </div>
                <div className="grid grid-cols-4 gap-2 py-3">
                    {services &&
                    services.map((item, i) => {
                        return (
                            <button key={i} onClick={() => setSelectedserviceId(item.id)}
                            className={cn(
                                "border flex items-center justify-center flex-col py-2 px-3 rounded-md cursor-pointer",
                                 selectedServiceId === item.id 
                                ? "border-2 border-purple-600 bg-slate-50"
                                : ""
                            )}
                            >
                                <Image
                                src={item.imageUrl}
                                alt={item.title}
                                width={100}
                                height={100}
                                className="w-14 h-14"
                                />
                                <p className="text-xs">{item.title}</p>
                            </button>
                        );
                    }) }
                </div>
            </div>
        </div>
        {/* SPECIALITY */}
        <div className="border shadow rounded-md p-4 mt-4">
            <div className="sm:col-spin-4">
                <div className="flex items-center justify-between border-b">
                    <h2 className="scroll-m-20 text-xl font-semibold tracking-tight py-2 mb-3">
                        Select Your Speciality
                    </h2>
                    <Button disabled={savingSpeciality} onClick={handleUpdateSpeciality}>
                        {savingSpeciality ? "Saving please wait..." : "Update Speciality"}
                    </Button>
                </div>
                <div className="grid grid-cols-4 gap-2 py-3">
                    {specialities &&
                    specialities.map((item, i) => {
                        return (
                            <button key={i} onClick={() => setSpecialityId(item.id)}
                            className={cn(
                                "border flex items-center justify-center flex-col py-2 px-3 rounded-md cursor-pointer",
                                 specialityId === item.id 
                                ? "border-2 border-purple-600 bg-slate-50"
                                : ""
                            )}
                            >
                            <p className="text-xs">{item.title}</p>
                            </button>
                        );
                    }) }
                </div>
            </div>
        </div>
        {/* SYMPTOMS */}  
        <div className="border shadow rounded-md p-4 mt-4">
            <div className="sm:col-spin-4">
                <div className="flex items-center justify-between border-b">
                    <h2 className="scroll-m-20 text-xl font-semibold tracking-tight py-2 mb-3">
                        Select Your Symptoms
                    </h2>
                    <Button disabled={savingSymptoms} onClick={handleUpdateSymptoms}>
                        {savingSymptoms ? "Saving please wait..." : "Update Symptoms"}
                    </Button>
                </div>
                <div className="grid grid-cols-4 gap-2 py-3">
                    {symptoms &&
                     symptoms.map((item, i) => {
                        return (
                            <button key={i} onClick={() => setSymptomIds([...symptomIds, item.id])}
                            className={cn(
                                "border flex items-center justify-center flex-col py-2 px-3 rounded-md cursor-pointer",
                                 symptomIds.includes(item.id) 
                                ? "border-2 border-purple-600 bg-slate-50"
                                : ""
                            )}
                            >
                            <p className="text-xs">{item.title}</p>
                            </button>
                        );
                    }) }
                </div>
            </div>
        </div>
    </CardContent>
    </>
);
}
