"use client";

import { TrainingCalendar, CalendarEvent } from "@/components/support/TrainingCalendar";
import { PageContainer } from "@/components/layout/PageContainer";
import { PageHeader } from "@/components/layout/PageHeader";
import { GraduationCap, Users, UserX, BookOpen, BarChart3, ExternalLink } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

import { CustomerListModal } from "@/components/support/CustomerListModal";


export default function SupportPage() {
    // Initial data
    const [scheduledTrainings, setScheduledTrainings] = useState<CalendarEvent[]>([
        { id: 1, day: 12, time: "10:00", title: "Temel Eğitim - E-Fatura", customer: "Atlas Lojistik", type: "online" },
        { id: 2, day: 12, time: "14:30", title: "İleri Seviye Raporlama", customer: "TechSoft A.Ş.", type: "onsite" },
        { id: 3, day: 14, time: "11:00", title: "Entegrasyon Kontrolü", customer: "Mega Market", type: "online" },
        { id: 4, day: 15, time: "09:30", title: "Yeni Personel Eğitimi", customer: "Birlik Gıda", type: "online" },
        { id: 5, day: 18, time: "13:00", title: "Güvenlik Modülü Eğitimi", customer: "Kaya Holding", type: "online" },
    ]);

    // Modal State
    const [isListModalOpen, setIsListModalOpen] = useState(false);
    const [listType, setListType] = useState<'trained' | 'untrained'>('trained');

    // Mock Data for Lists
    const trainedCustomers = [
        "Atlas Lojistik", "TechSoft A.Ş.", "Mega Market", "Birlik Gıda",
        "Kaya Holding", "ABC Lojistik", "XYZ Market", "Beta Teknoloji",
        "Gamma İnşaat", "Delta Dağıtım", "Epsilon Enerji", "Zeta Kimya"
    ];

    const untrainedCustomers = [
        "Yeni Kullanıcı A.Ş.", "Start-up Bilişim", "Hızlı Kargo Ltd.",
        "Anadolu Tarım", "Ege Zeytincilik", "Marmara Tekstil"
    ];

    const handleOpenList = (type: 'trained' | 'untrained') => {
        setListType(type);
        setIsListModalOpen(true);
    };

    const [formData, setFormData] = useState({
        customer: "",
        type: "online",
        date: ""
    });

    const handleAddToCalendar = () => {
        if (!formData.customer || !formData.date || !formData.type) {
            alert("Lütfen tüm alanları doldurun.");
            return;
        }

        const dateObj = new Date(formData.date);
        const day = dateObj.getDate();

        // Simple conflict check: is there already an event on this day?
        // Note: For a real app, check month/year too. Here we assume current month for simplicity or just check day number.
        const isConflict = scheduledTrainings.some(t => t.day === day);

        if (isConflict) {
            alert(`Dikkat: ${day} tarihinde zaten bir eğitim planlanmış! Lütfen başka bir tarih seçin.`);
            return;
        }

        const newEvent: CalendarEvent = {
            id: Date.now(),
            day: day,
            time: "09:00", // Default time
            title: `${formData.type === 'online' ? 'Online' : 'Yerinde'} Eğitim`,
            customer: formData.customer,
            type: formData.type as 'online' | 'onsite'
        };

        setScheduledTrainings([...scheduledTrainings, newEvent]);
        setFormData({ customer: "", type: "online", date: "" });
        alert("Eğitim başarıyla takvime eklendi.");
    };

    return (
        <PageContainer>
            <PageHeader title="Destek ve Eğitim Merkezi">
                <Link
                    href="/support/training"
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                >
                    <GraduationCap className="h-4 w-4 mr-2" />
                    Eğitim Yönetimi
                    <ExternalLink className="h-3 w-3 ml-2" />
                </Link>
            </PageHeader>

            {/* Top Metrics */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <Link
                    href="/support/training?status=trained"
                    className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-900/5 cursor-pointer hover:shadow-md transition-shadow group"
                >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <div className="rounded-md bg-green-50 p-2 ring-1 ring-green-100 group-hover:bg-green-100 transition-colors">
                                <GraduationCap className="h-6 w-6 text-green-600" />
                            </div>
                            <div className="ml-4">
                                <h3 className="text-sm font-medium text-gray-500">Eğitim Verilen Müşteri</h3>
                                <div className="mt-1 flex items-baseline">
                                    <p className="text-2xl font-semibold text-gray-900">842</p>
                                    <p className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                                        %65
                                    </p>
                                </div>
                            </div>
                        </div>
                        <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-green-600 transition-colors" />
                    </div>
                </Link>

                <Link
                    href="/support/training?status=untrained"
                    className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-900/5 cursor-pointer hover:shadow-md transition-shadow group"
                >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <div className="rounded-md bg-red-50 p-2 ring-1 ring-red-100 group-hover:bg-red-100 transition-colors">
                                <UserX className="h-6 w-6 text-red-600" />
                            </div>
                            <div className="ml-4">
                                <h3 className="text-sm font-medium text-gray-500">Eğitimsiz Aktif Müşteri</h3>
                                <div className="mt-1 flex items-baseline">
                                    <p className="text-2xl font-semibold text-gray-900">124</p>
                                    <p className="ml-2 text-xs text-red-500 font-medium">Kritik! Hemen planla.</p>
                                </div>
                            </div>
                        </div>
                        <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-red-600 transition-colors" />
                    </div>
                </Link>

                <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-900/5">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <div className="rounded-md bg-blue-50 p-2 ring-1 ring-blue-100">
                                <BookOpen className="h-6 w-6 text-blue-600" />
                            </div>
                            <div className="ml-4">
                                <h3 className="text-sm font-medium text-gray-500">Bu Ay Planlanan</h3>
                                <p className="mt-1 text-2xl font-semibold text-gray-900">38</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-900/5">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <div className="rounded-md bg-purple-50 p-2 ring-1 ring-purple-100">
                                <BarChart3 className="h-6 w-6 text-purple-600" />
                            </div>
                            <div className="ml-4">
                                <h3 className="text-sm font-medium text-gray-500">Memnuniyet Ort.</h3>
                                <p className="mt-1 text-2xl font-semibold text-gray-900">4.8/5</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Calendar Area */}
                <div className="lg:col-span-2">
                    <TrainingCalendar events={scheduledTrainings} />
                </div>

                {/* Sidebar / Quick Actions */}
                <div className="space-y-6">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h3 className="text-base font-semibold text-gray-900 mb-4">Hızlı Planlama</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Müşteri Seç</label>
                                <select
                                    value={formData.customer}
                                    onChange={(e) => setFormData({ ...formData, customer: e.target.value })}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                                >
                                    <option value="">Seçiniz...</option>
                                    <option value="ABC Lojistik (Riskli)">ABC Lojistik (Riskli)</option>
                                    <option value="XYZ Market">XYZ Market</option>
                                    <option value="Yeni Kullanıcı A.Ş.">Yeni Kullanıcı A.Ş.</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Tarih</label>
                                <input
                                    type="date"
                                    value={formData.date}
                                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Eğitim Tipi</label>
                                <select
                                    value={formData.type}
                                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                                >
                                    <option value="online">Online Temel Eğitim</option>
                                    <option value="onsite">Yerinde Kurulum & Eğitim</option>
                                    <option value="online">İleri Seviye Modül Eğitimi</option>
                                </select>
                            </div>
                            <button
                                onClick={handleAddToCalendar}
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Takvime Ekle
                            </button>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
                        <h3 className="text-lg font-bold">Eğitim İstatistikleri</h3>
                        <p className="text-indigo-100 text-sm mt-1">Son 30 günde tamamlanan eğitimler.</p>
                        <div className="mt-6 flex items-end justify-between">
                            <div>
                                <div className="text-4xl font-bold">124</div>
                                <div className="text-indigo-200 text-xs">Tamamlanan Oturum</div>
                            </div>
                            <div className="h-16 w-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                                <Users className="h-8 w-8 text-white" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <CustomerListModal
                isOpen={isListModalOpen}
                onClose={() => setIsListModalOpen(false)}
                title={listType === 'trained' ? "Eğitim Alan Müşteriler" : "Eğitim Bekleyen Müşteriler"}
                type={listType}
                customers={listType === 'trained' ? trainedCustomers : untrainedCustomers}
            />
        </PageContainer>
    );
}
