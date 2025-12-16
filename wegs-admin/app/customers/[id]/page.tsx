"use client";

import { useState } from "react";
import Link from "next/link";
import {
    User,
    Mail,
    Phone,
    MapPin,
    Calendar,
    Shield,
    Key,
    LogOut,
    CreditCard,
    Activity,
    CheckCircle2,
    Circle,
    Clock,
    Award,
    FileText,
    Building2,
    Settings,
    ChevronRight,
    ArrowLeft
} from "lucide-react";
import { cn } from "@/lib/utils";
import { CustomerCommunicationPanel } from "@/components/customers/CustomerCommunicationPanel";
import { EInvoiceIntegrationPanel } from "@/components/customers/EInvoiceIntegrationPanel";
import { BankIntegrationPanel } from "@/components/customers/BankIntegrationPanel";
import { CustomerActionsPanel } from "@/components/customers/CustomerActionsPanel";

// Mock Data for a single customer
const customerData = {
    id: "1",
    name: "Ahmet Yılmaz",
    company: "Tech Solutions Ltd.",
    email: "ahmet.y@tech.com",
    phone: "+90 555 123 45 67",
    address: "Maslak, İstanbul",
    joinDate: "01.01.2024",
    package: "Business",
    status: "Active",
    avatarColor: "bg-blue-600",
    hasDataSharingPermission: true,
    loyaltySteps: [
        { id: 1, label: "Kayıt Oldu", date: "01.01.2024", status: "completed" },
        { id: 2, label: "Profil Doldurdu", date: "02.01.2024", status: "completed" },
        { id: 3, label: "E-Fatura Aktivasyonu", date: "05.01.2024", status: "completed" },
        { id: 4, label: "İlk Fatura Kesimi", date: "10.01.2024", status: "completed" },
        { id: 5, label: "Düzenli Kullanıcı (3 Ay)", date: "-", status: "pending" },
    ],
    trainingStatus: {
        received: true,
        date: "15.01.2024",
        trainer: "Gamze Eğitmen"
    }
};

type TabType = "overview" | "integrations" | "management";

