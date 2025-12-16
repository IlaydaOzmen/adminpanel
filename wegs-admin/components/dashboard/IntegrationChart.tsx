"use client";

import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { TrendingUp, Store, ChevronRight, X, ShoppingBag, Package } from "lucide-react";
import { cn } from "@/lib/utils";

interface PlatformData {
    name: string;
    value: number;
    color: string;
    gradientFrom: string;
    gradientTo: string;
    growth: number;
    customers: string[];
}

const data: PlatformData[] = [
    {
        name: "Trendyol",
        value: 450,
        color: "#f97316",
        gradientFrom: "#f97316",
        gradientTo: "#ea580c",
        growth: 15.2,
        customers: ["Moda Butik", "Tekno Store", "Ev Dünyası", "Spor Outlet"]
    },
    {
        name: "Hepsiburada",
        value: 320,
        color: "#ef4444",
        gradientFrom: "#ef4444",
        gradientTo: "#dc2626",
        growth: 12.8,
        customers: ["ElektroMarket", "Kitap Köşesi", "Kozmetik Plus"]
    },
    {
        name: "N11",
        value: 210,
        color: "#22c55e",
        gradientFrom: "#22c55e",
        gradientTo: "#16a34a",
        growth: 8.4,
        customers: ["Mobilya Center", "Oyuncak Dünyası"]
    },
    {
        name: "Amazon",
        value: 150,
        color: "#3b82f6",
        gradientFrom: "#3b82f6",
        gradientTo: "#2563eb",
        growth: 22.5,
        customers: ["Tech Store", "Books & More"]
    },
    {
        name: "Çiçeksepeti",
        value: 80,
        color: "#ec4899",
        gradientFrom: "#ec4899",
        gradientTo: "#db2777",
        growth: 5.7,
        customers: ["Hediye Dünyası"]
    },
    {
        name: "Diğer",
        value: 120,
        color: "#64748b",
        gradientFrom: "#64748b",
        gradientTo: "#475569",
        growth: 3.2,
        customers: ["GittiGidiyor", "Letgo", "Sahibinden"]
    },
];

