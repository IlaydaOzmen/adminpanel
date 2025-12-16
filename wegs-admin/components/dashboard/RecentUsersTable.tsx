"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Clock, Users, Activity, ChevronRight, TrendingUp } from "lucide-react";

interface RecentUser {
    name: string;
    email: string;
    status: "Active" | "Passive";
    lastLogin: string;
    sessionDuration: string;
    company: string;
}

const recentUsers: RecentUser[] = [
    { name: "Ahmet Yılmaz", email: "ahmet@ornek.com", status: "Active", lastLogin: "2 dk önce", sessionDuration: "15 dk", company: "Tech Solutions" },
    { name: "Ayşe Demir", email: "ayse@firma.com", status: "Active", lastLogin: "5 dk önce", sessionDuration: "42 dk", company: "Moda Butik" },
    { name: "Mehmet Kaya", email: "mehmet@ticaret.com", status: "Passive", lastLogin: "3 saat önce", sessionDuration: "8 dk", company: "Ticaret Ltd" },
    { name: "Zeynep Çelik", email: "zeynep@magaza.com", status: "Active", lastLogin: "1 gün önce", sessionDuration: "25 dk", company: "Mağaza A.Ş." },
    { name: "Caner Erkin", email: "caner@spor.com", status: "Active", lastLogin: "2 gün önce", sessionDuration: "10 dk", company: "Spor Outlet" },
];

export function RecentUsersTable() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const activeCount = recentUsers.filter(u => u.status === "Active").length;
    const totalDuration = recentUsers.reduce((sum, u) => sum + parseInt(u.sessionDuration), 0);

    return (
        <div className="rounded-xl bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-5 shadow-lg ring-1 ring-purple-200/50 h-full relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-200/30 to-pink-200/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

            {/* Header */}
            <div className="relative mb-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl shadow-lg shadow-purple-200/50">
                            <Users className="w-4 h-4 text-white" />
                        </div>
                        <div>
                            <h3 className="text-sm font-bold text-gray-900">Son Aktif Kullanıcılar</h3>
                            <p className="text-xs text-gray-500">{activeCount} aktif kullanıcı</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-1 px-2 py-1 bg-green-100 rounded-full">
                        <Activity className="w-3 h-3 text-green-600" />
                        <span className="text-xs font-medium text-green-700">{totalDuration} dk</span>
                    </div>
                </div>
            </div>

            {/* User List */}
            <div className="space-y-2">
                {recentUsers.slice(0, 4).map((user, idx) => (
                    <div
                        key={user.email}
                        onMouseEnter={() => setHoveredIndex(idx)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        className={cn(
                            "flex items-center p-2.5 rounded-xl transition-all duration-200 cursor-pointer border",
                            hoveredIndex === idx
                                ? "bg-white shadow-md border-purple-200 scale-[1.02]"
                                : "bg-white/70 border-transparent hover:bg-white hover:shadow-sm"
                        )}
                    >
                        <div className={cn(
                            "w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold text-xs flex-shrink-0",
                            user.status === "Active"
                                ? "bg-gradient-to-br from-indigo-500 to-purple-500"
                                : "bg-gradient-to-br from-gray-400 to-gray-500"
                        )}>
                            {user.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="flex-1 min-w-0 ml-3">
                            <div className="flex items-center gap-2">
                                <p className="text-sm font-semibold text-gray-900 truncate">{user.name}</p>
                                {user.status === "Active" && (
                                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                )}
                            </div>
                            <p className="text-xs text-gray-500 truncate">{user.company}</p>
                        </div>
                        <div className="text-right flex-shrink-0 ml-2">
                            <p className="text-xs font-medium text-gray-900">{user.sessionDuration}</p>
                            <p className="text-xs text-gray-400">{user.lastLogin}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Footer */}
            <button className="w-full mt-4 py-2.5 px-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl font-medium text-sm hover:from-indigo-600 hover:to-purple-600 transition-all shadow-lg shadow-purple-200 flex items-center justify-center gap-2 group">
                <span>Tüm Kullanıcıları Gör</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
        </div>
    );
}
