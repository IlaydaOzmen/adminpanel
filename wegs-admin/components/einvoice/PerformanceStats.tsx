"use client";


import {
    Users,
    Activity,
    FileText,
    CreditCard,
    TrendingUp,
    TrendingDown,
    DollarSign
} from "lucide-react";
import { cn } from "@/lib/utils";

interface PerformanceStatsProps {
    data: {
        totalTaxpayers: number;
        activeRate: number;
        totalInvoices: number;
        avgInvoiceAmount: number;
        dailyVolume: number;
    };
    trends: {
        taxpayers: number;
        activeRate: number;
        invoices: number;
        amount: number;
        volume: number;
    };
}

export function PerformanceStats({ data, trends }: PerformanceStatsProps) {
    const stats = [
        {
            title: "E-Fatura Mükellefi",
            value: data.totalTaxpayers.toLocaleString('tr-TR'),
            icon: Users,
            color: "text-blue-600",
            bgColor: "bg-blue-100",
            trend: trends.taxpayers,
            suffix: ""
        },
        {
            title: "Aktiflik Oranı",
            value: `%${data.activeRate}`,
            icon: Activity,
            color: "text-green-600",
            bgColor: "bg-green-100",
            trend: trends.activeRate,
            suffix: ""
        },
        {
            title: "Toplam Fatura",
            value: data.totalInvoices.toLocaleString('tr-TR'),
            icon: FileText,
            color: "text-purple-600",
            bgColor: "bg-purple-100",
            trend: trends.invoices,
            suffix: ""
        },
        {
            title: "Ort. Fatura Tutarı",
            value: `₺${data.avgInvoiceAmount.toLocaleString('tr-TR')}`,
            icon: CreditCard,
            color: "text-orange-600",
            bgColor: "bg-orange-100",
            trend: trends.amount,
            suffix: ""
        },
        {
            title: "Günlük İşlem Hacmi",
            value: `₺${data.dailyVolume.toLocaleString('tr-TR')}`,
            icon: DollarSign,
            color: "text-emerald-600",
            bgColor: "bg-emerald-100",
            trend: trends.volume,
            suffix: ""
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {stats.map((stat, index) => (
                <div key={index} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                        <div className={cn("p-2 rounded-lg", stat.bgColor)}>
                            <stat.icon className={cn("h-5 w-5", stat.color)} />
                        </div>
                        {stat.trend !== 0 && (
                            <div className={cn(
                                "flex items-center text-xs font-medium px-2 py-1 rounded-full",
                                stat.trend > 0 ? "text-green-700 bg-green-50" : "text-red-700 bg-red-50"
                            )}>
                                {stat.trend > 0 ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                                {Math.abs(stat.trend)}%
                            </div>
                        )}
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 font-medium">{stat.title}</p>
                        <h3 className="text-2xl font-bold text-gray-900 mt-1">
                            {stat.value}
                            <span className="text-sm font-normal text-gray-400 ml-1">{stat.suffix}</span>
                        </h3>
                    </div>
                </div>
            ))}
        </div>
    );
}
