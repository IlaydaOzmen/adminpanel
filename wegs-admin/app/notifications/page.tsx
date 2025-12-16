"use client";

import { useState } from "react";
import { PageContainer } from "@/components/layout/PageContainer";
import { PageHeader } from "@/components/layout/PageHeader";
import {
    Bell,
    Send,
    Users,
    Eye,
    MousePointer,
    Calendar,
    Clock,
    CheckCircle2,
    X,
    Plus,
    TrendingUp,
    BarChart3,
    Filter,
    ChevronDown,
    AlertCircle,
    Info,
    AlertTriangle,
    Megaphone,
    FlaskConical,
    Smartphone,
    Layout,
    Copy,
    Trophy,
    ArrowUpRight,
    Globe
} from "lucide-react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    LineChart,
    Line,
    CartesianGrid
} from "recharts";
import { cn } from "@/lib/utils";

type NotificationType = "info" | "warning" | "success" | "announcement";
type NotificationStatus = "sent" | "scheduled" | "draft" | "all";

interface Notification {
    id: string;
    title: string;
    message: string;
    type: NotificationType;
    status: "sent" | "scheduled" | "draft";
    targetAudience: string;
    sentAt?: string;
    scheduledFor?: string;
    recipients: number;
    readCount: number;
    clickCount: number;
    readRate: number;
    clickRate: number;
}

const mockNotifications: Notification[] = [
    {
        id: "NOT-001",
        title: "Yeni E-Fatura Özelliği",
        message: "Toplu fatura gönderimi artık destekleniyor. Hemen deneyin!",
        type: "announcement",
        status: "sent",
        targetAudience: "Tüm Kullanıcılar",
        sentAt: "2024-12-15T10:00:00",
        recipients: 2450,
        readCount: 1876,
        clickCount: 623,
        readRate: 76.6,
        clickRate: 25.4
    },
    {
        id: "NOT-002",
        title: "Planlı Bakım Duyurusu",
        message: "16 Aralık Pazartesi 02:00-04:00 arası planlı bakım yapılacaktır.",
        type: "warning",
        status: "sent",
        targetAudience: "Tüm Kullanıcılar",
        sentAt: "2024-12-14T14:00:00",
        recipients: 2450,
        readCount: 2134,
        clickCount: 89,
        readRate: 87.1,
        clickRate: 3.6
    },
    {
        id: "NOT-003",
        title: "Yılsonu İndirimi!",
        message: "Enterprise pakete geçiş yapanlara özel %30 indirim. Kampanya 31 Aralık'a kadar geçerli.",
        type: "success",
        status: "sent",
        targetAudience: "Business Paket",
        sentAt: "2024-12-13T09:00:00",
        recipients: 856,
        readCount: 534,
        clickCount: 178,
        readRate: 62.4,
        clickRate: 20.8
    },
    {
        id: "NOT-004",
        title: "Yeni Entegrasyon: Amazon",
        message: "Amazon Türkiye entegrasyonu artık kullanıma hazır!",
        type: "info",
        status: "scheduled",
        targetAudience: "E-Ticaret Paket",
        scheduledFor: "2024-12-17T10:00:00",
        recipients: 1200,
        readCount: 0,
        clickCount: 0,
        readRate: 0,
        clickRate: 0
    },
    {
        id: "NOT-005",
        title: "Güvenlik Güncellemesi",
        message: "Hesabınızın güvenliği için 2FA'yı aktifleştirmenizi öneriyoruz.",
        type: "warning",
        status: "draft",
        targetAudience: "2FA Olmayan Kullanıcılar",
        recipients: 450,
        readCount: 0,
        clickCount: 0,
        readRate: 0,
        clickRate: 0
    },
];

// Weekly analytics data
const weeklyAnalytics = [
    { day: "Pzt", sent: 5, readRate: 72, clickRate: 18 },
    { day: "Sal", sent: 3, readRate: 68, clickRate: 22 },
    { day: "Çar", sent: 8, readRate: 75, clickRate: 15 },
    { day: "Per", sent: 4, readRate: 80, clickRate: 25 },
    { day: "Cum", sent: 6, readRate: 65, clickRate: 20 },
    { day: "Cmt", sent: 2, readRate: 55, clickRate: 12 },
    { day: "Paz", sent: 1, readRate: 45, clickRate: 8 },
];