export default function CustomerDetailPage({ params }: { params: { id: string } }) {
    const [activeTab, setActiveTab] = useState<TabType>("overview");

    const tabs = [
        { id: "overview" as TabType, label: "Genel Bakış", icon: User },
        { id: "integrations" as TabType, label: "Entegrasyonlar", icon: Building2 },
        { id: "management" as TabType, label: "Yönetim", icon: Settings },
    ];

    return (
        <div className="space-y-6">
            {/* Back Button */}
            <Link
                href="/customers"
                className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Müşteri Listesine Dön
            </Link>

            {/* Header / Profile Card */}
            <div className="bg-white shadow-sm ring-1 ring-gray-900/5 rounded-xl overflow-hidden">
                <div className="relative h-32 bg-gradient-to-r from-blue-600 to-indigo-600">
                    <div className="absolute top-4 right-4 flex space-x-2">
                        <span className="inline-flex items-center rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white ring-1 ring-inset ring-white/30 backdrop-blur-sm">
                            {customerData.package}
                        </span>
                        <span className="inline-flex items-center rounded-full bg-green-500/20 px-3 py-1 text-xs font-medium text-white ring-1 ring-inset ring-white/30 backdrop-blur-sm">
                            {customerData.status}
                        </span>
                    </div>
                </div>
                <div className="px-6 pb-6">
                    <div className="relative -mt-12 flex flex-col sm:flex-row sm:items-end sm:space-x-6">
                        <div className="flex h-24 w-24 items-center justify-center rounded-xl bg-white p-1 ring-4 ring-white shadow-md">
                            <div className={cn("flex h-full w-full items-center justify-center rounded-lg text-3xl font-bold text-white", customerData.avatarColor)}>
                                {customerData.name.charAt(0)}
                            </div>
                        </div>
                        <div className="mt-6 sm:mt-0 sm:flex-1">
                            <div>
                                <div className="flex items-center text-2xl font-bold text-gray-900">
                                    {customerData.name}
                                    {customerData.hasDataSharingPermission && (
                                        <span title="Veri Paylaşımı Aktif">
                                            <Shield className="ml-2 h-5 w-5 text-green-500" />
                                        </span>
                                    )}
                                </div>
                                <p className="text-sm text-gray-500">{customerData.company}</p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 grid grid-cols-1 gap-6 border-t border-gray-100 pt-6 sm:grid-cols-2 lg:grid-cols-4">
                        <div className="flex items-center text-sm text-gray-500">
                            <Mail className="mr-2 h-4 w-4 text-gray-400" />
                            {customerData.email}
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                            <Phone className="mr-2 h-4 w-4 text-gray-400" />
                            {customerData.phone}
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                            <MapPin className="mr-2 h-4 w-4 text-gray-400" />
                            {customerData.address}
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                            <Calendar className="mr-2 h-4 w-4 text-gray-400" />
                            Katılım: {customerData.joinDate}
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="bg-white shadow-sm ring-1 ring-gray-900/5 rounded-xl p-1">
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
                                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                                )}
                            >
                                <Icon className="h-4 w-4" />
                                {tab.label}
                            </button>
                        );
                    })}
                </nav>
            </div>

            {/* Tab Content */}
            {activeTab === "overview" && (
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    {/* Left Column: Loyalty & Activity */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Loyalty Progress */}
                        <div className="bg-white shadow-sm ring-1 ring-gray-900/5 rounded-xl p-6">
                            <h3 className="text-base font-semibold leading-7 text-gray-900">Müşteri Bağlılık Takibi</h3>
                            <p className="mt-1 text-sm text-gray-500">Kullanıcının platformdaki ilerleme durumu.</p>

                            <div className="mt-8 relative">
                                <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 -translate-y-1/2 z-0" />
                                <div className="relative z-10 flex justify-between">
                                    {customerData.loyaltySteps.map((step) => (
                                        <div key={step.id} className="flex flex-col items-center">
                                            <div className={cn(
                                                "flex h-8 w-8 items-center justify-center rounded-full border-2 bg-white",
                                                step.status === "completed" ? "border-green-500 text-green-500" :
                                                    step.status === "current" ? "border-blue-500 text-blue-500" :
                                                        "border-gray-300 text-gray-300"
                                            )}>
                                                {step.status === "completed" ? <CheckCircle2 className="h-5 w-5" /> :
                                                    step.status === "current" ? <Activity className="h-5 w-5" /> :
                                                        <Circle className="h-5 w-5" />}
                                            </div>
                                            <div className="mt-2 text-center">
                                                <div className="text-xs font-semibold text-gray-900">{step.label}</div>
                                                <div className="text-[10px] text-gray-500">{step.date}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Stats Mock */}
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                            <div className="bg-white p-4 rounded-xl shadow-sm ring-1 ring-gray-900/5">
                                <div className="text-sm font-medium text-gray-500">Toplam Fatura</div>
                                <div className="mt-1 text-2xl font-semibold text-gray-900">124</div>
                            </div>
                            <div className="bg-white p-4 rounded-xl shadow-sm ring-1 ring-gray-900/5">
                                <div className="text-sm font-medium text-gray-500">Kalan Kontör</div>
                                <div className="mt-1 text-2xl font-semibold text-gray-900">850</div>
                            </div>
                            <div className="bg-white p-4 rounded-xl shadow-sm ring-1 ring-gray-900/5">
                                <div className="text-sm font-medium text-gray-500">Son İşlem</div>
                                <div className="mt-1 text-2xl font-semibold text-gray-900">2s önce</div>
                            </div>
                        </div>

                        <CustomerCommunicationPanel />
                    </div>

                    {/* Right Column: Training & Misc */}
                    <div className="space-y-6">
                        {/* Training Status */}
                        <div className="bg-white shadow-sm ring-1 ring-gray-900/5 rounded-xl p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-base font-semibold leading-7 text-gray-900">Eğitim Durumu</h3>
                                <Award className={cn("h-6 w-6", customerData.trainingStatus.received ? "text-yellow-500" : "text-gray-300")} />
                            </div>

                            {customerData.trainingStatus.received ? (
                                <div className="bg-green-50 border border-green-100 rounded-lg p-4">
                                    <div className="flex items-center">
                                        <CheckCircle2 className="h-5 w-5 text-green-600 mr-2" />
                                        <span className="text-sm font-medium text-green-800">Eğitim Tamamlandı</span>
                                    </div>
                                    <div className="mt-2 text-xs text-green-700">
                                        <p>Tarih: {customerData.trainingStatus.date}</p>
                                        <p>Eğitmen: {customerData.trainingStatus.trainer}</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-4">
                                    <div className="flex items-center">
                                        <Clock className="h-5 w-5 text-yellow-600 mr-2" />
                                        <span className="text-sm font-medium text-yellow-800">Eğitim Bekleniyor</span>
                                    </div>
                                    <button className="mt-3 w-full rounded bg-white px-2 py-1 text-xs font-semibold text-yellow-700 shadow-sm ring-1 ring-inset ring-yellow-300 hover:bg-yellow-50">
                                        Planla
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Technical Support Access */}
                        <div className="bg-white shadow-sm ring-1 ring-gray-900/5 rounded-xl p-6">
                            <div className="flex items-center justify-between">
                                <h3 className="text-base font-semibold leading-7 text-gray-900">Teknik Erişim İzni</h3>
                                <div className={cn("flex h-6 w-11 flex-none cursor-pointer rounded-full p-1 transition-colors duration-200 ease-in-out", customerData.hasDataSharingPermission ? "bg-green-500" : "bg-gray-300")}>
                                    <span className={cn("pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out", customerData.hasDataSharingPermission ? "translate-x-5" : "translate-x-0")} />
                                </div>
                            </div>
                            <p className="mt-2 text-xs text-gray-500">
                                {customerData.hasDataSharingPermission
                                    ? "Kullanıcı, teknik ekibin verilerine erişmesine izin verdi."
                                    : "Kullanıcı veri paylaşımını kapatmış."
                                }
                            </p>
                            {customerData.hasDataSharingPermission && (
                                <div className="mt-4 flex items-center space-x-2 text-xs text-green-600 bg-green-50 p-2 rounded border border-green-100">
                                    <Shield className="h-4 w-4" />
                                    <span>Erişim Aktif (Bitiş: 12.12.2025 14:00)</span>
                                </div>
                            )}
                        </div>

                        {/* Support Logs */}
                        <div className="bg-white shadow-sm ring-1 ring-gray-900/5 rounded-xl p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-base font-semibold text-gray-900">Destek Kayıtları</h3>
                                <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">3 Talep</span>
                            </div>
                            <div className="flow-root">
                                <ul role="list" className="-my-5 divide-y divide-gray-100">
                                    {[
                                        { id: 1, title: "Fatura Oluşturma Hatası", status: "Resolved", date: "2 gün önce" },
                                        { id: 2, title: "Entegrasyon Sorunu", status: "Open", date: "5 saat önce" },
                                        { id: 3, title: "Şifre Sıfırlama", status: "Resolved", date: "1 hafta önce" },
                                    ].map((log) => (
                                        <li key={log.id} className="py-4">
                                            <div className="flex items-center justify-between gap-x-3">
                                                <div className="min-w-0">
                                                    <p className="text-sm font-semibold leading-6 text-gray-900">{log.title}</p>
                                                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">Kayıt: {log.date}</p>
                                                </div>
                                                <div className={cn(
                                                    "flex-none rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset",
                                                    log.status === "Resolved" ? "bg-green-50 text-green-700 ring-green-600/20" : "bg-yellow-50 text-yellow-800 ring-yellow-600/20"
                                                )}>
                                                    {log.status === "Resolved" ? "Çözüldü" : "Açık"}
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <button className="mt-6 w-full text-center text-sm font-medium text-blue-600 hover:text-blue-500">
                                Tüm kayıtları görüntüle &rarr;
                            </button>
                        </div>

                        {/* Notes */}
                        <div className="bg-white shadow-sm ring-1 ring-gray-900/5 rounded-xl p-6">
                            <h3 className="text-base font-semibold leading-7 text-gray-900 mb-2">Notlar</h3>
                            <textarea
                                className="w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                rows={4}
                                placeholder="Müşteri hakkında notlar..."
                            />
                            <button className="mt-2 w-full rounded-md bg-indigo-50 px-3 py-2 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100">
                                Kaydet
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === "integrations" && (
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    <EInvoiceIntegrationPanel />
                    <BankIntegrationPanel />
                </div>
            )}

            {activeTab === "management" && (
                <CustomerActionsPanel
                    customer={{
                        name: customerData.name,
                        email: customerData.email,
                        phone: customerData.phone,
                        hasDataSharingPermission: customerData.hasDataSharingPermission
                    }}
                />
            )}
        </div>
    );
}
