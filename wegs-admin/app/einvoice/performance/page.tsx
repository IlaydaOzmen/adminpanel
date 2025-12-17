"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PageContainer } from "@/components/layout/PageContainer";
import { PageHeader } from "@/components/layout/PageHeader";
import { PerformanceStats } from "@/components/einvoice/PerformanceStats";
import { PerformanceCharts } from "@/components/einvoice/PerformanceCharts";
import { ArrowLeft, Calendar, Download } from "lucide-react";
import { cn } from "@/lib/utils";

// Mock Data Generators
const generateTrendData = (period: string) => {
    if (period === "today") {
        return Array.from({ length: 24 }).map((_, i) => ({
            date: `${String(i).padStart(2, '0')}:00`,
            count: Math.floor(Math.random() * 50) + 10,
            amount: Math.floor(Math.random() * 50000) + 5000,
        }));
    }

    if (period.startsWith("q")) {
        const months = period === "q1" ? ["Oca", "Şub", "Mar"] :
            period === "q2" ? ["Nis", "May", "Haz"] :
                period === "q3" ? ["Tem", "Ağu", "Eyl"] :
                    ["Eki", "Kas", "Ara"];

        return months.map(m => ({
            date: m,
            count: Math.floor(Math.random() * 15000) + 5000,
            amount: Math.floor(Math.random() * 15000000) + 5000000,
        }));
    }

    const days = period === "7d" ? 7 : 30;
    return Array.from({ length: days }).map((_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - (days - 1 - i));
        return {
            date: `${d.getDate()} ${d.toLocaleString('tr-TR', { month: 'short' })}`,
            count: Math.floor(Math.random() * 500) + 100,
            amount: Math.floor(Math.random() * 500000) + 50000,
        };
    });
};

const moduleData = [
    { name: "E-Ticaret", value: 70, color: "#f59e0b" },
    { name: "Muhasebe", value: 30, color: "#3b82f6" },
];

const sectorData = [
    { name: "Perakende", volume: 1250000 },
    { name: "Teknoloji", volume: 980000 },
    { name: "Lojistik", volume: 750000 },
    { name: "Gıda", volume: 620000 },
    { name: "Hizmet", volume: 450000 },
];

export default function EInvoicePerformancePage() {
    const router = useRouter();
    const [period, setPeriod] = useState("30d");

    // Mock stats based on period
    const getStats = (p: string) => {
        const baseStats = {
            totalTaxpayers: 2450,
            activeRate: 94.5,
            avgInvoiceAmount: 4250,
            dailyVolume: 850000,
        };

        let multiplier = 1;
        if (p === "today") multiplier = 0.03;
        if (p === "7d") multiplier = 0.25;
        if (p === "30d") multiplier = 1;
        if (p.startsWith("q")) multiplier = 3;

        return {
            ...baseStats,
            totalInvoices: Math.floor(54200 * multiplier),
        };
    };

    const stats = getStats(period);

    const trends = {
        taxpayers: 5.2,
        activeRate: 1.2,
        invoices: 12.5,
        amount: 8.4,
        volume: 15.3,
    };

    return (
        <PageContainer>
            <PageHeader
                title="E-Fatura İşlem Performansı"
                description="E-fatura kullanım istatistikleri, trend analizleri ve performans raporları."
            >
                <div className="flex gap-2">
                    <button
                        onClick={() => router.back()}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Geri Dön
                    </button>
                    <button className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                        <Download className="h-4 w-4" />
                        Rapor İndir
                    </button>
                </div>
            </PageHeader>

            {/* Date Filters */}
            <div className="flex flex-wrap items-center gap-2 mb-6 bg-white p-2 rounded-xl border border-gray-200 shadow-sm w-fit">
                {[
                    { id: "today", label: "Bugün" },
                    { id: "7d", label: "Son 7 Gün" },
                    { id: "30d", label: "Son 30 Gün" },
                    { id: "q1", label: "1. Çeyrek" },
                    { id: "q2", label: "2. Çeyrek" },
                    { id: "q3", label: "3. Çeyrek" },
                    { id: "q4", label: "4. Çeyrek" },
                ].map((p) => (
                    <button
                        key={p.id}
                        onClick={() => setPeriod(p.id)}
                        className={cn(
                            "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                            period === p.id
                                ? "bg-blue-50 text-blue-700 font-semibold"
                                : "text-gray-600 hover:bg-gray-50"
                        )}
                    >
                        {p.label}
                    </button>
                ))}
            </div>

            <div className="space-y-6">
                <PerformanceStats data={stats} trends={trends} />
                <PerformanceCharts
                    trendData={generateTrendData(period)}
                    moduleData={moduleData}
                    sectorData={sectorData}
                />
            </div>
        </PageContainer>
    );
}
