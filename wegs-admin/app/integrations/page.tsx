"use client";

import { useState } from "react";
import { PageContainer } from "@/components/layout/PageContainer";
import { PageHeader } from "@/components/layout/PageHeader";
import {
    ShoppingBag,
    Building2,
    Plug,
    Store,
    TrendingUp,
    TrendingDown,
    Users,
    Package,
    ArrowUpRight,
    BarChart3,
    PieChart as PieChartIcon
} from "lucide-react";
import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    LineChart,
    Line,
    CartesianGrid,
    Area,
    AreaChart
} from "recharts";
import { cn } from "@/lib/utils";

type DashboardTab = "ecommerce" | "bank" | "integrator" | "marketplace";

// E-Commerce Data
const ecommerceData = {
    platforms: [
        { name: "Trendyol", customers: 342, revenue: 2450000, growth: 15.2 },
        { name: "Hepsiburada", customers: 256, revenue: 1820000, growth: 12.8 },
        { name: "N11", customers: 189, revenue: 1340000, growth: 8.4 },
        { name: "GittiGidiyor", customers: 98, revenue: 680000, growth: -2.1 },
        { name: "Amazon", customers: 145, revenue: 1120000, growth: 22.5 },
        { name: "Çiçeksepeti", customers: 67, revenue: 420000, growth: 5.7 },
    ],
    monthlyTrend: [
        { month: "Oca", orders: 12500, revenue: 8500000 },
        { month: "Şub", orders: 14200, revenue: 9200000 },
        { month: "Mar", orders: 15800, revenue: 10100000 },
        { month: "Nis", orders: 13900, revenue: 9800000 },
        { month: "May", orders: 16500, revenue: 11200000 },
        { month: "Haz", orders: 18200, revenue: 12800000 },
    ]
};

// Bank Data
const bankData = {
    banks: [
        { name: "Ziraat Bankası", customers: 523, transactions: 45200, color: "#1e40af" },
        { name: "İş Bankası", customers: 412, transactions: 38900, color: "#0369a1" },
        { name: "Garanti BBVA", customers: 389, transactions: 35600, color: "#059669" },
        { name: "Yapı Kredi", customers: 298, transactions: 28400, color: "#7c3aed" },
        { name: "Akbank", customers: 267, transactions: 24800, color: "#dc2626" },
        { name: "QNB Finansbank", customers: 198, transactions: 18500, color: "#ea580c" },
        { name: "Denizbank", customers: 156, transactions: 14200, color: "#0891b2" },
        { name: "Vakıfbank", customers: 189, transactions: 16800, color: "#4f46e5" },
    ],
    transactionTrend: [
        { month: "Oca", incoming: 234000, outgoing: 198000 },
        { month: "Şub", incoming: 256000, outgoing: 212000 },
        { month: "Mar", incoming: 278000, outgoing: 234000 },
        { month: "Nis", incoming: 298000, outgoing: 256000 },
        { month: "May", incoming: 312000, outgoing: 278000 },
        { month: "Haz", incoming: 345000, outgoing: 298000 },
    ]
};

// Integrator Data
const integratorData = {
    integrators: [
        { name: "Parasut", customers: 456, status: "active", apiCalls: 125000 },
        { name: "Logo", customers: 389, status: "active", apiCalls: 98000 },
        { name: "Mikro", customers: 234, status: "active", apiCalls: 67000 },
        { name: "Netsis", customers: 198, status: "active", apiCalls: 54000 },
        { name: "Luca", customers: 167, status: "active", apiCalls: 45000 },
        { name: "Eta", customers: 145, status: "maintenance", apiCalls: 38000 },
        { name: "Dia", customers: 112, status: "active", apiCalls: 28000 },
        { name: "Zirve", customers: 89, status: "active", apiCalls: 21000 },
    ],
    apiUsage: [
        { day: "Pzt", calls: 45000 },
        { day: "Sal", calls: 52000 },
        { day: "Çar", calls: 48000 },
        { day: "Per", calls: 56000 },
        { day: "Cum", calls: 61000 },
        { day: "Cmt", calls: 23000 },
        { day: "Paz", calls: 18000 },
    ]
};

