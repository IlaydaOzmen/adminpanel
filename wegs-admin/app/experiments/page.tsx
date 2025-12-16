"use client";

import { useState } from "react";
import { PageContainer } from "@/components/layout/PageContainer";
import { PageHeader } from "@/components/layout/PageHeader";
import {
    FlaskConical,
    Play,
    Pause,
    CheckCircle,
    Users,
    TrendingUp,
    TrendingDown,
    BarChart3,
    Target,
    Clock,
    Plus,
    X,
    ChevronRight,
    AlertCircle,
    Zap,
    Percent,
    ArrowUpRight,
    ArrowDownRight,
    Settings,
    Eye
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
    CartesianGrid,
    Legend
} from "recharts";
import { cn } from "@/lib/utils";

type ExperimentStatus = "running" | "paused" | "completed" | "draft";

interface Experiment {
    id: string;
    name: string;
    description: string;
    feature: string;
    status: ExperimentStatus;
    startDate: string;
    endDate?: string;
    targetGroup: string;
    controlSize: number;
    variantSize: number;
    metrics: {
        conversion: { control: number; variant: number; lift: number };
        engagement: { control: number; variant: number; lift: number };
        revenue: { control: number; variant: number; lift: number };
    };
    statisticalSignificance: number;
    winner?: "control" | "variant" | "inconclusive";
}

const mockExperiments: Experiment[] = [
    {
        id: "exp-001",
        name: "Yeni Dashboard Tasarımı",
        description: "Modernize edilmiş dashboard arayüzü testi",
        feature: "dashboard_v2",
        status: "running",
        startDate: "2024-12-01",
        targetGroup: "Enterprise Müşteriler",
        controlSize: 450,
        variantSize: 450,
        metrics: {
            conversion: { control: 12.5, variant: 15.8, lift: 26.4 },
            engagement: { control: 45.2, variant: 52.1, lift: 15.3 },
            revenue: { control: 2850, variant: 3120, lift: 9.5 }
        },
        statisticalSignificance: 94.2,
        winner: "variant"
    },
    {
        id: "exp-002",
        name: "Onboarding Akışı A/B",
        description: "Basitleştirilmiş kullanıcı kayıt süreci",
        feature: "onboarding_simplified",
        status: "completed",
        startDate: "2024-11-15",
        endDate: "2024-12-10",
        targetGroup: "Yeni Kullanıcılar",
        controlSize: 1200,
        variantSize: 1200,
        metrics: {
            conversion: { control: 28.3, variant: 35.7, lift: 26.1 },
            engagement: { control: 62.1, variant: 71.4, lift: 15.0 },
            revenue: { control: 1500, variant: 1820, lift: 21.3 }
        },
        statisticalSignificance: 99.1,
        winner: "variant"
    },
    {
        id: "exp-003",
        name: "Fiyat Tablosu Varyantı",
        description: "Yeni fiyatlandırma görüntüsü testi",
        feature: "pricing_v2",
        status: "running",
        startDate: "2024-12-10",
        targetGroup: "Trial Kullanıcılar",
        controlSize: 320,
        variantSize: 320,
        metrics: {
            conversion: { control: 8.2, variant: 7.9, lift: -3.7 },
            engagement: { control: 38.5, variant: 41.2, lift: 7.0 },
            revenue: { control: 890, variant: 920, lift: 3.4 }
        },
        statisticalSignificance: 45.8,
        winner: "inconclusive"
    },
    {
        id: "exp-004",
        name: "E-Fatura Modal Akışı",
        description: "Tek sayfa e-fatura oluşturma deneyimi",
        feature: "einvoice_modal",
        status: "paused",
        startDate: "2024-12-05",
        targetGroup: "Muhasebe Paket",
        controlSize: 180,
        variantSize: 180,
        metrics: {
            conversion: { control: 42.1, variant: 48.5, lift: 15.2 },
            engagement: { control: 78.3, variant: 82.1, lift: 4.9 },
            revenue: { control: 0, variant: 0, lift: 0 }
        },
        statisticalSignificance: 72.4,
        winner: undefined
    },
    {
        id: "exp-005",
        name: "AI Destekli Raporlama",
        description: "Yapay zeka ile otomatik rapor önerileri",
        feature: "ai_reports",
        status: "draft",
        startDate: "",
        targetGroup: "Enterprise Müşteriler",
        controlSize: 0,
        variantSize: 0,
        metrics: {
            conversion: { control: 0, variant: 0, lift: 0 },
            engagement: { control: 0, variant: 0, lift: 0 },
            revenue: { control: 0, variant: 0, lift: 0 }
        },
        statisticalSignificance: 0
    }
];

