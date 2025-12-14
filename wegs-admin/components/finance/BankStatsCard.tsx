"use client";

import { cn } from "@/lib/utils";
import { CheckCircle2, AlertTriangle, Clock } from "lucide-react";
import Link from "next/link";

interface BankStatsCardProps {
    name: string;
    logoColor: string; // Tailwind class for mock logo bg
    activeCount: number;
    totalCount: number;
    status: "stable" | "maintenance" | "issues";
    onToggleMaintenance?: () => void;
}

export function BankStatsCard({ name, logoColor, activeCount, totalCount, status, onToggleMaintenance }: BankStatsCardProps) {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
                <div className="flex items-center space-x-3">
                    <div className={cn("h-10 w-10 rounded-lg flex items-center justify-center text-white font-bold text-lg", logoColor)}>
                        {name.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                        <h3 className="text-gray-900 font-semibold">{name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                            <span className={cn(
                                "inline-flex items-center text-xs font-medium px-2 py-0.5 rounded-full",
                                status === "stable" ? "bg-green-100 text-green-700" :
                                    status === "maintenance" ? "bg-yellow-100 text-yellow-700" :
                                        "bg-red-100 text-red-700"
                            )}>
                                {status === "stable" ? "Stabil" : status === "maintenance" ? "Bakımda" : "Sorunlu"}
                            </span>
                            {onToggleMaintenance && (
                                <button
                                    onClick={onToggleMaintenance}
                                    className="text-gray-400 hover:text-gray-600 p-0.5 rounded-md hover:bg-gray-100 transition-colors"
                                    title="Bakım Modunu Değiştir"
                                >
                                    <Clock className="w-3 h-3" />
                                </button>
                            )}
                        </div>
                    </div>
                </div>
                <div className="text-right">
                    <p className="text-2xl font-bold text-gray-900">{activeCount}</p>
                    <p className="text-xs text-gray-500">Aktif Hesap</p>
                </div>
            </div>

            <div className="mt-6">
                <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-gray-500">Pazar Payı</span>
                    <span className="font-medium text-gray-900">
                        {Math.round((activeCount / totalCount) * 100)}%
                    </span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                    <div
                        className={cn("h-2 rounded-full", logoColor)}
                        style={{ width: `${(activeCount / totalCount) * 100}%` }}
                    />
                </div>
                <div className="mt-4 flex items-center justify-between text-xs text-gray-400">
                    <div className="flex items-center">
                        <CheckCircle2 className="h-3 w-3 mr-1 text-green-500" />
                        Son kontrol: 2dk önce
                    </div>
                    <Link href={`/finance/${name}`} className="hover:text-blue-600 transition-colors">Detaylar</Link>
                </div>
            </div>
        </div>
    );
}
