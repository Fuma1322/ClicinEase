"use client"

// Import necessary components and libraries
import { updateDoctorProfileWithService } from "@/actions/services"; // Function to update doctor profile with service
import { Button } from "@/components/ui/button"; // Button component
import { CardContent } from "@/components/ui/card"; // CardContent component
import { cn } from "@/lib/utils"; // Utility function for classNames
import { DoctorProfile, Service, Speciality, Symptom } from "@prisma/client"; // Types from Prisma client
import { Map, Video } from "lucide-react"; // Icons from Lucide React
import Image from "next/image"; // Image component from Next.js
import React, { useState } from "react"; // React and useState hook
import toast from "react-hot-toast"; // Toast notifications library

// UpdateServiceForm component definition
export default function UpdateServiceForm({
    services, // List of services
    specialities, // List of specialities
    symptoms, // List of symptoms
    profile, // Doctor profile
}: {
    services: Service[] | null; // Array of services or null
    specialities: Speciality[] | null; // Array of specialities or null
    symptoms: Symptom[] | null; // Array of symptoms or null
    profile: DoctorProfile | undefined | null; // Doctor profile or undefined or null
}) {
    // Initialize states based on profile data or defaults
    const profileId = profile?.id;
    const initialServiceId = profile?.serviceId ?? "";
    const initialSpecialityId = profile?.specialityId ?? "";
    const initialOperationMode = profile?.operationMode ?? "";
    const initialSymptomIds = profile?.symptomIds ?? [];
    const initialPrice = profile?.hourlyWage ?? 100;

    // States for managing form inputs and loading states
    const [selectedServiceId, setSelectedserviceId] = useState(initialServiceId);
    const [specialityId, setSpecialityId] = useState(initialSpecialityId);
    const [operationMode, setOperationMode] = useState(initialOperationMode);
    const [symptomIds, setSymptomIds] = useState<string[]>(initialSymptomIds);
    const [savingServices, setSavingServices] = useState(false);
    const [savingPrice, setSavingPrice] = useState(false);
    const [price, setPrice] = useState(initialPrice);
    const [savingSpeciality, setSavingSpeciality] = useState(false);
    const [savingSymptoms, setSavingSymptoms] = useState(false);
    const [savingMode, setSavingMode] = useState(false);

    // Operation modes with titles, slugs, and icons
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

    // Function to handle update service
    async function handleUpdateservice() {
        setSavingServices(true); // Set saving state to true
        const data = {
            serviceId: selectedServiceId, // Data object with selected service ID
        };
        try {
            await updateDoctorProfileWithService(profileId, data); // Call API to update doctor profile with service
            toast.success("Service Updated Successfully"); // Display success toast notification
            setSavingServices(false); // Set saving state to false after success
        } catch (error) {
            console.log(error); // Log error for debugging
            setSavingServices(false); // Set saving state to false in case of error
        }
        console.log(data); // Log data object
    }

    // Function to handle update price
    async function handleUpdatePrice() {
        setSavingPrice(true); // Set saving state to true
        const data = {
            hourlyWage: price, // Data object with updated hourly wage
        };
        try {
            await updateDoctorProfileWithService(profileId, data); // Call API to update doctor profile with price
            toast.success("Price Updated Successfully"); // Display success toast notification
            setSavingPrice(false); // Set saving state to false after success
        } catch (error) {
            console.log(error); // Log error for debugging
            setSavingPrice(false); // Set saving state to false in case of error
        }
        console.log(data); // Log data object
    }

    // Function to handle update speciality
    async function handleUpdateSpeciality() {
        setSavingSpeciality(true); // Set saving state to true
        const data = {
            specialityId, // Data object with updated speciality ID
        };
        try {
            await updateDoctorProfileWithService(profileId, data); // Call API to update doctor profile with speciality
            toast.success("Speciality Updated Successfully"); // Display success toast notification
            setSavingSpeciality(false); // Set saving state to false after success
        } catch (error) {
            console.log(error); // Log error for debugging
            setSavingSpeciality(false); // Set saving state to false in case of error
        }
        console.log(data); // Log data object
    }

    // Function to handle update symptoms
    async function handleUpdateSymptoms() {
        setSavingSymptoms(true); // Set saving state to true
        const data = {
            symptomIds, // Data object with updated symptom IDs
        };
        try {
            await updateDoctorProfileWithService(profileId, data); // Call API to update doctor profile with symptoms
            toast.success("Symptoms Updated Successfully"); // Display success toast notification
            setSavingSymptoms(false); // Set saving state to false after success
        } catch (error) {
            console.log(error); // Log error for debugging
            setSavingSymptoms(false); // Set saving state to false in case of error
        }
        console.log(data); // Log data object
    }

    // Function to handle update operation mode
    async function handleUpdateMode() {
        setSavingMode(true); // Set saving state to true
        const data = {
            operationMode, // Data object with updated operation mode
        };
        try {
            await updateDoctorProfileWithService(profileId, data); // Call API to update doctor profile with operation mode
            toast.success("Operation Mode Updated Successfully"); // Display success toast notification
            setSavingMode(false); // Set saving state to false after success
        } catch (error) {
            console.log(error); // Log error for debugging
            setSavingMode(false); // Set saving state to false in case of error
        }
        console.log(data); // Log data object
    }

    // Render the form with card content
    return (
        <>
            <CardContent className="space-y-3">
                {/* PRICE */}
                <div className="border shadow rounded-md p-4 mt-4">
                    <div className="sm:col-span-4">
                        <div className="flex items-center justify-between border-b">
                            <h2 className="scroll-m-20 text-xl font-semibold tracking-tight py-2 mb-3">
                                Update Hourly Price
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
                                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    placeholder="100"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                {/* OPERATION MODE */}
                <div className="border shadow rounded-md p-4 mt-4">
                    <div className="sm:col-span-4">
                        <div className="flex items-center justify-between border-b">
                            <h2 className="scroll-m-20 text-xl font-semibold tracking-tight py-2 mb-3">
                                Choose Your Operation Mode
                            </h2>
                            <Button disabled={savingMode} onClick={handleUpdateMode}>
                                {savingMode ? "Saving please wait..." : "Update Operation Mode"}
                            </Button>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 py-3">
                            {operationModes &&
                                operationModes.map((item, i) => {
                                    const Icon = item.icon;
                                    return (
                                        <button
                                            key={i}
                                            onClick={() => setOperationMode(item.title)}
                                            className={cn(
                                                "border flex items-center justify-center flex-col py-2 px-3 rounded-md cursor-pointer",
                                                operationMode === item.title
                                                    ? "border-2 border-purple-600 bg-slate-50"
                                                    : ""
                                            )}
                                        >
                                            <Icon />
                                            <h2 className="text-sm">{item.title}</h2>
                                        </button>
                                    );
                                })}
                        </div>
                    </div>
                </div>
                {/* SERVICE */}
                <div className="border shadow rounded-md p-4 mt-4">
                    <div className="sm:col-span-4">
                        <div className="flex items-center justify-between border-b">
                            <h2 className="scroll-m-20 text-xl font-semibold tracking-tight py-2 mb-3">
                                Choose Your Service
                            </h2>
                            <Button disabled={savingServices} onClick={handleUpdateservice}>
                                {savingServices ? "Saving please wait..." : "Update Service"}
                            </Button>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 py-3">
                            {services &&
                                services.map((item, i) => {
                                    return (
                                        <button
                                            key={i}
                                            onClick={() => setSelectedserviceId(item.id)}
                                            className={cn(
                                                "border flex items-center justify-center flex-col py-2 px-3 rounded-md cursor-pointer",
                                                selectedServiceId === item.id
                                                    ? "border-2 border-purple-600 bg-slate-50"
                                                    : ""
                                            )}
                                        >
                                            <Image
                                                src={item.imageUrl ?? ""}
                                                alt={item.title}
                                                width={30}
                                                height={30}
                                                className="rounded-full"
                                            />
                                            <h2 className="text-sm">{item.title}</h2>
                                        </button>
                                    );
                                })}
                        </div>
                    </div>
                </div>
                {/* SPECIALITY */}
                <div className="border shadow rounded-md p-4 mt-4">
                    <div className="sm:col-span-4">
                        <div className="flex items-center justify-between border-b">
                            <h2 className="scroll-m-20 text-xl font-semibold tracking-tight py-2 mb-3">
                                Choose Your Speciality
                            </h2>
                            <Button disabled={savingSpeciality} onClick={handleUpdateSpeciality}>
                                {savingSpeciality ? "Saving please wait..." : "Update Speciality"}
                            </Button>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 py-3">
                            {specialities &&
                                specialities.map((item, i) => {
                                    return (
                                        <button
                                            key={i}
                                            onClick={() => setSpecialityId(item.id)}
                                            className={cn(
                                                "border flex items-center justify-center flex-col py-2 px-3 rounded-md cursor-pointer",
                                                specialityId === item.id
                                                    ? "border-2 border-purple-600 bg-slate-50"
                                                    : ""
                                            )}
                                        >
                                            <h2 className="text-sm">{item.title}</h2>
                                        </button>
                                    );
                                })}
                        </div>
                    </div>
                </div>
                {/* SYMPTOMS */}
                <div className="border shadow rounded-md p-4 mt-4">
                    <div className="sm:col-span-4">
                        <div className="flex items-center justify-between border-b">
                            <h2 className="scroll-m-20 text-xl font-semibold tracking-tight py-2 mb-3">
                                Choose Symptoms You Treat
                            </h2>
                            <Button disabled={savingSymptoms} onClick={handleUpdateSymptoms}>
                                {savingSymptoms ? "Saving please wait..." : "Update Symptoms"}
                            </Button>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 py-3">
                            {symptoms &&
                                symptoms.map((item, i) => {
                                    return (
                                        <button
                                            key={i}
                                            onClick={() => setSymptomIds([item.id])}
                                            className={cn(
                                                "border flex items-center justify-center flex-col py-2 px-3 rounded-md cursor-pointer",
                                                symptomIds.includes(item.id)
                                                    ? "border-2 border-purple-600 bg-slate-50"
                                                    : ""
                                            )}
                                        >
                                            
                                            <h2 className="text-sm">{item.title}</h2>
                                        </button>
                                    );
                                })}
                        </div>
                    </div>
                </div>
            </CardContent>
        </>
    );
}
