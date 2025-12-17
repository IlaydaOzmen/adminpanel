"use client";

import { useState } from "react";
import { PageContainer } from "@/components/layout/PageContainer";
import { PageHeader } from "@/components/layout/PageHeader";
import Link from "next/link";
import {
    FileText,
    Search,
    Building2,
    CheckCircle2,
    XCircle,
    Clock,
    AlertTriangle,
    Download,
    RefreshCw,
    ArrowLeft,
    Filter,
    Calendar,
    TrendingUp
} from "lucide-react";
import { cn } from "@/lib/utils";

type EInvoiceStatus = "active" | "pending" | "inactive" | "all";
type PackageType = "Starter" | "Business" | "Enterprise" | "all";

interface EInvoiceTaxpayer {
    id: string;
    name: string;
    company: string;
    taxNumber: string;
    email: string;
    package: "Starter" | "Business" | "Enterprise";
    einvoiceStatus: "active" | "pending" | "inactive";
    activationDate?: string;
    lastInvoice?: string;
    monthlyInvoices: number;
    invoiceType: "einvoice" | "earchive" | "both";
    integrator: string;
}

const mockTaxpayers: EInvoiceTaxpayer[] = [
    {
        id: "1",
        name: "Ahmet Yılmaz",
        company: "TechSoft A.Ş.",
        taxNumber: "1234567890",
        email: "ahmet@techsoft.com",
        package: "Enterprise",
        einvoiceStatus: "active",
        activationDate: "2024-01-15",
        lastInvoice: "2024-12-15",
        monthlyInvoices: 450,
        invoiceType: "both",
        integrator: "GIB Portal"
    },
    {
        id: "2",
        name: "Ayşe Demir",
        company: "Demir Ticaret",
        taxNumber: "0987654321",
        email: "ayse@demirticaret.com",
        package: "Business",
        einvoiceStatus: "active",
        activationDate: "2024-02-20",
        lastInvoice: "2024-12-14",
        monthlyInvoices: 120,
        invoiceType: "einvoice",
        integrator: "Foriba"
    },
    {
        id: "3",
        name: "Mehmet Kaya",
        company: "Kaya Lojistik",
        taxNumber: "1122334455",
        email: "mehmet@kayalojistik.com",
        package: "Enterprise",
        einvoiceStatus: "pending",
        monthlyInvoices: 0,
        invoiceType: "both",
        integrator: "Uyumsoft"
    },
    {
        id: "4",
        name: "Zeynep Çelik",
        company: "Çelik Mobilya",
        taxNumber: "5544332211",
        email: "zeynep@celikmobilya.com",
        package: "Starter",
        einvoiceStatus: "inactive",
        monthlyInvoices: 0,
        invoiceType: "earchive",
        integrator: "-"
    },
    {
        id: "5",
        name: "Ali Vural",
        company: "Vural İnşaat",
        taxNumber: "6677889900",
        email: "ali@vuralinşaat.com",
        package: "Business",
        einvoiceStatus: "active",
        activationDate: "2024-03-10",
        lastInvoice: "2024-12-15",
        monthlyInvoices: 85,
        invoiceType: "einvoice",
        integrator: "GIB Portal"
    },
    {
        id: "6",
        name: "Fatma Şahin",
        company: "Şahin Market",
        taxNumber: "1357924680",
        email: "fatma@sahinmarket.com",
        package: "Starter",
        einvoiceStatus: "pending",
        monthlyInvoices: 0,
        invoiceType: "earchive",
        integrator: "QNB e-Fatura"
    },
    {
        id: "7",
        name: "Can Öztürk",
        company: "Öztürk Tekstil",
        taxNumber: "2468013579",
        email: "can@ozturktekstil.com",
        package: "Enterprise",
        einvoiceStatus: "active",
        activationDate: "2024-01-05",
        lastInvoice: "2024-12-15",
        monthlyInvoices: 780,
        invoiceType: "both",
        integrator: "Foriba"
    },
    {
        id: "8",
        name: "Deniz Arslan",
        company: "Arslan Gıda",
        taxNumber: "9876543210",
        email: "deniz@arslangida.com",
        package: "Business",
        einvoiceStatus: "active",
        activationDate: "2024-04-01",
        lastInvoice: "2024-12-13",
        monthlyInvoices: 156,
        invoiceType: "einvoice",
        integrator: "Uyumsoft"
    },
];

const statusConfig = {
    active: { label: "Aktif", color: "text-green-700", bgColor: "bg-green-100", icon: CheckCircle2 },
    pending: { label: "Beklemede", color: "text-yellow-700", bgColor: "bg-yellow-100", icon: Clock },
    inactive: { label: "Pasif", color: "text-gray-700", bgColor: "bg-gray-100", icon: XCircle },
    all: { label: "Tümü", color: "text-gray-700", bgColor: "bg-gray-100", icon: FileText },
};

export default function EInvoiceTaxpayersPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState<EInvoiceStatus>("all");
    const [packageFilter, setPackageFilter] = useState<PackageType>("all");

    const filteredTaxpayers = mockTaxpayers.filter((taxpayer) => {
        const matchesSearch =
            taxpayer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            taxpayer.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
            taxpayer.taxNumber.includes(searchTerm) ||
            taxpayer.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === "all" || taxpayer.einvoiceStatus === statusFilter;
        const matchesPackage = packageFilter === "all" || taxpayer.package === packageFilter;
        return matchesSearch && matchesStatus && matchesPackage;
    });

    // Statistics
    const totalTaxpayers = mockTaxpayers.length;
    const activeCount = mockTaxpayers.filter(t => t.einvoiceStatus === "active").length;
    const pendingCount = mockTaxpayers.filter(t => t.einvoiceStatus === "pending").length;
    const totalMonthlyInvoices = mockTaxpayers.reduce((sum, t) => sum + t.monthlyInvoices, 0);

    return (
        <PageContainer>
            <PageHeader title="E-Fatura Mükellefleri" description="Tüm e-fatura ve e-arşiv mükelleflerini görüntüleyin.">
                <div className="flex gap-2">
                    <Link
                        href="/einvoice/performance"
                        className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                    >
                        <TrendingUp className="h-4 w-4 mr-2" />
                        İşlem Performansı
                    </Link>
                    <Link
                        href="/customers"
                        className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Müşteriler
                    </Link>
                    <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
                        <Download className="h-4 w-4 mr-2" />
                        Dışa Aktar
                    </button>
                </div>
            </PageHeader>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div
                    onClick={() => setStatusFilter("active")}
                    className={cn(
                        "bg-white rounded-xl p-5 shadow-sm border cursor-pointer transition-all hover:shadow-md",
                        statusFilter === "active" ? "border-green-500 ring-2 ring-green-200" : "border-gray-200"
                    )}
                >
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-green-100 rounded-xl">
                            <CheckCircle2 className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-gray-900">{activeCount}</p>
                            <p className="text-sm text-gray-500">Aktif Mükellef</p>
                        </div>
                    </div>
                </div>

                <div
                    onClick={() => setStatusFilter("pending")}
                    className={cn(
                        "bg-white rounded-xl p-5 shadow-sm border cursor-pointer transition-all hover:shadow-md",
                        statusFilter === "pending" ? "border-yellow-500 ring-2 ring-yellow-200" : "border-gray-200"
                    )}
                >
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-yellow-100 rounded-xl">
                            <Clock className="h-6 w-6 text-yellow-600" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-gray-900">{pendingCount}</p>
                            <p className="text-sm text-gray-500">Aktivasyon Bekliyor</p>
                        </div>
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
                            <FileText className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-gray-900">{totalTaxpayers}</p>
                            <p className="text-sm text-gray-500">Toplam Mükellef</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-purple-100 rounded-xl">
                            <TrendingUp className="h-6 w-6 text-purple-600" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-gray-900">{totalMonthlyInvoices.toLocaleString('tr-TR')}</p>
                            <p className="text-sm text-gray-500">Aylık Fatura</p>
                        </div>
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
                            placeholder="İsim, şirket, VKN veya e-posta ara..."
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

            {/* Taxpayers Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mükellef</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">VKN</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Durum</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fatura Tipi</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Entegratör</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aylık Fatura</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Son Fatura</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredTaxpayers.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                                        <FileText className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                                        <p>Gösterilecek mükellef bulunamadı.</p>
                                    </td>
                                </tr>
                            ) : (
                                filteredTaxpayers.map((taxpayer) => {
                                    const StatusIcon = statusConfig[taxpayer.einvoiceStatus].icon;

                                    return (
                                        <tr key={taxpayer.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 h-10 w-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
                                                        {taxpayer.name.charAt(0)}
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium text-gray-900">{taxpayer.name}</div>
                                                        <div className="text-sm text-gray-500 flex items-center gap-1">
                                                            <Building2 className="h-3 w-3" />
                                                            {taxpayer.company}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="font-mono text-sm text-gray-900">{taxpayer.taxNumber}</span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={cn(
                                                    "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                                                    statusConfig[taxpayer.einvoiceStatus].bgColor,
                                                    statusConfig[taxpayer.einvoiceStatus].color
                                                )}>
                                                    <StatusIcon className="h-3 w-3 mr-1" />
                                                    {statusConfig[taxpayer.einvoiceStatus].label}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={cn(
                                                    "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                                                    taxpayer.invoiceType === "einvoice" && "bg-blue-100 text-blue-700",
                                                    taxpayer.invoiceType === "earchive" && "bg-purple-100 text-purple-700",
                                                    taxpayer.invoiceType === "both" && "bg-indigo-100 text-indigo-700"
                                                )}>
                                                    {taxpayer.invoiceType === "einvoice" && "E-Fatura"}
                                                    {taxpayer.invoiceType === "earchive" && "E-Arşiv"}
                                                    {taxpayer.invoiceType === "both" && "Her İkisi"}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {taxpayer.integrator}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="text-sm font-medium text-gray-900">
                                                    {taxpayer.monthlyInvoices > 0 ? taxpayer.monthlyInvoices.toLocaleString('tr-TR') : "-"}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {taxpayer.lastInvoice || "-"}
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </PageContainer>
    );
}
