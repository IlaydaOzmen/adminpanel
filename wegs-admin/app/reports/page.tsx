"use client";

import { useState } from "react";
import { PageContainer } from "@/components/layout/PageContainer";
import { PageHeader } from "@/components/layout/PageHeader";
import { KPICard } from "@/components/reports/KPICard";
import { ReportFilters } from "@/components/reports/ReportFilters";
import { ReportExporter } from "@/components/reports/ReportExporter";
import { ReportBuilderModal } from "@/components/reports/ReportBuilderModal";
import { ModuleUsageStats } from "@/components/reports/ModuleUsageStats";
import { ExpiringLicenses } from "@/components/reports/ExpiringLicenses";
import {
    Users,
    UserCheck,
    TrendingUp,
    CreditCard,
    FileText,
    ShoppingCart,
    HeadphonesIcon,
    AlertTriangle,
    Clock,
    BarChart3,
    Settings2,
} from "lucide-react";

interface KPIData {
    id: string;
    title: string;
    value: string | number;
    change?: string;
    changeType?: "positive" | "negative" | "neutral";
    icon: React.ElementType;
    iconColor: string;
    bgColor: string;
    category: string;
}

const allKPIs: KPIData[] = [
    {
        id: "total-customers",
        title: "Toplam Müşteri",
        value: "2,543",
        change: "+12.5%",
        changeType: "positive",
        icon: Users,
        iconColor: "text-blue-600",
        bgColor: "bg-blue-50",
        category: "users",
    },
    {
        id: "active-users",
        title: "Aktif Kullanıcı",
        value: "1,842",
        change: "+8.2%",
        changeType: "positive",
        icon: UserCheck,
        iconColor: "text-green-600",
        bgColor: "bg-green-50",
        category: "users",
    },
    {
        id: "monthly-revenue",
        title: "Aylık Gelir",
        value: "₺1,245,000",
        change: "+15.3%",
        changeType: "positive",
        icon: TrendingUp,
        iconColor: "text-emerald-600",
        bgColor: "bg-emerald-50",
        category: "finance",
    },
    {
        id: "mrr",
        title: "MRR",
        value: "₺892,000",
        change: "+6.7%",
        changeType: "positive",
        icon: CreditCard,
        iconColor: "text-indigo-600",
        bgColor: "bg-indigo-50",
        category: "finance",
    },
    {
        id: "total-invoices",
        title: "Toplam Fatura",
        value: "14,203",
        change: "+22.4%",
        changeType: "positive",
        icon: FileText,
        iconColor: "text-cyan-600",
        bgColor: "bg-cyan-50",
        category: "modules",
    },
    {
        id: "ecommerce-orders",
        title: "E-Ticaret Siparişi",
        value: "3,892",
        change: "+18.9%",
        changeType: "positive",
        icon: ShoppingCart,
        iconColor: "text-orange-600",
        bgColor: "bg-orange-50",
        category: "modules",
    },
    {
        id: "open-tickets",
        title: "Açık Destek Talebi",
        value: "42",
        change: "-5.2%",
        changeType: "positive",
        icon: HeadphonesIcon,
        iconColor: "text-purple-600",
        bgColor: "bg-purple-50",
        category: "support",
    },
    {
        id: "churn-risk",
        title: "Churn Riski",
        value: "24 Müşteri",
        change: "+3",
        changeType: "negative",
        icon: AlertTriangle,
        iconColor: "text-red-600",
        bgColor: "bg-red-50",
        category: "users",
    },
    {
        id: "avg-session",
        title: "Ort. Oturum Süresi",
        value: "12dk 30sn",
        change: "+1.2%",
        changeType: "positive",
        icon: Clock,
        iconColor: "text-teal-600",
        bgColor: "bg-teal-50",
        category: "users",
    },
    {
        id: "conversion-rate",
        title: "Dönüşüm Oranı",
        value: "%68.5",
        change: "+2.8%",
        changeType: "positive",
        icon: BarChart3,
        iconColor: "text-pink-600",
        bgColor: "bg-pink-50",
        category: "finance",
    },
];

export default function ReportsPage() {
    const [selectedKPIs, setSelectedKPIs] = useState<Set<string>>(new Set(allKPIs.map((k) => k.id)));
    const [dateRange, setDateRange] = useState({
        start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        end: new Date().toISOString().split("T")[0],
    });
    const [category, setCategory] = useState("all");
    const [isReportBuilderOpen, setIsReportBuilderOpen] = useState(false);

    const handleToggleKPI = (id: string, selected: boolean) => {
        setSelectedKPIs((prev) => {
            const newSet = new Set(prev);
            if (selected) {
                newSet.add(id);
            } else {
                newSet.delete(id);
            }
            return newSet;
        });
    };

    const handleSelectAll = () => {
        setSelectedKPIs(new Set(filteredKPIs.map((k) => k.id)));
    };

    const handleDeselectAll = () => {
        setSelectedKPIs(new Set());
    };

    const filteredKPIs = allKPIs.filter((kpi) => category === "all" || kpi.category === category);

    const selectedKPIData = allKPIs
        .filter((kpi) => selectedKPIs.has(kpi.id))
        .map((kpi) => ({
            id: kpi.id,
            title: kpi.title,
            value: kpi.value,
            category: kpi.category,
        }));

    return (
        <PageContainer>
            <PageHeader
                title="Raporlar ve KPI"
                description="Önemli metrikleri görüntüleyin ve raporları tek tuşla indirin."
            >
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setIsReportBuilderOpen(true)}
                        className="inline-flex items-center px-4 py-2.5 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
                    >
                        <Settings2 className="h-5 w-5 mr-2" />
                        Özel Rapor Oluştur
                    </button>
                    <ReportExporter selectedKPIs={selectedKPIData} dateRange={dateRange} />
                </div>
            </PageHeader>

            <ReportBuilderModal
                isOpen={isReportBuilderOpen}
                onClose={() => setIsReportBuilderOpen(false)}
            />

            {/* Filters */}
            <ReportFilters
                dateRange={dateRange}
                onDateRangeChange={setDateRange}
                category={category}
                onCategoryChange={setCategory}
                onSelectAll={handleSelectAll}
                onDeselectAll={handleDeselectAll}
                selectedCount={selectedKPIs.size}
                totalCount={filteredKPIs.length}
            />

            {/* KPI Cards Grid */}
            <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-700 mb-3">
                    KPI Kartları <span className="text-gray-400">(Rapora dahil etmek için seçin)</span>
                </h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                    {filteredKPIs.map((kpi) => (
                        <KPICard
                            key={kpi.id}
                            id={kpi.id}
                            title={kpi.title}
                            value={kpi.value}
                            change={kpi.change}
                            changeType={kpi.changeType}
                            icon={kpi.icon}
                            iconColor={kpi.iconColor}
                            bgColor={kpi.bgColor}
                            isSelected={selectedKPIs.has(kpi.id)}
                            onToggle={handleToggleKPI}
                            selectable={true}
                        />
                    ))}
                </div>
            </div>

            {/* Module Usage and Expiring Licenses */}
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ModuleUsageStats />
                <ExpiringLicenses />
            </div>
        </PageContainer>
    );
}
