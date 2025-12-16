"use client";

import { useState } from "react";
import { PageContainer } from "@/components/layout/PageContainer";
import { PageHeader } from "@/components/layout/PageHeader";
import Link from "next/link";
import {
    Coins,
    Search,
    AlertTriangle,
    TrendingUp,
    TrendingDown,
    RefreshCw,
    Plus,
    Building2,
    Calendar,
    ChevronRight,
    Zap,
    Package,
    Filter,
    Download,
    ArrowUpRight,
    Clock,
    CheckCircle2
} from "lucide-react";
import { cn } from "@/lib/utils";

type CreditStatus = "low" | "critical" | "normal" | "high" | "all";
type PackageType = "Starter" | "Business" | "Enterprise" | "all";

interface CustomerCredit {
    id: string;
    name: string;
    company: string;
    email: string;
    package: "Starter" | "Business" | "Enterprise";
    totalCredits: number;
    usedCredits: number;
    remainingCredits: number;
    creditExpiryDate: string;
    lastUsage: string;
    autoRenew: boolean;
    monthlyUsage: number;
    estimatedDaysLeft: number;
}

const mockCredits: CustomerCredit[] = [
    {
        id: "1",
        name: "Ahmet Yılmaz",
        company: "TechSoft A.Ş.",
        email: "ahmet@techsoft.com",
        package: "Enterprise",
        totalCredits: 10000,
        usedCredits: 8500,
        remainingCredits: 1500,
        creditExpiryDate: "2025-01-15",
        lastUsage: "2 saat önce",
        autoRenew: true,
        monthlyUsage: 2500,
        estimatedDaysLeft: 18
    },
    {
        id: "2",
        name: "Ayşe Demir",
        company: "Demir Ticaret",
        email: "ayse@demirticaret.com",
        package: "Business",
        totalCredits: 5000,
        usedCredits: 4800,
        remainingCredits: 200,
        creditExpiryDate: "2025-01-20",
        lastUsage: "1 gün önce",
        autoRenew: false,
        monthlyUsage: 1500,
        estimatedDaysLeft: 4
    },
    {
        id: "3",
        name: "Mehmet Kaya",
        company: "Kaya Lojistik",
        email: "mehmet@kayalojistik.com",
        package: "Enterprise",
        totalCredits: 15000,
        usedCredits: 3000,
        remainingCredits: 12000,
        creditExpiryDate: "2025-03-01",
        lastUsage: "3 saat önce",
        autoRenew: true,
        monthlyUsage: 4000,
        estimatedDaysLeft: 90
    },
    {
        id: "4",
        name: "Zeynep Çelik",
        company: "Çelik Mobilya",
        email: "zeynep@celikmobilya.com",
        package: "Starter",
        totalCredits: 1000,
        usedCredits: 950,
        remainingCredits: 50,
        creditExpiryDate: "2025-01-10",
        lastUsage: "5 gün önce",
        autoRenew: false,
        monthlyUsage: 300,
        estimatedDaysLeft: 5
    },
    {
        id: "5",
        name: "Ali Vural",
        company: "Vural İnşaat",
        email: "ali@vuralinşaat.com",
        package: "Business",
        totalCredits: 5000,
        usedCredits: 2500,
        remainingCredits: 2500,
        creditExpiryDate: "2025-02-15",
        lastUsage: "1 saat önce",
        autoRenew: true,
        monthlyUsage: 1200,
        estimatedDaysLeft: 62
    },
    {
        id: "6",
        name: "Fatma Şahin",
        company: "Şahin Market",
        email: "fatma@sahinmarket.com",
        package: "Starter",
        totalCredits: 1000,
        usedCredits: 400,
        remainingCredits: 600,
        creditExpiryDate: "2025-02-01",
        lastUsage: "2 gün önce",
        autoRenew: true,
        monthlyUsage: 250,
        estimatedDaysLeft: 72
    },
    {
        id: "7",
        name: "Can Öztürk",
        company: "Öztürk Tekstil",
        email: "can@ozturktekstil.com",
        package: "Enterprise",
        totalCredits: 20000,
        usedCredits: 18500,
        remainingCredits: 1500,
        creditExpiryDate: "2025-01-25",
        lastUsage: "30 dakika önce",
        autoRenew: true,
        monthlyUsage: 5000,
        estimatedDaysLeft: 9
    },
    {
        id: "8",
        name: "Deniz Arslan",
        company: "Arslan Gıda",
        email: "deniz@arslangida.com",
        package: "Business",
        totalCredits: 5000,
        usedCredits: 1000,
        remainingCredits: 4000,
        creditExpiryDate: "2025-04-01",
        lastUsage: "12 saat önce",
        autoRenew: false,
        monthlyUsage: 800,
        estimatedDaysLeft: 150
    },
];

const getCreditStatus = (remaining: number, total: number): CreditStatus => {
    const percentage = (remaining / total) * 100;
    if (percentage <= 5) return "critical";
    if (percentage <= 20) return "low";
    if (percentage >= 70) return "high";
    return "normal";
};