// Performance trend data
const trendData = [
    { day: "1 Ara", control: 12, variant: 14 },
    { day: "3 Ara", control: 13, variant: 15 },
    { day: "5 Ara", control: 12, variant: 16 },
    { day: "7 Ara", control: 14, variant: 17 },
    { day: "9 Ara", control: 13, variant: 18 },
    { day: "11 Ara", control: 12, variant: 16 },
    { day: "13 Ara", control: 13, variant: 17 },
    { day: "15 Ara", control: 12, variant: 16 },
];

const statusConfig = {
    running: { label: "Çalışıyor", color: "bg-green-100 text-green-700", icon: Play },
    paused: { label: "Duraklatıldı", color: "bg-yellow-100 text-yellow-700", icon: Pause },
    completed: { label: "Tamamlandı", color: "bg-blue-100 text-blue-700", icon: CheckCircle },
    draft: { label: "Taslak", color: "bg-gray-100 text-gray-700", icon: Settings }
};

export default function ABTestingPage() {
    const [selectedExperiment, setSelectedExperiment] = useState<Experiment | null>(null);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [statusFilter, setStatusFilter] = useState<ExperimentStatus | "all">("all");

    const filteredExperiments = mockExperiments.filter(exp =>
        statusFilter === "all" || exp.status === statusFilter
    );

    const runningCount = mockExperiments.filter(e => e.status === "running").length;
    const completedCount = mockExperiments.filter(e => e.status === "completed").length;
    const avgLift = mockExperiments
        .filter(e => e.status === "completed" || e.status === "running")
        .reduce((sum, e) => sum + e.metrics.conversion.lift, 0) /
        mockExperiments.filter(e => e.status === "completed" || e.status === "running").length || 0;

    return (
        <PageContainer>
            <PageHeader title="A/B Testi Yönetimi" description="Yeni özellikleri test edin, sonuçları analiz edin, performansı karşılaştırın">
                <button
                    onClick={() => setIsCreateModalOpen(true)}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 rounded-lg text-sm font-medium text-white hover:bg-blue-700"
                >
                    <Plus className="h-4 w-4" />
                    Yeni Deney
                </button>
            </PageHeader>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-5 text-white">
                    <div className="flex items-center gap-3 mb-2">
                        <FlaskConical className="h-6 w-6 text-green-200" />
                        <span className="text-sm text-green-100">Aktif Deney</span>
                    </div>
                    <p className="text-3xl font-bold">{runningCount}</p>
                    <p className="text-xs text-green-200 mt-1">Şu anda çalışıyor</p>
                </div>

                <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl p-5 text-white">
                    <div className="flex items-center gap-3 mb-2">
                        <CheckCircle className="h-6 w-6 text-blue-200" />
                        <span className="text-sm text-blue-100">Tamamlanan</span>
                    </div>
                    <p className="text-3xl font-bold">{completedCount}</p>
                    <p className="text-xs text-blue-200 mt-1">Sonuçlandı</p>
                </div>

                <div className="bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl p-5 text-white">
                    <div className="flex items-center gap-3 mb-2">
                        <TrendingUp className="h-6 w-6 text-purple-200" />
                        <span className="text-sm text-purple-100">Ort. Conversion Artışı</span>
                    </div>
                    <p className="text-3xl font-bold">+{avgLift.toFixed(1)}%</p>
                    <p className="text-xs text-purple-200 mt-1">Başarılı deneyler</p>
                </div>

                <div className="bg-gradient-to-br from-orange-500 to-amber-600 rounded-xl p-5 text-white">
                    <div className="flex items-center gap-3 mb-2">
                        <Users className="h-6 w-6 text-orange-200" />
                        <span className="text-sm text-orange-100">Test Edilen Kullanıcı</span>
                    </div>
                    <p className="text-3xl font-bold">
                        {mockExperiments.reduce((sum, e) => sum + e.controlSize + e.variantSize, 0).toLocaleString('tr-TR')}
                    </p>
                    <p className="text-xs text-orange-200 mt-1">Toplam</p>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 p-4 mb-6">
                <div className="flex flex-wrap gap-2">
                    {(["all", "running", "paused", "completed", "draft"] as (ExperimentStatus | "all")[]).map((status) => (
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
                            {status === "all" ? "Tümü" : statusConfig[status].label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Experiments List */}
            <div className="space-y-4">
                {filteredExperiments.map((experiment) => {
                    const StatusIcon = statusConfig[experiment.status].icon;
                    const hasData = experiment.status !== "draft";

                    return (
                        <div
                            key={experiment.id}
                            onClick={() => hasData ? setSelectedExperiment(experiment) : null}
                            className={cn(
                                "bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 p-6 transition-all",
                                hasData && "hover:shadow-md cursor-pointer"
                            )}
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-start gap-4">
                                    <div className={cn(
                                        "p-3 rounded-xl",
                                        experiment.status === "running" && "bg-green-100",
                                        experiment.status === "paused" && "bg-yellow-100",
                                        experiment.status === "completed" && "bg-blue-100",
                                        experiment.status === "draft" && "bg-gray-100"
                                    )}>
                                        <FlaskConical className={cn(
                                            "h-6 w-6",
                                            experiment.status === "running" && "text-green-600",
                                            experiment.status === "paused" && "text-yellow-600",
                                            experiment.status === "completed" && "text-blue-600",
                                            experiment.status === "draft" && "text-gray-600"
                                        )} />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-3 mb-1">
                                            <h3 className="font-semibold text-gray-900">{experiment.name}</h3>
                                            <span className={cn(
                                                "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium",
                                                statusConfig[experiment.status].color
                                            )}>
                                                <StatusIcon className="w-3 h-3" />
                                                {statusConfig[experiment.status].label}
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-500">{experiment.description}</p>
                                        <div className="flex items-center gap-4 mt-2 text-xs text-gray-400">
                                            <span className="flex items-center gap-1">
                                                <Target className="w-3 h-3" />
                                                {experiment.targetGroup}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Users className="w-3 h-3" />
                                                {experiment.controlSize + experiment.variantSize} kullanıcı
                                            </span>
                                            {experiment.startDate && (
                                                <span className="flex items-center gap-1">
                                                    <Clock className="w-3 h-3" />
                                                    {experiment.startDate}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {hasData && (
                                    <ChevronRight className="w-5 h-5 text-gray-300" />
                                )}
                            </div>

                            {hasData && (
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4 border-t border-gray-100">
                                    <div className="p-3 bg-gray-50 rounded-xl">
                                        <p className="text-xs text-gray-500 mb-1">Conversion</p>
                                        <div className="flex items-center justify-between">
                                            <span className="text-lg font-bold text-gray-900">
                                                {experiment.metrics.conversion.variant}%
                                            </span>
                                            <span className={cn(
                                                "text-xs font-medium flex items-center",
                                                experiment.metrics.conversion.lift >= 0 ? "text-green-600" : "text-red-600"
                                            )}>
                                                {experiment.metrics.conversion.lift >= 0 ? (
                                                    <ArrowUpRight className="w-3 h-3" />
                                                ) : (
                                                    <ArrowDownRight className="w-3 h-3" />
                                                )}
                                                {Math.abs(experiment.metrics.conversion.lift)}%
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-3 bg-gray-50 rounded-xl">
                                        <p className="text-xs text-gray-500 mb-1">Engagement</p>
                                        <div className="flex items-center justify-between">
                                            <span className="text-lg font-bold text-gray-900">
                                                {experiment.metrics.engagement.variant}%
                                            </span>
                                            <span className={cn(
                                                "text-xs font-medium flex items-center",
                                                experiment.metrics.engagement.lift >= 0 ? "text-green-600" : "text-red-600"
                                            )}>
                                                {experiment.metrics.engagement.lift >= 0 ? (
                                                    <ArrowUpRight className="w-3 h-3" />
                                                ) : (
                                                    <ArrowDownRight className="w-3 h-3" />
                                                )}
                                                {Math.abs(experiment.metrics.engagement.lift)}%
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-3 bg-gray-50 rounded-xl">
                                        <p className="text-xs text-gray-500 mb-1">İstat. Anlamlılık</p>
                                        <div className="flex items-center gap-2">
                                            <span className={cn(
                                                "text-lg font-bold",
                                                experiment.statisticalSignificance >= 95 && "text-green-600",
                                                experiment.statisticalSignificance >= 80 && experiment.statisticalSignificance < 95 && "text-yellow-600",
                                                experiment.statisticalSignificance < 80 && "text-gray-600"
                                            )}>
                                                {experiment.statisticalSignificance}%
                                            </span>
                                            {experiment.statisticalSignificance >= 95 && (
                                                <CheckCircle className="w-4 h-4 text-green-600" />
                                            )}
                                        </div>
                                    </div>
                                    <div className="p-3 bg-gray-50 rounded-xl">
                                        <p className="text-xs text-gray-500 mb-1">Kazanan</p>
                                        <span className={cn(
                                            "text-lg font-bold",
                                            experiment.winner === "variant" && "text-green-600",
                                            experiment.winner === "control" && "text-blue-600",
                                            experiment.winner === "inconclusive" && "text-gray-500"
                                        )}>
                                            {experiment.winner === "variant" ? "Varyant 🏆" :
                                                experiment.winner === "control" ? "Kontrol" :
                                                    experiment.winner === "inconclusive" ? "Belirsiz" : "-"}
                                        </span>
                                    </div>
                                </div>
                            )}

                            {experiment.status === "draft" && (
                                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
                                        Deneyi Başlat
                                    </button>
                                    <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200">
                                        Düzenle
                                    </button>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Create Experiment Modal */}
            {isCreateModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
                        <div className="flex items-center justify-between p-5 border-b border-gray-100 bg-gradient-to-r from-purple-50 to-indigo-50">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-purple-100 rounded-xl">
                                    <FlaskConical className="h-5 w-5 text-purple-600" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900">Yeni A/B Deneyi</h3>
                            </div>
                            <button onClick={() => setIsCreateModalOpen(false)} className="p-2 hover:bg-white/50 rounded-full">
                                <X className="h-5 w-5 text-gray-400" />
                            </button>
                        </div>

                        <div className="p-5 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Deney Adı</label>
                                <input
                                    type="text"
                                    placeholder="Örn: Yeni Dashboard Tasarımı"
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Açıklama</label>
                                <textarea
                                    rows={2}
                                    placeholder="Deney hakkında kısa açıklama..."
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Test Edilecek Özellik</label>
                                <select className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500">
                                    <option>Dashboard v2</option>
                                    <option>Onboarding Akışı</option>
                                    <option>E-Fatura Modal</option>
                                    <option>AI Raporlama</option>
                                    <option>Yeni Fiyat Tablosu</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Hedef Müşteri Grubu</label>
                                <select className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500">
                                    <option>Tüm Kullanıcılar</option>
                                    <option>Enterprise Müşteriler</option>
                                    <option>Business Müşteriler</option>
                                    <option>Trial Kullanıcılar</option>
                                    <option>Yeni Kullanıcılar (Son 30 gün)</option>
                                </select>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Kontrol Grubu (%)</label>
                                    <input
                                        type="number"
                                        defaultValue={50}
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Varyant Grubu (%)</label>
                                    <input
                                        type="number"
                                        defaultValue={50}
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Ölçülecek Metrikler</label>
                                <div className="space-y-2">
                                    {["Conversion Rate", "User Engagement", "Revenue per User", "Session Duration"].map((metric) => (
                                        <label key={metric} className="flex items-center gap-2">
                                            <input type="checkbox" defaultChecked className="rounded text-purple-600 focus:ring-purple-500" />
                                            <span className="text-sm text-gray-700">{metric}</span>
                                        </label>
                                    ))}
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
                                className="flex-1 px-4 py-2.5 bg-purple-600 rounded-xl text-sm font-medium text-white hover:bg-purple-700 flex items-center justify-center gap-2"
                            >
                                <FlaskConical className="h-4 w-4" />
                                Deneyi Oluştur
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Experiment Detail Modal */}
            {selectedExperiment && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden my-8">
                        <div className={cn(
                            "p-6",
                            selectedExperiment.winner === "variant" && "bg-gradient-to-r from-green-50 to-emerald-50",
                            selectedExperiment.winner === "control" && "bg-gradient-to-r from-blue-50 to-indigo-50",
                            (!selectedExperiment.winner || selectedExperiment.winner === "inconclusive") && "bg-gradient-to-r from-gray-50 to-slate-50"
                        )}>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-white/80 rounded-xl shadow-sm">
                                        <FlaskConical className="h-6 w-6 text-purple-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900">{selectedExperiment.name}</h3>
                                        <p className="text-sm text-gray-500">{selectedExperiment.description}</p>
                                    </div>
                                </div>
                                <button onClick={() => setSelectedExperiment(null)} className="p-2 hover:bg-white/50 rounded-full">
                                    <X className="h-5 w-5 text-gray-400" />
                                </button>
                            </div>
                        </div>

                        <div className="p-6">
                            {/* Summary Stats */}
                            <div className="grid grid-cols-4 gap-4 mb-6">
                                <div className="text-center p-4 bg-gray-50 rounded-xl">
                                    <p className="text-2xl font-bold text-gray-900">{selectedExperiment.controlSize}</p>
                                    <p className="text-xs text-gray-500">Kontrol Grubu</p>
                                </div>
                                <div className="text-center p-4 bg-gray-50 rounded-xl">
                                    <p className="text-2xl font-bold text-gray-900">{selectedExperiment.variantSize}</p>
                                    <p className="text-xs text-gray-500">Varyant Grubu</p>
                                </div>
                                <div className="text-center p-4 bg-gray-50 rounded-xl">
                                    <p className={cn(
                                        "text-2xl font-bold",
                                        selectedExperiment.statisticalSignificance >= 95 ? "text-green-600" : "text-yellow-600"
                                    )}>
                                        {selectedExperiment.statisticalSignificance}%
                                    </p>
                                    <p className="text-xs text-gray-500">İstat. Anlamlılık</p>
                                </div>
                                <div className="text-center p-4 bg-gray-50 rounded-xl">
                                    <p className={cn(
                                        "text-2xl font-bold",
                                        selectedExperiment.winner === "variant" && "text-green-600",
                                        selectedExperiment.winner === "control" && "text-blue-600",
                                        selectedExperiment.winner === "inconclusive" && "text-gray-500"
                                    )}>
                                        {selectedExperiment.winner === "variant" ? "Varyant" :
                                            selectedExperiment.winner === "control" ? "Kontrol" : "Belirsiz"}
                                    </p>
                                    <p className="text-xs text-gray-500">Kazanan</p>
                                </div>
                            </div>

                            {/* Metrics Comparison */}
                            <div className="mb-6">
                                <h4 className="text-sm font-medium text-gray-700 mb-3">Performans Karşılaştırması</h4>
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="p-4 border border-gray-200 rounded-xl">
                                        <p className="text-xs text-gray-500 mb-2">Conversion Rate</p>
                                        <div className="flex items-end justify-between">
                                            <div>
                                                <p className="text-xs text-gray-400">Kontrol</p>
                                                <p className="text-lg font-bold text-gray-600">{selectedExperiment.metrics.conversion.control}%</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-xs text-gray-400">Varyant</p>
                                                <p className="text-lg font-bold text-green-600">{selectedExperiment.metrics.conversion.variant}%</p>
                                            </div>
                                        </div>
                                        <div className={cn(
                                            "mt-2 text-center py-1 rounded-full text-xs font-medium",
                                            selectedExperiment.metrics.conversion.lift >= 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                                        )}>
                                            {selectedExperiment.metrics.conversion.lift >= 0 ? "+" : ""}{selectedExperiment.metrics.conversion.lift}% Artış
                                        </div>
                                    </div>

                                    <div className="p-4 border border-gray-200 rounded-xl">
                                        <p className="text-xs text-gray-500 mb-2">Engagement</p>
                                        <div className="flex items-end justify-between">
                                            <div>
                                                <p className="text-xs text-gray-400">Kontrol</p>
                                                <p className="text-lg font-bold text-gray-600">{selectedExperiment.metrics.engagement.control}%</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-xs text-gray-400">Varyant</p>
                                                <p className="text-lg font-bold text-green-600">{selectedExperiment.metrics.engagement.variant}%</p>
                                            </div>
                                        </div>
                                        <div className={cn(
                                            "mt-2 text-center py-1 rounded-full text-xs font-medium",
                                            selectedExperiment.metrics.engagement.lift >= 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                                        )}>
                                            {selectedExperiment.metrics.engagement.lift >= 0 ? "+" : ""}{selectedExperiment.metrics.engagement.lift}% Artış
                                        </div>
                                    </div>

                                    <div className="p-4 border border-gray-200 rounded-xl">
                                        <p className="text-xs text-gray-500 mb-2">Revenue per User</p>
                                        <div className="flex items-end justify-between">
                                            <div>
                                                <p className="text-xs text-gray-400">Kontrol</p>
                                                <p className="text-lg font-bold text-gray-600">₺{selectedExperiment.metrics.revenue.control}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-xs text-gray-400">Varyant</p>
                                                <p className="text-lg font-bold text-green-600">₺{selectedExperiment.metrics.revenue.variant}</p>
                                            </div>
                                        </div>
                                        <div className={cn(
                                            "mt-2 text-center py-1 rounded-full text-xs font-medium",
                                            selectedExperiment.metrics.revenue.lift >= 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                                        )}>
                                            {selectedExperiment.metrics.revenue.lift >= 0 ? "+" : ""}{selectedExperiment.metrics.revenue.lift}% Artış
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Trend Chart */}
                            <div className="mb-6">
                                <h4 className="text-sm font-medium text-gray-700 mb-3">Zaman İçinde Performans</h4>
                                <div className="h-48 bg-gray-50 rounded-xl p-4">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={trendData}>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                                            <XAxis dataKey="day" axisLine={false} tickLine={false} fontSize={12} />
                                            <YAxis axisLine={false} tickLine={false} fontSize={12} tickFormatter={(v) => `${v}%`} />
                                            <Tooltip />
                                            <Legend />
                                            <Line type="monotone" dataKey="control" name="Kontrol" stroke="#6b7280" strokeWidth={2} dot={false} />
                                            <Line type="monotone" dataKey="variant" name="Varyant" stroke="#10b981" strokeWidth={2} dot={false} />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            {/* Actions */}
                            {selectedExperiment.status === "running" && (
                                <div className="flex gap-3">
                                    <button className="flex-1 px-4 py-2.5 bg-yellow-100 text-yellow-700 rounded-xl text-sm font-medium hover:bg-yellow-200 flex items-center justify-center gap-2">
                                        <Pause className="w-4 h-4" />
                                        Duraklat
                                    </button>
                                    <button className="flex-1 px-4 py-2.5 bg-green-600 text-white rounded-xl text-sm font-medium hover:bg-green-700 flex items-center justify-center gap-2">
                                        <CheckCircle className="w-4 h-4" />
                                        Sonlandır & Kazananı Uygula
                                    </button>
                                </div>
                            )}

                            {selectedExperiment.status === "completed" && selectedExperiment.winner === "variant" && (
                                <div className="p-4 bg-green-50 border border-green-200 rounded-xl">
                                    <div className="flex items-center gap-3">
                                        <CheckCircle className="w-5 h-5 text-green-600" />
                                        <div>
                                            <p className="font-medium text-green-800">Varyant Kazandı!</p>
                                            <p className="text-sm text-green-600">Bu özellik tüm kullanıcılara açılabilir.</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="p-6 bg-gray-50 border-t border-gray-100">
                            <button
                                onClick={() => setSelectedExperiment(null)}
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