// Marketplace Data
const marketplaceData = [
    { name: "Trendyol", value: 35, color: "#f97316" },
    { name: "Hepsiburada", value: 25, color: "#ef4444" },
    { name: "N11", value: 15, color: "#22c55e" },
    { name: "Amazon", value: 12, color: "#3b82f6" },
    { name: "GittiGidiyor", value: 8, color: "#a855f7" },
    { name: "Diğer", value: 5, color: "#6b7280" },
];

export default function IntegrationsPage() {
    const [activeTab, setActiveTab] = useState<DashboardTab>("ecommerce");

    const tabs = [
        { id: "ecommerce" as DashboardTab, label: "E-Ticaret", icon: ShoppingBag, color: "text-orange-600 bg-orange-100" },
        { id: "bank" as DashboardTab, label: "Banka", icon: Building2, color: "text-blue-600 bg-blue-100" },
        { id: "integrator" as DashboardTab, label: "Entegratör", icon: Plug, color: "text-purple-600 bg-purple-100" },
        { id: "marketplace" as DashboardTab, label: "Pazaryeri", icon: Store, color: "text-green-600 bg-green-100" },
    ];

    return (
        <PageContainer>
            <PageHeader title="Entegrasyon Dashboardları" description="E-ticaret, banka, entegratör ve pazaryeri bazlı analizler." />

            {/* Tab Navigation */}
            <div className="flex flex-wrap gap-2 mb-6">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={cn(
                            "inline-flex items-center px-4 py-2.5 rounded-xl text-sm font-medium transition-all",
                            activeTab === tab.id
                                ? "bg-white shadow-md border border-gray-200 text-gray-900"
                                : "text-gray-600 hover:bg-white/50"
                        )}
                    >
                        <div className={cn("p-1.5 rounded-lg mr-2", tab.color)}>
                            <tab.icon className="h-4 w-4" />
                        </div>
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* E-Commerce Dashboard */}
            {activeTab === "ecommerce" && (
                <div className="space-y-6">
                    {/* Stats Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-orange-100 rounded-xl">
                                    <ShoppingBag className="h-6 w-6 text-orange-600" />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-gray-900">1,097</p>
                                    <p className="text-sm text-gray-500">Toplam E-Ticaret Müşterisi</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-green-100 rounded-xl">
                                    <TrendingUp className="h-6 w-6 text-green-600" />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-gray-900">₺7.8M</p>
                                    <p className="text-sm text-gray-500">Aylık İşlem Hacmi</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-blue-100 rounded-xl">
                                    <Package className="h-6 w-6 text-blue-600" />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-gray-900">18,200</p>
                                    <p className="text-sm text-gray-500">Aylık Sipariş</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-purple-100 rounded-xl">
                                    <ArrowUpRight className="h-6 w-6 text-purple-600" />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-gray-900">+12.4%</p>
                                    <p className="text-sm text-gray-500">Büyüme Oranı</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Platform Table */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Platform Dağılımı</h3>
                            <div className="space-y-3">
                                {ecommerceData.platforms.map((platform, idx) => (
                                    <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center text-orange-600 font-bold text-sm">
                                                {platform.name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-900">{platform.name}</p>
                                                <p className="text-xs text-gray-500">{platform.customers} müşteri</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-semibold text-gray-900">₺{(platform.revenue / 1000000).toFixed(1)}M</p>
                                            <p className={cn("text-xs font-medium", platform.growth >= 0 ? "text-green-600" : "text-red-600")}>
                                                {platform.growth >= 0 ? "+" : ""}{platform.growth}%
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Monthly Trend */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Aylık Trend</h3>
                            <div className="h-[300px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={ecommerceData.monthlyTrend}>
                                        <defs>
                                            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#f97316" stopOpacity={0.3} />
                                                <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                        <XAxis dataKey="month" axisLine={false} tickLine={false} />
                                        <YAxis axisLine={false} tickLine={false} tickFormatter={(v) => `₺${v / 1000000}M`} />
                                        <Tooltip formatter={(value: number) => [`₺${(value / 1000000).toFixed(1)}M`, "Ciro"]} />
                                        <Area type="monotone" dataKey="revenue" stroke="#f97316" strokeWidth={2} fill="url(#colorRevenue)" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Bank Dashboard */}
            {activeTab === "bank" && (
                <div className="space-y-6">
                    {/* Stats Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-blue-100 rounded-xl">
                                    <Building2 className="h-6 w-6 text-blue-600" />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-gray-900">8</p>
                                    <p className="text-sm text-gray-500">Entegre Banka</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-green-100 rounded-xl">
                                    <Users className="h-6 w-6 text-green-600" />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-gray-900">2,432</p>
                                    <p className="text-sm text-gray-500">Banka Kullanan Müşteri</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-purple-100 rounded-xl">
                                    <BarChart3 className="h-6 w-6 text-purple-600" />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-gray-900">222K</p>
                                    <p className="text-sm text-gray-500">Aylık İşlem</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-orange-100 rounded-xl">
                                    <TrendingUp className="h-6 w-6 text-orange-600" />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-gray-900">₺345M</p>
                                    <p className="text-sm text-gray-500">Gelen Transfer</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Bank Distribution */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Banka Dağılımı</h3>
                            <div className="space-y-3">
                                {bankData.banks.map((bank, idx) => (
                                    <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                        <div className="flex items-center gap-3">
                                            <div
                                                className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-xs"
                                                style={{ backgroundColor: bank.color }}
                                            >
                                                {bank.name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-900">{bank.name}</p>
                                                <p className="text-xs text-gray-500">{bank.customers} müşteri</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-semibold text-gray-900">{(bank.transactions / 1000).toFixed(1)}K</p>
                                            <p className="text-xs text-gray-500">işlem</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Transaction Trend */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">İşlem Trendi</h3>
                            <div className="h-[300px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={bankData.transactionTrend}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                        <XAxis dataKey="month" axisLine={false} tickLine={false} />
                                        <YAxis axisLine={false} tickLine={false} tickFormatter={(v) => `₺${v / 1000}K`} />
                                        <Tooltip formatter={(value: number) => [`₺${(value / 1000).toFixed(0)}K`, ""]} />
                                        <Legend />
                                        <Bar dataKey="incoming" name="Gelen" fill="#22c55e" radius={[4, 4, 0, 0]} />
                                        <Bar dataKey="outgoing" name="Giden" fill="#ef4444" radius={[4, 4, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Integrator Dashboard */}
            {activeTab === "integrator" && (
                <div className="space-y-6">
                    {/* Stats Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-purple-100 rounded-xl">
                                    <Plug className="h-6 w-6 text-purple-600" />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-gray-900">8</p>
                                    <p className="text-sm text-gray-500">Aktif Entegratör</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-green-100 rounded-xl">
                                    <Users className="h-6 w-6 text-green-600" />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-gray-900">1,790</p>
                                    <p className="text-sm text-gray-500">Kullanan Müşteri</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-blue-100 rounded-xl">
                                    <BarChart3 className="h-6 w-6 text-blue-600" />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-gray-900">476K</p>
                                    <p className="text-sm text-gray-500">Günlük API Çağrısı</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-orange-100 rounded-xl">
                                    <TrendingUp className="h-6 w-6 text-orange-600" />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-gray-900">99.8%</p>
                                    <p className="text-sm text-gray-500">Uptime</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Integrator Table */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Entegratör Listesi</h3>
                            <div className="space-y-3">
                                {integratorData.integrators.map((integrator, idx) => (
                                    <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 font-bold text-sm">
                                                {integrator.name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-900">{integrator.name}</p>
                                                <p className="text-xs text-gray-500">{integrator.customers} müşteri</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className={cn(
                                                "px-2 py-0.5 rounded-full text-xs font-medium",
                                                integrator.status === "active" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                                            )}>
                                                {integrator.status === "active" ? "Aktif" : "Bakım"}
                                            </span>
                                            <div className="text-right">
                                                <p className="font-semibold text-gray-900">{(integrator.apiCalls / 1000).toFixed(0)}K</p>
                                                <p className="text-xs text-gray-500">API/gün</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* API Usage */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Haftalık API Kullanımı</h3>
                            <div className="h-[300px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={integratorData.apiUsage}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                        <XAxis dataKey="day" axisLine={false} tickLine={false} />
                                        <YAxis axisLine={false} tickLine={false} tickFormatter={(v) => `${v / 1000}K`} />
                                        <Tooltip formatter={(value: number) => [`${(value / 1000).toFixed(0)}K çağrı`, "API"]} />
                                        <Bar dataKey="calls" fill="#a855f7" radius={[4, 4, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Marketplace Dashboard */}
            {activeTab === "marketplace" && (
                <div className="space-y-6">
                    {/* Stats Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-green-100 rounded-xl">
                                    <Store className="h-6 w-6 text-green-600" />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-gray-900">6</p>
                                    <p className="text-sm text-gray-500">Aktif Pazaryeri</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-orange-100 rounded-xl">
                                    <Users className="h-6 w-6 text-orange-600" />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-gray-900">1,097</p>
                                    <p className="text-sm text-gray-500">Satıcı Sayısı</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-blue-100 rounded-xl">
                                    <Package className="h-6 w-6 text-blue-600" />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-gray-900">45.2K</p>
                                    <p className="text-sm text-gray-500">Aylık Ürün</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-purple-100 rounded-xl">
                                    <TrendingUp className="h-6 w-6 text-purple-600" />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-gray-900">₺12.8M</p>
                                    <p className="text-sm text-gray-500">Toplam Ciro</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Marketplace Pie Chart */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Pazaryeri Dağılımı</h3>
                            <div className="h-[350px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={marketplaceData}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={80}
                                            outerRadius={120}
                                            paddingAngle={3}
                                            dataKey="value"
                                            label={({ name, value }) => `${name} ${value}%`}
                                        >
                                            {marketplaceData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <Tooltip formatter={(value: number) => [`${value}%`, "Pay"]} />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Marketplace Details */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Pazaryeri Detayları</h3>
                            <div className="space-y-4">
                                {marketplaceData.map((marketplace, idx) => (
                                    <div key={idx} className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div
                                                className="w-4 h-4 rounded-full"
                                                style={{ backgroundColor: marketplace.color }}
                                            />
                                            <span className="font-medium text-gray-900">{marketplace.name}</span>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full rounded-full"
                                                    style={{ width: `${marketplace.value}%`, backgroundColor: marketplace.color }}
                                                />
                                            </div>
                                            <span className="font-bold text-gray-900 w-12 text-right">{marketplace.value}%</span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-6 pt-4 border-t border-gray-100">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-3 bg-gradient-to-br from-orange-50 to-red-50 rounded-lg">
                                        <p className="text-sm text-gray-500">En Yüksek</p>
                                        <p className="text-lg font-bold text-gray-900">Trendyol</p>
                                        <p className="text-xs text-orange-600">35% pazar payı</p>
                                    </div>
                                    <div className="p-3 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg">
                                        <p className="text-sm text-gray-500">En Hızlı Büyüyen</p>
                                        <p className="text-lg font-bold text-gray-900">Amazon</p>
                                        <p className="text-xs text-green-600">+22.5% büyüme</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </PageContainer>
    );
}
