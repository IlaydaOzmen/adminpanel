"use client";

import { useParams } from "next/navigation";
import { PageContainer } from "@/components/layout/PageContainer";
import { PageHeader } from "@/components/layout/PageHeader";
import { ArrowLeft, Search, Filter, Download } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

// Mock Transaction Data
const mockTransactions = [
    { id: "TXN001", date: "2024-03-15 14:30", amount: "₺1,250.00", type: "Ödeme", status: "Başarılı", method: "Kredi Kartı" },
    { id: "TXN002", date: "2024-03-14 09:15", amount: "₺450.00", type: "İade", status: "Bekliyor", method: "Havale" },
    { id: "TXN003", date: "2024-03-12 18:45", amount: "₺2,800.00", type: "Ödeme", status: "Başarılı", method: "Kredi Kartı" },
    { id: "TXN004", date: "2024-03-10 11:20", amount: "₺150.00", type: "Abonelik", status: "Başarılı", method: "Otomatik" },
    { id: "TXN005", date: "2024-03-08 16:50", amount: "₺3,500.00", type: "Ödeme", status: "Hata", method: "Kredi Kartı" },
];

export default function CustomerTransactionsPage() {
    const params = useParams();
    const customerId = params.id;

    return (
        <PageContainer>
            <div className="flex items-center space-x-4 mb-6">
                <Link href={`/customers/${customerId}`} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <ArrowLeft className="h-5 w-5 text-gray-500" />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Müşteri İşlemleri</h1>
                    <p className="text-sm text-gray-500">Müşteri ID: {customerId}</p>
                </div>
            </div>

            <div className="bg-white shadow-sm border border-gray-100 rounded-xl overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <h3 className="text-lg font-semibold text-gray-900">İşlem Geçmişi</h3>
                    <div className="flex space-x-3">
                        <div className="relative">
                            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="İşlem ara..."
                                className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50">
                            <Filter className="h-4 w-4 mr-2" />
                            Filtrele
                        </button>
                        <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50">
                            <Download className="h-4 w-4 mr-2" />
                            Dışa Aktar
                        </button>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-100">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">İşlem ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tarih</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tutar</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tip</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Yöntem</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Durum</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-100">
                            {mockTransactions.map((txn) => (
                                <tr key={txn.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{txn.id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{txn.date}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">{txn.amount}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{txn.type}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{txn.method}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                                            ${txn.status === 'Başarılı' ? 'bg-green-100 text-green-800' :
                                                txn.status === 'Bekliyor' ? 'bg-yellow-100 text-yellow-800' :
                                                    'bg-red-100 text-red-800'}`}>
                                            {txn.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </PageContainer>
    );
}
