"use client";

import { useState } from "react";
import { PageContainer } from "@/components/layout/PageContainer";
import { PageHeader } from "@/components/layout/PageHeader";
import {
    Building2,
    Landmark,
    CreditCard,
    Wallet,
    Building,
    CheckCircle,
    AlertCircle,
    Clock,
    TrendingUp,
    Users,
    Banknote,
    Settings,
    RefreshCw,
    ChevronRight,
    X,
    Activity,
    Shield
} from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis } from "recharts";
import { cn } from "@/lib/utils";

interface BankIntegration {
    id: string;
    name: string;
    shortName: string;
    color: string;
    gradientFrom: string;
    gradientTo: string;
    icon: React.ReactNode;
    status: "active" | "maintenance" | "disabled";
    customerCount: number;
    activeAccounts: number;
    totalAccounts: number;
    dailyTransactions: number;
    lastSync: string;
    apiVersion: string;
    features: string[];
}

const bankIntegrations: BankIntegration[] = [
    {
        id: "garanti",
        name: "Garanti BBVA",
        shortName: "Garanti",
        color: "#00A859",
        gradientFrom: "#00A859",
        gradientTo: "#007A42",
        icon: <Building2 className="w-5 h-5" />,
        status: "active",
        customerCount: 340,
        activeAccounts: 892,
        totalAccounts: 1024,
        dailyTransactions: 2450,
        lastSync: "2 dk önce",
        apiVersion: "v3.2",
        features: ["Hesap Bakiyesi", "Ekstre", "Havale/EFT", "Otomatik Eşleştirme"]
    },
    {
        id: "isbank",
        name: "Türkiye İş Bankası",
        shortName: "İş Bankası",
        color: "#1E3A8A",
        gradientFrom: "#1E3A8A",
        gradientTo: "#1E2D5A",
        icon: <Landmark className="w-5 h-5" />,
        status: "active",
        customerCount: 310,
        activeAccounts: 756,
        totalAccounts: 890,
        dailyTransactions: 1890,
        lastSync: "5 dk önce",
        apiVersion: "v2.8",
        features: ["Hesap Bakiyesi", "Ekstre", "Havale/EFT", "Otomatik Eşleştirme", "Kredi Bilgileri"]
    },
    {
        id: "yapikredi",
        name: "Yapı Kredi",
        shortName: "Yapı Kredi",
        color: "#0066CC",
        gradientFrom: "#0066CC",
        gradientTo: "#004C99",
        icon: <CreditCard className="w-5 h-5" />,
        status: "active",
        customerCount: 250,
        activeAccounts: 534,
        totalAccounts: 620,
        dailyTransactions: 1340,
        lastSync: "3 dk önce",
        apiVersion: "v3.0",
        features: ["Hesap Bakiyesi", "Ekstre", "Havale/EFT"]
    },
    {
        id: "akbank",
        name: "Akbank",
        shortName: "Akbank",
        color: "#E30613",
        gradientFrom: "#E30613",
        gradientTo: "#B30510",
        icon: <Building className="w-5 h-5" />,
        status: "active",
        customerCount: 220,
        activeAccounts: 478,
        totalAccounts: 540,
        dailyTransactions: 1120,
        lastSync: "1 dk önce",
        apiVersion: "v2.5",
        features: ["Hesap Bakiyesi", "Ekstre", "Havale/EFT", "POS Entegrasyonu"]
    },
    {
        id: "qnb",
        name: "QNB Finansbank",
        shortName: "Finansbank",
        color: "#6C1D5F",
        gradientFrom: "#6C1D5F",
        gradientTo: "#4A1441",
        icon: <Wallet className="w-5 h-5" />,
        status: "maintenance",
        customerCount: 180,
        activeAccounts: 312,
        totalAccounts: 380,
        dailyTransactions: 0,
        lastSync: "Bakımda",
        apiVersion: "v2.2",
        features: ["Hesap Bakiyesi", "Ekstre", "Havale/EFT"]
    },
    {
        id: "ziraat",
        name: "Ziraat Bankası",
        shortName: "Ziraat",
        color: "#1ABC9C",
        gradientFrom: "#1ABC9C",
        gradientTo: "#16A085",
        icon: <Landmark className="w-5 h-5" />,
        status: "active",
        customerCount: 95,
        activeAccounts: 234,
        totalAccounts: 280,
        dailyTransactions: 456,
        lastSync: "8 dk önce",
        apiVersion: "v2.0",
        features: ["Hesap Bakiyesi", "Ekstre"]
    },
    {
        id: "denizbank",
        name: "Denizbank",
        shortName: "Denizbank",
        color: "#0072BC",
        gradientFrom: "#0072BC",
        gradientTo: "#005A99",
        icon: <Building2 className="w-5 h-5" />,
        status: "active",
        customerCount: 75,
        activeAccounts: 156,
        totalAccounts: 190,
        dailyTransactions: 320,
        lastSync: "12 dk önce",
        apiVersion: "v1.8",
        features: ["Hesap Bakiyesi", "Ekstre"]
    },
    {
        id: "vakif",
        name: "Vakıfbank",
        shortName: "Vakıfbank",
        color: "#00529B",
        gradientFrom: "#00529B",
        gradientTo: "#003D75",
        icon: <Building className="w-5 h-5" />,
        status: "disabled",
        customerCount: 0,
        activeAccounts: 0,
        totalAccounts: 0,
        dailyTransactions: 0,
        lastSync: "Pasif",
        apiVersion: "-",
        features: []
    }
];

