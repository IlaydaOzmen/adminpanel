"use client";

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts";

interface UserActivityChartProps {
    datePeriod: string;
}

const getData = (period: string) => {
    if (period === "Bugün") {
        return [
            { name: "00:00", active: 20, passive: 10 },
            { name: "04:00", active: 10, passive: 5 },
            { name: "08:00", active: 150, passive: 40 },
            { name: "12:00", active: 400, passive: 120 },
            { name: "16:00", active: 350, passive: 100 },
            { name: "20:00", active: 200, passive: 80 },
            { name: "23:59", active: 50, passive: 30 },
        ];
    } else if (period === "Bu Ay") {
        return [
            { name: "Hafta 1", active: 1200, passive: 400 },
            { name: "Hafta 2", active: 1500, passive: 500 },
            { name: "Hafta 3", active: 1100, passive: 450 },
            { name: "Hafta 4", active: 1800, passive: 600 },
        ];
    } else if (period === "Özel") {
        return [
            { name: "1 Ara", active: 100, passive: 50 },
            { name: "2 Ara", active: 120, passive: 60 },
            { name: "3 Ara", active: 140, passive: 55 },
            { name: "4 Ara", active: 110, passive: 40 },
            { name: "5 Ara", active: 160, passive: 70 },
        ];
    }
    // Default to Weekly
    return [
        { name: "Pzt", active: 400, passive: 240 },
        { name: "Sal", active: 300, passive: 139 },
        { name: "Çar", active: 200, passive: 980 },
        { name: "Per", active: 278, passive: 390 },
        { name: "Cum", active: 189, passive: 480 },
        { name: "Cmt", active: 239, passive: 380 },
        { name: "Paz", active: 349, passive: 430 },
    ];
};

export function UserActivityChart({ datePeriod }: UserActivityChartProps) {
    const data = getData(datePeriod);

    return (
        <div className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-gray-900/5">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Kullanıcı Aktivitesi ({datePeriod})</h3>
            <div className="mt-4 h-72">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#6b7280', fontSize: 12 }}
                            dy={10}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#6b7280', fontSize: 12 }}
                        />
                        <Tooltip
                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        />
                        <Legend />
                        <Line
                            type="monotone"
                            dataKey="active"
                            name="Aktif Kullanıcı"
                            stroke="#3b82f6"
                            strokeWidth={3}
                            dot={false}
                            activeDot={{ r: 6 }}
                        />
                        <Line
                            type="monotone"
                            dataKey="passive"
                            name="Pasif Kullanıcı"
                            stroke="#9ca3af"
                            strokeWidth={3}
                            dot={false}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
