"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Plus, Users, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CalendarEvent {
    id: number;
    day: number;
    time: string;
    title: string;
    customer: string;
    type: 'online' | 'onsite';
}

interface TrainingCalendarProps {
    events?: CalendarEvent[];
}

export function TrainingCalendar({ events = [] }: TrainingCalendarProps) {
    const [currentDate, setCurrentDate] = useState(new Date());

    // Format: "Aralık 2024"
    const formattedMonth = currentDate.toLocaleDateString('tr-TR', { month: 'long', year: 'numeric' });

    // Generate days for the current month
    const getDaysInMonth = (date: Date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const firstDayOfMonth = new Date(year, month, 1).getDay(); // 0 = Sunday, 1 = Monday...

        // Adjust for Monday start (Monday=1...Sunday=7)
        // JS getDay(): Sun=0, Mon=1...Sat=6
        // We want: Mon=0...Sun=6
        const startDayOffset = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

        return { daysInMonth, startDayOffset };
    };

    const { daysInMonth, startDayOffset } = getDaysInMonth(currentDate);

    // Array for days: [1, 2, ..., 31]
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    // Array for empty slots at start
    const emptySlots = Array.from({ length: startDayOffset });

    const changeMonth = (offset: number) => {
        const newDate = new Date(currentDate);
        newDate.setMonth(newDate.getMonth() + offset);
        setCurrentDate(newDate);
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden h-full flex flex-col">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-gray-50/50">
                <div className="flex items-center space-x-4">
                    <h2 className="text-lg font-semibold text-gray-900">Eğitim Takvimi</h2>
                    <div className="flex items-center space-x-1 bg-white rounded-md border border-gray-200 p-1">
                        <button onClick={() => changeMonth(-1)} className="p-1 hover:bg-gray-100 rounded"><ChevronLeft className="h-4 w-4 text-gray-500" /></button>
                        <span className="px-3 text-sm font-medium text-gray-700 min-w-[100px] text-center capitalize">{formattedMonth}</span>
                        <button onClick={() => changeMonth(1)} className="p-1 hover:bg-gray-100 rounded"><ChevronRight className="h-4 w-4 text-gray-500" /></button>
                    </div>
                </div>
                <button className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 shadow-sm transition-colors">
                    <Plus className="h-4 w-4 mr-1.5" />
                    Eğitim Planla
                </button>
            </div>

            <div className="grid grid-cols-7 border-b border-gray-200 bg-gray-50 text-xs font-semibold text-gray-500 text-center py-2">
                <div>Pzt</div><div>Sal</div><div>Çar</div><div>Per</div><div>Cum</div><div>Cmt</div><div>Paz</div>
            </div>

            <div className="grid grid-cols-7 auto-rows-fr bg-white text-sm flex-1">
                {/* Empty slots for offset */}
                {emptySlots.map((_, i) => (
                    <div key={`empty-${i}`} className="min-h-[8rem] border-b border-r border-gray-100 bg-gray-50/30"></div>
                ))}

                {days.map((day) => {
                    // Filter events for this specific day AND current month/year match
                    // For simplified demo, we assume the 'day' in events refers to the day of the *displayed* month if passed simply as 'day'.
                    // Ideally, events should have full Date objects.
                    // Adhering to the task "dynamic events": we filter by simple 'day' prop on the assumption they belong to current view.
                    const dayEvents = events.filter(s => s.day === day);

                    return (
                        <div key={day} className="min-h-[8rem] p-2 border-b border-r border-gray-100 relative group hover:bg-gray-50/50 transition-colors">
                            <span className={cn(
                                "text-xs font-medium text-gray-400 block mb-1",
                                dayEvents.length > 0 && "text-blue-600 font-bold"
                            )}>
                                {day}
                            </span>
                            <div className="space-y-1.5">
                                {dayEvents.map(event => (
                                    <div key={event.id} className="p-1.5 rounded bg-blue-50 border border-blue-100 hover:bg-blue-100 hover:border-blue-200 transition-colors cursor-pointer group/event">
                                        <div className="flex items-center justify-between mb-0.5">
                                            <span className="text-[10px] font-bold text-blue-700">{event.time}</span>
                                            {event.type === 'onsite' && <Users className="h-3 w-3 text-purple-500" />}
                                        </div>
                                        <div className="text-xs font-medium text-gray-900 truncate" title={event.title}>{event.title}</div>
                                        <div className="text-[10px] text-gray-500 truncate">{event.customer}</div>
                                    </div>
                                ))}
                            </div>

                        </div>
                    );
                })}

                {/* Fill remaining cells to complete the grid visually if needed (optional, keeping simple for now) */}
            </div>
        </div>
    );
}
