"use client";

import { Users, UserCheck, FileText, CreditCard, AlertTriangle, Clock, TrendingUp, TrendingDown, Activity, Zap, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { AreaChart, Area, ResponsiveContainer } from "recharts";

// Mini sparkline data for each card
const sparklineData = {
    customers: [
        { value: 2400 }, { value: 2450 }, { value: 2480 }, { value: 2510 }, { value: 2520 }, { value: 2543 }
    ],
    activeUsers: [
        { value: 1100 }, { value: 1180 }, { value: 1150 }, { value: 1220 }, { value: 1200 }, { value: 1234 }
    ],
    invoices: [
        { value: 12000 }, { value: 12500 }, { value: 13200 }, { value: 13800 }, { value: 14000 }, { value: 14203 }
    ],
    volume: [
        { value: 380000 }, { value: 420000 }, { value: 410000 }, { value: 440000 }, { value: 450000 }, { value: 452000 }
    ],
    churn: [
        { value: 30 }, { value: 28 }, { value: 26 }, { value: 25 }, { value: 24 }, { value: 24 }
    ],
    session: [
        { value: 10 }, { value: 10.5 }, { value: 11 }, { value: 11.5 }, { value: 12 }, { value: 12.5 }
    ],
};

const getStats = (period: string) => {
    const multiplier = period === "Bugün" ? 1 : period === "Bu Hafta" ? 7 : period === "Bu Ay" ? 30 : 1;

    return [
        {
            name: "Toplam Müşteri",
            value: (2543 + (multiplier * 5)).toLocaleString('tr-TR'),
            change: "+12.5%",
            changeType: "positive",
            icon: Users,
            sparkline: sparklineData.customers,
            gradient: "from-blue-500 to-blue-600",
            bgGradient: "from-blue-50 to-blue-100",
            iconBg: "bg-blue-100",
            iconColor: "text-blue-600",
            description: "Aktif abonelikler"
        },
        {
            name: "Aktif Kullanıcı",
            value: (1234 * (multiplier > 1 ? 1 : 1)).toLocaleString('tr-TR'),
            change: "+5.2%",
            changeType: "positive",
            icon: Activity,
            sparkline: sparklineData.activeUsers,
            gradient: "from-green-500 to-emerald-600",
            bgGradient: "from-green-50 to-emerald-100",
            iconBg: "bg-green-100",
            iconColor: "text-green-600",
            description: "Son 24 saat"
        },
        {
            name: "Toplam Fatura",
            value: (14203 * multiplier).toLocaleString('tr-TR'),
            change: "+22.4%",
            changeType: "positive",
            icon: FileText,
            sparkline: sparklineData.invoices,
            gradient: "from-indigo-500 to-violet-600",
            bgGradient: "from-indigo-50 to-violet-100",
            iconBg: "bg-indigo-100",
            iconColor: "text-indigo-600",
            description: "Bu dönem kesilen"
        },
        {
            name: "İşlem Hacmi",
            value: `₺${(452000 * multiplier).toLocaleString('tr-TR')}`,
            change: "+8.1%",
            changeType: "positive",
            icon: CreditCard,
            sparkline: sparklineData.volume,
            gradient: "from-purple-500 to-pink-600",
            bgGradient: "from-purple-50 to-pink-100",
            iconBg: "bg-purple-100",
            iconColor: "text-purple-600",
            description: "Günlük ortalama"
        },
        {
            name: "Churn Riski",
            value: "24",
            change: "-2.1%",
            changeType: "negative",
            icon: AlertTriangle,
            sparkline: sparklineData.churn,
            gradient: "from-red-500 to-orange-600",
            bgGradient: "from-red-50 to-orange-100",
            iconBg: "bg-red-100",
            iconColor: "text-red-600",
            description: "Takip gerektiren"
        },
        {
            name: "Oturum Süresi",
            value: "12dk 30sn",
            change: "+1.2%",
            changeType: "positive",
            icon: Clock,
            sparkline: sparklineData.session,
            gradient: "from-amber-500 to-yellow-600",
            bgGradient: "from-amber-50 to-yellow-100",
            iconBg: "bg-amber-100",
            iconColor: "text-amber-600",
            description: "Ortalama süre"
        },
    ];
};

interface AnalyticsCardsProps {
    datePeriod: string;
    comparisonMode: string | null;
}

export function AnalyticsCards({ datePeriod, comparisonMode }: AnalyticsCardsProps) {
    const stats = getStats(datePeriod);

    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {stats.map((stat, idx) => (
                <div
                    key={stat.name}
                    className="relative overflow-hidden rounded-xl bg-white p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 group"
                >
                    {/* Background Gradient Decoration */}
                    <div className={cn(
                        "absolute -right-8 -top-8 w-24 h-24 rounded-full opacity-10 blur-2xl transition-opacity group-hover:opacity-20",
                        `bg-gradient-to-br ${stat.gradient}`
                    )} />

                    {/* Header */}
                    <div className="flex items-center justify-between mb-3">
                        <div className={cn("p-2 rounded-xl", stat.iconBg)}>
                            <stat.icon className={cn("h-5 w-5", stat.iconColor)} />
                        </div>
                        <span
                            className={cn(
                                "inline-flex items-center text-xs font-semibold px-2 py-0.5 rounded-full",
                                stat.changeType === "positive"
                                    ? "text-green-700 bg-green-50"
                                    : stat.name === "Churn Riski"
                                        ? "text-green-700 bg-green-50"
                                        : "text-red-700 bg-red-50"
                            )}
                        >
                            {stat.changeType === "positive" || stat.name === "Churn Riski" ? (
                                <ArrowUpRight className="h-3 w-3 mr-0.5" />
                            ) : (
                                <ArrowDownRight className="h-3 w-3 mr-0.5" />
                            )}
                            {stat.change}
                        </span>
                    </div>

                    {/* Value */}
                    <div className="mb-1">
                        <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{stat.description}</p>
                    </div>

                    {/* Sparkline */}
                    <div className="h-10 w-full mt-2">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={stat.sparkline}>
                                <defs>
                                    <linearGradient id={`gradient-${idx}`} x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor={stat.changeType === "positive" ? "#22c55e" : "#ef4444"} stopOpacity={0.3} />
                                        <stop offset="100%" stopColor={stat.changeType === "positive" ? "#22c55e" : "#ef4444"} stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <Area
                                    type="monotone"
                                    dataKey="value"
                                    stroke={stat.changeType === "positive" || stat.name === "Churn Riski" ? "#22c55e" : "#ef4444"}
                                    strokeWidth={2}
                                    fill={`url(#gradient-${idx})`}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-50">
                        <span className="text-xs text-gray-400">{stat.name}</span>
                        <span className="text-xs text-gray-400">
                            {comparisonMode ? `vs ${comparisonMode}` : "vs geçen dönem"}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
}
