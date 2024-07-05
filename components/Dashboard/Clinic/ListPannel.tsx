"use client"
import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from 'next/link';
import { Briefcase, CalendarCheck, Dot, History } from 'lucide-react';
import timeAgo from '@/utils/timeAgo';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export default function ListPanel({appointments,role}:{appointments:Appointment[]; role:string}) {
    const pathname = usePathname()
    return (
        <ScrollArea className="h-96 w-full">
            {appointments.map((item) => (
                <>
                <Link
                    key={item.id}
                    href={`/dashboard/${role==="USER"?"user":"doctor"}/appointments/view/${item.id}`}  
                    className={cn('border mb-2 border-gray-100 shadow-sm text-xs bg-slate-900 py-3 px-2 inline-block w-full rounded-md',pathname===`/dashboard/clinic/appointments/view/${item.id}`&& "border-green-700 bg-green-50 border-2")}
                >
                    <div className="flex justify-between items-center pb-2">
                        <h2>{item.firstName} {item.lastName}</h2>
                        <div className="flex items-center">
                            <History className='w-4 h-4 mr-2' />
                            <span>{timeAgo(item.CreatedAt)}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center font-semibold">
                            <CalendarCheck className="w-4 h-4 mr-2" />
                            <span>{item.appointmentFormattedDate}</span>
                        </div>
                        <span className="font-semibold">{item.appointmentTime}</span>
                       
                    </div>
                </Link>
                </>
            ))}
        </ScrollArea>
    );
}
