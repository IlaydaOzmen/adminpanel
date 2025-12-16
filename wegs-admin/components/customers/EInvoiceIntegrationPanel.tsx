"use client";

import { useState } from "react";
import {
    Eye,
    EyeOff,
    Copy,
    Check,
    FileText,
    Server,
    Key,
    User,
    Tag,
    CreditCard,
    RefreshCw,
    CheckCircle,
    XCircle,
    Building2
} from "lucide-react";
import { cn } from "@/lib/utils";

interface EInvoiceData {
    integrator: string;
    webserviceUrl: string;
    apiKey: string;
    username: string;
    password: string;
    labels: string[];
    iban: string;
    lastSync: string;
    status: "active" | "inactive" | "error";
    companyTitle: string;
    taxNumber: string;
}

// Mock data - gerçek uygulamada API'den gelecek
const mockData: EInvoiceData = {
    integrator: "Foriba",
    webserviceUrl: "https://earsivportal.efatura.gov.tr/intragiris.html",
    apiKey: "sk_live_51Mz8aBc...XyZ789",
    username: "wegs_tech_solutions",
    password: "eFatura2024!secure",
    labels: ["A", "B", "WGS"],
    iban: "TR33 0006 1005 1978 6457 8413 26",
    lastSync: "15.12.2024 17:45",
    status: "active",
    companyTitle: "Tech Solutions Ltd. Şti.",
    taxNumber: "1234567890"
};

