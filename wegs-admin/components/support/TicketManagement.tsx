"use client";

import { useState } from "react";
import {
    MessageSquare,
    Clock,
    CheckCircle2,
    AlertCircle,
    User,
    Search,
    Filter,
    ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { TicketResponseModal } from "./TicketResponseModal";


import { Ticket } from "./types";

const mockTickets: Ticket[] = [
    {
        id: "TKT-001",
        subject: "E-Fatura entegrasyonu çalışmıyor",
        customerName: "Ahmet Yılmaz",
        customerEmail: "ahmet@techsoft.com",
        status: "open",
        priority: "critical",
        createdAt: "2024-12-15T10:30:00",
        lastUpdated: "2024-12-15T10:30:00",
        category: "Teknik",
        messages: [
            {
                id: "1",
                sender: "customer",
                message: "E-Fatura gönderimi sırasında 'Bağlantı hatası' alıyorum. Acil yardım gerekiyor.",
                timestamp: "2024-12-15T10:30:00",
            },
        ],
    },
    {
        id: "TKT-002",
        subject: "Fatura şablonu değişikliği",
        customerName: "Ayşe Demir",
        customerEmail: "ayse@butik.com",
        status: "in-progress",
        priority: "normal",
        createdAt: "2024-12-14T14:20:00",
        lastUpdated: "2024-12-15T09:15:00",
        category: "Özelleştirme",
        messages: [
            {
                id: "1",
                sender: "customer",
                message: "Fatura şablonumuza logo ve footer eklemek istiyoruz.",
                timestamp: "2024-12-14T14:20:00",
            },
            {
                id: "2",
                sender: "support",
                message: "Talebinizi aldık. Şablonunuzu hazırlıyoruz, en geç yarın size ileteceğiz.",
                timestamp: "2024-12-14T16:30:00",
            },
        ],
    },
    {
        id: "TKT-003",
        subject: "Raporlama modülü yavaş çalışıyor",
        customerName: "Mehmet Kaya",
        customerEmail: "mehmet@lojistik.com",
        status: "open",
        priority: "high",
        createdAt: "2024-12-15T08:45:00",
        lastUpdated: "2024-12-15T08:45:00",
        category: "Performans",
        messages: [
            {
                id: "1",
                sender: "customer",
                message: "Son bir haftadır raporlar çok yavaş yükleniyor. Bazen 2-3 dakika sürüyor.",
                timestamp: "2024-12-15T08:45:00",
            },
        ],
    },
    {
        id: "TKT-004",
        subject: "Yeni kullanıcı ekleme yetki sorunu",
        customerName: "Zeynep Çelik",
        customerEmail: "zeynep@design.com",
        status: "resolved",
        priority: "normal",
        createdAt: "2024-12-12T11:00:00",
        lastUpdated: "2024-12-13T14:20:00",
        category: "Yetkilendirme",
        messages: [
            {
                id: "1",
                sender: "customer",
                message: "Alt kullanıcı ekleyemiyorum, 'Yetki Yok' hatası alıyorum.",
                timestamp: "2024-12-12T11:00:00",
            },
            {
                id: "2",
                sender: "support",
                message: "Hesabınızı kontrol ettik. Yönetici rolü atanmamıştı, düzelttik. Şimdi deneyebilirsiniz.",
                timestamp: "2024-12-13T14:20:00",
            },
            {
                id: "3",
                sender: "customer",
                message: "Çalıştı, teşekkürler!",
                timestamp: "2024-12-13T15:00:00",
            },
        ],
    },
    {
        id: "TKT-005",
        subject: "Eğitim talebi - E-Ticaret modülü",
        customerName: "Caner Erkin",
        customerEmail: "caner@sports.com",
        status: "open",
        priority: "low",
        createdAt: "2024-12-15T09:00:00",
        lastUpdated: "2024-12-15T09:00:00",
        category: "Eğitim",
        messages: [
            {
                id: "1",
                sender: "customer",
                message: "E-Ticaret modülünü kullanmaya başlayacağız. Online eğitim almak istiyoruz.",
                timestamp: "2024-12-15T09:00:00",
            },
        ],
    },
];

const statusConfig = {
    open: { label: "Açık", color: "bg-blue-100 text-blue-800", icon: AlertCircle },
    "in-progress": { label: "İşlemde", color: "bg-yellow-100 text-yellow-800", icon: Clock },
    resolved: { label: "Çözüldü", color: "bg-green-100 text-green-800", icon: CheckCircle2 },
    closed: { label: "Kapatıldı", color: "bg-gray-100 text-gray-800", icon: CheckCircle2 },
};

const priorityConfig = {
    low: { label: "Düşük", color: "text-gray-500" },
    normal: { label: "Normal", color: "text-blue-500" },
    high: { label: "Yüksek", color: "text-orange-500" },
    critical: { label: "Kritik", color: "text-red-600 font-semibold" },
};

export function TicketManagement() {
    const [tickets, setTickets] = useState<Ticket[]>(mockTickets);
    const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState<string>("all");

    const filteredTickets = tickets.filter((ticket) => {
        const matchesSearch =
            ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
            ticket.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            ticket.id.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === "all" || ticket.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const handleOpenTicket = (ticket: Ticket) => {
        setSelectedTicket(ticket);
        setIsModalOpen(true);
    };

    const handleSendResponse = (ticketId: string, message: string, newStatus: string) => {
        setTickets((prev) =>
            prev.map((t) => {
                if (t.id === ticketId) {
                    return {
                        ...t,
                        status: newStatus as Ticket["status"],
                        lastUpdated: new Date().toISOString(),
                        messages: [
                            ...t.messages,
                            {
                                id: String(t.messages.length + 1),
                                sender: "support" as const,
                                message,
                                timestamp: new Date().toISOString(),
                            },
                        ],
                    };
                }
                return t;
            })
        );
        setIsModalOpen(false);
    };

    const openCount = tickets.filter((t) => t.status === "open").length;
    const inProgressCount = tickets.filter((t) => t.status === "in-progress").length;
    const criticalCount = tickets.filter((t) => t.priority === "critical" && t.status !== "resolved" && t.status !== "closed").length;
    const resolvedCount = tickets.filter((t) => t.status === "resolved" || t.status === "closed").length;

    // KPI Metrics
    const avgResponseTime = "2.4 saat"; // Mock data
    const avgResolutionTime = "18.5 saat"; // Mock data
    const slaCompliance = 94.2; // Mock percentage
    const customerSatisfaction = 4.6; // Mock out of 5

    return (
        <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5">
            {/* KPI Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-slate-50">
                <div className="text-center p-3 bg-white rounded-lg shadow-sm">
                    <div className="flex items-center justify-center mb-2">
                        <Clock className="h-5 w-5 text-blue-600" />
                    </div>
                    <p className="text-xl font-bold text-gray-900">{avgResponseTime}</p>
                    <p className="text-xs text-gray-500">Ort. İlk Yanıt Süresi</p>
                </div>
                <div className="text-center p-3 bg-white rounded-lg shadow-sm">
                    <div className="flex items-center justify-center mb-2">
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                    </div>
                    <p className="text-xl font-bold text-gray-900">{avgResolutionTime}</p>
                    <p className="text-xs text-gray-500">Ort. Çözüm Süresi</p>
                </div>
                <div className="text-center p-3 bg-white rounded-lg shadow-sm">
                    <div className="flex items-center justify-center mb-2">
                        <AlertCircle className="h-5 w-5 text-purple-600" />
                    </div>
                    <p className="text-xl font-bold text-gray-900">%{slaCompliance}</p>
                    <p className="text-xs text-gray-500">SLA Uyumu</p>
                </div>
                <div className="text-center p-3 bg-white rounded-lg shadow-sm">
                    <div className="flex items-center justify-center mb-2">
                        <User className="h-5 w-5 text-orange-600" />
                    </div>
                    <p className="text-xl font-bold text-gray-900">{customerSatisfaction}/5</p>
                    <p className="text-xs text-gray-500">Müşteri Memnuniyeti</p>
                </div>
            </div>

            {/* Header Stats */}
            <div className="border-b border-gray-200 p-4">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Destek Talepleri</h3>
                    <div className="flex items-center gap-3">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {openCount} Açık
                        </span>
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            {inProgressCount} İşlemde
                        </span>
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            {resolvedCount} Çözüldü
                        </span>
                        {criticalCount > 0 && (
                            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 animate-pulse">
                                {criticalCount} Kritik
                            </span>
                        )}
                    </div>
                </div>

                {/* Filters */}
                <div className="flex items-center gap-4">
                    <div className="relative flex-1 max-w-sm">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Talep ara..."
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
                        <option value="open">Açık</option>
                        <option value="in-progress">İşlemde</option>
                        <option value="resolved">Çözüldü</option>
                        <option value="closed">Kapatıldı</option>
                    </select>
                </div>
            </div>

            {/* Ticket List */}
            <div className="divide-y divide-gray-100 max-h-[500px] overflow-y-auto">
                {filteredTickets.length === 0 ? (
                    <div className="p-8 text-center text-gray-500">
                        <MessageSquare className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                        <p>Gösterilecek talep bulunamadı.</p>
                    </div>
                ) : (
                    filteredTickets.map((ticket) => {
                        const StatusIcon = statusConfig[ticket.status].icon;
                        return (
                            <div
                                key={ticket.id}
                                onClick={() => handleOpenTicket(ticket)}
                                className={cn(
                                    "p-4 hover:bg-gray-50 cursor-pointer transition-colors",
                                    ticket.priority === "critical" && ticket.status === "open" && "bg-red-50/50"
                                )}
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex items-start gap-3">
                                        <div className="flex-shrink-0 mt-1">
                                            <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                                                <User className="h-4 w-4 text-gray-500" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs font-mono text-gray-400">{ticket.id}</span>
                                                <span className={cn("text-xs font-medium", priorityConfig[ticket.priority].color)}>
                                                    {priorityConfig[ticket.priority].label}
                                                </span>
                                            </div>
                                            <p className="font-medium text-gray-900 mt-0.5">{ticket.subject}</p>
                                            <p className="text-sm text-gray-500 mt-0.5">
                                                {ticket.customerName} • {ticket.category}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end gap-2">
                                        <span
                                            className={cn(
                                                "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium",
                                                statusConfig[ticket.status].color
                                            )}
                                        >
                                            <StatusIcon className="h-3 w-3 mr-1" />
                                            {statusConfig[ticket.status].label}
                                        </span>
                                        <span className="text-xs text-gray-400">
                                            {new Date(ticket.lastUpdated).toLocaleDateString("tr-TR", {
                                                day: "numeric",
                                                month: "short",
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            })}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

            {/* Response Modal */}
            {selectedTicket && (
                <TicketResponseModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    ticket={selectedTicket}
                    onSendResponse={handleSendResponse}
                />
            )}
        </div>
    );
}
