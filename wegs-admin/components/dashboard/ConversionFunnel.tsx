"use client";

import { TrendingUp, TrendingDown, ArrowRight, Users, Target, CreditCard, Star, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const funnelData = [
    {
        name: "Web Ziyaretçisi",
        value: 12500,
        conversionRate: 100,
        icon: "🌐",
        color: "from-slate-400 to-slate-500",
        bgColor: "bg-slate-50",
        textColor: "text-slate-700"
    },
    {
        name: "Kayıtlı Kullanıcı",
        value: 4500,
        conversionRate: 36,
        icon: "📝",
        color: "from-blue-400 to-blue-500",
        bgColor: "bg-blue-50",
        textColor: "text-blue-700"
    },
    {
        name: "Aktif Deneme",
        value: 3200,
        conversionRate: 71,
        icon: "🚀",
        color: "from-indigo-400 to-indigo-500",
        bgColor: "bg-indigo-50",
        textColor: "text-indigo-700"
    },
    {
        name: "Ödeme Yapan",
        value: 1800,
        conversionRate: 56,
        icon: "💳",
        color: "from-purple-400 to-purple-500",
        bgColor: "bg-purple-50",
        textColor: "text-purple-700"
    },
    {
        name: "Sadık Müşteri",
        value: 950,
        conversionRate: 53,
        icon: "⭐",
        color: "from-amber-400 to-amber-500",
        bgColor: "bg-amber-50",
        textColor: "text-amber-700"
    },
];

const insights = [
    { label: "Toplam Dönüşüm", value: "7.6%", trend: "up", change: "+0.8%" },
    { label: "Ort. Süre", value: "12 gün", trend: "down", change: "-2 gün" },
    { label: "Bu Ay Yeni", value: "128", trend: "up", change: "+23%" },
];

export function ConversionFunnel() {
    const maxValue = funnelData[0].value;

    return (
        <div className="rounded-xl bg-white p-6 shadow-sm border border-gray-100">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-lg font-semibold text-gray-900">Dönüşüm Hunisi</h3>
                    <p className="text-sm text-gray-500">Ziyaretçiden sadık müşteriye dönüşüm yolculuğu</p>
                </div>
                <div className="flex gap-2">
                    {insights.map((insight, idx) => (
                        <div key={idx} className="px-3 py-2 bg-gray-50 rounded-lg border border-gray-100">
                            <p className="text-xs text-gray-500">{insight.label}</p>
                            <div className="flex items-center gap-1">
                                <span className="text-sm font-bold text-gray-900">{insight.value}</span>
                                <span className={cn(
                                    "text-xs font-medium flex items-center",
                                    insight.trend === "up" ? "text-green-600" : "text-blue-600"
                                )}>
                                    {insight.trend === "up" ? <TrendingUp className="h-3 w-3 mr-0.5" /> : <TrendingDown className="h-3 w-3 mr-0.5" />}
                                    {insight.change}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Visual Funnel */}
            <div className="space-y-3">
                {funnelData.map((step, idx) => {
                    const widthPercent = (step.value / maxValue) * 100;
                    const isLast = idx === funnelData.length - 1;

                    return (
                        <div key={idx} className="relative group">
                            {/* Step Row */}
                            <div className="flex items-center gap-4">
                                {/* Step Number */}
                                <div className={cn(
                                    "flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-lg shadow-sm",
                                    step.bgColor
                                )}>
                                    {step.icon}
                                </div>

                                {/* Progress Bar Container */}
                                <div className="flex-1 relative">
                                    <div className="h-14 bg-gray-50 rounded-xl overflow-hidden relative">
                                        {/* Progress Bar */}
                                        <div
                                            className={cn(
                                                "h-full bg-gradient-to-r rounded-xl transition-all duration-500 flex items-center justify-between px-4",
                                                step.color
                                            )}
                                            style={{ width: `${widthPercent}%` }}
                                        >
                                            <div className="flex items-center gap-2">
                                                <span className="text-white font-semibold text-sm truncate">{step.name}</span>
                                            </div>
                                            <span className="text-white font-bold text-lg">{step.value.toLocaleString('tr-TR')}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Conversion Rate */}
                                <div className="flex-shrink-0 w-24 text-right">
                                    {idx > 0 ? (
                                        <div className="flex flex-col items-end">
                                            <span className={cn(
                                                "text-lg font-bold",
                                                step.conversionRate >= 50 ? "text-green-600" : step.conversionRate >= 30 ? "text-amber-600" : "text-red-500"
                                            )}>
                                                {step.conversionRate}%
                                            </span>
                                            <span className="text-xs text-gray-400">önceki adımdan</span>
                                        </div>
                                    ) : (
                                        <span className="text-sm text-gray-400">Başlangıç</span>
                                    )}
                                </div>
                            </div>

                            {/* Connector Arrow */}
                            {!isLast && (
                                <div className="absolute left-5 top-14 h-3 flex items-center justify-center">
                                    <div className="w-0.5 h-full bg-gray-200" />
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Bottom Summary */}
            <div className="mt-6 pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-green-400 to-green-500" />
                            <span className="text-xs text-gray-500">≥50% dönüşüm</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-amber-400 to-amber-500" />
                            <span className="text-xs text-gray-500">30-50% dönüşüm</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-red-400 to-red-500" />
                            <span className="text-xs text-gray-500">&lt;30% dönüşüm</span>
                        </div>
                    </div>
                    <button className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
                        Detaylı Analiz <ChevronRight className="h-4 w-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}
