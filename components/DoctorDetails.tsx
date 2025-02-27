"use client";

import { AppointmentProps, DoctorDetail } from "@/types/types";
import { useForm } from "react-hook-form";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, MoveRight } from "lucide-react";
import toast from "react-hot-toast"; // For showing success or error messages
import { useSession } from "next-auth/react";
import { createAppointments } from "@/actions/appointments";
import RadioInput from "./FormInputs/RadioInput";
import { DatePickerInput } from "./FormInputs/DatePickerInput";
import { Button } from "./ui/button";
import TextInput from "./FormInputs/TextInput";
import { getDayFromDate } from "@/utils/getDayFromDate";
import { getLongDate } from "@/utils/getLongDate";
import { Appointment } from "@prisma/client";
import { Calendar } from "@/components/ui/calendar";
import { getFormattedDate } from "@/utils/getFormattedShortDate";
import { TextAreaInput } from "./FormInputs/TextAreaInput";

export default function DoctorDetails({
  doctor,
  appointment,
}: {
  doctor: DoctorDetail;
  appointment: Appointment | null;
}) {
  const [isActive, setIsActive] = useState("availability");
  const [step, setStep] = useState(1);
  const { data: session } = useSession();
  const patient = session?.user;
  const [selectedTimes, setSelectedTimes] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const day = getDayFromDate(date?.toDateString());
  const longDate = getLongDate(date!.toDateString());
  const [dob, setDob] = useState<Date | undefined>(undefined);

  console.log("Doctor Object:", doctor);
  console.log("Selected Day:", day);
  console.log("Availability Object:", doctor.doctorProfile?.availability);
  
  const times = doctor.doctorProfile?.availability?.[day] ?? null;
  console.log("Logged Time:", times);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AppointmentProps>({
    defaultValues: {
      email: appointment?.email ?? "",
      firstName: appointment?.firstName ?? "",
      lastName: appointment?.lastName ?? "",
      phone: appointment?.phone ?? "",
      occupation: appointment?.occupation ?? "",
      location: appointment?.location ?? "",
      gender: appointment?.gender ?? "",
    },
  });

  const genderOptions = [
    {
      label: "Male",
      value: "male",
    },
    {
      label: "Female",
      value: "female",
    },
  ];

  const router = useRouter();

  async function onSubmit(data: AppointmentProps) {
    data.appointmentDate = date;
    data.appointmentFormattedDate = longDate;
    data.appointmentTime = selectedTimes;
    data.doctorId = doctor.id;
    data.charge = doctor.doctorProfile?.hourlyWage ?? 0;
    data.dob = dob;
    data.patientId = patient?.id ?? "";
    console.log(data);
    try {
      setLoading(true);
      const res = await createAppointments(data);
      const appointment = res.data;
      setLoading(false);
      toast.success("Appointment Created Successfully");
      router.push("/dashboard/user/appointments");
      console.log(appointment);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  function initiateAppointment() {
    if (patient?.id) {
      if (!selectedTimes) {
        toast.error("Please select a time");
        return;
      }
      setStep((curr) => curr + 1);
    } else {
      router.push("/login");
    }
  }

  return (
    <>
      {step === 1 ? (
        <div className="">
          <div className="flex">
            <button
              onClick={() => setIsActive("details")}
              className={
                isActive === "details"
                  ? "py-4 px-8 w-full uppercase tracking-widest bg-blue-600 text-white"
                  : "border border-gray-200 bg-slate-100 w-full text-slate-800 py-4 px-8 uppercase tracking-widest"
              }
            >
              Service Details
            </button>
            <button
              onClick={() => setIsActive("availability")}
              className={
                isActive === "availability"
                  ? "py-4 px-8 w-full uppercase tracking-widest bg-blue-600 text-white"
                  : "border border-gray-200 bg-slate-100 w-full text-slate-800 py-4 px-8 uppercase tracking-widest"
              }
            >
              Availability
            </button>
          </div>
          <div className="py-8 px-6">
            {isActive === "availability" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center justify-center">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border"
                  />
                </div>
                <div className="">
                  <span className="text-blue-600 text-sm">You have selected</span>
                  <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                    {longDate}
                  </h2>
                  {times && times.length > 0 ? (
                    <div className="py-3 grid grid-cols-4 gap-4">
                      {times.map((item, i) => (
                        <Button
                          key={i}
                          onClick={() => setSelectedTimes(item)}
                          variant={selectedTimes === item ? "default" : "outline"}
                        >
                          {item}
                        </Button>
                      ))}
                    </div>
                  ) : (
                    <p>No available times for the selected date</p>
                  )}
                  <div className="py-4">
                    <button
                      onClick={initiateAppointment}
                      type="button"
                      className="text-white bg-[#FF9119] hover:bg-[#FF9119]/80 focus:right-4 
                        focus:outline-none focus:ring-[#FF9119]/50 font-medium rounded-lg text-sm 
                        px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#FF9119]/80
                        dark:focus:ring-[#FF9119]/40 me-2 mb-2"
                    >
                      Book Appointment (M
                      {doctor.doctorProfile?.hourlyWage})
                      <MoveRight className="w-6 h-6 ml-3" />
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div> Service Details Component</div>
            )}
          </div>
        </div>
      ) : (
        <div className="p-8">
          <form className="py-4 px-4 mx-auto" onSubmit={handleSubmit(onSubmit)}>
            <h2 className="scroll-m-20 border-b pb-3 mb-6 text-3xl font-semibold tracking-tight first:mt-0">
              Tell Us Few Details About You
            </h2>
            {step === 2 ? (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <TextInput
                    label="First Name"
                    register={register}
                    name="firstName"
                    errors={errors}
                    className="col-span-1"
                    placeholder="Enter First Name"
                  />
                  <TextInput
                    label="Last Name"
                    register={register}
                    name="lastName"
                    errors={errors}
                    className="col-span-1"
                    placeholder="Enter Last Name"
                  />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <TextInput
                    label="Phone Number"
                    register={register}
                    name="phone"
                    errors={errors}
                    className="col-span-1"
                    placeholder="Enter Phone Number"
                  />
                  <TextInput
                    label="Email Address"
                    register={register}
                    name="email"
                    errors={errors}
                    className="col-span-1"
                    placeholder="Enter Email Address"
                  />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <RadioInput
                    title="Gender"
                    register={register}
                    name="gender"
                    errors={errors}
                    className="col-span-1"
                    radioOptions={genderOptions}
                  />
                  <DatePickerInput
                    date={dob}
                    setDate={setDob}
                    title="Date of Birth"

                  />
                </div>
                <div className="mt-8 flex justify-between gap-4 items-center">
                  <Button
                    variant={"outline"}
                    type="button"
                    onClick={() => setStep((currStep) => currStep - 1)}
                  >
                    Previous
                  </Button>
                  <Button
                    type="button"
                    onClick={() => setStep((currStep) => currStep + 1)}
                  >
                    Next
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <TextInput
                    label="Your Location"
                    register={register}
                    name="location"
                    errors={errors}
                    className="col-span-1"
                    placeholder="Enter your Location"
                  />
                  <TextInput
                    label="Occupation"
                    register={register}
                    name="occupation"
                    errors={errors}
                    className="col-span-1"
                    placeholder="Enter your Occupation"
                  />
                  <TextAreaInput
                    label="Reason for making Appointment"
                    register={register}
                    name="appointmentReason"
                    errors={errors}
                    placeholder="Enter the reason for the Appointment"
                  />
                  <div className="mt-8 flex justify-between gap-4 items-center">
                    <Button
                      variant={"outline"}
                      type="button"
                      onClick={() => setStep((currStep) => currStep - 1)}
                    >
                      Previous
                    </Button>
                    {loading ? (
                      <Button disabled>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving, please wait...
                      </Button>
                    ) : (
                      <Button type="submit">
                        Complete Appointment
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </form>
        </div>
      )}
    </>
  );
}