// A/B Test data for notifications
const notificationABTests = [
    {
        id: "ab-001",
        name: "Yılsonu Kampanya Başlığı",
        status: "completed",
        variantA: { title: "Yılsonu İndirimi!", readRate: 62.4, clickRate: 20.8 },
        variantB: { title: "🎉 Kaçırma! %30 İndirim", readRate: 71.2, clickRate: 28.5 },
        winner: "B",
        improvement: 37
    },
    {
        id: "ab-002",
        name: "Bakım Duyurusu Formatı",
        status: "running",
        variantA: { title: "Planlı Bakım Duyurusu", readRate: 87.1, clickRate: 3.6 },
        variantB: { title: "⚠️ Bakım: 16 Aralık 02:00", readRate: 82.3, clickRate: 5.2 },
        winner: null,
        improvement: null
    },
];

// Segment-based performance
const segmentPerformance = [
    { segment: "Enterprise Kullanıcılar", readRate: 89.2, clickRate: 34.5, color: "#8b5cf6" },
    { segment: "Business Paket", readRate: 76.8, clickRate: 25.2, color: "#3b82f6" },
    { segment: "Starter Paket", readRate: 65.4, clickRate: 18.7, color: "#10b981" },
    { segment: "Trial Kullanıcılar", readRate: 52.1, clickRate: 12.3, color: "#f59e0b" },
    { segment: "Pasif Kullanıcılar", readRate: 28.5, clickRate: 4.8, color: "#6b7280" },
];

// Notification templates
const notificationTemplates = [
    { id: "tpl-001", name: "Yeni Özellik Duyurusu", category: "announcement", usageCount: 45 },
    { id: "tpl-002", name: "Bakım Bildirimi", category: "warning", usageCount: 32 },
    { id: "tpl-003", name: "Kampanya Duyurusu", category: "success", usageCount: 28 },
    { id: "tpl-004", name: "Güvenlik Uyarısı", category: "warning", usageCount: 15 },
    { id: "tpl-005", name: "Hoş Geldiniz", category: "info", usageCount: 89 },
];

// Push notification stats
const pushNotificationStats = {
    totalSent: 12450,
    delivered: 11823,
    opened: 4521,
    deliveryRate: 95.0,
    openRate: 38.2,
    platforms: [
        { name: "iOS", sent: 5200, opened: 2340, rate: 45.0 },
        { name: "Android", sent: 6100, opened: 1980, rate: 32.5 },
        { name: "Web", sent: 1150, opened: 201, rate: 17.5 },
    ]
};

const typeConfig = {
    info: { label: "Bilgi", color: "text-blue-700", bgColor: "bg-blue-100", icon: Info },
    warning: { label: "Uyarı", color: "text-yellow-700", bgColor: "bg-yellow-100", icon: AlertTriangle },
    success: { label: "Başarı", color: "text-green-700", bgColor: "bg-green-100", icon: CheckCircle2 },
    announcement: { label: "Duyuru", color: "text-purple-700", bgColor: "bg-purple-100", icon: Megaphone },
};

const statusConfig = {
    sent: { label: "Gönderildi", color: "text-green-700", bgColor: "bg-green-100" },
    scheduled: { label: "Planlandı", color: "text-blue-700", bgColor: "bg-blue-100" },
    draft: { label: "Taslak", color: "text-gray-700", bgColor: "bg-gray-100" },
    all: { label: "Tümü", color: "text-gray-700", bgColor: "bg-gray-100" },
};

