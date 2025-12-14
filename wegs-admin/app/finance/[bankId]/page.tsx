"use client";

import { useState } from "react";
import { ArrowLeft, CheckCircle2, AlertTriangle, XCircle, Search, Filter, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams } from "next/navigation";

// Mock Data for Customers
const mockCustomers = [
    { id: 1, name: "Ahmet Yılmaz", company: "Tech Start A.Ş.", balance: "₺125,000", status: "Active", lastTx: "2 dk önce" },
    { id: 2, name: "Ayşe Demir", company: "Butik Tasarım", balance: "₺42,500", status: "Active", lastTx: "1 saat önce" },
    { id: 3, name: "Mehmet Kaya", company: "Lojistik Ltd.", balance: "₺850,000", status: "Warning", lastTx: "5 saat önce" },
    { id: 4, name: "Zeynep Çelik", company: "Design Studio", balance: "₺12,000", status: "Error", lastTx: "1 gün önce" },
    { id: 5, name: "Caner Erkin", company: "Sports Store", balance: "₺340,000", status: "Active", lastTx: "15 dk önce" },
];

export default function BankDetailPage() {
    const params = useParams();
    // In a real app, use params.bankId to fetch data
    const bankName = decodeURIComponent(params.bankId as string);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center space-x-4">
                <Link href="/finance" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <ArrowLeft className="h-5 w-5 text-gray-500" />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                        {bankName} Entegrasyonu
                        <span className="ml-3 px-2.5 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800 flex items-center">
                            <CheckCircle2 className="w-4 h-4 mr-1" /> Stabil
                        </span>
                    </h1>
                    <p className="text-sm text-gray-500">API Bağlantısı: v2.4.1 • Son Kontrol: 1dk önce</p>
                </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <p className="text-sm font-medium text-gray-500">Aktif Müşteri Sayısı</p>
                    <div className="mt-2 flex items-baseline">
                        <span className="text-3xl font-bold text-gray-900">450</span>
                        <span className="ml-2 text-sm font-medium text-green-600">+12 (Bu hafta)</span>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <p className="text-sm font-medium text-gray-500">Günlük İşlem Hacmi</p>
                    <div className="mt-2 flex items-baseline">
                        <span className="text-3xl font-bold text-gray-900">₺2.4M</span>
                        <span className="ml-2 text-sm font-medium text-green-600">+8%</span>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <p className="text-sm font-medium text-gray-500">Hata Oranı (24s)</p>
                    <div className="mt-2 flex items-baseline">
                        <span className="text-3xl font-bold text-gray-900">%0.02</span>
                        <span className="ml-2 text-sm font-medium text-green-600">Normal</span>
                    </div>
                </div>
            </div>

            {/* Customer List */}
            <div className="bg-white shadow-sm border border-gray-200 rounded-xl overflow-hidden">
                <div className="p-6 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <h3 className="text-lg font-semibold text-gray-900">Bu Bankayı Kullanan Müşteriler</h3>
                    <div className="flex space-x-3">
                        <div className="relative">
                            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Müşteri ara..."
                                className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50">
                            <Filter className="h-4 w-4 mr-2" />
                            Filtrele
                        </button>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Müşteri / Şirket</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bakiye / Hacim</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Durum</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Son İşlem</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">İşlem</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {mockCustomers.map((customer) => (
                                <tr key={customer.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="h-9 w-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs">
                                                {customer.name.substring(0, 2).toUpperCase()}
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">{customer.name}</div>
                                                <div className="text-sm text-gray-500">{customer.company}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900 font-medium">{customer.balance}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={cn(
                                            "px-2 inline-flex text-xs leading-5 font-semibold rounded-full",
                                            customer.status === 'Active' ? "bg-green-100 text-green-800" :
                                                customer.status === 'Warning' ? "bg-yellow-100 text-yellow-800" :
                                                    "bg-red-100 text-red-800"
                                        )}>
                                            {customer.status === 'Active' ? 'Bağlı' : customer.status === 'Warning' ? 'Hata Var' : 'Kesik'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {customer.lastTx}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <Link href={`/customers/${customer.id}/transactions`} className="text-blue-600 hover:text-blue-900 inline-flex items-center">
                                            İşlemler <ExternalLink className="h-3 w-3 ml-1" />
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