// Chart data for customer distribution
const customerChartData = bankIntegrations
    .filter(b => b.customerCount > 0)
    .map(b => ({
        name: b.shortName,
        value: b.customerCount,
        color: b.color
    }));

// Chart data for accounts
const accountChartData = bankIntegrations
    .filter(b => b.activeAccounts > 0)
    .map(b => ({
        name: b.shortName,
        active: b.activeAccounts,
        total: b.totalAccounts,
        color: b.color
    }));

// Mock Customer Account Data
interface CustomerBankAccount {
    id: string;
    name: string;
    company: string;
    connectedBanks: string[]; // Bank IDs
    totalAccounts: number;
    lastTransaction: string;
    status: "active" | "inactive";
}

const mockCustomerAccounts: CustomerBankAccount[] = [
    {
        id: "1",
        name: "Ahmet Yılmaz",
        company: "TechSoft A.Ş.",
        connectedBanks: ["garanti", "isbank", "akbank"],
        totalAccounts: 5,
        lastTransaction: "2 saat önce",
        status: "active"
    },
    {
        id: "2",
        name: "Ayşe Demir",
        company: "Demir Ticaret",
        connectedBanks: ["ziraat", "denizbank"],
        totalAccounts: 3,
        lastTransaction: "1 gün önce",
        status: "active"
    },
    {
        id: "3",
        name: "Mehmet Kaya",
        company: "Kaya Lojistik",
        connectedBanks: ["garanti", "yapikredi"],
        totalAccounts: 4,
        lastTransaction: "5 saat önce",
        status: "active"
    },
    {
        id: "4",
        name: "Zeynep Çelik",
        company: "Çelik Mobilya",
        connectedBanks: ["qnb", "isbank"],
        totalAccounts: 2,
        lastTransaction: "3 gün önce",
        status: "inactive"
    },
    {
        id: "5",
        name: "Can Öztürk",
        company: "Öztürk Tekstil",
        connectedBanks: ["garanti", "akbank", "yapikredi", "ziraat"],
        totalAccounts: 8,
        lastTransaction: "12 dakika önce",
        status: "active"
    },
    {
        id: "6",
        name: "Fatma Şahin",
        company: "Şahin Market",
        connectedBanks: ["denizbank"],
        totalAccounts: 1,
        lastTransaction: "1 hafta önce",
        status: "active"
    }
];

