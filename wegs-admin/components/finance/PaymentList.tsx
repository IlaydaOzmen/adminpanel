"use client";

import { useState } from "react";
import { CreditCard, Banknote, Calendar, Filter, Plus, Search, Download } from "lucide-react";
import { cn } from "@/lib/utils";

type PaymentMethod = "cc" | "iban";
type DateFilter = "today" | "yesterday" | "last7" | "last30" | "thisMonth" | "q1" | "q2" | "q3" | "q4" | "custom";

const MOCK_PAYMENTS = [
    { id: 1, user: "Tech Solutions", amount: "₺1,200", date: "2024-03-15", method: "cc", status: "Başarılı" },
    { id: 2, user: "Digital Agency", amount: "₺2,400", date: "2024-03-14", method: "iban", status: "Onay Bekliyor" },
    { id: 3, user: "Consulting Group", amount: "₺850", date: "2024-03-14", method: "cc", status: "Başarılı" },
    { id: 4, user: "E-com Pro", amount: "₺5,000", date: "2024-03-10", method: "iban", status: "Onaylandı" },
    { id: 5, user: "StartUp Hub", amount: "₺450", date: "2024-02-28", method: "cc", status: "Başarılı" },
];

export function PaymentList() {
    const [activeTab, setActiveTab] = useState<PaymentMethod>("cc");
    const [dateFilter, setDateFilter] = useState<DateFilter>("thisMonth");
    const [showIbanModal, setShowIbanModal] = useState(false);

    return (
        <div className="rounded-lg bg-white shadow-sm ring-1 ring-gray-900/5">
            {/* Header & Tabs */}
            <div className="border-b border-gray-200">
                <div className="p-4 sm:px-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">Ödeme Geçmişi</h3>
                    <div className="flex space-x-2">
                        <button
                            onClick={() => setActiveTab("cc")}
                            className={cn(
                                "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors",
                                activeTab === "cc"
                                    ? "bg-blue-50 text-blue-700 ring-1 ring-blue-200"
                                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                            )}
                        >
                            <CreditCard className="mr-2 h-4 w-4" />
                            Kredi Kartı
                        </button>
                        <button
                            onClick={() => setActiveTab("iban")}
                            className={cn(
                                "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors",
                                activeTab === "iban"
                                    ? "bg-blue-50 text-blue-700 ring-1 ring-blue-200"
                                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                            )}
                        >
                            <Banknote className="mr-2 h-4 w-4" />
                            Havale / EFT
                        </button>
                    </div>
                </div>

                {/* Filters Toolbar */}
                <div className="bg-gray-50 px-4 py-3 sm:px-6 flex flex-wrap items-center gap-3 border-t border-gray-200">
                    <div className="flex items-center space-x-2 overflow-x-auto pb-2 sm:pb-0 no-scrollbar w-full sm:w-auto">
                        <select
                            value={dateFilter}
                            onChange={(e) => setDateFilter(e.target.value as DateFilter)}
                            className="block w-full rounded-md border-gray-300 py-1.5 text-base focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                        >
                            <option value="today">Bugün</option>
                            <option value="yesterday">Dün</option>
                            <option value="last7">Son 7 Gün</option>
                            <option value="last30">Son 30 Gün</option>
                            <option value="thisMonth">Bu Ay</option>
                            <option value="q1">1. Çeyrek</option>
                            <option value="q2">2. Çeyrek</option>
                            <option value="q3">3. Çeyrek</option>
                            <option value="q4">4. Çeyrek</option>
                            <option value="custom">Özel Tarih...</option>
                        </select>
                    </div>

                    <div className="flex-1 min-w-[200px] relative">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <Search className="h-4 w-4 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            className="block w-full rounded-md border-gray-300 pl-10 focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-1.5"
                            placeholder="Firma veya işlem no ara..."
                        />
                    </div>

                    {activeTab === "iban" && (
                        <button
                            onClick={() => setShowIbanModal(true)}
                            className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-3 py-1.5 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            <Plus className="mr-2 h-4 w-4" />
                            Manuel Giriş
                        </button>
                    )}

                    <button className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50">
                        <Download className="mr-2 h-4 w-4" />
                        Excel
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Firma</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tutar</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tarih</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Durum</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">İşlem</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {MOCK_PAYMENTS.filter(p => p.method === activeTab).map((payment) => (
                            <tr key={payment.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{payment.user}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payment.amount}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payment.date}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    <span className={cn(
                                        "px-2 inline-flex text-xs leading-5 font-semibold rounded-full",
                                        payment.status === "Başarılı" || payment.status === "Onaylandı" ? "bg-green-100 text-green-800" :
                                            payment.status === "Onay Bekliyor" ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800"
                                    )}>
                                        {payment.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <a href="#" className="text-blue-600 hover:text-blue-900">Detay</a>
                                </td>
                            </tr>
                        ))}
                        {MOCK_PAYMENTS.filter(p => p.method === activeTab).length === 0 && (
                            <tr>
                                <td colSpan={5} className="px-6 py-10 text-center text-sm text-gray-500">
                                    Bu kriterlere uygun ödeme bulunamadı.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Manual Entry Modal (Simplified) */}
            {showIbanModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Manuel Ödeme Girişi</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Firma Adı</label>
                                <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Tutar (₺)</label>
                                <input type="number" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Tarih</label>
                                <input type="date" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Açıklama / Dekont No</label>
                                <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2" />
                            </div>
                            <div className="flex justify-end space-x-3 mt-6">
                                <button onClick={() => setShowIbanModal(false)} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">İptal</button>
                                <button onClick={() => setShowIbanModal(false)} className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">Kaydet</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
