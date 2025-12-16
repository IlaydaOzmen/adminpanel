"use client";

import { useState } from "react";
import {
    Users,
    Building2,
    Award,
    TrendingUp,
    DollarSign,
    UserPlus,
    FileText,
    BarChart3,
    Settings,
    Mail,
    Phone,
    MapPin,
    Calendar,
    CheckCircle,
    Clock,
    AlertCircle,
    Star,
    ChevronRight,
    Search,
    Filter,
    MoreVertical,
    Eye,
    Edit,
    Trash2,
    Plus,
    Download,
    RefreshCw,
    ExternalLink,
    Briefcase,
    Target,
    Gift,
    Shield,
    TrendingDown,
    ArrowUpRight,
    ArrowDownRight,
    X
} from "lucide-react";
import { cn } from "@/lib/utils";

// Partner types
type PartnerTier = "bronze" | "silver" | "gold" | "platinum";
type PartnerStatus = "active" | "pending" | "suspended" | "inactive";

interface Partner {
    id: string;
    companyName: string;
    contactPerson: string;
    email: string;
    phone: string;
    location: string;
    tier: PartnerTier;
    status: PartnerStatus;
    joinDate: string;
    totalRevenue: number;
    activeCustomers: number;
    monthlyGrowth: number;
    lastActivity: string;
    commissionRate: number;
    pendingPayment: number;
}

// Mock data
const partnersData: Partner[] = [
    {
        id: "1",
        companyName: "Digital Solutions Ltd.",
        contactPerson: "Mehmet Kaya",
        email: "mehmet@digitalsolutions.com",
        phone: "+90 532 123 45 67",
        location: "İstanbul",
        tier: "platinum",
        status: "active",
        joinDate: "2022-06-15",
        totalRevenue: 1250000,
        activeCustomers: 156,
        monthlyGrowth: 12.5,
        lastActivity: "2 saat önce",
        commissionRate: 25,
        pendingPayment: 45000
    },
    {
        id: "2",
        companyName: "Tech Advisors",
        contactPerson: "Ayşe Demir",
        email: "ayse@techadvisors.com",
        phone: "+90 533 234 56 78",
        location: "Ankara",
        tier: "gold",
        status: "active",
        joinDate: "2023-03-20",
        totalRevenue: 780000,
        activeCustomers: 89,
        monthlyGrowth: 8.3,
        lastActivity: "1 gün önce",
        commissionRate: 20,
        pendingPayment: 28000
    },
    {
        id: "3",
        companyName: "Cloud Expert Danışmanlık",
        contactPerson: "Ali Yılmaz",
        email: "ali@cloudexpert.com",
        phone: "+90 535 345 67 89",
        location: "İzmir",
        tier: "silver",
        status: "active",
        joinDate: "2023-06-10",
        totalRevenue: 420000,
        activeCustomers: 52,
        monthlyGrowth: 15.2,
        lastActivity: "3 saat önce",
        commissionRate: 15,
        pendingPayment: 12500
    },
    {
        id: "4",
        companyName: "E-Ticaret Pro",
        contactPerson: "Zeynep Arslan",
        email: "zeynep@eticaretpro.com",
        phone: "+90 536 456 78 90",
        location: "Bursa",
        tier: "gold",
        status: "pending",
        joinDate: "2024-01-05",
        totalRevenue: 95000,
        activeCustomers: 12,
        monthlyGrowth: 45.0,
        lastActivity: "5 dakika önce",
        commissionRate: 20,
        pendingPayment: 8500
    },
    {
        id: "5",
        companyName: "Fintech Partners",
        contactPerson: "Can Özkan",
        email: "can@fintechpartners.com",
        phone: "+90 537 567 89 01",
        location: "Antalya",
        tier: "bronze",
        status: "active",
        joinDate: "2024-02-20",
        totalRevenue: 65000,
        activeCustomers: 8,
        monthlyGrowth: -2.5,
        lastActivity: "1 hafta önce",
        commissionRate: 10,
        pendingPayment: 3200
    },
    {
        id: "6",
        companyName: "Muhasebe Merkezi",
        contactPerson: "Fatma Şahin",
        email: "fatma@muhasebemerkezi.com",
        phone: "+90 538 678 90 12",
        location: "Konya",
        tier: "silver",
        status: "suspended",
        joinDate: "2023-08-15",
        totalRevenue: 180000,
        activeCustomers: 0,
        monthlyGrowth: 0,
        lastActivity: "3 ay önce",
        commissionRate: 15,
        pendingPayment: 0
    }
];

// Partner program benefits
const tierBenefits = {
    bronze: {
        color: "amber",
        commission: "10%",
        features: ["Temel destek", "Partner portalı erişimi", "Aylık raporlar"],
        requirements: "0-10 müşteri"
    },
    silver: {
        color: "gray",
        commission: "15%",
        features: ["Öncelikli destek", "Eğitim materyalleri", "Haftalık raporlar", "Ortak pazarlama"],
        requirements: "11-50 müşteri"
    },
    gold: {
        color: "yellow",
        commission: "20%",
        features: ["Dedicated destek", "Özel eğitimler", "Günlük raporlar", "Co-branding", "Demo hesapları"],
        requirements: "51-100 müşteri"
    },
    platinum: {
        color: "purple",
        commission: "25%",
        features: ["7/24 destek", "Kişiselleştirilmiş eğitim", "API erişimi", "Beyaz etiket opsiyonu", "Öncelikli özellik talepleri"],
        requirements: "100+ müşteri"
    }
};

