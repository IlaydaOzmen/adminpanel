"use client";

import { useState } from "react";
import { X, Send, User, Clock, Lightbulb, AlertCircle, HelpCircle, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { FeedbackItem } from "./FeedbackManagement";

interface FeedbackResponseModalProps {
    isOpen: boolean;
    onClose: () => void;
    feedback: FeedbackItem;
    onSendResponse: (feedbackId: string, message: string, newStatus: string) => void;
}

const typeConfig = {
    request: { label: "İstek", icon: HelpCircle, color: "bg-blue-100 text-blue-700" },
    suggestion: { label: "Öneri", icon: Lightbulb, color: "bg-green-100 text-green-700" },
    complaint: { label: "Şikayet", icon: AlertCircle, color: "bg-red-100 text-red-700" },
};

const statusOptions = [
    { value: "pending", label: "Bekliyor" },
    { value: "in-review", label: "İnceleniyor" },
    { value: "responded", label: "Yanıtlandı" },
    { value: "closed", label: "Kapatıldı" },
];

export function FeedbackResponseModal({
    isOpen,
    onClose,
    feedback,
    onSendResponse,
}: FeedbackResponseModalProps) {
    const [response, setResponse] = useState("");
    const [newStatus, setNewStatus] = useState<"pending" | "in-review" | "responded" | "closed">(feedback.status);
    const [isSending, setIsSending] = useState(false);

    if (!isOpen) return null;

    const TypeIcon = typeConfig[feedback.type].icon;

    const handleSubmit = async () => {
        if (!response.trim()) {
            alert("Lütfen bir yanıt yazın.");
            return;
        }

        setIsSending(true);
        await new Promise((resolve) => setTimeout(resolve, 800));
        onSendResponse(feedback.id, response, newStatus);
        setResponse("");
        setIsSending(false);
    };

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-screen items-center justify-center p-4">
                {/* Backdrop */}
                <div className="fixed inset-0 bg-black/50 transition-opacity" onClick={onClose} />

                {/* Modal */}
                <div className="relative bg-white rounded-xl shadow-xl max-w-3xl w-full max-h-[90vh] flex flex-col">
                    {/* Header */}
                    <div className="flex items-start justify-between p-4 border-b border-gray-200">
                        <div className="flex items-start gap-3">
                            <div className={cn("p-2 rounded-lg", feedback.type === "request" ? "bg-blue-50" : feedback.type === "suggestion" ? "bg-green-50" : "bg-red-50")}>
                                <TypeIcon className={cn("h-6 w-6", feedback.type === "request" ? "text-blue-600" : feedback.type === "suggestion" ? "text-green-600" : "text-red-600")} />
                            </div>
                            <div>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-mono text-gray-400">{feedback.id}</span>
                                    <span className={cn("px-2 py-0.5 rounded text-xs font-medium", typeConfig[feedback.type].color)}>
                                        {typeConfig[feedback.type].label}
                                    </span>
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mt-1">{feedback.subject}</h3>
                                <p className="text-sm text-gray-500 mt-0.5">
                                    {feedback.customerName} • {feedback.customerEmail}
                                </p>
                            </div>
                        </div>
                        <button onClick={onClose} className="p-1 rounded-lg hover:bg-gray-100 transition-colors">
                            <X className="h-5 w-5 text-gray-400" />
                        </button>
                    </div>

                    {/* Original Message */}
                    <div className="p-4 bg-gray-50 border-b border-gray-200">
                        <p className="text-sm font-medium text-gray-700 mb-2">Orijinal Mesaj:</p>
                        <p className="text-gray-600 text-sm bg-white p-3 rounded-lg border border-gray-200">
                            {feedback.message}
                        </p>
                        <p className="text-xs text-gray-400 mt-2 flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {new Date(feedback.createdAt).toLocaleDateString("tr-TR", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                            })}
                        </p>
                    </div>

                    {/* Conversation Thread */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[300px]">
                        {feedback.responses.length === 0 ? (
                            <div className="text-center py-8 text-gray-400">
                                <p className="text-sm">Henüz yanıt verilmemiş.</p>
                            </div>
                        ) : (
                            feedback.responses.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={cn(
                                        "flex gap-3",
                                        msg.sender === "admin" && "flex-row-reverse"
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
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-xs font-medium text-gray-500">
                                                {msg.sender === "admin" ? "Admin" : feedback.customerName}
                                            </span>
                                        </div>
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
                            ))
                        )}
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
                                rows={3}
                                className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                            />
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <label className="text-sm font-medium text-gray-700">Durum:</label>
                                <select
                                    value={newStatus}
                                    onChange={(e) => setNewStatus(e.target.value as "pending" | "in-review" | "responded" | "closed")}
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
