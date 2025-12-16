"use client";

import { useState } from "react";
import {
    PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend,
    AreaChart, Area, XAxis, YAxis, CartesianGrid,
    LineChart, Line, ComposedChart, Bar
} from "recharts";
import { TrendingUp, TrendingDown, Star, ThumbsUp, ThumbsDown, Users, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { cn } from "@/lib/utils";

const complaintData = [
    { name: "Sistem Hataları", value: 35, color: "#ef4444" },
    { name: "Fiyatlandırma", value: 25, color: "#f59e0b" },
    { name: "Arayüz / UX", value: 20, color: "#3b82f6" },
    { name: "Müşteri Hizmetleri", value: 15, color: "#8b5cf6" },
    { name: "Diğer", value: 5, color: "#64748b" },
];

// Genişletilmiş memnuniyet verileri
const satisfactionData = [
    { name: "Oca", score: 4.2, nps: 42, positive: 78, negative: 22, responses: 156 },
    { name: "Şub", score: 4.3, nps: 45, positive: 82, negative: 18, responses: 189 },
    { name: "Mar", score: 4.1, nps: 38, positive: 75, negative: 25, responses: 201 },
    { name: "Nis", score: 4.5, nps: 52, positive: 86, negative: 14, responses: 178 },
    { name: "May", score: 4.6, nps: 58, positive: 89, negative: 11, responses: 212 },
    { name: "Haz", score: 4.4, nps: 48, positive: 84, negative: 16, responses: 195 },
    { name: "Tem", score: 4.7, nps: 62, positive: 91, negative: 9, responses: 223 },
    { name: "Ağu", score: 4.5, nps: 55, positive: 87, negative: 13, responses: 198 },
    { name: "Eyl", score: 4.6, nps: 59, positive: 88, negative: 12, responses: 215 },
    { name: "Eki", score: 4.8, nps: 65, positive: 92, negative: 8, responses: 234 },
    { name: "Kas", score: 4.7, nps: 61, positive: 90, negative: 10, responses: 228 },
    { name: "Ara", score: 4.9, nps: 68, positive: 94, negative: 6, responses: 245 },
];

// Son 6 ay için veri
const recentData = satisfactionData.slice(-6);

// İstatistikler
const currentScore = satisfactionData[satisfactionData.length - 1].score;
const previousScore = satisfactionData[satisfactionData.length - 2].score;
const scoreChange = ((currentScore - previousScore) / previousScore * 100).toFixed(1);
const currentNPS = satisfactionData[satisfactionData.length - 1].nps;
const previousNPS = satisfactionData[satisfactionData.length - 2].nps;
const avgPositive = Math.round(recentData.reduce((sum, d) => sum + d.positive, 0) / recentData.length);
const totalResponses = recentData.reduce((sum, d) => sum + d.responses, 0);

export function ComplaintStats() {
    const [viewMode, setViewMode] = useState<"score" | "nps" | "sentiment">("score");

    return (
        <div className="space-y-6">
            {/* Complaint Categories */}
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

            {/* Enhanced Satisfaction Trend */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900">Memnuniyet Trendi</h3>
                        <p className="text-sm text-gray-500">Son 6 aylık müşteri memnuniyet analizi</p>
                    </div>
                    {/* View Mode Toggle */}
                    <div className="flex items-center gap-1 p-1 bg-gray-100 rounded-lg">
                        <button
                            onClick={() => setViewMode("score")}
                            className={cn(
                                "px-3 py-1.5 text-xs font-medium rounded-md transition-colors",
                                viewMode === "score"
                                    ? "bg-white text-gray-900 shadow-sm"
                                    : "text-gray-600 hover:text-gray-900"
                            )}
                        >
                            Puan
                        </button>
                        <button
                            onClick={() => setViewMode("nps")}
                            className={cn(
                                "px-3 py-1.5 text-xs font-medium rounded-md transition-colors",
                                viewMode === "nps"
                                    ? "bg-white text-gray-900 shadow-sm"
                                    : "text-gray-600 hover:text-gray-900"
                            )}
                        >
                            NPS
                        </button>
                        <button
                            onClick={() => setViewMode("sentiment")}
                            className={cn(
                                "px-3 py-1.5 text-xs font-medium rounded-md transition-colors",
                                viewMode === "sentiment"
                                    ? "bg-white text-gray-900 shadow-sm"
                                    : "text-gray-600 hover:text-gray-900"
                            )}
                        >
                            Duygu
                        </button>
                    </div>
                </div>

                {/* Summary Stats */}
                <div className="grid grid-cols-4 gap-4 mb-6">
                    <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-100">
                        <div className="flex items-center justify-between mb-2">
                            <Star className="h-5 w-5 text-green-600" />
                            <span className={cn(
                                "inline-flex items-center text-xs font-medium",
                                Number(scoreChange) >= 0 ? "text-green-600" : "text-red-600"
                            )}>
                                {Number(scoreChange) >= 0 ? <ArrowUpRight className="h-3 w-3 mr-0.5" /> : <ArrowDownRight className="h-3 w-3 mr-0.5" />}
                                {scoreChange}%
                            </span>
                        </div>
                        <p className="text-2xl font-bold text-gray-900">{currentScore}</p>
                        <p className="text-xs text-gray-500">Memnuniyet Puanı</p>
                    </div>

                    <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
                        <div className="flex items-center justify-between mb-2">
                            <TrendingUp className="h-5 w-5 text-blue-600" />
                            <span className={cn(
                                "inline-flex items-center text-xs font-medium",
                                currentNPS > previousNPS ? "text-green-600" : "text-red-600"
                            )}>
                                {currentNPS > previousNPS ? <ArrowUpRight className="h-3 w-3 mr-0.5" /> : <ArrowDownRight className="h-3 w-3 mr-0.5" />}
                                {currentNPS - previousNPS}
                            </span>
                        </div>
                        <p className="text-2xl font-bold text-gray-900">{currentNPS}</p>
                        <p className="text-xs text-gray-500">NPS Skoru</p>
                    </div>

                    <div className="p-4 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl border border-emerald-100">
                        <div className="flex items-center justify-between mb-2">
                            <ThumbsUp className="h-5 w-5 text-emerald-600" />
                        </div>
                        <p className="text-2xl font-bold text-gray-900">%{avgPositive}</p>
                        <p className="text-xs text-gray-500">Olumlu Görüş</p>
                    </div>

                    <div className="p-4 bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl border border-purple-100">
                        <div className="flex items-center justify-between mb-2">
                            <Users className="h-5 w-5 text-purple-600" />
                        </div>
                        <p className="text-2xl font-bold text-gray-900">{totalResponses}</p>
                        <p className="text-xs text-gray-500">Toplam Yanıt</p>
                    </div>
                </div>

                {/* Chart */}
                <div className="h-[250px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        {viewMode === "score" ? (
                            <AreaChart data={recentData}>
                                <defs>
                                    <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                <XAxis
                                    dataKey="name"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 12, fill: '#6b7280' }}
                                />
                                <YAxis
                                    domain={[3.5, 5]}
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 12, fill: '#6b7280' }}
                                    tickFormatter={(value) => value.toFixed(1)}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: 'white',
                                        border: '1px solid #e5e7eb',
                                        borderRadius: '8px',
                                        boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'
                                    }}
                                    formatter={(value: number) => [value.toFixed(1), 'Puan']}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="score"
                                    stroke="#10b981"
                                    strokeWidth={3}
                                    fill="url(#colorScore)"
                                />
                            </AreaChart>
                        ) : viewMode === "nps" ? (
                            <ComposedChart data={recentData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                <XAxis
                                    dataKey="name"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 12, fill: '#6b7280' }}
                                />
                                <YAxis
                                    domain={[0, 80]}
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 12, fill: '#6b7280' }}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: 'white',
                                        border: '1px solid #e5e7eb',
                                        borderRadius: '8px',
                                        boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'
                                    }}
                                />
                                <Bar dataKey="nps" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={40} name="NPS" />
                                <Line type="monotone" dataKey="nps" stroke="#1d4ed8" strokeWidth={2} dot={{ fill: '#1d4ed8', strokeWidth: 2 }} name="Trend" />
                            </ComposedChart>
                        ) : (
                            <AreaChart data={recentData}>
                                <defs>
                                    <linearGradient id="colorPositive" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorNegative" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#ef4444" stopOpacity={0.4} />
                                        <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                <XAxis
                                    dataKey="name"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 12, fill: '#6b7280' }}
                                />
                                <YAxis
                                    domain={[0, 100]}
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 12, fill: '#6b7280' }}
                                    tickFormatter={(value) => `${value}%`}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: 'white',
                                        border: '1px solid #e5e7eb',
                                        borderRadius: '8px',
                                        boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'
                                    }}
                                    formatter={(value: number) => [`${value}%`]}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="positive"
                                    stroke="#10b981"
                                    strokeWidth={2}
                                    fill="url(#colorPositive)"
                                    name="Olumlu"
                                />
                                <Area
                                    type="monotone"
                                    dataKey="negative"
                                    stroke="#ef4444"
                                    strokeWidth={2}
                                    fill="url(#colorNegative)"
                                    name="Olumsuz"
                                />
                            </AreaChart>
                        )}
                    </ResponsiveContainer>
                </div>

                {/* Legend for Sentiment */}
                {viewMode === "sentiment" && (
                    <div className="flex items-center justify-center gap-6 mt-4">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-green-500" />
                            <span className="text-sm text-gray-600">Olumlu</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500" />
                            <span className="text-sm text-gray-600">Olumsuz</span>
                        </div>
                    </div>
                )}

                {/* Insights */}
                <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
                    <div className="flex items-start gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                            <TrendingUp className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                            <h4 className="font-medium text-gray-900 mb-1">Analiz Özeti</h4>
                            <p className="text-sm text-gray-600">
                                Son 6 ayda memnuniyet puanı <strong className="text-green-600">%{(((recentData[recentData.length - 1].score - recentData[0].score) / recentData[0].score) * 100).toFixed(1)}</strong> arttı.
                                NPS skoru <strong className="text-blue-600">{currentNPS}</strong> ile sektör ortalamasının üzerinde.
                                Olumlu geri bildirim oranı <strong className="text-emerald-600">%{avgPositive}</strong> seviyesinde.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
