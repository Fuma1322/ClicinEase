type DatePickerInputProps = {
    date:Date;
    setDate:Date;
    className: string
    title:string
};
import { useState } from "react";
import DatePicker from "react-date-picker";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import { string } from "zod";
import { cn } from "@/lib/utils";
export function DatePickerInput({
    date,
    setDate,
    className="col-span-full",
    title,
}: DatePickerInputProps){
    return (
        <div className={cn("grid", className)}>
            <h2 className="text-base font-normal mb-2">{title}</h2>
            <DatePicker className="z-50 rounded-md border border-slate-300 dark:border-slate-600 ring-0 py-1.5 dark:text-slate-50" 
            onChange={setDate}
            value={date}
            />
        </div>
    );
}