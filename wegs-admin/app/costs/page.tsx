"use client";

import { useState } from "react";
import { PageContainer } from "@/components/layout/PageContainer";
import { PageHeader } from "@/components/layout/PageHeader";
import {
    Calculator,
    FileText,
    Cpu,
    Zap,
    Coins,
    TrendingUp,
    TrendingDown,
    BarChart3,
    PieChart as PieChartIcon,
    Clock,
    Server,
    Activity,
    RefreshCw,
    Download,
    ArrowUpRight,
    ArrowDownRight,
    AlertTriangle,
    CheckCircle
} from "lucide-react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    LineChart,
    Line,
    CartesianGrid,
    Legend,
    PieChart,
    Pie,
    Cell,
    AreaChart,
    Area
} from "recharts";
import { cn } from "@/lib/utils";

// Monthly cost data
const monthlyCostData = [
    { month: "Oca", invoiceCost: 12500, apiCost: 3200, creditCost: 8500, totalInvoices: 45000 },
    { month: "Şub", invoiceCost: 11800, apiCost: 2900, creditCost: 7800, totalInvoices: 42000 },
    { month: "Mar", invoiceCost: 13200, apiCost: 3500, creditCost: 9200, totalInvoices: 48000 },
    { month: "Nis", invoiceCost: 14100, apiCost: 3800, creditCost: 10100, totalInvoices: 52000 },
    { month: "May", invoiceCost: 15500, apiCost: 4200, creditCost: 11500, totalInvoices: 58000 },
    { month: "Haz", invoiceCost: 14800, apiCost: 4000, creditCost: 10800, totalInvoices: 55000 },
    { month: "Tem", invoiceCost: 16200, apiCost: 4500, creditCost: 12200, totalInvoices: 62000 },
    { month: "Ağu", invoiceCost: 15900, apiCost: 4300, creditCost: 11900, totalInvoices: 60000 },
    { month: "Eyl", invoiceCost: 17500, apiCost: 4800, creditCost: 13200, totalInvoices: 68000 },
    { month: "Eki", invoiceCost: 18200, apiCost: 5100, creditCost: 14000, totalInvoices: 72000 },
    { month: "Kas", invoiceCost: 19500, apiCost: 5500, creditCost: 15200, totalInvoices: 78000 },
    { month: "Ara", invoiceCost: 21000, apiCost: 5800, creditCost: 16500, totalInvoices: 85000 },
];

// API call distribution
const apiCallDistribution = [
    { name: "E-Fatura API", value: 42, color: "#3b82f6", calls: 125000 },
    { name: "Banka Entegrasyon", value: 28, color: "#10b981", calls: 84000 },
    { name: "GİB Sorgulama", value: 18, color: "#f59e0b", calls: 54000 },
    { name: "Raporlama API", value: 8, color: "#8b5cf6", calls: 24000 },
    { name: "Diğer", value: 4, color: "#6b7280", calls: 12000 },
];

// Credit consumption by type
const creditConsumption = [
    { type: "E-Fatura Gönderimi", consumed: 45000, allocated: 50000, unit: "adet" },
    { type: "E-Arşiv Fatura", consumed: 28000, allocated: 35000, unit: "adet" },
    { type: "SMS Bildirimi", consumed: 12500, allocated: 20000, unit: "adet" },
    { type: "API İsteği", consumed: 298000, allocated: 350000, unit: "adet" },
    { type: "Depolama", consumed: 45, allocated: 100, unit: "GB" },
];

// Operation load data (hourly)
const operationLoadData = [
    { hour: "00:00", load: 15, requests: 450 },
    { hour: "02:00", load: 8, requests: 240 },
    { hour: "04:00", load: 5, requests: 150 },
    { hour: "06:00", load: 12, requests: 360 },
    { hour: "08:00", load: 45, requests: 1350 },
    { hour: "10:00", load: 78, requests: 2340 },
    { hour: "12:00", load: 65, requests: 1950 },
    { hour: "14:00", load: 82, requests: 2460 },
    { hour: "16:00", load: 88, requests: 2640 },
    { hour: "18:00", load: 72, requests: 2160 },
    { hour: "20:00", load: 45, requests: 1350 },
    { hour: "22:00", load: 28, requests: 840 },
];

