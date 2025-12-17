"use client";

import { Tag } from "lucide-react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell
} from "recharts";

const tagData = [
    { name: "Fatura Sorunu", count: 1240, color: "#3b82f6" },
    { name: "Kargo Takip", count: 980, color: "#10b981" },
    { name: "İade Talebi", count: 850, color: "#f59e0b" },
    { name: "Ürün Bilgisi", count: 620, color: "#8b5cf6" },
    { name: "Ödeme Hatası", count: 450, color: "#ef4444" },
];

export function TagAnalysis() {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 h-full">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-indigo-50 rounded-lg">
                    <Tag className="h-6 w-6 text-indigo-600" />
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-gray-900">Etiket Analizi</h3>
                    <p className="text-sm text-gray-500">Müşteri taleplerinin konulara göre dağılımı</p>
                </div>
            </div>

            <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={tagData} layout="vertical" margin={{ left: 40 }}>
                        <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f0f0f0" />
                        <XAxis type="number" hide />
                        <YAxis
                            dataKey="name"
                            type="category"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 12, fill: "#6b7280" }}
                            width={100}
                        />
                        <Tooltip
                            cursor={{ fill: 'transparent' }}
                            contentStyle={{
                                backgroundColor: "#fff",
                                borderRadius: "8px",
                                border: "1px solid #e5e7eb",
                                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)"
                            }}
                        />
                        <Bar dataKey="count" radius={[0, 4, 4, 0]} barSize={32}>
                            {tagData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
