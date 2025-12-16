"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
    Search,
    Filter,
    Download,
    FileText,
    CheckCircle2,
    XCircle,
    AlertTriangle,
    Building2,
    Mail,
    Phone,
    Calendar,
    ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface EInvoiceCustomer {
    id: string;
    companyName: string;
    vkn: string; // Vergi Kimlik Numarası
    email: string;
    phone: string;
    eInvoiceStatus: "active" | "pending" | "suspended";
    lastInvoiceDate: string;
    totalInvoices: number;
    gibStatus: "connected" | "disconnected" | "pending";
    package: "Starter" | "Business" | "Enterprise";
    registeredDate: string;
}

const eInvoiceCustomers: EInvoiceCustomer[] = [
    {
        id: "1",
        companyName: "Atlas Lojistik A.Ş.",
        vkn: "1234567890",
        email: "efatura@atlaslojistik.com",
        phone: "+90 212 555 0101",
        eInvoiceStatus: "active",
        lastInvoiceDate: "2024-12-14",
        totalInvoices: 1245,
        gibStatus: "connected",
        package: "Enterprise",
        registeredDate: "2023-06-15",
    },
    {
        id: "2",
        companyName: "TechSoft Bilişim Ltd.",
        vkn: "9876543210",
        email: "muhasebe@techsoft.com.tr",
        phone: "+90 216 444 0202",
        eInvoiceStatus: "active",
        lastInvoiceDate: "2024-12-15",
        totalInvoices: 892,
        gibStatus: "connected",
        package: "Business",
        registeredDate: "2023-08-20",
    },
    {
        id: "3",
        companyName: "Mega Market Perakende",
        vkn: "5678901234",
        email: "fatura@megamarket.com",
        phone: "+90 232 333 0303",
        eInvoiceStatus: "pending",
        lastInvoiceDate: "2024-12-10",
        totalInvoices: 2341,
        gibStatus: "pending",
        package: "Enterprise",
        registeredDate: "2023-03-10",
    },
    {
        id: "4",
        companyName: "Birlik Gıda San. Tic.",
        vkn: "3456789012",
        email: "efatura@birlikgida.com",
        phone: "+90 312 222 0404",
        eInvoiceStatus: "suspended",
        lastInvoiceDate: "2024-11-28",
        totalInvoices: 567,
        gibStatus: "disconnected",
        package: "Business",
        registeredDate: "2024-01-05",
    },
    {
        id: "5",
        companyName: "Kaya Holding A.Ş.",
        vkn: "7890123456",
        email: "finance@kayaholding.com",
        phone: "+90 212 666 0505",
        eInvoiceStatus: "active",
        lastInvoiceDate: "2024-12-15",
        totalInvoices: 4523,
        gibStatus: "connected",
        package: "Enterprise",
        registeredDate: "2022-11-20",
    },
    {
        id: "6",
        companyName: "ABC Lojistik Ltd.",
        vkn: "2345678901",
        email: "muhasebe@abclojistik.com",
        phone: "+90 224 111 0606",
        eInvoiceStatus: "active",
        lastInvoiceDate: "2024-12-13",
        totalInvoices: 789,
        gibStatus: "connected",
        package: "Business",
        registeredDate: "2024-02-28",
    },
];

const eInvoiceStatusConfig = {
    active: { label: "Aktif", color: "bg-green-100 text-green-800", icon: CheckCircle2 },
    pending: { label: "Beklemede", color: "bg-yellow-100 text-yellow-800", icon: AlertTriangle },
    suspended: { label: "Askıya Alındı", color: "bg-red-100 text-red-800", icon: XCircle },
};

const gibStatusConfig = {
    connected: { label: "Bağlı", color: "text-green-600" },
    disconnected: { label: "Bağlantı Kesildi", color: "text-red-600" },
    pending: { label: "Bekliyor", color: "text-yellow-600" },
};

