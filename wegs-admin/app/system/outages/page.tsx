"use client";

import { useState } from "react";
import { PageContainer } from "@/components/layout/PageContainer";
import { PageHeader } from "@/components/layout/PageHeader";
import Link from "next/link";
import {
    AlertTriangle,
    CheckCircle2,
    Clock,
    XCircle,
    Server,
    Wifi,
    Database,
    Shield,
    Activity,
    TrendingUp,
    Calendar,
    RefreshCw,
    ExternalLink,
    ChevronRight
} from "lucide-react";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid
} from "recharts";
import { cn } from "@/lib/utils";

type IncidentStatus = "ongoing" | "resolved" | "investigating" | "all";
type IncidentSeverity = "critical" | "major" | "minor" | "all";

interface SystemIncident {
    id: string;
    title: string;
    description: string;
    status: "ongoing" | "resolved" | "investigating";
    severity: "critical" | "major" | "minor";
    affectedServices: string[];
    startTime: string;
    endTime?: string;
    duration?: string;
    updates: {
        time: string;
        message: string;
        status: string;
    }[];
}

const mockIncidents: SystemIncident[] = [
    {
        id: "INC-001",
        title: "E-Fatura Gönderim Gecikmesi",
        description: "GIB entegrasyonunda yaşanan yoğunluk nedeniyle e-fatura gönderimleri gecikmeli gerçekleşmektedir.",
        status: "resolved",
        severity: "major",
        affectedServices: ["E-Fatura", "E-Arşiv"],
        startTime: "2024-12-15T09:30:00",
        endTime: "2024-12-15T11:45:00",
        duration: "2 saat 15 dk",
        updates: [
            { time: "09:30", message: "E-Fatura gönderimlerinde gecikme tespit edildi.", status: "investigating" },
            { time: "10:00", message: "GIB sunucularındaki yoğunluk belirlendi.", status: "investigating" },
            { time: "11:45", message: "Sorun çözüldü, tüm sistemler normal çalışıyor.", status: "resolved" }
        ]
    },
    {
        id: "INC-002",
        title: "Banka Entegrasyonu Bağlantı Sorunu",
        description: "Ziraat Bankası ve İş Bankası entegrasyonlarında bağlantı problemi yaşanmaktadır.",
        status: "ongoing",
        severity: "critical",
        affectedServices: ["Banka Entegrasyonu", "Ödeme Takip"],
        startTime: "2024-12-16T14:20:00",
        updates: [
            { time: "14:20", message: "Banka bağlantılarında kesinti başladı.", status: "investigating" },
            { time: "14:45", message: "Ekipler sorunu inceliyor.", status: "investigating" }
        ]
    },
    {
        id: "INC-003",
        title: "Raporlama Modülü Performans Sorunu",
        description: "Raporlama modülünde yavaşlama yaşanmaktadır.",
        status: "investigating",
        severity: "minor",
        affectedServices: ["Raporlama"],
        startTime: "2024-12-16T10:00:00",
        updates: [
            { time: "10:00", message: "Kullanıcılardan yavaşlık bildirimi alındı.", status: "investigating" },
            { time: "10:30", message: "Veritabanı sorguları optimize ediliyor.", status: "investigating" }
        ]
    },
    {
        id: "INC-004",
        title: "API Gateway Kesintisi",
        description: "API Gateway'de yaşanan sorun nedeniyle entegrasyon istekleri başarısız olmuştur.",
        status: "resolved",
        severity: "critical",
        affectedServices: ["Tüm API Servisleri", "Entegratör Bağlantıları"],
        startTime: "2024-12-14T16:00:00",
        endTime: "2024-12-14T16:45:00",
        duration: "45 dk",
        updates: [
            { time: "16:00", message: "API Gateway erişim sorunu tespit edildi.", status: "investigating" },
            { time: "16:15", message: "Failover mekanizması devreye alındı.", status: "investigating" },
            { time: "16:45", message: "Sistem normal çalışmaya döndü.", status: "resolved" }
        ]
    },
    {
        id: "INC-005",
        title: "SSL Sertifika Yenileme",
        description: "Planlı bakım: SSL sertifikaları yenilenecektir.",
        status: "resolved",
        severity: "minor",
        affectedServices: ["Web Paneli"],
        startTime: "2024-12-13T02:00:00",
        endTime: "2024-12-13T02:15:00",
        duration: "15 dk",
        updates: [
            { time: "02:00", message: "Planlı bakım başladı.", status: "investigating" },
            { time: "02:15", message: "Sertifikalar yenilendi, sistem aktif.", status: "resolved" }
        ]
    }
];