// Cost per invoice breakdown
const costPerInvoiceDetails = [
    { category: "GİB Entegrasyon", cost: 0.08, percentage: 32 },
    { category: "Sunucu Maliyeti", cost: 0.05, percentage: 20 },
    { category: "Banka API", cost: 0.04, percentage: 16 },
    { category: "SMS/Mail", cost: 0.03, percentage: 12 },
    { category: "Depolama", cost: 0.025, percentage: 10 },
    { category: "Destek", cost: 0.025, percentage: 10 },
];

export default function CostAnalysisPage() {
    const [selectedPeriod, setSelectedPeriod] = useState<string>("month");
    const [showCustomDate, setShowCustomDate] = useState(false);
    const [customStartDate, setCustomStartDate] = useState("");
    const [customEndDate, setCustomEndDate] = useState("");

    const periodOptions = [
        { value: "today", label: "Bugün" },
        { value: "yesterday", label: "Dün" },
        { value: "week", label: "Bu Hafta" },
        { value: "lastWeek", label: "Geçen Hafta" },
        { value: "month", label: "Bu Ay" },
        { value: "lastMonth", label: "Geçen Ay" },
        { value: "quarter", label: "Bu Çeyrek" },
        { value: "lastQuarter", label: "Geçen Çeyrek" },
        { value: "year", label: "Bu Yıl" },
        { value: "lastYear", label: "Geçen Yıl" },
        { value: "custom", label: "Özel Tarih" },
    ];

    const handlePeriodChange = (value: string) => {
        setSelectedPeriod(value);
        if (value === "custom") {
            setShowCustomDate(true);
        } else {
            setShowCustomDate(false);
        }
    };

    const totalCost = monthlyCostData[monthlyCostData.length - 1].invoiceCost +
        monthlyCostData[monthlyCostData.length - 1].apiCost +
        monthlyCostData[monthlyCostData.length - 1].creditCost;
    const totalInvoices = monthlyCostData[monthlyCostData.length - 1].totalInvoices;
    const costPerInvoice = (totalCost / totalInvoices).toFixed(4);
    const avgLoad = Math.round(operationLoadData.reduce((sum, d) => sum + d.load, 0) / operationLoadData.length);
    const totalApiCalls = apiCallDistribution.reduce((sum, d) => sum + d.calls, 0);

    const previousMonthCost = monthlyCostData[monthlyCostData.length - 2].invoiceCost +
        monthlyCostData[monthlyCostData.length - 2].apiCost +
        monthlyCostData[monthlyCostData.length - 2].creditCost;
    const costChange = ((totalCost - previousMonthCost) / previousMonthCost * 100).toFixed(1);

    return (
        <PageContainer>
            <PageHeader title="Maliyet Analizi" description="Fatura maliyetleri, operasyon yükü ve kaynak tüketimi">
                <div className="flex items-center gap-3">
                    <select
                        value={selectedPeriod}
                        onChange={(e) => handlePeriodChange(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        {periodOptions.map((option) => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                    </select>

                    {/* Custom Date Range */}
                    {showCustomDate && (
                        <div className="flex items-center gap-2 animate-in fade-in slide-in-from-right-4 duration-300">
                            <input
                                type="date"
                                value={customStartDate}
                                onChange={(e) => setCustomStartDate(e.target.value)}
                                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <span className="text-gray-400">-</span>
                            <input
                                type="date"
                                value={customEndDate}
                                onChange={(e) => setCustomEndDate(e.target.value)}
                                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button className="px-3 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
                                Uygula
                            </button>
                        </div>
                    )}

                    <button className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 rounded-lg text-sm font-medium text-white hover:bg-blue-700">
                        <Download className="h-4 w-4" />
                        Rapor İndir
                    </button>
                </div>
            </PageHeader>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl p-5 text-white">
                    <div className="flex items-center gap-3 mb-2">
                        <Calculator className="h-6 w-6 text-blue-200" />
                        <span className="text-sm text-blue-100">Toplam Maliyet</span>
                    </div>
                    <p className="text-3xl font-bold">₺{totalCost.toLocaleString('tr-TR')}</p>
                    <div className="flex items-center gap-1 mt-1">
                        {parseFloat(costChange) >= 0 ? (
                            <ArrowUpRight className="h-4 w-4 text-red-300" />
                        ) : (
                            <ArrowDownRight className="h-4 w-4 text-green-300" />
                        )}
                        <span className={cn(
                            "text-xs",
                            parseFloat(costChange) >= 0 ? "text-red-200" : "text-green-200"
                        )}>
                            {costChange}% geçen aya göre
                        </span>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-5 text-white">
                    <div className="flex items-center gap-3 mb-2">
                        <FileText className="h-6 w-6 text-green-200" />
                        <span className="text-sm text-green-100">Fatura Başına Maliyet</span>
                    </div>
                    <p className="text-3xl font-bold">₺{costPerInvoice}</p>
                    <p className="text-xs text-green-200 mt-1">{totalInvoices.toLocaleString('tr-TR')} fatura işlendi</p>
                </div>

                <div className="bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl p-5 text-white">
                    <div className="flex items-center gap-3 mb-2">
                        <Cpu className="h-6 w-6 text-purple-200" />
                        <span className="text-sm text-purple-100">Operasyon Yükü</span>
                    </div>
                    <p className="text-3xl font-bold">%{avgLoad}</p>
                    <p className="text-xs text-purple-200 mt-1">Ortalama sunucu kullanımı</p>
                </div>

                <div className="bg-gradient-to-br from-orange-500 to-amber-600 rounded-xl p-5 text-white">
                    <div className="flex items-center gap-3 mb-2">
                        <Zap className="h-6 w-6 text-orange-200" />
                        <span className="text-sm text-orange-100">API Çağrısı</span>
                    </div>
                    <p className="text-3xl font-bold">{(totalApiCalls / 1000).toFixed(0)}K</p>
                    <p className="text-xs text-orange-200 mt-1">Bu ay toplam</p>
                </div>
            </div>

            {/* Cost Trend Chart */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                <div className="lg:col-span-2 bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Aylık Maliyet Trendi</h3>
                    <div className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={monthlyCostData}>
                                <defs>
                                    <linearGradient id="invoiceCost" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="apiCost" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="creditCost" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                                <XAxis dataKey="month" axisLine={false} tickLine={false} fontSize={12} />
                                <YAxis axisLine={false} tickLine={false} fontSize={12} tickFormatter={(v) => `₺${(v / 1000).toFixed(0)}K`} />
                                <Tooltip formatter={(value: number) => [`₺${value.toLocaleString('tr-TR')}`, '']} />
                                <Legend />
                                <Area type="monotone" dataKey="invoiceCost" name="Fatura Maliyeti" stroke="#3b82f6" fill="url(#invoiceCost)" strokeWidth={2} />
                                <Area type="monotone" dataKey="apiCost" name="API Maliyeti" stroke="#10b981" fill="url(#apiCost)" strokeWidth={2} />
                                <Area type="monotone" dataKey="creditCost" name="Kontör Maliyeti" stroke="#f59e0b" fill="url(#creditCost)" strokeWidth={2} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Cost per Invoice Breakdown */}
                <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Fatura Başına Maliyet Dağılımı</h3>
                    <div className="space-y-3">
                        {costPerInvoiceDetails.map((item) => (
                            <div key={item.category}>
                                <div className="flex items-center justify-between text-sm mb-1">
                                    <span className="text-gray-600">{item.category}</span>
                                    <span className="font-medium text-gray-900">₺{item.cost}</span>
                                </div>
                                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
                                        style={{ width: `${item.percentage}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-100">
                        <div className="flex items-center justify-between">
                            <span className="font-medium text-gray-900">Toplam</span>
                            <span className="text-lg font-bold text-blue-600">
                                ₺{costPerInvoiceDetails.reduce((sum, d) => sum + d.cost, 0).toFixed(2)}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* API Calls & Operation Load */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                {/* API Call Distribution */}
                <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">API Çağrısı Dağılımı</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="h-48">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={apiCallDistribution}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={40}
                                        outerRadius={70}
                                        paddingAngle={2}
                                        dataKey="value"
                                    >
                                        {apiCallDistribution.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip formatter={(value: number) => [`${value}%`, '']} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="space-y-2">
                            {apiCallDistribution.map((item) => (
                                <div key={item.name} className="flex items-center justify-between text-sm">
                                    <div className="flex items-center gap-2">
                                        <div
                                            className="w-3 h-3 rounded-full"
                                            style={{ backgroundColor: item.color }}
                                        />
                                        <span className="text-gray-600">{item.name}</span>
                                    </div>
                                    <span className="font-medium text-gray-900">{(item.calls / 1000).toFixed(0)}K</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Operation Load */}
                <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">Operasyon Yükü (Saatlik)</h3>
                        <div className="flex items-center gap-2">
                            <div className={cn(
                                "w-2 h-2 rounded-full",
                                avgLoad < 50 ? "bg-green-500" : avgLoad < 80 ? "bg-yellow-500" : "bg-red-500"
                            )} />
                            <span className="text-sm text-gray-500">
                                {avgLoad < 50 ? "Normal" : avgLoad < 80 ? "Yüksek" : "Kritik"}
                            </span>
                        </div>
                    </div>
                    <div className="h-48">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={operationLoadData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                                <XAxis dataKey="hour" axisLine={false} tickLine={false} fontSize={10} />
                                <YAxis axisLine={false} tickLine={false} fontSize={12} tickFormatter={(v) => `${v}%`} />
                                <Tooltip formatter={(value: number) => [`${value}%`, 'Yük']} />
                                <Bar dataKey="load" radius={[4, 4, 0, 0]}>
                                    {operationLoadData.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={entry.load < 50 ? "#10b981" : entry.load < 80 ? "#f59e0b" : "#ef4444"}
                                        />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Credit Consumption */}
            <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 p-6">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900">Kontör Tüketimi</h3>
                        <p className="text-sm text-gray-500">Kaynak kullanım durumu</p>
                    </div>
                    <button className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-100">
                        <Coins className="h-4 w-4" />
                        Kontör Satın Al
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                    {creditConsumption.map((item) => {
                        const percentage = (item.consumed / item.allocated) * 100;
                        const isWarning = percentage > 80;
                        const isCritical = percentage > 95;

                        return (
                            <div key={item.type} className="p-4 bg-gray-50 rounded-xl">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-medium text-gray-700">{item.type}</span>
                                    {isCritical && <AlertTriangle className="w-4 h-4 text-red-500" />}
                                    {isWarning && !isCritical && <AlertTriangle className="w-4 h-4 text-yellow-500" />}
                                    {!isWarning && <CheckCircle className="w-4 h-4 text-green-500" />}
                                </div>
                                <div className="flex items-end gap-1 mb-2">
                                    <span className="text-xl font-bold text-gray-900">
                                        {item.consumed.toLocaleString('tr-TR')}
                                    </span>
                                    <span className="text-sm text-gray-500">
                                        / {item.allocated.toLocaleString('tr-TR')} {item.unit}
                                    </span>
                                </div>
                                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                                    <div
                                        className={cn(
                                            "h-full rounded-full transition-all",
                                            isCritical && "bg-red-500",
                                            isWarning && !isCritical && "bg-yellow-500",
                                            !isWarning && "bg-green-500"
                                        )}
                                        style={{ width: `${Math.min(percentage, 100)}%` }}
                                    />
                                </div>
                                <p className={cn(
                                    "text-xs mt-1",
                                    isCritical && "text-red-600",
                                    isWarning && !isCritical && "text-yellow-600",
                                    !isWarning && "text-gray-500"
                                )}>
                                    %{percentage.toFixed(1)} kullanıldı
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Detailed Cost Table */}
            <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 overflow-hidden mt-6">
                <div className="px-6 py-4 border-b border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-900">Aylık Maliyet Detayı</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ay</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fatura Sayısı</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fatura Maliyeti</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">API Maliyeti</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Kontör Maliyeti</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Toplam</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fatura Başına</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {monthlyCostData.slice(-6).map((row, idx) => {
                                const total = row.invoiceCost + row.apiCost + row.creditCost;
                                const perInvoice = (total / row.totalInvoices).toFixed(4);
                                return (
                                    <tr key={row.month} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 text-sm font-medium text-gray-900">{row.month} 2024</td>
                                        <td className="px-6 py-4 text-sm text-gray-600">{row.totalInvoices.toLocaleString('tr-TR')}</td>
                                        <td className="px-6 py-4 text-sm text-gray-600">₺{row.invoiceCost.toLocaleString('tr-TR')}</td>
                                        <td className="px-6 py-4 text-sm text-gray-600">₺{row.apiCost.toLocaleString('tr-TR')}</td>
                                        <td className="px-6 py-4 text-sm text-gray-600">₺{row.creditCost.toLocaleString('tr-TR')}</td>
                                        <td className="px-6 py-4 text-sm font-bold text-gray-900">₺{total.toLocaleString('tr-TR')}</td>
                                        <td className="px-6 py-4 text-sm font-medium text-blue-600">₺{perInvoice}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </PageContainer>
    );
}
