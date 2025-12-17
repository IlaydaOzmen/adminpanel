"use client";

import { Activity, Database, HardDrive, Cpu, MemoryStick, Wifi, RefreshCw, Trash2, Server } from "lucide-react";
import { cn } from "@/lib/utils";

const systemMetrics = {
    cpu: 34,
    memory: 68,
    disk: 45,
    uptime: "15 gün 4 saat",
    lastRestart: "2 Aralık 2024, 03:00",
};

const services = [
    { name: "PostgreSQL", status: "healthy", latency: "2ms" },
    { name: "Redis Cache", status: "healthy", latency: "0.5ms" },
    { name: "Queue Worker", status: "healthy", latency: "15ms" },
    { name: "Email Service", status: "degraded", latency: "850ms" },
    { name: "GIB Entegrasyonu", status: "healthy", latency: "120ms" },
];

const recentLogs = [
    { time: "22:15:32", level: "INFO", message: "Scheduled backup completed successfully." },
    { time: "22:10:05", level: "WARN", message: "Email service response time exceeded 500ms." },
    { time: "21:45:00", level: "INFO", message: "Cache cleared by admin user." },
    { time: "21:30:12", level: "ERROR", message: "Failed to connect to GIB API (retry 1/3)." },
    { time: "21:30:15", level: "INFO", message: "GIB API connection restored." },
];

