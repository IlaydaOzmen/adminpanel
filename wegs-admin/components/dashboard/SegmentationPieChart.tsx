"use client";

import { useRouter } from "next/navigation";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Building2, Store, ShoppingCart, ExternalLink, Users } from "lucide-react";
import { cn } from "@/lib/utils";

interface SegmentData {
    name: string;
    value: number;
    color: string;
    gradientTo: string;
    segmentKey: string;
    icon: React.ReactNode;
    [key: string]: string | number | React.ReactNode;
}

const data: SegmentData[] = [
    {
        name: "Sadece Muhasebe",
        value: 400,
        color: "#3b82f6",
        gradientTo: "#2563eb",
        segmentKey: "muhasebe",
        icon: <Building2 className="w-3.5 h-3.5" />
    },
    {
        name: "Muh. + Pazaryeri",
        value: 300,
        color: "#10b981",
        gradientTo: "#059669",
        segmentKey: "pazaryeri",
        icon: <Store className="w-3.5 h-3.5" />
    },
    {
        name: "Full E-ticaret",
        value: 300,
        color: "#f59e0b",
        gradientTo: "#d97706",
        segmentKey: "full_eticaret",
        icon: <ShoppingCart className="w-3.5 h-3.5" />
    },
];

export function SegmentationPieChart() {
    const router = useRouter();
    const total = data.reduce((sum, d) => sum + d.value, 0);

    const handlePieClick = (entry: SegmentData) => {
        router.push(`/customers/segment?segment=${entry.segmentKey}`);
    };

    return (
        <div className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-gray-900/5 h-full flex flex-col">
            {/* Compact Header */}
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-gray-400" />
                    <h3 className="text-sm font-semibold text-gray-900">Müşteri Segmentasyonu</h3>
                </div>
                <button
                    onClick={() => router.push("/customers/segment?segment=all")}
                    className="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
                >
                    Tümü
                    <ExternalLink className="w-3 h-3" />
                </button>
            </div>

            {/* Compact Chart + Legend Row */}
            <div className="flex items-center gap-4">
                {/* Mini Pie Chart */}
                <div className="w-24 h-24 flex-shrink-0">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                innerRadius={25}
                                outerRadius={40}
                                paddingAngle={3}
                                dataKey="value"
                                onClick={(_, index) => handlePieClick(data[index])}
                                style={{ cursor: 'pointer' }}
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip
                                formatter={(value: number) => [`${value} müşteri`, '']}
                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', padding: '8px 12px', fontSize: '12px' }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* Compact Legend */}
                <div className="flex-1 space-y-1.5">
                    {data.map((item) => {
                        const percentage = ((item.value / total) * 100).toFixed(0);
                        return (
                            <div
                                key={item.segmentKey}
                                onClick={() => handlePieClick(item)}
                                className="flex items-center justify-between p-1.5 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors group"
                            >
                                <div className="flex items-center gap-2">
                                    <div
                                        className="w-5 h-5 rounded flex items-center justify-center text-white"
                                        style={{ background: `linear-gradient(135deg, ${item.color}, ${item.gradientTo})` }}
                                    >
                                        {item.icon}
                                    </div>
                                    <span className="text-xs text-gray-600 group-hover:text-gray-900">{item.name}</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <span className="text-xs text-gray-400">{percentage}%</span>
                                    <span className="text-xs font-semibold text-gray-900">{item.value}</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Total Footer */}
            <div className="mt-3 pt-2 border-t border-gray-100 flex items-center justify-between">
                <span className="text-xs text-gray-400">Toplam</span>
                <span className="text-sm font-bold text-gray-900">{total.toLocaleString('tr-TR')} müşteri</span>
            </div>
        </div>
    );
}
