"use client"

// Import necessary components and libraries
import { updatedAppointmentById } from "@/actions/appointments"; // Function to update appointment
import RadioInput from "@/components/FormInputs/RadioInput"; // Radio input component
import SelectInput from "@/components/FormInputs/SelectInput"; // Select input component
import TextInput from "@/components/FormInputs/TextInput"; // Text input component
import { Button } from "@/components/ui/button"; // Button component
import { Appointment, AppointmentStatus } from "@prisma/client"; // Appointment and AppointmentStatus types from Prisma client
import { useState } from "react"; // State management hook
import { useForm } from "react-hook-form"; // Form management hook
import toast from "react-hot-toast"; // Toast notifications library

// Define type for appointment update props
export type AppointmentUpdateProps = {
    status: AppointmentStatus; // Status of the appointment
    meetingLink: string; // Meeting link for the appointment
    meetingProvider: string; // Meeting provider for the appointment
};

// UpdatedAppointmentForm component definition
export default function UpdatedAppointmentForm({
    appointment,
}: {
    appointment: Appointment; // Appointment object to update
}) {
    const [loading, setLoading] = useState(false); // State for loading state
    const statusOptions = [ // Options for appointment status
        {
            label: "Pending",
            value: "pending",
        },
        {
            label: "Approve",
            value: "approved",
        },
        {
            label: "Rejected",
            value: "rejected",
        }
    ];
    const meetingProviders = [ // Options for meeting providers
        {
            label: "Zoom",
            value: "zoom",
        },
        {
            label: "Google Meet",
            value: "google-meet",
        },
        {
            label: "Microsoft Teams",
            value: "microsoft-teams",
        },
    ];
    
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<AppointmentUpdateProps>({
        defaultValues: {
            meetingLink: appointment.meetingLink, // Initialize meeting link with appointment data
            meetingProvider: appointment.meetingProvider, // Initialize meeting provider with appointment data
            status: appointment.status, // Initialize status with appointment data
        },
    });

    // Function to handle form submission and update appointment
    async function handleUpdate(data: AppointmentUpdateProps) {
        setLoading(true); // Set loading state to true
        try {
            await updatedAppointmentById(appointment.id, data); // Call API to update appointment
            setLoading(false); // Set loading state to false after update
            toast.success("Appointment Updated successfully"); // Display success toast notification
        } catch (error) {
            setLoading(false); // Set loading state to false in case of error
            console.log(error); // Log the error for debugging
        }
    }

    // Render the form for updating appointment
    return (
        <form className="border-2 border-green-600 shadow rounded-md p-4 mx-4 my-4" onSubmit={handleSubmit(handleUpdate)}>
            <div className="sm:col-span-4">
                <div className="flex items-center justify-between border-b">
                    <h2 className="scroll-m-20 text-xl font-semibold tracking-tight py-2 mb-3">
                        Update Appointment
                    </h2>
                    <Button disabled={loading}>
                        {loading ? "Saving please wait..." : "Update Appointment"}
                    </Button>
                </div>
                <div className="py-2">
                    <TextInput
                        label="Add Meeting Link"
                        register={register}
                        name="meetingLink"
                        placeholder="https://meet.google.com/nvg-vvvd-uyj"
                        errors={errors}
                    />
                </div>
                <div className="py-2">
                    <div className="grid grid-cols-2 gap-6">
                        <SelectInput
                            className="col-span-1"
                            label="Meeting Provider"
                            name="meetingProvider"
                            register={register}
                            options={meetingProviders}
                            errors={errors}
                        />
                        <RadioInput
                            title="Approve the Appointment"
                            name="status"
                            errors={errors}
                            register={register}
                            radioOptions={statusOptions}
                            className="col-span-1"
                        />
                    </div>
                </div>
            </div>
        </form>
    );
}
