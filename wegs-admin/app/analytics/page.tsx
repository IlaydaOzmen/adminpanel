"use client";

import { useState } from "react";
import { PageContainer } from "@/components/layout/PageContainer";
import { PageHeader } from "@/components/layout/PageHeader";
import Link from "next/link";
import {
    BarChart3,
    Search,
    Building2,
    TrendingUp,
    TrendingDown,
    Users,
    Clock,
    Zap,
    FileText,
    ShoppingBag,
    CreditCard,
    Settings,
    PieChart as PieChartIcon,
    Activity,
    ArrowLeft,
    Download,
    Target,
    AlertTriangle
} from "lucide-react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Legend,
    LineChart,
    Line,
    CartesianGrid,
    Area,
    AreaChart
} from "recharts";
import { cn } from "@/lib/utils";

// Module Data
const moduleData = [
    { name: "E-Fatura", users: 1845, activeDaily: 1234, avgUsage: 45, color: "#3b82f6", trend: 12.5 },
    { name: "E-Arşiv", users: 1567, activeDaily: 987, avgUsage: 38, color: "#8b5cf6", trend: 8.3 },
    { name: "Raporlama", users: 2134, activeDaily: 1456, avgUsage: 52, color: "#22c55e", trend: 15.2 },
    { name: "E-Ticaret", users: 892, activeDaily: 654, avgUsage: 28, color: "#f97316", trend: 22.1 },
    { name: "Banka Entegrasyonu", users: 1234, activeDaily: 876, avgUsage: 35, color: "#06b6d4", trend: 5.7 },
    { name: "Stok Yönetimi", users: 756, activeDaily: 432, avgUsage: 22, color: "#ec4899", trend: -2.3 },
    { name: "Müşteri İlişkileri", users: 645, activeDaily: 398, avgUsage: 18, color: "#eab308", trend: 9.8 },
    { name: "Dashboard", users: 2543, activeDaily: 1987, avgUsage: 65, color: "#64748b", trend: 3.4 },
];

// Daily Usage Trend
const dailyUsageTrend = [
    { hour: "00:00", users: 45 },
    { hour: "02:00", users: 23 },
    { hour: "04:00", users: 12 },
    { hour: "06:00", users: 34 },
    { hour: "08:00", users: 456 },
    { hour: "10:00", users: 1234 },
    { hour: "12:00", users: 987 },
    { hour: "14:00", users: 1456 },
    { hour: "16:00", users: 1678 },
    { hour: "18:00", users: 1234 },
    { hour: "20:00", users: 567 },
    { hour: "22:00", users: 234 },
];

// Weekly Module Usage
const weeklyModuleUsage = [
    { day: "Pzt", efatura: 1200, earchive: 980, reporting: 1450, ecommerce: 650 },
    { day: "Sal", efatura: 1350, earchive: 1020, reporting: 1380, ecommerce: 720 },
    { day: "Çar", efatura: 1180, earchive: 950, reporting: 1520, ecommerce: 680 },
    { day: "Per", efatura: 1420, earchive: 1100, reporting: 1480, ecommerce: 750 },
    { day: "Cum", efatura: 1560, earchive: 1200, reporting: 1650, ecommerce: 820 },
    { day: "Cmt", efatura: 450, earchive: 380, reporting: 520, ecommerce: 340 },
    { day: "Paz", efatura: 320, earchive: 280, reporting: 380, ecommerce: 210 },
];

// Customer Module Usage
interface CustomerModuleUsage {
    id: string;
    name: string;
    company: string;
    package: "Starter" | "Business" | "Enterprise";
    totalSessions: number;
    avgSessionDuration: number;
    mostUsedModule: string;
    lastActive: string;
    usageScore: number;
}

