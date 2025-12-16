"use client";

import { useState } from "react";
import { PageContainer } from "@/components/layout/PageContainer";
import { PageHeader } from "@/components/layout/PageHeader";
import { ChurnAlerts } from "@/components/risk/ChurnAlerts";
import { AutomationRules } from "@/components/risk/AutomationRules";
import {
    ShieldAlert, Zap, Users, TrendingDown, ArrowUp, ArrowDown,
    AlertTriangle, Activity, Target, Eye, Filter, Calendar,
    ChevronRight, TrendingUp
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
    Cell, PieChart, Pie, Legend, LineChart, Line, CartesianGrid,
    Area, AreaChart, ComposedChart
} from "recharts";

const riskDistribution = [
    { name: "Düşük Risk", value: 450, color: "#22c55e", percentage: 73.2 },
    { name: "Orta Risk", value: 120, color: "#f59e0b", percentage: 19.5 },
    { name: "Yüksek Risk", value: 45, color: "#ef4444", percentage: 7.3 },
];

// Haftalık risk trendi
const weeklyTrend = [
    { week: "Hft 1", low: 420, medium: 135, high: 52 },
    { week: "Hft 2", low: 435, medium: 128, high: 48 },
    { week: "Hft 3", low: 442, medium: 122, high: 46 },
    { week: "Hft 4", low: 450, medium: 120, high: 45 },
];

// Risk faktörleri
const riskFactors = [
    { name: "Giriş Yapılmayan Günler", count: 28, trend: "up", change: 5 },
    { name: "Düşen Kullanım", count: 19, trend: "up", change: 3 },
    { name: "Ödeme Gecikmesi", count: 12, trend: "down", change: -2 },
    { name: "Destek Şikayetleri", count: 8, trend: "up", change: 1 },
    { name: "API Hataları", count: 6, trend: "down", change: -4 },
];

// Risk kategorileri detay
const riskCategories = [
    {
        name: "Yüksek Risk",
        count: 45,
        color: "red",
        icon: AlertTriangle,
        description: "Acil müdahale gerektiren müşteriler",
        actions: ["Kişisel arama", "Özel teklif", "Çözüm toplantısı"]
    },
    {
        name: "Orta Risk",
        count: 120,
        color: "amber",
        icon: Activity,
        description: "İzlenmesi gereken müşteriler",
        actions: ["E-posta kampanyası", "Kullanım analizi", "Check-in"]
    },
    {
        name: "Düşük Risk",
        count: 450,
        color: "green",
        icon: Target,
        description: "Sağlıklı müşteri ilişkileri",
        actions: ["Upsell fırsatları", "Referans programı"]
    },
];

