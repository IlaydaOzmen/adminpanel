"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
    Search,
    Filter,
    MoreHorizontal,
    CheckCircle2,
    XCircle,
    AlertCircle,
    Download,
    CreditCard,
    Landmark,
    AlertTriangle,
    Diamond,
    Rocket,
    ShoppingBag,
    Calculator
} from "lucide-react";
import { cn } from "@/lib/utils";

type Customer = {
    id: string;
    name: string;
    email: string;
    package: "Starter" | "Business" | "Enterprise";
    status: "Active" | "Expired" | "Trial";
    lastLogin: string;
    riskScore: number;
    autoRenewal: boolean;
    isEInvoice: boolean;
    hasTraining: boolean;
    hasEcommerce: boolean;
    // New fields
    tickets: number;
    volume: number;
    avatarColor: string;
    subscriptionStatus: "Aktif" | "Pasif";
    paymentMethod: "Credit Card" | "Transfer";
    lastPayment: string;
};

const customers: Customer[] = [
    {
        id: "1", name: "Ahmet Yılmaz", email: "ahmet.y@tech.com", package: "Business", status: "Active", lastLogin: "2 saat önce", riskScore: 12, autoRenewal: true, isEInvoice: true, hasTraining: true,
        tickets: 2, volume: 1200, avatarColor: "bg-blue-500", subscriptionStatus: "Aktif", paymentMethod: "Credit Card", lastPayment: "12 Ara 2024", hasEcommerce: true
    },
    {
        id: "2", name: "Ayşe Demir", email: "ayse@butik.com", package: "Starter", status: "Trial", lastLogin: "5 dk önce", riskScore: 5, autoRenewal: false, isEInvoice: false, hasTraining: false,
        tickets: 0, volume: 500, avatarColor: "bg-purple-500", subscriptionStatus: "Aktif", paymentMethod: "Credit Card", lastPayment: "10 Ara 2024", hasEcommerce: true
    },
    {
        id: "3", name: "Mehmet Kaya", email: "mehmet@lojistik.com", package: "Enterprise", status: "Expired", lastLogin: "1 hafta önce", riskScore: 85, autoRenewal: false, isEInvoice: true, hasTraining: true,
        tickets: 15, volume: 25000, avatarColor: "bg-red-500", subscriptionStatus: "Pasif", paymentMethod: "Transfer", lastPayment: "01 Kas 2024", hasEcommerce: false
    },
    {
        id: "4", name: "Zeynep Çelik", email: "zeynep@design.com", package: "Business", status: "Active", lastLogin: "1 gün önce", riskScore: 2, autoRenewal: true, isEInvoice: false, hasTraining: true,
        tickets: 1, volume: 3000, avatarColor: "bg-green-500", subscriptionStatus: "Aktif", paymentMethod: "Credit Card", lastPayment: "14 Ara 2024", hasEcommerce: false
    },
    {
        id: "5", name: "Caner Erkin", email: "caner@sports.com", package: "Starter", status: "Active", lastLogin: "3 gün önce", riskScore: 45, autoRenewal: true, isEInvoice: true, hasTraining: false,
        tickets: 8, volume: 1500, avatarColor: "bg-yellow-500", subscriptionStatus: "Aktif", paymentMethod: "Transfer", lastPayment: "05 Ara 2024", hasEcommerce: true
    },
];

