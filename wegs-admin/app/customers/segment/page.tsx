"use client";

import { useState, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { PageContainer } from "@/components/layout/PageContainer";
import { PageHeader } from "@/components/layout/PageHeader";
import {
    Search,
    Filter,
    Download,
    Building2,
    Mail,
    Phone,
    MapPin,
    Calendar,
    Package,
    FileCheck,
    Calculator,
    Store,
    ShoppingCart,
    ArrowLeft,
    Eye,
    ChevronLeft,
    ChevronRight,
    Users,
    TrendingUp
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

// Segment türleri
type SegmentType = "ecommerce" | "efatura" | "muhasebe" | "pazaryeri" | "full_eticaret" | "all";

interface Customer {
    id: string;
    companyName: string;
    contactPerson: string;
    email: string;
    phone: string;
    location: string;
    segment: string;
    hasEcommerce: boolean;
    hasEfatura: boolean;
    hasPazaryeri: boolean;
    package: string;
    totalRevenue: number;
    registrationDate: string;
    lastActivity: string;
    status: "active" | "inactive" | "trial";
}

// Mock müşteri verileri
const allCustomers: Customer[] = [
    { id: "1", companyName: "Atlas Market", contactPerson: "Ahmet Yılmaz", email: "ahmet@atlasmarket.com", phone: "+90 532 111 22 33", location: "İstanbul", segment: "Muhasebe + Pazaryeri", hasEcommerce: true, hasEfatura: true, hasPazaryeri: true, package: "Pro", totalRevenue: 125000, registrationDate: "2023-01-15", lastActivity: "2 saat önce", status: "active" },
    { id: "2", companyName: "TechSoft A.Ş.", contactPerson: "Mehmet Demir", email: "mehmet@techsoft.com", phone: "+90 533 222 33 44", location: "Ankara", segment: "Full E-ticaret", hasEcommerce: true, hasEfatura: true, hasPazaryeri: false, package: "Enterprise", totalRevenue: 450000, registrationDate: "2022-06-20", lastActivity: "1 gün önce", status: "active" },
    { id: "3", companyName: "Mega Dağıtım", contactPerson: "Ali Kaya", email: "ali@megadagitim.com", phone: "+90 534 333 44 55", location: "İzmir", segment: "Muhasebe + Pazaryeri", hasEcommerce: true, hasEfatura: true, hasPazaryeri: true, package: "Pro", totalRevenue: 280000, registrationDate: "2023-03-10", lastActivity: "3 saat önce", status: "active" },
    { id: "4", companyName: "Online Moda", contactPerson: "Zeynep Arslan", email: "zeynep@onlinemoda.com", phone: "+90 535 444 55 66", location: "Bursa", segment: "Full E-ticaret", hasEcommerce: true, hasEfatura: true, hasPazaryeri: false, package: "Pro", totalRevenue: 95000, registrationDate: "2023-08-05", lastActivity: "5 dakika önce", status: "active" },
    { id: "5", companyName: "E-Elektronik", contactPerson: "Can Özkan", email: "can@eelektronik.com", phone: "+90 536 555 66 77", location: "Antalya", segment: "Full E-ticaret", hasEcommerce: true, hasEfatura: true, hasPazaryeri: false, package: "Enterprise", totalRevenue: 380000, registrationDate: "2022-11-15", lastActivity: "1 saat önce", status: "active" },
    { id: "6", companyName: "Dijital Kitap", contactPerson: "Fatma Şahin", email: "fatma@dijitalkitap.com", phone: "+90 537 666 77 88", location: "Konya", segment: "Full E-ticaret", hasEcommerce: true, hasEfatura: true, hasPazaryeri: false, package: "Starter", totalRevenue: 45000, registrationDate: "2024-01-20", lastActivity: "2 gün önce", status: "active" },
    { id: "7", companyName: "Spor Merkezi", contactPerson: "Burak Yıldız", email: "burak@spormerkezi.com", phone: "+90 538 777 88 99", location: "Adana", segment: "Full E-ticaret", hasEcommerce: true, hasEfatura: true, hasPazaryeri: false, package: "Pro", totalRevenue: 120000, registrationDate: "2023-05-12", lastActivity: "4 saat önce", status: "active" },
    { id: "8", companyName: "Birlik Gıda", contactPerson: "Selin Acar", email: "selin@birlikgida.com", phone: "+90 539 888 99 00", location: "Gaziantep", segment: "Muhasebe + Pazaryeri", hasEcommerce: true, hasEfatura: false, hasPazaryeri: true, package: "Starter", totalRevenue: 65000, registrationDate: "2023-09-01", lastActivity: "6 saat önce", status: "active" },
    { id: "9", companyName: "Kaya Ticaret", contactPerson: "Okan Eren", email: "okan@kayaticaret.com", phone: "+90 530 999 00 11", location: "Mersin", segment: "Muhasebe + Pazaryeri", hasEcommerce: true, hasEfatura: false, hasPazaryeri: true, package: "Pro", totalRevenue: 180000, registrationDate: "2022-08-25", lastActivity: "12 saat önce", status: "active" },
    { id: "10", companyName: "Ev & Yaşam Plus", contactPerson: "Deniz Kaya", email: "deniz@evyasam.com", phone: "+90 531 000 11 22", location: "Samsun", segment: "Full E-ticaret", hasEcommerce: true, hasEfatura: true, hasPazaryeri: false, package: "Enterprise", totalRevenue: 520000, registrationDate: "2022-04-10", lastActivity: "30 dakika önce", status: "active" },
    { id: "11", companyName: "Alfa Danışmanlık", contactPerson: "Murat Koç", email: "murat@alfa.com", phone: "+90 532 112 23 34", location: "İstanbul", segment: "Sadece Muhasebe", hasEcommerce: false, hasEfatura: false, hasPazaryeri: false, package: "Starter", totalRevenue: 25000, registrationDate: "2024-02-01", lastActivity: "3 gün önce", status: "active" },
    { id: "12", companyName: "Beta Hukuk", contactPerson: "Aylin Öz", email: "aylin@betahukuk.com", phone: "+90 533 223 34 45", location: "Ankara", segment: "Sadece Muhasebe", hasEcommerce: false, hasEfatura: false, hasPazaryeri: false, package: "Starter", totalRevenue: 18000, registrationDate: "2024-01-15", lastActivity: "1 gün önce", status: "active" },
    { id: "13", companyName: "Gamma Mühendislik", contactPerson: "Serkan Tekin", email: "serkan@gamma.com", phone: "+90 534 334 45 56", location: "İzmir", segment: "Sadece Muhasebe", hasEcommerce: false, hasEfatura: false, hasPazaryeri: false, package: "Pro", totalRevenue: 85000, registrationDate: "2023-06-20", lastActivity: "5 saat önce", status: "active" },
    { id: "14", companyName: "Delta İnşaat", contactPerson: "Emre Çelik", email: "emre@delta.com", phone: "+90 535 445 56 67", location: "Trabzon", segment: "Sadece Muhasebe", hasEcommerce: false, hasEfatura: false, hasPazaryeri: false, package: "Pro", totalRevenue: 150000, registrationDate: "2022-12-05", lastActivity: "2 saat önce", status: "active" },
    { id: "15", companyName: "Epsilon Lojistik", contactPerson: "Hakan Polat", email: "hakan@epsilon.com", phone: "+90 536 556 67 78", location: "Kayseri", segment: "Sadece Muhasebe", hasEcommerce: false, hasEfatura: false, hasPazaryeri: false, package: "Enterprise", totalRevenue: 320000, registrationDate: "2022-07-15", lastActivity: "4 saat önce", status: "active" },
    { id: "16", companyName: "Zeta Tarım", contactPerson: "Kemal Aydın", email: "kemal@zeta.com", phone: "+90 537 667 78 89", location: "Şanlıurfa", segment: "Sadece Muhasebe", hasEcommerce: false, hasEfatura: false, hasPazaryeri: false, package: "Starter", totalRevenue: 42000, registrationDate: "2023-10-01", lastActivity: "1 hafta önce", status: "inactive" },
    { id: "17", companyName: "Yeni Girişim", contactPerson: "Ece Doğan", email: "ece@yenigirisim.com", phone: "+90 538 778 89 90", location: "İstanbul", segment: "Full E-ticaret", hasEcommerce: true, hasEfatura: false, hasPazaryeri: false, package: "Trial", totalRevenue: 0, registrationDate: "2024-12-10", lastActivity: "1 saat önce", status: "trial" },
    { id: "18", companyName: "Toptan Ticaret", contactPerson: "Volkan Kurt", email: "volkan@toptanticaret.com", phone: "+90 539 889 90 01", location: "Eskişehir", segment: "Muhasebe + Pazaryeri", hasEcommerce: true, hasEfatura: true, hasPazaryeri: true, package: "Pro", totalRevenue: 210000, registrationDate: "2023-02-28", lastActivity: "8 saat önce", status: "active" },
];

const segmentConfig: Record<string, { label: string; color: string; icon: React.ReactNode; description: string }> = {
    ecommerce: {
        label: "E-ticaret Entegrasyonlu",
        color: "green",
        icon: <Package className="h-5 w-5" />,
        description: "E-ticaret entegrasyonu kullanan müşteriler"
    },
    efatura: {
        label: "E-ticaret ve E-Fatura Kullanan",
        color: "purple",
        icon: <FileCheck className="h-5 w-5" />,
        description: "Hem e-ticaret hem de e-fatura kullanan müşteriler"
    },
    muhasebe: {
        label: "Sadece Muhasebe",
        color: "blue",
        icon: <Calculator className="h-5 w-5" />,
        description: "Sadece muhasebe modülü kullanan müşteriler"
    },
    pazaryeri: {
        label: "Muhasebe + Pazaryeri",
        color: "emerald",
        icon: <Store className="h-5 w-5" />,
        description: "Muhasebe ve pazaryeri entegrasyonu kullanan müşteriler"
    },
    full_eticaret: {
        label: "Full E-ticaret",
        color: "amber",
        icon: <ShoppingCart className="h-5 w-5" />,
        description: "Tam e-ticaret çözümü kullanan müşteriler"
    },
    all: {
        label: "Tüm Müşteriler",
        color: "gray",
        icon: <Users className="h-5 w-5" />,
        description: "Tüm segmentlerdeki müşteriler"
    }
};

export default function SegmentCustomersPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const segmentParam = searchParams.get("segment") as SegmentType || "all";

    const [searchQuery, setSearchQuery] = useState("");
    const [filterPackage, setFilterPackage] = useState<string>("all");
    const [filterStatus, setFilterStatus] = useState<string>("all");
    const [filterLocation, setFilterLocation] = useState<string>("all");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Segmente göre filtreleme
    const filteredBySegment = useMemo(() => {
        switch (segmentParam) {
            case "ecommerce":
                return allCustomers.filter(c => c.hasEcommerce);
            case "efatura":
                return allCustomers.filter(c => c.hasEcommerce && c.hasEfatura);
            case "muhasebe":
                return allCustomers.filter(c => c.segment === "Sadece Muhasebe");
            case "pazaryeri":
                return allCustomers.filter(c => c.hasPazaryeri);
            case "full_eticaret":
                return allCustomers.filter(c => c.segment === "Full E-ticaret");
            default:
                return allCustomers;
        }
    }, [segmentParam]);

    // Ek filtreler
    const filteredCustomers = useMemo(() => {
        return filteredBySegment.filter(customer => {
            const matchesSearch = customer.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                customer.contactPerson.toLowerCase().includes(searchQuery.toLowerCase()) ||
                customer.email.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesPackage = filterPackage === "all" || customer.package === filterPackage;
            const matchesStatus = filterStatus === "all" || customer.status === filterStatus;
            const matchesLocation = filterLocation === "all" || customer.location === filterLocation;
            return matchesSearch && matchesPackage && matchesStatus && matchesLocation;
        });
    }, [filteredBySegment, searchQuery, filterPackage, filterStatus, filterLocation]);

    // Sayfalama
    const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
    const paginatedCustomers = filteredCustomers.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Benzersiz lokasyonlar
    const uniqueLocations = [...new Set(allCustomers.map(c => c.location))].sort();

    // İstatistikler
    const totalRevenue = filteredCustomers.reduce((sum, c) => sum + c.totalRevenue, 0);
    const activeCount = filteredCustomers.filter(c => c.status === "active").length;

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat("tr-TR", {
            style: "currency",
            currency: "TRY",
            minimumFractionDigits: 0
        }).format(value);
    };

    const currentSegment = segmentConfig[segmentParam] || segmentConfig.all;

    return (
        <PageContainer>
            <PageHeader title="Segment Müşterileri">
                <button
                    onClick={() => router.back()}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Geri Dön
                </button>
                <button className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                    <Download className="h-4 w-4" />
                    Dışa Aktar
                </button>
            </PageHeader>

            {/* Segment Başlığı */}
            <div className={cn(
                "rounded-xl p-6 mb-6",
                segmentParam === "ecommerce" && "bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200",
                segmentParam === "efatura" && "bg-gradient-to-r from-purple-50 to-violet-50 border border-purple-200",
                segmentParam === "muhasebe" && "bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200",
                segmentParam === "pazaryeri" && "bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200",
                segmentParam === "full_eticaret" && "bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200",
                segmentParam === "all" && "bg-gradient-to-r from-gray-50 to-slate-50 border border-gray-200"
            )}>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className={cn(
                            "p-3 rounded-xl",
                            segmentParam === "ecommerce" && "bg-green-100 text-green-600",
                            segmentParam === "efatura" && "bg-purple-100 text-purple-600",
                            segmentParam === "muhasebe" && "bg-blue-100 text-blue-600",
                            segmentParam === "pazaryeri" && "bg-emerald-100 text-emerald-600",
                            segmentParam === "full_eticaret" && "bg-amber-100 text-amber-600",
                            segmentParam === "all" && "bg-gray-100 text-gray-600"
                        )}>
                            {currentSegment.icon}
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-900">{currentSegment.label}</h2>
                            <p className="text-sm text-gray-500">{currentSegment.description}</p>
                        </div>
                    </div>
                    <div className="flex gap-6">
                        <div className="text-center">
                            <p className="text-3xl font-bold text-gray-900">{filteredCustomers.length}</p>
                            <p className="text-sm text-gray-500">Toplam Müşteri</p>
                        </div>
                        <div className="text-center">
                            <p className="text-3xl font-bold text-green-600">{activeCount}</p>
                            <p className="text-sm text-gray-500">Aktif</p>
                        </div>
                        <div className="text-center">
                            <p className="text-3xl font-bold text-gray-900">{formatCurrency(totalRevenue)}</p>
                            <p className="text-sm text-gray-500">Toplam Gelir</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Segment Seçici */}
            <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 p-2 mb-6">
                <div className="flex flex-wrap gap-2">
                    {Object.entries(segmentConfig).map(([key, config]) => (
                        <Link
                            key={key}
                            href={`/customers/segment?segment=${key}`}
                            className={cn(
                                "inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                                segmentParam === key
                                    ? "bg-blue-600 text-white"
                                    : "text-gray-600 hover:bg-gray-100"
                            )}
                        >
                            {config.icon}
                            {config.label}
                        </Link>
                    ))}
                </div>
            </div>

            {/* Filtreler */}
            <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 p-4 mb-6">
                <div className="flex flex-wrap gap-4">
                    <div className="flex-1 min-w-[300px]">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Şirket adı, kişi veya e-posta ara..."
                                value={searchQuery}
                                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                    <select
                        value={filterPackage}
                        onChange={(e) => { setFilterPackage(e.target.value); setCurrentPage(1); }}
                        className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="all">Tüm Paketler</option>
                        <option value="Starter">Starter</option>
                        <option value="Pro">Pro</option>
                        <option value="Enterprise">Enterprise</option>
                        <option value="Trial">Trial</option>
                    </select>
                    <select
                        value={filterStatus}
                        onChange={(e) => { setFilterStatus(e.target.value); setCurrentPage(1); }}
                        className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="all">Tüm Durumlar</option>
                        <option value="active">Aktif</option>
                        <option value="inactive">Pasif</option>
                        <option value="trial">Deneme</option>
                    </select>
                    <select
                        value={filterLocation}
                        onChange={(e) => { setFilterLocation(e.target.value); setCurrentPage(1); }}
                        className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="all">Tüm Şehirler</option>
                        {uniqueLocations.map(loc => (
                            <option key={loc} value={loc}>{loc}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Müşteri Tablosu */}
            <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Şirket</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">İletişim</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Segment</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Paket</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gelir</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Durum</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Son Aktivite</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">İşlem</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {paginatedCustomers.map((customer) => (
                                <tr key={customer.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-10 w-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">
                                                {customer.companyName.charAt(0)}
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">{customer.companyName}</div>
                                                <div className="text-sm text-gray-500 flex items-center gap-1">
                                                    <MapPin className="h-3 w-3" />
                                                    {customer.location}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{customer.contactPerson}</div>
                                        <div className="text-sm text-gray-500">{customer.email}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-2">
                                            {customer.hasEcommerce && (
                                                <span className="inline-flex px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-700" title="E-ticaret">
                                                    E-tic
                                                </span>
                                            )}
                                            {customer.hasEfatura && (
                                                <span className="inline-flex px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-700" title="E-Fatura">
                                                    E-Fat
                                                </span>
                                            )}
                                            {customer.hasPazaryeri && (
                                                <span className="inline-flex px-2 py-0.5 rounded text-xs font-medium bg-amber-100 text-amber-700" title="Pazaryeri">
                                                    Pazar
                                                </span>
                                            )}
                                            {!customer.hasEcommerce && !customer.hasEfatura && !customer.hasPazaryeri && (
                                                <span className="inline-flex px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-700">
                                                    Muhasebe
                                                </span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={cn(
                                            "inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium",
                                            customer.package === "Enterprise" && "bg-purple-100 text-purple-700",
                                            customer.package === "Pro" && "bg-blue-100 text-blue-700",
                                            customer.package === "Starter" && "bg-gray-100 text-gray-700",
                                            customer.package === "Trial" && "bg-orange-100 text-orange-700"
                                        )}>
                                            {customer.package}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="text-sm font-medium text-gray-900">
                                            {formatCurrency(customer.totalRevenue)}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={cn(
                                            "inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium",
                                            customer.status === "active" && "bg-green-100 text-green-700",
                                            customer.status === "inactive" && "bg-gray-100 text-gray-700",
                                            customer.status === "trial" && "bg-amber-100 text-amber-700"
                                        )}>
                                            {customer.status === "active" && "Aktif"}
                                            {customer.status === "inactive" && "Pasif"}
                                            {customer.status === "trial" && "Deneme"}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {customer.lastActivity}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right">
                                        <Link
                                            href={`/customers/${customer.id}`}
                                            className="p-1.5 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors inline-flex"
                                        >
                                            <Eye className="h-4 w-4" />
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
                    <p className="text-sm text-gray-500">
                        Toplam <span className="font-medium">{filteredCustomers.length}</span> müşteriden{" "}
                        <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span>-
                        <span className="font-medium">{Math.min(currentPage * itemsPerPage, filteredCustomers.length)}</span> arası gösteriliyor
                    </p>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                            className="p-2 rounded-lg border border-gray-300 text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </button>
                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                            const pageNum = i + 1;
                            return (
                                <button
                                    key={pageNum}
                                    onClick={() => setCurrentPage(pageNum)}
                                    className={cn(
                                        "px-3 py-1 rounded-lg text-sm font-medium",
                                        currentPage === pageNum
                                            ? "bg-blue-600 text-white"
                                            : "text-gray-600 hover:bg-gray-100"
                                    )}
                                >
                                    {pageNum}
                                </button>
                            );
                        })}
                        {totalPages > 5 && <span className="text-gray-400">...</span>}
                        <button
                            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                            disabled={currentPage === totalPages}
                            className="p-2 rounded-lg border border-gray-300 text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <ChevronRight className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            </div>
        </PageContainer>
    );
}
