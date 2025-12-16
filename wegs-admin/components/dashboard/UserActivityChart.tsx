"use client";

import { useState } from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Area,
    AreaChart,
    ComposedChart,
    Bar
} from "recharts";
import { Activity, TrendingUp, TrendingDown, Users, UserCheck, Clock, Eye } from "lucide-react";
import { cn } from "@/lib/utils";

interface UserActivityChartProps {
    datePeriod: string;
}

const getData = (period: string) => {
    if (period === "Bugün") {
        return [
            { name: "00:00", active: 20, passive: 10, sessions: 15 },
            { name: "04:00", active: 10, passive: 5, sessions: 8 },
            { name: "08:00", active: 150, passive: 40, sessions: 120 },
            { name: "12:00", active: 400, passive: 120, sessions: 350 },
            { name: "16:00", active: 350, passive: 100, sessions: 300 },
            { name: "20:00", active: 200, passive: 80, sessions: 180 },
            { name: "23:59", active: 50, passive: 30, sessions: 45 },
        ];
    } else if (period === "Bu Ay") {
        return [
            { name: "Hafta 1", active: 1200, passive: 400, sessions: 980 },
            { name: "Hafta 2", active: 1500, passive: 500, sessions: 1200 },
            { name: "Hafta 3", active: 1100, passive: 450, sessions: 900 },
            { name: "Hafta 4", active: 1800, passive: 600, sessions: 1500 },
        ];
    } else if (period === "Özel") {
        return [
            { name: "1 Ara", active: 100, passive: 50, sessions: 85 },
            { name: "2 Ara", active: 120, passive: 60, sessions: 100 },
            { name: "3 Ara", active: 140, passive: 55, sessions: 115 },
            { name: "4 Ara", active: 110, passive: 40, sessions: 90 },
            { name: "5 Ara", active: 160, passive: 70, sessions: 130 },
        ];
    }
    // Default to Weekly
    return [
        { name: "Pzt", active: 400, passive: 240, sessions: 350 },
        { name: "Sal", active: 350, passive: 139, sessions: 290 },
        { name: "Çar", active: 420, passive: 180, sessions: 380 },
        { name: "Per", active: 380, passive: 190, sessions: 340 },
        { name: "Cum", active: 450, passive: 180, sessions: 400 },
        { name: "Cmt", active: 280, passive: 380, sessions: 250 },
        { name: "Paz", active: 220, passive: 430, sessions: 200 },
    ];
};

const getStats = (data: any[]) => {
    const totalActive = data.reduce((sum, d) => sum + d.active, 0);
    const totalPassive = data.reduce((sum, d) => sum + d.passive, 0);
    const totalSessions = data.reduce((sum, d) => sum + d.sessions, 0);
    const avgActive = Math.round(totalActive / data.length);

    return {
        totalActive,
        totalPassive,
        totalSessions,
        avgActive,
        activeRate: Math.round((totalActive / (totalActive + totalPassive)) * 100)
    };
};

type ViewMode = "area" | "line" | "bar";