export default function NotificationsPage() {
    const [statusFilter, setStatusFilter] = useState<NotificationStatus>("all");
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);
    const [activeTab, setActiveTab] = useState<"overview" | "abtest" | "segments" | "templates" | "push">("overview");

    const filteredNotifications = mockNotifications.filter((notification) => {
        return statusFilter === "all" || notification.status === statusFilter;
    });

    // Statistics
    const totalSent = mockNotifications.filter(n => n.status === "sent").length;
    const avgReadRate = mockNotifications.filter(n => n.status === "sent").reduce((sum, n) => sum + n.readRate, 0) / totalSent || 0;
    const avgClickRate = mockNotifications.filter(n => n.status === "sent").reduce((sum, n) => sum + n.clickRate, 0) / totalSent || 0;
    const scheduledCount = mockNotifications.filter(n => n.status === "scheduled").length;

    const tabs = [
        { id: "overview" as const, label: "Genel Bakış", icon: Bell },
        { id: "abtest" as const, label: "A/B Testi", icon: FlaskConical },
        { id: "segments" as const, label: "Segment Analizi", icon: Users },
        { id: "templates" as const, label: "Şablonlar", icon: Layout },
        { id: "push" as const, label: "Push Bildirim", icon: Smartphone },
    ];

    return (
        <PageContainer>
            <PageHeader title="Bildirim Yönetimi" description="Panel içi bildirimler ve duyurular oluşturun, performanslarını takip edin.">
                <button
                    onClick={() => setIsCreateModalOpen(true)}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                >
                    <Plus className="h-4 w-4 mr-2" />
                    Yeni Bildirim
                </button>
            </PageHeader>

            {/* Tab Navigation */}
            <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 p-1 mb-6">
                <nav className="flex space-x-1">
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={cn(
                                    "flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-medium transition-all",
                                    activeTab === tab.id
                                        ? "bg-blue-600 text-white shadow-sm"
                                        : "text-gray-600 hover:bg-gray-100"
                                )}
                            >
                                <Icon className="h-4 w-4" />
                                {tab.label}
                            </button>
                        );
                    })}
                </nav>
            </div>

            {/* Overview Tab Content */}
            {activeTab === "overview" && (
                <>
                    {/* KPI Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-blue-100 rounded-xl">
                                    <Send className="h-6 w-6 text-blue-600" />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-gray-900">{totalSent}</p>
                                    <p className="text-sm text-gray-500">Gönderilen</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-green-100 rounded-xl">
                                    <Eye className="h-6 w-6 text-green-600" />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-gray-900">%{avgReadRate.toFixed(1)}</p>
                                    <p className="text-sm text-gray-500">Ort. Okunma Oranı</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-purple-100 rounded-xl">
                                    <MousePointer className="h-6 w-6 text-purple-600" />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-gray-900">%{avgClickRate.toFixed(1)}</p>
                                    <p className="text-sm text-gray-500">Ort. Tıklanma Oranı</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-orange-100 rounded-xl">
                                    <Clock className="h-6 w-6 text-orange-600" />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-gray-900">{scheduledCount}</p>
                                    <p className="text-sm text-gray-500">Planlanmış</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Analytics Chart */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Haftalık Performans</h3>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={weeklyAnalytics}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                    <XAxis dataKey="day" axisLine={false} tickLine={false} />
                                    <YAxis axisLine={false} tickLine={false} tickFormatter={(v) => `${v}%`} />
                                    <Tooltip />
                                    <Line type="monotone" dataKey="readRate" name="Okunma %" stroke="#22c55e" strokeWidth={2} dot={{ r: 4 }} />
                                    <Line type="monotone" dataKey="clickRate" name="Tıklanma %" stroke="#8b5cf6" strokeWidth={2} dot={{ r: 4 }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Filters */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
                        <div className="flex flex-wrap gap-2">
                            {(["all", "sent", "scheduled", "draft"] as NotificationStatus[]).map((status) => (
                                <button
                                    key={status}
                                    onClick={() => setStatusFilter(status)}
                                    className={cn(
                                        "px-4 py-2 rounded-lg text-sm font-medium transition-all",
                                        statusFilter === status
                                            ? "bg-blue-600 text-white"
                                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                    )}
                                >
                                    {statusConfig[status].label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Notifications List */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        <div className="divide-y divide-gray-100">
                            {filteredNotifications.length === 0 ? (
                                <div className="p-8 text-center text-gray-500">
                                    <Bell className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                                    <p>Gösterilecek bildirim bulunamadı.</p>
                                </div>
                            ) : (
                                filteredNotifications.map((notification) => {
                                    const TypeIcon = typeConfig[notification.type].icon;

                                    return (
                                        <div
                                            key={notification.id}
                                            onClick={() => setSelectedNotification(notification)}
                                            className="p-5 hover:bg-gray-50 transition-colors cursor-pointer"
                                        >
                                            <div className="flex items-start gap-4">
                                                <div className={cn(
                                                    "p-2.5 rounded-xl flex-shrink-0",
                                                    typeConfig[notification.type].bgColor
                                                )}>
                                                    <TypeIcon className={cn("h-5 w-5", typeConfig[notification.type].color)} />
                                                </div>

                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <h4 className="font-semibold text-gray-900">{notification.title}</h4>
                                                        <span className={cn(
                                                            "px-2 py-0.5 rounded-full text-xs font-medium",
                                                            statusConfig[notification.status].bgColor,
                                                            statusConfig[notification.status].color
                                                        )}>
                                                            {statusConfig[notification.status].label}
                                                        </span>
                                                    </div>
                                                    <p className="text-sm text-gray-600 line-clamp-1 mb-2">{notification.message}</p>
                                                    <div className="flex items-center gap-4 text-xs text-gray-500">
                                                        <span className="flex items-center gap-1">
                                                            <Users className="h-3 w-3" />
                                                            {notification.recipients.toLocaleString('tr-TR')} alıcı
                                                        </span>
                                                        <span className="flex items-center gap-1">
                                                            <Calendar className="h-3 w-3" />
                                                            {notification.sentAt
                                                                ? new Date(notification.sentAt).toLocaleDateString('tr-TR')
                                                                : notification.scheduledFor
                                                                    ? `Plan: ${new Date(notification.scheduledFor).toLocaleDateString('tr-TR')}`
                                                                    : "Taslak"
                                                            }
                                                        </span>
                                                    </div>
                                                </div>

                                                {notification.status === "sent" && (
                                                    <div className="flex items-center gap-4 flex-shrink-0">
                                                        <div className="text-center">
                                                            <div className="flex items-center gap-1 text-green-600">
                                                                <Eye className="h-4 w-4" />
                                                                <span className="font-bold">{notification.readRate}%</span>
                                                            </div>
                                                            <span className="text-xs text-gray-400">Okunma</span>
                                                        </div>
                                                        <div className="text-center">
                                                            <div className="flex items-center gap-1 text-purple-600">
                                                                <MousePointer className="h-4 w-4" />
                                                                <span className="font-bold">{notification.clickRate}%</span>
                                                            </div>
                                                            <span className="text-xs text-gray-400">Tıklanma</span>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })
                            )}
                        </div>
                    </div>

                </>
            )}

            {/* A/B Test Tab Content */}
            {activeTab === "abtest" && (
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {notificationABTests.map((test) => (
                            <div key={test.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <h3 className="font-semibold text-gray-900">{test.name}</h3>
                                            <span className={cn(
                                                "px-2 py-0.5 rounded-full text-xs font-medium",
                                                test.status === "completed" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"
                                            )}>
                                                {test.status === "completed" ? "Tamamlandı" : "Devam Ediyor"}
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-500">A/B Testi #{test.id}</p>
                                    </div>
                                    {test.improvement && (
                                        <div className="flex items-center gap-1 text-green-600 bg-green-50 px-3 py-1 rounded-lg">
                                            <TrendingUp className="h-4 w-4" />
                                            <span className="font-bold">+{test.improvement}%</span>
                                            <span className="text-xs">artış</span>
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-4">
                                    <div className={cn(
                                        "p-4 rounded-xl border-2 transition-all",
                                        test.winner === "A" ? "border-green-500 bg-green-50/50" : "border-gray-100 bg-gray-50/50"
                                    )}>
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="font-medium text-gray-700">Varyant A</span>
                                            {test.winner === "A" && <Trophy className="h-4 w-4 text-green-600" />}
                                        </div>
                                        <p className="text-sm text-gray-900 mb-3 font-medium">"{test.variantA.title}"</p>
                                        <div className="flex items-center gap-4 text-sm">
                                            <div className="flex items-center gap-1">
                                                <Eye className="h-4 w-4 text-gray-400" />
                                                <span className="font-semibold">{test.variantA.readRate}%</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <MousePointer className="h-4 w-4 text-gray-400" />
                                                <span className="font-semibold">{test.variantA.clickRate}%</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className={cn(
                                        "p-4 rounded-xl border-2 transition-all",
                                        test.winner === "B" ? "border-green-500 bg-green-50/50" : "border-gray-100 bg-gray-50/50"
                                    )}>
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="font-medium text-gray-700">Varyant B</span>
                                            {test.winner === "B" && <Trophy className="h-4 w-4 text-green-600" />}
                                        </div>
                                        <p className="text-sm text-gray-900 mb-3 font-medium">"{test.variantB.title}"</p>
                                        <div className="flex items-center gap-4 text-sm">
                                            <div className="flex items-center gap-1">
                                                <Eye className="h-4 w-4 text-gray-400" />
                                                <span className="font-semibold">{test.variantB.readRate}%</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <MousePointer className="h-4 w-4 text-gray-400" />
                                                <span className="font-semibold">{test.variantB.clickRate}%</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                        <div className="bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 p-6 flex flex-col items-center justify-center text-center">
                            <div className="p-4 bg-white rounded-full shadow-sm mb-4">
                                <FlaskConical className="h-8 w-8 text-blue-600" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Yeni Test Oluştur</h3>
                            <p className="text-gray-500 mb-6 max-w-xs">İki farklı bildirim başlığını veya içeriğini test ederek en iyi performansı bulun.</p>
                            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700">
                                A/B Testi Başlat
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Segments Tab Content */}
            {activeTab === "segments" && (
                <div className="space-y-6">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-6">Segment Bazlı Performans</h3>
                        <div className="h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={segmentPerformance} layout="vertical" margin={{ left: 100 }}>
                                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e5e7eb" />
                                    <XAxis type="number" tickFormatter={(v) => `${v}%`} />
                                    <YAxis dataKey="segment" type="category" width={120} tick={{ fontSize: 12 }} />
                                    <Tooltip formatter={(v) => `${v}%`} />
                                    <Bar dataKey="readRate" name="Okunma Oranı" fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={20} />
                                    <Bar dataKey="clickRate" name="Tıklanma Oranı" fill="#8b5cf6" radius={[0, 4, 4, 0]} barSize={20} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {segmentPerformance.map((seg) => (
                            <div key={seg.segment} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-gray-50">
                                        <Users className="h-5 w-5 text-gray-600" />
                                    </div>
                                    <h4 className="font-semibold text-gray-900">{seg.segment}</h4>
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <div className="flex justify-between text-sm mb-1">
                                            <span className="text-gray-500">Okunma</span>
                                            <span className="font-medium text-gray-900">%{seg.readRate}</span>
                                        </div>
                                        <div className="w-full bg-gray-100 rounded-full h-2">
                                            <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${seg.readRate}%` }} />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between text-sm mb-1">
                                            <span className="text-gray-500">Tıklanma</span>
                                            <span className="font-medium text-gray-900">%{seg.clickRate}</span>
                                        </div>
                                        <div className="w-full bg-gray-100 rounded-full h-2">
                                            <div className="bg-purple-500 h-2 rounded-full" style={{ width: `${seg.clickRate}%` }} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Templates Tab Content */}
            {activeTab === "templates" && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {notificationTemplates.map((tpl) => {
                        const TypeIcon = typeConfig[tpl.category as NotificationType].icon;
                        return (
                            <div key={tpl.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:border-blue-200 transition-colors group">
                                <div className="flex items-start justify-between mb-4">
                                    <div className={cn(
                                        "p-3 rounded-xl",
                                        typeConfig[tpl.category as NotificationType].bgColor
                                    )}>
                                        <TypeIcon className={cn("h-6 w-6", typeConfig[tpl.category as NotificationType].color)} />
                                    </div>
                                    <button className="p-2 hover:bg-gray-50 rounded-lg text-gray-400 hover:text-blue-600 transition-colors">
                                        <Copy className="h-5 w-5" />
                                    </button>
                                </div>
                                <h3 className="font-semibold text-gray-900 mb-1">{tpl.name}</h3>
                                <p className="text-sm text-gray-500 mb-4">{tpl.usageCount} kez kullanıldı</p>
                                <button className="w-full py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:border-blue-500 hover:text-blue-600 transition-all">
                                    Şablonu Kullan
                                </button>
                            </div>
                        );
                    })}
                    <div className="bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 p-6 flex flex-col items-center justify-center text-center min-h-[200px]">
                        <div className="p-4 bg-white rounded-full shadow-sm mb-4">
                            <Plus className="h-6 w-6 text-gray-400" />
                        </div>
                        <h3 className="font-medium text-gray-900">Yeni Şablon</h3>
                        <p className="text-sm text-gray-500 mt-1">Sık kullanılan bildirimleri kaydedin</p>
                    </div>
                </div>
            )}

            {/* Push Notification Content */}
            {activeTab === "push" && (
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <div className="flex items-center gap-3 mb-2">
                                <Send className="h-5 w-5 text-blue-600" />
                                <span className="font-medium text-gray-900">Toplam Gönderilen</span>
                            </div>
                            <p className="text-3xl font-bold text-gray-900">{pushNotificationStats.totalSent.toLocaleString('tr-TR')}</p>
                            <p className="text-sm text-green-600 mt-1 flex items-center">
                                <ArrowUpRight className="h-3 w-3 mr-1" />
                                %{pushNotificationStats.deliveryRate} iletim başarısı
                            </p>
                        </div>
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <div className="flex items-center gap-3 mb-2">
                                <Smartphone className="h-5 w-5 text-purple-600" />
                                <span className="font-medium text-gray-900">Açılma Oranı</span>
                            </div>
                            <p className="text-3xl font-bold text-gray-900">%{pushNotificationStats.openRate}</p>
                            <p className="text-sm text-gray-500 mt-1">
                                {pushNotificationStats.opened.toLocaleString('tr-TR')} kullanıcı görüntüledi
                            </p>
                        </div>
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <div className="flex items-center gap-3 mb-2">
                                <Globe className="h-5 w-5 text-green-600" />
                                <span className="font-medium text-gray-900">Platform Dağılımı</span>
                            </div>
                            <div className="flex items-end gap-2 h-16 mt-2">
                                {pushNotificationStats.platforms.map(p => (
                                    <div key={p.name} className="flex-1 flex flex-col items-center gap-1 group relative">
                                        <div
                                            className="w-full bg-blue-100 rounded-t-lg transition-all group-hover:bg-blue-200"
                                            style={{ height: `${(p.sent / 7000) * 100}%` }}
                                        />
                                        <span className="text-xs font-medium text-gray-600">{p.name}</span>
                                        <div className="absolute -top-8 bg-gray-900 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                                            {p.sent} gönderim (%{p.rate} açılma)
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                            <h3 className="font-semibold text-gray-900">Son Push Bildirimleri</h3>
                            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">Tümünü Gör</button>
                        </div>
                        <div className="divide-y divide-gray-100">
                            {[1, 2, 3].map((_, i) => (
                                <div key={i} className="p-4 hover:bg-gray-50 flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                                            <Smartphone className="h-5 w-5 text-gray-500" />
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-gray-900">Sipariş Durumu Güncellemesi</h4>
                                            <p className="text-sm text-gray-500">Siparişiniz kargoya verildi. Takip no: 123456</p>
                                        </div>
                                    </div>
                                    <div className="text-right text-sm">
                                        <p className="text-gray-900 font-medium">%42 Açılma</p>
                                        <p className="text-gray-500">2 saat önce</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Create Notification Modal */}
            {isCreateModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
                        <div className="flex items-center justify-between p-5 border-b border-gray-100">
                            <h3 className="text-lg font-semibold text-gray-900">Yeni Bildirim Oluştur</h3>
                            <button onClick={() => setIsCreateModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                                <X className="h-5 w-5 text-gray-400" />
                            </button>
                        </div>

                        <div className="p-5 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Bildirim Tipi</label>
                                <div className="grid grid-cols-4 gap-2">
                                    {(["info", "warning", "success", "announcement"] as NotificationType[]).map((type) => {
                                        const TypeIcon = typeConfig[type].icon;
                                        return (
                                            <button
                                                key={type}
                                                className={cn(
                                                    "p-3 rounded-xl border-2 flex flex-col items-center gap-1 transition-all",
                                                    "border-gray-200 hover:border-gray-300"
                                                )}
                                            >
                                                <TypeIcon className={cn("h-5 w-5", typeConfig[type].color)} />
                                                <span className="text-xs font-medium text-gray-600">{typeConfig[type].label}</span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Başlık</label>
                                <input
                                    type="text"
                                    placeholder="Bildirim başlığı..."
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Mesaj</label>
                                <textarea
                                    rows={3}
                                    placeholder="Bildirim içeriği..."
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Hedef Kitle</label>
                                <select className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    <option>Tüm Kullanıcılar</option>
                                    <option>Starter Paket</option>
                                    <option>Business Paket</option>
                                    <option>Enterprise Paket</option>
                                    <option>E-Ticaret Kullanıcıları</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Gönderim Zamanı</label>
                                <div className="flex gap-2">
                                    <button className="flex-1 px-4 py-2.5 bg-blue-50 border border-blue-200 rounded-xl text-sm font-medium text-blue-700">
                                        Hemen Gönder
                                    </button>
                                    <button className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-700">
                                        Planla
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="p-5 bg-gray-50 border-t border-gray-100 flex gap-3">
                            <button
                                onClick={() => setIsCreateModalOpen(false)}
                                className="flex-1 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50"
                            >
                                İptal
                            </button>
                            <button
                                className="flex-1 px-4 py-2.5 bg-blue-600 rounded-xl text-sm font-medium text-white hover:bg-blue-700 flex items-center justify-center gap-2"
                            >
                                <Send className="h-4 w-4" />
                                Gönder
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Notification Detail Modal */}
            {selectedNotification && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
                        <div className={cn(
                            "p-5",
                            typeConfig[selectedNotification.type].bgColor
                        )}>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    {(() => {
                                        const TypeIcon = typeConfig[selectedNotification.type].icon;
                                        return <TypeIcon className={cn("h-6 w-6", typeConfig[selectedNotification.type].color)} />;
                                    })()}
                                    <div>
                                        <h3 className="font-semibold text-gray-900">{selectedNotification.title}</h3>
                                        <span className={cn(
                                            "text-xs font-medium",
                                            statusConfig[selectedNotification.status].color
                                        )}>
                                            {statusConfig[selectedNotification.status].label}
                                        </span>
                                    </div>
                                </div>
                                <button onClick={() => setSelectedNotification(null)} className="p-2 hover:bg-white/50 rounded-full transition-colors">
                                    <X className="h-5 w-5 text-gray-500" />
                                </button>
                            </div>
                        </div>

                        <div className="p-5">
                            <p className="text-gray-600 mb-4">{selectedNotification.message}</p>

                            <div className="grid grid-cols-2 gap-3 mb-4">
                                <div className="p-3 bg-gray-50 rounded-xl">
                                    <p className="text-xs text-gray-500">Hedef Kitle</p>
                                    <p className="font-medium text-gray-900">{selectedNotification.targetAudience}</p>
                                </div>
                                <div className="p-3 bg-gray-50 rounded-xl">
                                    <p className="text-xs text-gray-500">Alıcı Sayısı</p>
                                    <p className="font-medium text-gray-900">{selectedNotification.recipients.toLocaleString('tr-TR')}</p>
                                </div>
                            </div>

                            {selectedNotification.status === "sent" && (
                                <div className="border-t border-gray-100 pt-4">
                                    <h4 className="text-sm font-medium text-gray-700 mb-3">Performans Metrikleri</h4>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="p-4 bg-green-50 rounded-xl text-center">
                                            <div className="flex items-center justify-center gap-2 mb-1">
                                                <Eye className="h-5 w-5 text-green-600" />
                                                <span className="text-2xl font-bold text-green-600">{selectedNotification.readRate}%</span>
                                            </div>
                                            <p className="text-xs text-gray-500">Okunma Oranı</p>
                                            <p className="text-sm font-medium text-gray-700 mt-1">
                                                {selectedNotification.readCount.toLocaleString('tr-TR')} / {selectedNotification.recipients.toLocaleString('tr-TR')}
                                            </p>
                                        </div>
                                        <div className="p-4 bg-purple-50 rounded-xl text-center">
                                            <div className="flex items-center justify-center gap-2 mb-1">
                                                <MousePointer className="h-5 w-5 text-purple-600" />
                                                <span className="text-2xl font-bold text-purple-600">{selectedNotification.clickRate}%</span>
                                            </div>
                                            <p className="text-xs text-gray-500">Tıklanma Oranı</p>
                                            <p className="text-sm font-medium text-gray-700 mt-1">
                                                {selectedNotification.clickCount.toLocaleString('tr-TR')} / {selectedNotification.recipients.toLocaleString('tr-TR')}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="p-5 bg-gray-50 border-t border-gray-100">
                            <button
                                onClick={() => setSelectedNotification(null)}
                                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50"
                            >
                                Kapat
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </PageContainer>
    );
}
