"use client";

import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface KPICardProps {
    id: string;
    title: string;
    value: string | number;
    change?: string;
    changeType?: "positive" | "negative" | "neutral";
    icon: React.ElementType;
    iconColor?: string;
    bgColor?: string;
    isSelected?: boolean;
    onToggle?: (id: string, selected: boolean) => void;
    selectable?: boolean;
}

export function KPICard({
    id,
    title,
    value,
    change,
    changeType = "neutral",
    icon: Icon,
    iconColor = "text-blue-600",
    bgColor = "bg-blue-50",
    isSelected = false,
    onToggle,
    selectable = true,
}: KPICardProps) {
    const handleClick = () => {
        if (selectable && onToggle) {
            onToggle(id, !isSelected);
        }
    };

    return (
        <div
            onClick={handleClick}
            className={cn(
                "rounded-xl bg-white p-6 shadow-sm ring-1 transition-all duration-200",
                selectable && "cursor-pointer hover:shadow-md",
                isSelected
                    ? "ring-2 ring-blue-500 bg-blue-50/30"
                    : "ring-gray-900/5 hover:ring-gray-900/10"
            )}
        >
            <div className="flex items-start justify-between">
                <div className="flex items-center">
                    <div className={cn("rounded-lg p-3", bgColor)}>
                        <Icon className={cn("h-6 w-6", iconColor)} />
                    </div>
                    <div className="ml-4">
                        <p className="text-sm font-medium text-gray-500">{title}</p>
                        <p className="mt-1 text-2xl font-bold text-gray-900">{value}</p>
                    </div>
                </div>
                {selectable && (
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => { }}
                            className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                            onClick={(e) => e.stopPropagation()}
                        />
                    </div>
                )}
            </div>
            {change && (
                <div className="mt-4 flex items-center">
                    <span
                        className={cn(
                            "inline-flex items-center text-sm font-medium",
                            changeType === "positive" && "text-green-600",
                            changeType === "negative" && "text-red-600",
                            changeType === "neutral" && "text-gray-500"
                        )}
                    >
                        {change}
                    </span>
                    <span className="ml-2 text-sm text-gray-500">vs geçen ay</span>
                </div>
            )}
        </div>
    );
}