export function UserActivityChart({ datePeriod }: UserActivityChartProps) {
    const [viewMode, setViewMode] = useState<ViewMode>("area");
    const data = getData(datePeriod);
    const stats = getStats(data);

    return (
        <div className="rounded-xl bg-white p-6 shadow-sm border border-gray-100">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-xl">
                        <Activity className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900">Kullanıcı Aktivitesi</h3>
                        <p className="text-sm text-gray-500">{datePeriod} verisi</p>
                    </div>
                </div>

                {/* View Mode Toggle */}
                <div className="flex items-center gap-1 p-1 bg-gray-100 rounded-lg">
                    {[
                        { mode: "area" as ViewMode, label: "Alan" },
                        { mode: "line" as ViewMode, label: "Çizgi" },
                        { mode: "bar" as ViewMode, label: "Çubuk" },
                    ].map((item) => (
                        <button
                            key={item.mode}
                            onClick={() => setViewMode(item.mode)}
                            className={cn(
                                "px-3 py-1.5 text-xs font-medium rounded-md transition-colors",
                                viewMode === item.mode
                                    ? "bg-white text-gray-900 shadow-sm"
                                    : "text-gray-600 hover:text-gray-900"
                            )}
                        >
                            {item.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                <div className="p-3 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
                    <div className="flex items-center gap-2 mb-1">
                        <UserCheck className="h-4 w-4 text-blue-600" />
                        <span className="text-xs text-gray-500">Aktif Kullanıcı</span>
                    </div>
                    <p className="text-xl font-bold text-gray-900">{stats.totalActive.toLocaleString('tr-TR')}</p>
                    <span className="text-xs text-green-600 flex items-center gap-1 mt-1">
                        <TrendingUp className="h-3 w-3" /> +12.5%
                    </span>
                </div>
                <div className="p-3 bg-gradient-to-br from-gray-50 to-slate-50 rounded-xl border border-gray-100">
                    <div className="flex items-center gap-2 mb-1">
                        <Users className="h-4 w-4 text-gray-500" />
                        <span className="text-xs text-gray-500">Pasif Kullanıcı</span>
                    </div>
                    <p className="text-xl font-bold text-gray-900">{stats.totalPassive.toLocaleString('tr-TR')}</p>
                    <span className="text-xs text-red-500 flex items-center gap-1 mt-1">
                        <TrendingDown className="h-3 w-3" /> -5.2%
                    </span>
                </div>
                <div className="p-3 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-100">
                    <div className="flex items-center gap-2 mb-1">
                        <Eye className="h-4 w-4 text-green-600" />
                        <span className="text-xs text-gray-500">Oturumlar</span>
                    </div>
                    <p className="text-xl font-bold text-gray-900">{stats.totalSessions.toLocaleString('tr-TR')}</p>
                    <span className="text-xs text-green-600 flex items-center gap-1 mt-1">
                        <TrendingUp className="h-3 w-3" /> +8.3%
                    </span>
                </div>
                <div className="p-3 bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl border border-purple-100">
                    <div className="flex items-center gap-2 mb-1">
                        <Clock className="h-4 w-4 text-purple-600" />
                        <span className="text-xs text-gray-500">Aktif Oranı</span>
                    </div>
                    <p className="text-xl font-bold text-gray-900">%{stats.activeRate}</p>
                    <span className="text-xs text-green-600 flex items-center gap-1 mt-1">
                        <TrendingUp className="h-3 w-3" /> +2.1%
                    </span>
                </div>
            </div>

            {/* Chart */}
            <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                    {viewMode === "area" ? (
                        <AreaChart data={data}>
                            <defs>
                                <linearGradient id="colorActive" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="colorPassive" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#9ca3af" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#9ca3af" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="colorSessions" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                            <XAxis
                                dataKey="name"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#6b7280', fontSize: 12 }}
                            />
                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#6b7280', fontSize: 12 }}
                            />
                            <Tooltip
                                contentStyle={{
                                    borderRadius: '12px',
                                    border: 'none',
                                    boxShadow: '0 10px 25px -5px rgb(0 0 0 / 0.1)',
                                    padding: '12px'
                                }}
                            />
                            <Area
                                type="monotone"
                                dataKey="active"
                                name="Aktif Kullanıcı"
                                stroke="#3b82f6"
                                strokeWidth={2}
                                fill="url(#colorActive)"
                            />
                            <Area
                                type="monotone"
                                dataKey="passive"
                                name="Pasif Kullanıcı"
                                stroke="#9ca3af"
                                strokeWidth={2}
                                fill="url(#colorPassive)"
                            />
                            <Area
                                type="monotone"
                                dataKey="sessions"
                                name="Oturumlar"
                                stroke="#22c55e"
                                strokeWidth={2}
                                fill="url(#colorSessions)"
                            />
                        </AreaChart>
                    ) : viewMode === "line" ? (
                        <LineChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                            <XAxis
                                dataKey="name"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#6b7280', fontSize: 12 }}
                            />
                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#6b7280', fontSize: 12 }}
                            />
                            <Tooltip
                                contentStyle={{
                                    borderRadius: '12px',
                                    border: 'none',
                                    boxShadow: '0 10px 25px -5px rgb(0 0 0 / 0.1)',
                                    padding: '12px'
                                }}
                            />
                            <Line
                                type="monotone"
                                dataKey="active"
                                name="Aktif Kullanıcı"
                                stroke="#3b82f6"
                                strokeWidth={3}
                                dot={{ r: 4, fill: "#3b82f6" }}
                                activeDot={{ r: 6 }}
                            />
                            <Line
                                type="monotone"
                                dataKey="passive"
                                name="Pasif Kullanıcı"
                                stroke="#9ca3af"
                                strokeWidth={3}
                                dot={{ r: 4, fill: "#9ca3af" }}
                            />
                            <Line
                                type="monotone"
                                dataKey="sessions"
                                name="Oturumlar"
                                stroke="#22c55e"
                                strokeWidth={3}
                                dot={{ r: 4, fill: "#22c55e" }}
                            />
                        </LineChart>
                    ) : (
                        <ComposedChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                            <XAxis
                                dataKey="name"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#6b7280', fontSize: 12 }}
                            />
                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#6b7280', fontSize: 12 }}
                            />
                            <Tooltip
                                contentStyle={{
                                    borderRadius: '12px',
                                    border: 'none',
                                    boxShadow: '0 10px 25px -5px rgb(0 0 0 / 0.1)',
                                    padding: '12px'
                                }}
                            />
                            <Bar dataKey="active" name="Aktif Kullanıcı" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                            <Bar dataKey="passive" name="Pasif Kullanıcı" fill="#9ca3af" radius={[4, 4, 0, 0]} />
                            <Line
                                type="monotone"
                                dataKey="sessions"
                                name="Oturumlar"
                                stroke="#22c55e"
                                strokeWidth={3}
                                dot={{ r: 4, fill: "#22c55e" }}
                            />
                        </ComposedChart>
                    )}
                </ResponsiveContainer>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap items-center justify-center gap-6 mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500" />
                    <span className="text-sm text-gray-600">Aktif Kullanıcı</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-gray-400" />
                    <span className="text-sm text-gray-600">Pasif Kullanıcı</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                    <span className="text-sm text-gray-600">Oturumlar</span>
                </div>
            </div>
        </div>
    );
}
