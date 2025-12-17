"use client";

import { useState } from "react";
import { CreditCard, Banknote, Calendar, Filter, Plus, Search, Download, X, CheckCircle, Clock, Building2, Receipt, User, Eye } from "lucide-react";
import { cn } from "@/lib/utils";

type PaymentMethod = "cc" | "iban";
type DateFilter = "today" | "yesterday" | "last7" | "last30" | "thisMonth" | "q1" | "q2" | "q3" | "q4" | "custom";

interface Payment {
    id: number;
    user: string;
    contact: string;
    email: string;
    amount: string;
    amountValue: number;
    date: string;
    method: "cc" | "iban";
    status: string;
    invoiceNo: string;
    cardLast4?: string;
    bankName?: string;
    reference?: string;
    package: string;
}

const MOCK_PAYMENTS: Payment[] = [
    { id: 1, user: "Tech Solutions", contact: "Ahmet Yılmaz", email: "ahmet@techsolutions.com", amount: "₺1,200", amountValue: 1200, date: "2024-03-15", method: "cc", status: "Başarılı", invoiceNo: "INV-2024-0045", cardLast4: "4532", package: "Pro Paket" },
    { id: 2, user: "Digital Agency", contact: "Zeynep Demir", email: "zeynep@digitalagency.com", amount: "₺2,400", amountValue: 2400, date: "2024-03-14", method: "iban", status: "Onay Bekliyor", invoiceNo: "INV-2024-0044", bankName: "Garanti BBVA", reference: "DKN-789456", package: "Enterprise Paket" },
    { id: 3, user: "Consulting Group", contact: "Can Özkan", email: "can@consulting.com", amount: "₺850", amountValue: 850, date: "2024-03-14", method: "cc", status: "Başarılı", invoiceNo: "INV-2024-0043", cardLast4: "8821", package: "Starter Paket" },
    { id: 4, user: "E-com Pro", contact: "Fatma Şahin", email: "fatma@ecompro.com", amount: "₺5,000", amountValue: 5000, date: "2024-03-10", method: "iban", status: "Onaylandı", invoiceNo: "INV-2024-0042", bankName: "Akbank", reference: "DKN-456123", package: "Enterprise Paket" },
    { id: 5, user: "StartUp Hub", contact: "Ali Kara", email: "ali@startuphub.com", amount: "₺450", amountValue: 450, date: "2024-02-28", method: "cc", status: "Başarılı", invoiceNo: "INV-2024-0041", cardLast4: "1234", package: "Starter Paket" },
    { id: 6, user: "Global Ticaret", contact: "Mehmet Yıldız", email: "mehmet@globalticaret.com", amount: "₺3,600", amountValue: 3600, date: "2024-03-12", method: "iban", status: "Başarılı", invoiceNo: "INV-2024-0040", bankName: "İş Bankası", reference: "DKN-321789", package: "Pro Paket" },
];