// Uptime data for last 30 days
const uptimeData = [
    { day: "1", uptime: 100 },
    { day: "5", uptime: 99.9 },
    { day: "10", uptime: 99.5 },
    { day: "14", uptime: 98.2 },
    { day: "15", uptime: 99.8 },
    { day: "20", uptime: 100 },
    { day: "25", uptime: 99.9 },
    { day: "30", uptime: 99.7 },
];

const statusConfig = {
    ongoing: { label: "Devam Ediyor", color: "text-red-700", bgColor: "bg-red-100", icon: XCircle },
    investigating: { label: "İnceleniyor", color: "text-yellow-700", bgColor: "bg-yellow-100", icon: Clock },
    resolved: { label: "Çözüldü", color: "text-green-700", bgColor: "bg-green-100", icon: CheckCircle2 },
    all: { label: "Tümü", color: "text-gray-700", bgColor: "bg-gray-100", icon: Activity },
};

const severityConfig = {
    critical: { label: "Kritik", color: "text-red-600", bgColor: "bg-red-50", borderColor: "border-red-200" },
    major: { label: "Önemli", color: "text-orange-600", bgColor: "bg-orange-50", borderColor: "border-orange-200" },
    minor: { label: "Düşük", color: "text-yellow-600", bgColor: "bg-yellow-50", borderColor: "border-yellow-200" },
    all: { label: "Tümü", color: "text-gray-600", bgColor: "bg-gray-50", borderColor: "border-gray-200" },
};

