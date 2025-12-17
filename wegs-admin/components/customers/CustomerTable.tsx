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
    Calculator,
    Eye,
    Edit,
    Package,
    X,
    ArrowRight,
    Zap,
    Star,
    Crown
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

const packageConfig = {
    Starter: {
        icon: Zap,
        color: "gray",
        price: "₺499/ay",
        features: ["5 Kullanıcı", "Temel Raporlama", "E-posta Desteği"]
    },
    Business: {
        icon: Star,
        color: "blue",
        price: "₺999/ay",
        features: ["15 Kullanıcı", "Gelişmiş Raporlama", "Öncelikli Destek", "API Erişimi"]
    },
    Enterprise: {
        icon: Crown,
        color: "purple",
        price: "₺2499/ay",
        features: ["Sınırsız Kullanıcı", "Özel Raporlama", "7/24 Destek", "Tam API Erişimi", "Özel Entegrasyonlar"]
    }
};

export function CustomerTable() {
    const router = useRouter();
    const [filter, setFilter] = useState("all");
    const [searchTerm, setSearchTerm] = useState("");
    const [isPackageModalOpen, setIsPackageModalOpen] = useState(false);
    const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
    const [quickViewCustomer, setQuickViewCustomer] = useState<Customer | null>(null);
    const [selectedPackage, setSelectedPackage] = useState<"Starter" | "Business" | "Enterprise" | null>(null);

    const handleQuickView = (customer: Customer) => {
        setQuickViewCustomer(customer);
        setIsQuickViewOpen(true);
    };

    const filteredCustomers = customers.filter(customer => {
        const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            customer.email.toLowerCase().includes(searchTerm.toLowerCase());

        if (filter === "einvoice") return matchesSearch && customer.isEInvoice;
        if (filter === "non-invoice") return matchesSearch && !customer.isEInvoice;
        if (filter === "no-training") return matchesSearch && !customer.hasTraining;
        if (filter === "ecommerce") return matchesSearch && customer.hasEcommerce;
        if (filter === "ecommerce-einvoice") return matchesSearch && customer.hasEcommerce && customer.isEInvoice;
        if (filter === "ecommerce-non-invoice") return matchesSearch && customer.hasEcommerce && !customer.isEInvoice;
        if (filter === "accounting-only") return matchesSearch && !customer.hasEcommerce && !customer.isEInvoice;

        return matchesSearch;
    });

    const handlePackageChange = (customer: Customer) => {
        setSelectedCustomer(customer);
        setSelectedPackage(customer.package);
        setIsPackageModalOpen(true);
    };

    const handleConfirmPackageChange = () => {
        if (selectedCustomer && selectedPackage) {
            console.log("Paket değişikliği:", selectedCustomer.name, selectedCustomer.package, "->", selectedPackage);
            alert(`${selectedCustomer.name} müşterisinin paketi ${selectedPackage} olarak değiştirildi! (Demo)`);
            setIsPackageModalOpen(false);
            setSelectedCustomer(null);
            setSelectedPackage(null);
        }
    };

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
                            <option value="ecommerce-non-invoice">E-Ticaret + Fatura Kesmeyen</option>
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
                            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                İşlemler
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredCustomers.map((customer) => {
                            // Mock Risk Logic
                            const isHighRisk = customer.tickets > 10; // Mock: High ticket volume
                            const isVIP = customer.volume > 4000; // Mock: High Volume
                            const PackageIcon = packageConfig[customer.package].icon;

                            return (
                                <tr
                                    key={customer.id}
                                    className="hover:bg-gray-50 transition-colors"
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
                                            <div className="flex items-center gap-2">
                                                <PackageIcon className={cn(
                                                    "h-4 w-4",
                                                    customer.package === "Starter" && "text-gray-500",
                                                    customer.package === "Business" && "text-blue-500",
                                                    customer.package === "Enterprise" && "text-purple-500"
                                                )} />
                                                <span className="text-sm text-gray-900 font-medium">{customer.package}</span>
                                            </div>
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
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                onClick={() => handleQuickView(customer)}
                                                className="p-1.5 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                                                title="Hızlı Önizleme"
                                            >
                                                <Eye className="h-4 w-4" />
                                            </button>
                                            <button
                                                onClick={() => handlePackageChange(customer)}
                                                className="p-1.5 rounded-lg text-gray-400 hover:text-purple-600 hover:bg-purple-50 transition-colors"
                                                title="Paket Değiştir"
                                            >
                                                <Package className="h-4 w-4" />
                                            </button>
                                            <button
                                                onClick={() => router.push(`/customers/${customer.id}`)}
                                                className="p-1.5 rounded-lg text-gray-400 hover:text-green-600 hover:bg-green-50 transition-colors"
                                                title="Düzenle"
                                            >
                                                <Edit className="h-4 w-4" />
                                            </button>
                                        </div>
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

            {/* Paket Değiştirme Modalı */}
            {isPackageModalOpen && selectedCustomer && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
                    onClick={() => setIsPackageModalOpen(false)}
                >
                    <div
                        className="w-full max-w-2xl bg-white rounded-xl shadow-xl overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-purple-50 to-indigo-50 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center">
                                    <Package className="h-5 w-5 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900">Paket Değiştir</h3>
                                    <p className="text-sm text-gray-500">{selectedCustomer.name}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsPackageModalOpen(false)}
                                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                            >
                                <X className="h-5 w-5 text-gray-500" />
                            </button>
                        </div>

                        <div className="p-6">
                            {/* Current Package */}
                            <div className="mb-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
                                <p className="text-sm text-gray-500 mb-1">Mevcut Paket</p>
                                <div className="flex items-center gap-2">
                                    {(() => {
                                        const CurrentIcon = packageConfig[selectedCustomer.package].icon;
                                        return <CurrentIcon className={cn(
                                            "h-5 w-5",
                                            selectedCustomer.package === "Starter" && "text-gray-500",
                                            selectedCustomer.package === "Business" && "text-blue-500",
                                            selectedCustomer.package === "Enterprise" && "text-purple-500"
                                        )} />;
                                    })()}
                                    <span className="text-lg font-bold text-gray-900">{selectedCustomer.package}</span>
                                    <span className="text-sm text-gray-500">• {packageConfig[selectedCustomer.package].price}</span>
                                </div>
                            </div>

                            {/* Package Options */}
                            <p className="text-sm font-medium text-gray-700 mb-3">Yeni Paket Seçin</p>
                            <div className="grid grid-cols-3 gap-4 mb-6">
                                {(["Starter", "Business", "Enterprise"] as const).map((pkg) => {
                                    const config = packageConfig[pkg];
                                    const Icon = config.icon;
                                    const isSelected = selectedPackage === pkg;
                                    const isCurrent = selectedCustomer.package === pkg;

                                    return (
                                        <button
                                            key={pkg}
                                            onClick={() => setSelectedPackage(pkg)}
                                            disabled={isCurrent}
                                            className={cn(
                                                "p-4 rounded-xl border-2 text-left transition-all",
                                                isSelected && !isCurrent && "border-purple-500 bg-purple-50 ring-2 ring-purple-200",
                                                !isSelected && !isCurrent && "border-gray-200 hover:border-gray-300 hover:bg-gray-50",
                                                isCurrent && "border-gray-200 bg-gray-100 opacity-60 cursor-not-allowed"
                                            )}
                                        >
                                            <div className="flex items-center gap-2 mb-2">
                                                <Icon className={cn(
                                                    "h-5 w-5",
                                                    config.color === "gray" && "text-gray-500",
                                                    config.color === "blue" && "text-blue-500",
                                                    config.color === "purple" && "text-purple-500"
                                                )} />
                                                <span className="font-semibold text-gray-900">{pkg}</span>
                                                {isCurrent && <span className="text-xs bg-gray-200 text-gray-600 px-1.5 py-0.5 rounded">Mevcut</span>}
                                            </div>
                                            <p className="text-lg font-bold text-gray-900 mb-2">{config.price}</p>
                                            <ul className="space-y-1">
                                                {config.features.slice(0, 3).map((feature, i) => (
                                                    <li key={i} className="text-xs text-gray-500 flex items-center gap-1">
                                                        <CheckCircle2 className="h-3 w-3 text-green-500" />
                                                        {feature}
                                                    </li>
                                                ))}
                                            </ul>
                                        </button>
                                    );
                                })}
                            </div>

                            {/* Change Summary */}
                            {selectedPackage && selectedPackage !== selectedCustomer.package && (
                                <div className="p-4 bg-blue-50 rounded-xl border border-blue-200 mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="flex items-center gap-2">
                                            <span className="font-medium text-gray-700">{selectedCustomer.package}</span>
                                            <ArrowRight className="h-4 w-4 text-gray-400" />
                                            <span className="font-bold text-purple-700">{selectedPackage}</span>
                                        </div>
                                    </div>
                                    <p className="text-sm text-blue-700 mt-2">
                                        Paket değişikliği hemen uygulanacak ve fiyat farkı bir sonraki fatura döneminde yansıtılacaktır.
                                    </p>
                                </div>
                            )}
                        </div>

                        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex gap-3">
                            <button
                                onClick={handleConfirmPackageChange}
                                disabled={!selectedPackage || selectedPackage === selectedCustomer.package}
                                className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Paketi Değiştir
                            </button>
                            <button
                                onClick={() => setIsPackageModalOpen(false)}
                                className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                            >
                                İptal
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Hızlı Önizleme Modalı */}
            {isQuickViewOpen && quickViewCustomer && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
                    onClick={() => setIsQuickViewOpen(false)}
                >
                    <div
                        className="w-full max-w-md bg-white rounded-xl shadow-xl overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className={cn("w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg", quickViewCustomer.avatarColor)}>
                                    {quickViewCustomer.name.charAt(0)}
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900">{quickViewCustomer.name}</h3>
                                    <p className="text-sm text-gray-500">{quickViewCustomer.email}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsQuickViewOpen(false)}
                                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                            >
                                <X className="h-5 w-5 text-gray-500" />
                            </button>
                        </div>

                        <div className="p-6 space-y-4">
                            {/* Paket Bilgisi */}
                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <span className="text-sm text-gray-600">Paket</span>
                                <div className="flex items-center gap-2">
                                    {(() => {
                                        const Icon = packageConfig[quickViewCustomer.package].icon;
                                        return <Icon className={cn(
                                            "h-4 w-4",
                                            quickViewCustomer.package === "Starter" && "text-gray-500",
                                            quickViewCustomer.package === "Business" && "text-blue-500",
                                            quickViewCustomer.package === "Enterprise" && "text-purple-500"
                                        )} />;
                                    })()}
                                    <span className="font-semibold text-gray-900">{quickViewCustomer.package}</span>
                                </div>
                            </div>

                            {/* Durum */}
                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <span className="text-sm text-gray-600">Durum</span>
                                <span className={cn(
                                    "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                                    quickViewCustomer.subscriptionStatus === "Aktif" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                                )}>
                                    {quickViewCustomer.subscriptionStatus}
                                </span>
                            </div>

                            {/* Son Giriş */}
                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <span className="text-sm text-gray-600">Son Giriş</span>
                                <span className="font-medium text-gray-900">{quickViewCustomer.lastLogin}</span>
                            </div>

                            {/* Ödeme */}
                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <span className="text-sm text-gray-600">Son Ödeme</span>
                                <span className="font-medium text-gray-900">{quickViewCustomer.lastPayment}</span>
                            </div>

                            {/* Özellikler */}
                            <div className="flex flex-wrap gap-2">
                                {quickViewCustomer.hasEcommerce && (
                                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                                        <ShoppingBag className="mr-1 h-3 w-3" />
                                        E-Ticaret
                                    </span>
                                )}
                                {quickViewCustomer.isEInvoice && (
                                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                        <Rocket className="mr-1 h-3 w-3" />
                                        E-Fatura
                                    </span>
                                )}
                                {quickViewCustomer.autoRenewal && (
                                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                        <CheckCircle2 className="mr-1 h-3 w-3" />
                                        Oto. Yenileme
                                    </span>
                                )}
                                {quickViewCustomer.hasTraining && (
                                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                                        Eğitim Aldı
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex gap-3">
                            <button
                                onClick={() => {
                                    setIsQuickViewOpen(false);
                                    router.push(`/customers/${quickViewCustomer.id}`);
                                }}
                                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                            >
                                Detaya Git
                            </button>
                            <button
                                onClick={() => setIsQuickViewOpen(false)}
                                className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                            >
                                Kapat
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
