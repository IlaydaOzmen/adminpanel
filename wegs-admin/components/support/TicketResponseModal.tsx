"use client";

import { useState } from "react";
import { X, Send, User, Clock, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Ticket } from "./types";

interface TicketResponseModalProps {
    isOpen: boolean;
    onClose: () => void;
    ticket: Ticket;
    onSendResponse: (ticketId: string, message: string, newStatus: string) => void;
}

const statusOptions = [
    { value: "open", label: "Açık" },
    { value: "in-progress", label: "İşlemde" },
    { value: "resolved", label: "Çözüldü" },
    { value: "closed", label: "Kapatıldı" },
];

const priorityConfig = {
    low: { label: "Düşük", color: "bg-gray-100 text-gray-700" },
    normal: { label: "Normal", color: "bg-blue-100 text-blue-700" },
    high: { label: "Yüksek", color: "bg-orange-100 text-orange-700" },
    critical: { label: "Kritik", color: "bg-red-100 text-red-700" },
};

export function TicketResponseModal({
    isOpen,
    onClose,
    ticket,
    onSendResponse,
}: TicketResponseModalProps) {
    const [response, setResponse] = useState("");
    const [newStatus, setNewStatus] = useState<"open" | "in-progress" | "resolved" | "closed">(ticket.status);
    const [isSending, setIsSending] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async () => {
        if (!response.trim()) {
            alert("Lütfen bir yanıt yazın.");
            return;
        }

        setIsSending(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 800));
        onSendResponse(ticket.id, response, newStatus);
        setResponse("");
        setIsSending(false);
    };

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-screen items-center justify-center p-4">
                {/* Backdrop */}
                <div
                    className="fixed inset-0 bg-black/50 transition-opacity"
                    onClick={onClose}
                />

                {/* Modal */}
                <div className="relative bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] flex flex-col">
                    {/* Header */}
                    <div className="flex items-start justify-between p-4 border-b border-gray-200">
                        <div>
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-mono text-gray-400">{ticket.id}</span>
                                <span className={cn("px-2 py-0.5 rounded text-xs font-medium", priorityConfig[ticket.priority].color)}>
                                    {priorityConfig[ticket.priority].label}
                                </span>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mt-1">{ticket.subject}</h3>
                            <p className="text-sm text-gray-500 mt-0.5">
                                {ticket.customerName} • {ticket.customerEmail}
                            </p>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                            <X className="h-5 w-5 text-gray-400" />
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[300px]">
                        {ticket.messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={cn(
                                    "flex gap-3",
                                    msg.sender === "support" && "flex-row-reverse"
                                )}
                            >
                                <div className={cn(
                                    "flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center",
                                    msg.sender === "customer" ? "bg-gray-100" : "bg-blue-100"
                                )}>
                                    <User className={cn(
                                        "h-4 w-4",
                                        msg.sender === "customer" ? "text-gray-500" : "text-blue-600"
                                    )} />
                                </div>
                                <div className={cn(
                                    "max-w-[80%] rounded-lg p-3",
                                    msg.sender === "customer"
                                        ? "bg-gray-100 text-gray-900"
                                        : "bg-blue-50 text-gray-900"
                                )}>
                                    <p className="text-sm">{msg.message}</p>
                                    <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                                        <Clock className="h-3 w-3" />
                                        {new Date(msg.timestamp).toLocaleDateString("tr-TR", {
                                            day: "numeric",
                                            month: "short",
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Response Area */}
                    <div className="border-t border-gray-200 p-4 space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Yanıtınız
                            </label>
                            <textarea
                                value={response}
                                onChange={(e) => setResponse(e.target.value)}
                                placeholder="Müşteriye yanıtınızı yazın..."
                                rows={4}
                                className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                            />
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <label className="text-sm font-medium text-gray-700">Durum:</label>
                                <select
                                    value={newStatus}
                                    onChange={(e) => setNewStatus(e.target.value as "open" | "in-progress" | "resolved" | "closed")}
                                    className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    {statusOptions.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="flex items-center gap-2">
                                <button
                                    onClick={onClose}
                                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    İptal
                                </button>
                                <button
                                    onClick={handleSubmit}
                                    disabled={isSending || !response.trim()}
                                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    <Send className="h-4 w-4 mr-2" />
                                    {isSending ? "Gönderiliyor..." : "Yanıt Gönder"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