export default function SystemOutagesPage() {
    const [statusFilter, setStatusFilter] = useState<IncidentStatus>("all");
    const [severityFilter, setSeverityFilter] = useState<IncidentSeverity>("all");
    const [expandedIncident, setExpandedIncident] = useState<string | null>(null);

    const filteredIncidents = mockIncidents.filter((incident) => {
        const matchesStatus = statusFilter === "all" || incident.status === statusFilter;
        const matchesSeverity = severityFilter === "all" || incident.severity === severityFilter;
        return matchesStatus && matchesSeverity;
    });

    // Statistics
    const ongoingCount = mockIncidents.filter(i => i.status === "ongoing").length;
    const investigatingCount = mockIncidents.filter(i => i.status === "investigating").length;
    const resolvedToday = mockIncidents.filter(i => i.status === "resolved").length;
    const avgUptime = uptimeData.reduce((sum, d) => sum + d.uptime, 0) / uptimeData.length;

    return (
        <PageContainer>
            <PageHeader title="Sistem Kesintileri Raporu" description="Sistem durumu, kesintiler ve bakım bildirimleri.">
                <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Yenile
                </button>
            </PageHeader>

            {/* System Status Banner */}
            {ongoingCount > 0 ? (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-red-100 rounded-lg">
                            <AlertTriangle className="h-6 w-6 text-red-600" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-red-900">Aktif Kesinti Mevcut</h3>
                            <p className="text-sm text-red-700">{ongoingCount} kesinti şu anda devam ediyor. Detaylar aşağıda.</p>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-100 rounded-lg">
                            <CheckCircle2 className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-green-900">Tüm Sistemler Çalışıyor</h3>
                            <p className="text-sm text-green-700">Şu anda aktif bir kesinti bulunmamaktadır.</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div
                    onClick={() => setStatusFilter("ongoing")}
                    className={cn(
                        "bg-white rounded-xl p-5 shadow-sm border cursor-pointer transition-all hover:shadow-md",
                        statusFilter === "ongoing" ? "border-red-500 ring-2 ring-red-200" : "border-gray-200"
                    )}
                >
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-red-100 rounded-xl">
                            <XCircle className="h-6 w-6 text-red-600" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-gray-900">{ongoingCount}</p>
                            <p className="text-sm text-gray-500">Aktif Kesinti</p>
                        </div>
                    </div>
                </div>

                <div
                    onClick={() => setStatusFilter("investigating")}
                    className={cn(
                        "bg-white rounded-xl p-5 shadow-sm border cursor-pointer transition-all hover:shadow-md",
                        statusFilter === "investigating" ? "border-yellow-500 ring-2 ring-yellow-200" : "border-gray-200"
                    )}
                >
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-yellow-100 rounded-xl">
                            <Clock className="h-6 w-6 text-yellow-600" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-gray-900">{investigatingCount}</p>
                            <p className="text-sm text-gray-500">İnceleniyor</p>
                        </div>
                    </div>
                </div>

                <div
                    onClick={() => setStatusFilter("resolved")}
                    className={cn(
                        "bg-white rounded-xl p-5 shadow-sm border cursor-pointer transition-all hover:shadow-md",
                        statusFilter === "resolved" ? "border-green-500 ring-2 ring-green-200" : "border-gray-200"
                    )}
                >
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-green-100 rounded-xl">
                            <CheckCircle2 className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-gray-900">{resolvedToday}</p>
                            <p className="text-sm text-gray-500">Çözüldü</p>
                        </div>
                    </div>
                </div>

                <div
                    onClick={() => setStatusFilter("all")}
                    className={cn(
                        "bg-white rounded-xl p-5 shadow-sm border cursor-pointer transition-all hover:shadow-md",
                        statusFilter === "all" ? "border-blue-500 ring-2 ring-blue-200" : "border-gray-200"
                    )}
                >
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-blue-100 rounded-xl">
                            <TrendingUp className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-gray-900">%{avgUptime.toFixed(1)}</p>
                            <p className="text-sm text-gray-500">30 Gün Uptime</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Uptime Chart */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Son 30 Gün Uptime Grafiği</h3>
                <div className="h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={uptimeData}>
                            <defs>
                                <linearGradient id="colorUptime" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                            <XAxis dataKey="day" axisLine={false} tickLine={false} />
                            <YAxis axisLine={false} tickLine={false} domain={[95, 100]} tickFormatter={(v) => `${v}%`} />
                            <Tooltip formatter={(value: number) => [`${value}%`, "Uptime"]} />
                            <Area type="monotone" dataKey="uptime" stroke="#22c55e" strokeWidth={2} fill="url(#colorUptime)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Service Status Grid */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Servis Durumları</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                        { name: "E-Fatura", status: "operational", icon: Server },
                        { name: "E-Arşiv", status: "operational", icon: Database },
                        { name: "Banka Entegrasyonu", status: "degraded", icon: Wifi },
                        { name: "Raporlama", status: "degraded", icon: Activity },
                        { name: "API Gateway", status: "operational", icon: Shield },
                        { name: "Web Paneli", status: "operational", icon: Server },
                        { name: "E-Ticaret", status: "operational", icon: Database },
                        { name: "Mobil API", status: "operational", icon: Wifi },
                    ].map((service, idx) => (
                        <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                            <service.icon className={cn(
                                "h-5 w-5",
                                service.status === "operational" ? "text-green-600" : "text-yellow-600"
                            )} />
                            <div>
                                <p className="text-sm font-medium text-gray-900">{service.name}</p>
                                <p className={cn(
                                    "text-xs font-medium",
                                    service.status === "operational" ? "text-green-600" : "text-yellow-600"
                                )}>
                                    {service.status === "operational" ? "Çalışıyor" : "Performans Sorunu"}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Incidents List */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-4 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-900">Olay Geçmişi</h3>
                        <div className="flex gap-2">
                            <select
                                value={severityFilter}
                                onChange={(e) => setSeverityFilter(e.target.value as IncidentSeverity)}
                                className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="all">Tüm Önem Dereceleri</option>
                                <option value="critical">Kritik</option>
                                <option value="major">Önemli</option>
                                <option value="minor">Düşük</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="divide-y divide-gray-100">
                    {filteredIncidents.length === 0 ? (
                        <div className="p-8 text-center text-gray-500">
                            <Activity className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                            <p>Gösterilecek olay bulunamadı.</p>
                        </div>
                    ) : (
                        filteredIncidents.map((incident) => {
                            const StatusIcon = statusConfig[incident.status].icon;
                            const isExpanded = expandedIncident === incident.id;

                            return (
                                <div key={incident.id} className={cn(
                                    "transition-colors",
                                    incident.status === "ongoing" && "bg-red-50/50"
                                )}>
                                    <div
                                        className="p-4 cursor-pointer hover:bg-gray-50"
                                        onClick={() => setExpandedIncident(isExpanded ? null : incident.id)}
                                    >
                                        <div className="flex items-start justify-between">
                                            <div className="flex items-start gap-3">
                                                <div className={cn(
                                                    "p-2 rounded-lg mt-0.5",
                                                    statusConfig[incident.status].bgColor
                                                )}>
                                                    <StatusIcon className={cn("h-4 w-4", statusConfig[incident.status].color)} />
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-xs font-mono text-gray-400">{incident.id}</span>
                                                        <span className={cn(
                                                            "px-2 py-0.5 rounded text-xs font-medium",
                                                            severityConfig[incident.severity].bgColor,
                                                            severityConfig[incident.severity].color
                                                        )}>
                                                            {severityConfig[incident.severity].label}
                                                        </span>
                                                    </div>
                                                    <h4 className="font-medium text-gray-900 mt-1">{incident.title}</h4>
                                                    <p className="text-sm text-gray-500 mt-0.5">{incident.description}</p>
                                                    <div className="flex items-center gap-4 mt-2 text-xs text-gray-400">
                                                        <span className="flex items-center gap-1">
                                                            <Calendar className="h-3 w-3" />
                                                            {new Date(incident.startTime).toLocaleDateString('tr-TR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                                                        </span>
                                                        {incident.duration && (
                                                            <span className="flex items-center gap-1">
                                                                <Clock className="h-3 w-3" />
                                                                {incident.duration}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className={cn(
                                                    "px-2.5 py-1 rounded-full text-xs font-medium",
                                                    statusConfig[incident.status].bgColor,
                                                    statusConfig[incident.status].color
                                                )}>
                                                    {statusConfig[incident.status].label}
                                                </span>
                                                <ChevronRight className={cn(
                                                    "h-4 w-4 text-gray-400 transition-transform",
                                                    isExpanded && "rotate-90"
                                                )} />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Expanded Updates */}
                                    {isExpanded && (
                                        <div className="px-4 pb-4">
                                            <div className="ml-11 pl-4 border-l-2 border-gray-200 space-y-3">
                                                <div className="mb-3">
                                                    <p className="text-xs text-gray-500 font-medium">Etkilenen Servisler:</p>
                                                    <div className="flex flex-wrap gap-1 mt-1">
                                                        {incident.affectedServices.map((service, idx) => (
                                                            <span key={idx} className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-xs">
                                                                {service}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                                <p className="text-xs text-gray-500 font-medium">Güncellemeler:</p>
                                                {incident.updates.map((update, idx) => (
                                                    <div key={idx} className="relative">
                                                        <div className="absolute -left-6 top-1 w-2 h-2 rounded-full bg-gray-300" />
                                                        <div className="text-sm">
                                                            <span className="font-medium text-gray-700">{update.time}</span>
                                                            <span className="text-gray-600 ml-2">{update.message}</span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
        </PageContainer>
    );
}
