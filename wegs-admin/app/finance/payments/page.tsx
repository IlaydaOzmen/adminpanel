"use client";

import { useState } from "react";
import { PageContainer } from "@/components/layout/PageContainer";
import { PageHeader } from "@/components/layout/PageHeader";
import { ManualIBANModal } from "@/components/finance/ManualIBANModal";
import { ArrowLeft, Search, Filter, Download, Plus, Calendar, CreditCard, Building2 } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

// Mock Transaction Data
const allPayments = [
    { id: "PAY-001", customer: "Ahmet Yılmaz", date: "2024-12-12", amount: 1250.00, method: "Kredi Kartı", status: "Başarılı" },
    { id: "PAY-002", customer: "Butik Tasarım", date: "2024-12-11", amount: 450.00, method: "Havale/EFT", status: "Onaylandı" },
    { id: "PAY-003", customer: "Mehmet Kaya", date: "2024-12-10", amount: 2800.00, method: "Kredi Kartı", status: "Başarılı" },
    { id: "PAY-004", customer: "Design Studio", date: "2024-12-05", amount: 150.00, method: "Kredi Kartı", status: "İade" },
    { id: "PAY-005", customer: "Caner Erkin", date: "2024-11-25", amount: 3500.00, method: "Havale/EFT", status: "Bekliyor" },
    { id: "PAY-006", customer: "Tech Start A.Ş.", date: "2024-10-15", amount: 12000.00, method: "Kredi Kartı", status: "Başarılı" }, // Q4
    { id: "PAY-007", customer: "Lojistik Ltd.", date: "2024-08-20", amount: 8500.00, method: "Havale/EFT", status: "Başarılı" },   // Q3
    { id: "PAY-008", customer: "Global A.Ş.", date: "2024-12-12", amount: 500.00, method: "Kredi Kartı", status: "Başarılı" },
];

const periods = [
    "Bugün", "Dün", "Son 7 Gün", "Son 30 Gün", "Bu Ay"
];

const quarters = [
    "1. Çeyrek", "2. Çeyrek", "3. Çeyrek", "4. Çeyrek"
];

export default function PaymentsPage() {
    const [selectedPeriod, setSelectedPeriod] = useState("Bugün");
    const [selectedQuarter, setSelectedQuarter] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [dateRange, setDateRange] = useState({ start: "", end: "" });

    // Filter Logic (Mock implementation)
    // In a real app, this would query an API. Here we just filter the static list for demonstration.
    const filteredPayments = allPayments.filter(payment => {
        // Simplified Logic: Just showing all data unless a specific quarter implies filtering.
        // For UI demo purposes, showing all data is often better than showing empty tables.
        if (selectedQuarter === "4. Çeyrek") return payment.date.includes("2024-10") || payment.date.includes("2024-11") || payment.date.includes("2024-12");
        if (selectedQuarter === "3. Çeyrek") return payment.date.includes("2024-07") || payment.date.includes("2024-08") || payment.date.includes("2024-09");
        return true;
    });

    return (
        <PageContainer>
            <PageHeader title="Ödemeler & Tahsilat" description="Kredi kartı ve havale/EFT işlemlerini yönetin.">
                <div className="flex items-center gap-3">
                    <Link href="/finance" className="p-2 hover:bg-gray-100 rounded-full transition-colors mr-2 sm:hidden">
                        <ArrowLeft className="h-5 w-5 text-gray-500" />
                    </Link>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                    >
                        <Plus className="mr-2 h-4 w-4" />
                        Manuel Giriş
                    </button>
                </div>
            </PageHeader>

            {/* Filters Section */}
            <div className="space-y-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-medium text-gray-700 mr-2">Tarih:</span>
                    {periods.map((period) => (
                        <button
                            key={period}
                            onClick={() => { setSelectedPeriod(period); setSelectedQuarter(null); }}
                            className={cn(
                                "px-3 py-1.5 text-xs font-medium rounded-full transition-colors border",
                                selectedPeriod === period && !selectedQuarter
                                    ? "bg-gray-900 text-white border-gray-900"
                                    : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                            )}
                        >
                            {period}
                        </button>
                    ))}
                    <div className="h-6 w-px bg-gray-200 mx-2 hidden sm:block"></div>
                    {quarters.map((quarter) => (
                        <button
                            key={quarter}
                            onClick={() => { setSelectedQuarter(quarter); setSelectedPeriod(""); }}
                            className={cn(
                                "px-3 py-1.5 text-xs font-medium rounded-full transition-colors border",
                                selectedQuarter === quarter
                                    ? "bg-blue-100 text-blue-700 border-blue-200"
                                    : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                            )}
                        >
                            {quarter}
                        </button>
                    ))}
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-gray-50">
                    <span className="text-xs text-gray-500">Özel Aralık:</span>
                    <input type="date" className="px-2 py-1 text-xs border border-gray-200 rounded-md" onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })} />
                    <span className="text-gray-400">-</span>
                    <input type="date" className="px-2 py-1 text-xs border border-gray-200 rounded-md" onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })} />
                </div>
            </div>

            {/* Payments Table */}
            <div className="bg-white shadow-sm border border-gray-100 rounded-xl overflow-hidden">
                <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <h3 className="text-base font-semibold text-gray-900">İşlem Listesi</h3>
                    <div className="flex space-x-2">
                        <div className="relative">
                            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Ara..."
                                className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500 w-full sm:w-64"
                            />
                        </div>
                        <button className="inline-flex items-center px-3 py-2 border border-gray-200 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50">
                            <Filter className="h-4 w-4" />
                        </button>
                        <button className="inline-flex items-center px-3 py-2 border border-gray-200 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50">
                            <Download className="h-4 w-4" />
                        </button>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-100">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">İşlem ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Müşteri</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tarih</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Yöntem</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tutar</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Durum</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-100">
                            {filteredPayments.map((payment) => (
                                <tr key={payment.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap text-xs font-medium text-gray-500">{payment.id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{payment.customer}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payment.date}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center text-sm text-gray-600">
                                            {payment.method === "Kredi Kartı" ? (
                                                <CreditCard className="h-4 w-4 mr-2 text-purple-500" />
                                            ) : (
                                                <Building2 className="h-4 w-4 mr-2 text-orange-500" />
                                            )}
                                            {payment.method}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                                        ₺{payment.amount.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={cn(
                                            "px-2 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full",
                                            payment.status === 'Başarılı' || payment.status === 'Onaylandı' ? "bg-green-100 text-green-800" :
                                                payment.status === 'Bekliyor' ? "bg-yellow-100 text-yellow-800" :
                                                    "bg-red-100 text-red-800"
                                        )}>
                                            {payment.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <ManualIBANModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </PageContainer>
    );
}