export default function PartnerPortalPage() {
    const [selectedTab, setSelectedTab] = useState<"overview" | "partners" | "customers" | "commissions" | "performance" | "payments" | "applications">("overview");
    const [searchQuery, setSearchQuery] = useState("");
    const [filterTier, setFilterTier] = useState<PartnerTier | "all">("all");
    const [filterStatus, setFilterStatus] = useState<PartnerStatus | "all">("all");
    const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);
    const [isAddPartnerModalOpen, setIsAddPartnerModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [partnerToEdit, setPartnerToEdit] = useState<Partner | null>(null);
    const [partnerToDelete, setPartnerToDelete] = useState<Partner | null>(null);
    const [editForm, setEditForm] = useState({
        companyName: "",
        contactPerson: "",
        email: "",
        phone: "",
        location: "",
        tier: "bronze" as PartnerTier,
        status: "active" as PartnerStatus,
        commissionRate: 10,
        notes: ""
    });
    const [newPartnerForm, setNewPartnerForm] = useState({
        companyName: "",
        contactPerson: "",
        email: "",
        phone: "",
        location: "",
        tier: "bronze" as PartnerTier,
        notes: ""
    });

    // Edit modal açma
    const handleEditClick = (partner: Partner) => {
        setPartnerToEdit(partner);
        setEditForm({
            companyName: partner.companyName,
            contactPerson: partner.contactPerson,
            email: partner.email,
            phone: partner.phone,
            location: partner.location,
            tier: partner.tier,
            status: partner.status,
            commissionRate: partner.commissionRate,
            notes: ""
        });
        setIsEditModalOpen(true);
    };

    // Delete modal açma
    const handleDeleteClick = (partner: Partner) => {
        setPartnerToDelete(partner);
        setIsDeleteModalOpen(true);
    };

    const filteredPartners = partnersData.filter(partner => {
        const matchesSearch = partner.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            partner.contactPerson.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesTier = filterTier === "all" || partner.tier === filterTier;
        const matchesStatus = filterStatus === "all" || partner.status === filterStatus;
        return matchesSearch && matchesTier && matchesStatus;
    });

    // Stats
    const totalPartners = partnersData.length;
    const activePartners = partnersData.filter(p => p.status === "active").length;
    const totalRevenue = partnersData.reduce((sum, p) => sum + p.totalRevenue, 0);
    const totalCustomers = partnersData.reduce((sum, p) => sum + p.activeCustomers, 0);
    const pendingPayments = partnersData.reduce((sum, p) => sum + p.pendingPayment, 0);

    const tabs = [
        { id: "overview" as const, label: "Genel Bakış", icon: BarChart3 },
        { id: "partners" as const, label: "Partnerler", icon: Building2 },
        { id: "customers" as const, label: "Müşteriler", icon: Users },
        { id: "commissions" as const, label: "Komisyonlar", icon: DollarSign },
        { id: "performance" as const, label: "Performans", icon: TrendingUp },
        { id: "payments" as const, label: "Ödemeler", icon: Briefcase },
        { id: "applications" as const, label: "Başvurular", icon: UserPlus },
    ];

    const tierConfig = {
        bronze: { label: "Bronze", color: "bg-amber-100 text-amber-700 border-amber-200", icon: "🥉" },
        silver: { label: "Silver", color: "bg-gray-100 text-gray-700 border-gray-200", icon: "🥈" },
        gold: { label: "Gold", color: "bg-yellow-100 text-yellow-700 border-yellow-200", icon: "🥇" },
        platinum: { label: "Platinum", color: "bg-purple-100 text-purple-700 border-purple-200", icon: "💎" }
    };

    const statusConfig = {
        active: { label: "Aktif", color: "bg-green-100 text-green-700" },
        pending: { label: "Beklemede", color: "bg-blue-100 text-blue-700" },
        suspended: { label: "Askıda", color: "bg-red-100 text-red-700" },
        inactive: { label: "Pasif", color: "bg-gray-100 text-gray-700" }
    };

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat("tr-TR", {
            style: "currency",
            currency: "TRY",
            minimumFractionDigits: 0
        }).format(value);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Partner Portal</h1>
                    <p className="text-sm text-gray-500">Partner programı yönetimi ve istatistikleri</p>
                </div>
                <div className="flex gap-3">
                    <button className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                        <Download className="h-4 w-4" />
                        Rapor İndir
                    </button>
                    <button
                        onClick={() => setIsAddPartnerModalOpen(true)}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 rounded-lg text-sm font-medium text-white hover:bg-blue-700 transition-colors"
                    >
                        <Plus className="h-4 w-4" />
                        Yeni Partner Ekle
                    </button>
                </div>
            </div>

            {/* Tabs */}
            <div className="bg-white shadow-sm ring-1 ring-gray-900/5 rounded-xl p-1">
                <nav className="flex space-x-1">
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setSelectedTab(tab.id)}
                                className={cn(
                                    "flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-medium transition-all",
                                    selectedTab === tab.id
                                        ? "bg-blue-600 text-white shadow-sm"
                                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                                )}
                            >
                                <Icon className="h-4 w-4" />
                                {tab.label}
                            </button>
                        );
                    })}
                </nav>
            </div>

            {/* Overview Tab */}
            {selectedTab === "overview" && (
                <div className="space-y-6">
                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
                        <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 p-6">
                            <div className="flex items-center justify-between">
                                <div className="p-2 bg-blue-100 rounded-lg">
                                    <Building2 className="h-5 w-5 text-blue-600" />
                                </div>
                                <span className="inline-flex items-center text-sm font-medium text-green-600">
                                    <ArrowUpRight className="h-4 w-4 mr-1" />
                                    +12%
                                </span>
                            </div>
                            <div className="mt-4">
                                <p className="text-sm text-gray-500">Toplam Partner</p>
                                <p className="text-2xl font-bold text-gray-900">{totalPartners}</p>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 p-6">
                            <div className="flex items-center justify-between">
                                <div className="p-2 bg-green-100 rounded-lg">
                                    <CheckCircle className="h-5 w-5 text-green-600" />
                                </div>
                                <span className="text-sm font-medium text-gray-500">
                                    {Math.round((activePartners / totalPartners) * 100)}%
                                </span>
                            </div>
                            <div className="mt-4">
                                <p className="text-sm text-gray-500">Aktif Partner</p>
                                <p className="text-2xl font-bold text-gray-900">{activePartners}</p>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 p-6">
                            <div className="flex items-center justify-between">
                                <div className="p-2 bg-purple-100 rounded-lg">
                                    <DollarSign className="h-5 w-5 text-purple-600" />
                                </div>
                                <span className="inline-flex items-center text-sm font-medium text-green-600">
                                    <ArrowUpRight className="h-4 w-4 mr-1" />
                                    +18%
                                </span>
                            </div>
                            <div className="mt-4">
                                <p className="text-sm text-gray-500">Toplam Gelir</p>
                                <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalRevenue)}</p>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 p-6">
                            <div className="flex items-center justify-between">
                                <div className="p-2 bg-indigo-100 rounded-lg">
                                    <Users className="h-5 w-5 text-indigo-600" />
                                </div>
                            </div>
                            <div className="mt-4">
                                <p className="text-sm text-gray-500">Toplam Müşteri</p>
                                <p className="text-2xl font-bold text-gray-900">{totalCustomers}</p>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 p-6">
                            <div className="flex items-center justify-between">
                                <div className="p-2 bg-orange-100 rounded-lg">
                                    <Clock className="h-5 w-5 text-orange-600" />
                                </div>
                            </div>
                            <div className="mt-4">
                                <p className="text-sm text-gray-500">Bekleyen Ödeme</p>
                                <p className="text-2xl font-bold text-gray-900">{formatCurrency(pendingPayments)}</p>
                            </div>
                        </div>
                    </div>

                    {/* Tier Distribution & Top Partners */}
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                        {/* Tier Distribution */}
                        <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Partner Tier Dağılımı</h3>
                            <div className="space-y-4">
                                {(["platinum", "gold", "silver", "bronze"] as PartnerTier[]).map((tier) => {
                                    const count = partnersData.filter(p => p.tier === tier).length;
                                    const percentage = (count / totalPartners) * 100;
                                    return (
                                        <div key={tier} className="space-y-2">
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="flex items-center gap-2">
                                                    <span>{tierConfig[tier].icon}</span>
                                                    <span className="font-medium text-gray-900">{tierConfig[tier].label}</span>
                                                </span>
                                                <span className="text-gray-500">{count} partner ({percentage.toFixed(0)}%)</span>
                                            </div>
                                            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                                                <div
                                                    className={cn(
                                                        "h-full rounded-full",
                                                        tier === "platinum" && "bg-purple-500",
                                                        tier === "gold" && "bg-yellow-500",
                                                        tier === "silver" && "bg-gray-400",
                                                        tier === "bronze" && "bg-amber-500"
                                                    )}
                                                    style={{ width: `${percentage}%` }}
                                                />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Top Partners */}
                        <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-gray-900">En İyi Partnerler</h3>
                                <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                                    Tümünü Gör
                                </button>
                            </div>
                            <div className="space-y-4">
                                {[...partnersData]
                                    .sort((a, b) => b.totalRevenue - a.totalRevenue)
                                    .slice(0, 5)
                                    .map((partner, index) => (
                                        <div key={partner.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                            <div className="flex items-center gap-3">
                                                <div className={cn(
                                                    "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold",
                                                    index === 0 && "bg-yellow-100 text-yellow-700",
                                                    index === 1 && "bg-gray-100 text-gray-700",
                                                    index === 2 && "bg-amber-100 text-amber-700",
                                                    index > 2 && "bg-blue-100 text-blue-700"
                                                )}>
                                                    {index + 1}
                                                </div>
                                                <div>
                                                    <p className="font-medium text-gray-900">{partner.companyName}</p>
                                                    <p className="text-xs text-gray-500">{partner.activeCustomers} müşteri</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-semibold text-gray-900">{formatCurrency(partner.totalRevenue)}</p>
                                                <span className={cn(
                                                    "text-xs font-medium",
                                                    partner.monthlyGrowth >= 0 ? "text-green-600" : "text-red-600"
                                                )}>
                                                    {partner.monthlyGrowth >= 0 ? "+" : ""}{partner.monthlyGrowth}%
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>

                    {/* Partner Program Tiers */}
                    <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 p-6">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">Partner Programı Seviyeleri</h3>
                                <p className="text-sm text-gray-500">Tier bazlı komisyon oranları ve avantajlar</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                            {(["bronze", "silver", "gold", "platinum"] as PartnerTier[]).map((tier) => {
                                const benefits = tierBenefits[tier];
                                return (
                                    <div
                                        key={tier}
                                        className={cn(
                                            "rounded-xl border-2 p-5 transition-all hover:shadow-lg",
                                            tier === "platinum" && "border-purple-300 bg-gradient-to-br from-purple-50 to-indigo-50",
                                            tier === "gold" && "border-yellow-300 bg-gradient-to-br from-yellow-50 to-amber-50",
                                            tier === "silver" && "border-gray-300 bg-gradient-to-br from-gray-50 to-slate-50",
                                            tier === "bronze" && "border-amber-300 bg-gradient-to-br from-amber-50 to-orange-50"
                                        )}
                                    >
                                        <div className="flex items-center gap-2 mb-3">
                                            <span className="text-2xl">{tierConfig[tier].icon}</span>
                                            <span className="font-bold text-gray-900">{tierConfig[tier].label}</span>
                                        </div>
                                        <div className="mb-4">
                                            <span className={cn(
                                                "text-3xl font-bold",
                                                tier === "platinum" && "text-purple-600",
                                                tier === "gold" && "text-yellow-600",
                                                tier === "silver" && "text-gray-600",
                                                tier === "bronze" && "text-amber-600"
                                            )}>
                                                {benefits.commission}
                                            </span>
                                            <span className="text-sm text-gray-500 ml-1">komisyon</span>
                                        </div>
                                        <p className="text-xs text-gray-500 mb-3">{benefits.requirements}</p>
                                        <ul className="space-y-2">
                                            {benefits.features.map((feature, idx) => (
                                                <li key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                                                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}

            {/* Partners Tab */}
            {selectedTab === "partners" && (
                <div className="space-y-6">
                    {/* Filters */}
                    <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 p-4">
                        <div className="flex flex-wrap gap-4">
                            <div className="flex-1 min-w-[200px]">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Partner veya kişi ara..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>
                            <select
                                value={filterTier}
                                onChange={(e) => setFilterTier(e.target.value as PartnerTier | "all")}
                                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="all">Tüm Tier&apos;lar</option>
                                <option value="platinum">Platinum</option>
                                <option value="gold">Gold</option>
                                <option value="silver">Silver</option>
                                <option value="bronze">Bronze</option>
                            </select>
                            <select
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value as PartnerStatus | "all")}
                                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="all">Tüm Durumlar</option>
                                <option value="active">Aktif</option>
                                <option value="pending">Beklemede</option>
                                <option value="suspended">Askıda</option>
                                <option value="inactive">Pasif</option>
                            </select>
                        </div>
                    </div>

                    {/* Partners Table */}
                    <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Partner</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tier</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Durum</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Müşteri</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gelir</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Büyüme</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Son Aktivite</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">İşlemler</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {filteredPartners.map((partner) => (
                                        <tr key={partner.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 h-10 w-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">
                                                        {partner.companyName.charAt(0)}
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium text-gray-900">{partner.companyName}</div>
                                                        <div className="text-sm text-gray-500">{partner.contactPerson}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={cn(
                                                    "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border",
                                                    tierConfig[partner.tier].color
                                                )}>
                                                    {tierConfig[partner.tier].icon} {tierConfig[partner.tier].label}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={cn(
                                                    "inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium",
                                                    statusConfig[partner.status].color
                                                )}>
                                                    {statusConfig[partner.status].label}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {partner.activeCustomers}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                {formatCurrency(partner.totalRevenue)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={cn(
                                                    "inline-flex items-center text-sm font-medium",
                                                    partner.monthlyGrowth >= 0 ? "text-green-600" : "text-red-600"
                                                )}>
                                                    {partner.monthlyGrowth >= 0 ? (
                                                        <ArrowUpRight className="h-4 w-4 mr-1" />
                                                    ) : (
                                                        <ArrowDownRight className="h-4 w-4 mr-1" />
                                                    )}
                                                    {Math.abs(partner.monthlyGrowth)}%
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {partner.lastActivity}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button
                                                        onClick={() => setSelectedPartner(partner)}
                                                        className="p-1.5 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                                                        title="Detay Görüntüle"
                                                    >
                                                        <Eye className="h-4 w-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleEditClick(partner)}
                                                        className="p-1.5 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                                                        title="Düzenle"
                                                    >
                                                        <Edit className="h-4 w-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteClick(partner)}
                                                        className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                                                        title="Sil"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            {/* Payments Tab */}
            {selectedTab === "payments" && (
                <div className="space-y-6">
                    {/* Payment Summary */}
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                        <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-6 text-white">
                            <div className="flex items-center gap-3 mb-4">
                                <CheckCircle className="h-8 w-8" />
                                <span className="text-lg font-medium">Ödenen</span>
                            </div>
                            <p className="text-3xl font-bold">{formatCurrency(2450000)}</p>
                            <p className="text-sm text-green-100 mt-1">Bu yıl toplam</p>
                        </div>
                        <div className="bg-gradient-to-br from-orange-500 to-amber-600 rounded-xl p-6 text-white">
                            <div className="flex items-center gap-3 mb-4">
                                <Clock className="h-8 w-8" />
                                <span className="text-lg font-medium">Bekleyen</span>
                            </div>
                            <p className="text-3xl font-bold">{formatCurrency(pendingPayments)}</p>
                            <p className="text-sm text-orange-100 mt-1">Onay bekliyor</p>
                        </div>
                        <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl p-6 text-white">
                            <div className="flex items-center gap-3 mb-4">
                                <Calendar className="h-8 w-8" />
                                <span className="text-lg font-medium">Bu Ay</span>
                            </div>
                            <p className="text-3xl font-bold">{formatCurrency(185000)}</p>
                            <p className="text-sm text-blue-100 mt-1">Aralık 2024</p>
                        </div>
                    </div>

                    {/* Recent Payments */}
                    <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-100">
                            <h3 className="text-lg font-semibold text-gray-900">Son Ödemeler</h3>
                        </div>
                        <div className="divide-y divide-gray-100">
                            {[
                                { partner: "Digital Solutions Ltd.", amount: 45000, date: "15.12.2024", status: "completed" },
                                { partner: "Tech Advisors", amount: 28000, date: "15.12.2024", status: "pending" },
                                { partner: "Cloud Expert Danışmanlık", amount: 12500, date: "14.12.2024", status: "completed" },
                                { partner: "E-Ticaret Pro", amount: 8500, date: "13.12.2024", status: "processing" },
                                { partner: "Fintech Partners", amount: 3200, date: "12.12.2024", status: "completed" },
                            ].map((payment, idx) => (
                                <div key={idx} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                                            <DollarSign className="h-5 w-5 text-gray-600" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-900">{payment.partner}</p>
                                            <p className="text-sm text-gray-500">{payment.date}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className={cn(
                                            "inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium",
                                            payment.status === "completed" && "bg-green-100 text-green-700",
                                            payment.status === "pending" && "bg-yellow-100 text-yellow-700",
                                            payment.status === "processing" && "bg-blue-100 text-blue-700"
                                        )}>
                                            {payment.status === "completed" && "Ödendi"}
                                            {payment.status === "pending" && "Bekliyor"}
                                            {payment.status === "processing" && "İşlemde"}
                                        </span>
                                        <span className="font-semibold text-gray-900">{formatCurrency(payment.amount)}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Customers Tab - Bayi Bazlı Müşteri Listesi */}
            {selectedTab === "customers" && (
                <div className="space-y-6">
                    {/* Partner Selection */}
                    <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 p-4">
                        <div className="flex items-center gap-4">
                            <label className="text-sm font-medium text-gray-700">Partner Seçin:</label>
                            <select className="flex-1 max-w-xs border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                                <option value="all">Tüm Partnerler</option>
                                {partnersData.map((p) => (
                                    <option key={p.id} value={p.id}>{p.companyName}</option>
                                ))}
                            </select>
                            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
                                Filtrele
                            </button>
                        </div>
                    </div>

                    {/* Partner Customer Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="bg-white rounded-xl p-5 shadow-sm ring-1 ring-gray-900/5">
                            <p className="text-sm text-gray-500">Toplam Müşteri</p>
                            <p className="text-2xl font-bold text-gray-900">{totalCustomers}</p>
                        </div>
                        <div className="bg-white rounded-xl p-5 shadow-sm ring-1 ring-gray-900/5">
                            <p className="text-sm text-gray-500">Aktif Müşteri</p>
                            <p className="text-2xl font-bold text-green-600">{Math.round(totalCustomers * 0.85)}</p>
                        </div>
                        <div className="bg-white rounded-xl p-5 shadow-sm ring-1 ring-gray-900/5">
                            <p className="text-sm text-gray-500">Bu Ay Yeni</p>
                            <p className="text-2xl font-bold text-blue-600">24</p>
                        </div>
                        <div className="bg-white rounded-xl p-5 shadow-sm ring-1 ring-gray-900/5">
                            <p className="text-sm text-gray-500">Churn Oranı</p>
                            <p className="text-2xl font-bold text-orange-600">%2.4</p>
                        </div>
                    </div>

                    {/* Customer Table */}
                    <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-100">
                            <h3 className="text-lg font-semibold text-gray-900">Bayi Müşteri Listesi</h3>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Müşteri</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Partner</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Paket</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Aylık Gelir</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Partner Komisyonu</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Kayıt Tarihi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {[
                                        { name: "TechSoft A.Ş.", partner: "Digital Solutions Ltd.", package: "Enterprise", revenue: 2500, commission: 625, date: "15.03.2024" },
                                        { name: "Moda Butik", partner: "Digital Solutions Ltd.", package: "Business", revenue: 990, commission: 247, date: "22.04.2024" },
                                        { name: "Lojistik Pro", partner: "Tech Advisors", package: "Enterprise", revenue: 2500, commission: 500, date: "10.05.2024" },
                                        { name: "E-Market", partner: "Tech Advisors", package: "Business", revenue: 990, commission: 198, date: "18.06.2024" },
                                        { name: "Cafe Corner", partner: "Cloud Expert Danışmanlık", package: "Starter", revenue: 299, commission: 45, date: "01.07.2024" },
                                    ].map((customer, idx) => (
                                        <tr key={idx} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 text-sm font-medium text-gray-900">{customer.name}</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">{customer.partner}</td>
                                            <td className="px-6 py-4">
                                                <span className={cn(
                                                    "px-2 py-1 rounded-full text-xs font-medium",
                                                    customer.package === "Enterprise" && "bg-purple-100 text-purple-700",
                                                    customer.package === "Business" && "bg-blue-100 text-blue-700",
                                                    customer.package === "Starter" && "bg-gray-100 text-gray-700"
                                                )}>
                                                    {customer.package}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm font-medium text-gray-900">{formatCurrency(customer.revenue)}</td>
                                            <td className="px-6 py-4 text-sm font-medium text-green-600">{formatCurrency(customer.commission)}</td>
                                            <td className="px-6 py-4 text-sm text-gray-500">{customer.date}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            {/* Commissions Tab - Komisyon Hesaplaması */}
            {selectedTab === "commissions" && (
                <div className="space-y-6">
                    {/* Commission Calculator */}
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Komisyon Hesaplayıcı</h3>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Partner</label>
                                <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm">
                                    {partnersData.map((p) => (
                                        <option key={p.id} value={p.id}>{p.companyName} (%{p.commissionRate})</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Satış Tutarı (₺)</label>
                                <input type="number" placeholder="10000" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Komisyon Oranı</label>
                                <input type="text" value="25%" disabled className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-gray-100" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Hesaplanan Komisyon</label>
                                <div className="w-full border-2 border-green-300 bg-green-50 rounded-lg px-3 py-2 text-lg font-bold text-green-700">
                                    ₺2.500
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Commission Summary */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-white rounded-xl p-5 shadow-sm ring-1 ring-gray-900/5">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 bg-green-100 rounded-lg">
                                    <CheckCircle className="h-5 w-5 text-green-600" />
                                </div>
                                <span className="text-sm text-gray-500">Bu Ay Ödenen</span>
                            </div>
                            <p className="text-2xl font-bold text-gray-900">{formatCurrency(185000)}</p>
                        </div>
                        <div className="bg-white rounded-xl p-5 shadow-sm ring-1 ring-gray-900/5">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 bg-orange-100 rounded-lg">
                                    <Clock className="h-5 w-5 text-orange-600" />
                                </div>
                                <span className="text-sm text-gray-500">Bekleyen Komisyon</span>
                            </div>
                            <p className="text-2xl font-bold text-gray-900">{formatCurrency(pendingPayments)}</p>
                        </div>
                        <div className="bg-white rounded-xl p-5 shadow-sm ring-1 ring-gray-900/5">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 bg-purple-100 rounded-lg">
                                    <TrendingUp className="h-5 w-5 text-purple-600" />
                                </div>
                                <span className="text-sm text-gray-500">Ort. Komisyon Oranı</span>
                            </div>
                            <p className="text-2xl font-bold text-gray-900">%{(partnersData.reduce((sum, p) => sum + p.commissionRate, 0) / partnersData.length).toFixed(1)}</p>
                        </div>
                    </div>

                    {/* Commission Breakdown by Partner */}
                    <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-100">
                            <h3 className="text-lg font-semibold text-gray-900">Partner Bazlı Komisyon Dağılımı</h3>
                        </div>
                        <div className="p-6">
                            <div className="space-y-4">
                                {partnersData.filter(p => p.status === "active").map((partner) => {
                                    const commission = partner.totalRevenue * (partner.commissionRate / 100);
                                    const percentage = (commission / totalRevenue) * 100;
                                    return (
                                        <div key={partner.id} className="space-y-2">
                                            <div className="flex items-center justify-between text-sm">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-medium text-gray-900">{partner.companyName}</span>
                                                    <span className="text-gray-400">%{partner.commissionRate}</span>
                                                </div>
                                                <span className="font-bold text-green-600">{formatCurrency(commission)}</span>
                                            </div>
                                            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"
                                                    style={{ width: `${Math.min(percentage * 2, 100)}%` }}
                                                />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Performance Tab - Satış Performans Raporu */}
            {selectedTab === "performance" && (
                <div className="space-y-6">
                    {/* Performance Overview */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl p-5 text-white">
                            <p className="text-sm text-blue-100">Toplam Satış</p>
                            <p className="text-2xl font-bold">{formatCurrency(totalRevenue)}</p>
                            <span className="text-xs text-blue-200">Bu yıl</span>
                        </div>
                        <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-5 text-white">
                            <p className="text-sm text-green-100">Ortalama Büyüme</p>
                            <p className="text-2xl font-bold">+{(partnersData.reduce((sum, p) => sum + p.monthlyGrowth, 0) / partnersData.length).toFixed(1)}%</p>
                            <span className="text-xs text-green-200">Aylık</span>
                        </div>
                        <div className="bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl p-5 text-white">
                            <p className="text-sm text-purple-100">Müşteri/Partner</p>
                            <p className="text-2xl font-bold">{Math.round(totalCustomers / activePartners)}</p>
                            <span className="text-xs text-purple-200">Ortalama</span>
                        </div>
                        <div className="bg-gradient-to-br from-orange-500 to-amber-600 rounded-xl p-5 text-white">
                            <p className="text-sm text-orange-100">Aktif Partner</p>
                            <p className="text-2xl font-bold">{activePartners}/{totalPartners}</p>
                            <span className="text-xs text-orange-200">Toplam</span>
                        </div>
                    </div>

                    {/* Partner Performance Ranking */}
                    <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-100">
                            <h3 className="text-lg font-semibold text-gray-900">Partner Satış Performansı Sıralaması</h3>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sıra</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Partner</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tier</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Müşteri</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Satış</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Büyüme</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Performans</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {[...partnersData]
                                        .sort((a, b) => b.totalRevenue - a.totalRevenue)
                                        .map((partner, idx) => {
                                            const performanceScore = Math.min(100, ((partner.totalRevenue / 1500000) * 60) + ((partner.monthlyGrowth > 0 ? partner.monthlyGrowth : 0) * 2) + (partner.tier === "platinum" ? 20 : partner.tier === "gold" ? 15 : partner.tier === "silver" ? 10 : 5));
                                            return (
                                                <tr key={partner.id} className="hover:bg-gray-50">
                                                    <td className="px-6 py-4">
                                                        <div className={cn(
                                                            "w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm",
                                                            idx === 0 && "bg-yellow-100 text-yellow-700",
                                                            idx === 1 && "bg-gray-100 text-gray-700",
                                                            idx === 2 && "bg-amber-100 text-amber-700",
                                                            idx > 2 && "bg-blue-50 text-blue-600"
                                                        )}>
                                                            {idx + 1}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div>
                                                            <p className="font-medium text-gray-900">{partner.companyName}</p>
                                                            <p className="text-xs text-gray-500">{partner.contactPerson}</p>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className={cn(
                                                            "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border",
                                                            tierConfig[partner.tier].color
                                                        )}>
                                                            {tierConfig[partner.tier].icon} {tierConfig[partner.tier].label}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-gray-900">{partner.activeCustomers}</td>
                                                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{formatCurrency(partner.totalRevenue)}</td>
                                                    <td className="px-6 py-4">
                                                        <span className={cn(
                                                            "inline-flex items-center text-sm font-medium",
                                                            partner.monthlyGrowth >= 0 ? "text-green-600" : "text-red-600"
                                                        )}>
                                                            {partner.monthlyGrowth >= 0 ? (
                                                                <ArrowUpRight className="h-4 w-4 mr-1" />
                                                            ) : (
                                                                <ArrowDownRight className="h-4 w-4 mr-1" />
                                                            )}
                                                            {Math.abs(partner.monthlyGrowth)}%
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-2">
                                                            <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                                                                <div
                                                                    className={cn(
                                                                        "h-full rounded-full",
                                                                        performanceScore >= 70 && "bg-green-500",
                                                                        performanceScore >= 40 && performanceScore < 70 && "bg-yellow-500",
                                                                        performanceScore < 40 && "bg-red-500"
                                                                    )}
                                                                    style={{ width: `${performanceScore}%` }}
                                                                />
                                                            </div>
                                                            <span className="text-xs font-medium text-gray-600">{performanceScore.toFixed(0)}%</span>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Monthly Targets */}
                    <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Aylık Hedefler</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm text-gray-600">Yeni Müşteri Hedefi</span>
                                    <span className="text-sm font-medium text-gray-900">45/50</span>
                                </div>
                                <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-blue-500 rounded-full" style={{ width: '90%' }} />
                                </div>
                            </div>
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm text-gray-600">Satış Hedefi</span>
                                    <span className="text-sm font-medium text-gray-900">{formatCurrency(totalRevenue)}/₺3M</span>
                                </div>
                                <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-green-500 rounded-full" style={{ width: `${Math.min((totalRevenue / 3000000) * 100, 100)}%` }} />
                                </div>
                            </div>
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm text-gray-600">Partner Aktivasyonu</span>
                                    <span className="text-sm font-medium text-gray-900">{activePartners}/6</span>
                                </div>
                                <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-purple-500 rounded-full" style={{ width: `${(activePartners / 6) * 100}%` }} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Applications Tab */}
            {selectedTab === "applications" && (
                <div className="space-y-6">
                    {/* Pending Applications */}
                    <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-gray-900">Bekleyen Başvurular</h3>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                                3 yeni
                            </span>
                        </div>
                        <div className="divide-y divide-gray-100">
                            {[
                                {
                                    company: "Yazılım Atölyesi",
                                    contact: "Okan Yıldız",
                                    email: "okan@yazilimatölyesi.com",
                                    date: "14.12.2024",
                                    experience: "5 yıl muhasebe yazılımı deneyimi",
                                    expectedCustomers: "50+"
                                },
                                {
                                    company: "Mali Çözümler A.Ş.",
                                    contact: "Selin Acar",
                                    email: "selin@malicozumler.com",
                                    date: "13.12.2024",
                                    experience: "3 yıl ERP danışmanlığı",
                                    expectedCustomers: "20-50"
                                },
                                {
                                    company: "Dijital Dönüşüm Ltd.",
                                    contact: "Burak Eren",
                                    email: "burak@dijitaldönüsüm.com",
                                    date: "12.12.2024",
                                    experience: "2 yıl e-ticaret danışmanlığı",
                                    expectedCustomers: "10-20"
                                },
                            ].map((app, idx) => (
                                <div key={idx} className="p-6 hover:bg-gray-50">
                                    <div className="flex items-start justify-between">
                                        <div className="flex gap-4">
                                            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                                                {app.company.charAt(0)}
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-gray-900">{app.company}</h4>
                                                <p className="text-sm text-gray-500">{app.contact} • {app.email}</p>
                                                <div className="mt-2 flex flex-wrap gap-2">
                                                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-700">
                                                        {app.experience}
                                                    </span>
                                                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-700">
                                                        Hedef: {app.expectedCustomers} müşteri
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-end gap-2">
                                            <span className="text-sm text-gray-500">{app.date}</span>
                                            <div className="flex gap-2">
                                                <button className="px-3 py-1.5 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors">
                                                    Onayla
                                                </button>
                                                <button className="px-3 py-1.5 bg-white border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors">
                                                    İncele
                                                </button>
                                                <button className="px-3 py-1.5 bg-white border border-red-300 text-red-600 text-sm font-medium rounded-lg hover:bg-red-50 transition-colors">
                                                    Reddet
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Partner Detail Modal */}
            {selectedPartner && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
                    onClick={() => setSelectedPartner(null)}
                >
                    <div
                        className="w-full max-w-2xl bg-white rounded-xl shadow-xl overflow-hidden max-h-[90vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                                    {selectedPartner.companyName.charAt(0)}
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900">{selectedPartner.companyName}</h3>
                                    <span className={cn(
                                        "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border",
                                        tierConfig[selectedPartner.tier].color
                                    )}>
                                        {tierConfig[selectedPartner.tier].icon} {tierConfig[selectedPartner.tier].label}
                                    </span>
                                </div>
                            </div>
                            <button
                                onClick={() => setSelectedPartner(null)}
                                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                                title="Kapat"
                            >
                                <X className="h-5 w-5 text-gray-500" />
                            </button>
                        </div>
                        <div className="p-6 space-y-6">
                            {/* Contact Info */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex items-center gap-2 text-sm">
                                    <Users className="h-4 w-4 text-gray-400" />
                                    <span className="text-gray-500">İletişim:</span>
                                    <span className="font-medium text-gray-900">{selectedPartner.contactPerson}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <Mail className="h-4 w-4 text-gray-400" />
                                    <span className="font-medium text-gray-900">{selectedPartner.email}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <Phone className="h-4 w-4 text-gray-400" />
                                    <span className="font-medium text-gray-900">{selectedPartner.phone}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <MapPin className="h-4 w-4 text-gray-400" />
                                    <span className="font-medium text-gray-900">{selectedPartner.location}</span>
                                </div>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-4 gap-4">
                                <div className="p-4 bg-gray-50 rounded-lg text-center">
                                    <p className="text-2xl font-bold text-gray-900">{selectedPartner.activeCustomers}</p>
                                    <p className="text-xs text-gray-500">Aktif Müşteri</p>
                                </div>
                                <div className="p-4 bg-gray-50 rounded-lg text-center">
                                    <p className="text-2xl font-bold text-gray-900">{formatCurrency(selectedPartner.totalRevenue)}</p>
                                    <p className="text-xs text-gray-500">Toplam Gelir</p>
                                </div>
                                <div className="p-4 bg-gray-50 rounded-lg text-center">
                                    <p className="text-2xl font-bold text-gray-900">{selectedPartner.commissionRate}%</p>
                                    <p className="text-xs text-gray-500">Komisyon</p>
                                </div>
                                <div className="p-4 bg-gray-50 rounded-lg text-center">
                                    <p className="text-2xl font-bold text-orange-600">{formatCurrency(selectedPartner.pendingPayment)}</p>
                                    <p className="text-xs text-gray-500">Bekleyen Ödeme</p>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-3 pt-4 border-t border-gray-100">
                                <button className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
                                    <Mail className="h-4 w-4" />
                                    E-posta Gönder
                                </button>
                                <button className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                                    <FileText className="h-4 w-4" />
                                    Rapor Oluştur
                                </button>
                                <button className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                                    <ExternalLink className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                        {/* Footer with Close Button */}
                        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50">
                            <button
                                onClick={() => setSelectedPartner(null)}
                                className="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                            >
                                Kapat
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Yeni Partner Ekle Modal */}
            {isAddPartnerModalOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
                    onClick={() => setIsAddPartnerModalOpen(false)}
                >
                    <div
                        className="w-full max-w-lg bg-white rounded-xl shadow-xl overflow-hidden max-h-[90vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-green-50 to-emerald-50 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                                    <UserPlus className="h-5 w-5 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900">Yeni Partner Ekle</h3>
                                    <p className="text-sm text-gray-500">Partner programına yeni üye ekleyin</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsAddPartnerModalOpen(false)}
                                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                                title="Kapat"
                            >
                                <X className="h-5 w-5 text-gray-500" />
                            </button>
                        </div>
                        <div className="p-6 space-y-4">
                            {/* Şirket Adı */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Şirket Adı <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={newPartnerForm.companyName}
                                    onChange={(e) => setNewPartnerForm({ ...newPartnerForm, companyName: e.target.value })}
                                    placeholder="Örn: Digital Solutions Ltd."
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/* İletişim Kişisi */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    İletişim Kişisi <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={newPartnerForm.contactPerson}
                                    onChange={(e) => setNewPartnerForm({ ...newPartnerForm, contactPerson: e.target.value })}
                                    placeholder="Örn: Mehmet Kaya"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/* E-posta ve Telefon */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        E-posta <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        value={newPartnerForm.email}
                                        onChange={(e) => setNewPartnerForm({ ...newPartnerForm, email: e.target.value })}
                                        placeholder="ornek@sirket.com"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Telefon <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="tel"
                                        value={newPartnerForm.phone}
                                        onChange={(e) => setNewPartnerForm({ ...newPartnerForm, phone: e.target.value })}
                                        placeholder="+90 5XX XXX XX XX"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>

                            {/* Konum ve Tier */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Konum
                                    </label>
                                    <input
                                        type="text"
                                        value={newPartnerForm.location}
                                        onChange={(e) => setNewPartnerForm({ ...newPartnerForm, location: e.target.value })}
                                        placeholder="Örn: İstanbul"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Başlangıç Tier
                                    </label>
                                    <select
                                        value={newPartnerForm.tier}
                                        onChange={(e) => setNewPartnerForm({ ...newPartnerForm, tier: e.target.value as PartnerTier })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="bronze">🥉 Bronze</option>
                                        <option value="silver">🥈 Silver</option>
                                        <option value="gold">🥇 Gold</option>
                                        <option value="platinum">💎 Platinum</option>
                                    </select>
                                </div>
                            </div>

                            {/* Notlar */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Notlar
                                </label>
                                <textarea
                                    value={newPartnerForm.notes}
                                    onChange={(e) => setNewPartnerForm({ ...newPartnerForm, notes: e.target.value })}
                                    placeholder="Partner hakkında ek bilgiler..."
                                    rows={3}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                                />
                            </div>

                            {/* Bilgi Notu */}
                            <div className="p-4 bg-blue-50 rounded-lg">
                                <p className="text-sm text-blue-700">
                                    <strong>Not:</strong> Yeni partner eklendiğinde, partner &quot;Beklemede&quot; durumunda başlayacak ve hesap bilgilerini içeren bir e-posta gönderilecektir.
                                </p>
                            </div>
                        </div>
                        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex gap-3">
                            <button
                                onClick={() => {
                                    // Here you would normally send the data to the backend
                                    console.log("New Partner:", newPartnerForm);
                                    setIsAddPartnerModalOpen(false);
                                    setNewPartnerForm({
                                        companyName: "",
                                        contactPerson: "",
                                        email: "",
                                        phone: "",
                                        location: "",
                                        tier: "bronze",
                                        notes: ""
                                    });
                                    alert("Partner başarıyla eklendi! (Demo)");
                                }}
                                disabled={!newPartnerForm.companyName || !newPartnerForm.contactPerson || !newPartnerForm.email || !newPartnerForm.phone}
                                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Partner Ekle
                            </button>
                            <button
                                onClick={() => setIsAddPartnerModalOpen(false)}
                                className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                            >
                                İptal
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Partner Düzenleme Modal */}
            {isEditModalOpen && partnerToEdit && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
                    onClick={() => setIsEditModalOpen(false)}
                >
                    <div
                        className="w-full max-w-lg bg-white rounded-xl shadow-xl overflow-hidden max-h-[90vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                                    <Edit className="h-5 w-5 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900">Partner Düzenle</h3>
                                    <p className="text-sm text-gray-500">{partnerToEdit.companyName}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsEditModalOpen(false)}
                                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                            >
                                <X className="h-5 w-5 text-gray-500" />
                            </button>
                        </div>
                        <div className="p-6 space-y-4">
                            {/* Şirket Adı */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Şirket Adı</label>
                                <input
                                    type="text"
                                    value={editForm.companyName}
                                    onChange={(e) => setEditForm({ ...editForm, companyName: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/* İletişim Kişisi */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">İletişim Kişisi</label>
                                <input
                                    type="text"
                                    value={editForm.contactPerson}
                                    onChange={(e) => setEditForm({ ...editForm, contactPerson: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/* E-posta ve Telefon */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">E-posta</label>
                                    <input
                                        type="email"
                                        value={editForm.email}
                                        onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Telefon</label>
                                    <input
                                        type="tel"
                                        value={editForm.phone}
                                        onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>

                            {/* Konum ve Tier */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Konum</label>
                                    <input
                                        type="text"
                                        value={editForm.location}
                                        onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Tier</label>
                                    <select
                                        value={editForm.tier}
                                        onChange={(e) => setEditForm({ ...editForm, tier: e.target.value as PartnerTier })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="bronze">🥉 Bronze</option>
                                        <option value="silver">🥈 Silver</option>
                                        <option value="gold">🥇 Gold</option>
                                        <option value="platinum">💎 Platinum</option>
                                    </select>
                                </div>
                            </div>

                            {/* Durum ve Komisyon */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Durum</label>
                                    <select
                                        value={editForm.status}
                                        onChange={(e) => setEditForm({ ...editForm, status: e.target.value as PartnerStatus })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="active">Aktif</option>
                                        <option value="pending">Beklemede</option>
                                        <option value="suspended">Askıda</option>
                                        <option value="inactive">Pasif</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Komisyon Oranı (%)</label>
                                    <input
                                        type="number"
                                        min="0"
                                        max="50"
                                        value={editForm.commissionRate}
                                        onChange={(e) => setEditForm({ ...editForm, commissionRate: Number(e.target.value) })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>

                            {/* Notlar */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Notlar</label>
                                <textarea
                                    value={editForm.notes}
                                    onChange={(e) => setEditForm({ ...editForm, notes: e.target.value })}
                                    placeholder="Değişiklik hakkında not ekleyin..."
                                    rows={3}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                                />
                            </div>
                        </div>
                        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex gap-3">
                            <button
                                onClick={() => {
                                    console.log("Updating Partner:", partnerToEdit.id, editForm);
                                    alert(`${editForm.companyName} başarıyla güncellendi! (Demo)`);
                                    setIsEditModalOpen(false);
                                    setPartnerToEdit(null);
                                }}
                                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                            >
                                Kaydet
                            </button>
                            <button
                                onClick={() => setIsEditModalOpen(false)}
                                className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                            >
                                İptal
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Partner Silme Modal */}
            {isDeleteModalOpen && partnerToDelete && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
                    onClick={() => setIsDeleteModalOpen(false)}
                >
                    <div
                        className="w-full max-w-md bg-white rounded-xl shadow-xl overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-red-50 to-rose-50">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                                    <Trash2 className="h-5 w-5 text-red-600" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900">Partneri Sil</h3>
                                    <p className="text-sm text-gray-500">Bu işlem geri alınamaz</p>
                                </div>
                            </div>
                        </div>
                        <div className="p-6">
                            <p className="text-gray-700 mb-4">
                                <strong>{partnerToDelete.companyName}</strong> partnerini silmek istediğinizden emin misiniz?
                            </p>
                            <div className="p-4 bg-red-50 rounded-lg border border-red-100">
                                <p className="text-sm text-red-700">
                                    <strong>Uyarı:</strong> Bu işlem partnerin tüm verilerini, ödeme geçmişini ve müşteri ilişkilerini silecektir.
                                </p>
                            </div>
                        </div>
                        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex gap-3">
                            <button
                                onClick={() => {
                                    console.log("Deleting Partner:", partnerToDelete.id);
                                    alert(`${partnerToDelete.companyName} başarıyla silindi! (Demo)`);
                                    setIsDeleteModalOpen(false);
                                    setPartnerToDelete(null);
                                }}
                                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
                            >
                                Evet, Sil
                            </button>
                            <button
                                onClick={() => setIsDeleteModalOpen(false)}
                                className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                            >
                                İptal
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
