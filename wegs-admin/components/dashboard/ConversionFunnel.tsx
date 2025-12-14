"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { ArrowRight } from "lucide-react";

const data = [
    { name: "Web Ziyaretçisi", value: 12500, drop: 0 },
    { name: "Kayıtlı Kullanıcı", value: 4500, drop: 64 },
    { name: "Aktif Deneme", value: 3200, drop: 28 },
    { name: "Ödeme Yapan", value: 1800, drop: 43 },
    { name: "Sadık Müşteri", value: 950, drop: 47 },
];

const colors = ["#94a3b8", "#64748b", "#3b82f6", "#2563eb", "#1e40af"];

export function ConversionFunnel() {
    return (
        <div className="rounded-xl bg-white p-6 shadow-sm border border-gray-50 ring-0 dark:bg-gray-800 dark:border-gray-700">
            <h3 className="text-base font-semibold leading-7 text-gray-900 dark:text-white">Dönüşüm Hunisi</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Ziyaretçiden sadık müşteriye dönüşüm yolculuğu.</p>

            <div className="mt-6 flex flex-col gap-6 lg:flex-row">
                {/* Chart Side */}
                <div className="h-[300px] w-full lg:w-2/3">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={data}
                            layout="vertical"
                            margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
                        >
                            <XAxis type="number" hide />
                            <YAxis
                                dataKey="name"
                                type="category"
                                axisLine={false}
                                tickLine={false}
                                width={120}
                                tick={{ fontSize: 12, fill: '#64748b' }}
                            />
                            <Tooltip
                                cursor={{ fill: 'transparent' }}
                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                            />
                            <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={32}>
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={colors[index]} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Breakdown Side */}
                <div className="flex w-full flex-col justify-center gap-4 lg:w-1/3">
                    {data.map((step, idx) => (
                        <div key={idx} className="relative flex items-center justify-between rounded-lg border border-transparent bg-gray-50 p-3 dark:bg-gray-700/50 dark:border-gray-600">
                            <div className="flex items-center gap-3">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-xs font-bold text-gray-600 shadow-sm dark:bg-gray-600 dark:text-gray-200">
                                    {idx + 1}
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400">{step.name}</span>
                                    <span className="text-sm font-bold text-gray-900 dark:text-white">{step.value.toLocaleString('tr-TR')}</span>
                                </div>
                            </div>

                            {idx > 0 && (
                                <div className="flex items-center text-xs font-medium text-red-500 bg-red-50 dark:bg-red-900/20 px-2 py-1 rounded">
                                    -{step.drop}%
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
