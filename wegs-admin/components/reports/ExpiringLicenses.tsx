"use client";

import { AlertTriangle, Clock, Mail, User, Calendar, CreditCard } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface License {
    id: string;
    customerName: string;
    email: string;
    package: string;
    expiryDate: string;
    daysRemaining: number;
    autoRenewal: boolean;
}

const expiringLicenses: License[] = [
    {
        id: "1",
        customerName: "Atlas Lojistik",
        email: "info@atlaslojistik.com",
        package: "Enterprise",
        expiryDate: "2024-12-18",
        daysRemaining: 3,
        autoRenewal: false,
    },
    {
        id: "2",
        customerName: "Mega Market",
        email: "destek@megamarket.com",
        package: "Business",
        expiryDate: "2024-12-20",
        daysRemaining: 5,
        autoRenewal: false,
    },
    {
        id: "3",
        customerName: "TechSoft A.Ş.",
        email: "admin@techsoft.com.tr",
        package: "Enterprise",
        expiryDate: "2024-12-22",
        daysRemaining: 7,
        autoRenewal: true,
    },
    {
        id: "4",
        customerName: "Birlik Gıda",
        email: "muhasebe@birlikgida.com",
        package: "Starter",
        expiryDate: "2024-12-28",
        daysRemaining: 13,
        autoRenewal: false,
    },
    {
        id: "5",
        customerName: "Kaya Holding",
        email: "it@kayaholding.com",
        package: "Enterprise",
        expiryDate: "2025-01-05",
        daysRemaining: 21,
        autoRenewal: false,
    },
    {
        id: "6",
        customerName: "ABC Lojistik",
        email: "finans@abclojistik.com",
        package: "Business",
        expiryDate: "2025-01-10",
        daysRemaining: 26,
        autoRenewal: true,
    },
];

export function ExpiringLicenses() {
    const [sendingReminder, setSendingReminder] = useState<string | null>(null);

    const handleSendReminder = async (license: License) => {
        setSendingReminder(license.id);
        // Simulate sending reminder
        await new Promise((resolve) => setTimeout(resolve, 1500));
        alert(`${license.customerName} müşterisine hatırlatma e-postası gönderildi.`);
        setSendingReminder(null);
    };

    const criticalLicenses = expiringLicenses.filter((l) => l.daysRemaining <= 7);
    const warningLicenses = expiringLicenses.filter((l) => l.daysRemaining > 7 && l.daysRemaining <= 30);

    const getStatusColor = (days: number) => {
        if (days <= 3) return { bg: "bg-red-50", border: "border-red-200", text: "text-red-700", badge: "bg-red-100 text-red-800" };
        if (days <= 7) return { bg: "bg-orange-50", border: "border-orange-200", text: "text-orange-700", badge: "bg-orange-100 text-orange-800" };
        return { bg: "bg-yellow-50", border: "border-yellow-200", text: "text-yellow-700", badge: "bg-yellow-100 text-yellow-800" };
    };

    return (
        <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 p-6">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-red-100">
                        <AlertTriangle className="h-5 w-5 text-red-600" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900">Lisansı Bitmek Üzere Olanlar</h3>
                        <p className="text-sm text-gray-500">30 gün içinde sona erecek lisanslar</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        {criticalLicenses.length} Kritik
                    </span>
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        {warningLicenses.length} Uyarı
                    </span>
                </div>
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto">
                {expiringLicenses.map((license) => {
                    const colors = getStatusColor(license.daysRemaining);

                    return (
                        <div
                            key={license.id}
                            className={cn(
                                "p-4 rounded-lg border transition-all hover:shadow-sm",
                                colors.bg,
                                colors.border
                            )}
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="flex-shrink-0">
                                        <div className="h-10 w-10 rounded-full bg-white shadow-sm flex items-center justify-center">
                                            <User className="h-5 w-5 text-gray-400" />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <p className="font-medium text-gray-900">{license.customerName}</p>
                                            <span className={cn("px-2 py-0.5 rounded text-xs font-medium", colors.badge)}>
                                                {license.package}
                                            </span>
                                            {license.autoRenewal && (
                                                <span className="px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                                                    Oto. Yenileme
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-sm text-gray-500">{license.email}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="text-right">
                                        <div className="flex items-center gap-1 text-sm text-gray-500">
                                            <Calendar className="h-4 w-4" />
                                            {new Date(license.expiryDate).toLocaleDateString("tr-TR")}
                                        </div>
                                        <p className={cn("text-sm font-semibold mt-1", colors.text)}>
                                            <Clock className="h-3 w-3 inline mr-1" />
                                            {license.daysRemaining} gün kaldı
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => handleSendReminder(license)}
                                        disabled={sendingReminder === license.id}
                                        className={cn(
                                            "inline-flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                                            "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50",
                                            "disabled:opacity-50 disabled:cursor-not-allowed"
                                        )}
                                    >
                                        <Mail className="h-4 w-4 mr-1" />
                                        {sendingReminder === license.id ? "Gönderiliyor..." : "Hatırlat"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