export default function BankModulePage() {
    const [selectedBank, setSelectedBank] = useState<BankIntegration | null>(null);
    const [activeTab, setActiveTab] = useState<"overview" | "customers" | "accounts">("overview");

    const totalCustomers = bankIntegrations.reduce((sum, b) => sum + b.customerCount, 0);
    const totalActiveAccounts = bankIntegrations.reduce((sum, b) => sum + b.activeAccounts, 0);
    const totalTransactions = bankIntegrations.reduce((sum, b) => sum + b.dailyTransactions, 0);
    const activeBanks = bankIntegrations.filter(b => b.status === "active").length;

    const statusConfig = {
        active: { label: "Aktif", color: "bg-green-100 text-green-700", icon: CheckCircle },
        maintenance: { label: "Bakımda", color: "bg-yellow-100 text-yellow-700", icon: Clock },
        disabled: { label: "Pasif", color: "bg-gray-100 text-gray-500", icon: AlertCircle }
    };

    return (
        <PageContainer>
            <PageHeader title="Banka Modülü" description="Banka entegrasyonları, müşteri ve hesap yönetimi">
                <button className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 rounded-lg text-sm font-medium text-white hover:bg-blue-700">
                    <RefreshCw className="h-4 w-4" />
                    Tümünü Senkronize Et
                </button>
            </PageHeader>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl p-5 text-white">
                    <div className="flex items-center gap-3 mb-2">
                        <Landmark className="h-6 w-6 text-blue-200" />
                        <span className="text-sm text-blue-100">Aktif Entegrasyon</span>
                    </div>
                    <p className="text-3xl font-bold">{activeBanks}</p>
                    <p className="text-xs text-blue-200 mt-1">{bankIntegrations.length} banka tanımlı</p>
                </div>

                <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-5 text-white">
                    <div className="flex items-center gap-3 mb-2">
                        <Users className="h-6 w-6 text-green-200" />
                        <span className="text-sm text-green-100">Toplam Müşteri</span>
                    </div>
                    <p className="text-3xl font-bold">{totalCustomers.toLocaleString('tr-TR')}</p>
                    <p className="text-xs text-green-200 mt-1">Banka entegrasyonlu</p>
                </div>

                <div className="bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl p-5 text-white">
                    <div className="flex items-center gap-3 mb-2">
                        <Banknote className="h-6 w-6 text-purple-200" />
                        <span className="text-sm text-purple-100">Aktif Hesap</span>
                    </div>
                    <p className="text-3xl font-bold">{totalActiveAccounts.toLocaleString('tr-TR')}</p>
                    <p className="text-xs text-purple-200 mt-1">Toplam banka hesabı</p>
                </div>

                <div className="bg-gradient-to-br from-orange-500 to-amber-600 rounded-xl p-5 text-white">
                    <div className="flex items-center gap-3 mb-2">
                        <Activity className="h-6 w-6 text-orange-200" />
                        <span className="text-sm text-orange-100">Günlük İşlem</span>
                    </div>
                    <p className="text-3xl font-bold">{totalTransactions.toLocaleString('tr-TR')}</p>
                    <p className="text-xs text-orange-200 mt-1">Bugün</p>
                </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 p-1 mb-6">
                <nav className="flex space-x-1">
                    {[
                        { id: "overview" as const, label: "Entegrasyonlar" },
                        { id: "customers" as const, label: "Müşteri Dağılımı" },
                        { id: "accounts" as const, label: "Hesap Sayıları" }
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={cn(
                                "flex-1 px-4 py-3 rounded-lg text-sm font-medium transition-all",
                                activeTab === tab.id
                                    ? "bg-blue-600 text-white shadow-sm"
                                    : "text-gray-600 hover:bg-gray-100"
                            )}
                        >
                            {tab.label}
                        </button>
                    ))}
                </nav>
            </div>

            {/* Overview Tab - Bank Integrations */}
            {activeTab === "overview" && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {bankIntegrations.map((bank) => {
                        const StatusIcon = statusConfig[bank.status].icon;
                        return (
                            <div
                                key={bank.id}
                                onClick={() => setSelectedBank(bank)}
                                className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 p-5 hover:shadow-md transition-all cursor-pointer group"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div
                                            className="p-3 rounded-xl text-white"
                                            style={{ background: `linear-gradient(135deg, ${bank.gradientFrom}, ${bank.gradientTo})` }}
                                        >
                                            {bank.icon}
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900">{bank.shortName}</h3>
                                            <span className={cn(
                                                "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium",
                                                statusConfig[bank.status].color
                                            )}>
                                                <StatusIcon className="w-3 h-3" />
                                                {statusConfig[bank.status].label}
                                            </span>
                                        </div>
                                    </div>
                                    <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-gray-500 transition-colors" />
                                </div>

                                <div className="grid grid-cols-3 gap-2 text-center">
                                    <div className="p-2 bg-gray-50 rounded-lg">
                                        <p className="text-lg font-bold text-gray-900">{bank.customerCount}</p>
                                        <p className="text-xs text-gray-500">Müşteri</p>
                                    </div>
                                    <div className="p-2 bg-gray-50 rounded-lg">
                                        <p className="text-lg font-bold text-gray-900">{bank.activeAccounts}</p>
                                        <p className="text-xs text-gray-500">Hesap</p>
                                    </div>
                                    <div className="p-2 bg-gray-50 rounded-lg">
                                        <p className="text-lg font-bold text-gray-900">{bank.dailyTransactions}</p>
                                        <p className="text-xs text-gray-500">İşlem</p>
                                    </div>
                                </div>

                                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                                    <span>Son Senkron: {bank.lastSync}</span>
                                    <span>API {bank.apiVersion}</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}



            {/* Customers Tab - Customer Distribution */}
            {activeTab === "customers" && (
                <div className="space-y-6">
                    {/* Top Row: Charts */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Pie Chart */}
                        <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Banka Bazlı Müşteri Dağılımı</h3>
                            <div className="h-72">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={customerChartData}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={60}
                                            outerRadius={100}
                                            paddingAngle={2}
                                            dataKey="value"
                                        >
                                            {customerChartData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <Tooltip formatter={(value: number) => [`${value} müşteri`, '']} />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Customer Ranking (Restored) */}
                        <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Müşteri Sıralaması</h3>
                            <div className="space-y-3">
                                {bankIntegrations
                                    .filter(b => b.customerCount > 0)
                                    .sort((a, b) => b.customerCount - a.customerCount)
                                    .map((bank, idx) => {
                                        const percentage = (bank.customerCount / totalCustomers) * 100;
                                        return (
                                            <div key={bank.id} className="space-y-2">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-3">
                                                        <div
                                                            className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold"
                                                            style={{ background: bank.color }}
                                                        >
                                                            {idx + 1}
                                                        </div>
                                                        <span className="font-medium text-gray-900">{bank.shortName}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-sm text-gray-500">{percentage.toFixed(1)}%</span>
                                                        <span className="font-bold text-gray-900">{bank.customerCount}</span>
                                                    </div>
                                                </div>
                                                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                                                    <div
                                                        className="h-full rounded-full"
                                                        style={{ width: `${percentage}%`, backgroundColor: bank.color }}
                                                    />
                                                </div>
                                            </div>
                                        );
                                    })}
                            </div>
                        </div>
                    </div>

                    {/* Customer Bank List - Full Width */}
                    <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-gray-900">Müşteri Hesap Listesi</h3>
                            <span className="text-sm text-gray-500">{mockCustomerAccounts.length} müşteri gösteriliyor</span>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Müşteri</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Entegre Bankalar</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Hesap</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Son İşlem</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Durum</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {mockCustomerAccounts.map((customer) => (
                                        <tr key={customer.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs">
                                                        {customer.name.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-medium text-gray-900">{customer.name}</p>
                                                        <p className="text-xs text-gray-500">{customer.company}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center -space-x-2">
                                                    {customer.connectedBanks.map((bankId, idx) => {
                                                        const bank = bankIntegrations.find(b => b.id === bankId);
                                                        if (!bank) return null;
                                                        return (
                                                            <div
                                                                key={idx}
                                                                className="relative z-10 w-8 h-8 rounded-lg border-2 border-white flex items-center justify-center text-white text-[10px]"
                                                                style={{ background: bank.color }}
                                                                title={bank.name}
                                                            >
                                                                {bank.shortName.substring(0, 2)}
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                                    {customer.totalAccounts} Hesap
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-500">
                                                {customer.lastTransaction}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={cn(
                                                    "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium",
                                                    customer.status === "active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"
                                                )}>
                                                    {customer.status === "active" ? "Aktif" : "Pasif"}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            {/* Accounts Tab - Account Distribution */}
            {activeTab === "accounts" && (
                <div className="space-y-6">
                    {/* Bar Chart */}
                    <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Banka Bazlı Aktif Hesap Sayıları</h3>
                        <div className="h-72">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={accountChartData} margin={{ top: 10, right: 10, left: -10, bottom: 5 }}>
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} fontSize={12} />
                                    <YAxis axisLine={false} tickLine={false} fontSize={12} />
                                    <Tooltip />
                                    <Bar dataKey="active" name="Aktif Hesap" radius={[4, 4, 0, 0]}>
                                        {accountChartData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Account Details Table */}
                    <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-100">
                            <h3 className="text-lg font-semibold text-gray-900">Hesap Detayları</h3>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Banka</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Durum</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Aktif Hesap</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Toplam Hesap</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Kullanım Oranı</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Günlük İşlem</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {bankIntegrations
                                        .filter(b => b.totalAccounts > 0 || b.status !== "disabled")
                                        .map((bank) => {
                                            const usageRate = bank.totalAccounts > 0 ? (bank.activeAccounts / bank.totalAccounts) * 100 : 0;
                                            const StatusIcon = statusConfig[bank.status].icon;
                                            return (
                                                <tr key={bank.id} className="hover:bg-gray-50">
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-3">
                                                            <div
                                                                className="p-2 rounded-lg text-white"
                                                                style={{ background: bank.color }}
                                                            >
                                                                {bank.icon}
                                                            </div>
                                                            <span className="font-medium text-gray-900">{bank.name}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className={cn(
                                                            "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium",
                                                            statusConfig[bank.status].color
                                                        )}>
                                                            <StatusIcon className="w-3 h-3" />
                                                            {statusConfig[bank.status].label}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 text-sm font-bold text-gray-900">{bank.activeAccounts.toLocaleString('tr-TR')}</td>
                                                    <td className="px-6 py-4 text-sm text-gray-600">{bank.totalAccounts.toLocaleString('tr-TR')}</td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-2">
                                                            <div className="w-16 h-2 bg-gray-100 rounded-full overflow-hidden">
                                                                <div
                                                                    className="h-full rounded-full"
                                                                    style={{ width: `${usageRate}%`, backgroundColor: bank.color }}
                                                                />
                                                            </div>
                                                            <span className="text-xs font-medium text-gray-600">{usageRate.toFixed(0)}%</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-gray-900">{bank.dailyTransactions.toLocaleString('tr-TR')}</td>
                                                </tr>
                                            );
                                        })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            {/* Bank Detail Modal */}
            {selectedBank && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
                        <div
                            className="p-6 text-white"
                            style={{ background: `linear-gradient(135deg, ${selectedBank.gradientFrom}, ${selectedBank.gradientTo})` }}
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-white/20 rounded-xl">
                                        {selectedBank.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold">{selectedBank.name}</h3>
                                        <p className="text-white/80 text-sm">API {selectedBank.apiVersion}</p>
                                    </div>
                                </div>
                                <button onClick={() => setSelectedBank(null)} className="p-2 hover:bg-white/20 rounded-full">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        <div className="p-6">
                            <div className="grid grid-cols-3 gap-4 mb-6">
                                <div className="text-center p-3 bg-gray-50 rounded-xl">
                                    <p className="text-2xl font-bold text-gray-900">{selectedBank.customerCount}</p>
                                    <p className="text-xs text-gray-500">Müşteri</p>
                                </div>
                                <div className="text-center p-3 bg-gray-50 rounded-xl">
                                    <p className="text-2xl font-bold text-gray-900">{selectedBank.activeAccounts}</p>
                                    <p className="text-xs text-gray-500">Aktif Hesap</p>
                                </div>
                                <div className="text-center p-3 bg-gray-50 rounded-xl">
                                    <p className="text-2xl font-bold text-gray-900">{selectedBank.dailyTransactions}</p>
                                    <p className="text-xs text-gray-500">Günlük İşlem</p>
                                </div>
                            </div>

                            <div className="mb-6">
                                <h4 className="text-sm font-medium text-gray-700 mb-3">Desteklenen Özellikler</h4>
                                <div className="flex flex-wrap gap-2">
                                    {selectedBank.features.map((feature, idx) => (
                                        <span key={idx} className="inline-flex items-center gap-1 px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-medium">
                                            <CheckCircle className="w-3 h-3" />
                                            {feature}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                                <div>
                                    <p className="text-xs text-gray-500">Son Senkronizasyon</p>
                                    <p className="font-medium text-gray-900">{selectedBank.lastSync}</p>
                                </div>
                                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
                                    <RefreshCw className="w-4 h-4 inline mr-2" />
                                    Senkronize Et
                                </button>
                            </div>
                        </div>

                        <div className="p-6 bg-gray-50 border-t border-gray-100">
                            <button
                                onClick={() => setSelectedBank(null)}
                                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50"
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
