"use client";

import { useState } from "react";
import { PageContainer } from "@/components/layout/PageContainer";
import { PageHeader } from "@/components/layout/PageHeader";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from "recharts";
import { ArrowLeft, CalendarDays, Wallet, ArrowUpRight, X, FileText } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

// Mock Data
const trendData = [
    { date: "1 Ara", amount: 12500, count: 45 },
    { date: "5 Ara", amount: 18000, count: 62 },
    { date: "10 Ara", amount: 15400, count: 55 },
    { date: "15 Ara", amount: 22000, count: 78 },
    { date: "20 Ara", amount: 28500, count: 95 },
    { date: "25 Ara", amount: 24000, count: 82 },
    { date: "30 Ara", amount: 32000, count: 110 },
];

const periodComparisonData = [
    { name: "Q1", current: 450000, previous: 380000 },
    { name: "Q2", current: 520000, previous: 410000 },
    { name: "Q3", current: 480000, previous: 450000 },
    { name: "Q4", current: 610000, previous: 500000 },
];

const periods = [
    "Bugün", "Son 7 Gün", "Son 30 Gün", "Bu Ay",
    "Q1", "Q2", "Q3", "Q4"
];

// Mock Invoice Details Data
const invoiceDetails = [
    { id: "INV-2024-001", customer: "Atlas Lojistik", amount: 3250, type: "Hizmet Faturası", date: "12 Ara 2024" },
    { id: "INV-2024-002", customer: "TechSoft A.Ş.", amount: 4800, type: "Ürün Faturası", date: "11 Ara 2024" },
    { id: "INV-2024-003", customer: "Mega Market", amount: 1250, type: "Hizmet Faturası", date: "11 Ara 2024" },
    { id: "INV-2024-004", customer: "Birlik Gıda", amount: 2100, type: "Ürün Faturası", date: "10 Ara 2024" },
    { id: "INV-2024-005", customer: "Kaya Holding", amount: 5600, type: "Danışmanlık Faturası", date: "10 Ara 2024" },
    { id: "INV-2024-006", customer: "Online Moda", amount: 890, type: "Hizmet Faturası", date: "9 Ara 2024" },
    { id: "INV-2024-007", customer: "E-Elektronik", amount: 1450, type: "Ürün Faturası", date: "9 Ara 2024" },
    { id: "INV-2024-008", customer: "Dijital Kitap", amount: 780, type: "Hizmet Faturası", date: "8 Ara 2024" },
];

export default function InvoicesPage() {
    const [selectedPeriod, setSelectedPeriod] = useState("Bu Ay");
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <PageContainer>
            <PageHeader title="Kesilen Faturalar Analizi" description="Fatura trendleri ve dönemsel karşılaştırmalar.">
                <Link href="/finance" className="p-2 hover:bg-gray-100 rounded-full transition-colors mr-2">
                    <ArrowLeft className="h-5 w-5 text-gray-500" />
                </Link>
            </PageHeader>

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-2 bg-white p-2 rounded-lg shadow-sm border border-gray-100 w-fit">
                {periods.map((period) => (
                    <button
                        key={period}
                        onClick={() => setSelectedPeriod(period)}
                        className={cn(
                            "px-3 py-1.5 text-sm font-medium rounded-md transition-colors",
                            selectedPeriod === period
                                ? "bg-blue-50 text-blue-700"
                                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                        )}
                    >
                        {period}
                    </button>
                ))}
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div
                    onClick={() => setIsModalOpen(true)}
                    className="bg-white p-6 rounded-xl shadow-sm border border-gray-50 cursor-pointer hover:shadow-md transition-all group"
                >
                    <div className="flex items-center">
                        <div className="p-3 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                            <Wallet className="h-6 w-6 text-blue-600" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-500">Ortalama Fatura Tutarı</p>
                            <h3 className="text-2xl font-bold text-gray-900">₺2,450</h3>
                            <p className="text-xs text-blue-600 mt-1">Detayları görmek için tıkla</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-50">
                    <div className="flex items-center">
                        <div className="p-3 bg-green-50 rounded-lg">
                            <ArrowUpRight className="h-6 w-6 text-green-600" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-500">Günlük İşlem Hacmi (TRY)</p>
                            <h3 className="text-2xl font-bold text-gray-900">₺145.2K</h3>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-50">
                    <div className="flex items-center">
                        <div className="p-3 bg-indigo-50 rounded-lg">
                            <CalendarDays className="h-6 w-6 text-indigo-600" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-500">Toplam Fatura Adedi</p>
                            <h3 className="text-2xl font-bold text-gray-900">1,245</h3>
                        </div>
                    </div>
                </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Trend Analysis */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-50">
                    <h3 className="text-lg font-semibold text-gray-900 mb-6">Fatura Trend Analizi</h3>
                    <div className="h-[350px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={trendData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                />
                                <Legend />
                                <Line type="monotone" dataKey="amount" name="Tutar (₺)" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                                <Line type="monotone" dataKey="count" name="Adet" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Period Comparison */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-50">
                    <h3 className="text-lg font-semibold text-gray-900 mb-6">Dönemsel Karşılaştırma</h3>
                    <div className="h-[350px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={periodComparisonData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                                <Tooltip
                                    cursor={{ fill: 'transparent' }}
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                />
                                <Legend />
                                <Bar dataKey="current" name="Bu Dönem" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="previous" name="Önceki Dönem" fill="#e2e8f0" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Invoice Details Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                        <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-blue-50">
                            <div className="flex items-center gap-2">
                                <div className="p-2 rounded-lg bg-blue-100">
                                    <FileText className="w-5 h-5 text-blue-600" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-800">Fatura Detayları</h3>
                                    <p className="text-xs text-gray-500">Son kesilen faturalar</p>
                                </div>
                            </div>
                            <button onClick={() => setIsModalOpen(false)} className="p-1 rounded-full hover:bg-gray-100 transition-colors">
                                <X className="w-5 h-5 text-gray-400" />
                            </button>
                        </div>
                        <div className="max-h-[60vh] overflow-y-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 sticky top-0">
                                    <tr>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fatura No</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Müşteri</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tip</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tarih</th>
                                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Tutar</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {invoiceDetails.map((invoice) => (
                                        <tr key={invoice.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-4 py-3 text-sm font-medium text-blue-600">{invoice.id}</td>
                                            <td className="px-4 py-3 text-sm text-gray-900">{invoice.customer}</td>
                                            <td className="px-4 py-3">
                                                <span className={cn(
                                                    "px-2 py-0.5 text-xs font-medium rounded-full",
                                                    invoice.type === "Hizmet Faturası" ? "bg-green-100 text-green-700" :
                                                        invoice.type === "Ürün Faturası" ? "bg-blue-100 text-blue-700" :
                                                            "bg-purple-100 text-purple-700"
                                                )}>
                                                    {invoice.type}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 text-sm text-gray-500">{invoice.date}</td>
                                            <td className="px-4 py-3 text-sm font-semibold text-gray-900 text-right">₺{invoice.amount.toLocaleString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
                            <p className="text-sm text-gray-500">Toplam {invoiceDetails.length} fatura</p>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
                            >
                                Kapat
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </PageContainer>
    );
}
