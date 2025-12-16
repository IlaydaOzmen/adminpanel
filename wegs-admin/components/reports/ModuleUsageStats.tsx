"use client";

import {
    Cpu,
    FileText,
    ShoppingCart,
    Calculator,
    BarChart3,
    Users,
    TrendingUp,
    TrendingDown
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ModuleData {
    name: string;
    icon: React.ElementType;
    activeUsers: number;
    totalUsers: number;
    usagePercent: number;
    trend: "up" | "down" | "stable";
    trendValue: string;
    color: string;
}

const modules: ModuleData[] = [
    {
        name: "E-Fatura",
        icon: FileText,
        activeUsers: 1842,
        totalUsers: 2543,
        usagePercent: 72,
        trend: "up",
        trendValue: "+5.2%",
        color: "blue",
    },
    {
        name: "E-Ticaret",
        icon: ShoppingCart,
        activeUsers: 956,
        totalUsers: 2543,
        usagePercent: 38,
        trend: "up",
        trendValue: "+12.8%",
        color: "orange",
    },
    {
        name: "Muhasebe",
        icon: Calculator,
        activeUsers: 2103,
        totalUsers: 2543,
        usagePercent: 83,
        trend: "stable",
        trendValue: "+0.5%",
        color: "green",
    },
    {
        name: "Raporlama",
        icon: BarChart3,
        activeUsers: 1567,
        totalUsers: 2543,
        usagePercent: 62,
        trend: "up",
        trendValue: "+8.1%",
        color: "purple",
    },
    {
        name: "Stok Yönetimi",
        icon: Cpu,
        activeUsers: 723,
        totalUsers: 2543,
        usagePercent: 28,
        trend: "down",
        trendValue: "-2.3%",
        color: "red",
    },
    {
        name: "CRM",
        icon: Users,
        activeUsers: 412,
        totalUsers: 2543,
        usagePercent: 16,
        trend: "up",
        trendValue: "+15.2%",
        color: "cyan",
    },
];

const colorClasses: Record<string, { bg: string; bar: string; text: string }> = {
    blue: { bg: "bg-blue-100", bar: "bg-blue-500", text: "text-blue-600" },
    orange: { bg: "bg-orange-100", bar: "bg-orange-500", text: "text-orange-600" },
    green: { bg: "bg-green-100", bar: "bg-green-500", text: "text-green-600" },
    purple: { bg: "bg-purple-100", bar: "bg-purple-500", text: "text-purple-600" },
    red: { bg: "bg-red-100", bar: "bg-red-500", text: "text-red-600" },
    cyan: { bg: "bg-cyan-100", bar: "bg-cyan-500", text: "text-cyan-600" },
};

export function ModuleUsageStats() {
    return (
        <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 p-6">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-lg font-semibold text-gray-900">Modül Kullanım İstatistikleri</h3>
                    <p className="text-sm text-gray-500 mt-1">Hangi modüller ne kadar kullanılıyor</p>
                </div>
                <div className="text-right">
                    <p className="text-sm text-gray-500">Toplam Kullanıcı</p>
                    <p className="text-xl font-bold text-gray-900">2,543</p>
                </div>
            </div>

            <div className="space-y-5">
                {modules.map((module) => {
                    const colors = colorClasses[module.color];
                    const Icon = module.icon;

                    return (
                        <div key={module.name} className="group">
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-3">
                                    <div className={cn("p-2 rounded-lg", colors.bg)}>
                                        <Icon className={cn("h-5 w-5", colors.text)} />
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">{module.name}</p>
                                        <p className="text-xs text-gray-500">
                                            {module.activeUsers.toLocaleString("tr-TR")} aktif kullanıcı
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="flex items-center gap-1">
                                        {module.trend === "up" && (
                                            <TrendingUp className="h-4 w-4 text-green-500" />
                                        )}
                                        {module.trend === "down" && (
                                            <TrendingDown className="h-4 w-4 text-red-500" />
                                        )}
                                        <span
                                            className={cn(
                                                "text-sm font-medium",
                                                module.trend === "up" && "text-green-600",
                                                module.trend === "down" && "text-red-600",
                                                module.trend === "stable" && "text-gray-500"
                                            )}
                                        >
                                            {module.trendValue}
                                        </span>
                                    </div>
                                    <span className="text-lg font-bold text-gray-900">
                                        %{module.usagePercent}
                                    </span>
                                </div>
                            </div>
                            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                <div
                                    className={cn(
                                        "h-full rounded-full transition-all duration-500 group-hover:opacity-80",
                                        colors.bar
                                    )}
                                    style={{ width: `${module.usagePercent}%` }}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