export function SystemHealthDashboard() {
    const getStatusColor = (status: string) => {
        switch (status) {
            case "healthy": return "bg-green-500";
            case "degraded": return "bg-yellow-500";
            case "down": return "bg-red-500";
            default: return "bg-gray-500";
        }
    };

    const getLogLevelStyle = (level: string) => {
        switch (level) {
            case "INFO": return "text-blue-600 bg-blue-50";
            case "WARN": return "text-yellow-600 bg-yellow-50";
            case "ERROR": return "text-red-600 bg-red-50";
            default: return "text-gray-600 bg-gray-50";
        }
    };

    return (
        <div className="space-y-6">
            {/* System Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* CPU */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                    <div className="flex items-center justify-between mb-3">
                        <div className="p-2 bg-blue-50 rounded-lg">
                            <Cpu className="h-5 w-5 text-blue-600" />
                        </div>
                        <span className={cn(
                            "text-sm font-bold",
                            systemMetrics.cpu > 80 ? "text-red-600" : systemMetrics.cpu > 60 ? "text-yellow-600" : "text-green-600"
                        )}>
                            {systemMetrics.cpu}%
                        </span>
                    </div>
                    <h4 className="text-sm font-medium text-gray-500">CPU Kullanımı</h4>
                    <div className="mt-2 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                            className={cn("h-full rounded-full transition-all", systemMetrics.cpu > 80 ? "bg-red-500" : systemMetrics.cpu > 60 ? "bg-yellow-500" : "bg-green-500")}
                            style={{ width: `${systemMetrics.cpu}%` }}
                        />
                    </div>
                </div>

                {/* Memory */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                    <div className="flex items-center justify-between mb-3">
                        <div className="p-2 bg-purple-50 rounded-lg">
                            <MemoryStick className="h-5 w-5 text-purple-600" />
                        </div>
                        <span className={cn(
                            "text-sm font-bold",
                            systemMetrics.memory > 80 ? "text-red-600" : systemMetrics.memory > 60 ? "text-yellow-600" : "text-green-600"
                        )}>
                            {systemMetrics.memory}%
                        </span>
                    </div>
                    <h4 className="text-sm font-medium text-gray-500">Bellek Kullanımı</h4>
                    <div className="mt-2 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                            className={cn("h-full rounded-full transition-all", systemMetrics.memory > 80 ? "bg-red-500" : systemMetrics.memory > 60 ? "bg-yellow-500" : "bg-green-500")}
                            style={{ width: `${systemMetrics.memory}%` }}
                        />
                    </div>
                </div>

                {/* Disk */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                    <div className="flex items-center justify-between mb-3">
                        <div className="p-2 bg-orange-50 rounded-lg">
                            <HardDrive className="h-5 w-5 text-orange-600" />
                        </div>
                        <span className={cn(
                            "text-sm font-bold",
                            systemMetrics.disk > 80 ? "text-red-600" : systemMetrics.disk > 60 ? "text-yellow-600" : "text-green-600"
                        )}>
                            {systemMetrics.disk}%
                        </span>
                    </div>
                    <h4 className="text-sm font-medium text-gray-500">Disk Kullanımı</h4>
                    <div className="mt-2 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                            className={cn("h-full rounded-full transition-all", systemMetrics.disk > 80 ? "bg-red-500" : systemMetrics.disk > 60 ? "bg-yellow-500" : "bg-green-500")}
                            style={{ width: `${systemMetrics.disk}%` }}
                        />
                    </div>
                </div>

                {/* Uptime */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                    <div className="flex items-center justify-between mb-3">
                        <div className="p-2 bg-green-50 rounded-lg">
                            <Activity className="h-5 w-5 text-green-600" />
                        </div>
                        <span className="text-xs text-gray-400">Son yeniden başlatma</span>
                    </div>
                    <h4 className="text-sm font-medium text-gray-500">Uptime</h4>
                    <p className="text-lg font-bold text-gray-900 mt-1">{systemMetrics.uptime}</p>
                    <p className="text-xs text-gray-400 mt-1">{systemMetrics.lastRestart}</p>
                </div>
            </div>

            {/* Services & Quick Actions Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Service Status */}
                <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-base font-semibold text-gray-900 flex items-center">
                            <Server className="h-4 w-4 mr-2 text-blue-600" />
                            Servis Durumları
                        </h3>
                        <button className="text-xs text-blue-600 hover:underline flex items-center">
                            <RefreshCw className="h-3 w-3 mr-1" />
                            Yenile
                        </button>
                    </div>
                    <div className="space-y-3">
                        {services.map((service, idx) => (
                            <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <div className={cn("h-2.5 w-2.5 rounded-full", getStatusColor(service.status))} />
                                    <span className="text-sm font-medium text-gray-900">{service.name}</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="text-xs text-gray-500">{service.latency}</span>
                                    <span className={cn(
                                        "text-xs font-medium px-2 py-0.5 rounded",
                                        service.status === "healthy" ? "bg-green-100 text-green-700" :
                                            service.status === "degraded" ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"
                                    )}>
                                        {service.status === "healthy" ? "Sağlıklı" : service.status === "degraded" ? "Yavaş" : "Çökmüş"}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <h3 className="text-base font-semibold text-gray-900 mb-4">Hızlı İşlemler</h3>
                    <div className="space-y-3">
                        <button className="w-full flex items-center justify-between p-3 bg-blue-50 hover:bg-blue-100 rounded-lg text-blue-700 transition-colors">
                            <span className="text-sm font-medium">Cache Temizle</span>
                            <Trash2 className="h-4 w-4" />
                        </button>
                        <button className="w-full flex items-center justify-between p-3 bg-purple-50 hover:bg-purple-100 rounded-lg text-purple-700 transition-colors">
                            <span className="text-sm font-medium">Queue Yeniden Başlat</span>
                            <RefreshCw className="h-4 w-4" />
                        </button>
                        <button className="w-full flex items-center justify-between p-3 bg-orange-50 hover:bg-orange-100 rounded-lg text-orange-700 transition-colors">
                            <span className="text-sm font-medium">Veritabanı Optimize</span>
                            <Database className="h-4 w-4" />
                        </button>
                        <button className="w-full flex items-center justify-between p-3 bg-green-50 hover:bg-green-100 rounded-lg text-green-700 transition-colors">
                            <span className="text-sm font-medium">Bağlantı Testi</span>
                            <Wifi className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Recent Logs */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-base font-semibold text-gray-900 mb-4">Son Sistem Logları</h3>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead>
                            <tr>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Zaman</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Seviye</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Mesaj</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {recentLogs.map((log, idx) => (
                                <tr key={idx} className="hover:bg-gray-50">
                                    <td className="px-4 py-3 text-sm font-mono text-gray-500">{log.time}</td>
                                    <td className="px-4 py-3">
                                        <span className={cn("text-xs font-semibold px-2 py-1 rounded", getLogLevelStyle(log.level))}>
                                            {log.level}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-sm text-gray-700">{log.message}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
