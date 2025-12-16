"use client";

import { useState } from "react";
import {
    ShoppingCart,
    AlertCircle,
    ChevronRight,
    TrendingUp,
    X,
    Mail,
    Phone,
    Store,
    Sparkles,
    Target
} from "lucide-react";
import { cn } from "@/lib/utils";

interface OpportunityUser {
    name: string;
    platform: string;
    issue: string;
    monthlySales: number;
    potentialRevenue: number;
    email?: string;
    phone?: string;
}

const opportunityUsers: OpportunityUser[] = [
    {
        name: "Moda Butik",
        platform: "Trendyol",
        issue: "Fatura Kesmiyor",
        monthlySales: 45000,
        potentialRevenue: 2250,
        email: "info@modabutik.com",
        phone: "+90 532 123 4567"
    },
    {
        name: "Tekno Store",
        platform: "Hepsiburada",
        issue: "Fatura Kesmiyor",
        monthlySales: 78000,
        potentialRevenue: 3900,
        email: "satis@teknostore.com",
        phone: "+90 533 234 5678"
    },
    {
        name: "Evim Dünyası",
        platform: "N11",
        issue: "Fatura Kesmiyor",
        monthlySales: 32000,
        potentialRevenue: 1600,
        email: "iletisim@evimdunyasi.com",
        phone: "+90 534 345 6789"
    },
    {
        name: "Spor Outlet",
        platform: "Amazon",
        issue: "Fatura Kesmiyor",
        monthlySales: 56000,
        potentialRevenue: 2800,
        email: "info@sporoutlet.com",
        phone: "+90 535 456 7890"
    },
    {
        name: "Kozmetik Plus",
        platform: "Trendyol",
        issue: "Fatura Kesmiyor",
        monthlySales: 89000,
        potentialRevenue: 4450,
        email: "satis@kozmetikplus.com",
        phone: "+90 536 567 8901"
    },
    {
        name: "Kitap Dünyası",
        platform: "GittiGidiyor",
        issue: "Fatura Kesmiyor",
        monthlySales: 23000,
        potentialRevenue: 1150,
        email: "info@kitapdunyasi.com",
        phone: "+90 537 678 9012"
    },
];

const platformColors: Record<string, { bg: string; text: string; gradient: string }> = {
    "Trendyol": { bg: "bg-orange-100", text: "text-orange-700", gradient: "from-orange-500 to-red-500" },
    "Hepsiburada": { bg: "bg-red-100", text: "text-red-700", gradient: "from-red-500 to-rose-500" },
    "N11": { bg: "bg-green-100", text: "text-green-700", gradient: "from-green-500 to-emerald-500" },
    "Amazon": { bg: "bg-blue-100", text: "text-blue-700", gradient: "from-blue-500 to-indigo-500" },
    "GittiGidiyor": { bg: "bg-purple-100", text: "text-purple-700", gradient: "from-purple-500 to-violet-500" },
};