const statusConfig = {
    critical: { label: "Kritik", color: "text-red-600", bgColor: "bg-red-100", barColor: "bg-red-500" },
    low: { label: "Düşük", color: "text-orange-600", bgColor: "bg-orange-100", barColor: "bg-orange-500" },
    normal: { label: "Normal", color: "text-blue-600", bgColor: "bg-blue-100", barColor: "bg-blue-500" },
    high: { label: "Yüksek", color: "text-green-600", bgColor: "bg-green-100", barColor: "bg-green-500" },
    all: { label: "Tümü", color: "text-gray-600", bgColor: "bg-gray-100", barColor: "bg-gray-500" },
};

export default function CreditsPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState<CreditStatus>("all");
    const [packageFilter, setPackageFilter] = useState<PackageType>("all");
    const [selectedCustomer, setSelectedCustomer] = useState<CustomerCredit | null>(null);
    const [isAddCreditsModalOpen, setIsAddCreditsModalOpen] = useState(false);

    const filteredCredits = mockCredits.filter((customer) => {
        const matchesSearch =
            customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            customer.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
            customer.email.toLowerCase().includes(searchTerm.toLowerCase());
        const customerStatus = getCreditStatus(customer.remainingCredits, customer.totalCredits);
        const matchesStatus = statusFilter === "all" || customerStatus === statusFilter;
        const matchesPackage = packageFilter === "all" || customer.package === packageFilter;
        return matchesSearch && matchesStatus && matchesPackage;
    });

    // Statistics
    const totalCustomers = mockCredits.length;
    const criticalCount = mockCredits.filter(c => getCreditStatus(c.remainingCredits, c.totalCredits) === "critical").length;
    const lowCount = mockCredits.filter(c => getCreditStatus(c.remainingCredits, c.totalCredits) === "low").length;
    const totalRemainingCredits = mockCredits.reduce((sum, c) => sum + c.remainingCredits, 0);
    const autoRenewCount = mockCredits.filter(c => c.autoRenew).length;

    const handleAddCredits = (customer: CustomerCredit) => {
        setSelectedCustomer(customer);
        setIsAddCreditsModalOpen(true);
    };

    return (
        <PageContainer>
            <PageHeader title="Kontör Yönetimi" description="Müşteri kontör bakiyelerini takip edin ve yönetin.">
                <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
                    <Download className="h-4 w-4 mr-2" />
                    Rapor İndir
                </button>
            </PageHeader>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div
                    onClick={() => setStatusFilter("critical")}
                    className={cn(
                        "bg-white rounded-xl p-5 shadow-sm border cursor-pointer transition-all hover:shadow-md",
                        statusFilter === "critical" ? "border-red-500 ring-2 ring-red-200" : "border-gray-200"
                    )}
                >
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-red-100 rounded-xl">
                            <AlertTriangle className="h-6 w-6 text-red-600" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-gray-900">{criticalCount}</p>
                            <p className="text-sm text-gray-500">Kritik Bakiye</p>
                        </div>
                    </div>
                    <div className="mt-3 flex items-center text-sm text-red-600">
                        <Zap className="h-4 w-4 mr-1" />
                        Hemen müdahale gerekiyor
                    </div>
                </div>

                <div
                    onClick={() => setStatusFilter("low")}
                    className={cn(
                        "bg-white rounded-xl p-5 shadow-sm border cursor-pointer transition-all hover:shadow-md",
                        statusFilter === "low" ? "border-orange-500 ring-2 ring-orange-200" : "border-gray-200"
                    )}
                >
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-orange-100 rounded-xl">
                            <TrendingDown className="h-6 w-6 text-orange-600" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-gray-900">{lowCount}</p>
                            <p className="text-sm text-gray-500">Düşük Bakiye</p>
                        </div>
                    </div>
                    <div className="mt-3 flex items-center text-sm text-orange-600">
                        <Clock className="h-4 w-4 mr-1" />
                        Yakında bitecek
                    </div>
                </div>

                <div
                    onClick={() => setStatusFilter("all")}
                    className={cn(
                        "bg-white rounded-xl p-5 shadow-sm border cursor-pointer transition-all hover:shadow-md",
                        statusFilter === "all" ? "border-blue-500 ring-2 ring-blue-200" : "border-gray-200"
                    )}
                >
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-blue-100 rounded-xl">
                            <Coins className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-gray-900">{totalRemainingCredits.toLocaleString('tr-TR')}</p>
                            <p className="text-sm text-gray-500">Toplam Kalan</p>
                        </div>
                    </div>
                    <div className="mt-3 flex items-center text-sm text-blue-600">
                        <TrendingUp className="h-4 w-4 mr-1" />
                        Tüm müşteriler
                    </div>
                </div>

                <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-green-100 rounded-xl">
                            <RefreshCw className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-gray-900">{autoRenewCount}</p>
                            <p className="text-sm text-gray-500">Oto. Yenileme</p>
                        </div>
                    </div>
                    <div className="mt-3 flex items-center text-sm text-green-600">
                        <CheckCircle2 className="h-4 w-4 mr-1" />
                        %{Math.round((autoRenewCount / totalCustomers) * 100)} aktif
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="İsim, şirket veya e-posta ara..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="flex items-center gap-3">
                        <select
                            value={packageFilter}
                            onChange={(e) => setPackageFilter(e.target.value as PackageType)}
                            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="all">Tüm Paketler</option>
                            <option value="Starter">Starter</option>
                            <option value="Business">Business</option>
                            <option value="Enterprise">Enterprise</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Credits Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Müşteri</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Paket</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kontör Durumu</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kalan / Toplam</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tahmini Süre</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Son Kullanım</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">İşlemler</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredCredits.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                                        <Coins className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                                        <p>Gösterilecek müşteri bulunamadı.</p>
                                    </td>
                                </tr>
                            ) : (
                                filteredCredits.map((customer) => {
                                    const status = getCreditStatus(customer.remainingCredits, customer.totalCredits);
                                    const percentage = (customer.remainingCredits / customer.totalCredits) * 100;

                                    return (
                                        <tr key={customer.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 h-10 w-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
                                                        {customer.name.charAt(0)}
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium text-gray-900">{customer.name}</div>
                                                        <div className="text-sm text-gray-500 flex items-center gap-1">
                                                            <Building2 className="h-3 w-3" />
                                                            {customer.company}
                                                        </div>
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
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex flex-col gap-1">
                                                    <span className={cn(
                                                        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium w-fit",
                                                        statusConfig[status].bgColor,
                                                        statusConfig[status].color
                                                    )}>
                                                        {statusConfig[status].label}
                                                    </span>
                                                    <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                                                        <div
                                                            className={cn("h-full rounded-full transition-all", statusConfig[status].barColor)}
                                                            style={{ width: `${percentage}%` }}
                                                        />
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm">
                                                    <span className={cn("font-bold", statusConfig[status].color)}>
                                                        {customer.remainingCredits.toLocaleString('tr-TR')}
                                                    </span>
                                                    <span className="text-gray-500"> / {customer.totalCredits.toLocaleString('tr-TR')}</span>
                                                </div>
                                                <div className="text-xs text-gray-400">
                                                    Aylık kullanım: ~{customer.monthlyUsage.toLocaleString('tr-TR')}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center gap-1">
                                                    <Calendar className="h-3 w-3 text-gray-400" />
                                                    <span className={cn(
                                                        "text-sm font-medium",
                                                        customer.estimatedDaysLeft <= 7 ? "text-red-600" :
                                                            customer.estimatedDaysLeft <= 30 ? "text-orange-600" : "text-gray-600"
                                                    )}>
                                                        ~{customer.estimatedDaysLeft} gün
                                                    </span>
                                                </div>
                                                {customer.autoRenew && (
                                                    <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs text-green-600 bg-green-50 mt-1">
                                                        <RefreshCw className="h-2.5 w-2.5 mr-0.5" />
                                                        Oto. yenileme
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {customer.lastUsage}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <button
                                                    onClick={() => handleAddCredits(customer)}
                                                    className="inline-flex items-center px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-medium hover:bg-blue-700 transition-colors"
                                                >
                                                    <Plus className="h-3 w-3 mr-1" />
                                                    Kontör Ekle
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add Credits Modal */}
            {isAddCreditsModalOpen && selectedCustomer && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
                    onClick={() => setIsAddCreditsModalOpen(false)}
                >
                    <div
                        className="w-full max-w-md bg-white rounded-xl shadow-xl overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                                    <Plus className="h-5 w-5 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900">Kontör Ekle</h3>
                                    <p className="text-sm text-gray-500">{selectedCustomer.name} - {selectedCustomer.company}</p>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 space-y-4">
                            {/* Current Balance */}
                            <div className="p-4 bg-gray-50 rounded-lg">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-500">Mevcut Bakiye</span>
                                    <span className="text-lg font-bold text-gray-900">
                                        {selectedCustomer.remainingCredits.toLocaleString('tr-TR')} kontör
                                    </span>
                                </div>
                            </div>

                            {/* Credit Packages */}
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">Kontör Paketi Seçin</label>
                                <div className="grid grid-cols-2 gap-3">
                                    {[
                                        { amount: 1000, price: 100 },
                                        { amount: 2500, price: 225 },
                                        { amount: 5000, price: 400 },
                                        { amount: 10000, price: 750 },
                                    ].map((pkg) => (
                                        <button
                                            key={pkg.amount}
                                            className="p-3 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-left"
                                        >
                                            <p className="font-bold text-gray-900">{pkg.amount.toLocaleString('tr-TR')} Kontör</p>
                                            <p className="text-sm text-gray-500">₺{pkg.price}</p>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Custom Amount */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Veya Özel Miktar</label>
                                <input
                                    type="number"
                                    placeholder="Kontör miktarı girin..."
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>

                        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex gap-3">
                            <button
                                onClick={() => {
                                    alert(`${selectedCustomer.name} hesabına kontör eklendi! (Demo)`);
                                    setIsAddCreditsModalOpen(false);
                                }}
                                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                            >
                                Kontör Ekle
                            </button>
                            <button
                                onClick={() => setIsAddCreditsModalOpen(false)}
                                className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                            >
                                İptal
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </PageContainer>
    );
}