export default function RiskPage() {
    const [selectedRiskView, setSelectedRiskView] = useState<"overview" | "trend" | "factors">("overview");

    const totalCustomers = riskDistribution.reduce((sum, r) => sum + r.value, 0);

    return (
        <PageContainer>
            <PageHeader title="Risk Analizi ve Otomasyon" description="Müşteri sağlığı, churn riskleri ve otomatik aksiyonlar.">
                <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                    Rapor İndir
                </button>
            </PageHeader>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex flex-col justify-between">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-red-50 rounded-lg">
                            <ShieldAlert className="h-6 w-6 text-red-600" />
                        </div>
                        <span className="flex items-center text-xs font-medium text-red-600 bg-red-100 px-2 py-0.5 rounded-full">
                            <ArrowUp className="w-3 h-3 mr-1" /> +12%
                        </span>
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-gray-900">45</h3>
                        <p className="text-sm font-medium text-gray-500">Yüksek Riskli Müşteri</p>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex flex-col justify-between">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-blue-50 rounded-lg">
                            <Zap className="h-6 w-6 text-blue-600" />
                        </div>
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-gray-900">128</h3>
                        <p className="text-sm font-medium text-gray-500">Otomasyon Tetiklendi (Bugün)</p>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex flex-col justify-between">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-green-50 rounded-lg">
                            <Users className="h-6 w-6 text-green-600" />
                        </div>
                        <span className="flex items-center text-xs font-medium text-green-600 bg-green-100 px-2 py-0.5 rounded-full">
                            <TrendingDown className="w-3 h-3 mr-1" /> -5%
                        </span>
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-gray-900">%2.4</h3>
                        <p className="text-sm font-medium text-gray-500">Aylık Churn Oranı</p>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex flex-col justify-between">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-purple-50 rounded-lg">
                            <Activity className="h-6 w-6 text-purple-600" />
                        </div>
                        <span className="flex items-center text-xs font-medium text-green-600 bg-green-100 px-2 py-0.5 rounded-full">
                            <ArrowUp className="w-3 h-3 mr-1" /> +8%
                        </span>
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-gray-900">87.5%</h3>
                        <p className="text-sm font-medium text-gray-500">Müşteri Sağlık Skoru</p>
                    </div>
                </div>
            </div>

            {/* Enhanced Risk Distribution Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900">Risk Dağılımı Analizi</h3>
                        <p className="text-sm text-gray-500">Müşteri portföyünüzün risk segmentasyonu</p>
                    </div>
                    <div className="flex items-center gap-1 p-1 bg-gray-100 rounded-lg">
                        <button
                            onClick={() => setSelectedRiskView("overview")}
                            className={cn(
                                "px-3 py-1.5 text-xs font-medium rounded-md transition-colors",
                                selectedRiskView === "overview"
                                    ? "bg-white text-gray-900 shadow-sm"
                                    : "text-gray-600 hover:text-gray-900"
                            )}
                        >
                            Genel Bakış
                        </button>
                        <button
                            onClick={() => setSelectedRiskView("trend")}
                            className={cn(
                                "px-3 py-1.5 text-xs font-medium rounded-md transition-colors",
                                selectedRiskView === "trend"
                                    ? "bg-white text-gray-900 shadow-sm"
                                    : "text-gray-600 hover:text-gray-900"
                            )}
                        >
                            Trend
                        </button>
                        <button
                            onClick={() => setSelectedRiskView("factors")}
                            className={cn(
                                "px-3 py-1.5 text-xs font-medium rounded-md transition-colors",
                                selectedRiskView === "factors"
                                    ? "bg-white text-gray-900 shadow-sm"
                                    : "text-gray-600 hover:text-gray-900"
                            )}
                        >
                            Faktörler
                        </button>
                    </div>
                </div>

                {selectedRiskView === "overview" && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Pie Chart */}
                        <div className="h-[280px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={riskDistribution}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={100}
                                        paddingAngle={3}
                                        dataKey="value"
                                    >
                                        {riskDistribution.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        contentStyle={{
                                            borderRadius: '8px',
                                            border: 'none',
                                            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                                        }}
                                        formatter={(value: number) => [`${value} müşteri`, '']}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                            <div className="flex justify-center gap-4 mt-2">
                                {riskDistribution.map((item) => (
                                    <div key={item.name} className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                                        <span className="text-xs text-gray-600">{item.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Risk Categories with Actions */}
                        <div className="lg:col-span-2 space-y-4">
                            {riskCategories.map((category) => {
                                const Icon = category.icon;
                                return (
                                    <div
                                        key={category.name}
                                        className={cn(
                                            "p-4 rounded-xl border transition-all cursor-pointer hover:shadow-md",
                                            category.color === "red" && "bg-red-50 border-red-200 hover:border-red-300",
                                            category.color === "amber" && "bg-amber-50 border-amber-200 hover:border-amber-300",
                                            category.color === "green" && "bg-green-50 border-green-200 hover:border-green-300"
                                        )}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className={cn(
                                                    "p-2 rounded-lg",
                                                    category.color === "red" && "bg-red-100",
                                                    category.color === "amber" && "bg-amber-100",
                                                    category.color === "green" && "bg-green-100"
                                                )}>
                                                    <Icon className={cn(
                                                        "h-5 w-5",
                                                        category.color === "red" && "text-red-600",
                                                        category.color === "amber" && "text-amber-600",
                                                        category.color === "green" && "text-green-600"
                                                    )} />
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <h4 className="font-semibold text-gray-900">{category.name}</h4>
                                                        <span className={cn(
                                                            "px-2 py-0.5 rounded-full text-xs font-bold",
                                                            category.color === "red" && "bg-red-200 text-red-700",
                                                            category.color === "amber" && "bg-amber-200 text-amber-700",
                                                            category.color === "green" && "bg-green-200 text-green-700"
                                                        )}>
                                                            {category.count}
                                                        </span>
                                                    </div>
                                                    <p className="text-sm text-gray-500">{category.description}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                {category.actions.slice(0, 2).map((action, i) => (
                                                    <span key={i} className="px-2 py-1 bg-white rounded text-xs text-gray-600 border">
                                                        {action}
                                                    </span>
                                                ))}
                                                <ChevronRight className="h-5 w-5 text-gray-400" />
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {selectedRiskView === "trend" && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="h-[300px]">
                            <h4 className="text-sm font-medium text-gray-700 mb-4">Haftalık Risk Trendi</h4>
                            <ResponsiveContainer width="100%" height="90%">
                                <AreaChart data={weeklyTrend}>
                                    <defs>
                                        <linearGradient id="colorLow" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                                        </linearGradient>
                                        <linearGradient id="colorMed" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                                        </linearGradient>
                                        <linearGradient id="colorHigh" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                    <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
                                    <Tooltip
                                        contentStyle={{
                                            borderRadius: '8px',
                                            border: 'none',
                                            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                                        }}
                                    />
                                    <Area type="monotone" dataKey="low" stroke="#22c55e" strokeWidth={2} fill="url(#colorLow)" name="Düşük Risk" />
                                    <Area type="monotone" dataKey="medium" stroke="#f59e0b" strokeWidth={2} fill="url(#colorMed)" name="Orta Risk" />
                                    <Area type="monotone" dataKey="high" stroke="#ef4444" strokeWidth={2} fill="url(#colorHigh)" name="Yüksek Risk" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                        <div>
                            <h4 className="text-sm font-medium text-gray-700 mb-4">Trend Özeti</h4>
                            <div className="space-y-4">
                                <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="font-medium text-green-700">Düşük Risk</span>
                                        <span className="flex items-center text-green-600 text-sm font-medium">
                                            <TrendingUp className="h-4 w-4 mr-1" />
                                            +7.1%
                                        </span>
                                    </div>
                                    <p className="text-sm text-green-600">420 → 450 müşteri (son 4 hafta)</p>
                                </div>
                                <div className="p-4 bg-amber-50 rounded-xl border border-amber-200">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="font-medium text-amber-700">Orta Risk</span>
                                        <span className="flex items-center text-green-600 text-sm font-medium">
                                            <TrendingDown className="h-4 w-4 mr-1" />
                                            -11.1%
                                        </span>
                                    </div>
                                    <p className="text-sm text-amber-600">135 → 120 müşteri (son 4 hafta)</p>
                                </div>
                                <div className="p-4 bg-red-50 rounded-xl border border-red-200">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="font-medium text-red-700">Yüksek Risk</span>
                                        <span className="flex items-center text-green-600 text-sm font-medium">
                                            <TrendingDown className="h-4 w-4 mr-1" />
                                            -13.5%
                                        </span>
                                    </div>
                                    <p className="text-sm text-red-600">52 → 45 müşteri (son 4 hafta)</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {selectedRiskView === "factors" && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div>
                            <h4 className="text-sm font-medium text-gray-700 mb-4">Risk Faktörleri</h4>
                            <div className="space-y-3">
                                {riskFactors.map((factor, index) => (
                                    <div key={factor.name} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                                        <div className="flex items-center gap-3">
                                            <span className="w-8 h-8 flex items-center justify-center bg-white rounded-lg text-sm font-bold text-gray-600 border">
                                                {index + 1}
                                            </span>
                                            <div>
                                                <p className="font-medium text-gray-900">{factor.name}</p>
                                                <p className="text-sm text-gray-500">{factor.count} müşteri etkileniyor</p>
                                            </div>
                                        </div>
                                        <span className={cn(
                                            "inline-flex items-center text-sm font-medium px-2 py-1 rounded-full",
                                            factor.trend === "up" ? "text-red-600 bg-red-100" : "text-green-600 bg-green-100"
                                        )}>
                                            {factor.trend === "up" ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
                                            {factor.change > 0 ? `+${factor.change}` : factor.change}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="h-[300px]">
                            <h4 className="text-sm font-medium text-gray-700 mb-4">Faktör Dağılımı</h4>
                            <ResponsiveContainer width="100%" height="90%">
                                <BarChart data={riskFactors} layout="vertical">
                                    <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f0f0f0" />
                                    <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
                                    <YAxis dataKey="name" type="category" width={140} axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#6b7280' }} />
                                    <Tooltip
                                        contentStyle={{
                                            borderRadius: '8px',
                                            border: 'none',
                                            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                                        }}
                                        formatter={(value: number) => [`${value} müşteri`, '']}
                                    />
                                    <Bar dataKey="count" fill="#6366f1" radius={[0, 4, 4, 0]} barSize={24} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <ChurnAlerts />
                </div>
                <div>
                    <AutomationRules />
                </div>
            </div>
        </PageContainer>
    );
}