export function CustomerTable() {
    const router = useRouter();
    const [filter, setFilter] = useState("all");
    const [searchTerm, setSearchTerm] = useState("");

    const filteredCustomers = customers.filter(customer => {
        const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            customer.email.toLowerCase().includes(searchTerm.toLowerCase());

        if (filter === "einvoice") return matchesSearch && customer.isEInvoice;
        if (filter === "non-invoice") return matchesSearch && !customer.isEInvoice;
        if (filter === "no-training") return matchesSearch && !customer.hasTraining;
        if (filter === "ecommerce") return matchesSearch && customer.hasEcommerce;
        if (filter === "ecommerce-einvoice") return matchesSearch && customer.hasEcommerce && customer.isEInvoice;
        if (filter === "accounting-only") return matchesSearch && !customer.hasEcommerce && !customer.isEInvoice;

        return matchesSearch;
    });

    return (
        <div className="space-y-4">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                <div className="relative max-w-sm w-full">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        placeholder="Müşteri ara..."
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="flex items-center gap-2">
                    <div className="relative">
                        <select
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            className="appearance-none block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                        >
                            <option value="all">Tüm Müşteriler</option>
                            <option value="ecommerce">E-ticaret Entegrasyonlu</option>
                            <option value="ecommerce-einvoice">E-tic. + E-Fatura</option>
                            <option value="accounting-only">Sadece Muhasebe</option>
                            <option value="einvoice">E-Fatura Mükellefleri</option>
                            <option value="non-invoice">Fatura Kesmeyenler</option>
                            <option value="no-training">Eğitim Almamış</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <Filter className="h-4 w-4" />
                        </div>
                    </div>
                    <button className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none">
                        <Download className="h-4 w-4 mr-2" />
                        Dışa Aktar
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Müşteri
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Paket
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Ödeme Bilgileri
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Durum / Risk
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Son Giriş
                            </th>
                            <th scope="col" className="relative px-6 py-3">
                                <span className="sr-only">Düzenle</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredCustomers.map((customer) => {
                            // Mock Risk Logic
                            const isHighRisk = customer.tickets > 10; // Mock: High ticket volume
                            const isVIP = customer.volume > 4000; // Mock: High Volume
                            const isEInvoiceOpp = customer.package === "Business" && !customer.isEInvoice; // Mock: Opportunity

                            return (
                                <tr
                                    key={customer.id}
                                    className="hover:bg-gray-50 transition-colors cursor-pointer"
                                    onClick={() => router.push(`/customers/${customer.id}`)}
                                >
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-10 w-10">
                                                <div className={cn("h-10 w-10 rounded-full flex items-center justify-center text-white font-bold shadow-sm", customer.avatarColor)}>
                                                    {customer.name.charAt(0)}
                                                </div>
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">{customer.name}</div>
                                                <div className="text-sm text-gray-500">{customer.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex flex-col">
                                            <span className="text-sm text-gray-900 font-medium">{customer.package}</span>
                                            <div className="flex items-center space-x-2 mt-1">
                                                <span className={cn(
                                                    "inline-flex items-center px-2 py-0.5 rounded text-xs font-medium",
                                                    customer.subscriptionStatus === "Aktif" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                                                )}>
                                                    {customer.subscriptionStatus}
                                                </span>
                                                {customer.autoRenewal && (
                                                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                                                        Oto. Yenileme
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900 flex items-center">
                                            {customer.paymentMethod === "Credit Card" ? <CreditCard className="w-4 h-4 mr-1 text-gray-400" /> : <Landmark className="w-4 h-4 mr-1 text-gray-400" />}
                                            {customer.paymentMethod === "Credit Card" ? "Kredi Kartı" : "Havale/EFT"}
                                        </div>
                                        <div className="text-xs text-gray-500 mt-1">{customer.lastPayment}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex flex-col space-y-1">
                                            {customer.hasEcommerce && (
                                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-orange-100 text-orange-800">
                                                    <ShoppingBag className="mr-1 h-3 w-3" />
                                                    E-Ticaret
                                                </span>
                                            )}
                                            {customer.isEInvoice && (
                                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                                                    <Rocket className="mr-1 h-3 w-3" />
                                                    E-Fatura
                                                </span>
                                            )}
                                            {!customer.hasEcommerce && !customer.isEInvoice && (
                                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                                                    <Calculator className="mr-1 h-3 w-3" />
                                                    Muhasebe
                                                </span>
                                            )}

                                            {isHighRisk && (
                                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800 animate-pulse">
                                                    <AlertTriangle className="mr-1 h-3 w-3" />
                                                    Yüksek Destek Riski
                                                </span>
                                            )}
                                            {isVIP && (
                                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-800">
                                                    <Diamond className="mr-1 h-3 w-3" />
                                                    VIP / Yüksek Hacim
                                                </span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {customer.lastLogin}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button onClick={(e) => { e.stopPropagation(); }} className="text-indigo-600 hover:text-indigo-900">Düzenle</button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            <div className="flex items-center justify-between px-4 py-3 bg-white border border-gray-200 rounded-lg sm:px-6">
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm text-gray-700">
                            Toplam <span className="font-medium">{filteredCustomers.length}</span> sonuçtan <span className="font-medium">1</span> ile <span className="font-medium">{filteredCustomers.length}</span> arası gösteriliyor
                        </p>
                    </div>
                    <div>
                        <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                            <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                                Önceki
                            </button>
                            <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                                1
                            </button>
                            <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                                Sonraki
                            </button>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    );
}
