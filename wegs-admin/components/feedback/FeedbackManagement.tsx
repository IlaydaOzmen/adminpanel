"use client";

import { useState } from "react";
import {
    MessageSquare,
    Lightbulb,
    AlertCircle,
    HelpCircle,
    Clock,
    CheckCircle2,
    User,
    Send,
    X,
    Search,
    Filter,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface FeedbackItem {
    id: string;
    type: "request" | "suggestion" | "complaint";
    subject: string;
    message: string;
    customerName: string;
    customerEmail: string;
    status: "pending" | "in-review" | "responded" | "closed";
    createdAt: string;
    responses: {
        id: string;
        message: string;
        sender: "admin" | "customer";
        timestamp: string;
    }[];
}

const mockFeedbacks: FeedbackItem[] = [
    {
        id: "FB-001",
        type: "request",
        subject: "Mobil uygulamada bildirim özelliği",
        message: "Fatura oluşturulduğunda mobil bildirim almak istiyoruz. Bu özellik ne zaman gelecek?",
        customerName: "Ahmet Yılmaz",
        customerEmail: "ahmet@techsoft.com",
        status: "pending",
        createdAt: "2024-12-15T09:30:00",
        responses: [],
    },
    {
        id: "FB-002",
        type: "suggestion",
        subject: "Dashboard'a kısayollar eklenmeli",
        message: "Sık kullanılan işlemler için dashboard'a kısayol butonları eklenirse çok iyi olur. Mesela 'Hızlı Fatura Oluştur' gibi.",
        customerName: "Ayşe Demir",
        customerEmail: "ayse@butik.com",
        status: "in-review",
        createdAt: "2024-12-14T14:20:00",
        responses: [
            {
                id: "1",
                message: "Öneriniz için teşekkürler! Geliştirme ekibimize ilettik.",
                sender: "admin",
                timestamp: "2024-12-14T16:00:00",
            },
        ],
    },
    {
        id: "FB-003",
        type: "complaint",
        subject: "Raporlar çok yavaş yükleniyor",
        message: "Son 1 haftadır raporlama modülü çok yavaş çalışıyor. Bazen 2-3 dakika sürüyor. İşlerimizi aksatıyor.",
        customerName: "Mehmet Kaya",
        customerEmail: "mehmet@lojistik.com",
        status: "responded",
        createdAt: "2024-12-13T11:00:00",
        responses: [
            {
                id: "1",
                message: "Şikayetinizi aldık. Teknik ekibimiz sorunu inceliyor.",
                sender: "admin",
                timestamp: "2024-12-13T12:30:00",
            },
            {
                id: "2",
                message: "Teşekkürler, bekleyeceğim.",
                sender: "customer",
                timestamp: "2024-12-13T13:00:00",
            },
            {
                id: "3",
                message: "Performans sorunu çözüldü. Sunucu kapasitesini artırdık. Lütfen tekrar deneyin.",
                sender: "admin",
                timestamp: "2024-12-14T10:00:00",
            },
        ],
    },
    {
        id: "FB-004",
        type: "request",
        subject: "Excel'den toplu veri aktarımı",
        message: "Müşteri listesini Excel'den toplu olarak yükleyebilmek istiyoruz. Mümkün mü?",
        customerName: "Zeynep Çelik",
        customerEmail: "zeynep@design.com",
        status: "closed",
        createdAt: "2024-12-10T16:45:00",
        responses: [
            {
                id: "1",
                message: "Bu özellik yakında eklenecek. Önümüzdeki ay planlıyoruz.",
                sender: "admin",
                timestamp: "2024-12-10T17:30:00",
            },
        ],
    },
    {
        id: "FB-005",
        type: "suggestion",
        subject: "Karanlık mod için öneriler",
        message: "Karanlık modda bazı butonların kontrast oranı düşük. Özellikle mavi butonlar göz yoruyor.",
        customerName: "Caner Erkin",
        customerEmail: "caner@sports.com",
        status: "pending",
        createdAt: "2024-12-15T08:15:00",
        responses: [],
    },
    {
        id: "FB-006",
        type: "complaint",
        subject: "Fatura PDF'i bozuk görünüyor",
        message: "Fatura PDF'lerinde Türkçe karakterler bozuk çıkıyor. ı, ş, ğ gibi harfler düzgün görünmüyor.",
        customerName: "Ali Vural",
        customerEmail: "ali@import.com",
        status: "in-review",
        createdAt: "2024-12-14T10:00:00",
        responses: [],
    },
];

const typeConfig = {
    request: { label: "İstek", icon: HelpCircle, color: "bg-blue-100 text-blue-800", bgColor: "bg-blue-50" },
    suggestion: { label: "Öneri", icon: Lightbulb, color: "bg-green-100 text-green-800", bgColor: "bg-green-50" },
    complaint: { label: "Şikayet", icon: AlertCircle, color: "bg-red-100 text-red-800", bgColor: "bg-red-50" },
};

const statusConfig = {
    pending: { label: "Bekliyor", color: "bg-gray-100 text-gray-800" },
    "in-review": { label: "İnceleniyor", color: "bg-yellow-100 text-yellow-800" },
    responded: { label: "Yanıtlandı", color: "bg-blue-100 text-blue-800" },
    closed: { label: "Kapatıldı", color: "bg-green-100 text-green-800" },
};

interface FeedbackManagementProps {
    onSelectFeedback: (feedback: FeedbackItem) => void;
}

export function FeedbackManagement({ onSelectFeedback }: FeedbackManagementProps) {
    const [feedbacks] = useState<FeedbackItem[]>(mockFeedbacks);
    const [searchTerm, setSearchTerm] = useState("");
    const [typeFilter, setTypeFilter] = useState<string>("all");
    const [statusFilter, setStatusFilter] = useState<string>("all");

    const filteredFeedbacks = feedbacks.filter((fb) => {
        const matchesSearch =
            fb.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
            fb.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            fb.id.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = typeFilter === "all" || fb.type === typeFilter;
        const matchesStatus = statusFilter === "all" || fb.status === statusFilter;
        return matchesSearch && matchesType && matchesStatus;
    });

    const pendingCount = feedbacks.filter((f) => f.status === "pending").length;
    const requestCount = feedbacks.filter((f) => f.type === "request").length;
    const suggestionCount = feedbacks.filter((f) => f.type === "suggestion").length;
    const complaintCount = feedbacks.filter((f) => f.type === "complaint").length;

    return (
        <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5">
            {/* Header Stats */}
            <div className="border-b border-gray-200 p-4">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Geri Bildirim Yönetimi</h3>
                    <div className="flex items-center gap-2">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            {pendingCount} Bekliyor
                        </span>
                    </div>
                </div>

                {/* Type Tabs */}
                <div className="flex items-center gap-2 mb-4">
                    <button
                        onClick={() => setTypeFilter("all")}
                        className={cn(
                            "inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                            typeFilter === "all"
                                ? "bg-gray-900 text-white"
                                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        )}
                    >
                        <MessageSquare className="h-4 w-4" />
                        Tümü
                        <span className={cn(
                            "px-1.5 py-0.5 rounded text-xs",
                            typeFilter === "all" ? "bg-white/20" : "bg-gray-200"
                        )}>
                            {feedbacks.length}
                        </span>
                    </button>
                    <button
                        onClick={() => setTypeFilter("request")}
                        className={cn(
                            "inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                            typeFilter === "request"
                                ? "bg-blue-600 text-white"
                                : "bg-blue-50 text-blue-700 hover:bg-blue-100"
                        )}
                    >
                        <HelpCircle className="h-4 w-4" />
                        İstekler
                        <span className={cn(
                            "px-1.5 py-0.5 rounded text-xs",
                            typeFilter === "request" ? "bg-white/20" : "bg-blue-100"
                        )}>
                            {requestCount}
                        </span>
                    </button>
                    <button
                        onClick={() => setTypeFilter("suggestion")}
                        className={cn(
                            "inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                            typeFilter === "suggestion"
                                ? "bg-green-600 text-white"
                                : "bg-green-50 text-green-700 hover:bg-green-100"
                        )}
                    >
                        <Lightbulb className="h-4 w-4" />
                        Öneriler
                        <span className={cn(
                            "px-1.5 py-0.5 rounded text-xs",
                            typeFilter === "suggestion" ? "bg-white/20" : "bg-green-100"
                        )}>
                            {suggestionCount}
                        </span>
                    </button>
                    <button
                        onClick={() => setTypeFilter("complaint")}
                        className={cn(
                            "inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                            typeFilter === "complaint"
                                ? "bg-red-600 text-white"
                                : "bg-red-50 text-red-700 hover:bg-red-100"
                        )}
                    >
                        <AlertCircle className="h-4 w-4" />
                        Şikayetler
                        <span className={cn(
                            "px-1.5 py-0.5 rounded text-xs",
                            typeFilter === "complaint" ? "bg-white/20" : "bg-red-100"
                        )}>
                            {complaintCount}
                        </span>
                    </button>
                </div>

                {/* Search and Status Filter */}
                <div className="flex items-center gap-4">
                    <div className="relative flex-1 max-w-sm">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Ara..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="all">Tüm Durumlar</option>
                        <option value="pending">Bekliyor</option>
                        <option value="in-review">İnceleniyor</option>
                        <option value="responded">Yanıtlandı</option>
                        <option value="closed">Kapatıldı</option>
                    </select>
                </div>
            </div>

            {/* Feedback List */}
            <div className="divide-y divide-gray-100 max-h-[600px] overflow-y-auto">
                {filteredFeedbacks.length === 0 ? (
                    <div className="p-8 text-center text-gray-500">
                        <MessageSquare className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                        <p>Gösterilecek geri bildirim bulunamadı.</p>
                    </div>
                ) : (
                    filteredFeedbacks.map((feedback) => {
                        const TypeIcon = typeConfig[feedback.type].icon;
                        return (
                            <div
                                key={feedback.id}
                                onClick={() => onSelectFeedback(feedback)}
                                className={cn(
                                    "p-4 hover:bg-gray-50 cursor-pointer transition-colors",
                                    feedback.status === "pending" && "bg-yellow-50/30"
                                )}
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex items-start gap-3">
                                        <div className={cn("p-2 rounded-lg", typeConfig[feedback.type].bgColor)}>
                                            <TypeIcon className={cn("h-5 w-5", feedback.type === "request" ? "text-blue-600" : feedback.type === "suggestion" ? "text-green-600" : "text-red-600")} />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="text-xs font-mono text-gray-400">{feedback.id}</span>
                                                <span className={cn("px-2 py-0.5 rounded text-xs font-medium", typeConfig[feedback.type].color)}>
                                                    {typeConfig[feedback.type].label}
                                                </span>
                                            </div>
                                            <p className="font-medium text-gray-900">{feedback.subject}</p>
                                            <p className="text-sm text-gray-500 mt-1 line-clamp-2">{feedback.message}</p>
                                            <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                                                <span className="flex items-center gap-1">
                                                    <User className="h-3 w-3" />
                                                    {feedback.customerName}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <MessageSquare className="h-3 w-3" />
                                                    {feedback.responses.length} yanıt
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <Clock className="h-3 w-3" />
                                                    {new Date(feedback.createdAt).toLocaleDateString("tr-TR")}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <span className={cn("px-2.5 py-1 rounded-full text-xs font-medium", statusConfig[feedback.status].color)}>
                                        {statusConfig[feedback.status].label}
                                    </span>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
}
