import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from 'next/link';
import { Briefcase, Dot } from 'lucide-react';

const tags = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    name: `name-${i + 1}`,
}));

export default function ListPanel() {
    return (
        <ScrollArea className="h-96 w-full">
            {tags.map((tag) => (
                <Link
                    key={tag.id}
                    href="/dashboard/clinic/appointments/view/1"
                    className='border mb-2 border-gray-100 shadow-sm text-xs bg-slate-900 py-3 px-2 inline-block w-full rounded-md'
                >
                    <div className="flex justify-between items-center pb-2">
                        <h2>Tau Tsehla</h2>
                        <span>4:00pm</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center">
                            <Dot />
                            <span>Follow Up</span>
                        </div>
                        <div className="flex items-center">
                            <Briefcase className='w-4 h-4 mr-2' />
                            <span>Exam</span>
                        </div>
                    </div>
                </Link>
            ))}
        </ScrollArea>
    );
}
