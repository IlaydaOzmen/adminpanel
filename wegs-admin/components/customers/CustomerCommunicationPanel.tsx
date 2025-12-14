"use client";

import { useState } from "react";
import { Mail, Megaphone, Send, BadgeInfo, AlertTriangle, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function CustomerCommunicationPanel() {
    const [activeTab, setActiveTab] = useState<"mail" | "announcement">("mail");
    const [isSent, setIsSent] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSent(true);
        setTimeout(() => setIsSent(false), 3000);
    };

    return (
        <div className="bg-white shadow-sm ring-1 ring-gray-900/5 rounded-xl overflow-hidden mt-6">
            <div className="border-b border-gray-200">
                <nav className="-mb-px flex" aria-label="Tabs">
                    <button
                        onClick={() => setActiveTab("mail")}
                        className={cn(
                            "w-1/2 border-b-2 py-4 px-1 text-center text-sm font-medium transition-colors",
                            activeTab === "mail"
                                ? "border-blue-500 text-blue-600"
                                : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                        )}
                    >
                        <div className="flex items-center justify-center">
                            <Mail className="mr-2 h-4 w-4" />
                            Mail Gönder
                        </div>
                    </button>
                    <button
                        onClick={() => setActiveTab("announcement")}
                        className={cn(
                            "w-1/2 border-b-2 py-4 px-1 text-center text-sm font-medium transition-colors",
                            activeTab === "announcement"
                                ? "border-purple-500 text-purple-600"
                                : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                        )}
                    >
                        <div className="flex items-center justify-center">
                            <Megaphone className="mr-2 h-4 w-4" />
                            Özel Duyuru Ekle
                        </div>
                    </button>
                </nav>
            </div>

            <div className="p-6">
                {isSent ? (
                    <div className="flex flex-col items-center justify-center py-6 text-center animate-in fade-in zoom-in duration-300">
                        <div className="rounded-full bg-green-100 p-3">
                            <CheckCircle2 className="h-8 w-8 text-green-600" />
                        </div>
                        <h3 className="mt-4 text-sm font-semibold text-gray-900">İşlem Başarılı</h3>
                        <p className="mt-2 text-sm text-gray-500">
                            {activeTab === "mail" ? "E-posta başarıyla gönderildi." : "Duyuru müşteriye eklendi."}
                        </p>
                        <button
                            onClick={() => setIsSent(false)}
                            className="mt-6 text-sm font-medium text-blue-600 hover:text-blue-500"
                        >
                            Yeni İşlem Yap
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit}>
                        {activeTab === "mail" ? (
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Konu</label>
                                    <input
                                        type="text"
                                        id="subject"
                                        className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm"
                                        placeholder="Örn: Abonelik Yenileme Hakkında"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700">Mesaj İçeriği</label>
                                    <textarea
                                        id="message"
                                        rows={4}
                                        className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm"
                                        placeholder="Müşteriye iletmek istediğiniz mesaj..."
                                        required
                                    />
                                </div>
                                <div className="flex justify-end">
                                    <button
                                        type="submit"
                                        className="inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500"
                                    >
                                        <Send className="mr-2 h-4 w-4" />
                                        Gönder
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">Duyuru Başlığı</label>
                                    <input
                                        type="text"
                                        id="title"
                                        className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 py-2 px-3 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 sm:text-sm"
                                        placeholder="Örn: Bakım Çalışması"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="type" className="block text-sm font-medium text-gray-700">Duyuru Tipi</label>
                                    <select
                                        id="type"
                                        className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 py-2 px-3 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 sm:text-sm"
                                    >
                                        <option value="info">Bilgilendirme</option>
                                        <option value="warning">Uyarı / Önemli</option>
                                        <option value="success">Kampanya / Fırsat</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="content" className="block text-sm font-medium text-gray-700">İçerik</label>
                                    <textarea
                                        id="content"
                                        rows={3}
                                        className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 py-2 px-3 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 sm:text-sm"
                                        placeholder="Duyuru detayları..."
                                        required
                                    />
                                </div>
                                <div className="flex justify-end">
                                    <button
                                        type="submit"
                                        className="inline-flex items-center rounded-md bg-purple-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-purple-500"
                                    >
                                        <Megaphone className="mr-2 h-4 w-4" />
                                        Yayınla
                                    </button>
                                </div>
                            </div>
                        )}
                    </form>
                )}
            </div>
        </div>
    );
}
