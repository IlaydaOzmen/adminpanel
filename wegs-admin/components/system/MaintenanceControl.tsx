"use client";

import { useState } from "react";
import { AlertTriangle, Power, Clock, CalendarDays, Rocket, Wallet, Users, Server } from "lucide-react";
import { cn } from "@/lib/utils";

export function MaintenanceControl() {
    const [isMaintenance, setIsMaintenance] = useState(false);

    // Module States
    const [modules, setModules] = useState({
        finance: false,
        customers: false,
        api: false
    });

    const [plannedDate, setPlannedDate] = useState("");

    const toggleMaintenance = () => setIsMaintenance(!isMaintenance);

    const toggleModule = (key: keyof typeof modules) => {
        setModules(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <div className="bg-white dark:bg-gray-800 shadow-sm border border-gray-50 dark:border-gray-700 rounded-xl overflow-hidden p-6 space-y-8">
            {/* Site Wide Maintenance */}
            <div className="flex items-center justify-between p-4 bg-red-50 dark:bg-red-900/10 rounded-lg border border-red-100 dark:border-red-900/20">
                <div className="flex items-center space-x-4">
                    <div className={cn("p-2 rounded-lg", isMaintenance ? "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400" : "bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400")}>
                        <Power className="h-6 w-6" />
                    </div>
                    <div>
                        <h3 className="text-sm font-medium text-gray-900 dark:text-white">Site Genel Bakım Modu</h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Tüm kullanıcı erişimini keser. Sadece adminler girebilir.</p>
                    </div>
                </div>
                <button
                    onClick={toggleMaintenance}
                    className={cn(
                        "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2",
                        isMaintenance ? "bg-red-600" : "bg-gray-200 dark:bg-gray-700"
                    )}
                >
                    <span
                        className={cn(
                            "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
                            isMaintenance ? "translate-x-5" : "translate-x-0"
                        )}
                    />
                </button>
            </div>

            {/* Module Maintenance */}
            <div>
                <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                    <Rocket className="h-4 w-4 mr-2 text-blue-600" />
                    Modül Bazlı Bakım
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Finance Module */}
                    <div className={cn(
                        "flex flex-col p-4 border rounded-xl transition-all",
                        modules.finance ? "border-yellow-200 bg-yellow-50 dark:bg-yellow-900/10 dark:border-yellow-900/30" : "border-gray-50 dark:border-gray-700"
                    )}>
                        <div className="flex items-center justify-between mb-2">
                            <div className="p-2 bg-white dark:bg-gray-700 rounded-lg shadow-sm">
                                <Wallet className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                            </div>
                            <div
                                onClick={() => toggleModule('finance')}
                                className={cn("cursor-pointer px-2 py-1 rounded text-xs font-semibold", modules.finance ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-400" : "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400")}
                            >
                                {modules.finance ? "Bakımda" : "Aktif"}
                            </div>
                        </div>
                        <h4 className="font-medium text-gray-900 dark:text-white">Finans Modülü</h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Ödemeler ve fatura işlemleri durdurulur.</p>
                    </div>

                    {/* Customer Module */}
                    <div className={cn(
                        "flex flex-col p-4 border rounded-xl transition-all",
                        modules.customers ? "border-yellow-200 bg-yellow-50 dark:bg-yellow-900/10 dark:border-yellow-900/30" : "border-gray-50 dark:border-gray-700"
                    )}>
                        <div className="flex items-center justify-between mb-2">
                            <div className="p-2 bg-white dark:bg-gray-700 rounded-lg shadow-sm">
                                <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div
                                onClick={() => toggleModule('customers')}
                                className={cn("cursor-pointer px-2 py-1 rounded text-xs font-semibold", modules.customers ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-400" : "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400")}
                            >
                                {modules.customers ? "Bakımda" : "Aktif"}
                            </div>
                        </div>
                        <h4 className="font-medium text-gray-900 dark:text-white">Müşteri Paneli</h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Müşteri girişi ve profil düzenleme kapatılır.</p>
                    </div>

                    {/* API Module */}
                    <div className={cn(
                        "flex flex-col p-4 border rounded-xl transition-all",
                        modules.api ? "border-yellow-200 bg-yellow-50 dark:bg-yellow-900/10 dark:border-yellow-900/30" : "border-gray-50 dark:border-gray-700"
                    )}>
                        <div className="flex items-center justify-between mb-2">
                            <div className="p-2 bg-white dark:bg-gray-700 rounded-lg shadow-sm">
                                <Server className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                            </div>
                            <div
                                onClick={() => toggleModule('api')}
                                className={cn("cursor-pointer px-2 py-1 rounded text-xs font-semibold", modules.api ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-400" : "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400")}
                            >
                                {modules.api ? "Bakımda" : "Aktif"}
                            </div>
                        </div>
                        <h4 className="font-medium text-gray-900 dark:text-white">API Gateway</h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Dış dünya entegrasyonları duraklatılır.</p>
                    </div>
                </div>
            </div>

            {/* Planned Maintenance */}
            <div>
                <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                    <CalendarDays className="h-4 w-4 mr-2 text-purple-600" />
                    Planlı Bakım Zamanlayıcı
                </h3>
                <div className="flex gap-4 items-end">
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Bakım Tarihi ve Saati</label>
                        <div className="relative">
                            <input
                                type="datetime-local"
                                className="block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm p-2 border"
                                value={plannedDate}
                                onChange={(e) => setPlannedDate(e.target.value)}
                            />
                            <Clock className="absolute right-3 top-2.5 h-4 w-4 text-gray-400 pointer-events-none" />
                        </div>
                    </div>
                    <button className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700">
                        Zamanla
                    </button>
                </div>
                {plannedDate && (
                    <div className="mt-3 p-3 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 text-sm rounded-md flex items-center">
                        <AlertTriangle className="h-4 w-4 mr-2" />
                        Sistem {new Date(plannedDate).toLocaleString('tr-TR')} tarihinde bakıma alınacaktır.
                    </div>
                )}
            </div>
        </div>
    );
}