const customerUsageData: CustomerModuleUsage[] = [
    { id: "1", name: "Ahmet Yılmaz", company: "TechSoft A.Ş.", package: "Enterprise", totalSessions: 456, avgSessionDuration: 45, mostUsedModule: "E-Fatura", lastActive: "2 saat önce", usageScore: 95 },
    { id: "2", name: "Ayşe Demir", company: "Demir Ticaret", package: "Business", totalSessions: 234, avgSessionDuration: 32, mostUsedModule: "Raporlama", lastActive: "5 saat önce", usageScore: 78 },
    { id: "3", name: "Mehmet Kaya", company: "Kaya Lojistik", package: "Enterprise", totalSessions: 567, avgSessionDuration: 52, mostUsedModule: "E-Ticaret", lastActive: "1 saat önce", usageScore: 92 },
    { id: "4", name: "Zeynep Çelik", company: "Çelik Mobilya", package: "Starter", totalSessions: 89, avgSessionDuration: 18, mostUsedModule: "Dashboard", lastActive: "3 gün önce", usageScore: 45 },
    { id: "5", name: "Ali Vural", company: "Vural İnşaat", package: "Business", totalSessions: 312, avgSessionDuration: 38, mostUsedModule: "Banka Entegrasyonu", lastActive: "30 dakika önce", usageScore: 85 },
    { id: "6", name: "Can Öztürk", company: "Öztürk Tekstil", package: "Enterprise", totalSessions: 678, avgSessionDuration: 58, mostUsedModule: "E-Fatura", lastActive: "15 dakika önce", usageScore: 98 },
];

type ViewMode = "overview" | "modules" | "customers" | "insights";

// Insights Mock Data
const highVolumeCustomers = [
    { id: "1", name: "Mehmet Kaya", company: "Kaya Lojistik", volume: 1250000, growth: 15, status: "VIP" },
    { id: "2", name: "Can Öztürk", company: "Öztürk Tekstil", volume: 980000, growth: 8, status: "VIP" },
    { id: "3", name: "Ahmet Yılmaz", company: "TechSoft A.Ş.", volume: 850000, growth: 12, status: "High" },
];

const riskySupportCustomers = [
    { id: "4", name: "Zeynep Çelik", company: "Çelik Mobilya", tickets: 15, sentiment: "Negative", risk: "High" },
    { id: "5", name: "Ayşe Demir", company: "Demir Ticaret", tickets: 12, sentiment: "Neutral", risk: "Medium" },
];

const einvoiceCandidates = [
    { id: "6", name: "Fatma Şahin", company: "Şahin Market", volume: 450000, reason: "Ciro Limiti Aşıldı", probability: "High" },
    { id: "7", name: "Ali Vural", company: "Vural İnşaat", volume: 380000, reason: "Sektörel Zorunluluk", probability: "Medium" },
];

