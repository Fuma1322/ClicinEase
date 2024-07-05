import { SelectInput } from "@/components/FormInputs/SelectInput";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useForm } from "react-hook-form";


export type AppointmentProps = {
    status: string;
    meetingLink:string;
    meetingProvider:string;
};
export default function UpdatedAppointmentForm({
    appointment,
}:{
    appointment:Appointment;
}){
    const [loading,setLoading] = useState(false);
    const statusOptions = [
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
    const meetingProviders = [
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
    const{
        register,
        handleSubmit,
        reset,
        formState: {error},
    }=useForm<AppointmentUpdateProps>({
        defaultValues:{
            meetingLink: appointment.meetLink,
            meetingProvider: appointment.meetingProvider,
            status: appointment.status,
        },
    });

    async function handleUpdate(data:AppointmentUpdateProps){
        setLoading(true);
        try {
            await updatedAppointmentById(appointment.id, data);
            setLoading(false);
            toast.success("Appointment Updated successfully");
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    }
    return (
        <form className="border-2 border-green-600 shadow rounded-md p-4 mx-4 my-4" onSubmit={handleSubmit(handleUpdate)}
        >
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
                    placeholder="https://meet.google.com"
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
    )

}