export function EInvoiceCustomerTable() {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");

    const filteredCustomers = eInvoiceCustomers.filter((customer) => {
        const matchesSearch =
            customer.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            customer.vkn.includes(searchTerm) ||
            customer.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === "all" || customer.eInvoiceStatus === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const activeCount = eInvoiceCustomers.filter((c) => c.eInvoiceStatus === "active").length;
    const pendingCount = eInvoiceCustomers.filter((c) => c.eInvoiceStatus === "pending").length;
    const suspendedCount = eInvoiceCustomers.filter((c) => c.eInvoiceStatus === "suspended").length;

    const handleExport = () => {
        const headers = ["Şirket Adı", "VKN", "E-posta", "Durum", "Son Fatura", "Toplam Fatura"];
        const rows = filteredCustomers.map((c) => [
            c.companyName,
            c.vkn,
            c.email,
            eInvoiceStatusConfig[c.eInvoiceStatus].label,
            c.lastInvoiceDate,
            String(c.totalInvoices),
        ]);

        const csvContent = [
            headers.join(","),
            ...rows.map((row) => row.map((cell) => `"${cell}"`).join(",")),
        ].join("\n");

        const blob = new Blob(["\uFEFF" + csvContent], { type: "text/csv;charset=utf-8;" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `efatura_musterileri_${new Date().toISOString().split("T")[0]}.csv`;
        link.click();
    };

    return (
        <div className="space-y-4">
            {/* Stats Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg p-4 shadow-sm ring-1 ring-gray-900/5">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-green-100">
                            <CheckCircle2 className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Aktif E-Fatura</p>
                            <p className="text-xl font-bold text-gray-900">{activeCount}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm ring-1 ring-gray-900/5">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-yellow-100">
                            <AlertTriangle className="h-5 w-5 text-yellow-600" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Beklemede</p>
                            <p className="text-xl font-bold text-gray-900">{pendingCount}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm ring-1 ring-gray-900/5">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-red-100">
                            <XCircle className="h-5 w-5 text-red-600" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Askıya Alınan</p>
                            <p className="text-xl font-bold text-gray-900">{suspendedCount}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                <div className="relative max-w-sm w-full">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        placeholder="Şirket adı, VKN veya e-posta ara..."
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="flex items-center gap-2">
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="appearance-none block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                    >
                        <option value="all">Tüm Durumlar</option>
                        <option value="active">Aktif</option>
                        <option value="pending">Beklemede</option>
                        <option value="suspended">Askıya Alındı</option>
                    </select>
                    <button
                        onClick={handleExport}
                        className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
                    >
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
                                Şirket Bilgileri
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                VKN
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                E-Fatura Durumu
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                GİB Entegrasyonu
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Fatura İstatistikleri
                            </th>
                            <th scope="col" className="relative px-6 py-3">
                                <span className="sr-only">İşlemler</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredCustomers.map((customer) => {
                            const StatusIcon = eInvoiceStatusConfig[customer.eInvoiceStatus].icon;
                            return (
                                <tr
                                    key={customer.id}
                                    className="hover:bg-gray-50 transition-colors cursor-pointer"
                                    onClick={() => router.push(`/customers/${customer.id}`)}
                                >
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-10 w-10">
                                                <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
                                                    <Building2 className="h-5 w-5 text-blue-600" />
                                                </div>
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">{customer.companyName}</div>
                                                <div className="text-sm text-gray-500 flex items-center gap-1">
                                                    <Mail className="h-3 w-3" />
                                                    {customer.email}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-mono text-gray-900">{customer.vkn}</div>
                                        <div className="text-xs text-gray-500">{customer.package}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={cn(
                                            "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium",
                                            eInvoiceStatusConfig[customer.eInvoiceStatus].color
                                        )}>
                                            <StatusIcon className="h-3 w-3 mr-1" />
                                            {eInvoiceStatusConfig[customer.eInvoiceStatus].label}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-1">
                                            <span className={cn(
                                                "h-2 w-2 rounded-full",
                                                customer.gibStatus === "connected" && "bg-green-500",
                                                customer.gibStatus === "disconnected" && "bg-red-500",
                                                customer.gibStatus === "pending" && "bg-yellow-500"
                                            )} />
                                            <span className={cn("text-sm", gibStatusConfig[customer.gibStatus].color)}>
                                                {gibStatusConfig[customer.gibStatus].label}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">
                                            <FileText className="h-3 w-3 inline mr-1" />
                                            {customer.totalInvoices.toLocaleString("tr-TR")} fatura
                                        </div>
                                        <div className="text-xs text-gray-500 flex items-center gap-1">
                                            <Calendar className="h-3 w-3" />
                                            Son: {new Date(customer.lastInvoiceDate).toLocaleDateString("tr-TR")}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                router.push(`/customers/${customer.id}`);
                                            }}
                                            className="text-blue-600 hover:text-blue-900 inline-flex items-center gap-1"
                                        >
                                            Detay
                                            <ExternalLink className="h-3 w-3" />
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between px-4 py-3 bg-white border border-gray-200 rounded-lg">
                <div className="text-sm text-gray-700">
                    Toplam <span className="font-medium">{filteredCustomers.length}</span> e-fatura müşterisi
                </div>
            </div>
        </div>
    );
}
