"use client";

import { useState } from "react";
import { PageContainer } from "@/components/layout/PageContainer";
import { PageHeader } from "@/components/layout/PageHeader";
import {
    CreditCard,
    DollarSign,
    TrendingUp,
    TrendingDown,
    Calendar,
    Search,
    Filter,
    Download,
    Eye,
    CheckCircle,
    Clock,
    XCircle,
    RefreshCw,
    ArrowUpRight,
    ArrowDownRight,
    Building2,
    User,
    Receipt,
    Ban,
    MoreVertical,
    ChevronLeft,
    ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";

// Ödeme türleri
type PaymentStatus = "completed" | "pending" | "failed" | "refunded";
type PaymentMethod = "credit_card" | "bank_transfer" | "iyzico" | "paytr";
type SubscriptionType = "monthly" | "yearly" | "trial";

interface Payment {
    id: string;
    customerName: string;
    customerEmail: string;
    companyName: string;
    amount: number;
    status: PaymentStatus;
    method: PaymentMethod;
    subscriptionType: SubscriptionType;
    packageName: string;
    date: string;
    invoiceNo: string;
}

// Mock ödeme verileri
const paymentsData: Payment[] = [
    {
        id: "PAY-001",
        customerName: "Mehmet Yılmaz",
        customerEmail: "mehmet@digitalsolutions.com",
        companyName: "Digital Solutions Ltd.",
        amount: 2499,
        status: "completed",
        method: "credit_card",
        subscriptionType: "yearly",
        packageName: "Pro Paket",
        date: "2024-12-16 14:30",
        invoiceNo: "INV-2024-001245"
    },
    {
        id: "PAY-002",
        customerName: "Ayşe Demir",
        customerEmail: "ayse@techcorp.com",
        companyName: "Tech Corp A.Ş.",
        amount: 499,
        status: "completed",
        method: "iyzico",
        subscriptionType: "monthly",
        packageName: "Starter Paket",
        date: "2024-12-16 13:15",
        invoiceNo: "INV-2024-001244"
    },
    {
        id: "PAY-003",
        customerName: "Ali Kara",
        customerEmail: "ali@ecommerce.com",
        companyName: "E-Commerce Pro",
        amount: 4999,
        status: "pending",
        method: "bank_transfer",
        subscriptionType: "yearly",
        packageName: "Enterprise Paket",
        date: "2024-12-16 11:45",
        invoiceNo: "INV-2024-001243"
    },
    {
        id: "PAY-004",
        customerName: "Zeynep Arslan",
        customerEmail: "zeynep@muhasebe.com",
        companyName: "Muhasebe Merkezi",
        amount: 799,
        status: "failed",
        method: "credit_card",
        subscriptionType: "monthly",
        packageName: "Pro Paket",
        date: "2024-12-16 10:20",
        invoiceNo: "INV-2024-001242"
    },
    {
        id: "PAY-005",
        customerName: "Can Özkan",
        customerEmail: "can@fintech.com",
        companyName: "Fintech Partners",
        amount: 2499,
        status: "refunded",
        method: "paytr",
        subscriptionType: "yearly",
        packageName: "Pro Paket",
        date: "2024-12-15 16:00",
        invoiceNo: "INV-2024-001241"
    },
    {
        id: "PAY-006",
        customerName: "Fatma Şahin",
        customerEmail: "fatma@retail.com",
        companyName: "Retail Solutions",
        amount: 499,
        status: "completed",
        method: "credit_card",
        subscriptionType: "monthly",
        packageName: "Starter Paket",
        date: "2024-12-15 14:30",
        invoiceNo: "INV-2024-001240"
    },
    {
        id: "PAY-007",
        customerName: "Burak Yıldız",
        customerEmail: "burak@logistics.com",
        companyName: "Logistics Pro",
        amount: 4999,
        status: "completed",
        method: "bank_transfer",
        subscriptionType: "yearly",
        packageName: "Enterprise Paket",
        date: "2024-12-15 11:00",
        invoiceNo: "INV-2024-001239"
    },
    {
        id: "PAY-008",
        customerName: "Selin Acar",
        customerEmail: "selin@startup.com",
        companyName: "Tech Startup",
        amount: 0,
        status: "completed",
        method: "credit_card",
        subscriptionType: "trial",
        packageName: "Deneme - 14 Gün",
        date: "2024-12-15 09:30",
        invoiceNo: "-"
    },
    {
        id: "PAY-009",
        customerName: "Okan Eren",
        customerEmail: "okan@wholesale.com",
        companyName: "Wholesale Trade",
        amount: 799,
        status: "completed",
        method: "iyzico",
        subscriptionType: "monthly",
        packageName: "Pro Paket",
        date: "2024-12-14 17:45",
        invoiceNo: "INV-2024-001238"
    },
    {
        id: "PAY-010",
        customerName: "Deniz Kaya",
        customerEmail: "deniz@agency.com",
        companyName: "Digital Agency",
        amount: 2499,
        status: "pending",
        method: "bank_transfer",
        subscriptionType: "yearly",
        packageName: "Pro Paket",
        date: "2024-12-14 15:20",
        invoiceNo: "INV-2024-001237"
    }
];

export default function FinancePage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [filterStatus, setFilterStatus] = useState<PaymentStatus | "all">("all");
    const [filterMethod, setFilterMethod] = useState<PaymentMethod | "all">("all");
    const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
    const [dateRange, setDateRange] = useState("this_month");

    const filteredPayments = paymentsData.filter(payment => {
        const matchesSearch = payment.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            payment.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            payment.invoiceNo.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = filterStatus === "all" || payment.status === filterStatus;
        const matchesMethod = filterMethod === "all" || payment.method === filterMethod;
        return matchesSearch && matchesStatus && matchesMethod;
    });

    // İstatistikler
    const totalRevenue = paymentsData.filter(p => p.status === "completed").reduce((sum, p) => sum + p.amount, 0);
    const pendingAmount = paymentsData.filter(p => p.status === "pending").reduce((sum, p) => sum + p.amount, 0);
    const refundedAmount = paymentsData.filter(p => p.status === "refunded").reduce((sum, p) => sum + p.amount, 0);
    const failedCount = paymentsData.filter(p => p.status === "failed").length;
    const successRate = Math.round((paymentsData.filter(p => p.status === "completed").length / paymentsData.filter(p => p.status !== "pending").length) * 100);

    const statusConfig = {
        completed: { label: "Tamamlandı", color: "bg-green-100 text-green-700", icon: CheckCircle },
        pending: { label: "Beklemede", color: "bg-yellow-100 text-yellow-700", icon: Clock },
        failed: { label: "Başarısız", color: "bg-red-100 text-red-700", icon: XCircle },
        refunded: { label: "İade Edildi", color: "bg-gray-100 text-gray-700", icon: RefreshCw }
    };

    const methodConfig = {
        credit_card: { label: "Kredi Kartı", icon: CreditCard },
        bank_transfer: { label: "Havale/EFT", icon: Building2 },
        iyzico: { label: "iyzico", icon: CreditCard },
        paytr: { label: "PayTR", icon: CreditCard }
    };

    const subscriptionConfig = {
        monthly: { label: "Aylık", color: "bg-blue-100 text-blue-700" },
        yearly: { label: "Yıllık", color: "bg-purple-100 text-purple-700" },
        trial: { label: "Deneme", color: "bg-orange-100 text-orange-700" }
    };

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat("tr-TR", {
            style: "currency",
            currency: "TRY",
            minimumFractionDigits: 0
        }).format(value);
    };

    return (
        <PageContainer>
            <PageHeader title="Finans - Wegs Ödemeleri">
                <button className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                    <Download className="h-4 w-4" />
                    Rapor İndir
                </button>
            </PageHeader>

            {/* İstatistik Kartları */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5 mb-6">
                <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-6 text-white">
                    <div className="flex items-center justify-between mb-3">
                        <DollarSign className="h-8 w-8 opacity-80" />
                        <span className="inline-flex items-center text-sm font-medium bg-white/20 px-2 py-1 rounded">
                            <ArrowUpRight className="h-3 w-3 mr-1" />
                            +18%
                        </span>
                    </div>
                    <p className="text-sm text-green-100">Toplam Gelir</p>
                    <p className="text-2xl font-bold">{formatCurrency(totalRevenue)}</p>
                </div>

                <div className="bg-gradient-to-br from-yellow-500 to-amber-600 rounded-xl p-6 text-white">
                    <div className="flex items-center justify-between mb-3">
                        <Clock className="h-8 w-8 opacity-80" />
                    </div>
                    <p className="text-sm text-yellow-100">Bekleyen Ödemeler</p>
                    <p className="text-2xl font-bold">{formatCurrency(pendingAmount)}</p>
                </div>

                <div className="bg-gradient-to-br from-gray-500 to-slate-600 rounded-xl p-6 text-white">
                    <div className="flex items-center justify-between mb-3">
                        <RefreshCw className="h-8 w-8 opacity-80" />
                    </div>
                    <p className="text-sm text-gray-200">İadeler</p>
                    <p className="text-2xl font-bold">{formatCurrency(refundedAmount)}</p>
                </div>

                <div className="bg-gradient-to-br from-red-500 to-rose-600 rounded-xl p-6 text-white">
                    <div className="flex items-center justify-between mb-3">
                        <XCircle className="h-8 w-8 opacity-80" />
                    </div>
                    <p className="text-sm text-red-100">Başarısız İşlem</p>
                    <p className="text-2xl font-bold">{failedCount}</p>
                </div>

                <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl p-6 text-white">
                    <div className="flex items-center justify-between mb-3">
                        <TrendingUp className="h-8 w-8 opacity-80" />
                    </div>
                    <p className="text-sm text-blue-100">Başarı Oranı</p>
                    <p className="text-2xl font-bold">%{successRate}</p>
                </div>
            </div>

            {/* Filtreler */}
            <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 p-4 mb-6">
                <div className="flex flex-wrap gap-4">
                    <div className="flex-1 min-w-[250px]">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Müşteri, şirket veya fatura no ara..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value as PaymentStatus | "all")}
                        className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="all">Tüm Durumlar</option>
                        <option value="completed">Tamamlandı</option>
                        <option value="pending">Beklemede</option>
                        <option value="failed">Başarısız</option>
                        <option value="refunded">İade Edildi</option>
                    </select>
                    <select
                        value={filterMethod}
                        onChange={(e) => setFilterMethod(e.target.value as PaymentMethod | "all")}
                        className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="all">Tüm Yöntemler</option>
                        <option value="credit_card">Kredi Kartı</option>
                        <option value="bank_transfer">Havale/EFT</option>
                        <option value="iyzico">iyzico</option>
                        <option value="paytr">PayTR</option>
                    </select>
                    <select
                        value={dateRange}
                        onChange={(e) => setDateRange(e.target.value)}
                        className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="today">Bugün</option>
                        <option value="this_week">Bu Hafta</option>
                        <option value="this_month">Bu Ay</option>
                        <option value="last_month">Geçen Ay</option>
                        <option value="this_year">Bu Yıl</option>
                    </select>
                </div>
            </div>

            {/* Ödeme Tablosu */}
            <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">Ödeme İşlemleri</h3>
                    <span className="text-sm text-gray-500">{filteredPayments.length} işlem</span>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Müşteri</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Paket</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tutar</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Yöntem</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Durum</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tarih</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fatura No</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">İşlem</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredPayments.map((payment) => {
                                const StatusIcon = statusConfig[payment.status].icon;
                                const MethodIcon = methodConfig[payment.method].icon;
                                return (
                                    <tr key={payment.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 h-10 w-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">
                                                    {payment.companyName.charAt(0)}
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900">{payment.companyName}</div>
                                                    <div className="text-sm text-gray-500">{payment.customerName}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div>
                                                <div className="text-sm font-medium text-gray-900">{payment.packageName}</div>
                                                <span className={cn(
                                                    "inline-flex px-2 py-0.5 rounded text-xs font-medium",
                                                    subscriptionConfig[payment.subscriptionType].color
                                                )}>
                                                    {subscriptionConfig[payment.subscriptionType].label}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="text-sm font-bold text-gray-900">
                                                {payment.amount > 0 ? formatCurrency(payment.amount) : "Ücretsiz"}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <MethodIcon className="h-4 w-4" />
                                                {methodConfig[payment.method].label}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={cn(
                                                "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium",
                                                statusConfig[payment.status].color
                                            )}>
                                                <StatusIcon className="h-3 w-3" />
                                                {statusConfig[payment.status].label}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {payment.date}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {payment.invoiceNo}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => setSelectedPayment(payment)}
                                                    className="p-1.5 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                                                    title="Detay"
                                                >
                                                    <Eye className="h-4 w-4" />
                                                </button>
                                                {payment.status === "completed" && (
                                                    <button
                                                        className="p-1.5 rounded-lg text-gray-400 hover:text-orange-600 hover:bg-orange-50 transition-colors"
                                                        title="İade Et"
                                                    >
                                                        <RefreshCw className="h-4 w-4" />
                                                    </button>
                                                )}
                                                {payment.status === "pending" && (
                                                    <button
                                                        className="p-1.5 rounded-lg text-gray-400 hover:text-green-600 hover:bg-green-50 transition-colors"
                                                        title="Onayla"
                                                    >
                                                        <CheckCircle className="h-4 w-4" />
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
                    <p className="text-sm text-gray-500">
                        Toplam <span className="font-medium">{filteredPayments.length}</span> işlem gösteriliyor
                    </p>
                    <div className="flex items-center gap-2">
                        <button className="p-2 rounded-lg border border-gray-300 text-gray-500 hover:bg-gray-50 disabled:opacity-50">
                            <ChevronLeft className="h-4 w-4" />
                        </button>
                        <span className="px-3 py-1 rounded-lg bg-blue-600 text-white text-sm font-medium">1</span>
                        <button className="px-3 py-1 rounded-lg text-gray-600 hover:bg-gray-100 text-sm">2</button>
                        <button className="px-3 py-1 rounded-lg text-gray-600 hover:bg-gray-100 text-sm">3</button>
                        <button className="p-2 rounded-lg border border-gray-300 text-gray-500 hover:bg-gray-50">
                            <ChevronRight className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Ödeme Detay Modalı */}
            {selectedPayment && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
                    onClick={() => setSelectedPayment(null)}
                >
                    <div
                        className="w-full max-w-lg bg-white rounded-xl shadow-xl overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50 flex items-center justify-between">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">Ödeme Detayı</h3>
                                <p className="text-sm text-gray-500">{selectedPayment.id}</p>
                            </div>
                            <button
                                onClick={() => setSelectedPayment(null)}
                                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                            >
                                <XCircle className="h-5 w-5 text-gray-400" />
                            </button>
                        </div>
                        <div className="p-6 space-y-4">
                            {/* Müşteri Bilgisi */}
                            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                                    {selectedPayment.companyName.charAt(0)}
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900">{selectedPayment.companyName}</p>
                                    <p className="text-sm text-gray-500">{selectedPayment.customerName} • {selectedPayment.customerEmail}</p>
                                </div>
                            </div>

                            {/* Ödeme Detayları */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 bg-gray-50 rounded-lg">
                                    <p className="text-sm text-gray-500 mb-1">Tutar</p>
                                    <p className="text-xl font-bold text-gray-900">
                                        {selectedPayment.amount > 0 ? formatCurrency(selectedPayment.amount) : "Ücretsiz"}
                                    </p>
                                </div>
                                <div className="p-4 bg-gray-50 rounded-lg">
                                    <p className="text-sm text-gray-500 mb-1">Durum</p>
                                    <span className={cn(
                                        "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-sm font-medium",
                                        statusConfig[selectedPayment.status].color
                                    )}>
                                        {statusConfig[selectedPayment.status].label}
                                    </span>
                                </div>
                                <div className="p-4 bg-gray-50 rounded-lg">
                                    <p className="text-sm text-gray-500 mb-1">Paket</p>
                                    <p className="font-medium text-gray-900">{selectedPayment.packageName}</p>
                                </div>
                                <div className="p-4 bg-gray-50 rounded-lg">
                                    <p className="text-sm text-gray-500 mb-1">Ödeme Yöntemi</p>
                                    <p className="font-medium text-gray-900">{methodConfig[selectedPayment.method].label}</p>
                                </div>
                                <div className="p-4 bg-gray-50 rounded-lg">
                                    <p className="text-sm text-gray-500 mb-1">Tarih</p>
                                    <p className="font-medium text-gray-900">{selectedPayment.date}</p>
                                </div>
                                <div className="p-4 bg-gray-50 rounded-lg">
                                    <p className="text-sm text-gray-500 mb-1">Fatura No</p>
                                    <p className="font-medium text-gray-900">{selectedPayment.invoiceNo}</p>
                                </div>
                            </div>
                        </div>
                        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex gap-3">
                            {selectedPayment.status === "completed" && (
                                <button className="flex-1 px-4 py-2 bg-orange-600 text-white rounded-lg font-medium hover:bg-orange-700 transition-colors">
                                    İade Et
                                </button>
                            )}
                            {selectedPayment.status === "pending" && (
                                <button className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors">
                                    Onayla
                                </button>
                            )}
                            <button
                                onClick={() => setSelectedPayment(null)}
                                className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
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