export function OpportunityList() {
    const [selectedUser, setSelectedUser] = useState<OpportunityUser | null>(null);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const totalPotential = opportunityUsers.reduce((sum, u) => sum + u.potentialRevenue, 0);
    const totalMonthlySales = opportunityUsers.reduce((sum, u) => sum + u.monthlySales, 0);

    return (
        <div className="rounded-xl bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 p-6 shadow-lg ring-1 ring-orange-200/50 relative overflow-hidden">
            {/* Background decorations */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-orange-200/30 to-red-200/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-amber-200/30 to-orange-200/30 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

            {/* Header */}
            <div className="relative mb-5">
                <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl shadow-lg shadow-orange-200">
                            <Target className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                                Satış Fırsatları
                                <Sparkles className="w-4 h-4 text-amber-500" />
                            </h3>
                            <p className="text-xs text-gray-500">Pazaryeri var, e-fatura yok</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-xs text-gray-500">Potansiyel Gelir</p>
                        <p className="text-lg font-bold text-orange-600">₺{totalPotential.toLocaleString('tr-TR')}<span className="text-xs font-normal text-gray-400">/ay</span></p>
                    </div>
                </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 gap-3 mb-5">
                <div className="bg-white/60 backdrop-blur-sm rounded-xl p-3 border border-orange-100">
                    <div className="flex items-center gap-2">
                        <Store className="w-4 h-4 text-orange-500" />
                        <span className="text-xs text-gray-500">Toplam Müşteri</span>
                    </div>
                    <p className="text-xl font-bold text-gray-900 mt-1">{opportunityUsers.length}</p>
                </div>
                <div className="bg-white/60 backdrop-blur-sm rounded-xl p-3 border border-orange-100">
                    <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-green-500" />
                        <span className="text-xs text-gray-500">Aylık Satış</span>
                    </div>
                    <p className="text-xl font-bold text-gray-900 mt-1">₺{(totalMonthlySales / 1000).toFixed(0)}K</p>
                </div>
            </div>

            {/* User List */}
            <div className="space-y-2 relative">
                {opportunityUsers.slice(0, 4).map((user, idx) => {
                    const colors = platformColors[user.platform] || { bg: "bg-gray-100", text: "text-gray-700", gradient: "from-gray-500 to-slate-500" };
                    return (
                        <div
                            key={user.name}
                            onClick={() => setSelectedUser(user)}
                            onMouseEnter={() => setHoveredIndex(idx)}
                            onMouseLeave={() => setHoveredIndex(null)}
                            className={cn(
                                "flex items-center p-3 rounded-xl cursor-pointer transition-all duration-200 group border",
                                hoveredIndex === idx
                                    ? "bg-white shadow-md border-orange-200 scale-[1.02]"
                                    : "bg-white/70 border-transparent hover:bg-white hover:shadow-sm"
                            )}
                        >
                            <div className={cn(
                                "w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm bg-gradient-to-br mr-3 shadow-sm",
                                colors.gradient
                            )}>
                                {user.name.charAt(0)}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-gray-900 truncate">{user.name}</p>
                                <div className="flex items-center gap-2">
                                    <span className={cn("text-xs px-2 py-0.5 rounded-full font-medium", colors.bg, colors.text)}>
                                        {user.platform}
                                    </span>
                                    <span className="text-xs text-gray-400">₺{(user.monthlySales / 1000).toFixed(0)}K/ay</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="text-right hidden sm:block">
                                    <p className="text-xs text-gray-400">Potansiyel</p>
                                    <p className="text-sm font-bold text-orange-600">₺{user.potentialRevenue.toLocaleString('tr-TR')}</p>
                                </div>
                                <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-orange-500 transition-colors" />
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* See All Button */}
            <button className="w-full mt-4 py-3 px-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-medium text-sm hover:from-orange-600 hover:to-red-600 transition-all shadow-lg shadow-orange-200 flex items-center justify-center gap-2 group">
                <span>Tüm Fırsatları Gör ({opportunityUsers.length})</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Detail Modal */}
            {selectedUser && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                        {/* Header */}
                        <div className={cn(
                            "p-5 bg-gradient-to-r text-white",
                            platformColors[selectedUser.platform]?.gradient || "from-gray-500 to-slate-500"
                        )}>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-2xl font-bold">
                                        {selectedUser.name.charAt(0)}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold">{selectedUser.name}</h3>
                                        <p className="text-white/80 text-sm">{selectedUser.platform} Satıcısı</p>
                                    </div>
                                </div>
                                <button onClick={() => setSelectedUser(null)} className="p-2 hover:bg-white/20 rounded-full transition-colors">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="p-5 border-b border-gray-100">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 bg-gray-50 rounded-xl">
                                    <p className="text-xs text-gray-500 mb-1">Aylık Satış</p>
                                    <p className="text-xl font-bold text-gray-900">₺{selectedUser.monthlySales.toLocaleString('tr-TR')}</p>
                                </div>
                                <div className="p-4 bg-orange-50 rounded-xl">
                                    <p className="text-xs text-orange-600 mb-1">Potansiyel Gelir</p>
                                    <p className="text-xl font-bold text-orange-600">₺{selectedUser.potentialRevenue.toLocaleString('tr-TR')}<span className="text-sm font-normal">/ay</span></p>
                                </div>
                            </div>
                        </div>

                        {/* Issue Notice */}
                        <div className="px-5 py-4 bg-amber-50 border-y border-amber-100">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-amber-100 rounded-lg">
                                    <AlertCircle className="w-4 h-4 text-amber-600" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-amber-800">E-Fatura Kullanmıyor</p>
                                    <p className="text-xs text-amber-600">Aktif satış yapıyor ancak e-fatura entegrasyonu yok.</p>
                                </div>
                            </div>
                        </div>

                        {/* Contact Info */}
                        <div className="p-5 space-y-3">
                            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">İletişim Bilgileri</p>
                            <div className="space-y-2">
                                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                                    <Mail className="w-4 h-4 text-gray-400" />
                                    <span className="text-sm text-gray-700">{selectedUser.email}</span>
                                </div>
                                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                                    <Phone className="w-4 h-4 text-gray-400" />
                                    <span className="text-sm text-gray-700">{selectedUser.phone}</span>
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="p-5 bg-gray-50 border-t border-gray-100 flex gap-3">
                            <button
                                onClick={() => setSelectedUser(null)}
                                className="flex-1 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                                Kapat
                            </button>
                            <button
                                className="flex-1 px-4 py-2.5 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl text-sm font-medium text-white hover:from-orange-600 hover:to-red-600 transition-colors shadow-sm"
                            >
                                E-Fatura Teklifi Gönder
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