export function PaymentList() {
    const [activeTab, setActiveTab] = useState<PaymentMethod>("cc");
    const [dateFilter, setDateFilter] = useState<DateFilter>("thisMonth");
    const [showIbanModal, setShowIbanModal] = useState(false);
    const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
    const [searchQuery, setSearchQuery] = useState("");

    const filteredPayments = MOCK_PAYMENTS.filter(p => {
        const matchesMethod = p.method === activeTab;
        const matchesSearch = searchQuery.length === 0 ||
            p.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.invoiceNo.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesMethod && matchesSearch;
    });

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
                            className="block w-full rounded-md border-gray-300 py-1.5 text-base text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
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
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="block w-full rounded-md border-gray-300 pl-10 text-gray-900 focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-1.5"
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
                        {filteredPayments.map((payment) => (
                            <tr key={payment.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center gap-3">
                                        <div className="h-9 w-9 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                                            {payment.user.charAt(0)}
                                        </div>
                                        <div>
                                            <div className="text-sm font-medium text-gray-900">{payment.user}</div>
                                            <div className="text-xs text-gray-500">{payment.invoiceNo}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-semibold text-gray-900">{payment.amount}</div>
                                    <div className="text-xs text-gray-500">{payment.package}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{payment.date}</td>
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
                                    <button
                                        onClick={() => setSelectedPayment(payment)}
                                        className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-900 font-medium"
                                    >
                                        <Eye className="h-4 w-4" />
                                        Detay
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {filteredPayments.length === 0 && (
                            <tr>
                                <td colSpan={5} className="px-6 py-10 text-center text-sm text-gray-500">
                                    Bu kriterlere uygun ödeme bulunamadı.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Payment Detail Modal */}
            {selectedPayment && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl overflow-hidden">
                        {/* Header */}
                        <div className="flex items-center justify-between p-5 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-100 rounded-xl">
                                    <Receipt className="h-5 w-5 text-blue-600" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900">Ödeme Detayı</h3>
                                    <p className="text-sm text-gray-500">{selectedPayment.invoiceNo}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setSelectedPayment(null)}
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                            >
                                <X className="h-5 w-5 text-gray-500" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-5 space-y-5">
                            {/* Status Banner */}
                            <div className={cn(
                                "flex items-center gap-3 p-4 rounded-xl",
                                selectedPayment.status === "Başarılı" || selectedPayment.status === "Onaylandı" ? "bg-green-50" :
                                    selectedPayment.status === "Onay Bekliyor" ? "bg-yellow-50" : "bg-red-50"
                            )}>
                                {(selectedPayment.status === "Başarılı" || selectedPayment.status === "Onaylandı") ? (
                                    <CheckCircle className="h-6 w-6 text-green-600" />
                                ) : (
                                    <Clock className="h-6 w-6 text-yellow-600" />
                                )}
                                <div>
                                    <p className={cn(
                                        "font-semibold",
                                        selectedPayment.status === "Başarılı" || selectedPayment.status === "Onaylandı" ? "text-green-700" : "text-yellow-700"
                                    )}>
                                        {selectedPayment.status}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        {selectedPayment.date} tarihinde işlendi
                                    </p>
                                </div>
                            </div>

                            {/* Amount */}
                            <div className="text-center py-4">
                                <p className="text-4xl font-bold text-gray-900">{selectedPayment.amount}</p>
                                <p className="text-sm text-gray-500 mt-1">{selectedPayment.package}</p>
                            </div>

                            {/* Customer Info */}
                            <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                                <div className="flex items-center gap-3">
                                    <Building2 className="h-4 w-4 text-gray-400" />
                                    <div>
                                        <p className="text-xs text-gray-500">Firma</p>
                                        <p className="text-sm font-medium text-gray-900">{selectedPayment.user}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <User className="h-4 w-4 text-gray-400" />
                                    <div>
                                        <p className="text-xs text-gray-500">İletişim</p>
                                        <p className="text-sm font-medium text-gray-900">{selectedPayment.contact}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Payment Method Info */}
                            <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                                <div className="flex items-center gap-3">
                                    {selectedPayment.method === "cc" ? (
                                        <CreditCard className="h-4 w-4 text-gray-400" />
                                    ) : (
                                        <Banknote className="h-4 w-4 text-gray-400" />
                                    )}
                                    <div>
                                        <p className="text-xs text-gray-500">Ödeme Yöntemi</p>
                                        <p className="text-sm font-medium text-gray-900">
                                            {selectedPayment.method === "cc" ? `Kredi Kartı (**** ${selectedPayment.cardLast4})` : `Havale - ${selectedPayment.bankName}`}
                                        </p>
                                    </div>
                                </div>
                                {selectedPayment.reference && (
                                    <div className="flex items-center gap-3">
                                        <Receipt className="h-4 w-4 text-gray-400" />
                                        <div>
                                            <p className="text-xs text-gray-500">Dekont No</p>
                                            <p className="text-sm font-medium text-gray-900">{selectedPayment.reference}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="p-5 bg-gray-50 border-t border-gray-100 flex gap-3">
                            <button className="flex-1 px-4 py-2.5 bg-white border border-gray-300 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                                Fatura Görüntüle
                            </button>
                            <button
                                onClick={() => setSelectedPayment(null)}
                                className="flex-1 px-4 py-2.5 bg-blue-600 rounded-xl text-sm font-medium text-white hover:bg-blue-700 transition-colors"
                            >
                                Kapat
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Manual Entry Modal (Simplified) */}
            {showIbanModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Manuel Ödeme Girişi</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Firma Adı</label>
                                <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2 text-gray-900" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Tutar (₺)</label>
                                <input type="number" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2 text-gray-900" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Tarih</label>
                                <input type="date" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2 text-gray-900" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Açıklama / Dekont No</label>
                                <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2 text-gray-900" />
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