export function EInvoiceIntegrationPanel() {
    const [showApiKey, setShowApiKey] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [copiedField, setCopiedField] = useState<string | null>(null);
    const [isSyncing, setIsSyncing] = useState(false);

    const handleCopy = (value: string, field: string) => {
        navigator.clipboard.writeText(value);
        setCopiedField(field);
        setTimeout(() => setCopiedField(null), 2000);
    };

    const handleSync = () => {
        setIsSyncing(true);
        setTimeout(() => {
            setIsSyncing(false);
            alert("E-Fatura verileri başarıyla senkronize edildi!");
        }, 2000);
    };

    const statusConfig = {
        active: { label: "Aktif", color: "bg-green-100 text-green-700", icon: CheckCircle },
        inactive: { label: "Pasif", color: "bg-gray-100 text-gray-700", icon: XCircle },
        error: { label: "Hata", color: "bg-red-100 text-red-700", icon: XCircle }
    };

    const StatusIcon = statusConfig[mockData.status].icon;

    return (
        <div className="rounded-xl bg-white shadow-sm ring-1 ring-gray-900/5 overflow-hidden">
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-emerald-50 to-teal-50">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-emerald-100 rounded-lg">
                            <FileText className="h-5 w-5 text-emerald-600" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900">E-Fatura Entegrasyonu</h3>
                            <p className="text-sm text-gray-500">GİB entegrasyon bilgileri</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className={cn(
                            "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium",
                            statusConfig[mockData.status].color
                        )}>
                            <StatusIcon className="h-3 w-3" />
                            {statusConfig[mockData.status].label}
                        </span>
                        <button
                            onClick={handleSync}
                            disabled={isSyncing}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700 disabled:opacity-50 transition-colors"
                        >
                            <RefreshCw className={cn("h-4 w-4", isSyncing && "animate-spin")} />
                            {isSyncing ? "Senkronize..." : "Senkronize Et"}
                        </button>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
                {/* Company Info */}
                <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-gray-400" />
                        <div>
                            <p className="text-xs text-gray-500">Firma Ünvanı</p>
                            <p className="text-sm font-medium text-gray-900">{mockData.companyTitle}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-gray-400" />
                        <div>
                            <p className="text-xs text-gray-500">Vergi No</p>
                            <p className="text-sm font-medium text-gray-900">{mockData.taxNumber}</p>
                        </div>
                    </div>
                </div>

                {/* Integrator */}
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2">
                        <Server className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600">Entegratör</span>
                    </div>
                    <span className="text-sm font-semibold text-gray-900 bg-blue-100 px-3 py-1 rounded-full">
                        {mockData.integrator}
                    </span>
                </div>

                {/* Webservice URL */}
                <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                        <Server className="h-4 w-4 text-gray-400" />
                        Webservis URL
                    </label>
                    <div className="flex">
                        <input
                            type="text"
                            readOnly
                            value={mockData.webserviceUrl}
                            className="flex-1 rounded-l-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-700"
                        />
                        <button
                            onClick={() => handleCopy(mockData.webserviceUrl, "url")}
                            className="px-3 py-2 border border-l-0 border-gray-300 bg-white rounded-r-lg hover:bg-gray-50 transition-colors"
                        >
                            {copiedField === "url" ? (
                                <Check className="h-4 w-4 text-green-500" />
                            ) : (
                                <Copy className="h-4 w-4 text-gray-400" />
                            )}
                        </button>
                    </div>
                </div>

                {/* API Key */}
                <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                        <Key className="h-4 w-4 text-gray-400" />
                        API Anahtarı
                    </label>
                    <div className="flex">
                        <input
                            type={showApiKey ? "text" : "password"}
                            readOnly
                            value={mockData.apiKey}
                            className="flex-1 rounded-l-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-700 font-mono"
                        />
                        <button
                            onClick={() => setShowApiKey(!showApiKey)}
                            className="px-3 py-2 border border-l-0 border-gray-300 bg-white hover:bg-gray-50 transition-colors"
                        >
                            {showApiKey ? (
                                <EyeOff className="h-4 w-4 text-gray-400" />
                            ) : (
                                <Eye className="h-4 w-4 text-gray-400" />
                            )}
                        </button>
                        <button
                            onClick={() => handleCopy(mockData.apiKey, "apikey")}
                            className="px-3 py-2 border border-l-0 border-gray-300 bg-white rounded-r-lg hover:bg-gray-50 transition-colors"
                        >
                            {copiedField === "apikey" ? (
                                <Check className="h-4 w-4 text-green-500" />
                            ) : (
                                <Copy className="h-4 w-4 text-gray-400" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Username & Password */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                            <User className="h-4 w-4 text-gray-400" />
                            Kullanıcı Adı
                        </label>
                        <div className="flex">
                            <input
                                type="text"
                                readOnly
                                value={mockData.username}
                                className="flex-1 rounded-l-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-700"
                            />
                            <button
                                onClick={() => handleCopy(mockData.username, "username")}
                                className="px-3 py-2 border border-l-0 border-gray-300 bg-white rounded-r-lg hover:bg-gray-50 transition-colors"
                            >
                                {copiedField === "username" ? (
                                    <Check className="h-4 w-4 text-green-500" />
                                ) : (
                                    <Copy className="h-4 w-4 text-gray-400" />
                                )}
                            </button>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                            <Key className="h-4 w-4 text-gray-400" />
                            Şifre
                        </label>
                        <div className="flex">
                            <input
                                type={showPassword ? "text" : "password"}
                                readOnly
                                value={mockData.password}
                                className="flex-1 rounded-l-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-700 font-mono"
                            />
                            <button
                                onClick={() => setShowPassword(!showPassword)}
                                className="px-3 py-2 border border-l-0 border-gray-300 bg-white hover:bg-gray-50 transition-colors"
                            >
                                {showPassword ? (
                                    <EyeOff className="h-4 w-4 text-gray-400" />
                                ) : (
                                    <Eye className="h-4 w-4 text-gray-400" />
                                )}
                            </button>
                            <button
                                onClick={() => handleCopy(mockData.password, "password")}
                                className="px-3 py-2 border border-l-0 border-gray-300 bg-white rounded-r-lg hover:bg-gray-50 transition-colors"
                            >
                                {copiedField === "password" ? (
                                    <Check className="h-4 w-4 text-green-500" />
                                ) : (
                                    <Copy className="h-4 w-4 text-gray-400" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Labels */}
                <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                        <Tag className="h-4 w-4 text-gray-400" />
                        Fatura Etiketleri (Seriler)
                    </label>
                    <div className="flex flex-wrap gap-2">
                        {mockData.labels.map((label) => (
                            <span
                                key={label}
                                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-700"
                            >
                                {label}
                            </span>
                        ))}
                    </div>
                </div>

                {/* IBAN */}
                <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                        <CreditCard className="h-4 w-4 text-gray-400" />
                        Fatura IBAN
                    </label>
                    <div className="flex">
                        <input
                            type="text"
                            readOnly
                            value={mockData.iban}
                            className="flex-1 rounded-l-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-700 font-mono"
                        />
                        <button
                            onClick={() => handleCopy(mockData.iban.replace(/\s/g, ""), "iban")}
                            className="px-3 py-2 border border-l-0 border-gray-300 bg-white rounded-r-lg hover:bg-gray-50 transition-colors"
                        >
                            {copiedField === "iban" ? (
                                <Check className="h-4 w-4 text-green-500" />
                            ) : (
                                <Copy className="h-4 w-4 text-gray-400" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Last Sync */}
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-100">
                    <span className="text-sm text-blue-700">Son Senkronizasyon</span>
                    <span className="text-sm font-medium text-blue-900">{mockData.lastSync}</span>
                </div>
            </div>
        </div>
    );
}
