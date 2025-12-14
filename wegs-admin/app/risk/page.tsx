"use client";

import { PageContainer } from "@/components/layout/PageContainer";
import { PageHeader } from "@/components/layout/PageHeader";
import { ChurnAlerts } from "@/components/risk/ChurnAlerts";
import { AutomationRules } from "@/components/risk/AutomationRules";
import { ShieldAlert, Zap, Users, TrendingDown, ArrowUp, Siren } from "lucide-react";
import { cn } from "@/lib/utils";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const riskDistribution = [
    { name: "Düşük Risk", value: 450, color: "#22c55e" },
    { name: "Orta Risk", value: 120, color: "#f59e0b" },
    { name: "Yüksek Risk", value: 45, color: "#ef4444" },
];

export default function RiskPage() {
    return (
        <PageContainer>
            <PageHeader title="Risk Analizi ve Otomasyon" description="Müşteri sağlığı, churn riskleri ve otomatik aksiyonlar.">
                <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                    Rapor İndir
                </button>
            </PageHeader>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex flex-col justify-between">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-red-50 rounded-lg">
                            <ShieldAlert className="h-6 w-6 text-red-600" />
                        </div>
                        <span className="flex items-center text-xs font-medium text-red-600 bg-red-100 px-2 py-0.5 rounded-full">
                            <ArrowUp className="w-3 h-3 mr-1" /> +12%
                        </span>
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-gray-900">45</h3>
                        <p className="text-sm font-medium text-gray-500">Yüksek Riskli Müşteri</p>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex flex-col justify-between">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-blue-50 rounded-lg">
                            <Zap className="h-6 w-6 text-blue-600" />
                        </div>
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-gray-900">128</h3>
                        <p className="text-sm font-medium text-gray-500">Otomasyon Tetiklendi (Bugün)</p>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex flex-col justify-between">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-green-50 rounded-lg">
                            <Users className="h-6 w-6 text-green-600" />
                        </div>
                        <span className="flex items-center text-xs font-medium text-green-600 bg-green-100 px-2 py-0.5 rounded-full">
                            <TrendingDown className="w-3 h-3 mr-1" /> -5%
                        </span>
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-gray-900">%2.4</h3>
                        <p className="text-sm font-medium text-gray-500">Aylık Churn Oranı</p>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex flex-col justify-between">
                    <div className="h-24 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={riskDistribution}>
                                <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                                <Bar dataKey="value" fill="#6366f1" radius={[4, 4, 0, 0]} barSize={40}>
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                    <p className="text-sm font-medium text-center text-gray-500 mt-2">Risk Dağılımı</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <ChurnAlerts />
                </div>
                <div>
                    <AutomationRules />
                </div>
            </div>
        </PageContainer>
    );
}
