"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";

const complaintData = [
    { name: "Sistem Hataları", value: 35, color: "#ef4444" },
    { name: "Fiyatlandırma", value: 25, color: "#f59e0b" },
    { name: "Arayüz / UX", value: 20, color: "#3b82f6" },
    { name: "Müşteri Hizmetleri", value: 15, color: "#8b5cf6" },
    { name: "Diğer", value: 5, color: "#64748b" },
];

const satisfactionData = [
    { name: "Ocak", score: 4.2 },
    { name: "Şubat", score: 4.3 },
    { name: "Mart", score: 4.1 },
    { name: "Nisan", score: 4.5 },
    { name: "Mayıs", score: 4.6 },
    { name: "Haziran", score: 4.4 },
];

export function ComplaintStats() {
    return (
        <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Şikayet Kategorileri</h3>
                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={complaintData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {complaintData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Memnuniyet Trendi</h3>
                <div className="h-[200px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={satisfactionData}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                            <YAxis domain={[0, 5]} axisLine={false} tickLine={false} />
                            <Tooltip cursor={{ fill: 'transparent' }} />
                            <Bar dataKey="score" fill="#10b981" radius={[4, 4, 0, 0]} barSize={30} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}