export function IntegrationChart() {
    const [selectedPlatform, setSelectedPlatform] = useState<PlatformData | null>(null);
    const [hoveredBar, setHoveredBar] = useState<number | null>(null);

    const total = data.reduce((sum, d) => sum + d.value, 0);
    const avgGrowth = data.reduce((sum, d) => sum + d.growth, 0) / data.length;

    const handleBarClick = (entry: PlatformData) => {
        setSelectedPlatform(entry);
    };

    return (
        <div className="rounded-xl bg-gradient-to-br from-white via-slate-50 to-blue-50 p-6 shadow-lg ring-1 ring-gray-900/5 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-100/40 to-purple-100/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

            {/* Header */}
            <div className="flex items-center justify-between mb-6 relative">
                <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl shadow-lg shadow-orange-200/50">
                        <Store className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900">Pazaryeri Entegrasyonları</h3>
                        <p className="text-sm text-gray-500">Toplam {total.toLocaleString('tr-TR')} müşteri</p>
                    </div>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 border border-green-100 rounded-full">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-semibold text-green-700">+{avgGrowth.toFixed(1)}%</span>
                </div>
            </div>

            {/* Chart */}
            <div className="h-64 relative">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={data}
                        margin={{ top: 10, right: 10, left: -10, bottom: 5 }}
                        onMouseLeave={() => setHoveredBar(null)}
                    >
                        <defs>
                            {data.map((item, index) => (
                                <linearGradient key={`gradient-${index}`} id={`barGradient-${index}`} x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor={item.gradientFrom} />
                                    <stop offset="100%" stopColor={item.gradientTo} />
                                </linearGradient>
                            ))}
                        </defs>
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#6b7280', fontSize: 11 }}
                            dy={8}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#9ca3af', fontSize: 11 }}
                            width={35}
                        />
                        <Tooltip
                            cursor={{ fill: 'rgba(0,0,0,0.04)', radius: 8 }}
                            contentStyle={{
                                borderRadius: '12px',
                                border: 'none',
                                boxShadow: '0 10px 25px -5px rgb(0 0 0 / 0.1)',
                                padding: '12px 16px'
                            }}
                            formatter={(value: number) => [`${value} müşteri`, '']}
                            labelFormatter={(label) => <span className="font-semibold">{label}</span>}
                        />
                        <Bar
                            dataKey="value"
                            radius={[8, 8, 0, 0]}
                            barSize={36}
                            onClick={(entry) => handleBarClick(entry as unknown as PlatformData)}
                            style={{ cursor: 'pointer' }}
                        >
                            {data.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={`url(#barGradient-${index})`}
                                    style={{
                                        filter: hoveredBar === index ? 'brightness(1.1)' : 'none',
                                        transition: 'filter 0.2s ease'
                                    }}
                                    onMouseEnter={() => setHoveredBar(index)}
                                />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Platform Cards */}
            <div className="mt-4 grid grid-cols-3 gap-2">
                {data.slice(0, 3).map((platform, idx) => (
                    <div
                        key={platform.name}
                        onClick={() => handleBarClick(platform)}
                        className="p-3 bg-white/70 hover:bg-white rounded-xl border border-gray-100 hover:border-gray-200 cursor-pointer transition-all hover:shadow-sm group"
                    >
                        <div className="flex items-center gap-2 mb-2">
                            <div
                                className="w-2 h-2 rounded-full"
                                style={{ background: `linear-gradient(135deg, ${platform.gradientFrom}, ${platform.gradientTo})` }}
                            />
                            <span className="text-xs font-medium text-gray-600 truncate">{platform.name}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-lg font-bold text-gray-900">{platform.value}</span>
                            <span className={cn(
                                "text-xs font-medium",
                                platform.growth >= 10 ? "text-green-600" : "text-gray-500"
                            )}>
                                +{platform.growth}%
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {selectedPlatform && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                        <div
                            className="p-5 text-white"
                            style={{ background: `linear-gradient(135deg, ${selectedPlatform.gradientFrom}, ${selectedPlatform.gradientTo})` }}
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                                        <ShoppingBag className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold">{selectedPlatform.name}</h3>
                                        <p className="text-white/80 text-sm">{selectedPlatform.value} müşteri</p>
                                    </div>
                                </div>
                                <button onClick={() => setSelectedPlatform(null)} className="p-2 hover:bg-white/20 rounded-full transition-colors">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        <div className="p-5">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="flex-1 p-4 bg-gray-50 rounded-xl text-center">
                                    <p className="text-2xl font-bold text-gray-900">{selectedPlatform.value}</p>
                                    <p className="text-xs text-gray-500">Toplam Müşteri</p>
                                </div>
                                <div className="flex-1 p-4 bg-green-50 rounded-xl text-center">
                                    <p className="text-2xl font-bold text-green-600">+{selectedPlatform.growth}%</p>
                                    <p className="text-xs text-gray-500">Büyüme</p>
                                </div>
                            </div>

                            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-3">Örnek Müşteriler</p>
                            <div className="space-y-2">
                                {selectedPlatform.customers.map((customer, idx) => (
                                    <div key={idx} className="flex items-center p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer group">
                                        <div
                                            className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-bold mr-3"
                                            style={{ background: `linear-gradient(135deg, ${selectedPlatform.gradientFrom}, ${selectedPlatform.gradientTo})` }}
                                        >
                                            {customer.charAt(0)}
                                        </div>
                                        <span className="text-sm font-medium text-gray-700 flex-1">{customer}</span>
                                        <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-gray-500 transition-colors" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="p-5 bg-gray-50 border-t border-gray-100">
                            <button
                                onClick={() => setSelectedPlatform(null)}
                                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                                Kapat
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