export default function ModuleUsagePage() {
    const [viewMode, setViewMode] = useState<ViewMode>("overview");
    const [searchTerm, setSearchTerm] = useState("");

    const totalActiveUsers = moduleData.reduce((sum, m) => sum + m.activeDaily, 0);
    const avgUsageTime = Math.round(moduleData.reduce((sum, m) => sum + m.avgUsage, 0) / moduleData.length);

    const filteredCustomers = customerUsageData.filter((customer) =>
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.company.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <PageContainer>
            <PageHeader title="Modül Kullanım Analizi" description="Müşterilerin modül kullanım sıklığını ve davranışlarını analiz edin.">
                <div className="flex gap-2">
                    <Link
                        href="/customers"
                        className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Müşteriler
                    </Link>
                    <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
                        <Download className="h-4 w-4 mr-2" />
                        Rapor İndir
                    </button>
                </div>
            </PageHeader>

            {/* View Mode Toggle */}
            <div className="flex flex-wrap gap-2 mb-6">
                {[
                    { id: "overview" as ViewMode, label: "Genel Bakış", icon: PieChartIcon },
                    { id: "modules" as ViewMode, label: "Modüller", icon: BarChart3 },
                    { id: "customers" as ViewMode, label: "Müşteriler", icon: Users },
                    { id: "insights" as ViewMode, label: "Öngörüler", icon: Target },
                ].map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setViewMode(tab.id)}
                        className={cn(
                            "inline-flex items-center px-4 py-2.5 rounded-xl text-sm font-medium transition-all",
                            viewMode === tab.id
                                ? "bg-white shadow-md border border-gray-200 text-gray-900"
                                : "text-gray-600 hover:bg-white/50"
                        )}
                    >
                        <tab.icon className="h-4 w-4 mr-2" />
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Overview View */}
            {viewMode === "overview" && (
                <div className="space-y-6">
                    {/* Stats Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-blue-100 rounded-xl">
                                    <Users className="h-6 w-6 text-blue-600" />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-gray-900">{totalActiveUsers.toLocaleString('tr-TR')}</p>
                                    <p className="text-sm text-gray-500">Günlük Aktif Kullanıcı</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-green-100 rounded-xl">
                                    <Clock className="h-6 w-6 text-green-600" />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-gray-900">{avgUsageTime} dk</p>
                                    <p className="text-sm text-gray-500">Ort. Oturum Süresi</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-purple-100 rounded-xl">
                                    <Zap className="h-6 w-6 text-purple-600" />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-gray-900">8</p>
                                    <p className="text-sm text-gray-500">Aktif Modül</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-orange-100 rounded-xl">
                                    <TrendingUp className="h-6 w-6 text-orange-600" />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-gray-900">+12.4%</p>
                                    <p className="text-sm text-gray-500">Haftalık Büyüme</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Daily Usage Trend */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Günlük Kullanım Trendi</h3>
                            <div className="h-[300px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={dailyUsageTrend}>
                                        <defs>
                                            <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                        <XAxis dataKey="hour" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                                        <Tooltip />
                                        <Area type="monotone" dataKey="users" stroke="#3b82f6" strokeWidth={2} fill="url(#colorUsers)" name="Kullanıcı" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Module Distribution Pie Chart */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Modül Kullanım Dağılımı</h3>
                            <div className="h-[300px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={moduleData}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={60}
                                            outerRadius={100}
                                            paddingAngle={2}
                                            dataKey="activeDaily"
                                        >
                                            {moduleData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <Tooltip formatter={(value: number) => [value.toLocaleString('tr-TR'), "Günlük Kullanıcı"]} />
                                        <Legend />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>

                    {/* Weekly Module Usage */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Haftalık Modül Kullanımı</h3>
                        <div className="h-[350px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={weeklyModuleUsage}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                    <XAxis dataKey="day" axisLine={false} tickLine={false} />
                                    <YAxis axisLine={false} tickLine={false} />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="efatura" name="E-Fatura" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                                    <Bar dataKey="earchive" name="E-Arşiv" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                                    <Bar dataKey="reporting" name="Raporlama" fill="#22c55e" radius={[4, 4, 0, 0]} />
                                    <Bar dataKey="ecommerce" name="E-Ticaret" fill="#f97316" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            )}

            {/* Modules View */}
            {viewMode === "modules" && (
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {moduleData.map((module, idx) => (
                            <div key={idx} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                                <div className="flex items-center justify-between mb-4">
                                    <div
                                        className="w-10 h-10 rounded-xl flex items-center justify-center"
                                        style={{ backgroundColor: `${module.color}20` }}
                                    >
                                        <Activity className="h-5 w-5" style={{ color: module.color }} />
                                    </div>
                                    <span className={cn(
                                        "text-xs font-medium flex items-center",
                                        module.trend >= 0 ? "text-green-600" : "text-red-600"
                                    )}>
                                        {module.trend >= 0 ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                                        {module.trend >= 0 ? "+" : ""}{module.trend}%
                                    </span>
                                </div>
                                <h4 className="font-semibold text-gray-900">{module.name}</h4>
                                <div className="mt-3 space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500">Toplam Kullanıcı</span>
                                        <span className="font-medium text-gray-900">{module.users.toLocaleString('tr-TR')}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500">Günlük Aktif</span>
                                        <span className="font-medium text-gray-900">{module.activeDaily.toLocaleString('tr-TR')}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500">Ort. Kullanım</span>
                                        <span className="font-medium text-gray-900">{module.avgUsage} dk</span>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                                        <div
                                            className="h-full rounded-full"
                                            style={{
                                                width: `${(module.activeDaily / module.users) * 100}%`,
                                                backgroundColor: module.color
                                            }}
                                        />
                                    </div>
                                    <p className="text-xs text-gray-400 mt-1">{Math.round((module.activeDaily / module.users) * 100)}% aktif kullanım oranı</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Insights View */}
            {viewMode === "insights" && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* High Volume / VIP */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 bg-purple-100 rounded-lg">
                                <TrendingUp className="h-6 w-6 text-purple-600" />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">Büyük Hacimli Müşteriler</h3>
                                <p className="text-sm text-gray-500">Yüksek ciro ve büyüme</p>
                            </div>
                        </div>
                        <div className="space-y-4">
                            {highVolumeCustomers.map((customer) => (
                                <div key={customer.id} className="p-4 bg-purple-50 rounded-xl border border-purple-100">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <p className="font-semibold text-gray-900">{customer.company}</p>
                                            <p className="text-sm text-gray-500">{customer.name}</p>
                                        </div>
                                        <span className="px-2 py-1 bg-purple-200 text-purple-700 text-xs font-bold rounded-lg">
                                            {customer.status}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-gray-600">Hacim: ₺{customer.volume.toLocaleString('tr-TR')}</span>
                                        <span className="text-green-600 font-medium">+{customer.growth}%</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Risky Support Customers */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 bg-red-100 rounded-lg">
                                <AlertTriangle className="h-6 w-6 text-red-600" />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">Riskli Müşteriler</h3>
                                <p className="text-sm text-gray-500">Yoğun destek talebi oluşturanlar</p>
                            </div>
                        </div>
                        <div className="space-y-4">
                            {riskySupportCustomers.map((customer) => (
                                <div key={customer.id} className="p-4 bg-red-50 rounded-xl border border-red-100">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <p className="font-semibold text-gray-900">{customer.company}</p>
                                            <p className="text-sm text-gray-500">{customer.name}</p>
                                        </div>
                                        <span className="px-2 py-1 bg-red-200 text-red-700 text-xs font-bold rounded-lg">
                                            {customer.tickets} Talep
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-gray-600">Risk Seviyesi:</span>
                                        <span className="text-red-700 font-bold">{customer.risk}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* E-Invoice Candidates */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 bg-blue-100 rounded-lg">
                                <FileText className="h-6 w-6 text-blue-600" />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">E-Fatura Adayları</h3>
                                <p className="text-sm text-gray-500">Geçiş potansiyeli yüksek</p>
                            </div>
                        </div>
                        <div className="space-y-4">
                            {einvoiceCandidates.map((customer) => (
                                <div key={customer.id} className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <p className="font-semibold text-gray-900">{customer.company}</p>
                                            <p className="text-sm text-gray-500">{customer.name}</p>
                                        </div>
                                        <span className="px-2 py-1 bg-blue-200 text-blue-700 text-xs font-bold rounded-lg">
                                            {customer.probability}
                                        </span>
                                    </div>
                                    <div className="text-sm text-gray-600 mt-2">
                                        <span className="font-medium">Neden:</span> {customer.reason}
                                    </div>
                                    <div className="mt-3">
                                        <button className="w-full py-2 bg-blue-600 text-white rounded-lg text-xs font-medium hover:bg-blue-700 transition-colors">
                                            Teklif Gönder
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
            {viewMode === "customers" && (
                <div className="space-y-6">
                    {/* Search */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                        <div className="relative max-w-md">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Müşteri ara..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    {/* Customer Table */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Müşteri</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Paket</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Toplam Oturum</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ort. Süre</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">En Çok Kullanılan</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kullanım Skoru</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Son Aktif</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {filteredCustomers.map((customer) => (
                                        <tr key={customer.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 h-10 w-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
                                                        {customer.name.charAt(0)}
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium text-gray-900">{customer.name}</div>
                                                        <div className="text-sm text-gray-500">{customer.company}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={cn(
                                                    "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                                                    customer.package === "Starter" && "bg-gray-100 text-gray-700",
                                                    customer.package === "Business" && "bg-blue-100 text-blue-700",
                                                    customer.package === "Enterprise" && "bg-purple-100 text-purple-700"
                                                )}>
                                                    {customer.package}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                {customer.totalSessions.toLocaleString('tr-TR')}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {customer.avgSessionDuration} dk
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                                                    {customer.mostUsedModule}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                                                        <div
                                                            className={cn(
                                                                "h-full rounded-full",
                                                                customer.usageScore >= 80 ? "bg-green-500" :
                                                                    customer.usageScore >= 50 ? "bg-yellow-500" : "bg-red-500"
                                                            )}
                                                            style={{ width: `${customer.usageScore}%` }}
                                                        />
                                                    </div>
                                                    <span className="text-sm font-medium text-gray-900">{customer.usageScore}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {customer.lastActive}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
        </PageContainer>
    );
}
