"use client";

import { useState } from "react";
import { Zap, Clock, CheckCircle2, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

const initialRules = [
    { id: 1, condition: "7 gün giriş yok", action: "Satış Ekibini Bilgilendir", active: true },
    { id: 2, condition: "Entegrasyon kesildi", action: "WhatsApp & Mail Uyarısı", active: true },
    { id: 3, condition: "Lisans süresi 3 gün kaldı", action: "Otomatik E-posta & SMS", active: true },
    { id: 4, condition: "Yeni Müşteri Kaydı", action: "Hoşgeldin E-postası", active: false },
];

const recentActivity = [
    { id: 1, action: "WhatsApp Uyarısı Gönderildi", target: "Tech Start A.Ş.", time: "10 dk önce", status: "success" },
    { id: 2, action: "Satış Ekibi Bilgilendirildi", target: "Butik Tasarım", time: "45 dk önce", status: "success" },
    { id: 3, action: "Otomatik E-posta Başarısız", target: "Lojistik Ltd.", time: "1 saat önce", status: "failed" },
];

export function AutomationRules() {
    const [rules, setRules] = useState(initialRules);

    const toggleRule = (id: number) => {
        setRules(rules.map(rule => rule.id === id ? { ...rule, active: !rule.active } : rule));
    };

    return (
        <div className="space-y-6">
            {/* Automation Rules Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6 border-b border-gray-200 flex items-center justify-between bg-gray-50/50">
                    <div className="flex items-center space-x-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                            <Zap className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900">Otomasyon Kuralları</h3>
                            <p className="text-sm text-gray-500">Sistemin otomatik kararları</p>
                        </div>
                    </div>
                    <button className="text-sm font-medium text-blue-600 hover:text-blue-700">+ Yeni Kural</button>
                </div>
                <div className="divide-y divide-gray-100">
                    {rules.map((rule) => (
                        <div key={rule.id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                            <div className="flex-1">
                                <div className="flex items-center space-x-3">
                                    <span className={cn("w-2 h-2 rounded-full", rule.active ? "bg-green-500" : "bg-gray-300")} />
                                    <p className="text-sm font-medium text-gray-900">{rule.condition}</p>
                                </div>
                                <p className="text-xs text-gray-500 mt-1 ml-5">Aksiyon: {rule.action}</p>
                            </div>
                            <div className="flex items-center space-x-4">
                                <button
                                    onClick={() => toggleRule(rule.id)}
                                    className={cn(
                                        "relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none",
                                        rule.active ? "bg-blue-600" : "bg-gray-200"
                                    )}
                                >
                                    <span className={cn(
                                        "pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
                                        rule.active ? "translate-x-4" : "translate-x-0"
                                    )} />
                                </button>
                                <button className="text-gray-400 hover:text-gray-600">
                                    <MoreHorizontal className="h-5 w-5" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Activity Log Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-4 border-b border-gray-200 flex items-center space-x-2 bg-gray-50/50">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <h4 className="text-sm font-semibold text-gray-900">Son Aktiviteler</h4>
                </div>
                <div className="divide-y divide-gray-100">
                    {recentActivity.map((log) => (
                        <div key={log.id} className="p-3 flex items-start space-x-3 text-sm">
                            <div className={cn("mt-0.5 p-1 rounded-full", log.status === "success" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600")}>
                                {log.status === "success" ? <CheckCircle2 className="h-3 w-3" /> : <Clock className="h-3 w-3" />}
                            </div>
                            <div className="flex-1">
                                <p className="font-medium text-gray-900">{log.action}</p>
                                <p className="text-xs text-gray-500">{log.target}</p>
                            </div>
                            <span className="text-xs text-gray-400 whitespace-nowrap">{log.time}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
